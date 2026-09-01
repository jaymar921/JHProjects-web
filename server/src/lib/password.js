import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { ValidationError } from "./validate.js";

/**
 * Password hashing for the admin account.
 *
 * scrypt from node:crypto rather than bcrypt or argon2, because it is memory
 * hard, it is in the standard library, and adding a native dependency to a
 * serverless deploy for one account is not a trade worth making.
 *
 * The stored string carries its own parameters:
 *
 *   scrypt$16384$8$1$<salt hex>$<hash hex>
 *
 * so the cost can be raised later and old hashes still verify against the
 * numbers they were made with.
 */

const scrypt = promisify(scryptCallback);

const KEY_LENGTH = 64;
const SALT_BYTES = 16;

/** Roughly 16MB and ~100ms on a small serverless instance. */
const PARAMS = Object.freeze({ N: 16_384, r: 8, p: 1 });

/** scrypt needs to be told it may use more than the 32MB default. */
const MAXMEM = 64 * 1024 * 1024;

export const MIN_PASSWORD_LENGTH = 12;
export const MAX_PASSWORD_LENGTH = 200;

async function derive(password, salt, { N, r, p }) {
  return scrypt(password.normalize("NFKC"), salt, KEY_LENGTH, { N, r, p, maxmem: MAXMEM });
}

export async function hashPassword(password) {
  const salt = randomBytes(SALT_BYTES);
  const derived = await derive(password, salt, PARAMS);

  return [
    "scrypt",
    PARAMS.N,
    PARAMS.r,
    PARAMS.p,
    salt.toString("hex"),
    derived.toString("hex"),
  ].join("$");
}

/**
 * Verifies a password against a stored hash. Never throws on a malformed
 * stored value, because a corrupt row should read as "wrong password" rather
 * than a 500 that tells an attacker they found something interesting.
 */
export async function verifyPassword(password, stored) {
  if (typeof password !== "string" || typeof stored !== "string") return false;

  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;

  const [, n, r, p, saltHex, hashHex] = parts;
  const params = {
    N: Number.parseInt(n, 10),
    r: Number.parseInt(r, 10),
    p: Number.parseInt(p, 10),
  };

  if (!Number.isFinite(params.N) || !Number.isFinite(params.r) || !Number.isFinite(params.p)) {
    return false;
  }

  try {
    const expected = Buffer.from(hashHex, "hex");
    const actual = await derive(password, Buffer.from(saltHex, "hex"), params);

    // timingSafeEqual throws on a length mismatch, which would itself leak the
    // length, so the lengths are compared first and the result folded in.
    if (expected.length !== actual.length) return false;
    return timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

/**
 * A hash of a password nobody has, used to spend the same time on a login for
 * a username that does not exist as on one that does. Without it, a fast 401
 * is a username oracle.
 */
let dummyHashPromise = null;

export function dummyHash() {
  if (!dummyHashPromise) {
    dummyHashPromise = hashPassword(randomBytes(32).toString("hex"));
  }
  return dummyHashPromise;
}

export async function burnTime(password) {
  await verifyPassword(typeof password === "string" ? password : "", await dummyHash());
  return false;
}

/**
 * The alphabet leaves out 0/O/1/l/I so a temporary password can be read off a
 * terminal and typed into a phone without the reader guessing which character
 * they are looking at.
 */
const SAFE_ALPHABET = "abcdefghjkmnpqrstuvwxyz23456789";

/**
 * Four groups of five, hyphenated: about 99 bits of entropy, which is well
 * past anything an online login rate limit would ever let through.
 */
export function generateTemporaryPassword({ groups = 4, size = 5 } = {}) {
  const length = groups * size;
  const bytes = randomBytes(length * 2);
  const chars = [];

  // Rejection sampling, so every character in the alphabet is equally likely.
  // A plain modulo would quietly favour the first few.
  const limit = 256 - (256 % SAFE_ALPHABET.length);
  for (let index = 0; chars.length < length; index += 1) {
    const byte = bytes[index % bytes.length];
    if (byte >= limit) continue;
    chars.push(SAFE_ALPHABET[byte % SAFE_ALPHABET.length]);
  }

  const parts = [];
  for (let index = 0; index < length; index += size) {
    parts.push(chars.slice(index, index + size).join(""));
  }

  return parts.join("-");
}

/**
 * What a chosen password has to clear. Length is the check that actually
 * matters, so it is the one that is strict; the rest are here to catch the
 * handful of passwords that are long and still obvious.
 */
export function assertUsablePassword(password, { username = "", field = "newPassword" } = {}) {
  if (typeof password !== "string") {
    throw new ValidationError("A password is required", field);
  }

  const value = password.normalize("NFKC");

  if (value.length < MIN_PASSWORD_LENGTH) {
    throw new ValidationError(
      `The password must be at least ${MIN_PASSWORD_LENGTH} characters`,
      field,
    );
  }

  if (value.length > MAX_PASSWORD_LENGTH) {
    throw new ValidationError(
      `The password must be ${MAX_PASSWORD_LENGTH} characters or fewer`,
      field,
    );
  }

  if (value.trim() === "") {
    throw new ValidationError("The password cannot be only spaces", field);
  }

  const lowered = value.toLowerCase();

  if (username && lowered.includes(username.toLowerCase())) {
    throw new ValidationError("The password cannot contain the username", field);
  }

  if (/^(.)\1+$/.test(value)) {
    throw new ValidationError("The password cannot be one repeated character", field);
  }

  const OBVIOUS = ["password", "administrator", "letmein", "changeme", "qwerty"];
  if (OBVIOUS.some((entry) => lowered.includes(entry))) {
    throw new ValidationError("Pick something less guessable", field);
  }

  return value;
}
