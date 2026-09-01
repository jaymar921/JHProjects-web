import { createHash, randomBytes } from "node:crypto";
import env from "../config/env.js";
import {
  adminSessionsCollection,
  adminUsersCollection,
  ensureIndexes,
} from "../db/collections.js";
import {
  assertUsablePassword,
  burnTime,
  generateTemporaryPassword,
  hashPassword,
  verifyPassword,
} from "../lib/password.js";
import { ValidationError } from "../lib/validate.js";

/**
 * The admin account, and the sessions it opens.
 *
 * Three ideas hold this together:
 *
 *   A password is only ever stored as a scrypt hash, and a failed login costs
 *   the same time as a successful one, so a fast 401 cannot be used to find
 *   out which usernames exist.
 *
 *   A session is a random token the browser holds in an HttpOnly cookie, and
 *   what the database holds is a hash of it. A leaked dump of the collection
 *   is therefore not a set of usable sessions.
 *
 *   A temporary password gets in, and nothing else. Until it has been changed
 *   the session is flagged, and the guard in requireAdmin refuses every route
 *   except the one that changes it.
 */

/** Usernames are compared lowercased, so Admin and admin are one account. */
const USERNAME_SHAPE = /^[a-z0-9][a-z0-9._-]{2,31}$/;

export function normalizeUsername(value, { field = "username" } = {}) {
  if (typeof value !== "string") {
    throw new ValidationError("A username is required", field);
  }

  const cleaned = value.trim().toLowerCase();

  if (!USERNAME_SHAPE.test(cleaned)) {
    throw new ValidationError(
      "A username is 3 to 32 characters: letters, digits, dot, dash or underscore",
      field,
    );
  }

  return cleaned;
}

/** The cookie holds the token; the database holds this. */
function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

const minutes = (count) => count * 60 * 1000;
const hours = (count) => count * 60 * 60 * 1000;

/* ------------------------------------------------------------------ *
 * Accounts                                                            *
 * ------------------------------------------------------------------ */

export async function findAdmin(username) {
  await ensureIndexes();
  const users = await adminUsersCollection();
  return users.findOne({ username });
}

export async function countAdmins() {
  await ensureIndexes();
  const users = await adminUsersCollection();
  return users.countDocuments();
}

export async function listAdmins() {
  await ensureIndexes();
  const users = await adminUsersCollection();

  return users
    .find(
      {},
      // The hash is the one field that must never leave the database, so it is
      // excluded here rather than remembered at every call site.
      { projection: { _id: 0, passwordHash: 0 } },
    )
    .sort({ username: 1 })
    .toArray();
}

/**
 * Creates the account, or gives an existing one a fresh temporary password.
 *
 * The generated password is returned once, for the script that asked for it to
 * print, and is not recoverable afterwards. `mustChangePassword` means the
 * first thing the account can do after signing in is replace it.
 */
export async function issueTemporaryPassword(rawUsername) {
  await ensureIndexes();

  const username = normalizeUsername(rawUsername);
  const password = generateTemporaryPassword();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + hours(env.admin.tempPasswordHours));

  const users = await adminUsersCollection();
  const existing = await users.findOne({ username }, { projection: { _id: 1 } });

  await users.updateOne(
    { username },
    {
      $set: {
        passwordHash: await hashPassword(password),
        passwordChangedAt: now,
        passwordIsTemporary: true,
        passwordExpiresAt: expiresAt,
        mustChangePassword: true,
        failedAttempts: 0,
        lockedUntil: null,
        updatedAt: now,
      },
      $setOnInsert: {
        username,
        createdAt: now,
        lastLoginAt: null,
      },
    },
    { upsert: true },
  );

  // A reset is also a revocation. Whoever was holding a session on this
  // account before the password was reissued should not still hold one.
  await revokeAllSessions(username);

  return { username, password, expiresAt, created: existing === null };
}

export async function deleteAdmin(rawUsername) {
  await ensureIndexes();

  const username = normalizeUsername(rawUsername);
  const users = await adminUsersCollection();
  const result = await users.deleteOne({ username });

  await revokeAllSessions(username);

  return result.deletedCount === 1;
}

/* ------------------------------------------------------------------ *
 * Signing in                                                          *
 * ------------------------------------------------------------------ */

/**
 * Checks a username and password.
 *
 * Returns a result rather than throwing, because the route answers almost
 * every failure the same way. The reasons are for the server's own logic, not
 * for the response body: the only case told apart is a locked account, which
 * the person at the keyboard can already work out from being unable to get in.
 */
export async function verifyCredentials({ username: rawUsername, password }) {
  await ensureIndexes();

  let username;
  try {
    username = normalizeUsername(rawUsername);
  } catch {
    // A malformed username cannot match an account, but a real hash is still
    // computed so the timing matches a wrong password on a real one.
    await burnTime(password);
    return { ok: false, reason: "invalid" };
  }

  const users = await adminUsersCollection();
  const user = await users.findOne({ username });

  if (!user) {
    await burnTime(password);
    return { ok: false, reason: "invalid" };
  }

  const now = new Date();

  if (user.lockedUntil instanceof Date && user.lockedUntil > now) {
    return {
      ok: false,
      reason: "locked",
      retryAfterSeconds: Math.ceil((user.lockedUntil - now) / 1000),
    };
  }

  const matches = await verifyPassword(password ?? "", user.passwordHash ?? "");

  if (!matches) {
    const attempts = (user.failedAttempts ?? 0) + 1;
    const locked = attempts >= env.admin.maxFailedAttempts;

    await users.updateOne(
      { username },
      {
        $set: {
          failedAttempts: locked ? 0 : attempts,
          lockedUntil: locked
            ? new Date(now.getTime() + minutes(env.admin.lockMinutes))
            : null,
          lastFailedAt: now,
        },
      },
    );

    return locked
      ? { ok: false, reason: "locked", retryAfterSeconds: env.admin.lockMinutes * 60 }
      : { ok: false, reason: "invalid" };
  }

  /**
   * The password is right but too old to use. This is the deliberate dead end
   * for a temporary password nobody got round to changing: it cannot be used
   * and it cannot be changed from the browser, so a new one has to be issued
   * from a terminal that already holds the database credentials.
   */
  if (user.passwordExpiresAt instanceof Date && user.passwordExpiresAt <= now) {
    return { ok: false, reason: "expired" };
  }

  await users.updateOne(
    { username },
    { $set: { failedAttempts: 0, lockedUntil: null, lastLoginAt: now } },
  );

  return { ok: true, user };
}

