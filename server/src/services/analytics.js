import {
  COLLECTIONS,
  EVENT_TYPES,
  bugReportsCollection,
  collection,
  ensureIndexes,
  eventsCollection,
  projectStatsCollection,
} from "../db/collections.js";
import env from "../config/env.js";
import { DEVICE_TYPES } from "../lib/userAgent.js";
import { CLICK_ACTION_VALUES, PROJECT_SLUGS, labelFor } from "../../../shared/projects.js";

/**
 * Writing and reading the counts.
 *
 * Every event is written twice: once in full to `events`, and once as a set of
 * $inc bumps on the project's row in `project_stats`. The raw rows answer
 * questions nobody thought of yet, the counters answer the dashboard in a
 * single document read. Both writes go out together, and the counter bump is
 * the one that matters, so a failure there is what surfaces as an error.
 *
 * A project field name is only ever one of the slugs in shared/projects.js and
 * a device or browser name only ever comes out of the parser, so the dotted
 * paths built below can never carry user supplied text into a key. The one
 * key that does come from outside, the referrer host, goes through encodeHost
 * before it is used as a path.
 */

/** Keys that get their own counter under `devices`. */
const DEVICE_KEYS = Object.values(DEVICE_TYPES);

/** What a view with no resolvable country is counted under. */
const UNKNOWN_COUNTRY = "unknown";

/** Views that arrived with no Referer header, which is most of them. */
const DIRECT_REFERRER = "direct";

function safeKey(value) {
  // Mongo rejects dots and leading dollars in field names. Nothing that
  // reaches here should contain either, but a new browser string is not worth
  // a failed write.
  if (typeof value !== "string" || value.trim() === "") return "Unknown";
  return value.replace(/[.$]/g, "_").slice(0, 40);
}

/**
 * A referrer host is full of dots, and a dot in a counter path means "go one
 * level down" to Mongo. A tilde is not a legal character in a hostname, so
 * swapping the two is reversible without ambiguity: "www.spigotmc.org" is
 * stored under "www~spigotmc~org" and put back when it is read.
 */
function encodeHost(host) {
  if (typeof host !== "string" || host.trim() === "") return DIRECT_REFERRER;
  return host.toLowerCase().replace(/\$/g, "_").replaceAll(".", "~").slice(0, 80);
}

function decodeHost(key) {
  return key.replaceAll("~", ".");
}

function decodeHostKeys(record) {
  return Object.fromEntries(
    Object.entries(record ?? {}).map(([key, count]) => [decodeHost(key), count]),
  );
}

/** "en-GB" and "en-US" both count towards "en"; the region is not the question. */
function languageKey(language) {
  if (typeof language !== "string" || language.trim() === "") return "unknown";
  return safeKey(language.split("-")[0].toLowerCase()).slice(0, 8);
}

/**
 * Has this visitor been counted on this project before? A refresh, or a second
 * visit next week, should not read as a new person.
 *
 * Without a visitor id there is nothing to compare, so the view is counted as
 * unique only when the id is present. That undercounts rather than overcounts,
 * which is the right way round for a number you are going to quote.
 */
async function isFirstViewForVisitor(project, visitorId) {
  if (!visitorId) return false;

  const events = await eventsCollection();
  const seen = await events.findOne(
    { project, visitorId, type: EVENT_TYPES.VIEW },
    { projection: { _id: 1 } },
  );

  return seen === null;
}

/**
 * Builds the $inc for one event. Views bump the view counters and the device,
 * country, language and referrer breakdowns; clicks bump the click counters
 * and are broken down by action, by device and by country, so "how many of
 * the buy clicks came from a phone" or "where do the downloads come from" is
 * answerable without touching the raw rows.
 */
