/**
 * A fixed window rate limiter that lives in memory.
 *
 * On a long running server this is the whole story. On a serverless deploy
 * each instance keeps its own counters, so a determined flood spread across
 * cold starts gets more through than the number suggests. That is an accepted
 * trade: the limiter is here to stop an accidental loop and casual spam, not
 * to survive a real attack, and it costs nothing to run.
 */

const buckets = new Map();

/** Drops expired buckets so an idle process does not hold every key it saw. */
function sweep(now) {
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

let lastSweep = 0;
const SWEEP_INTERVAL_MS = 60_000;

/**
 * Records one hit against `key` and says whether it is allowed.
 *
 * Returns the remaining allowance and the reset time as well, so a route can
 * put them in the response headers.
 */
export function hit(key, { limit, windowMs }) {
  const now = Date.now();

  if (now - lastSweep > SWEEP_INTERVAL_MS) {
    sweep(now);
    lastSweep = now;
  }

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(key, bucket);
    return { allowed: true, remaining: limit - 1, resetAt: bucket.resetAt };
  }

  existing.count += 1;

  return {
    allowed: existing.count <= limit,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/**
 * Express middleware. `keyFor` decides what to count by, which is the hashed
 * address for most routes.
 */
export function rateLimit({ limit, windowMs, keyFor, name = "default" }) {
  return (req, res, next) => {
    const subject = keyFor(req);

    // Nothing to key on means the request cannot be attributed, so it is let
    // through rather than blocking everyone who shares a missing header.
    if (!subject) return next();

    const result = hit(`${name}:${subject}`, { limit, windowMs });

    res.setHeader("X-RateLimit-Limit", String(limit));
    res.setHeader("X-RateLimit-Remaining", String(result.remaining));
    res.setHeader("X-RateLimit-Reset", String(Math.ceil(result.resetAt / 1000)));

    if (result.allowed) return next();

    const retryAfter = Math.max(1, Math.ceil((result.resetAt - Date.now()) / 1000));
    res.setHeader("Retry-After", String(retryAfter));

    return res.status(429).json({
      ok: false,
      error: "rate_limited",
      message: "Too many requests. Try again shortly.",
      retryAfter,
    });
  };
}

/** Exposed for tests, and for the standalone server to reset between runs. */
export function resetRateLimits() {
  buckets.clear();
  lastSweep = 0;
}
