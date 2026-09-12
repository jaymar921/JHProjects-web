import { PROJECTS } from "./projects.js";

/**
 * The plugins that phone home, shared by the browser and the server.
 *
 * Each running copy of a plugin pings /plugin-stat/<id>/<version> once an hour.
 * The id is what the server recognises the plugin by; the key below is what it
 * is stored and drawn as. The ids themselves are not in here, because they are
 * meant to be changeable without a deploy of the front end: the server reads
 * them from PLUGIN_STAT_ID_<KEY> in the environment, with the defaults in
 * server/src/config/env.js.
 *
 * The order of this list is the order the series wear their colours in on the
 * dashboard, so a plugin keeps its colour whichever ones happen to be on
 * screen. Add a new plugin at the end.
 */

export const PLUGIN_KEYS = Object.freeze({
  CE3_LITE: "ce3-lite",
  CE3_PREMIUM: "ce3-premium",
  EMR_LITE: "emr-lite",
  EMR_PREMIUM: "emr-premium",
  FT_LITE: "ft-lite",
  FT_PREMIUM: "ft-premium",
  KD: "kd",
});

export const PLUGINS = Object.freeze([
  {
    key: PLUGIN_KEYS.CE3_LITE,
    label: "CE3 Lite",
    family: "Custom Enchantments 3",
    tier: "lite",
    project: PROJECTS.CE3,
  },
  {
    key: PLUGIN_KEYS.CE3_PREMIUM,
    label: "CE3 Premium",
    family: "Custom Enchantments 3",
    tier: "premium",
    project: PROJECTS.CE3,
  },
  {
    key: PLUGIN_KEYS.EMR_LITE,
    label: "EMR Lite",
    family: "Epic Mobs Rework",
    tier: "lite",
    project: PROJECTS.EPIC_MOBS_REWORK,
  },
  {
    key: PLUGIN_KEYS.EMR_PREMIUM,
    label: "EMR Premium",
    family: "Epic Mobs Rework",
    tier: "premium",
    project: PROJECTS.EPIC_MOBS_REWORK,
  },
  {
    key: PLUGIN_KEYS.FT_LITE,
    label: "Farm Tales Lite",
    family: "Farm Tales",
    tier: "lite",
    project: PROJECTS.FARM_TALES,
  },
  {
    key: PLUGIN_KEYS.FT_PREMIUM,
    label: "Farm Tales Premium",
    family: "Farm Tales",
    tier: "premium",
    project: PROJECTS.FARM_TALES,
  },
  {
    key: PLUGIN_KEYS.KD,
    label: "Kumandra's Economy",
    family: "Kumandra's Economy",
    tier: "free",
    project: PROJECTS.KUMANDRA,
  },
]);

/** Every key, in series order. */
export const PLUGIN_KEY_LIST = Object.freeze(PLUGINS.map((plugin) => plugin.key));

const BY_KEY = new Map(PLUGINS.map((plugin) => [plugin.key, plugin]));

export function pluginFor(key) {
  return BY_KEY.get(key) ?? null;
}

export function isPluginKey(value) {
  return typeof value === "string" && BY_KEY.has(value);
}

export function pluginLabelFor(key) {
  return BY_KEY.get(key)?.label ?? key;
}
