import { Router } from "express";
import env from "../config/env.js";
import { describeClient } from "../lib/clientInfo.js";
import { rateLimit } from "../lib/rateLimit.js";
import {
  oneOf,
  optionalEmail,
  optionalString,
  optionalUrl,
  requiredString,
} from "../lib/validate.js";
import { fileBugReport } from "../services/bugReports.js";
import { isMailConfigured } from "../services/mailer.js";
import { PROJECTS, PROJECT_SLUGS } from "../../../shared/projects.js";

/**
 * POST /api/bug-report
 *
 * Takes the form on the plugin pages, saves it and emails it on. Five per hour
 * per address, which is generous for someone filing real reports and tight
 * enough that a bot gets bored.
 */

const router = Router();

export const SEVERITIES = Object.freeze(["low", "medium", "high", "critical"]);

router.use((req, _res, next) => {
  req.client = describeClient(req);
  next();
});

router.use(
  rateLimit({
    name: "bug-report",
    limit: env.rateLimit.bugReportPerHour,
    windowMs: 60 * 60 * 1000,
    keyFor: (req) => req.client?.ipHash ?? null,
  }),
);

/**
 * Field limits. The logs box is the generous one, because a stack trace is
 * long and truncating it is exactly the thing that makes a report useless.
 */
const LIMITS = {
  summary: 140,
  description: 4000,
  expectedBehavior: 2000,
  stepsToReproduce: 2000,
  logs: 12000,
  additionalContext: 2000,
  reporterName: 80,
  pluginVersion: 40,
  minecraftVersion: 40,
  serverSoftware: 60,
};

router.post("/", async (req, res, next) => {
  try {
    const body = req.body ?? {};

    // A hidden field no person ever sees, so anything in it came from a bot
    // filling the form blind. Answered with a cheerful 202 so the bot has no
    // signal to adapt to.
    if (typeof body.website === "string" && body.website.trim() !== "") {
      return res.status(202).json({ ok: true, emailed: false });
    }

    const project = oneOf(body.project, PROJECT_SLUGS, {
      field: "project",
      fallback: PROJECTS.CE3,
    });

    const report = {
      project,
      severity: oneOf(body.severity, SEVERITIES, {
        field: "severity",
        fallback: "medium",
      }),
      summary: requiredString(body.summary, {
        min: 5,
        max: LIMITS.summary,
        field: "summary",
      }),
      description: requiredString(body.description, {
        min: 20,
        max: LIMITS.description,
        field: "description",
      }),
      expectedBehavior: optionalString(body.expectedBehavior, {
        max: LIMITS.expectedBehavior,
        field: "expectedBehavior",
      }),
      stepsToReproduce: optionalString(body.stepsToReproduce, {
        max: LIMITS.stepsToReproduce,
        field: "stepsToReproduce",
      }),
      logs: optionalString(body.logs, { max: LIMITS.logs, field: "logs" }),
      additionalContext: optionalString(body.additionalContext, {
        max: LIMITS.additionalContext,
        field: "additionalContext",
      }),
      pluginVersion: optionalString(body.pluginVersion, {
        max: LIMITS.pluginVersion,
        field: "pluginVersion",
      }),
      minecraftVersion: optionalString(body.minecraftVersion, {
        max: LIMITS.minecraftVersion,
        field: "minecraftVersion",
      }),
      serverSoftware: optionalString(body.serverSoftware, {
        max: LIMITS.serverSoftware,
        field: "serverSoftware",
      }),
      reporterName: optionalString(body.reporterName, {
        max: LIMITS.reporterName,
        field: "reporterName",
      }),
      reporterEmail: optionalEmail(body.reporterEmail, { field: "reporterEmail" }),
      pageUrl: optionalUrl(body.pageUrl, { field: "pageUrl" }),
      device: {
        type: req.client.deviceType,
        os: req.client.os,
        browser: req.client.browser,
        browserVersion: req.client.browserVersion,
      },
      referrerHost: req.client.referrerHost,
      language: req.client.language,
      ipHash: req.client.ipHash,
      createdAt: new Date(),
    };

    const result = await fileBugReport(report);

    // The report is saved either way, so this is a success even when the mail
    // hop failed. Saying otherwise would only get the same report filed twice.
    return res.status(201).json({
      ok: true,
      id: String(result.id),
      emailed: result.emailed,
      ...(result.emailed ? {} : { emailNote: mailNote(result.reason) }),
    });
  } catch (error) {
    return next(error);
  }
});

function mailNote(reason) {
  if (reason === "not_configured") {
    return "Saved. Email delivery is not switched on for this deployment.";
  }
  return "Saved. The email could not be delivered right now and will need resending.";
}

/** Lets the form tell the visitor up front whether email is actually wired up. */
router.get("/status", (_req, res) => {
  res.json({ ok: true, mailConfigured: isMailConfigured(), severities: SEVERITIES });
});

export default router;
