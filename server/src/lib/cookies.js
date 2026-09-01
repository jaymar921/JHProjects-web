/**
 * Reading and writing the one cookie this API sets.
 *
 * Express 5 does not parse cookies on its own and cookie-parser would be a
 * dependency for a single name, so the two functions live here. Both are
 * deliberately strict: the parser only splits on the separators the spec
 * allows, and the serializer refuses a value it would have to guess about.
 */

/** Turns a Cookie header into an object. Returns {} for anything unparsable. */
export function parseCookies(header) {
  if (typeof header !== "string" || header === "") return {};

  const jar = {};

  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 1) continue;

    const name = part.slice(0, index).trim();
    if (name === "") continue;

    let value = part.slice(index + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);

    try {
      jar[name] = decodeURIComponent(value);
    } catch {
      // A value that is not valid percent encoding is taken as written rather
      // than dropped, since the session token is compared, not interpreted.
      jar[name] = value;
    }
  }

  return jar;
}

const NAME_SHAPE = /^[A-Za-z0-9!#$%&'*+\-.^_`|~]+$/;

/**
 * Builds a Set-Cookie value.
 *
 * The defaults are the secure ones: HttpOnly so no script can read the
 * session, SameSite=Strict so the browser never attaches it to a request
 * another site started, and Path=/ so a reload of any route still carries it.
 */
export function serializeCookie(name, value, options = {}) {
  if (!NAME_SHAPE.test(name)) {
    throw new Error(`Unsafe cookie name: ${name}`);
  }

  const {
    maxAge,
    expires,
    path = "/",
    httpOnly = true,
    secure = true,
    sameSite = "Strict",
  } = options;

  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (path) parts.push(`Path=${path}`);
  if (typeof maxAge === "number") parts.push(`Max-Age=${Math.floor(maxAge)}`);
  if (expires instanceof Date) parts.push(`Expires=${expires.toUTCString()}`);
  if (httpOnly) parts.push("HttpOnly");
  // Secure is dropped on plain http, otherwise the browser silently discards
  // the cookie and local development looks like a broken login.
  if (secure) parts.push("Secure");
  if (sameSite) parts.push(`SameSite=${sameSite}`);

  return parts.join("; ");
}

/** The same cookie, already expired, which is how a browser is told to drop it. */
export function clearCookie(name, options = {}) {
  return serializeCookie(name, "", { ...options, maxAge: 0, expires: new Date(0) });
}
