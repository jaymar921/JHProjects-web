/**
 * The two ids that make the counts mean something.
 *
 *   visitorId  in localStorage, so a returning visitor is recognised as the
 *              same person and a second visit does not read as a second
 *              unique.
 *   sessionId  in sessionStorage, so it lasts one tab session and lets a
 *              refresh be told apart from a fresh arrival.
 *
 * Neither is tied to anything about the person. They are random, they never
 * leave this site, and clearing site data throws them away. Storage can also
 * be unavailable outright, in Safari private mode or with cookies blocked, and
 * that has to be a normal path rather than an error: the id comes back null
 * and the event is still recorded, just without the unique credit.
 */

const VISITOR_KEY = "jh.visitor";
const SESSION_KEY = "jh.session";

/** Matches the id shape the server accepts, which is why it is url safe. */
function randomId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID().replaceAll("-", "");
  }

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const bytes = crypto.getRandomValues(new Uint8Array(16));
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
  }

  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 12)}`;
}

function readStorage(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(storage, key, value) {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function idFrom(storage, key) {
  if (typeof window === "undefined") return null;

  let store;
  try {
    store = storage();
  } catch {
    return null;
  }

  if (!store) return null;

  const existing = readStorage(store, key);
  // The server rejects anything outside this shape, so a value left over from
  // an older build is replaced rather than sent and dropped.
  if (existing && /^[A-Za-z0-9_-]{8,64}$/.test(existing)) return existing;

  const fresh = randomId();
  return writeStorage(store, key, fresh) ? fresh : null;
}

export function getVisitorId() {
  return idFrom(() => window.localStorage, VISITOR_KEY);
}

export function getSessionId() {
  return idFrom(() => window.sessionStorage, SESSION_KEY);
}

/** Clears both ids. Here so a privacy note on the site has something to call. */
export function forgetVisitor() {
  try {
    window.localStorage.removeItem(VISITOR_KEY);
    window.sessionStorage.removeItem(SESSION_KEY);
  } catch {
    // Nothing stored, nothing to forget.
  }
}
