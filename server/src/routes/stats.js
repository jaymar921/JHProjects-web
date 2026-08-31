import { Router } from "express";
import env from "../config/env.js";
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
 *   GET /api/stats              every project, plus a rolled up total
 *   GET /api/stats/:project     one project
 *   GET /api/stats/:project/events   the raw rows behind one project
 *
 * These are read only, but they are still the site's own traffic figures, so
 * setting STATS_TOKEN puts them behind a bearer token. Leaving it unset keeps
 * them open, which is fine while the numbers are not worth hiding.
 */

const router = Router();

/**
 * Compares the token in constant time where it matters. A plain !== leaks
 * length through timing, which is not a real threat for a stats page but costs
 * nothing to avoid.
 */
function tokenMatches(provided) {
  const expected = env.statsToken;
  if (expected === "") return true;
  if (typeof provided !== "string" || provided.length !== expected.length) {
    return false;
  }

  let difference = 0;
  for (let index = 0; index < expected.length; index += 1) {
    difference |= expected.charCodeAt(index) ^ provided.charCodeAt(index);
  }

  return difference === 0;
}

router.use((req, res, next) => {
  if (env.statsToken === "") return next();

  const header = req.headers.authorization ?? "";
  const provided = header.startsWith("Bearer ") ? header.slice(7) : "";

  if (!tokenMatches(provided)) {
    return res.status(401).json({ ok: false, error: "unauthorized" });
  }

  return next();
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
