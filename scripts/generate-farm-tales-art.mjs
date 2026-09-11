/**
 * Draws the feature art, the hero banner and the link preview card for
 * Farm Tales.
 *
 * Same idea as generate-emr-art.mjs: every panel is a drawing of what the
 * plugin actually does, with the real config keys, the real command names and
 * the real Lite limits in it, so the art cannot drift away from the page it
 * sits next to.
 *
 * The palette is a field under a sky, which is what the plugin's own icon is:
 * green for what grows, amber for the sun and the gold frame on the paid
 * icon, brown for tilled soil. Custom Enchantments 3 runs lime and purple,
 * Kumandra's Economy emerald and amber, Epic Mobs Rework ember and amber.
 * Farm Tales runs green and amber.
 *
 *   node scripts/generate-farm-tales-art.mjs
 *
 * Writes into src/assets/farm_tales/features/, plus banner.svg one level up
 * and og-farm-tales.svg into scripts/, which generate-og.sh rasterises.
 *
 * Nothing drawn here is allowed to date: no release date, no Minecraft
 * version ceiling, and no content count that moves every release. Six
 * grades, five animals, three plant forms, twelve nutrition tags, three
 * fertilizer tiers, three ferment tiers and three dry-aging tiers are design
 * constants and safe as exact figures. Catalog counts are floors ("100+").
 * The Lite numbers (15 vegetables, 15 fruits, two animals, two grades) are
 * written exactly because on Lite they are the deal.
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
  green: "#4ade80",
  amber: "#fbbf24",
  rose: "#fb7185",
  sky: "#38bdf8",
  purple: "#c084fc",
  lime: "#a3e635",
  emerald: "#34d399",
  soil: "#8b5a2b",
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

const slot = (x, y, s = 26, fill = "rgba(0,0,0,0.45)", stroke = C.line) =>
  rect(x, y, s, s, fill, 1, stroke, 0.7, 1);

/** A crop stage: soil, a stalk, and a head that fills in with growth. */
const sprout = (x, y, stage, accent = C.green) => {
  const h = 6 + stage * 7;
  return (
    rect(x - 8, y + 2, 20, 5, C.soil, 0.85) +
    rect(x + 1, y - h + 2, 2, h, C.green, 0.8) +
    (stage >= 2
      ? rect(x - 4, y - h + 6, 4, 3, C.green, 0.7) +
        rect(x + 4, y - h + 10, 4, 3, C.green, 0.7)
      : "") +
    (stage >= 4 ? rect(x - 2, y - h - 4, 8, 8, accent, 0.95) : "")
  );
};

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

const ft = {};

/* ------------------------------------------------------------- the crops */

