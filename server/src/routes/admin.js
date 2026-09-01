import { Router } from "express";
import env from "../config/env.js";
import { isConfigured } from "../db/mongo.js";
import { clearCookie, serializeCookie } from "../lib/cookies.js";
import { describeClient } from "../lib/clientInfo.js";
import { rateLimit } from "../lib/rateLimit.js";
import {
  ADMIN_COOKIE,
  noStore,
  readSessionToken,
  requireAdmin,
  sameOriginOnly,
} from "../lib/requireAdmin.js";
import { cleanString } from "../lib/validate.js";
import {
  changePassword,
  clearSessionPasswordFlag,
  createSession,
  readSession,
  revokeAllSessions,
  revokeSession,
  verifyCredentials,
} from "../services/adminAuth.js";
import { MIN_PASSWORD_LENGTH } from "../lib/password.js";

/**
 * The admin gateway.
 *
 *   GET  /api/admin/session    who, if anyone, this browser is signed in as
 *   POST /api/admin/login      username and password in, cookie out
 *   POST /api/admin/logout     drops the session on both ends
 *   POST /api/admin/password   replaces the password and rotates the session
 *
 * Nothing here is linked from the site and nothing here is indexable. Every
 * response carries no-store and a noindex header, and the routes that change
 * something also insist the request came from this origin.
 */

const router = Router();

router.use((req, _res, next) => {
  req.client = describeClient(req);
  next();
});

/**
 * The lock on the account stops five wrong guesses at one username. This stops
 * one address working through a list of them.
 */
const loginLimiter = rateLimit({
  name: "admin-login",
  limit: env.admin.loginPerQuarterHour,
  windowMs: 15 * 60 * 1000,
  keyFor: (req) => req.client?.ipHash ?? null,
});

/**
 * Whether to mark the cookie Secure. On "auto" this follows the protocol the
 * request actually arrived on, which is https everywhere it matters and http
 * on the dev server, where a Secure cookie would simply be dropped by the
 * browser and the login would look broken for no visible reason. req.secure
 * already accounts for the proxy, because the app sets trust proxy.
 */
function cookieIsSecure(req) {
  if (env.admin.cookieSecure === "true") return true;
  if (env.admin.cookieSecure === "false") return false;
  return req.secure === true || req.headers["x-forwarded-proto"] === "https";
}

/** Max-Age covers the absolute life of a session; idle timeout is the server's job. */
function sessionCookie(req, token) {
  return serializeCookie(ADMIN_COOKIE, token, {
    maxAge: env.admin.sessionMaxHours * 60 * 60,
    httpOnly: true,
    secure: cookieIsSecure(req),
    sameSite: "Strict",
    path: "/",
  });
}

function dropCookie(req) {
  return clearCookie(ADMIN_COOKIE, {
    httpOnly: true,
    secure: cookieIsSecure(req),
    sameSite: "Strict",
    path: "/",
  });
}

function databaseMissing(res) {
  noStore(res);
  return res.status(503).json({
    ok: false,
    error: "not_configured",
    message: "The database is not configured, so the admin area is unavailable.",
  });
}

/* ------------------------------------------------------------------ *
 * Who am I                                                            *
 * ------------------------------------------------------------------ */

/**
 * Deliberately not behind requireAdmin. The page calls this on load to decide
 * whether to show the login form or the dashboard, so "nobody" has to be a
 * normal 200 answer rather than a 401.
 */
router.get("/session", async (req, res, next) => {
  noStore(res);

  if (!isConfigured()) {
    return res.json({ ok: true, authenticated: false, configured: false });
  }

  try {
    const token = readSessionToken(req);
    const found = token ? await readSession(token) : null;

    if (!found) {
      return res.json({ ok: true, authenticated: false, configured: true });
    }

    const { session, user } = found;

    return res.json({
      ok: true,
      configured: true,
      authenticated: true,
      username: user.username,
      mustChangePassword:
        session.mustChangePassword === true || user.mustChangePassword === true,
      passwordIsTemporary: user.passwordIsTemporary === true,
      expiresAt: session.expiresAt,
      minPasswordLength: MIN_PASSWORD_LENGTH,
    });
  } catch (error) {
    return next(error);
  }
});

