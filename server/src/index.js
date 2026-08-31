import env from "./config/env.js";
import createApp from "./app.js";
import { closeClient } from "./db/mongo.js";
import { ensureIndexes } from "./db/collections.js";

/**
 * The standalone server, for local development and for any host that runs a
 * normal Node process. Vercel does not use this file; it uses api/index.js,
 * which wraps the same app.
 */

const app = createApp();

const server = app.listen(env.port, () => {
  console.log(`[api] listening on http://localhost:${env.port}`);
  console.log(`[api] mongo: ${env.mongo.configured ? "configured" : "NOT configured"}`);
  console.log(`[api] smtp:  ${env.smtp.configured ? "configured" : "NOT configured"}`);

  if (env.mongo.configured) {
    // Build the indexes at boot rather than waiting for the first request, so
    // a bad connection string shows up now instead of halfway through a demo.
    ensureIndexes()
      .then(() => console.log("[api] mongo indexes ready"))
      .catch((error) => console.error("[api] mongo index build failed:", error.message));
  }
});

/** Close the pool on the way out so Atlas is not left holding connections. */
async function shutdown(signal) {
  console.log(`[api] ${signal} received, shutting down`);

  server.close(async () => {
    await closeClient();
    process.exit(0);
  });

  // If a request is wedged, do not hang forever waiting for it.
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
