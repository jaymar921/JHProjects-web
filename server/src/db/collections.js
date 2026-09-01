import env from "../config/env.js";
import { getDb } from "./mongo.js";

/**
 * Collection names and their indexes.
 *
 * Five collections, each with a job:
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
 */

export const COLLECTIONS = Object.freeze({
  EVENTS: "events",
  PROJECT_STATS: "project_stats",
  BUG_REPORTS: "bug_reports",
  ADMIN_USERS: "admin_users",
  ADMIN_SESSIONS: "admin_sessions",
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

  const indexes = [
    events.createIndex({ project: 1, createdAt: -1 }),
    events.createIndex({ type: 1, createdAt: -1 }),
    events.createIndex({ project: 1, type: 1, action: 1 }),
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
