import { getJson, postJson } from "./client.js";

/**
 * The bug report form's half of the API.
 *
 * The server saves the report before it tries to email it, so a successful
 * response can still come back with emailed:false. That is a real success and
 * the form says so: the report is filed, the developer will see it, the mail
 * hop just needs retrying at the other end. Telling the reporter it failed
 * would only get the same report sent three more times.
 */

export const SEVERITIES = Object.freeze([
  {
    value: "low",
    label: "Low",
    hint: "Cosmetic, or a workaround exists",
    accent: "sky",
  },
  {
    value: "medium",
    label: "Medium",
    hint: "A feature misbehaves, the server keeps running",
    accent: "amber",
  },
  {
    value: "high",
    label: "High",
    hint: "A system is unusable, or data looks wrong",
    accent: "rose",
  },
  {
    value: "critical",
    label: "Critical",
    hint: "Crashes, data loss, or the server will not start",
    accent: "rose",
  },
]);

export function submitBugReport(report, options) {
  return postJson("/api/bug-report", report, options);
}

/** Tells the form up front whether email delivery is switched on. */
export function readBugReportStatus(options) {
  return getJson("/api/bug-report/status", options);
}