function buildIncrement({
  type,
  action,
  device,
  country,
  language,
  referrerHost,
  isUnique,
}) {
  const deviceKey = DEVICE_KEYS.includes(device.type) ? device.type : DEVICE_TYPES.UNKNOWN;
  const osKey = safeKey(device.os);
  const browserKey = safeKey(device.browser);
  const countryKey = country ?? UNKNOWN_COUNTRY;

  if (type === EVENT_TYPES.VIEW) {
    return {
      views: 1,
      ...(isUnique ? { uniqueViews: 1 } : {}),
      [`devices.${deviceKey}`]: 1,
      [`os.${osKey}`]: 1,
      [`browsers.${browserKey}`]: 1,
      [`countries.${countryKey}`]: 1,
      [`languages.${languageKey(language)}`]: 1,
      [`referrers.${encodeHost(referrerHost)}`]: 1,
    };
  }

  const actionKey = CLICK_ACTION_VALUES.includes(action) ? action : "external";

  return {
    "clicks.total": 1,
    [`clicks.${actionKey}`]: 1,
    [`clickDevices.${deviceKey}`]: 1,
    [`clickActionDevices.${actionKey}.${deviceKey}`]: 1,
    [`clickCountries.${countryKey}`]: 1,
    [`clickActionCountries.${actionKey}.${countryKey}`]: 1,
  };
}

/**
 * Records one event and returns what was written.
 *
 * Bots are recorded in `events` with their type set to bot but are left out of
 * the counters, so a link preview fetch does not read as a visit while still
 * being visible if anyone goes looking.
 */
export async function recordEvent({
  type,
  project,
  action = null,
  label = null,
  target = null,
  path = null,
  visitorId = null,
  sessionId = null,
  client,
}) {
  await ensureIndexes();

  const now = new Date();
  const counted = !client.isBot;

  const isUnique =
    counted && type === EVENT_TYPES.VIEW
      ? await isFirstViewForVisitor(project, visitorId)
      : false;

  const device = {
    type: client.deviceType,
    os: client.os,
    browser: client.browser,
    browserVersion: client.browserVersion,
    platformHint: client.platformHint,
  };

  const document = {
    type,
    project,
    action,
    label,
    target,
    path,
    visitorId,
    sessionId,
    device,
    referrerHost: client.referrerHost,
    language: client.language,
    country: client.country ?? null,
    ipHash: client.ipHash,
    isBot: client.isBot,
    counted,
    isUniqueVisitor: isUnique,
    createdAt: now,
  };

  const events = await eventsCollection();
  const writes = [events.insertOne(document)];

  if (counted) {
    const stats = await projectStatsCollection();
    writes.push(
      stats.updateOne(
        { project },
        {
          $inc: buildIncrement({
            type,
            action,
            device,
            country: client.country,
            language: client.language,
            referrerHost: client.referrerHost,
            isUnique,
          }),
          $set: { lastEventAt: now, label: labelFor(project) },
          $setOnInsert: { project, firstEventAt: now },
        },
        { upsert: true },
      ),
    );
  }

  await Promise.all(writes);

  return { counted, isUnique, device };
}

/** Zeroes so a project with no traffic yet still reads as a full row. */
function emptyStats(project) {
  return {
    project,
    label: labelFor(project),
    views: 0,
    uniqueViews: 0,
    clicks: { total: 0 },
    devices: {},
    os: {},
    browsers: {},
    countries: {},
    languages: {},
    referrers: {},
    clickDevices: {},
    clickActionDevices: {},
    clickCountries: {},
    clickActionCountries: {},
    firstEventAt: null,
    lastEventAt: null,
  };
}

/** One counter row as the API hands it out, with the encoded hosts put back. */
function presentStats(project, row) {
  const merged = { ...emptyStats(project), ...(row ?? {}) };
  return { ...merged, referrers: decodeHostKeys(merged.referrers) };
}

/**
 * Every project's counters, including the ones with no traffic, so the shape
 * of the response does not change as the site gets its first visitors.
 */
export async function readAllStats() {
  await ensureIndexes();

  const stats = await projectStatsCollection();
  const rows = await stats.find({}, { projection: { _id: 0 } }).toArray();
  const byProject = new Map(rows.map((row) => [row.project, row]));

  return PROJECT_SLUGS.map((slug) => presentStats(slug, byProject.get(slug)));
}

export async function readProjectStats(project) {
  await ensureIndexes();

  const stats = await projectStatsCollection();
  const row = await stats.findOne({ project }, { projection: { _id: 0 } });

  return presentStats(project, row);
}

/** The breakdown maps that are summed across projects for the top of the page. */
const SUMMED_BREAKDOWNS = [
  "devices",
  "os",
  "browsers",
  "countries",
  "languages",
  "referrers",
  "clickCountries",
];

/**
 * A rolled up view across every project, for the top of a dashboard. Built
 * from the counter rows rather than the raw events, so it stays cheap however
 * many events have been recorded.
 */
