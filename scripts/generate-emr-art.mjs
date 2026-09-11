/**
 * Draws the feature art, the hero banner and the link preview card for
 * Epic Mobs Rework.
 *
 * Same idea as generate-kumandra-art.mjs and generate-project-art.mjs: every
 * panel is a drawing of what the plugin actually does, with the real config
 * keys, the real command names and the real Lite ceilings in it, so the art
 * cannot drift away from the page it sits next to.
 *
 * The palette is warmer than the rest of the site on purpose. Custom
 * Enchantments 3 is arcane and runs lime and purple, Kumandra's Economy is
 * money and runs emerald and amber. Epic Mobs is monsters and firelight, so it
 * runs ember and amber, which is the same palette the plugin's own Spigot art
 * uses in marketing/tools/emr-art-kit.mjs.
 *
 *   node scripts/generate-emr-art.mjs
 *
 * Writes into src/assets/epic_mobs_rework/features/, plus banner.svg one level
 * up and og-epic-mobs-rework.svg into scripts/, which generate-og.sh
 * rasterises.
 *
 * Nothing drawn here is allowed to date: no release date, no Minecraft version
 * ceiling, and no content count that moves every release. The single exception
 * is the release-candidate status, which is on the changelog panel and on the
 * link preview card because it is load bearing: a page that reads as 1.0 is a
 * page that gets treated as 1.0, and this build is not.
 * Counts written as a floor ("20+") and design constants (six tiers, six spawn
 * paths, the five raid anchors, the Lite ceilings) are the only numbers that go
 * in. The one exception is the shipped mob set, which is written as a plain
 * twenty rather than "20+", because on Lite that number is the deal: twenty
 * built in, ten of your own, and it has to read as an exact figure to mean
 * anything.
 *
 * Stat numbers on the mob panel are the ones out of the shipped
 * defaults/mobs/frost-wolf.yml. They were the pre-1.0-RC1 numbers for a while,
 * which drew a mob that no longer existed, so if a rebalance moves them again
 * this file moves with it.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const W = 640;
const H = 360;
const MONO =
  "ui-monospace,'Cascadia Mono',Consolas,'DejaVu Sans Mono',monospace";

const C = {
  bg: "#0b0d11",
  line: "#334155",
  dim: "#475569",
  muted: "#64748b",
  text: "#cbd5e1",
  ember: "#f97316",
  amber: "#fbbf24",
  rose: "#fb7185",
  sky: "#38bdf8",
  purple: "#c084fc",
  lime: "#a3e635",
  emerald: "#34d399",
  slate: "#1e293b",
};

/* ----------------------------------------------------------- primitives */

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const rect = (x, y, w, h, fill, o = 1, stroke, so = 1, sw = 1) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${o}"${
    stroke
      ? ` stroke="${stroke}" stroke-opacity="${so}" stroke-width="${sw}"`
      : ""
  }/>`;

const text = (
  x,
  y,
  content,
  {
    size = 9.5,
    fill = C.text,
    anchor = "start",
    weight = 400,
    spacing = 0,
    opacity = 1,
  } = {},
) =>
  `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" fill="${fill}" fill-opacity="${opacity}" text-anchor="${anchor}"${
    spacing ? ` letter-spacing="${spacing}"` : ""
  }>${esc(content)}</text>`;

const corners = (x, y, w, h, color, len = 8, sw = 1.5, o = 0.75) =>
  [
    `<path d="M${x} ${y + len}V${y}H${x + len}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="${o}"/>`,
    `<path d="M${x + w - len} ${y}H${x + w}V${y + len}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="${o}"/>`,
    `<path d="M${x} ${y + h - len}V${y + h}H${x + len}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="${o}"/>`,
    `<path d="M${x + w - len} ${y + h}H${x + w}V${y + h - len}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="${o}"/>`,
  ].join("");

const panel = (x, y, w, h, label, accent) =>
  rect(x, y, w, h, "rgba(255,255,255,0.02)", 1, C.line, 0.8, 1) +
  corners(x, y, w, h, accent) +
  (label
    ? text(x + 16, y + 22, label, { size: 8.5, fill: C.dim, spacing: 1.6 })
    : "");

const row = (x, y, w, name, value, accent, h = 22) =>
  rect(x, y, w, h, "rgba(0,0,0,0.45)", 1, accent, 0.35, 1) +
  rect(x, y, 3, h, accent, 0.8) +
  text(x + 10, y + h / 2 + 3.2, name, { size: 9, fill: C.text }) +
  text(x + w - 8, y + h / 2 + 3.2, value, {
    size: 8.6,
    fill: accent,
    anchor: "end",
  });

const meter = (x, y, w, pct, accent, h = 8) =>
  rect(x, y, w, h, C.slate, 0.9) +
  rect(x, y, Math.round(w * pct), h, accent, 0.85);

/** A pip row, for "two of six" style counts. */
const pips = (x, y, filled, total, accent, s = 7, gap = 4) =>
  Array.from({ length: total }, (_, i) =>
    rect(
      x + i * (s + gap),
      y,
      s,
      s,
      i < filled ? accent : C.slate,
      i < filled ? 0.9 : 0.7,
    ),
  ).join("");

