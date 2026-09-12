import { createHash } from "node:crypto";
import env from "../config/env.js";
import {
  ensureIndexes,
  pluginPingsCollection,
  pluginServersCollection,
} from "../db/collections.js";
import { PLUGINS, PLUGIN_KEY_LIST, pluginLabelFor } from "../../../shared/plugins.js";

/**
 * The hourly heartbeat from the plugins, written and read back.
 *
 * Every running copy of a plugin calls /plugin-stat once an hour. One ping is
 * one server, so "how many servers are running this plugin" is a count of
 * distinct servers in an hour, and that is exactly the shape the writes are
 * kept in: one document per plugin, server and hour. A repeat ping inside the
 * same hour updates that document rather than adding one, which is also what
 * stops anyone with a plugin id from inflating the count by calling the URL
 * in a loop.
 *
 * A server is identified by the id the plugin generated and keeps on disk,
 * which is shared by every one of these plugins on the same server, so two
 * plugins on one server land on one row. Without one, the salted hash of the
 * address plus the server's name stands in for it. Neither the address nor
 * the raw id is stored; only the derived key is.
 */

/** A server that has not pinged for this long is no longer counted as running. */
const LIVE_WINDOW_MS = 2 * 60 * 60 * 1000;

const HOUR_MS = 60 * 60 * 1000;

function startOfHour(date) {
  return new Date(Math.floor(date.getTime() / HOUR_MS) * HOUR_MS);
}

/**
 * The key a server is stored under. It is derived rather than stored so a
 * dump of the collection says nothing about who runs what: the address never
 * reaches the database, and the plugin's own id is hashed before it does.
 */
export function serverKeyFor({ serverId, ipHash, serverName }) {
  const basis = serverId
    ? `id:${serverId}`
    : `addr:${ipHash ?? "none"}:${(serverName ?? "").toLowerCase()}`;

  return createHash("sha256")
    .update(`${env.hashSalt}:plugin-server:${basis}`)
    .digest("hex")
    .slice(0, 24);
}

/**
 * Records one ping. Two writes, both upserts: the hourly row, which is what
 * the charts count, and the server's own row, which is what the server list
 * shows. Both carry the numbers the plugin sent, so the list can say what a
 * server is doing right now and the chart can say what it was doing then.
 *
 * `errors` is the count since the plugin's previous ping, so it is summed.
 * `totalPlayers` is a snapshot, so the latest value wins.
 */
export async function recordPing({
  plugin,
  version,
  serverKey,
  serverName,
  serverVersion,
  totalPlayers,
  errors,
  country,
  now = new Date(),
}) {
  await ensureIndexes();

  const hour = startOfHour(now);
  const pings = await pluginPingsCollection();
  const servers = await pluginServersCollection();

  const pluginPath = `plugins.${plugin}`;

  await Promise.all([
    pings.updateOne(
      { plugin, serverKey, hour },
      {
        $set: {
          version,
          serverVersion,
          totalPlayers,
          country,
          lastPingAt: now,
        },
        $inc: { pings: 1, errors },
        $setOnInsert: { firstPingAt: now },
      },
      { upsert: true },
    ),
    servers.updateOne(
      { serverKey },
      {
        $set: {
          serverName,
          serverVersion,
          country,
          totalPlayers,
          lastSeenAt: now,
          [`${pluginPath}.version`]: version,
          [`${pluginPath}.totalPlayers`]: totalPlayers,
          [`${pluginPath}.lastSeenAt`]: now,
        },
        $inc: {
          [`${pluginPath}.pings`]: 1,
          [`${pluginPath}.errors`]: errors,
        },
        // $min on a field that does not exist yet sets it, which is how a
        // plugin added to a server later gets its own first seen date.
        $min: {
          firstSeenAt: now,
          [`${pluginPath}.firstSeenAt`]: now,
        },
      },
      { upsert: true },
    ),
  ]);

  return { hour };
}

