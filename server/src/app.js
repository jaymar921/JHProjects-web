import cors from "cors";
import express from "express";
import env from "./config/env.js";
import { ValidationError } from "./lib/validate.js";
import adminRouter from "./routes/admin.js";
import bugReportRouter from "./routes/bugReport.js";
import healthRouter from "./routes/health.js";
import statsRouter from "./routes/stats.js";
import trackRouter from "./routes/track.js";

/**
 * The API, assembled.
 *
 * This module exports an Express app and nothing else. It never calls listen,
 * because it has two homes: server/src/index.js runs it as a normal Node
 * process for local work, and api/index.js hands the same app to Vercel as a
 * serverless function. Keeping listen out of here is what lets both work
 * without a second copy of the routing.
 */

export function createApp() {
  const app = express();

  // Vercel, and most other hosts, sit behind a proxy. Without this the client
  // address is the proxy's, which would put every visitor in one rate limit
  // bucket and make the unique counts meaningless.
  app.set("trust proxy", 1);
  app.disable("x-powered-by");

  app.use(buildCors());

  /**
   * navigator.sendBeacon posts a Blob, and older browsers label it text/plain
   * whatever type the Blob was given, so both content types are parsed as
   * JSON. The limit is generous enough for a full stack trace in a bug report
   * and small enough that the body is never worth using as an upload channel.
   */
  app.use(
    express.json({
      limit: "128kb",
      type: ["application/json", "text/plain"],
    }),
  );

  app.use("/api/health", healthRouter);
  app.use("/api/track", trackRouter);
  app.use("/api/stats", statsRouter);
  app.use("/api/bug-report", bugReportRouter);
  app.use("/api/admin", adminRouter);

  app.get("/api", (_req, res) => {
    res.json({
      ok: true,
      name: "jhprojects-api",
      endpoints: [
        "GET  /api/health",
        "POST /api/track/view",
        "POST /api/track/click",
        "POST /api/track/batch",
        "GET  /api/stats             (admin session or STATS_TOKEN)",
        "GET  /api/stats/:project    (admin session or STATS_TOKEN)",
        "GET  /api/stats/:project/events (admin session or STATS_TOKEN)",
        "GET  /api/bug-report/status",
        "POST /api/bug-report",
        "GET  /api/admin/session",
        "POST /api/admin/login",
        "POST /api/admin/logout",
        "POST /api/admin/password",
      ],
    });
  });

  app.use("/api", (_req, res) => {
    res.status(404).json({ ok: false, error: "not_found" });
  });

  app.use(errorHandler);

  return app;
}

/**
 * CORS.
 *
 * With CORS_ALLOWED_ORIGINS unset the middleware reflects whatever origin
 * asked, which is what a public tracking endpoint needs while the front end is
 * on localhost, a preview URL and the live domain all at once. Setting the
 * variable in production narrows it to the real origins so another site cannot
 * quietly post events into your numbers.
 *
 * Credentials stay off. Nothing here reads a cookie, and leaving them off is
 * what makes reflecting an origin safe.
 */
function buildCors() {
  const allowed = env.cors.allowedOrigins;

  return cors({
    origin(origin, callback) {
      // No Origin header at all means a same origin request, a server to
      // server call or curl. None of those are the case CORS defends against.
      if (!origin) return callback(null, true);
      if (allowed.length === 0) return callback(null, true);
      if (allowed.includes(origin)) return callback(null, true);

      return callback(null, false);
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
    maxAge: 86_400,
  });
}

/**
 * One place where an error becomes a response.
 *
 * A validation problem is the visitor's to fix, so it comes back with the
 * field name attached. Anything else is the server's problem: it is logged in
 * full and answered with a generic message, because a Mongo error string can
 * carry a connection string in it.
 */
function errorHandler(error, _req, res, _next) {
  if (error instanceof ValidationError || error?.name === "ValidationError") {
    return res.status(error.status ?? 400).json({
      ok: false,
      error: "invalid_request",
      field: error.field ?? null,
      message: error.message,
    });
  }

  if (error?.type === "entity.too.large") {
    return res.status(413).json({
      ok: false,
      error: "payload_too_large",
      message: "That is longer than the form accepts. Trim the logs and try again.",
    });
  }

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({
      ok: false,
      error: "invalid_json",
      message: "The request body was not valid JSON.",
    });
  }

  console.error("[api] unhandled error:", error);

  return res.status(500).json({
    ok: false,
    error: "server_error",
    message: "Something went wrong on our end.",
  });
}

export default createApp;
