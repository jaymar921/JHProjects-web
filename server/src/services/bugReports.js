import { bugReportsCollection, ensureIndexes } from "../db/collections.js";
import { labelFor } from "../../../shared/projects.js";
import { isMailConfigured, sendMail } from "./mailer.js";

/**
 * Filing a bug report.
 *
 * The report is written to the database first and emailed second, on purpose.
 * A report that is saved but not delivered can be found and resent; a report
 * that is emailed from memory and then lost to a dropped connection is gone.
 * The row carries an emailStatus so it is obvious which is which.
 */

const EMAIL_STATUS = Object.freeze({
  SENT: "sent",
  FAILED: "failed",
  SKIPPED: "skipped",
});

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Turns the report into the plain text half of the email. */
function buildText(report) {
  const lines = [
    `Project:          ${labelFor(report.project)}`,
    `Severity:         ${report.severity}`,
    `Plugin version:   ${report.pluginVersion ?? "not given"}`,
    `Minecraft:        ${report.minecraftVersion ?? "not given"}`,
    `Server software:  ${report.serverSoftware ?? "not given"}`,
    `Reporter:         ${report.reporterName ?? "anonymous"}`,
    `Reply to:         ${report.reporterEmail ?? "no address given"}`,
    "",
    "SUMMARY",
    report.summary,
    "",
    "DESCRIPTION",
    report.description,
  ];

  if (report.expectedBehavior) {
    lines.push("", "EXPECTED BEHAVIOUR", report.expectedBehavior);
  }

  if (report.stepsToReproduce) {
    lines.push("", "STEPS TO REPRODUCE", report.stepsToReproduce);
  }

  if (report.logs) {
    lines.push("", "LOGS OR STACK TRACE", report.logs);
  }

  if (report.additionalContext) {
    lines.push("", "ADDITIONAL CONTEXT", report.additionalContext);
  }

  lines.push(
    "",
    "-----",
    `Reported from: ${report.pageUrl ?? "unknown page"}`,
    `Device:        ${report.device.type}, ${report.device.os}, ${report.device.browser}`,
    `Received:      ${report.createdAt.toISOString()}`,
  );

  return lines.join("\n");
}

const SEVERITY_COLOURS = {
  low: "#38bdf8",
  medium: "#fbbf24",
  high: "#fb7185",
  critical: "#f43f5e",
};

/**
 * The HTML half. Inline styles only, because every mail client throws away a
 * stylesheet, and a dark card with a coloured severity bar reads at a glance
 * in an inbox that is mostly receipts.
 */
function buildHtml(report) {
  const accent = SEVERITY_COLOURS[report.severity] ?? "#a3e635";

  const field = (label, value) =>
    value
      ? `<tr>
           <td style="padding:6px 12px 6px 0;color:#94a3b8;font-size:12px;white-space:nowrap;vertical-align:top;">${escapeHtml(label)}</td>
           <td style="padding:6px 0;color:#e2e8f0;font-size:13px;">${escapeHtml(value)}</td>
         </tr>`
      : "";

  const block = (label, value) =>
    value
      ? `<h3 style="margin:22px 0 6px;color:${accent};font-size:12px;letter-spacing:1.5px;text-transform:uppercase;">${escapeHtml(label)}</h3>
         <pre style="margin:0;padding:12px;background:#0b0d11;border:1px solid #1e293b;color:#cbd5f5;font-size:13px;line-height:1.6;white-space:pre-wrap;word-break:break-word;font-family:ui-monospace,Menlo,Consolas,monospace;">${escapeHtml(value)}</pre>`
      : "";

  return `<div style="background:#0e1014;padding:24px;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
  <div style="max-width:680px;margin:0 auto;background:#11141a;border:1px solid #1e293b;border-top:4px solid ${accent};">
    <div style="padding:20px 24px;border-bottom:1px solid #1e293b;">
      <p style="margin:0;color:${accent};font-size:11px;letter-spacing:2px;text-transform:uppercase;">Bug report - ${escapeHtml(report.severity)}</p>
      <h1 style="margin:8px 0 0;color:#f1f5f9;font-size:19px;line-height:1.4;">${escapeHtml(report.summary)}</h1>
      <p style="margin:6px 0 0;color:#94a3b8;font-size:13px;">${escapeHtml(labelFor(report.project))}</p>
    </div>

    <div style="padding:20px 24px;">
      <table style="border-collapse:collapse;width:100%;">
        ${field("Plugin version", report.pluginVersion)}
        ${field("Minecraft", report.minecraftVersion)}
        ${field("Server software", report.serverSoftware)}
        ${field("Reporter", report.reporterName)}
        ${field("Reply to", report.reporterEmail)}
      </table>

      ${block("Description", report.description)}
      ${block("Expected behaviour", report.expectedBehavior)}
      ${block("Steps to reproduce", report.stepsToReproduce)}
      ${block("Logs or stack trace", report.logs)}
      ${block("Additional context", report.additionalContext)}
    </div>

    <div style="padding:14px 24px;border-top:1px solid #1e293b;color:#64748b;font-size:11px;line-height:1.7;">
      Reported from ${escapeHtml(report.pageUrl ?? "an unknown page")}<br />
      ${escapeHtml(report.device.type)} &middot; ${escapeHtml(report.device.os)} &middot; ${escapeHtml(report.device.browser)}<br />
      ${escapeHtml(report.createdAt.toISOString())}
    </div>
  </div>
</div>`;
}

/**
 * Saves the report, then tries to email it. The caller is told whether the
 * email went out, but a failed send is not a failed submission: the report is
 * already safe, and telling the reporter it failed would only get it filed
 * twice.
 */
export async function fileBugReport(report) {
  await ensureIndexes();

  const reports = await bugReportsCollection();
  const inserted = await reports.insertOne({
    ...report,
    emailStatus: isMailConfigured() ? "pending" : EMAIL_STATUS.SKIPPED,
  });

  if (!isMailConfigured()) {
    return { id: inserted.insertedId, emailed: false, reason: "not_configured" };
  }

  const subject = `[${labelFor(report.project)}] ${report.severity.toUpperCase()}: ${report.summary}`;

  try {
    const info = await sendMail({
      subject: subject.slice(0, 180),
      text: buildText(report),
      html: buildHtml(report),
      replyTo: report.reporterEmail ?? undefined,
    });

    await reports.updateOne(
      { _id: inserted.insertedId },
      { $set: { emailStatus: EMAIL_STATUS.SENT, emailMessageId: info.messageId ?? null, emailedAt: new Date() } },
    );

    return { id: inserted.insertedId, emailed: true };
  } catch (error) {
    await reports.updateOne(
      { _id: inserted.insertedId },
      { $set: { emailStatus: EMAIL_STATUS.FAILED, emailError: error.message } },
    );

    return { id: inserted.insertedId, emailed: false, reason: error.message };
  }
}

export { EMAIL_STATUS, buildHtml, buildText };
