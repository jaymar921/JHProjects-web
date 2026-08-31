/**
 * Draws the feature art for the three projects added after the plugin pages:
 * 2D Graphics Utils, Custom Enchantments 2 and More Foods & Crops.
 *
 * Same idea as generate-kumandra-art.mjs. Every panel is a drawing of what the
 * project actually does, with real API names and real numbers in it, so the
 * art does not go stale the moment somebody reads the docs next to it. The
 * palette is what changes per project:
 *
 *   2D Graphics Utils   cyan and violet, an editor and a canvas
 *   Custom Enchantments 2  purple and amber, enchanting table glow
 *   More Foods & Crops  green and amber, a garden bed
 *
 *   node scripts/generate-project-art.mjs
 *
 * Writes into src/assets/<project>/features/, plus one Open Graph card each
 * into scripts/, which generate-og.sh rasterises.
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
  cyan: "#22d3ee",
  violet: "#a78bfa",
  purple: "#c084fc",
  amber: "#fbbf24",
  emerald: "#34d399",
  lime: "#a3e635",
  sky: "#38bdf8",
  rose: "#fb7185",
  teal: "#2dd4bf",
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

/* ===================================================== 2D GRAPHICS UTILS */

const gfx = {};

/* The canvas itself: sprites registered, camera offset, viewport culling. */
gfx["canvas"] = frame({
  title: "CANVAS SCREEN",
  path: "CanvasScreen.js",
  accent: C.cyan,
  footer: "ONE WRAPPER AROUND <CANVAS> THAT OWNS THE RENDER LOOP",
  body: [
    panel(18, 52, 380, 214, "VIEWPORT", C.cyan),
    // the visible viewport, with a couple of culled sprites outside it
    rect(38, 78, 296, 172, "rgba(34,211,238,0.04)", 1, C.cyan, 0.35, 1),
    rect(70, 104, 46, 46, C.violet, 0.55, C.violet, 0.8, 1),
    text(93, 160, "PLAYER", { size: 7, fill: C.violet, anchor: "middle" }),
    rect(170, 130, 38, 38, C.emerald, 0.45, C.emerald, 0.7, 1),
    text(189, 178, "BLOCK", { size: 7, fill: C.emerald, anchor: "middle" }),
    rect(258, 96, 34, 34, C.amber, 0.45, C.amber, 0.7, 1),
    text(275, 142, "ITEM", { size: 7, fill: C.amber, anchor: "middle" }),
    rect(256, 186, 40, 40, C.sky, 0.35, C.sky, 0.6, 1),
    text(276, 238, "OBJECT", { size: 7, fill: C.sky, anchor: "middle" }),
    // an off-screen sprite, drawn faint, to show what culling skips
    rect(346, 148, 32, 32, C.dim, 0.22, C.dim, 0.5, 1),
    text(362, 192, "CULLED", { size: 7, fill: C.dim, anchor: "middle" }),
    text(38, 266, "OFF-SCREEN SPRITES ARE SKIPPED EACH FRAME", {
      size: 7.6,
      fill: C.dim,
    }),

    panel(410, 52, 212, 214, "SCREEN STATE", C.violet),
    row(426, 84, 180, "registered", "4 sprites", C.cyan),
    row(426, 110, 180, "cameraOffset", "x 5, y 5", C.violet),
    row(426, 136, 180, "globalScale", "1.0000", C.violet),
    row(426, 162, 180, "drag", "enabled", C.emerald),
    row(426, 188, 180, "zoom", "0.01 / scroll", C.emerald),
    row(426, 214, 180, "ysort", "on", C.amber),
    text(426, 250, "CAPPED AT 60 FPS", { size: 7.6, fill: C.dim }),

    text(20, 288, "new CanvasScreen('my-canvas', 300, 300, 'black')", {
      size: 9,
      fill: C.text,
    }),
  ].join("\n"),
});