/* ------------------------------------------------------------------ *
 * Signing in and out                                                  *
 * ------------------------------------------------------------------ */

router.post("/login", sameOriginOnly, loginLimiter, async (req, res, next) => {
  noStore(res);

  if (!isConfigured()) return databaseMissing(res);

  try {
    const body = req.body ?? {};

    // Trimmed and capped, but not validated for shape here: an unusable
    // username has to fail the same way a wrong password does, and it does
    // that inside verifyCredentials, on the same timing.
    const username = typeof body.username === "string" ? body.username.trim().slice(0, 64) : "";
    const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";

    const result = await verifyCredentials({ username, password });

    if (!result.ok) {
      if (result.reason === "locked") {
        res.setHeader("Retry-After", String(result.retryAfterSeconds ?? 900));
        return res.status(429).json({
          ok: false,
          error: "account_locked",
          message: `Too many failed attempts. Try again in about ${Math.ceil(
            (result.retryAfterSeconds ?? 900) / 60,
          )} minutes.`,
        });
      }

      if (result.reason === "expired") {
        return res.status(401).json({
          ok: false,
          error: "password_expired",
          message:
            "That temporary password has expired. A new one has to be issued from a terminal.",
        });
      }

      // One message for a wrong username and a wrong password, so neither can
      // be used to confirm the other.
      return res.status(401).json({
        ok: false,
        error: "invalid_credentials",
        message: "That username and password do not match.",
      });
    }

    const mustChangePassword = result.user.mustChangePassword === true;

    const { token, expiresAt } = await createSession({
      username: result.user.username,
      mustChangePassword,
      client: {
        ipHash: req.client?.ipHash ?? null,
        userAgent: req.headers["user-agent"] ?? null,
      },
    });

    res.setHeader("Set-Cookie", sessionCookie(req, token));

    return res.json({
      ok: true,
      username: result.user.username,
      mustChangePassword,
      passwordIsTemporary: result.user.passwordIsTemporary === true,
      passwordExpiresAt: result.user.passwordExpiresAt ?? null,
      expiresAt,
      minPasswordLength: MIN_PASSWORD_LENGTH,
    });
  } catch (error) {
    return next(error);
  }
});

/**
 * Signing out drops the row as well as the cookie, so a token copied off the
 * machine before signing out is dead too.
 */
router.post("/logout", sameOriginOnly, async (req, res, next) => {
  noStore(res);
  res.setHeader("Set-Cookie", dropCookie(req));

  try {
    const token = readSessionToken(req);
    if (token) await revokeSession(token);
    return res.json({ ok: true, signedOut: true });
  } catch (error) {
    return next(error);
  }
});

/* ------------------------------------------------------------------ *
 * The password                                                        *
 * ------------------------------------------------------------------ */

/**
 * Changing the password ends every session on the account, including this one,
 * and a replacement is issued straight away. That way the browser that made
 * the change stays signed in and every other one is turned out, which is the
 * behaviour you want if the reason for the change is that the old password
 * went somewhere it should not have.
 */
router.post(
  "/password",
  sameOriginOnly,
  requireAdmin({ allowPasswordChange: true }),
  async (req, res, next) => {
    try {
      const body = req.body ?? {};
      const username = req.admin.username;

      await changePassword({
        username,
        currentPassword:
          typeof body.currentPassword === "string" ? body.currentPassword : "",
        newPassword: cleanString(body.newPassword ?? "", {
          max: 200,
          field: "newPassword",
        }),
      });

      await revokeAllSessions(username);

      const { token, expiresAt } = await createSession({
        username,
        mustChangePassword: false,
        client: {
          ipHash: req.client?.ipHash ?? null,
          userAgent: req.headers["user-agent"] ?? null,
        },
      });

      // Belt and braces: the old session is already gone with the rest.
      await clearSessionPasswordFlag(req.admin.session._id);

      res.setHeader("Set-Cookie", sessionCookie(req, token));

      return res.json({
        ok: true,
        username,
        mustChangePassword: false,
        expiresAt,
        message: "Password changed. Every other signed in browser has been signed out.",
      });
    } catch (error) {
      return next(error);
    }
  },
);

export default router;