/** Every plugin key, each mapped to zero, for the rows that need a full set. */
function zeroByPlugin() {
  return Object.fromEntries(PLUGIN_KEY_LIST.map((key) => [key, 0]));
}

function emptyPluginTotals(plugin) {
  return {
    key: plugin.key,
    label: plugin.label,
    family: plugin.family,
    tier: plugin.tier,
    project: plugin.project,
    liveServers: 0,
    players: 0,
    servers24h: 0,
    errors24h: 0,
    versions: {},
  };
}

/**
 * Distinct servers per bucket over a window, one row per bucket with a count
 * for every plugin, so a quiet hour is a zero and not a gap.
 *
 * A server running two plugins is one server, so the bucket's total is the
 * number of distinct servers across every plugin and not the sum of the
 * series. The pipeline groups by server first for exactly that reason.
 */
async function readBuckets({ start, count, step, labelOf, format }) {
  const pings = await pluginPingsCollection();

  const rows = await pings
    .aggregate([
      { $match: { hour: { $gte: start } } },
      {
        $group: {
          _id: {
            bucket: { $dateToString: { format, date: "$hour" } },
            serverKey: "$serverKey",
          },
          plugins: { $addToSet: "$plugin" },
        },
      },
      { $unwind: "$plugins" },
      {
        $group: {
          _id: { bucket: "$_id.bucket", plugin: "$plugins" },
          servers: { $sum: 1 },
          serverKeys: { $addToSet: "$_id.serverKey" },
        },
      },
    ])
    .toArray();

  const buckets = new Map();
  for (let offset = 0; offset < count; offset += 1) {
    const label = labelOf(step(start, offset));
    buckets.set(label, { label, byPlugin: zeroByPlugin(), keys: new Set() });
  }

  for (const row of rows) {
    const bucket = buckets.get(row._id.bucket);
    if (!bucket || !(row._id.plugin in bucket.byPlugin)) continue;
    bucket.byPlugin[row._id.plugin] = row.servers;
    for (const key of row.serverKeys) bucket.keys.add(key);
  }

  return [...buckets.values()].map(({ keys, ...bucket }) => ({
    ...bucket,
    total: keys.size,
  }));
}

/** Servers per hour over the last `hours` hours, oldest first. */
async function readHourly({ hours, now }) {
  const end = startOfHour(now);
  const start = new Date(end.getTime() - (hours - 1) * HOUR_MS);

  const rows = await readBuckets({
    start,
    count: hours,
    step: (from, offset) => new Date(from.getTime() + offset * HOUR_MS),
    labelOf: (date) => date.toISOString().slice(0, 13),
    format: "%Y-%m-%dT%H",
  });

  return {
    hours,
    since: start.toISOString(),
    rows: rows.map(({ label, ...row }) => ({ hour: `${label}:00:00.000Z`, ...row })),
  };
}

/** Distinct servers per day over the last `days` days, oldest first. */
async function readDaily({ days, now }) {
  const start = new Date(now);
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (days - 1));

  const rows = await readBuckets({
    start,
    count: days,
    step: (from, offset) => {
      const date = new Date(from);
      date.setUTCDate(from.getUTCDate() + offset);
      return date;
    },
    labelOf: (date) => date.toISOString().slice(0, 10),
    format: "%Y-%m-%d",
  });

  return {
    days,
    since: start.toISOString(),
    rows: rows.map(({ label, ...row }) => ({ day: label, ...row })),
  };
}

/** How many distinct servers each plugin was seen on in the last 24 hours, and the errors they reported. */
async function readLastDay({ now }) {
  const pings = await pluginPingsCollection();
  const start = new Date(now.getTime() - 24 * HOUR_MS);

  return pings
    .aggregate([
      { $match: { hour: { $gte: startOfHour(start) } } },
      {
        $group: {
          _id: "$plugin",
          servers: { $addToSet: "$serverKey" },
          errors: { $sum: "$errors" },
        },
      },
      { $project: { _id: 1, servers: { $size: "$servers" }, errors: 1 } },
    ])
    .toArray();
}

