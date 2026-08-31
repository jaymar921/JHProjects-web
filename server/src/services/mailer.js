import nodemailer from "nodemailer";
import env from "../config/env.js";

/**
 * The Gmail SMTP connection, created once and reused.
 *
 * Gmail will not accept an account password here. It needs an App Password,
 * generated on an account with two factor authentication turned on, which is
 * what SMTP_PASSWORD holds. See .env.example for the walkthrough.
 *
 * The transport is created lazily so that a deploy without mail configured
 * still boots and still records bug reports to the database.
 */

let transporter = null;

function getTransporter() {
  if (!env.smtp.configured) return null;

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      // Port 465 is implicit TLS. Port 587 starts plain and upgrades, so
      // secure has to be false there or the handshake never completes.
      secure: env.smtp.secure && env.smtp.port === 465,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.password,
      },
      /**
       * These have to lose the race against the serverless function's own
       * ceiling, which is 10 seconds on a Vercel Hobby plan unless maxDuration
       * says otherwise. If the platform kills the invocation first, the catch
       * in fileBugReport never runs, so the report is left marked pending
       * forever and the reporter sees a timeout instead of being told their
       * report was saved. Roughly seven seconds of budget keeps nodemailer the
       * first to give up, and leaves room for the status write and the reply.
       */
      connectionTimeout: 6_000,
      greetingTimeout: 6_000,
      socketTimeout: 7_000,
    });
  }

  return transporter;
}

export function isMailConfigured() {
  return env.smtp.configured;
}

/** Checks the credentials without sending anything. Used by /api/health. */
export async function verifyMailer() {
  const transport = getTransporter();
  if (!transport) return { ok: false, reason: "not_configured" };

  try {
    await transport.verify();
    return { ok: true };
  } catch (error) {
    return { ok: false, reason: error.message };
  }
}

/**
 * Sends one message. `replyTo` is set to the reporter's address when they gave
 * one, so hitting reply in Gmail answers the person who filed the report
 * rather than the sending account.
 */
export async function sendMail({ subject, text, html, replyTo }) {
  const transport = getTransporter();

  if (!transport) {
    throw new Error("SMTP is not configured");
  }

  return transport.sendMail({
    from: {
      name: "JHProjects Site",
      address: env.smtp.from || env.smtp.user,
    },
    to: env.smtp.to,
    subject,
    text,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}

export default sendMail;
