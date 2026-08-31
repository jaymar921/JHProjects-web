import {
  COLLECTIONS,
  EVENT_TYPES,
  collection,
  ensureIndexes,
  eventsCollection,
  projectStatsCollection,
} from "../db/collections.js";
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
 * paths built below can never carry user supplied text into a key.
 */

/** Keys that get their own counter under `devices`. */
const DEVICE_KEYS = Object.values(DEVICE_TYPES);

function safeKey(value) {
  // Mongo rejects dots and leading dollars in field names. Nothing that
  // reaches here should contain either, but a new browser string is not worth
  // a failed write.
  if (typeof value !== "string" || value.trim() === "") return "Unknown";
  return value.replace(/[.$]/g, "_").slice(0, 40);
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
 * Builds the $inc for one event. Views bump the view counters and the device
 * breakdown; clicks bump the click counters and are broken down by action and
 * by device, so "how many of the buy clicks came from a phone" is answerable
 * without touching the raw rows.
 */
function buildIncrement({ type, action, device, isUnique }) {
  const deviceKey = DEVICE_KEYS.includes(device.type) ? device.type : DEVICE_TYPES.UNKNOWN;
  const osKey = safeKey(device.os);
  const browserKey = safeKey(device.browser);

  if (type === EVENT_TYPES.VIEW) {
    return {
      views: 1,
      ...(isUnique ? { uniqueViews: 1 } : {}),
      [`devices.${deviceKey}`]: 1,
      [`os.${osKey}`]: 1,
      [`browsers.${browserKey}`]: 1,
    };
  }

  const actionKey = CLICK_ACTION_VALUES.includes(action) ? action : "external";

  return {
    "clicks.total": 1,
    [`clicks.${actionKey}`]: 1,
    [`clickDevices.${deviceKey}`]: 1,
    [`clickActionDevices.${actionKey}.${deviceKey}`]: 1,
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
          $inc: buildIncrement({ type, action, device, isUnique }),
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
    clickDevices: {},
    clickActionDevices: {},
    firstEventAt: null,
    lastEventAt: null,
  };
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

  return PROJECT_SLUGS.map((slug) => ({
    ...emptyStats(slug),
    ...(byProject.get(slug) ?? {}),
  }));
}

export async function readProjectStats(project) {
  await ensureIndexes();

  const stats = await projectStatsCollection();
  const row = await stats.findOne({ project }, { projection: { _id: 0 } });

  return { ...emptyStats(project), ...(row ?? {}) };
}

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
    devices: {},
    os: {},
    browsers: {},
  };

  for (const row of rows) {
    summary.views += row.views ?? 0;
    summary.uniqueViews += row.uniqueViews ?? 0;
    summary.clicks += row.clicks?.total ?? 0;
    summary.downloadClicks += row.clicks?.download ?? 0;
    summary.buyClicks += row.clicks?.buy ?? 0;

    for (const key of ["devices", "os", "browsers"]) {
      for (const [name, count] of Object.entries(row[key] ?? {})) {
        summary[key][name] = (summary[key][name] ?? 0) + count;
      }
    }
  }

  return { summary, projects: rows };
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
