import { ApiError, apiUrl } from "./client.js";

/**
 * The browser half of the admin gateway.
 *
 * There is no token in localStorage and no Authorization header here on
 * purpose. The session lives in an HttpOnly cookie the server sets, which
 * means no script on the page, including anything that got onto it by
 * accident, can read it. The only thing this module does is send requests to
 * the same origin and let the browser attach the cookie itself.
 *
 * Because the cookie is SameSite=Strict and same origin, the admin area only
 * works when the API is served from the site's own origin, which is how both
 * Vercel and the dev proxy in vite.config.js are set up. Pointing
 * VITE_API_BASE_URL at another host would break sign in, and is why it is only
 * meant for the tracking endpoints.
 */

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function request(path, { method = "GET", body, signal, timeoutMs = 20_000 } = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const abortOuter = () => controller.abort();
  signal?.addEventListener("abort", abortOuter);

  try {
    const response = await fetch(apiUrl(path), {
      method,
      // Same origin is the browser default, but saying it means a future
      // change to the base URL fails loudly rather than quietly signing
      // everyone out.
      credentials: "same-origin",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    const payload = await readJson(response);

    if (!response.ok || payload?.ok === false) {
      throw new ApiError(
        payload?.message ?? `Request failed with status ${response.status}`,
        {
          status: response.status,
          field: payload?.field,
          code: payload?.error,
        },
      );
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiError) throw error;

    if (error?.name === "AbortError") {
      throw new ApiError("That took too long. Check your connection and try again.", {
        code: "timeout",
      });
    }

    throw new ApiError("Could not reach the server. Check your connection and try again.", {
      code: "network",
    });
  } finally {
    clearTimeout(timer);
    signal?.removeEventListener("abort", abortOuter);
  }
}

/** True when the failure means "you are not signed in", rather than anything else. */
export function isSignedOut(error) {
  return error instanceof ApiError && error.status === 401;
}

/** True when the server is refusing everything until the password is replaced. */
export function needsPasswordChange(error) {
  return error instanceof ApiError && error.code === "password_change_required";
}

export function readSession({ signal } = {}) {
  return request("/api/admin/session", { signal });
}

export function login({ username, password }, { signal } = {}) {
  return request("/api/admin/login", {
    method: "POST",
    body: { username, password },
    // A login costs a deliberate scrypt hash on the server, so it gets a
    // longer leash than a normal request before the client gives up.
    timeoutMs: 30_000,
    signal,
  });
}

export function logout({ signal } = {}) {
  return request("/api/admin/logout", { method: "POST", signal });
}

export function changePassword({ currentPassword, newPassword }, { signal } = {}) {
  return request("/api/admin/password", {
    method: "POST",
    body: { currentPassword, newPassword },
    timeoutMs: 30_000,
    signal,
  });
}

export function fetchStats({ signal } = {}) {
  return request("/api/stats", { signal });
}

export function fetchEvents(project, { limit = 25, signal } = {}) {
  return request(`/api/stats/${encodeURIComponent(project)}/events?limit=${limit}`, {
    signal,
  });
}