export async function readSummary() {
  const rows = await readAllStats();

  const summary = {
    views: 0,
    uniqueViews: 0,
    clicks: 0,
    downloadClicks: 0,
    buyClicks: 0,
    donateClicks: 0,
    devices: {},
    os: {},
    browsers: {},
    countries: {},
    languages: {},
    referrers: {},
    clickCountries: {},
  };

  for (const row of rows) {
    summary.views += row.views ?? 0;
    summary.uniqueViews += row.uniqueViews ?? 0;
    summary.clicks += row.clicks?.total ?? 0;
    summary.downloadClicks += row.clicks?.download ?? 0;
    summary.buyClicks += row.clicks?.buy ?? 0;
    summary.donateClicks += row.clicks?.donate ?? 0;

    for (const key of SUMMED_BREAKDOWNS) {
      for (const [name, count] of Object.entries(row[key] ?? {})) {
        summary[key][name] = (summary[key][name] ?? 0) + count;
      }
    }
  }

  return { summary, projects: rows };
}

/**
 * How many people, not how many clicks.
 *
 * The counters say a download button was hit 40 times. This says whether that
 * was 40 people or one person on a bad connection, by counting distinct
 * visitor ids per project and action in the raw rows. Two $group stages
 * rather than an $addToSet, so the work is a count per visitor and never a
 * list of every visitor held in memory.
 *
 * A click with no visitor id is counted as a click but not as a person, and
 * the raw rows expire, so "people" is a floor over the retention window while
 * the counters carry the all time total. Both are shown so the gap is visible.
 */
export async function readClickers() {
  await ensureIndexes();

  const events = await eventsCollection();

  const rows = await events
    .aggregate([
      { $match: { type: EVENT_TYPES.CLICK, counted: true } },
      {
        $group: {
          _id: { project: "$project", action: "$action", visitorId: "$visitorId" },
          clicks: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: { project: "$_id.project", action: "$_id.action" },
          clicks: { $sum: "$clicks" },
          people: {
            $sum: { $cond: [{ $eq: ["$_id.visitorId", null] }, 0, 1] },
          },
        },
      },
    ])
    .toArray();

  return rows.map((row) => ({
    project: row._id.project,
    action: row._id.action ?? "external",
    clicks: row.clicks,
    people: row.people,
  }));
}

/** Midnight, UTC, `days` days ago, so a daily series lines up on whole days. */
function startOfWindow(days) {
  const start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  return start;
}

/** The per day buckets, one counter per click action plus the two totals. */
function emptyDay(day) {
  return { day, views: 0, clicks: 0, download: 0, buy: 0, donate: 0, source: 0, external: 0 };
}

/**
 * Views and clicks per day over the last `days` days, oldest first, with every
 * day present even when nothing happened on it. The counters only hold totals,
 * so this is the one dashboard read that walks the raw rows, bounded by the
 * date index and the window.
 */
