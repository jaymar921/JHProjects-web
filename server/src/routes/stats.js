import { Router } from "express";
import env from "../config/env.js";
import { noStore, requireAdmin } from "../lib/requireAdmin.js";
import { ValidationError, oneOf } from "../lib/validate.js";
import {
  readProjectStats,
  readRecentEvents,
  readSummary,
} from "../services/analytics.js";
import { PROJECT_SLUGS } from "../../../shared/projects.js";

/**
 * Reading the numbers back.
 *
 *   GET /api/stats                   every project, plus a rolled up total
 *   GET /api/stats/:project          one project
 *   GET /api/stats/:project/events   the raw rows behind one project
 *
 * These are read only, and they are the site's own traffic figures, so they
 * are not public. There are two ways in: the admin session cookie the
 * dashboard at /admin holds, or, when STATS_TOKEN is set, a bearer token for a
 * script that cannot hold a cookie. With no token configured, the session is
 * the only way.
 */

const router = Router();

/**
 * Compares the token in constant time. A plain !== leaks length through
 * timing, which is not much of a threat for a stats page but costs nothing to
 * avoid.
 */
function tokenMatches(provided) {
  const expected = env.statsToken;
  if (expected === "") return false;
  if (typeof provided !== "string" || provided.length !== expected.length) {
    return false;
  }

  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ provided.charCodeAt(index);
  }

  return difference === 0;
}

const sessionGuard = requireAdmin();

/**
 * The bearer token is checked first, because a script sending one is not
 * carrying a cookie and should not pay for a session lookup. Anything without
 * a matching token falls through to the session guard, which answers 401 on
 * its own if there is nothing to check.
 */
router.use((req, res, next) => {
  noStore(res);

  const header = req.headers.authorization ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (provided !== "" && tokenMatches(provided)) {
    req.admin = { username: null, viaToken: true };
    return next();
  }

  return sessionGuard(req, res, next);
});

router.get("/", async (_req, res, next) => {
  try {
    const { summary, projects } = await readSummary();
    res.json({ ok: true, summary, projects });
  } catch (error) {
    next(error);
  }
});

router.get("/:project", async (req, res, next) => {
  try {
    const project = oneOf(req.params.project, PROJECT_SLUGS, { field: "project" });
    const stats = await readProjectStats(project);
    res.json({ ok: true, stats });
  } catch (error) {
    next(error);
  }
});

router.get("/:project/events", async (req, res, next) => {
  try {
    const project = oneOf(req.params.project, PROJECT_SLUGS, { field: "project" });
    const limit = Number.parseInt(req.query.limit ?? "50", 10);

    if (Number.isNaN(limit)) {
      throw new ValidationError("limit must be a number", "limit");
    }

    const events = await readRecentEvents({ project, limit });
    res.json({ ok: true, project, count: events.length, events });
  } catch (error) {
    next(error);
  }
});

export default router;