ft["crops"] = frame({
  title: "CROPS THAT REMEMBER",
  path: "catalog/vegetables.yml",
  accent: C.green,
  footer: "THE GRADE COMES FROM HOW THE PLANT WAS ACTUALLY KEPT",
  body: [
    panel(18, 52, 292, 130, "ONE PLANT, START TO FINISH", C.green),
    sprout(50, 158, 0),
    sprout(100, 158, 1),
    sprout(150, 158, 2),
    sprout(200, 158, 3),
    sprout(250, 158, 4, C.rose),
    text(34, 176, "seed", { size: 8, fill: C.muted }),
    text(236, 176, "ripe", { size: 8, fill: C.rose }),
    text(34, 94, "GROWS ON REAL TIME, NOT TICKS", { size: 8, fill: C.text }),
    text(34, 108, "A LAGGING SERVER GROWS AT THE SPEED YOU SET", {
      size: 7.6,
      fill: C.muted,
    }),

    panel(18, 194, 292, 72, "WHAT IT WATCHED", C.amber),
    row(34, 222, 128, "dry for", "12%", C.sky, 18),
    row(170, 222, 124, "overfed", "0%", C.amber, 18),
    row(34, 243, 260, "picked", "on time", C.green, 18),

    panel(330, 52, 292, 118, "SIX GRADES", C.amber),
    text(346, 84, "SPOILED", { size: 8.4, fill: C.muted }),
    meter(420, 77, 186, 0.1, C.muted),
    text(346, 104, "COMMON", { size: 8.4, fill: C.text }),
    meter(420, 97, 186, 0.4, C.green),
    text(346, 124, "PRIME", { size: 8.4, fill: C.sky }),
    meter(420, 117, 186, 0.75, C.sky),
    text(346, 144, "EXQUISITE", { size: 8.4, fill: C.amber }),
    meter(420, 137, 186, 1, C.amber),
    text(346, 160, "THE GRADE IS ON THE ITEM AND CHANGES WHAT IT PAYS", {
      size: 7.4,
      fill: C.muted,
    }),

    panel(330, 182, 292, 84, "THREE PLANT FORMS", C.sky),
    row(346, 210, 260, "CROP", "on farmland", C.green, 18),
    row(346, 230, 260, "POTTED", "a bush in a pot", C.lime, 18),
    row(346, 250, 260, "TREE", "built for you, pick a leaf", C.sky, 18),

    text(20, 288, "100+ CROPS AND FRUITS. SEEDS DROP FROM GRASS, FERNS AND LEAVES", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "NO PACK NEEDED", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* --------------------------------------------------------- the nutrition */

ft["nutrition"] = frame({
  title: "EAT WELL OR GET ILL",
  path: "nutrition-tags.yml",
  accent: C.rose,
  footer: "TWELVE TAGS. EATING FILLS THEM, TIME DRAINS THEM",
  body: [
    panel(18, 52, 292, 214, "/ft nutrition <player>", C.rose),
    row(34, 82, 260, "Protein", "0.00  deficient", C.rose, 19),
    row(34, 104, 260, "Carbohydrate", "0.00  deficient", C.rose, 19),
    row(34, 126, 260, "Fat", "8.76  healthy", C.green, 19),
    row(34, 148, 260, "Fiber", "12.76  healthy", C.green, 19),
    row(34, 170, 260, "Iron", "0.00  deficient", C.rose, 19),
    row(34, 192, 260, "Vitamin C", "0.00  deficient", C.rose, 19),
    row(34, 214, 260, "Antioxidant", "16.76  healthy", C.green, 19),
    text(34, 250, "...AND FIVE MORE. ADD YOUR OWN TAG AND IT JUST WORKS", {
      size: 7.6,
      fill: C.muted,
    }),

    panel(330, 52, 292, 104, "THREE STAGES (PREMIUM)", C.amber),
    text(346, 94, "MILD", { size: 8.6, fill: C.amber }),
    meter(400, 87, 206, 0.33, C.amber),
    text(346, 114, "MODERATE", { size: 8.6, fill: C.rose }),
    meter(400, 107, 206, 0.66, C.rose),
    text(346, 134, "SEVERE", { size: 8.6, fill: C.purple }),
    meter(400, 127, 206, 1, C.purple),
    text(346, 150, "A REAL VANILLA EFFECT, CLEARED BY A PROPER MEAL", {
      size: 7.4,
      fill: C.muted,
    }),

    panel(330, 168, 292, 98, "DISHES", C.green),
    slot(346, 196), slot(376, 196), slot(406, 196),
    rect(352, 202, 14, 14, C.purple, 0.8),
    rect(382, 202, 14, 14, C.rose, 0.8),
    rect(412, 202, 14, 14, C.soil, 0.9),
    text(446, 214, "= Dish of Eggplant, Beef", { size: 8.4, fill: C.text }),
    text(346, 240, "GRADED BY ITS WORST INGREDIENT", { size: 8, fill: C.green }),
    text(346, 254, "COOKING KEEPS THE GRADE. IT DOES NOT DESTROY IT", {
      size: 7.4,
      fill: C.muted,
    }),

    text(20, 288, "BREAD STILL COUNTS. VANILLA FOOD PAYS A PROFILE YOU SET", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "ONE ILLNESS AT A TIME", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------------------ the animals */

ft["animals"] = frame({
  title: "ANIMALS WORTH KEEPING",
  path: "config.yml / meat:",
  accent: C.amber,
  footer: "TRACKED FROM THE FIRST FEEDING. FEED WELL AND ON TIME",
  body: [
    panel(18, 52, 292, 130, "FIVE ANIMALS", C.amber),
    row(34, 82, 260, "Cow", "Beef", C.amber, 18),
    row(34, 102, 260, "Pig", "Porkchop", C.rose, 18),
    row(34, 122, 260, "Sheep", "Mutton", C.text, 18),
    row(34, 142, 260, "Chicken", "Chicken", C.lime, 18),
    row(34, 162, 260, "Rabbit", "Rabbit", C.sky, 18),

    panel(18, 194, 292, 72, "WHAT DECIDES THE GRADE", C.green),
    text(34, 232, "WHAT IT WAS FED", { size: 8.2, fill: C.text }),
    text(34, 246, "HOW OFTEN", { size: 8.2, fill: C.text }),
    text(34, 260, "HOW LONG IT WENT HUNGRY", { size: 8.2, fill: C.text }),
    text(294, 232, "grade up", { size: 8, fill: C.green, anchor: "end" }),
    text(294, 246, "grade up", { size: 8, fill: C.green, anchor: "end" }),
    text(294, 260, "grade down", { size: 8, fill: C.rose, anchor: "end" }),

    panel(330, 52, 292, 118, "SIX GRADES PER ANIMAL", C.rose),
    text(346, 84, "SPOILED BEEF", { size: 8.4, fill: C.muted }),
    pips(470, 77, 1, 6, C.muted),
    text(346, 108, "GOOD BEEF", { size: 8.4, fill: C.green }),
    pips(470, 101, 4, 6, C.green),
    text(346, 132, "EXQUISITE BEEF", { size: 8.4, fill: C.amber }),
    pips(470, 125, 6, 6, C.amber),
    text(346, 156, "30 MEAT ENTRIES, EACH WITH ITS OWN SPRITE", {
      size: 7.4,
      fill: C.muted,
    }),

    panel(330, 182, 292, 84, "THE FEED", C.sky),
    text(346, 220, "Animal Feed", { size: 9, fill: C.sky }),
    text(346, 233, "CRAFTED FROM WHAT YOU GREW", { size: 7.8, fill: C.text }),
    text(346, 249, "Herder's Shears", { size: 9, fill: C.sky }),
    text(346, 262, "MAKES FEEDING COUNT FOR MORE", { size: 7.8, fill: C.text }),

    text(20, 288, "FIRE ASPECT DROPS IT COOKED, AT THE SAME GRADE", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "WOOL, EGGS, LEATHER UNTOUCHED", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------------------ the storage */

ft["storage"] = frame({
  title: "STORE IT, AGE IT, FERMENT IT",
  path: "config.yml / storage:, fermentation:",
  accent: C.purple,
  footer: "TIME AMPLIFIES THE GRADE. IT NEVER LAUNDERS IT",
  body: [
    panel(18, 52, 292, 114, "MEAT IN A CHEST", C.rose),
    slot(34, 80, 24), rect(40, 86, 12, 12, C.rose, 0.8),
    text(66, 96, "alone: it rots on a clock you set", { size: 8.2, fill: C.text }),
    slot(34, 108, 24), rect(40, 114, 12, 12, C.sky, 0.8),
    text(66, 124, "with a snowball: rot held off", { size: 8.2, fill: C.text }),
    slot(34, 136, 24, "rgba(0,0,0,0.45)", C.sky), rect(40, 142, 12, 12, C.sky, 1),
    text(66, 152, "with blue ice: it dry-ages instead", { size: 8.2, fill: C.sky }),

    panel(18, 178, 292, 88, "THREE DRY-AGING TIERS", C.amber),
    text(34, 214, "5 DAYS", { size: 8.4, fill: C.text }),
    meter(100, 207, 194, 0.25, C.amber),
    text(34, 231, "10 DAYS", { size: 8.4, fill: C.text }),
    meter(100, 224, 194, 0.5, C.amber),
    text(34, 248, "20 DAYS", { size: 8.4, fill: C.text }),
    meter(100, 241, 194, 1, C.amber),
    text(34, 262, "EACH WORTH MORE THAN THE LAST", { size: 7.4, fill: C.muted }),

    panel(330, 52, 292, 214, "WINE AND BEER", C.purple),
    text(346, 92, "2 fruit + water bottle", { size: 8.6, fill: C.text }),
    text(606, 92, "= must", { size: 8.6, fill: C.purple, anchor: "end" }),
    text(346, 108, "2 brewing grains", { size: 8.6, fill: C.text }),
    text(606, 108, "= wort", { size: 8.6, fill: C.amber, anchor: "end" }),
    rect(346, 116, 260, 1, C.line, 0.8),
    text(346, 132, "LEAVE IT IN A CONTAINER WITH SUGAR", { size: 8, fill: C.muted }),
    row(346, 142, 260, "YOUNG", "then", C.purple, 20),
    row(346, 166, 260, "MATURE", "then", C.purple, 20),
    row(346, 190, 260, "VINTAGE", "best", C.amber, 20),
    text(346, 230, "A WELL-MADE WINE IMPROVES WITH AGE", { size: 8, fill: C.green }),
    text(346, 245, "A BADLY MADE ONE GETS WORSE", { size: 8, fill: C.rose }),
    text(346, 259, "NOTHING IN THE CONFIG DECIDES WHICH", { size: 7.2, fill: C.muted }),

    text(20, 288, "BARLEY, OATS, MALT AND HOPS ARE THE BREWING CROPS", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "PREMIUM", {
      size: 9,
      fill: C.amber,
      anchor: "end",
    }),
  ].join("\n"),
});

/* -------------------------------------------------------------- the codex */

ft["codex"] = frame({
  title: "CODEX, RECIPES, ADMIN MENU",
  path: "/ft codex   /ft recipes   /ft admin",
  accent: C.sky,
  footer: "THE WHOLE CATALOG IN GAME, WITH WHAT YOU HAVE FOUND FILLED IN",
  body: [
    panel(18, 52, 292, 214, "/ft codex", C.sky),
    ...Array.from({ length: 27 }, (_, i) => {
      const x = 34 + (i % 9) * 29;
      const y = 80 + Math.floor(i / 9) * 29;
      const found = i % 4 !== 3;
      const col = [C.rose, C.amber, C.green, C.purple, C.lime, C.sky][i % 6];
      return (
        slot(x, y, 26) +
        rect(x + 7, y + 7, 12, 12, found ? col : C.slate, found ? 0.85 : 0.9)
      );
    }),
    text(34, 186, "GREY = NOT DISCOVERED YET", { size: 7.6, fill: C.muted }),
    text(34, 200, "ON LITE, PREMIUM ENTRIES ARE GREYED AND MARKED", {
      size: 7.6,
      fill: C.muted,
    }),
    text(34, 228, "EVERY PAGE SAYS HOW IT GROWS", { size: 8, fill: C.text }),
    text(34, 242, "AND WHERE ITS SEED COMES FROM", { size: 8, fill: C.text }),
    text(34, 256, "AND WHETHER IT CAN GO IN A DISH", { size: 8, fill: C.text }),

    panel(330, 52, 292, 98, "/ft recipes", C.green),
    row(346, 80, 260, "Water Spray", "how", C.sky, 18),
    row(346, 100, 260, "Cultivator's Hoe", "how", C.green, 18),
    row(346, 120, 260, "Wine, Beer, Dry-aging", "premium", C.amber, 18),

    panel(330, 162, 292, 104, "/ft admin (PREMIUM)", C.amber),
    text(346, 200, "EVERY NUMBER IN config.yml", { size: 8.2, fill: C.text }),
    text(346, 213, "EVERY FIELD ON EVERY ENTRY", { size: 8.2, fill: C.text }),
    text(346, 226, "FROM A CHEST WINDOW", { size: 8.2, fill: C.amber }),
    text(346, 244, "WRITES IT BACK WITH EVERY COMMENT INTACT", {
      size: 7.6,
      fill: C.muted,
    }),
    text(346, 257, "LOGS WHO CHANGED WHAT, AND FROM WHAT", { size: 7.6, fill: C.muted }),

    text(20, 288, "PLACEHOLDERAPI ON BOTH EDITIONS: %farmtales_<name>%", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "TAB COMPLETES", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------------------- the config */

ft["config"] = frame({
  title: "YOURS TO CHANGE",
  path: "plugins/FarmTales/",
  accent: C.lime,
  footer: "NOTHING IS HARDCODED THAT AN OWNER MIGHT WANT TO TUNE",
  body: [
    panel(18, 52, 292, 214, "THE FOLDER", C.lime),
    row(34, 82, 260, "config.yml", "every number", C.lime, 20),
    row(34, 106, 260, "language.yml", "every message", C.sky, 20),
    row(34, 130, 260, "nutrition-tags.yml", "the twelve tags", C.rose, 20),
    row(34, 154, 260, "catalog/vegetables.yml", "54 entries", C.green, 20),
    row(34, 178, 260, "catalog/fruits.yml", "50 entries", C.amber, 20),
    row(34, 202, 260, "catalog/meat.yml", "30 entries", C.rose, 20),
    row(34, 226, 260, "catalog/custom.yml", "yours", C.purple, 20),
    text(34, 258, "NONE OF THESE IS EVER OVERWRITTEN BY AN UPDATE", {
      size: 7.6,
      fill: C.muted,
    }),

    panel(330, 52, 292, 104, "ADD A CROP", C.green),
    text(346, 92, "kind: VEGETABLE", { size: 8.4, fill: C.text }),
    text(346, 105, "display: \"Turnip\"", { size: 8.4, fill: C.text }),
    text(346, 118, "base-item: BEETROOT", { size: 8.4, fill: C.text }),
    text(346, 131, "base-growth-seconds: 600", { size: 8.4, fill: C.text }),
    text(346, 148, "IT GETS A SEED, GRADES, A CODEX PAGE AND A TEXTURE", {
      size: 7.2,
      fill: C.muted,
    }),

    panel(330, 168, 292, 98, "/ft reload", C.amber),
    text(346, 208, "RE-READS EVERY FILE, NO RESTART", { size: 8.2, fill: C.text }),
    text(346, 222, "A BAD FILE LEAVES THE OLD CONFIG RUNNING", {
      size: 7.8,
      fill: C.text,
    }),
    text(346, 235, "AND SAYS WHAT BROKE, AND WHERE", { size: 7.8, fill: C.text }),
    text(346, 256, "RECIPES WANT A RESTART. THE COMMENT SAYS SO", {
      size: 7.2,
      fill: C.muted,
    }),

    text(20, 288, "EVERY KEY HAS A COMMENT ABOVE IT EXPLAINING WHAT IT DOES", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "BOTH EDITIONS", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ---------------------------------------------------------- the changelog */

ft["changelog"] = frame({
  title: "RELEASE HISTORY",
  path: "CHANGELOG.md",
  accent: C.green,
  footer: "WRITTEN FOR SERVER OWNERS: WHAT BEHAVES DIFFERENTLY, NOT WHAT WAS REFACTORED",
  body: [
    panel(18, 52, 604, 214, "", C.green),
    text(34, 84, "1.0.0", { size: 14, weight: 700, fill: C.green, spacing: 2 }),
    text(100, 84, "THE FIRST RELEASE, SO THE ENTRY IS THE WHOLE PLUGIN", {
      size: 8.4,
      fill: C.muted,
    }),
    rect(34, 96, 572, 1, C.line, 0.8),
    row(34, 110, 278, "ADDED", "crops, water, grades", C.green, 20),
    row(34, 134, 278, "ADDED", "nutrition, illness, dishes", C.rose, 20),
    row(34, 158, 278, "ADDED", "animals, meat grades", C.amber, 20),
    row(34, 182, 278, "ADDED", "storage, wine, beer", C.purple, 20),
    row(328, 110, 278, "ADDED", "codex, recipes, admin menu", C.sky, 20),
    row(328, 134, 278, "ADDED", "resource pack, placeholders", C.lime, 20),
    row(328, 158, 278, "CHANGED", "trees, seeds, textures", C.amber, 20),
    row(328, 182, 278, "FIXED", "twelve, from live servers", C.rose, 20),
    text(34, 232, "YOUR config.yml AND language.yml ARE NEVER OVERWRITTEN", {
      size: 8.2,
      fill: C.text,
    }),
    text(34, 248, "THE CONSOLE NAMES ANY KEY YOUR COPY IS MISSING AT LOAD", {
      size: 7.6,
      fill: C.muted,
    }),

    text(20, 288, "ONE JAR, SPIGOT AND PAPER 1.16.5 AND UP", { size: 9, fill: C.text }),
    text(620, 288, "JAVA 11 OR NEWER", { size: 9, fill: C.muted, anchor: "end" }),
  ].join("\n"),
});

/* ------------------------------------------------------ the hero banner */

const BW = 1600;
const BH = 640;

/**
 * A field at dusk: a horizon of crop rows in perspective, tilled soil, and a
 * low sun. Deliberately abstract, because the page puts the logo and the
 * headline over the middle of it.
 */
function banner() {
  // Crop rows receding toward a horizon at y=330.
  const rows = Array.from({ length: 9 }, (_, i) => {
    const y = 336 + i * 34;
    const spacing = 40 + i * 9;
    const count = Math.ceil(BW / spacing) + 2;
    const size = 6 + i * 2;
    return Array.from({ length: count }, (_, j) => {
      const x = j * spacing - (i % 2) * (spacing / 2);
      const col = j % 5 === 0 ? C.amber : C.green;
      return (
        rect(x, y - size, 2, size, C.green, 0.35) +
        rect(x - size / 4, y - size - size / 3, size / 2, size / 3, col, 0.5)
      );
    }).join("");
  }).join("");

  const furrows = Array.from({ length: 9 }, (_, i) =>
    rect(0, 340 + i * 34, BW, 2, C.soil, 0.35),
  ).join("");

  const sun =
    `<circle cx="1180" cy="230" r="70" fill="${C.amber}" fill-opacity="0.16"/>` +
    `<circle cx="1180" cy="230" r="46" fill="${C.amber}" fill-opacity="0.32"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BW} ${BH}" width="${BW}" height="${BH}" role="img" aria-label="Farm Tales">
<defs>
<pattern id="bgrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#94a3b8" stroke-opacity="0.05"/></pattern>
<linearGradient id="bsky" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b1a12"/><stop offset="100%" stop-color="#14261a"/></linearGradient>
<linearGradient id="bsoil" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2a1a0e"/><stop offset="100%" stop-color="#0b0d11"/></linearGradient>
<radialGradient id="bglow" cx="50%" cy="46%" r="58%"><stop offset="0%" stop-color="${C.green}" stop-opacity="0.16"/><stop offset="100%" stop-color="${C.green}" stop-opacity="0"/></radialGradient>
<radialGradient id="bvig" cx="50%" cy="45%" r="70%"><stop offset="42%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.88"/></radialGradient>
<linearGradient id="bfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b0d11" stop-opacity="0"/><stop offset="100%" stop-color="#0b0d11" stop-opacity="1"/></linearGradient>
</defs>
${rect(0, 0, BW, 330, "url(#bsky)")}
${rect(0, 330, BW, 310, "url(#bsoil)")}
${rect(0, 0, BW, BH, "url(#bgrid)")}
${sun}
${rect(0, 328, BW, 3, C.green, 0.35)}
${furrows}
${rows}
${rect(0, 0, BW, BH, "url(#bglow)")}
${rect(0, 380, BW, 260, "url(#bfloor)")}
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
    ["CROPS", C.green],
    ["NUTRITION", C.rose],
    ["ANIMALS", C.amber],
    ["FERMENT", C.purple],
  ];
  const spread = chips.length * 200 - 10;
  const startX = (OW - spread) / 2;
  const badge = "FREE LITE  +  PREMIUM";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${OW} ${OH}" width="${OW}" height="${OH}">
<defs>
<pattern id="ogrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#94a3b8" stroke-opacity="0.06"/></pattern>
<radialGradient id="oglow" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="${C.green}" stop-opacity="0.22"/><stop offset="100%" stop-color="${C.green}" stop-opacity="0"/></radialGradient>
<radialGradient id="ovig" cx="50%" cy="45%" r="72%"><stop offset="40%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.9"/></radialGradient>
</defs>
${rect(0, 0, OW, OH, "#0b0d11")}
${rect(0, 0, OW, OH, "url(#ogrid)")}
${rect(0, 0, OW, OH, "url(#oglow)")}
${rect(0, 0, OW, OH, "url(#ovig)")}
${corners(48, 48, OW - 96, OH - 96, C.green, 40, 3, 0.5)}
${rect(OW / 2 - (badge.length * 14 + 48) / 2, 120, badge.length * 14 + 48, 44, "rgba(0,0,0,0.6)", 1, C.amber, 0.7, 2)}
${text(OW / 2, 150, badge, { size: 20, fill: C.amber, anchor: "middle", spacing: 2 })}
${text(OW / 2, 262, "FARM TALES", { size: 64, weight: 700, fill: C.green, anchor: "middle", spacing: 4 })}
${text(OW / 2, 318, "Grow it well, and it is worth more.", { size: 26, fill: C.text, anchor: "middle" })}
${chips.map((c, i) => chip(startX + i * 200, 396, c[0], c[1])).join("\n")}
${text(OW / 2, 516, "SPIGOT AND PAPER 1.16.5 AND UP  -  NOTHING ELSE REQUIRED", { size: 21, fill: C.muted, anchor: "middle", spacing: 2 })}
${text(OW / 2, 562, "JHPROJECTS  -  JAYMAR921", { size: 19, fill: C.amber, anchor: "middle", spacing: 3 })}
${rect(0, 0, OW, 6, C.green, 0.6)}
${rect(0, OH - 6, OW, 6, C.amber, 0.5)}
</svg>
`;
}

/* ---------------------------------------------------------------- write */

const OUT = resolve(ROOT, "src/assets/farm_tales/features");
mkdirSync(OUT, { recursive: true });

for (const [name, svg] of Object.entries(ft)) {
  writeFileSync(resolve(OUT, `${name}.svg`), svg, "utf8");
  console.log(`wrote src/assets/farm_tales/features/${name}.svg`);
}

writeFileSync(resolve(OUT, "../banner.svg"), banner(), "utf8");
console.log("wrote src/assets/farm_tales/banner.svg");

writeFileSync(resolve(ROOT, "scripts/og-farm-tales.svg"), ogCard(), "utf8");
console.log("wrote scripts/og-farm-tales.svg");
