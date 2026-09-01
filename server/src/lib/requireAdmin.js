import env from "../config/env.js";
import { isConfigured } from "../db/mongo.js";
import { readSession, touchSession } from "../services/adminAuth.js";
import { parseCookies } from "./cookies.js";

/**
 * The gate in front of everything an admin can see.
 *
 * It answers three questions in order: is there a session cookie, is the
 * session behind it still good, and has the account cleared the password
 * change it was told to make. Anything that fails is a 401 or 403 with no
 * detail, because a signed out browser has no business learning why.
 */

export const ADMIN_COOKIE = env.admin.cookieName;

/** Stats and account data should never sit in a proxy or a back button cache. */
export function noStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.setHeader("Pragma", "no-cache");
  // Belt and braces with robots.txt and the meta tag on the page: nothing
  // behind this gate should turn up in a search result.
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
}

export function readSessionToken(req) {
  const jar = parseCookies(req.headers.cookie);
  const value = jar[ADMIN_COOKIE];
  return typeof value === "string" && value !== "" ? value : null;
}

function unauthorized(res, message = "Sign in to continue.") {
  noStore(res);
  return res.status(401).json({ ok: false, error: "unauthorized", message });
}

/**
 * Refuses a state changing request that another site started.
 *
 * The session cookie is already SameSite=Strict, so a browser will not attach
 * it to a cross site request in the first place. This is the second lock: it
 * costs one header comparison and it still holds if the cookie policy is ever
 * loosened, or if a browser is lenient about what counts as same site.
 */
export function sameOriginOnly(req, res, next) {
  const origin = req.headers.origin;

  // No Origin header at all is curl, a server to server call or a same origin
  // GET. None of those are the case this defends against.
  if (!origin) return next();

  const host = req.headers["x-forwarded-host"] ?? req.headers.host;

  let originHost;
  try {
    originHost = new URL(origin).host;
  } catch {
    originHost = null;
  }

  if (originHost && host && originHost === host) return next();

  noStore(res);
  return res.status(403).json({
    ok: false,
    error: "cross_origin",
    message: "This request has to come from the site itself.",
  });
}

/**
 * `allowPasswordChange` is set on the two routes an account with a temporary
 * password is still allowed to reach. Everything else waits until the password
 * has actually been replaced.
 */
export function requireAdmin({ allowPasswordChange = false } = {}) {
  return async (req, res, next) => {
    if (!isConfigured()) {
      noStore(res);
      return res.status(503).json({
        ok: false,
        error: "not_configured",
        message: "The database is not configured, so the admin area is unavailable.",
      });
    }

    const token = readSessionToken(req);
    if (!token) return unauthorized(res);

    let found;
    try {
      found = await readSession(token);
    } catch (error) {
      return next(error);
    }

    if (!found) return unauthorized(res, "That session has expired. Sign in again.");

    const { session, user } = found;
    const mustChange = session.mustChangePassword === true || user.mustChangePassword === true;

    if (mustChange && !allowPasswordChange) {
      noStore(res);
      return res.status(403).json({
        ok: false,
        error: "password_change_required",
        message: "Set a new password before going any further.",
      });
    }

    let expiresAt = session.expiresAt;
    try {
      expiresAt = await touchSession(session);
    } catch {
      // Failing to slide the window is not worth failing the request over.
      // The session simply expires at the time it already had.
    }

    req.admin = {
      username: user.username,
      session,
      user,
      mustChangePassword: mustChange,
      expiresAt,
      token,
    };

    noStore(res);
    return next();
  };
}

export default requireAdmin;
