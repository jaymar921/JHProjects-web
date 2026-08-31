import { useEffect, useState } from "react";

/**
 * Live download counts, plus the lite build's latest version name, read from
 * the Spiget API.
 *
 * The premium resource and the lite resource are counted separately. Lite is a
 * combined figure: the listing carried Custom Enchantments 2 before it became
 * the CE3 lite build, so its total covers both.
 *
 * Spiget sends CORS headers, so the browser can read this directly. If the
 * request fails anyway (offline, rate limited, blocked) the fallback numbers
 * below are shown instead, so the page never renders an empty stat.
 */

const SPIGET = "https://api.spiget.org/v2/resources";

export const SPIGOT_RESOURCES = {
  premium: 102275,
  lite: 89793,
};

/** Shown when the API cannot be reached. */
export const DOWNLOAD_FALLBACK = {
  premium: 220,
  lite: 320000,
};

/** Shown when the lite version lookup cannot be reached. */
export const LITE_VERSION_FALLBACK = "1.5.0-lite";

/**
 * 221 stays "220+", 1500 becomes "1k+", 322859 becomes "320k+". Always rounds
 * down, so the figure on the page is never larger than the real one.
 */
export function formatDownloads(count) {
  if (typeof count !== "number" || !isFinite(count) || count < 0) return "0";

  if (count >= 10000) return `${Math.floor(count / 10000) * 10}k+`;
  if (count >= 1000) return `${Math.floor(count / 1000)}k+`;
  if (count >= 100) return `${Math.floor(count / 10) * 10}+`;

  return `${count}`;
}

async function readDownloads(resourceId, signal) {
  const response = await fetch(`${SPIGET}/${resourceId}`, { signal });
  if (!response.ok) throw new Error(`spiget responded ${response.status}`);

  const resource = await response.json();
  if (typeof resource?.downloads !== "number") {
    throw new Error("spiget response had no downloads field");
  }

  return resource.downloads;
}

/**
 * The name of the newest version posted on a listing, e.g. "1.5.0-lite". This
 * is the Spiget mirror of api.spigotmc.org/legacy/update.php?resource=<id>,
 * which the browser cannot call directly because it sends no CORS headers.
 */
async function readLatestVersion(resourceId, signal) {
  const response = await fetch(`${SPIGET}/${resourceId}/versions/latest`, {
    signal,
  });
  if (!response.ok) throw new Error(`spiget responded ${response.status}`);

  const version = await response.json();
  if (typeof version?.name !== "string" || version.name.length === 0) {
    throw new Error("spiget response had no version name");
  }

  return version.name;
}

/**
 * Returns the two counts and the lite version name, plus a "live" flag saying
 * whether they came from the API or from the fallback. Every field is always
 * filled in, so a caller can render straight away without a loading branch.
 */
export function useSpigetDownloads() {
  const [downloads, setDownloads] = useState({
    ...DOWNLOAD_FALLBACK,
    liteVersion: LITE_VERSION_FALLBACK,
    live: false,
  });

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      readDownloads(SPIGOT_RESOURCES.premium, controller.signal),
      readDownloads(SPIGOT_RESOURCES.lite, controller.signal),
      readLatestVersion(SPIGOT_RESOURCES.lite, controller.signal),
    ])
      .then(([premium, lite, liteVersion]) => {
        setDownloads({ premium, lite, liteVersion, live: true });
      })
      .catch(() => {
        // Offline, rate limited or blocked. The fallback is already in state.
      });

    return () => controller.abort();
  }, []);

  return downloads;
}

/** The Kumandra's Economy listing. Free, so there is only the one resource. */
export const KUMANDRA_RESOURCE = 96466;

/** Shown when the Kumandra listing cannot be reached. */
export const KUMANDRA_FALLBACK = {
  downloads: 3200,
  version: "1.7",
};

/**
 * The same lookup as useSpigetDownloads, for a single listing. Returns the
 * download count, the newest posted version name and a "live" flag, with the
 * fallback already in state so a caller never has to render a loading branch.
 */
export function useSpigetResource(
  resourceId,
  fallback = { downloads: 0, version: "" },
) {
  const [resource, setResource] = useState({ ...fallback, live: false });

  useEffect(() => {
    const controller = new AbortController();

    Promise.all([
      readDownloads(resourceId, controller.signal),
      readLatestVersion(resourceId, controller.signal),
    ])
      .then(([downloads, version]) => {
        setResource({ downloads, version, live: true });
      })
      .catch(() => {
        // Offline, rate limited or blocked. The fallback is already in state.
      });

    return () => controller.abort();
  }, [resourceId]);

  return resource;
}
