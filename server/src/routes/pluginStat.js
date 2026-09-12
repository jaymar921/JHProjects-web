import { Router } from "express";
import env from "../config/env.js";
import { describeClient } from "../lib/clientInfo.js";
import { rateLimit } from "../lib/rateLimit.js";
import { optionalString } from "../lib/validate.js";
import { recordPing, serverKeyFor } from "../services/pluginStats.js";

/**
 * GET /plugin-stat/:pluginId/:version
 *
 * The one public URL the plugins call, once an hour, from the server they
 * run on:
 *
 *   /plugin-stat/7433c67f-.../1.7.0?serverName=Jay&serverVersion=1.21.4&totalPlayers=2&errors=0
 *
 * It lives outside /api on purpose, so a scan of the API's own index does not
 * list it, and it is disallowed in robots.txt and served noindex so a crawler
 * that finds it anyway does not keep it.
 *
 * Every answer that is not a recorded ping is the same 404, whether the id is
 * unknown, the method is wrong, the version does not parse or the caller
 * looks like a crawler. The one thing this URL should tell someone probing it
 * is that there is nothing to find, and a different error for each mistake
 * would tell them which mistake they made.
 */

const router = Router();

/** The response for everything that is not a plugin the server knows. */
function notFound(res) {
  res.setHeader("Cache-Control", "no-store");
  return res.status(404).json({
    ok: false,
    error: "not_found",
    message:
      "Nothing here. This address only answers the plugins it already knows, so if you are just having a look around, that is all there is to see. Have a good one.",
  });
}

/** A plugin version: 1.7.0, 1.0.0-rc2, 2.1 and the like. Anything odder is not a version. */
const VERSION_SHAPE = /^\d{1,3}(\.\d{1,4}){1,3}(-[A-Za-z0-9.]{1,16})?$/;

/** The id the plugin keeps on disk to say "same server" across plugins. */
const SERVER_ID_SHAPE = /^[A-Za-z0-9_-]{8,64}$/;

const PLUGIN_BY_ID = new Map(
  Object.entries(env.pluginStats.ids).map(([key, id]) => [id, key]),
);

/**
 * A count the plugin sent, as a non negative integer inside `max`. Anything
 * that is not a number is a zero, since a ping with a bad player count is
 * still a server that is up.
 */
function readCount(value, { max }) {
  if (typeof value !== "string" || value.trim() === "") return 0;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.min(parsed, max);
}

/**
 * The server's name, with Minecraft colour codes and control characters
 * taken out. It is shown on the dashboard, not compared, so it is cleaned and
 * capped rather than refused.
 */
function readServerName(value) {
  if (typeof value !== "string") return null;
  const stripped = value.replace(/[§&][0-9a-fk-orA-FK-OR]/g, "").replace(/\s+/g, " ");
  return optionalString(stripped, { max: 48, field: "serverName" });
}

function readServerVersion(value) {
  if (typeof value !== "string") return null;
  return optionalString(value, { max: 32, field: "serverVersion" });
}

function readServerId(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return SERVER_ID_SHAPE.test(trimmed) ? trimmed : null;
}

const limiter = rateLimit({
  name: "plugin-stat",
  limit: env.rateLimit.pluginStatPerMinute,
  windowMs: 60_000,
  keyFor: (req) => req.client?.ipHash ?? null,
});

router.use((req, res, next) => {
  // Even a good answer is not for a cache or an index.
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  res.setHeader("Cache-Control", "no-store");

  req.client = describeClient(req);
  next();
});

router.use(limiter);

router.get("/:pluginId/:version", async (req, res, next) => {
  try {
    // Express answers a HEAD with the GET handler. A plugin never sends one.
    if (req.method !== "GET") return notFound(res);

    const plugin = PLUGIN_BY_ID.get(String(req.params.pluginId).toLowerCase());
    if (!plugin) return notFound(res);

    const version = String(req.params.version);
    if (!VERSION_SHAPE.test(version)) return notFound(res);

    // A crawler that reached this far has the URL from somewhere it should
    // not. It gets the same nothing as everyone else, and is not recorded.
    if (req.client.isBot || !req.headers["user-agent"]) return notFound(res);

    const query = req.query ?? {};
    const serverName = readServerName(query.serverName) ?? "unknown";
    const serverId = readServerId(query.serverId);

    await recordPing({
      plugin,
      version,
      serverKey: serverKeyFor({ serverId, ipHash: req.client.ipHash, serverName }),
      serverName,
      serverVersion: readServerVersion(query.serverVersion),
      totalPlayers: readCount(query.totalPlayers, { max: 100_000 }),
      errors: readCount(query.errors, { max: 1_000_000 }),
      country: req.client.country,
    });

    return res.json({ ok: true });
  } catch (error) {
    return next(error);
  }
});

// Anything else under /plugin-stat: a POST, a bare /plugin-stat, an extra
// path segment. All the same nothing.
router.all("/{*rest}", (_req, res) => notFound(res));

export default router;
