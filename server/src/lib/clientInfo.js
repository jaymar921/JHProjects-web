import { createHash } from "node:crypto";
import env from "../config/env.js";
import { parseUserAgent } from "./userAgent.js";

/**
 * Everything the server works out about a request on its own, without
 * trusting the body.
 *
 * The visitor's address is never stored. It is hashed with a salt and kept
 * only so that rate limiting and unique counting have something stable to key
 * on, which is the smallest thing that does the job.
 */

/**
 * Behind Vercel, or any proxy, the socket address is the proxy. The real
 * client sits at the front of X-Forwarded-For. Express with `trust proxy` set
 * already resolves this into req.ip, and the header read is the fallback for
 * when the app runs without a proxy in front.
 */
export function readIp(req) {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.trim() !== "") {
    const first = forwarded.split(",")[0].trim();
    if (first !== "") return first;
  }

  return req.ip ?? req.socket?.remoteAddress ?? "";
}

/**
 * A one way, salted hash. Truncated to 32 characters because the full digest
 * is more entropy than a counter needs and the shorter string keeps the
 * documents small.
 */
export function hashIp(ip) {
  if (!ip) return null;

  return createHash("sha256")
    .update(`${env.hashSalt}:${ip}`)
    .digest("hex")
    .slice(0, 32);
}

/** Reads the Chromium client hints, when the browser bothered to send them. */
function readClientHints(req) {
  const mobileHint = req.headers["sec-ch-ua-mobile"];
  const platform = req.headers["sec-ch-ua-platform"];

  const hints = {};

  if (mobileHint === "?1") hints.mobile = true;
  else if (mobileHint === "?0") hints.mobile = false;

  if (typeof platform === "string") {
    hints.platform = platform.replaceAll('"', "").trim() || undefined;
  }

  return hints;
}

/**
 * Only the origin of the referrer is kept, never the full URL. A search query
 * or a private link in the path is not something this site needs, and storing
 * it would be collecting more than the question asks for.
 */
export function readReferrerHost(value) {
  if (typeof value !== "string" || value.trim() === "") return null;

  try {
    const url = new URL(value);
    return url.host || null;
  } catch {
    return null;
  }
}

export function describeClient(req) {
  const userAgent = req.headers["user-agent"] ?? "";
  const hints = readClientHints(req);
  const parsed = parseUserAgent(userAgent, hints);
  const ip = readIp(req);

  return {
    ...parsed,
    platformHint: hints.platform ?? null,
    ipHash: hashIp(ip),
    ip,
    language: readLanguage(req.headers["accept-language"]),
    referrerHost: readReferrerHost(req.headers.referer ?? req.headers.referrer),
  };
}

/** Just the primary tag, so "en-GB,en;q=0.9,fil;q=0.8" comes back as "en-GB". */
function readLanguage(header) {
  if (typeof header !== "string" || header.trim() === "") return null;

  const primary = header.split(",")[0].split(";")[0].trim();
  return primary === "" ? null : primary.slice(0, 16);
}

export default describeClient;
