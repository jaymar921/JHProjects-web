import "dotenv/config";

/**
 * Every environment value the server reads, resolved once and in one place.
 *
 * Nothing in here throws on import. A missing MONGODB_URI or SMTP password
 * should degrade one feature, not take the whole API down at boot, because on
 * a serverless deploy a throw at import time turns every route into a 500 with
 * no useful message. Each feature checks its own `configured` flag instead.
 */

const read = (name, fallback = "") => {
  const value = process.env[name];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : fallback;
};

const readInt = (name, fallback) => {
  const parsed = Number.parseInt(read(name), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const readList = (name) =>
  read(name)
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);

/** A setting that only has a few legal values, with anything else ignored. */
const oneOfEnv = (name, allowed, fallback) => {
  const value = read(name, fallback).toLowerCase();
  return allowed.includes(value) ? value : fallback;
};

const mongoUri = read("MONGODB_URI");
const smtpUser = read("SMTP_USER");
const smtpPassword = read("SMTP_PASSWORD");

export const env = {
  nodeEnv: read("NODE_ENV", "development"),
  isProduction: read("NODE_ENV", "development") === "production",
  port: readInt("PORT", 4000),

  mongo: {
    uri: mongoUri,
    dbName: read("MONGODB_DB", "jhprojects"),
    configured: mongoUri !== "",
    /**
     * How long a raw event is kept. The rolled up counters are permanent, so
     * dropping the raw rows after a while keeps the collection small without
     * losing the totals. Set to 0 to keep everything.
     */
    eventTtlDays: readInt("ANALYTICS_EVENT_TTL_DAYS", 180),
  },

  /**
   * Salt for the one way hash of a visitor's IP. The hash is only ever used to
   * spot abuse and to count unique visitors; the raw address is never stored.
   * A missing salt is not fatal, but it makes the hashes guessable, so it is
   * reported by /api/health.
   */
  hashSalt: read("ANALYTICS_HASH_SALT"),

  smtp: {
    host: read("SMTP_HOST", "smtp.gmail.com"),
    port: readInt("SMTP_PORT", 465),
    secure: read("SMTP_SECURE", "true") !== "false",
    user: smtpUser,
    password: smtpPassword,
    /** Where bug reports land. */
    to: read("BUG_REPORT_TO", "jaymarplugins@gmail.com"),
    from: read("SMTP_FROM", smtpUser),
    configured: smtpUser !== "" && smtpPassword !== "",
  },

  cors: {
    /**
     * Empty means "reflect any origin", which is what a public read-only
     * tracking endpoint wants in development. In production, set this to the
     * real site origins so another site cannot post events as you.
     */
    allowedOrigins: readList("CORS_ALLOWED_ORIGINS"),
  },

  rateLimit: {
    trackPerMinute: readInt("RATE_LIMIT_TRACK_PER_MINUTE", 120),
    bugReportPerHour: readInt("RATE_LIMIT_BUG_REPORT_PER_HOUR", 5),
  },

  /**
   * The admin gateway at /admin.
   *
   * A login there is worth more than a stats number, so the defaults are on
   * the strict side: a session goes stale after half an hour of silence, is
   * thrown away after twelve hours however busy it was, and five wrong
   * passwords stand the account down for fifteen minutes.
   */
  admin: {
    cookieName: read("ADMIN_COOKIE_NAME", "jhp_admin"),
    /** Minutes of inactivity before a session stops being accepted. */
    sessionIdleMinutes: readInt("ADMIN_SESSION_IDLE_MINUTES", 30),
    /** Hard ceiling on a session's life, however active it is. */
    sessionMaxHours: readInt("ADMIN_SESSION_MAX_HOURS", 12),
    /** How long a temporary password stays usable before it has to be reissued. */
    tempPasswordHours: readInt("ADMIN_TEMP_PASSWORD_HOURS", 24),
    maxFailedAttempts: readInt("ADMIN_MAX_FAILED_ATTEMPTS", 5),
    lockMinutes: readInt("ADMIN_LOCK_MINUTES", 15),
    /** Login attempts per hashed address per quarter hour, before the account lock. */
    loginPerQuarterHour: readInt("RATE_LIMIT_ADMIN_LOGIN_PER_15_MIN", 10),
    /**
     * Whether the session cookie is marked Secure. "auto", the default, reads
     * it off the protocol the request actually arrived on, which is https on
     * Vercel and http on the dev server. Deciding this from NODE_ENV instead
     * would mark the cookie Secure while developing against a production style
     * .env, and a browser drops a Secure cookie on plain http without a word,
     * which looks exactly like a broken login. "true" and "false" force it.
     */
    cookieSecure: oneOfEnv("ADMIN_COOKIE_SECURE", ["auto", "true", "false"], "auto"),
  },

  /**
   * An optional second way into GET /api/stats, for a script or a dashboard
   * that cannot hold a session cookie. Unset, the stats endpoints are reachable
   * only with an admin session; they are never public.
   */
  statsToken: read("STATS_TOKEN"),
};

export default env;
