/**
 * The one list of trackable projects, shared by the browser and the server.
 *
 * The browser sends a slug with every view and click; the server refuses any
 * slug that is not in here. Keeping both sides on this file means a typo in a
 * page component fails loudly in development instead of quietly filling the
 * database with a project nobody can read back.
 *
 * The slug matches the route in App.jsx, so a stats row can always be traced
 * back to a page. "home" and "donation" are not plugins, but they are pages
 * worth counting, so they get a slug too.
 */

export const PROJECTS = Object.freeze({
  HOME: "home",
  DONATION: "donation",
  CE3: "customenchantments3",
  KUMANDRA: "kumandras-economy",
  GRAPHICS_UTILS: "2dgraphic-utils",
  CUSTOM_WARPS: "custom-warps",
  FISHING_CONTEST: "fishing-contest",
  CE2: "custom-enchantments-2",
  MORE_FOODS: "more-foods-and-crops",
  EPIC_MOBS: "epic-mobs",
});

/** Every valid slug, for validation on both sides. */
export const PROJECT_SLUGS = Object.freeze(Object.values(PROJECTS));

/** Human readable names, used in the stats endpoint and the report emails. */
export const PROJECT_LABELS = Object.freeze({
  [PROJECTS.HOME]: "Home",
  [PROJECTS.DONATION]: "Donation",
  [PROJECTS.CE3]: "Custom Enchantments 3",
  [PROJECTS.KUMANDRA]: "Kumandra's Economy",
  [PROJECTS.GRAPHICS_UTILS]: "2dgraphic-utils",
  [PROJECTS.CUSTOM_WARPS]: "Custom Warps",
  [PROJECTS.FISHING_CONTEST]: "Fishing Contest",
  [PROJECTS.CE2]: "Custom Enchantments 2",
  [PROJECTS.MORE_FOODS]: "More Foods and Crops",
  [PROJECTS.EPIC_MOBS]: "Epic Mobs",
});

/**
 * What a click was for. "download" and "buy" are the two the site cares about
 * most; the rest are here so a button that is neither still records something
 * useful rather than being dropped.
 */
export const CLICK_ACTIONS = Object.freeze({
  DOWNLOAD: "download",
  BUY: "buy",
  DONATE: "donate",
  SOURCE: "source",
  EXTERNAL: "external",
});

export const CLICK_ACTION_VALUES = Object.freeze(Object.values(CLICK_ACTIONS));

export function isProjectSlug(value) {
  return typeof value === "string" && PROJECT_SLUGS.includes(value);
}

export function isClickAction(value) {
  return typeof value === "string" && CLICK_ACTION_VALUES.includes(value);
}

export function labelFor(slug) {
  return PROJECT_LABELS[slug] ?? slug;
}