export async function readDaily({ days = 30 } = {}) {
  await ensureIndexes();

  const window = Math.min(Math.max(days, 1), 180);
  const start = startOfWindow(window);
  const events = await eventsCollection();

  const rows = await events
    .aggregate([
      { $match: { counted: true, createdAt: { $gte: start } } },
      {
        $group: {
          _id: {
            day: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            type: "$type",
            action: "$action",
          },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const byDay = new Map();

  for (let offset = 0; offset < window; offset += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + offset);
    const day = date.toISOString().slice(0, 10);
    byDay.set(day, emptyDay(day));
  }

  for (const row of rows) {
    const bucket = byDay.get(row._id.day);
    if (!bucket) continue;

    if (row._id.type === EVENT_TYPES.VIEW) {
      bucket.views += row.count;
      continue;
    }

    bucket.clicks += row.count;
    const actionKey = CLICK_ACTION_VALUES.includes(row._id.action)
      ? row._id.action
      : "external";
    bucket[actionKey] += row.count;
  }

  return { days: window, since: start.toISOString(), rows: [...byDay.values()] };
}

/**
 * The bug report queue at a glance: how many have come in, how many of those
 * never made it to an inbox, and when the last one arrived.
 */
export async function readBugReportSummary() {
  await ensureIndexes();

  const reports = await bugReportsCollection();

  const [total, failed, latest] = await Promise.all([
    reports.countDocuments({}),
    reports.countDocuments({ emailStatus: "failed" }),
    reports.findOne({}, { sort: { createdAt: -1 }, projection: { _id: 0, createdAt: 1 } }),
  ]);

  return { total, failed, lastReportAt: latest?.createdAt ?? null };
}

/**
 * Everything the dashboard draws, in one call. The summary and project rows
 * are counter reads; the rest are bounded aggregations, run together.
 */
export async function readDashboard() {
  const [{ summary, projects }, clickers, daily, bugReports] = await Promise.all([
    readSummary(),
    readClickers(),
    readDaily({ days: 30 }),
    readBugReportSummary(),
  ]);

  return { summary, projects, clickers, daily, bugReports, generatedAt: new Date() };
}

/**
 * Rebuilds the country, language and referrer maps on every project row from
 * the raw events.
 *
 * Those counters were added after the site had been recording for a while,
 * and the raw rows already carried the referrer host and the language, so the
 * history does not have to start from zero. The maps are replaced, not added
 * to, so running this twice gives the same answer, and running it later
 * simply re-derives them from whatever rows are still inside the retention
 * window. Events recorded before country tracking have no country and land
 * under "unknown".
 *
 * Rows written before the page started sending document.referrer carry the
 * beacon's own Referer, which is always this site, on the live host or a
 * preview one. That says nothing about where the visitor came from, so those
 * rows are counted under "unknown" rather than under the site's own name.
 *
 * Only the four maps are touched. Views, clicks, devices and the rest are left
 * exactly as the live counters have them.
 */
export async function rebuildBreakdowns() {
  await ensureIndexes();

  const ownHosts = new Set(
    env.cors.allowedOrigins
      .map((origin) => {
        try {
          return new URL(origin).host;
        } catch {
          return null;
        }
      })
      .filter(Boolean),
  );
  const isOwnHost = (host) =>
    typeof host === "string" && (ownHosts.has(host) || host.endsWith(".vercel.app"));

  const events = await eventsCollection();
  const stats = await projectStatsCollection();

  const rows = await events
    .aggregate([
      { $match: { counted: true } },
      {
        $group: {
          _id: {
            project: "$project",
            type: "$type",
            action: "$action",
            country: "$country",
            language: "$language",
            referrerHost: "$referrerHost",
          },
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const byProject = new Map();
  const bump = (map, key, count) => {
    map[key] = (map[key] ?? 0) + count;
  };

  for (const row of rows) {
    const { project, type, action, country, language, referrerHost } = row._id;
    if (!PROJECT_SLUGS.includes(project)) continue;

    if (!byProject.has(project)) {
      byProject.set(project, {
        countries: {},
        languages: {},
        referrers: {},
        clickCountries: {},
        clickActionCountries: {},
      });
    }

    const maps = byProject.get(project);
    const countryKey = country ?? UNKNOWN_COUNTRY;

    if (type === EVENT_TYPES.VIEW) {
      bump(maps.countries, countryKey, row.count);
      bump(maps.languages, languageKey(language), row.count);
      bump(
        maps.referrers,
        isOwnHost(referrerHost) ? "unknown" : encodeHost(referrerHost),
        row.count,
      );
      continue;
    }

    const actionKey = CLICK_ACTION_VALUES.includes(action) ? action : "external";
    bump(maps.clickCountries, countryKey, row.count);
    maps.clickActionCountries[actionKey] ??= {};
    bump(maps.clickActionCountries[actionKey], countryKey, row.count);
  }

  let updated = 0;
  for (const [project, maps] of byProject) {
    const result = await stats.updateOne(
      { project },
      {
        $set: maps,
        $setOnInsert: { project, label: labelFor(project), firstEventAt: new Date() },
      },
      { upsert: true },
    );
    updated += result.modifiedCount + result.upsertedCount;
  }

  return { projects: byProject.size, updated };
}

/**
 * The most recent raw events, newest first. Useful when a number looks wrong
 * and you want to see what actually came in.
 */
export async function readRecentEvents({ project = null, limit = 50 } = {}) {
  await ensureIndexes();

  const events = await collection(COLLECTIONS.EVENTS);
  const filter = project ? { project } : {};

  return events
    .find(filter, { projection: { _id: 0, ipHash: 0 } })
    .sort({ createdAt: -1 })
    .limit(Math.min(Math.max(limit, 1), 200))
    .toArray();
}
