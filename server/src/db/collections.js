import env from "../config/env.js";
import { getDb } from "./mongo.js";

/**
 * Collection names and their indexes.
 *
 * Seven collections, each with a job:
 *
 *   events        every raw view and click, one document each. Optionally
 *                 expires, so the collection does not grow without bound.
 *   project_stats one document per project, holding counters that are bumped
 *                 with $inc. Reading the dashboard never has to scan events.
 *   bug_reports   every submitted report, written before the email is sent so
 *                 a report is never lost when SMTP is down.
 *   admin_users   the accounts allowed into /admin. One document each, holding
 *                 a scrypt hash and never a password.
 *   admin_sessions one document per signed in session, keyed by a hash of the
 *                 cookie value. Expires itself, so a forgotten session does
 *                 not stay valid forever.
 *   plugin_pings  the hourly heartbeat from every server running one of the
 *                 plugins, one document per plugin, server and hour. A second
 *                 ping inside the same hour lands on the same document, so the
 *                 collection is bounded by servers times hours, not by how
 *                 often someone hits the URL. Expires after the plugin stats
 *                 retention window.
 *   plugin_servers one document per server the plugins have been seen on,
 *                 carrying which plugins it runs and when each was last heard
 *                 from. Expires on its own once the server stops pinging.
 */

export const COLLECTIONS = Object.freeze({
  EVENTS: "events",
  PROJECT_STATS: "project_stats",
  BUG_REPORTS: "bug_reports",
  ADMIN_USERS: "admin_users",
  ADMIN_SESSIONS: "admin_sessions",
  PLUGIN_PINGS: "plugin_pings",
  PLUGIN_SERVERS: "plugin_servers",
});

export const EVENT_TYPES = Object.freeze({
  VIEW: "view",
  CLICK: "click",
});

/**
 * Index creation is idempotent, but it still costs a round trip, so it runs
 * once per process rather than on every request. The promise is cached so
 * concurrent requests share the one attempt.
 */
let ensurePromise = null;

async function createIndexes() {
  const db = await getDb();

  const events = db.collection(COLLECTIONS.EVENTS);
  const stats = db.collection(COLLECTIONS.PROJECT_STATS);
  const reports = db.collection(COLLECTIONS.BUG_REPORTS);
  const adminUsers = db.collection(COLLECTIONS.ADMIN_USERS);
  const adminSessions = db.collection(COLLECTIONS.ADMIN_SESSIONS);
  const pluginPings = db.collection(COLLECTIONS.PLUGIN_PINGS);
  const pluginServers = db.collection(COLLECTIONS.PLUGIN_SERVERS);
  const pluginTtlSeconds = env.pluginStats.ttlDays * 24 * 60 * 60;

  const indexes = [
    events.createIndex({ project: 1, createdAt: -1 }),
    events.createIndex({ type: 1, createdAt: -1 }),
    events.createIndex({ project: 1, type: 1, action: 1 }),
    // The last 30 days, by day, for the dashboard's timeline. When the TTL
    // index below is on it covers this already, but a deploy that keeps every
    // event should not have to scan them all to draw a month.
    events.createIndex({ counted: 1, createdAt: -1 }),
    // Answers "has this visitor seen this project before", which is what makes
    // a view unique. Sparse because a visitor id is not guaranteed.
    events.createIndex({ visitorId: 1, project: 1 }, { sparse: true }),
    stats.createIndex({ project: 1 }, { unique: true }),
    reports.createIndex({ createdAt: -1 }),
    reports.createIndex({ project: 1, createdAt: -1 }),
    reports.createIndex({ emailStatus: 1 }),
    adminUsers.createIndex({ username: 1 }, { unique: true }),
    adminSessions.createIndex({ tokenHash: 1 }, { unique: true }),
    adminSessions.createIndex({ username: 1 }),
    // Mongo drops an expired session on its own, so a signed out or abandoned
    // session stops being a row anyone has to remember to clean up. The guard
    // in requireAdmin still checks the date, because the TTL monitor only runs
    // once a minute.
    adminSessions.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    // One row per plugin, server and hour is what the unique index enforces;
    // the upsert in recordPing is what makes a repeat ping land on it.
    pluginPings.createIndex({ plugin: 1, serverKey: 1, hour: 1 }, { unique: true }),
    pluginPings.createIndex({ serverKey: 1, hour: -1 }),
    // The charts read a window of hours, so the expiry index doubles as the
    // one they walk.
    pluginPings.createIndex({ hour: 1 }, { expireAfterSeconds: pluginTtlSeconds }),
    pluginServers.createIndex({ serverKey: 1 }, { unique: true }),
    pluginServers.createIndex({ lastSeenAt: -1 }),
    // A server that has not pinged for the whole window is dropped, which is
    // the "flush after three months" rule with no job to run.
    pluginServers.createIndex({ lastSeenAt: 1 }, { expireAfterSeconds: pluginTtlSeconds }),
  ];

  // A TTL of 0 days means keep raw events forever. The counters in
  // project_stats are never expired either way.
  if (env.mongo.eventTtlDays > 0) {
    indexes.push(
      events.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: env.mongo.eventTtlDays * 24 * 60 * 60 },
      ),
    );
  }

  await Promise.all(indexes);
}

export function ensureIndexes() {
  if (!ensurePromise) {
    ensurePromise = createIndexes().catch((error) => {
      // Let the next request try again. An index that failed to build should
      // not permanently degrade the collection.
      ensurePromise = null;
      throw error;
    });
  }

  return ensurePromise;
}

export async function collection(name) {
  const db = await getDb();
  return db.collection(name);
}

export const eventsCollection = () => collection(COLLECTIONS.EVENTS);
export const projectStatsCollection = () => collection(COLLECTIONS.PROJECT_STATS);
export const bugReportsCollection = () => collection(COLLECTIONS.BUG_REPORTS);
export const adminUsersCollection = () => collection(COLLECTIONS.ADMIN_USERS);
export const adminSessionsCollection = () => collection(COLLECTIONS.ADMIN_SESSIONS);
export const pluginPingsCollection = () => collection(COLLECTIONS.PLUGIN_PINGS);
export const pluginServersCollection = () => collection(COLLECTIONS.PLUGIN_SERVERS);