/** The segmented Minecraft boss bar, so "boss" reads without a screenshot. */
const bossbar = (x, y, w, pct, accent, segments = 10, h = 10) =>
  rect(x, y, w, h, "#111827", 1, C.line, 0.7, 1) +
  rect(x + 1, y + 1, Math.max(2, (w - 2) * pct), h - 2, accent, 0.85) +
  Array.from({ length: segments - 1 }, (_, i) =>
    rect(x + (w / segments) * (i + 1), y, 1, h, C.bg, 0.85),
  ).join("");

const slot = (x, y, s = 26, fill = "rgba(0,0,0,0.45)", stroke = C.line) =>
  rect(x, y, s, s, fill, 1, stroke, 0.7, 1);

function frame({ title, path, footer, accent, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">
<defs>
<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#94a3b8" stroke-opacity="0.055"/></pattern>
<pattern id="scan" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="1" fill="#000" fill-opacity="0.18"/></pattern>
<radialGradient id="vig" cx="50%" cy="45%" r="72%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.55"/></radialGradient>
<linearGradient id="rule" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${accent}" stop-opacity="0.7"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/></linearGradient>
</defs>
${rect(0, 0, W, H, C.bg)}
${rect(0, 34, W, 292, "url(#grid)")}
${rect(0, 0, W, 34, "rgba(255,255,255,0.03)")}
${rect(0, 33, W, 1, C.line, 0.8)}
${rect(14, 14, 7, 7, C.rose, 0.8)}
${rect(27, 14, 7, 7, C.amber, 0.8)}
${rect(40, 14, 7, 7, C.emerald, 0.8)}
${text(60, 22, title, { size: 12, weight: 700, fill: accent, spacing: 2.2 })}
${text(624, 22, path, { size: 9.5, fill: C.muted, anchor: "end" })}
${body}
${rect(0, 326, W, 1, C.line, 0.8)}
${rect(0, 327, W, 33, "rgba(255,255,255,0.02)")}
${rect(0, 327, 220, 2, "url(#rule)")}
${text(16, 348, footer, { size: 9.5, fill: C.muted, spacing: 1.4 })}
${rect(0, 34, W, 292, "url(#scan)")}
${rect(0, 0, W, H, "url(#vig)")}
${rect(0.5, 0.5, W - 1, H - 1, "none", 1, C.line, 1, 1)}
${corners(4, 4, W - 8, H - 8, accent, 14, 2)}
</svg>
`;
}

const emr = {};

/* ------------------------------------------------------------- the mobs */

emr["mobs"] = frame({
  title: "THE MOB BUILDER",
  path: "mobs/frost-wolf.yml",
  accent: C.ember,
  footer: "A MOB IS A SET OF DECISIONS, NOT A HEALTH NUMBER",
  body: [
    panel(18, 52, 292, 214, "ONE READABLE FILE PER MOB", C.ember),
    row(34, 84, 260, "entity", "any vanilla one", C.ember),
    row(34, 109, 260, "tier", "TIER_1 to TIER_6", C.amber),
    row(34, 134, 260, "stats.health", "280", C.rose),
    row(34, 159, 260, "stats.damage", "16", C.rose),
    row(34, 184, 260, "equipment", "worn and used", C.sky),
    row(34, 209, 260, "abilities", "by name", C.purple),
    row(34, 234, 260, "faction", "HOSTILE", C.lime),

    panel(330, 52, 292, 118, "SIX TIERS", C.amber),
    text(346, 92, "TIER 1", { size: 8.6, fill: C.text }),
    meter(400, 84, 206, 0.18, C.lime),
    text(346, 114, "TIER 3", { size: 8.6, fill: C.text }),
    meter(400, 106, 206, 0.5, C.amber),
    text(346, 136, "TIER 6", { size: 8.6, fill: C.text }),
    meter(400, 128, 206, 0.95, C.rose),
    text(346, 158, "TIERS GATE WHAT A RAID MAY SEND", {
      size: 8,
      fill: C.muted,
    }),

    panel(330, 182, 292, 84, "BUILD IT TWO WAYS", C.sky),
    text(346, 216, "/ep create mob", { size: 9, fill: C.sky }),
    text(346, 234, "/ep editor", { size: 9, fill: C.sky }),
    text(346, 254, "CHAT WIZARD, OR CLICK IT TOGETHER", {
      size: 7.8,
      fill: C.muted,
    }),

    text(20, 288, "TWENTY WRITTEN FOR YOU. COPY ONE TO MAKE THE NEXT", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "NO SERIALIZED BLOB", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* -------------------------------------------------------- the abilities */

emr["abilities"] = frame({
  title: "ABILITIES & TELEGRAPHS",
  path: "abilities.yml",
  accent: C.purple,
  footer: "A PARTICLE AND A SOUND LAND BEFORE THE DAMAGE DOES",
  body: [
    panel(18, 52, 604, 74, "THE TELEGRAPH", C.purple),
    text(34, 84, "LEAD", { size: 8.4, fill: C.muted, spacing: 1.2 }),
    rect(80, 76, 120, 10, C.purple, 0.3, C.purple, 0.6, 1),
    text(210, 85, "particle + sound", { size: 8.4, fill: C.purple }),
    rect(330, 76, 10, 10, C.rose, 0.9),
    text(350, 85, "the effect lands", { size: 8.4, fill: C.rose }),
    text(34, 110, "A PLAYER CAN MOVE, BLOCK OR RUN. THAT IS THE WHOLE POINT.", {
      size: 8.2,
      fill: C.text,
    }),

    panel(18, 138, 292, 128, "TRIGGERS", C.sky),
    row(34, 168, 260, "INTERVAL", "steady pressure", C.sky, 20),
    row(34, 190, 260, "ON_HIT / ON_HURT", "the reaction", C.rose, 20),
    row(34, 212, 260, "ON_LOW_HEALTH", "the turn", C.amber, 20),
    row(34, 234, 260, "ON_SPAWN / ON_DEATH", "and on kill", C.lime, 20),

    panel(330, 138, 292, 128, "PER ABILITY", C.amber),
    row(346, 168, 260, "radius", "12", C.amber, 20),
    row(346, 190, 260, "cooldown", "8s", C.amber, 20),
    row(346, 212, 260, "targets", "PLAYERS", C.emerald, 20),
    row(346, 234, 260, "effects", "a list, not one", C.purple, 20),

    text(20, 288, "20+ WRITTEN AND READY. WRITE YOUR OWN IN abilities.yml", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "SCALES OFF THE MOB", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------------------- the boss */

emr["bosses"] = frame({
  title: "BOSSES THAT CHANGE",
  path: "phases",
  accent: C.rose,
  footer: "THE BAR CHANGES COLOUR AND THE WHOLE SERVER SEES IT",
  body: [
    panel(18, 52, 604, 96, "", C.rose),
    text(320, 78, "CRYPT WARDEN", {
      size: 12,
      weight: 700,
      fill: C.rose,
      anchor: "middle",
      spacing: 2,
    }),
    bossbar(34, 90, 572, 0.24, C.rose, 12),
    text(34, 128, "PHASE 3 OF 3", { size: 8.4, fill: C.rose }),
    text(606, 128, "IMMUNE WHILE IT TRANSITIONS", {
      size: 8.2,
      fill: C.muted,
      anchor: "end",
    }),

    panel(18, 160, 190, 106, "PHASE 1", C.sky),
    text(34, 196, "at 100% health", { size: 8.4, fill: C.text }),
    text(34, 216, "cleave", { size: 8.4, fill: C.sky }),
    text(34, 234, "summon_adds", { size: 8.4, fill: C.sky }),
    text(34, 256, "BAR: RED", { size: 8, fill: C.muted }),

    panel(224, 160, 190, 106, "PHASE 2", C.purple),
    text(240, 196, "at 60% health", { size: 8.4, fill: C.text }),
    text(240, 216, "+ frost_nova", { size: 8.4, fill: C.purple }),
    text(240, 234, "+ an entrance line", { size: 8.4, fill: C.purple }),
    text(240, 256, "BAR: PURPLE", { size: 8, fill: C.muted }),

    panel(430, 160, 192, 106, "PHASE 3", C.amber),
    text(446, 196, "at 25% health", { size: 8.4, fill: C.text }),
    text(446, 216, "+ meteor", { size: 8.4, fill: C.amber }),
    text(446, 234, "+ speed x1.4", { size: 8.4, fill: C.amber }),
    text(446, 256, "BAR: WHITE", { size: 8, fill: C.muted }),

    text(20, 288, "A PHASE FIRES ONCE, ON THE WAY DOWN ONLY", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "PREMIUM", { size: 9, fill: C.amber, anchor: "end" }),
  ].join("\n"),
});

/* -------------------------------------------------------- the companion */

emr["companions"] = frame({
  title: "COMPANIONS & MOUNTS",
  path: "/ep companion",
  accent: C.emerald,
  footer: "ANY EPIC MOB CAN BE BUILT AS A FRIEND INSTEAD OF AN ENEMY",
  body: [
    panel(18, 52, 292, 214, "ONE COMPANION, ONE OWNER", C.emerald),
    row(34, 84, 260, "follows you", "and teleports", C.emerald),
    row(34, 109, 260, "fights", "what you fight", C.emerald),
    row(34, 134, 260, "never hits", "you or allies", C.lime),
    row(34, 159, 260, "levels up", "as you play", C.amber),
    row(34, 184, 260, "on death", "cooldown, not gone", C.rose),
    row(34, 209, 260, "with a saddle", "it is a mount", C.sky),
    text(34, 250, "LEVEL 7", { size: 8.6, fill: C.text }),
    meter(96, 242, 198, 0.62, C.emerald),

    panel(330, 52, 292, 118, "FOUR FACTIONS", C.sky),
    row(346, 84, 260, "HOSTILE", "the default", C.rose, 20),
    row(346, 106, 260, "NEUTRAL", "hits back only", C.amber, 20),
    row(346, 128, 260, "FRIENDLY", "never targets you", C.emerald, 20),
    row(346, 150, 260, "GUARDIAN", "hunts hostiles", C.sky, 20),

    panel(330, 182, 292, 84, "THE SAME MACHINERY", C.amber),
    text(346, 216, "GUARDIANS DEFEND A TOWN.", { size: 8.4, fill: C.text }),
    text(346, 236, "ESCORTS HAVE SOMEWHERE TO BE", {
      size: 8.4,
      fill: C.text,
    }),
    text(346, 254, "AND PLAYERS KEEP THEM ALIVE.", { size: 8, fill: C.muted }),

    text(20, 288, "GEAR CARRIES OVER, SO A CE3 SWORD STILL TRIGGERS", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "PREMIUM", { size: 9, fill: C.amber, anchor: "end" }),
  ].join("\n"),
});

/* ------------------------------------------------------------ the world */

emr["world"] = frame({
  title: "DECIDE WHERE THEY LIVE",
  path: "spawn:",
  accent: C.sky,
  footer: "SIX WAYS IN, AND A BUDGET THAT STOPS ANY OF THEM RUNNING AWAY",
  body: [
    panel(18, 52, 292, 214, "SPAWN CONDITIONS", C.sky),
    row(34, 84, 260, "worlds", "world, nether", C.sky),
    row(34, 109, 260, "biomes", "snowy_taiga +", C.emerald),
    row(34, 134, 260, "y", "62 to 140", C.lime),
    row(34, 159, 260, "light", "0 to 7", C.amber),
    row(34, 184, 260, "weather", "rain, thunder", C.purple),
    row(34, 209, 260, "moon_phase", "FULL", C.purple),
    row(34, 234, 260, "cooldown", "300s per player", C.rose),

    panel(330, 52, 292, 148, "SIX WAYS IN", C.amber),
    text(346, 88, "1  NATURAL SPAWNING NEAR PLAYERS", {
      size: 8.4,
      fill: C.text,
    }),
    text(346, 108, "2  SPAWN EGGS AND SPAWNER BLOCKS", {
      size: 8.4,
      fill: C.text,
    }),
    text(346, 128, "3  TIMED TRIGGERS AT A LOCATION", {
      size: 8.4,
      fill: C.text,
    }),
    text(346, 148, "4  RAID AND ARENA WAVES", { size: 8.4, fill: C.text }),
    text(346, 168, "5  REPLACING A VANILLA MOB", { size: 8.4, fill: C.text }),
    text(346, 188, "6  COMMANDS AND THE API", { size: 8.4, fill: C.text }),

    panel(330, 212, 292, 54, "THE SPAWN BUDGET", C.rose),
    text(346, 244, "PER WORLD, PER CHUNK, AND MS PER TICK", {
      size: 8.2,
      fill: C.rose,
    }),
    text(346, 260, "A HARD CEILING, NOT A SUGGESTION", {
      size: 7.8,
      fill: C.muted,
    }),

    text(20, 288, "CONDITIONS ARE CHECKED BEFORE THE ENTITY EXISTS", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "spawn-search-budget-ms", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------------------- the raid */

emr["raids"] = frame({
  title: "RAIDS, ARENAS & PACKS",
  path: "raids/world-infestation.yml",
  accent: C.rose,
  footer: "A WAVE IS A SHARE OF THE KILL GOAL, NOT A TICK OF A CLOCK",
  body: [
    panel(18, 52, 604, 80, "", C.rose),
    text(320, 78, "THE WORLD INFESTATION", {
      size: 11,
      weight: 700,
      fill: C.rose,
      anchor: "middle",
      spacing: 2,
    }),
    bossbar(34, 88, 572, 0.42, C.rose, 12),
    text(34, 122, "WAVE 2 OF 4  -  30 KILLS EACH", { size: 8.2, fill: C.text }),
    text(606, 122, "WAVE 3 WAITS FOR WAVE 2 TO DIE", {
      size: 8.2,
      fill: C.muted,
      anchor: "end",
    }),

    panel(18, 140, 292, 126, "FIVE PLACES A RAID CAN BE", C.amber),
    row(34, 168, 260, "PLAYERS", "wherever you are", C.muted, 18),
    row(34, 187, 260, "GLOBAL", "everywhere at once", C.purple, 18),
    row(34, 206, 260, "WORLD_SPAWN", "the town square", C.sky, 18),
    row(34, 225, 260, "LOCATION", "a point you name", C.emerald, 18),
    row(34, 244, 260, "PLAYER", "defend your base", C.rose, 18),

    panel(330, 140, 292, 126, "AND WHAT ELSE FIGHTS IN WAVES", C.sky),
    row(346, 168, 260, "arena", "pos1, pos2, create", C.sky, 18),
    row(346, 187, 260, "pack leader", "Alpha Frost Wolf", C.lime, 18),
    row(346, 206, 260, "on-leader-death", "FLEE", C.rose, 18),
    row(346, 225, 260, "prizes", "damage, kills, all", C.amber, 18),
    row(346, 244, 260, "boss:", "what the goal summons", C.ember, 18),

    text(20, 288, "THEY ARRIVE IN CLUSTERS, FROM THE SIDE THE WAVE NAMED", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "AND A TRAIL POINTS AT STRAGGLERS", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------------------- the loot */

emr["loot"] = frame({
  title: "LOOT WORTH THE FIGHT",
  path: "loot:",
  accent: C.amber,
  footer: "WEIGHTED TABLES, NOT A LIST OF COIN FLIPS",
  body: [
    panel(18, 52, 292, 214, "THE TABLE", C.amber),
    text(34, 102, "GUARANTEED", { size: 8.4, fill: C.emerald }),
    meter(126, 94, 168, 1, C.emerald),
    text(34, 128, "IRON x1-3", { size: 8.4, fill: C.text }),
    meter(126, 120, 152, 0.6, C.lime),
    text(294, 128, "60", { size: 8, fill: C.lime, anchor: "end" }),
    text(34, 154, "PACKED ICE", { size: 8.4, fill: C.text }),
    meter(126, 146, 152, 0.25, C.sky),
    text(294, 154, "25", { size: 8, fill: C.sky, anchor: "end" }),
    text(34, 180, "DIAMOND", { size: 8.4, fill: C.text }),
    meter(126, 172, 152, 0.1, C.amber),
    text(294, 180, "10", { size: 8, fill: C.amber, anchor: "end" }),
    text(34, 206, "CE3 TREASURE", { size: 8.4, fill: C.text }),
    meter(126, 198, 152, 0.05, C.purple),
    text(294, 206, "5", { size: 8, fill: C.purple, anchor: "end" }),
    row(34, 222, 260, "rolls", "2", C.amber, 20),
    text(34, 258, "AND A VIP MULTIPLIER ON TOP", { size: 8, fill: C.muted }),

    panel(330, 52, 292, 118, "SHARED BY DAMAGE DEALT", C.emerald),
    text(346, 100, "PLAYER A", { size: 8.4, fill: C.text }),
    meter(414, 92, 192, 0.55, C.emerald),
    text(346, 124, "PLAYER B", { size: 8.4, fill: C.text }),
    meter(414, 116, 192, 0.33, C.emerald),
    text(346, 148, "PLAYER C", { size: 8.4, fill: C.text }),
    meter(414, 140, 192, 0.12, C.emerald),
    text(346, 164, "NOT HANDED TO THE LAST HIT", {
      size: 8,
      fill: C.muted,
    }),

    panel(330, 182, 292, 84, "AND A PAYOUT", C.sky),
    row(346, 216, 260, "xp-levels", "3", C.sky, 20),
    row(346, 238, 260, "currencies", "one, or several", C.emerald, 20),

    text(20, 288, "min-damage-share DECIDES WHO QUALIFIES", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "0 IS THE OLD BEHAVIOUR", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ----------------------------------------------------- the integrations */

emr["integrations"] = frame({
  title: "PLAYS WELL WITH OTHERS",
  path: "/ep info",
  accent: C.purple,
  footer: "EVERY ONE OPTIONAL, EVERY ONE DETECTED ON ITS OWN",
  body: [
    panel(18, 52, 292, 148, "CUSTOM ENCHANTMENTS 3", C.lime),
    text(34, 88, "MOBS TRIGGER THE CE3 ENCHANTS", {
      size: 8.4,
      fill: C.text,
    }),
    text(34, 108, "ON THEIR OWN GEAR", { size: 8.4, fill: C.text }),
    text(34, 132, "YOUR CE3 WEAPONS WORK ON THEM", {
      size: 8.4,
      fill: C.text,
    }),
    text(34, 156, "DROP CE3 TREASURES AND BOOKS", {
      size: 8.4,
      fill: C.text,
    }),
    text(34, 180, "PAY IN RACO, FROM CAPPED SUPPLY", {
      size: 8.4,
      fill: C.text,
    }),

    panel(330, 52, 292, 148, "KUMANDRA'S ECONOMY", C.emerald),
    text(346, 88, "REWARDS INTO THE Kd WALLET", { size: 8.4, fill: C.text }),
    text(346, 108, "TAGGED, SO THE HISTORY READS", {
      size: 8.4,
      fill: C.text,
    }),
    text(346, 132, "REACHES A PLAYER WHO LOGGED", {
      size: 8.4,
      fill: C.text,
    }),
    text(346, 152, "OUT MID BOSS FIGHT", { size: 8.4, fill: C.text }),
    text(346, 180, "PAY Kd, PAY RACO, OR BOTH", { size: 8.4, fill: C.text }),

    panel(18, 212, 604, 54, "AND THE USUAL SUSPECTS", C.sky),
    text(34, 250, "VAULT   -   WORLDGUARD   -   PLACEHOLDERAPI   -   ITS OWN REGIONS", {
      size: 8.4,
      fill: C.text,
    }),

    text(20, 288, "MISSING ONE? THE INTEGRATION STAYS OFF, NOTHING THROWS", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "NO SHADED CLASSES", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ----------------------------------------------------------- the config */

emr["config"] = frame({
  title: "SET UP IN config.yml",
  path: "plugins/EpicMobsRework/",
  accent: C.lime,
  footer: "NOTHING WORTH CHANGING IS A CONSTANT IN THE SOURCE",
  body: [
    panel(18, 52, 292, 214, "THE FILES", C.lime),
    row(34, 84, 260, "config.yml", "every number", C.lime),
    row(34, 109, 260, "Lang.yml", "every string", C.sky),
    row(34, 134, 260, "abilities.yml", "the library", C.purple),
    row(34, 159, 260, "regions.yml", "no-spawn cuboids", C.rose),
    row(34, 184, 260, "mobs/", "one file per mob", C.ember),
    row(34, 209, 260, "raids/", "one file per raid", C.amber),
    row(34, 234, 260, "data/", "what the server made", C.muted),

    panel(330, 52, 292, 118, "BAD VALUES ARE NAMED", C.rose),
    text(346, 88, "spawning.natural.chance was 1.5,", {
      size: 8,
      fill: C.rose,
    }),
    text(346, 106, "outside 0.0 to 1.0. Using 0.2.", {
      size: 8,
      fill: C.rose,
    }),
    text(346, 132, "THEY DO NOT SILENTLY BECOME ZERO,", {
      size: 8,
      fill: C.text,
    }),
    text(346, 150, "AND THE MOB STILL LOADS.", { size: 8, fill: C.text }),

    panel(330, 182, 292, 84, "IN GAME", C.sky),
    text(346, 212, "/ep reload   everything, and what changed", {
      size: 8,
      fill: C.sky,
    }),
    text(346, 232, "/ep timings  where the tick went", {
      size: 8,
      fill: C.sky,
    }),
    text(346, 252, "/ep debug    one area at a time", {
      size: 8,
      fill: C.sky,
    }),

    text(20, 288, "AN UPDATE KEEPS YOUR VALUES AND SAVES config.yml.old", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "DURATIONS: 90s 5m 2h", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* --------------------------------------------------------- the editions */

emr["editions"] = frame({
  title: "LITE AND FULL",
  path: "/ep info",
  accent: C.amber,
  footer: "TWO JARS FROM ONE SOURCE TREE, NOTHING EXPIRES IN EITHER",
  body: [
    panel(18, 52, 292, 214, "LITE, FREE", C.emerald),
    row(34, 82, 260, "Mobs that ship", "20, built in", C.lime, 20),
    row(34, 104, 260, "Mobs of your own", "10", C.emerald, 20),
    row(34, 126, 260, "Abilities per mob", "2, built-in", C.emerald, 20),
    row(34, 148, 260, "Loot entries", "5", C.emerald, 20),
    row(34, 170, 260, "Raids", "1", C.emerald, 20),
    row(34, 192, 260, "Triggers", "3", C.emerald, 20),
    row(34, 214, 260, "Reward currencies", "1 per mob", C.emerald, 20),
    text(34, 252, "EVERY INTEGRATION WORKS HERE TOO", {
      size: 8,
      fill: C.muted,
    }),

    panel(330, 52, 292, 214, "FULL, ONE PAYMENT", C.amber),
    row(346, 84, 260, "All of the above", "no ceiling", C.amber),
    row(346, 109, 260, "Custom abilities", "abilities.yml", C.purple),
    row(346, 134, 260, "Boss phases", "yes", C.rose),
    row(346, 159, 260, "Companions, mounts", "yes", C.sky),
    row(346, 184, 260, "Packs and arenas", "yes", C.lime),
    row(346, 209, 260, "Admin editor GUI", "yes", C.ember),
    text(346, 250, "AND THE CODEX, SCALING AND API WRITES", {
      size: 8,
      fill: C.muted,
    }),

    text(20, 288, "THE TWENTY DO NOT COUNT AGAINST YOUR TEN, AND STAY PUT", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "SEPARATE JARS", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ----------------------------------------------------------- the set-up */

emr["setup"] = frame({
  title: "THE FIRST EVENING",
  path: "plugins/EpicMobsRework/",
  accent: C.sky,
  footer: "DROP IT IN, CHECK THE EDITION, FIGHT SOMETHING, THEN TURN SPAWNING ON",
  body: [
    panel(18, 52, 292, 214, "IN ORDER", C.sky),
    row(34, 82, 260, "1  drop the jar in", "nothing else needed", C.sky, 20),
    row(34, 104, 260, "2  /ep info", "which jar is this", C.sky, 20),
    row(34, 126, 260, "3  /ep list", "20 mobs already", C.lime, 20),
    row(34, 148, 260, "4  general.worlds", "before anything spawns", C.amber, 20),
    row(34, 170, 260, "5  /ep summon", "and fight it", C.ember, 20),
    row(34, 192, 260, "6  /ep create mob", "or /ep editor", C.purple, 20),
    row(34, 214, 260, "7  spawning.natural", "start it low", C.emerald, 20),
    text(34, 252, "THEN /ep timings AFTER TEN MINUTES, NOT BEFORE", {
      size: 8,
      fill: C.muted,
    }),

    panel(330, 52, 292, 118, "WHEN NOTHING SPAWNS", C.rose),
    text(346, 88, "/ep debug spawn", { size: 9, fill: C.rose }),
    text(346, 110, "IT PRINTS THE REASON FOR EVERY", {
      size: 8,
      fill: C.text,
    }),
    text(346, 128, "SINGLE REFUSAL, WHICH IS ALMOST", { size: 8, fill: C.text }),
    text(346, 146, "ALWAYS THE WHOLE ANSWER.", { size: 8, fill: C.text }),
    text(346, 162, "A PROTECTION LAYER, THE WORLD LIST, OR A CONDITION", {
      size: 7.4,
      fill: C.muted,
    }),

    panel(330, 182, 292, 84, "WHAT TO CHECK FIRST", C.amber),
    text(346, 224, "EDITION LINE ON BOOT, AND IN /ep info", {
      size: 8,
      fill: C.amber,
    }),
    text(346, 242, "THE TWO JARS LOOK IDENTICAL IN THE", {
      size: 8,
      fill: C.text,
    }),
    text(346, 260, "PLUGINS FOLDER APART FROM THE NAME", {
      size: 8,
      fill: C.text,
    }),

    text(20, 288, "DO IT ON A TEST SERVER. /ep clear TIDIES UP AFTER YOU", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "NO RESTART NEEDED", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------------- the developer API */

emr["api"] = frame({
  title: "THE DEVELOPER API",
  path: "me.jaymar921.epicmobs.api",
  accent: C.purple,
  footer: "CLOSED SOURCE, SO THE CONTRACT IS PUBLISHED INSTEAD",
  body: [
    panel(18, 52, 604, 74, "ONE JAR, AND NOTHING INTERNAL IN IT", C.purple),
    text(34, 94, "EpicMobsRework-api.jar", { size: 9.5, fill: C.purple }),
    text(230, 94, "provided SCOPE, LIKE SPIGOT", {
      size: 8.4,
      fill: C.text,
    }),
    text(34, 114, "NOTHING IN THE PACKAGE NAMES A CLASS OUTSIDE IT BUT BUKKIT AND THE JDK", {
      size: 8,
      fill: C.text,
    }),

    panel(18, 138, 292, 128, "WHAT YOU GET", C.sky),
    row(34, 168, 260, "views", "4", C.sky, 20),
    row(34, 190, 260, "queries", "10", C.sky, 20),
    row(34, 212, 260, "events", "11", C.rose, 20),
    row(34, 234, 260, "mutating calls", "4, premium", C.amber, 20),

    panel(330, 138, 292, 128, "THE RULES", C.amber),
    text(346, 182, "MAIN THREAD ONLY. THERE IS NO", { size: 8, fill: C.text }),
    text(346, 198, "LOCK THAT WOULD MAKE IT SAFE.", { size: 8, fill: C.text }),
    text(346, 220, "RESOLVE IN onEnable, NOT STATIC.", { size: 8, fill: C.text }),
    text(346, 240, "HANDLES SURVIVE A RELOAD.", { size: 8, fill: C.text }),
    text(346, 256, "DEFINITION VIEWS DO NOT.", { size: 8, fill: C.text }),

    text(20, 288, "EVERY QUERY AND EVERY EVENT WORKS ON LITE TOO", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "apiVersion() SAYS WHEN IT MOVED", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* -------------------------------------------------------- the changelog */

emr["changelog"] = frame({
  title: "RELEASE CANDIDATE",
  path: "status",
  accent: C.ember,
  footer: "EVERY FEATURE IS BUILT. WHAT IT HAS NOT HAD IS OTHER PEOPLE'S SERVERS",
  body: [
    panel(18, 52, 604, 96, "WHERE 1.0 IS", C.ember),
    text(34, 88, "Nothing on the 1.0 feature list is deferred, and both jars", {
      size: 8.8,
      fill: C.text,
    }),
    text(34, 108, "are published. RC2 added raids that wait for dark and happen", {
      size: 8.8,
      fill: C.text,
    }),
    text(34, 128, "in the Nether and the End, and playing one found four bugs.", {
      size: 8.8,
      fill: C.text,
    }),

    panel(18, 160, 292, 106, "SHIPPED", C.emerald),
    row(34, 190, 260, "The feature list", "all of it", C.emerald, 20),
    row(34, 212, 260, "Both editions", "on spigot", C.emerald, 20),
    row(34, 234, 260, "Mobs in the box", "20 lite, 40 full", C.emerald, 20),

    panel(330, 160, 292, 106, "STILL WANTED", C.amber),
    row(346, 190, 260, "A raid, two players", "never had it", C.amber, 20),
    row(346, 212, 260, "An arena, finished", "never seen", C.amber, 20),
    row(346, 234, 260, "1.0 proper", "no date", C.rose, 20),

    text(20, 288, "A RELEASE CANDIDATE IS PUBLISHED TO BE BROKEN. PLEASE DO", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "1.0-RC2", { size: 9, fill: C.ember, anchor: "end" }),
  ].join("\n"),
});

/* ------------------------------------------------------ the hero banner */

const BW = 1600;
const BH = 640;

/**
 * Firelight and a skyline of spawn columns. Deliberately abstract: the page
 * puts the logo and the headline over the middle of it, so anything drawn
 * there would be covered up.
 */
function banner() {
  const columns = Array.from({ length: 30 }, (_, i) => {
    const h = 90 + Math.abs(Math.sin(i * 1.31)) * 240;
    const x = 40 + i * 52;
    const warm = i % 3 === 0 ? C.ember : i % 3 === 1 ? C.amber : C.rose;
    return (
      rect(x, BH - h - 90, 26, h, warm, 0.1) +
      rect(x, BH - h - 90, 26, 3, warm, 0.55) +
      rect(x + 11, BH - h - 130, 3, 40, warm, 0.25)
    );
  }).join("");

  // Six tier pips arcing over the middle, the one design constant that is
  // safe to draw because it never moves.
  const arc = Array.from({ length: 6 }, (_, i) => {
    const x = 620 + i * 72;
    const y = 250 - Math.sin((i / 5) * Math.PI) * 54;
    const size = 18 + i * 4;
    return rect(x, y, size, size, C.ember, 0.18 + i * 0.11, C.amber, 0.6, 2);
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BW} ${BH}" width="${BW}" height="${BH}" role="img" aria-label="Epic Mobs Rework">
<defs>
<pattern id="bgrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#94a3b8" stroke-opacity="0.05"/></pattern>
<radialGradient id="bglow" cx="50%" cy="46%" r="58%"><stop offset="0%" stop-color="${C.ember}" stop-opacity="0.22"/><stop offset="100%" stop-color="${C.ember}" stop-opacity="0"/></radialGradient>
<radialGradient id="bvig" cx="50%" cy="45%" r="70%"><stop offset="42%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.88"/></radialGradient>
<linearGradient id="bfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b0d11" stop-opacity="0"/><stop offset="100%" stop-color="#0b0d11" stop-opacity="1"/></linearGradient>
</defs>
${rect(0, 0, BW, BH, "#150c06")}
${rect(0, 0, BW, BH, "url(#bgrid)")}
${rect(0, 0, BW, BH, "url(#bglow)")}
${columns}
${arc}
${rect(0, 300, BW, 340, "url(#bfloor)")}
${rect(0, 0, BW, BH, "url(#bvig)")}
</svg>
`;
}

/* ------------------------------------------------- the link preview card */

const OW = 1200;
const OH = 630;

function ogCard() {
  const chip = (x, y, label, color) =>
    rect(x, y, 190, 46, "rgba(0,0,0,0.55)", 1, color, 0.55, 2) +
    text(x + 95, y + 30, label, {
      size: 18,
      fill: color,
      anchor: "middle",
      spacing: 1.5,
    });

  const chips = [
    ["MOBS", C.ember],
    ["ABILITIES", C.purple],
    ["RAIDS", C.rose],
    ["COMPANIONS", C.emerald],
  ];
  const spread = chips.length * 200 - 10;
  const startX = (OW - spread) / 2;
  // The one version-ish string in this file, and it is here because the
  // difference between a release candidate and a release is exactly what a
  // link preview has to carry. It becomes "OUT NOW" on 1.0 and not before.
  const badge = "RELEASE CANDIDATE";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${OW} ${OH}" width="${OW}" height="${OH}">
<defs>
<pattern id="ogrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#94a3b8" stroke-opacity="0.06"/></pattern>
<radialGradient id="oglow" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="${C.ember}" stop-opacity="0.24"/><stop offset="100%" stop-color="${C.ember}" stop-opacity="0"/></radialGradient>
<radialGradient id="ovig" cx="50%" cy="45%" r="72%"><stop offset="40%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.9"/></radialGradient>
</defs>
${rect(0, 0, OW, OH, "#0b0d11")}
${rect(0, 0, OW, OH, "url(#ogrid)")}
${rect(0, 0, OW, OH, "url(#oglow)")}
${rect(0, 0, OW, OH, "url(#ovig)")}
${corners(48, 48, OW - 96, OH - 96, C.ember, 40, 3, 0.5)}
${rect(OW / 2 - (badge.length * 14 + 48) / 2, 120, badge.length * 14 + 48, 44, "rgba(0,0,0,0.6)", 1, C.amber, 0.7, 2)}
${text(OW / 2, 150, badge, { size: 20, fill: C.amber, anchor: "middle", spacing: 2 })}
${text(OW / 2, 262, "EPIC MOBS REWORK", { size: 58, weight: 700, fill: C.ember, anchor: "middle", spacing: 3 })}
${text(OW / 2, 318, "Build the mob. Give it abilities. Decide where it lives.", { size: 25, fill: C.text, anchor: "middle" })}
${chips.map((c, i) => chip(startX + i * 200, 396, c[0], c[1])).join("\n")}
${text(OW / 2, 516, "SPIGOT AND PAPER 1.16.5 AND UP  -  NO NMS", { size: 21, fill: C.muted, anchor: "middle", spacing: 2 })}
${text(OW / 2, 562, "JHPROJECTS  -  JAYMAR921", { size: 19, fill: C.amber, anchor: "middle", spacing: 3 })}
${rect(0, 0, OW, 6, C.ember, 0.6)}
${rect(0, OH - 6, OW, 6, C.amber, 0.5)}
</svg>
`;
}

/* ---------------------------------------------------------------- write */

const OUT = resolve(ROOT, "src/assets/epic_mobs_rework/features");
mkdirSync(OUT, { recursive: true });

for (const [name, svg] of Object.entries(emr)) {
  writeFileSync(resolve(OUT, `${name}.svg`), svg, "utf8");
  console.log(`wrote src/assets/epic_mobs_rework/features/${name}.svg`);
}

writeFileSync(resolve(OUT, "../banner.svg"), banner(), "utf8");
console.log("wrote src/assets/epic_mobs_rework/banner.svg");

writeFileSync(
  resolve(ROOT, "scripts/og-epic-mobs-rework.svg"),
  ogCard(),
  "utf8",
);
console.log("wrote scripts/og-epic-mobs-rework.svg");
