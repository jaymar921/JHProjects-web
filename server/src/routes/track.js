import { Router } from "express";
import env from "../config/env.js";
import { EVENT_TYPES } from "../db/collections.js";
import { describeClient } from "../lib/clientInfo.js";
import { rateLimit } from "../lib/rateLimit.js";
import {
  ValidationError,
  optionalId,
  optionalString,
  optionalUrl,
  oneOf,
} from "../lib/validate.js";
import { recordEvent } from "../services/analytics.js";
import {
  CLICK_ACTIONS,
  CLICK_ACTION_VALUES,
  PROJECT_SLUGS,
} from "../../../shared/projects.js";

/**
 * The two endpoints the site posts to.
 *
 *   POST /api/track/view    a page was opened
 *   POST /api/track/click   a download, buy or other tracked button was hit
 *
 * Both answer 202 rather than 200. The browser sends these with sendBeacon,
 * which cannot read a response, and nothing on the page waits for one, so the
 * honest status is "accepted, will be recorded" rather than "done".
 */

const router = Router();

const limiter = rateLimit({
  name: "track",
  limit: env.rateLimit.trackPerMinute,
  windowMs: 60_000,
  keyFor: (req) => req.client?.ipHash ?? null,
});

/** Works out who is asking once, so both routes and the limiter can use it. */
router.use((req, _res, next) => {
  req.client = describeClient(req);
  next();
});

router.use(limiter);

/**
 * The path is taken from the body rather than the referrer so that a page
 * opened with a query string is recorded as the route it is, but it is capped
 * and stripped of anything but a path.
 */
function readPath(value) {
  const cleaned = optionalString(value, { max: 200, field: "path" });
  if (cleaned === null) return null;
  return cleaned.startsWith("/") ? cleaned.split("?")[0] : null;
}

router.post("/view", async (req, res, next) => {
  try {
    const body = req.body ?? {};

    const project = oneOf(body.project, PROJECT_SLUGS, { field: "project" });

    const result = await recordEvent({
      type: EVENT_TYPES.VIEW,
      project,
      path: readPath(body.path),
      visitorId: optionalId(body.visitorId),
      sessionId: optionalId(body.sessionId),
      client: req.client,
    });

    res.status(202).json({ ok: true, counted: result.counted });
  } catch (error) {
    next(error);
  }
});

router.post("/click", async (req, res, next) => {
  try {
    const body = req.body ?? {};

    const project = oneOf(body.project, PROJECT_SLUGS, { field: "project" });
    const action = oneOf(body.action, CLICK_ACTION_VALUES, {
      field: "action",
      fallback: CLICK_ACTIONS.EXTERNAL,
    });

    const result = await recordEvent({
      type: EVENT_TYPES.CLICK,
      project,
      action,
      label: optionalString(body.label, { max: 80, field: "label" }),
      target: optionalUrl(body.target, { field: "target" }),
      path: readPath(body.path),
      visitorId: optionalId(body.visitorId),
      sessionId: optionalId(body.sessionId),
      client: req.client,
    });

    res.status(202).json({ ok: true, counted: result.counted });
  } catch (error) {
    next(error);
  }
});

/**
 * One call for a page that wants to send a view and a click together, or a
 * queue of events flushed on unload. Each entry is validated on its own and a
 * bad one is skipped rather than failing the batch, since a beacon cannot be
 * retried.
 */
router.post("/batch", async (req, res, next) => {
  try {
    const entries = Array.isArray(req.body?.events) ? req.body.events : null;

    if (!entries) {
      throw new ValidationError("events must be an array", "events");
    }

    // A beacon payload is capped at 64KB by the browser anyway. This is the
    // belt to that braces.
    const capped = entries.slice(0, 20);
    let accepted = 0;

    for (const entry of capped) {
      try {
        const type = oneOf(entry?.type, [EVENT_TYPES.VIEW, EVENT_TYPES.CLICK], {
          field: "type",
        });
        const project = oneOf(entry?.project, PROJECT_SLUGS, { field: "project" });

        await recordEvent({
          type,
          project,
          action:
            type === EVENT_TYPES.CLICK
              ? oneOf(entry.action, CLICK_ACTION_VALUES, {
                  field: "action",
                  fallback: CLICK_ACTIONS.EXTERNAL,
                })
              : null,
          label: optionalString(entry.label, { max: 80, field: "label" }),
          target: optionalUrl(entry.target, { field: "target" }),
          path: readPath(entry.path),
          visitorId: optionalId(entry.visitorId),
          sessionId: optionalId(entry.sessionId),
          client: req.client,
        });

        accepted += 1;
      } catch {
        // One malformed entry should not cost the rest of the batch.
      }
    }

    res.status(202).json({ ok: true, accepted, received: capped.length });
  } catch (error) {
    next(error);
  }
});

export default router;
