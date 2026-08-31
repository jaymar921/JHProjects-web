import { RedirectTo } from "../navigation.js";
import { apiUrl } from "../api/client.js";
import { getSessionId, getVisitorId } from "./visitor.js";
import { CLICK_ACTIONS, isProjectSlug } from "../../../shared/projects.js";

/**
 * Sending a view or a click.
 *
 * Two rules shape everything here. Tracking must never delay a click, and it
 * must never break a page. So a click that opens a link fires the event with
 * sendBeacon, which the browser finishes on its own even as the tab navigates
 * away, and every failure is swallowed. A dropped event is a missing row in a
 * stats table. A thrown one is a button that stopped working.
 */

const ENABLED =
  typeof window !== "undefined" &&
  import.meta.env.VITE_ANALYTICS_ENABLED !== "false";

/**
 * A page can be opened with ?page_only=true when it is being embedded or
 * screenshotted, and CE3Page already treats that as "not a real visit". Same
 * reasoning here.
 */
function isRealVisit() {
  try {
    return new URLSearchParams(window.location.search).get("page_only") !== "true";
  } catch {
    return true;
  }
}

/** The browser's own "do not track me" setting, respected rather than read past. */
function optedOut() {
  try {
    return (
      window.navigator.doNotTrack === "1" ||
      window.doNotTrack === "1" ||
      window.navigator.globalPrivacyControl === true
    );
  } catch {
    return false;
  }
}

function shouldSend() {
  return ENABLED && isRealVisit() && !optedOut();
}

function baseFields() {
  return {
    visitorId: getVisitorId(),
    sessionId: getSessionId(),
    path: window.location.pathname,
  };
}

/**
 * sendBeacon first. It survives the page being navigated away from, which is
 * exactly what happens on a download or buy click, and the browser queues it
 * without holding anything up.
 *
 * The Blob is typed application/json so the server sees the right content
 * type; the API parses text/plain as JSON too, because some browsers relabel
 * a beacon body regardless.
 */
function send(path, payload) {
  const url = apiUrl(path);
  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(url, blob)) return;
    }
  } catch {
    // Beacon refused the payload or is not available. Fall through to fetch.
  }

  try {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      // The response is not read, and the request must outlive the page on a
      // click that navigates. keepalive is what buys that for fetch.
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Offline, blocked by an extension, or no network at all. Not a problem
    // worth telling the visitor about.
  }
}

/** Records that a project page was opened. */
export function trackView(project) {
  if (!shouldSend()) return;

  if (!isProjectSlug(project)) {
    if (import.meta.env.DEV) {
      console.warn(`[analytics] unknown project slug: ${project}`);
    }
    return;
  }

  send("/api/track/view", { project, ...baseFields() });
}

/**
 * Records a click on something worth counting.
 *
 * `label` is the button's own wording, so the stats can tell the two buy
 * buttons on the CE3 page apart, and `target` is where it went.
 */
export function trackClick(project, { action, label, target } = {}) {
  if (!shouldSend()) return;

  if (!isProjectSlug(project)) {
    if (import.meta.env.DEV) {
      console.warn(`[analytics] unknown project slug: ${project}`);
    }
    return;
  }

  send("/api/track/click", {
    project,
    action: action ?? CLICK_ACTIONS.EXTERNAL,
    label: label ?? null,
    target: target ?? null,
    ...baseFields(),
  });
}

/**
 * Wraps a click handler so the event goes out and the original behaviour still
 * runs, even if the tracking call throws. Handy for the buttons that already
 * call RedirectTo.
 *
 *   onClick={withTracking(PROJECTS.CE3, { action: "buy", label: "GET PREMIUM" },
 *            () => RedirectTo(link))}
 */
export function withTracking(project, details, handler) {
  return (...args) => {
    try {
      trackClick(project, details);
    } catch {
      // Never let a stats call stop the thing the visitor actually asked for.
    }

    return handler?.(...args);
  };
}

export { CLICK_ACTIONS };

/**
 * A click handler that records the click and then opens the link. This is the
 * one to reach for on a download or buy button, because the beacon inside
 * trackClick is already fire and forget, so nothing is waiting on the network
 * before the new tab opens.
 *
 *   onClick={trackedRedirect(PROJECTS.KUMANDRA, {
 *     action: CLICK_ACTIONS.DOWNLOAD,
 *     label: "DOWNLOAD FREE",
 *     target: PluginInformation.downloadLink,
 *   })}
 */
export function trackedRedirect(project, { action, label, target }) {
  return () => {
    try {
      trackClick(project, { action, label, target });
    } catch {
      // The link is the point. A failed stats call must not swallow it.
    }

    RedirectTo(target);
  };
}
