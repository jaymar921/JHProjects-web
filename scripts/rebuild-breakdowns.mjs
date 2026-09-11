#!/usr/bin/env node
import env from "../server/src/config/env.js";
import { closeClient } from "../server/src/db/mongo.js";
import { rebuildBreakdowns } from "../server/src/services/analytics.js";

/**
 * Rebuilds the country, language and referrer counters from the raw events.
 *
 *   npm run rebuild-breakdowns
 *
 * Run it once after deploying the version that added those counters, so the
 * dashboard's referrer and language panels start with the history the events
 * already hold rather than from zero. It is safe to run again at any time:
 * the maps are replaced with what the raw rows say, nothing is added to.
 *
 * Everything else on a project row, views, clicks, devices, is left alone.
 */

async function main() {
  if (!env.mongo.configured) {
    console.error("MONGODB_URI is not set. Nothing to rebuild.");
    process.exitCode = 1;
    return;
  }

  const { projects, updated } = await rebuildBreakdowns();
  console.log(
    `Rebuilt the breakdowns for ${projects} project${projects === 1 ? "" : "s"}, ` +
      `${updated} row${updated === 1 ? "" : "s"} changed.`,
  );
}

main()
  .catch((error) => {
    console.error(error.message ?? error);
    process.exitCode = 1;
  })
  .finally(() => closeClient());