/**
 * Replaces a password. The current one is required even though the caller is
 * already signed in, because a session left open on a shared machine should
 * not be enough to lock the owner out of their own account.
 */
export async function changePassword({ username, currentPassword, newPassword }) {
  await ensureIndexes();

  const users = await adminUsersCollection();
  const user = await users.findOne({ username });

  if (!user) throw new ValidationError("That account no longer exists", "username");

  const matches = await verifyPassword(currentPassword ?? "", user.passwordHash ?? "");
  if (!matches) {
    throw new ValidationError("That is not the current password", "currentPassword");
  }

  const cleaned = assertUsablePassword(newPassword, { username });

  if (await verifyPassword(cleaned, user.passwordHash)) {
    throw new ValidationError("The new password must be different", "newPassword");
  }

  const now = new Date();

  await users.updateOne(
    { username },
    {
      $set: {
        passwordHash: await hashPassword(cleaned),
        passwordChangedAt: now,
        passwordIsTemporary: false,
        passwordExpiresAt: null,
        mustChangePassword: false,
        failedAttempts: 0,
        lockedUntil: null,
        updatedAt: now,
      },
    },
  );

  return { username, changedAt: now };
}

/* ------------------------------------------------------------------ *
 * Sessions                                                            *
 * ------------------------------------------------------------------ */

/**
 * Opens a session and hands back the token to put in the cookie.
 *
 * Two clocks run on it. `expiresAt` slides forward while the session is being
 * used, so an idle tab signs itself out; `absoluteExpiresAt` never moves, so a
 * session that is kept warm still ends.
 */
export async function createSession({ username, client, mustChangePassword = false }) {
  await ensureIndexes();

  const token = randomBytes(32).toString("base64url");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + minutes(env.admin.sessionIdleMinutes));

  const sessions = await adminSessionsCollection();

  await sessions.insertOne({
    tokenHash: hashToken(token),
    username,
    createdAt: now,
    lastSeenAt: now,
    expiresAt,
    absoluteExpiresAt: new Date(now.getTime() + hours(env.admin.sessionMaxHours)),
    mustChangePassword,
    ipHash: client?.ipHash ?? null,
    // Kept short, and only so a session can say what opened it. Never parsed,
    // never trusted.
    userAgent:
      typeof client?.userAgent === "string" ? client.userAgent.slice(0, 200) : null,
  });

  return { token, expiresAt };
}

/**
 * Looks a token up and says whether it is still good.
 *
 * A session is only valid while the account behind it still exists and has not
 * had its password changed since the session opened, which is what makes a
 * password change sign every other browser out.
 */
export async function readSession(token) {
  if (typeof token !== "string" || token === "") return null;

  await ensureIndexes();

  const sessions = await adminSessionsCollection();
  const session = await sessions.findOne({ tokenHash: hashToken(token) });

  if (!session) return null;

  const now = new Date();

  // The TTL monitor only runs about once a minute, so an expired row can still
  // be sitting there. The dates are the authority, not the row's existence.
  if (session.expiresAt <= now || session.absoluteExpiresAt <= now) {
    await sessions.deleteOne({ _id: session._id });
    return null;
  }

  const users = await adminUsersCollection();
  const user = await users.findOne({ username: session.username });

  if (!user) {
    await sessions.deleteOne({ _id: session._id });
    return null;
  }

  if (user.passwordChangedAt instanceof Date && user.passwordChangedAt > session.createdAt) {
    await sessions.deleteOne({ _id: session._id });
    return null;
  }

  return { session, user };
}

/**
 * Slides the idle window forward, but never past the absolute end, and at most
 * once a minute. Writing on every request would mean a database write per
 * dashboard refresh for no extra safety.
 */
export async function touchSession(session) {
  const now = new Date();

  if (now - session.lastSeenAt < minutes(1)) return session.expiresAt;

  const slid = new Date(now.getTime() + minutes(env.admin.sessionIdleMinutes));
  const expiresAt = slid > session.absoluteExpiresAt ? session.absoluteExpiresAt : slid;

  const sessions = await adminSessionsCollection();
  await sessions.updateOne({ _id: session._id }, { $set: { lastSeenAt: now, expiresAt } });

  return expiresAt;
}

/** Marks a session as having cleared its forced password change. */
export async function clearSessionPasswordFlag(sessionId) {
  const sessions = await adminSessionsCollection();
  await sessions.updateOne({ _id: sessionId }, { $set: { mustChangePassword: false } });
}

export async function revokeSession(token) {
  if (typeof token !== "string" || token === "") return false;

  await ensureIndexes();

  const sessions = await adminSessionsCollection();
  const result = await sessions.deleteOne({ tokenHash: hashToken(token) });

  return result.deletedCount === 1;
}

export async function revokeAllSessions(username) {
  await ensureIndexes();

  const sessions = await adminSessionsCollection();
  const result = await sessions.deleteMany({ username });

  return result.deletedCount;
}