/* Sprites and animation frames. */
gfx["sprites"] = frame({
  title: "SPRITES & ANIMATION",
  path: "Sprite.js",
  accent: C.violet,
  footer: "REGISTER IT ONCE, THE SCREEN DRAWS IT EVERY FRAME AFTER THAT",
  body: [
    panel(18, 52, 330, 130, "ANIMATION FRAMES", C.violet),
    ...Array.from({ length: 6 }, (_, i) =>
      [
        slot(38 + i * 50, 84, 42),
        rect(48 + i * 50, 94, 22, 22, C.violet, i === 2 ? 0.75 : 0.32),
        text(59 + i * 50, 140, `${i + 1}`, {
          size: 7.5,
          fill: i === 2 ? C.violet : C.dim,
          anchor: "middle",
        }),
      ].join(""),
    ),
    text(38, 168, "walkLeft  frames: 6  frameBuffer paced, loop: true", {
      size: 8,
      fill: C.dim,
    }),

    panel(18, 194, 330, 72, "SWITCHING", C.cyan),
    text(34, 224, "player.switchAnimation('walkLeft')", {
      size: 8.4,
      fill: C.text,
    }),
    text(34, 240, "player.play()", { size: 8.4, fill: C.text }),
    text(34, 256, "NAMES COME FROM THE animations OBJECT", {
      size: 7.6,
      fill: C.dim,
    }),

    panel(360, 52, 262, 214, "SPRITE TYPES", C.amber),
    ...[
      ["PLAYER", C.violet],
      ["OBJECT", C.sky],
      ["BLOCK", C.emerald],
      ["ITEM", C.amber],
      ["FLUID", C.cyan],
      ["PASSABLE", C.teal],
      ["BACKGROUND", C.dim],
      ["STATIC", C.rose],
    ].flatMap(([name, color], i) => {
      const y = 82 + i * 23;
      return [
        rect(376, y, 230, 19, "rgba(0,0,0,0.45)", 1, color, 0.32, 1),
        rect(376, y, 3, 19, color, 0.8),
        text(386, y + 13, name, { size: 8, fill: C.text }),
        text(598, y + 13, name === "STATIC" ? "HUD, no camera" : "world space", {
          size: 7,
          fill: C.dim,
          anchor: "end",
        }),
      ];
    }),

    text(20, 288, "POSITIONS ARE ALWAYS WORLD SPACE", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "THE RENDERER APPLIES PAN AND ZOOM", {
      size: 8.6,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* Y-sorting, the 1.3.0 headline. */
gfx["ysort"] = frame({
  title: "Y-SORT DEPTH",
  path: "setYsort(true)",
  accent: C.emerald,
  footer: "TOP-DOWN DEPTH ORDER, SORTED BY BOTTOM EDGE EVERY FRAME",
  body: [
    panel(18, 52, 300, 214, "PLAYER BEHIND THE TREE", C.emerald),
    // tree drawn over a player, with the player showing through
    rect(150, 84, 56, 96, C.emerald, 0.3, C.emerald, 0.6, 1),
    text(178, 76, "TREE", { size: 7.5, fill: C.emerald, anchor: "middle" }),
    rect(160, 150, 36, 52, C.violet, 0.75, C.violet, 0.9, 1),
    text(178, 216, "PLAYER", { size: 7.5, fill: C.violet, anchor: "middle" }),
    `<path d="M60 180h60" stroke="${C.dim}" stroke-width="1" stroke-dasharray="3 3"/>`,
    text(60, 176, "bottom edge", { size: 7, fill: C.dim }),
    text(34, 244, "THE TREE SITS LOWER, SO IT DRAWS IN FRONT,", {
      size: 7.8,
      fill: C.text,
    }),
    text(34, 258, "AND FADES SO THE PLAYER STAYS VISIBLE.", {
      size: 7.8,
      fill: C.text,
    }),

    panel(330, 52, 292, 118, "THE THREE KNOBS", C.cyan),
    row(346, 84, 260, "setYsort", "true", C.emerald),
    row(346, 110, 260, "setBehindOpacity", "0.5", C.violet),
    row(346, 136, 260, "setOverlapThreshold", "0.1", C.amber),
    text(346, 163, "OVERLAP IS AREA RELATIVE TO THE SMALLER BOX", {
      size: 7.4,
      fill: C.dim,
    }),

    panel(330, 182, 292, 84, "RENDER ORDER", C.amber),
    text(346, 212, "1  BACKGROUND", { size: 8.4, fill: C.dim }),
    text(346, 230, "2  WORLD SPRITES, SORTED BY BOTTOM EDGE", {
      size: 8.4,
      fill: C.text,
    }),
    text(346, 248, "3  STATIC, THE HUD LAYER, ALWAYS LAST", {
      size: 8.4,
      fill: C.rose,
    }),
    text(346, 262, "REUSED ARRAYS, NO PER-FRAME ALLOCATION", {
      size: 7.2,
      fill: C.dim,
    }),

    text(20, 288, "NEW IN v1.3.0", { size: 9.5, fill: C.emerald }),
    text(160, 288, "FOR TOP-DOWN GAMES WHERE DEPTH HAS TO READ RIGHT", {
      size: 8.6,
      fill: C.muted,
    }),
  ].join("\n"),
});

/* Input: click, drag, zoom, all corrected for scale. */
gfx["input"] = frame({
  title: "INPUT & CAMERA",
  path: "handleScreenClickedEvent",
  accent: C.amber,
  footer: "CLICKS COME BACK IN WORLD SPACE, ALREADY CORRECTED FOR ZOOM",
  body: [
    panel(18, 52, 340, 214, "CLICK EVENT", C.amber),
    row(34, 84, 308, "e.objID", "'player-1'", C.violet),
    row(34, 110, 308, "e.type", "SpriteType.PLAYER", C.cyan),
    row(34, 136, 308, "e.mousePosition.x", "412.5", C.amber),
    row(34, 162, 308, "e.mousePosition.y", "188.0", C.amber),
    row(34, 188, 308, "e.layers", "[3 sprites]", C.emerald),
    text(34, 228, "TOP-MOST SPRITE FIRST, EVERYTHING UNDER IT", {
      size: 7.8,
      fill: C.dim,
    }),
    text(34, 246, "IN e.layers. COMPARE STRAIGHT AGAINST", {
      size: 7.8,
      fill: C.dim,
    }),
    text(34, 260, "sprite.posX AND sprite.posY.", { size: 7.8, fill: C.dim }),

    panel(370, 52, 252, 118, "PAN", C.cyan),
    `<path d="M400 130h180" stroke="${C.cyan}" stroke-width="1.5" stroke-opacity="0.6" stroke-dasharray="6 5"/>`,
    `<path d="M580 130l-9-5v10z" fill="${C.cyan}" fill-opacity="0.85"/>`,
    `<path d="M400 130l9-5v10z" fill="${C.cyan}" fill-opacity="0.85"/>`,
    text(386, 108, "enableScreenDrag(true)", { size: 8.2, fill: C.text }),
    text(386, 156, "DELTA IS DIVIDED BY SCALE, SO", {
      size: 7.4,
      fill: C.dim,
    }),
    text(386, 166, "PAN SPEED FEELS THE SAME AT ANY ZOOM", {
      size: 7.4,
      fill: C.dim,
    }),

    panel(370, 182, 252, 84, "ZOOM", C.violet),
    text(386, 212, "enableScreenZoom(true)", { size: 8.2, fill: C.text }),
    text(386, 230, "setZoomSpeed(0.05)", { size: 8.2, fill: C.text }),
    meter(386, 242, 220, 0.62, C.violet, 6),
    text(386, 262, "CENTRED ON THE VIEWPORT, CLAMPED TO 4DP", {
      size: 7.2,
      fill: C.dim,
    }),

    text(20, 288, "A TAP NEVER FIRES AS A DRAG", { size: 9, fill: C.text }),
    text(620, 288, "4px MOVEMENT THRESHOLD", {
      size: 8.6,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* Install and use, the five line version. */
const GFX_CODE = [
  ["npm install @jaymar921/2dgraphic-utils", C.emerald],
  ["", C.text],
  ["import { CanvasScreen, Sprite, SpriteType }", C.text],
  ["  from '@jaymar921/2dgraphic-utils';", C.text],
  ["", C.text],
  ["const canvas = new CanvasScreen('my-canvas');", C.cyan],
  ["", C.text],
  ["const player = new Sprite({", C.text],
  ["  objID: 'player-1',", C.violet],
  ["  posX: 150, posY: 150,", C.violet],
  ["  imageSource: 'player.png',", C.violet],
  ["  type: SpriteType.PLAYER,", C.violet],
  ["});", C.text],
  ["", C.text],
  ["canvas.registerObject(player);", C.amber],
];

gfx["install"] = frame({
  title: "GETTING STARTED",
  path: "npm",
  accent: C.cyan,
  footer: "ONE PACKAGE, NO PEER DEPENDENCIES, WORKS WITH OR WITHOUT REACT",
  body: [
    panel(18, 52, 396, 214, "QUICK START", C.cyan),
    ...GFX_CODE.map((line, i) =>
      text(34, 78 + i * 13, line[0], { size: 8.2, fill: line[1] }),
    ),

    panel(426, 52, 196, 118, "WORKS WITH", C.violet),
    ...[
      ["Vanilla JS", C.cyan],
      ["React", C.violet],
      ["Any bundler", C.amber],
    ].flatMap(([name, color], i) => {
      const y = 84 + i * 26;
      return [
        rect(442, y, 164, 20, "rgba(0,0,0,0.45)", 1, color, 0.35, 1),
        rect(442, y, 3, 20, color, 0.8),
        text(452, y + 14, name, { size: 8.2, fill: C.text }),
      ];
    }),

    panel(426, 182, 196, 84, "STILL SHIPPING", C.emerald),
    text(442, 212, "v1.3.0 IS CURRENT", { size: 8.4, fill: C.emerald }),
    text(442, 230, "MIT, ON GITHUB", { size: 8, fill: C.text }),
    text(442, 248, "ISSUES AND PRS", { size: 8, fill: C.text }),
    text(442, 262, "ARE WELCOME", { size: 8, fill: C.text }),

    text(20, 288, "THE ONE PROJECT HERE THAT IS STILL MAINTAINED", {
      size: 9,
      fill: C.text,
    }),
  ].join("\n"),
});

/* ================================================ CUSTOM ENCHANTMENTS 2 */

const ce2 = {};

const CE2_ENCHANTS = [
  ["TELEPATHY", "tool", C.emerald],
  ["LIFESTEAL", "sword", C.rose],
  ["DEATH ANGEL", "sword", C.purple],
  ["STORM", "magic", C.sky],
  ["PHOENIX", "armor", C.amber],
  ["SECOND LIFE", "armor", C.emerald],
  ["FROST ARROW", "bow", C.cyan],
  ["SOUL EATER", "sword", C.purple],
  ["AUTO SMELT", "tool", C.amber],
  ["STELLA", "magic", C.violet],
  ["HAIL STORM", "magic", C.cyan],
  ["FORCE SHIELD", "armor", C.sky],
];

ce2["enchants"] = frame({
  title: "78 ENCHANTMENTS",
  path: "CustomEnchants.java",
  accent: C.purple,
  footer: "SWORD, BOW, ARMOUR, TOOL AND MAGIC, ALL ON VANILLA GEAR",
  body: [
    panel(18, 52, 604, 214, "REGISTERED ON STARTUP", C.purple),
    ...CE2_ENCHANTS.flatMap(([name, slot_, color], i) => {
      const col = i % 3;
      const line = Math.floor(i / 3);
      const x = 34 + col * 196;
      const y = 82 + line * 44;
      return [
        rect(x, y, 180, 34, "rgba(0,0,0,0.45)", 1, color, 0.32, 1),
        rect(x, y, 3, 34, color, 0.8),
        text(x + 12, y + 15, name, { size: 8.4, fill: C.text }),
        text(x + 12, y + 27, slot_, { size: 7, fill: C.dim }),
      ];
    }),
    text(330, 258, "AND 66 MORE IN THE JAR", {
      size: 8,
      fill: C.dim,
      anchor: "middle",
    }),
    text(20, 288, "/ce give <player> <enchant>", { size: 9, fill: C.text }),
    text(620, 288, "/es OPENS THE ENCHANT SHOP", {
      size: 8.6,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

ce2["rpg"] = frame({
  title: "RPG LAYER",
  path: "extras/",
  accent: C.amber,
  footer: "BOSSES, LOOT, CUSTOM STRUCTURES AND AN ENCHANTED TREE",
  body: [
    panel(18, 52, 292, 214, "WHAT CAME WITH IT", C.amber),
    ...[
      ["BOSSES", "raid events with /raid", C.rose],
      ["LUCKY TREASURE", "loot from broken blocks", C.amber],
      ["CUSTOM STRUCTURES", "a castle schematic", C.purple],
      ["ENCHANTED TREE", "grows its own drops", C.emerald],
      ["ADVANCED TABLE", "reroll and combine", C.sky],
    ].flatMap(([name, note, color], i) => {
      const y = 84 + i * 36;
      return [
        rect(34, y, 260, 30, "rgba(0,0,0,0.45)", 1, color, 0.32, 1),
        rect(34, y, 3, 30, color, 0.8),
        text(46, y + 13, name, { size: 8.2, fill: C.text }),
        text(46, y + 24, note, { size: 7, fill: C.dim }),
      ];
    }),

    panel(330, 52, 292, 118, "SITS BESIDE", C.purple),
    row(346, 84, 260, "PvPManager", "softdepend", C.purple),
    row(346, 110, 260, "WorldGuard", "softdepend", C.purple),
    row(346, 136, 260, "KumandrasEconomy", "loadbefore", C.emerald),
    text(346, 163, "NEITHER IS REQUIRED TO RUN IT", {
      size: 7.4,
      fill: C.dim,
    }),

    panel(330, 182, 292, 84, "THE ANVIL AND THE TABLE", C.sky),
    text(346, 212, "COMBINE TWO ENCHANTED ITEMS AND KEEP", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 228, "THE BETTER ROLL, UP TO THE LIMIT IN THE", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 244, "CONFIG. BOTH CAN BE TURNED OFF.", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 262, "config.yml DECIDES ALL OF IT", { size: 7.2, fill: C.dim }),

    text(20, 288, "BUILT FOR 1.16 AND 1.18 SERVERS", {
      size: 9,
      fill: C.text,
    }),
  ].join("\n"),
});

ce2["opensource"] = frame({
  title: "OPEN SOURCE NOW",
  path: "github.com/JnH-Projects",
  accent: C.emerald,
  footer: "DISCONTINUED IN 2022, PUBLISHED SO IT DOES NOT JUST DISAPPEAR",
  body: [
    panel(18, 52, 604, 96, "THE HANDOVER", C.emerald),
    text(34, 84, "CE2 was discontinued in December 2021 while CE3 was", {
      size: 8.8,
      fill: C.text,
    }),
    text(34, 102, "being written. The last patch went out in July 2022,", {
      size: 8.8,
      fill: C.text,
    }),
    text(34, 120, "and the source is on GitHub for anyone who wants it.", {
      size: 8.8,
      fill: C.text,
    }),
    text(34, 138, "It is not compatible with CE3. Different plugin.", {
      size: 8.4,
      fill: C.amber,
    }),

    panel(18, 160, 292, 106, "LAST RELEASES", C.amber),
    ...[
      ["2.1.7e", "Jul 2022", "Tank health checks"],
      ["2.1.7c", "Apr 2022", "anvil damage values"],
      ["2.1.6c", "Apr 2022", "telepathy duplication"],
    ].flatMap(([v, when, what], i) => {
      const y = 192 + i * 26;
      return [
        text(34, y, v, { size: 8.4, fill: C.amber }),
        text(90, y, when, { size: 7.6, fill: C.dim }),
        text(292, y, what, { size: 7.6, fill: C.text, anchor: "end" }),
      ];
    }),

    panel(330, 160, 292, 106, "WHERE IT WENT", C.purple),
    text(346, 192, "CUSTOM ENCHANTMENTS 3", {
      size: 9,
      fill: C.purple,
      spacing: 1.2,
    }),
    text(346, 212, "Rewritten from scratch, with classes,", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 228, "a skill system, quests and its own", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 244, "economy. Still maintained today.", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 262, "SHARES THIS SPIGOT LISTING", { size: 7.2, fill: C.dim }),

    text(20, 288, "MIT-ERA SOURCE, NO SUPPORT", { size: 9, fill: C.text }),
    text(620, 288, "FORKS WELCOME", {
      size: 8.6,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ================================================== MORE FOODS & CROPS */

const foods = {};

foods["crops"] = frame({
  title: "CROPS & COOKING",
  path: "behavior_pack/",
  accent: C.lime,
  footer: "A BEDROCK ADDON: NEW CROPS TO GROW AND NEW THINGS TO COOK",
  body: [
    panel(18, 52, 604, 130, "THE GARDEN BED", C.lime),
    // a tilled row with crops at different growth stages
    ...Array.from({ length: 8 }, (_, i) => {
      const x = 40 + i * 72;
      const stage = (i % 4) + 1;
      return [
        rect(x, 138, 56, 26, "#3f2d1d", 0.85, C.dim, 0.4, 1),
        ...Array.from({ length: stage }, (_, s) =>
          rect(
            x + 8 + s * 12,
            138 - 8 - s * 6,
            6,
            14 + s * 6,
            [C.lime, C.emerald, C.amber, C.rose][i % 4],
            0.7,
          ),
        ),
        text(x + 28, 178, `STAGE ${stage}`, {
          size: 6.6,
          fill: C.dim,
          anchor: "middle",
        }),
      ].join("");
    }),

    panel(18, 194, 292, 72, "GROW IT", C.emerald),
    text(34, 224, "PLANT, WATER, WAIT, HARVEST. THE", {
      size: 7.8,
      fill: C.text,
    }),
    text(34, 240, "SAME LOOP VANILLA FARMING ALREADY", {
      size: 7.8,
      fill: C.text,
    }),
    text(34, 256, "USES, WITH MORE ON THE END OF IT.", {
      size: 7.8,
      fill: C.text,
    }),

    panel(330, 194, 292, 72, "COOK IT", C.amber),
    text(346, 224, "NEW INGREDIENTS FEED NEW RECIPES,", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 240, "SO A HARVEST IS WORTH SOMETHING", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 256, "BEYOND FILLING THE HUNGER BAR.", {
      size: 7.8,
      fill: C.text,
    }),

    text(20, 288, "MINECRAFT BEDROCK 1.20.80", { size: 9, fill: C.text }),
    text(620, 288, "ADDON, NOT A PLUGIN", {
      size: 8.6,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

foods["unfinished"] = frame({
  title: "UNFINISHED",
  path: "status",
  accent: C.amber,
  footer: "PUT DOWN BEFORE IT WAS DONE, LEFT PUBLIC SO IT IS NOT LOST",
  body: [
    panel(18, 52, 604, 118, "WHERE IT GOT TO", C.amber),
    text(34, 88, "The addon works and it is playable, but it was never", {
      size: 8.8,
      fill: C.text,
    }),
    text(34, 108, "finished, and there is no plan to pick it back up. It", {
      size: 8.8,
      fill: C.text,
    }),
    text(34, 128, "is on GitHub, open, for anyone who wants to take it", {
      size: 8.8,
      fill: C.text,
    }),
    text(34, 148, "further or pull a crop or two out of it.", {
      size: 8.8,
      fill: C.text,
    }),

    panel(18, 182, 292, 84, "BUILT BY TWO", C.emerald),
    row(34, 210, 260, "JayMar921", "developer", C.emerald),
    row(34, 236, 260, "MikaPiaChu921", "art and QA", C.rose),

    panel(330, 182, 292, 84, "IF YOU WANT IT", C.lime),
    text(346, 212, "FORK IT, SHIP IT, RENAME IT.", {
      size: 8.2,
      fill: C.text,
    }),
    text(346, 230, "NO SUPPORT, NO ROADMAP, NO", { size: 8.2, fill: C.text }),
    text(346, 248, "OBJECTION TO ANY OF THAT.", { size: 8.2, fill: C.text }),
    text(346, 264, "github.com/jaymar921", { size: 7.4, fill: C.dim }),

    text(20, 288, "STATUS: PARKED", { size: 9, fill: C.amber }),
    text(620, 288, "SOURCE IS PUBLIC", {
      size: 8.6,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------ the link preview cards */

const OW = 1200;
const OH = 630;

/**
 * One shared Open Graph card layout. Each project passes its own palette,
 * title, strapline and chips, so the three cards look like a set.
 */
function ogCard({ title, strapline, chips, accent, second, footer, badge }) {
  const chip = (x, y, label, color) =>
    rect(x, y, 190, 46, "rgba(0,0,0,0.55)", 1, color, 0.55, 2) +
    text(x + 95, y + 30, label, {
      size: 18,
      fill: color,
      anchor: "middle",
      spacing: 1.5,
    });

  const spread = chips.length * 200 - 10;
  const startX = (OW - spread) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${OW} ${OH}" width="${OW}" height="${OH}">
<defs>
<pattern id="ogrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#94a3b8" stroke-opacity="0.06"/></pattern>
<radialGradient id="oglow" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/></radialGradient>
<radialGradient id="ovig" cx="50%" cy="45%" r="72%"><stop offset="40%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.9"/></radialGradient>
</defs>
${rect(0, 0, OW, OH, "#0b0d11")}
${rect(0, 0, OW, OH, "url(#ogrid)")}
${rect(0, 0, OW, OH, "url(#oglow)")}
${rect(0, 0, OW, OH, "url(#ovig)")}
${corners(48, 48, OW - 96, OH - 96, accent, 40, 3, 0.5)}
${
  badge
    ? rect(OW / 2 - 130, 120, 260, 44, "rgba(0,0,0,0.6)", 1, second, 0.7, 2) +
      text(OW / 2, 150, badge, {
        size: 20,
        fill: second,
        anchor: "middle",
        spacing: 2,
      })
    : ""
}
${text(OW / 2, 268, title, { size: 62, weight: 700, fill: accent, anchor: "middle", spacing: 3 })}
${text(OW / 2, 324, strapline, { size: 26, fill: C.text, anchor: "middle" })}
${chips.map((c, i) => chip(startX + i * 200, 400, c[0], c[1])).join("\n")}
${text(OW / 2, 520, footer, { size: 21, fill: C.muted, anchor: "middle", spacing: 2 })}
${text(OW / 2, 566, "JHPROJECTS  -  JAYMAR921", { size: 19, fill: second, anchor: "middle", spacing: 3 })}
${rect(0, 0, OW, 6, accent, 0.6)}
${rect(0, OH - 6, OW, 6, second, 0.5)}
</svg>
`;
}

/* ---------------------------------------------------------------- write */

const groups = [
  ["src/assets/graphics_utils/features", gfx],
  ["src/assets/custom_enchants_2/features", ce2],
  ["src/assets/more_foods_crops/features", foods],
];

for (const [dir, scenes] of groups) {
  const out = resolve(ROOT, dir);
  mkdirSync(out, { recursive: true });
  for (const [name, svg] of Object.entries(scenes)) {
    writeFileSync(resolve(out, `${name}.svg`), svg, "utf8");
    console.log(`wrote ${dir}/${name}.svg`);
  }
}

const cards = [
  [
    "og-graphics-utils",
    {
      title: "2D GRAPHICS UTILS",
      strapline: "A canvas, sprites and a render loop you do not have to write",
      accent: C.cyan,
      second: C.violet,
      badge: "NPM  -  v1.3.0",
      chips: [
        ["SPRITES", C.violet],
        ["Y-SORT", C.emerald],
        ["ZOOM & PAN", C.amber],
      ],
      footer: "npm install @jaymar921/2dgraphic-utils",
    },
  ],
  [
    "og-custom-enchants-2",
    {
      title: "CUSTOM ENCHANTMENTS 2",
      strapline: "78 custom enchants, lucky loot and RPG feels, free",
      accent: C.purple,
      second: C.amber,
      badge: "ARCHIVED  -  OPEN SOURCE",
      chips: [
        ["78 ENCHANTS", C.purple],
        ["BOSSES", C.rose],
        ["LOOT", C.amber],
      ],
      footer: "SPIGOT 1.16 - 1.18  -  DISCONTINUED 2022",
    },
  ],
  [
    "og-more-foods",
    {
      title: "MORE FOODS & CROPS",
      strapline: "New crops to grow and new things to cook, on Bedrock",
      accent: C.lime,
      second: C.amber,
      badge: "UNFINISHED  -  OPEN SOURCE",
      chips: [
        ["CROPS", C.lime],
        ["RECIPES", C.amber],
        ["BEDROCK", C.emerald],
      ],
      footer: "MINECRAFT BEDROCK 1.20.80  -  ADDON",
    },
  ],
];

for (const [name, spec] of cards) {
  writeFileSync(resolve(ROOT, "scripts", `${name}.svg`), ogCard(spec), "utf8");
  console.log(`wrote scripts/${name}.svg`);
}