/**
 * Every server on file, newest ping first, with its plugins flattened into a
 * list the dashboard can draw. The key is the only identifier and it is
 * already one way, so nothing here has to be held back.
 */
function presentServer(row, now) {
  const lastSeenAt = row.lastSeenAt ?? null;
  const live = lastSeenAt ? now.getTime() - new Date(lastSeenAt).getTime() < LIVE_WINDOW_MS : false;

  const plugins = Object.entries(row.plugins ?? {})
    .filter(([key]) => PLUGIN_KEY_LIST.includes(key))
    .map(([key, entry]) => ({
      key,
      label: pluginLabelFor(key),
      version: entry.version ?? null,
      totalPlayers: entry.totalPlayers ?? 0,
      errors: entry.errors ?? 0,
      pings: entry.pings ?? 0,
      firstSeenAt: entry.firstSeenAt ?? null,
      lastSeenAt: entry.lastSeenAt ?? null,
      live: entry.lastSeenAt
        ? now.getTime() - new Date(entry.lastSeenAt).getTime() < LIVE_WINDOW_MS
        : false,
    }))
    .sort((a, b) => PLUGIN_KEY_LIST.indexOf(a.key) - PLUGIN_KEY_LIST.indexOf(b.key));

  return {
    serverKey: row.serverKey,
    serverName: row.serverName ?? null,
    serverVersion: row.serverVersion ?? null,
    country: row.country ?? null,
    totalPlayers: row.totalPlayers ?? 0,
    firstSeenAt: row.firstSeenAt ?? null,
    lastSeenAt,
    live,
    plugins,
  };
}

/**
 * Everything the plugins panel draws, in one call: a card per plugin, the
 * servers per hour and per day, and the server list.
 *
 * `days` is capped at the retention window because there is nothing older to
 * read, and the hourly series is a fixed week because past that a per hour
 * bar is narrower than a pixel.
 */
export async function readPluginDashboard({ days = 30, now = new Date() } = {}) {
  await ensureIndexes();

  const window = Math.min(Math.max(days, 1), env.pluginStats.ttlDays);
  const servers = await pluginServersCollection();

  const [serverRows, hourly, daily, lastDay] = await Promise.all([
    servers.find({}, { projection: { _id: 0 } }).sort({ lastSeenAt: -1 }).limit(500).toArray(),
    readHourly({ hours: 24 * 7, now }),
    readDaily({ days: window, now }),
    readLastDay({ now }),
  ]);

  const presented = serverRows.map((row) => presentServer(row, now));
  const totals = new Map(PLUGINS.map((plugin) => [plugin.key, emptyPluginTotals(plugin)]));

  for (const row of lastDay) {
    const entry = totals.get(row._id);
    if (!entry) continue;
    entry.servers24h = row.servers;
    entry.errors24h = row.errors ?? 0;
  }

  let livePlayers = 0;
  let liveServers = 0;
  const countries = {};

  for (const server of presented) {
    if (server.live) {
      liveServers += 1;
      livePlayers += server.totalPlayers;
      const country = server.country ?? "unknown";
      countries[country] = (countries[country] ?? 0) + 1;
    }

    for (const plugin of server.plugins) {
      const entry = totals.get(plugin.key);
      if (!entry || !plugin.live) continue;
      entry.liveServers += 1;
      entry.players += plugin.totalPlayers;
      if (plugin.version) {
        entry.versions[plugin.version] = (entry.versions[plugin.version] ?? 0) + 1;
      }
    }
  }

  return {
    generatedAt: now.toISOString(),
    retentionDays: env.pluginStats.ttlDays,
    liveWindowMinutes: LIVE_WINDOW_MS / 60_000,
    summary: {
      liveServers,
      livePlayers,
      knownServers: presented.length,
      countries,
    },
    plugins: [...totals.values()],
    hourly,
    daily,
    servers: presented,
  };
}
