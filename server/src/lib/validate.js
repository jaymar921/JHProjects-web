/**
 * Input checking for the two things the browser is allowed to post.
 *
 * Everything that reaches the database goes through here first. Strings are
 * trimmed and cut to a maximum length rather than rejected outright, because a
 * report that is slightly too long is still a report worth having, while a
 * field that is the wrong shape entirely is not.
 */

export class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.status = 400;
  }
}

/**
 * Trims, caps the length and strips control characters. The control character
 * pass matters for the emails: a newline smuggled into a subject line is how
 * header injection works.
 */
export function cleanString(value, { max = 500, field = "value" } = {}) {
  if (typeof value !== "string") {
    throw new ValidationError(`${field} must be a string`, field);
  }

  // eslint-disable-next-line no-control-regex
  const stripped = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  return stripped.trim().slice(0, max);
}

export function optionalString(value, options = {}) {
  if (value === undefined || value === null || value === "") return null;
  const cleaned = cleanString(value, options);
  return cleaned === "" ? null : cleaned;
}

export function requiredString(value, { min = 1, max = 500, field = "value" } = {}) {
  const cleaned = cleanString(value, { max, field });

  if (cleaned.length < min) {
    throw new ValidationError(
      `${field} must be at least ${min} character${min === 1 ? "" : "s"}`,
      field,
    );
  }

  return cleaned;
}

/**
 * Deliberately loose. The point is to catch a typo before the report is filed,
 * not to decide what a valid address looks like, which no regex gets right.
 */
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function optionalEmail(value, { field = "email" } = {}) {
  const cleaned = optionalString(value, { max: 254, field });
  if (cleaned === null) return null;

  if (!EMAIL_SHAPE.test(cleaned)) {
    throw new ValidationError("That email address does not look right", field);
  }

  return cleaned;
}

/** An http or https URL, or null. Anything else, including javascript:, is dropped. */
export function optionalUrl(value, { field = "url", max = 500 } = {}) {
  const cleaned = optionalString(value, { max, field });
  if (cleaned === null) return null;

  try {
    const url = new URL(cleaned);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString().slice(0, max);
  } catch {
    return null;
  }
}

/**
 * An opaque id the browser generated. It is only ever compared for equality,
 * so the check is just that it is short and made of safe characters.
 */
const ID_SHAPE = /^[A-Za-z0-9_-]{8,64}$/;

export function optionalId(value) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return ID_SHAPE.test(trimmed) ? trimmed : null;
}

export function oneOf(value, allowed, { field = "value", fallback } = {}) {
  if (typeof value === "string" && allowed.includes(value)) return value;
  if (fallback !== undefined) return fallback;

  throw new ValidationError(
    `${field} must be one of: ${allowed.join(", ")}`,
    field,
  );
}
