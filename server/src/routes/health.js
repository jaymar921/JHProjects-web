import { Router } from "express";
import env from "../config/env.js";
import { getDb, isConfigured } from "../db/mongo.js";
import { isMailConfigured } from "../services/mailer.js";

/**
 * GET /api/health
 *
 * Says what is wired up and what is not, without leaking any of the values.
 * The database check runs a real ping rather than reporting on the presence of
 * a connection string, since a wrong password looks identical to a right one
 * until something asks.
 */

const router = Router();

router.get("/", async (_req, res) => {
  const checks = {
    mongo: { configured: isConfigured(), ok: false },
    smtp: { configured: isMailConfigured(), ok: isMailConfigured() },
    hashSalt: { configured: env.hashSalt !== "" },
  };

  if (checks.mongo.configured) {
    try {
      const db = await getDb();
      await db.command({ ping: 1 });
      checks.mongo.ok = true;
    } catch (error) {
      checks.mongo.error = error.message;
    }
  }

  const healthy = checks.mongo.ok;

  res.status(healthy ? 200 : 503).json({
    ok: healthy,
    environment: env.nodeEnv,
    checks,
    time: new Date().toISOString(),
  });
});

export default router;
