/**
 * Draws the Kumandra's Economy feature art.
 *
 * The set mirrors the Custom Enchantments 3 feature art: the same dark HUD
 * frame, the same terminal chrome, the same scanline and vignette treatment.
 * The palette is the difference. CE3 runs lime and purple, this one runs
 * emerald and gold, because the plugin is an economy.
 *
 * Nothing here is a screenshot. Every panel is a drawing of what the plugin
 * actually does, with the real numbers out of config.yml, so the art stays
 * honest when someone reads the settings page next to it.
 *
 *   node scripts/generate-kumandra-art.mjs
 *
 * Writes to src/assets/kumandras_economy/features/.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../src/assets/kumandras_economy/features",
);

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
  emerald: "#34d399",
  amber: "#fbbf24",
  teal: "#2dd4bf",
  sky: "#38bdf8",
  rose: "#fb7185",
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

/** The four bracket corners that frame every panel on the CE3 pages. */
const corners = (x, y, w, h, color, len = 8, sw = 1.5, o = 0.75) =>
  [
    `<path d="M${x} ${y + len}V${y}H${x + len}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="${o}"/>`,
    `<path d="M${x + w - len} ${y}H${x + w}V${y + len}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="${o}"/>`,
    `<path d="M${x} ${y + h - len}V${y + h}H${x + len}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="${o}"/>`,
    `<path d="M${x + w - len} ${y + h}H${x + w}V${y + h - len}" fill="none" stroke="${color}" stroke-width="${sw}" stroke-opacity="${o}"/>`,
  ].join("");

/** A bordered panel with a small label sitting inside its top left. */
const panel = (x, y, w, h, label, accent = C.emerald) =>
  rect(x, y, w, h, "rgba(255,255,255,0.02)", 1, C.line, 0.8, 1) +
  corners(x, y, w, h, accent) +
  (label
    ? text(x + 16, y + 22, label, {
        size: 8.5,
        fill: C.dim,
        spacing: 1.6,
      })
    : "");

/** An inventory slot, the 16x16 kind every one of these GUIs is made of. */
const slot = (x, y, s = 26, fill = "rgba(0,0,0,0.45)", stroke = C.line) =>
  rect(x, y, s, s, fill, 1, stroke, 0.7, 1);

/** A labelled row inside a panel: name on the left, value on the right. */
const row = (x, y, w, name, value, accent = C.emerald, h = 22) =>
  rect(x, y, w, h, "rgba(0,0,0,0.45)", 1, accent, 0.35, 1) +
  rect(x, y, 3, h, accent, 0.8) +
  text(x + 10, y + h / 2 + 3.2, name, { size: 9, fill: C.text }) +
  text(x + w - 8, y + h / 2 + 3.2, value, {
    size: 8.6,
    fill: accent,
    anchor: "end",
  });

/** A horizontal meter, used for timers and supply bars. */
const meter = (x, y, w, pct, accent = C.emerald, h = 8) =>
  rect(x, y, w, h, C.slate, 0.9) +
  rect(x, y, Math.round(w * pct), h, accent, 0.85);

/** The window chrome, the grid, the scanlines and the outer frame. */
function frame({ title, path, footer, accent = C.emerald, body }) {
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

/* --------------------------------------------------------------- scenes */

const scenes = {};

/* 1. Balance, the account screen and the money commands. */
scenes["economy"] = frame({
  title: "BALANCE & CURRENCY",
  path: "InventoryGUI/BalanceGUI",
  accent: C.emerald,
  footer: "EVERY ACCOUNT IS CREATED ON FIRST JOIN - NOTHING TO SET UP",
  body: [
    panel(18, 52, 300, 214, "PLAYER ACCOUNT"),
    // the head slot and the balance readout
    slot(34, 86, 44),
    rect(38, 90, 36, 36, C.amber, 0.25),
    text(90, 100, "JayMar921", { size: 11, fill: C.text }),
    text(90, 118, "ACCOUNT ACTIVE", {
      size: 8,
      fill: C.emerald,
      spacing: 1.4,
    }),
    text(302, 106, "Kd 4,820.75", {
      size: 15,
      weight: 700,
      fill: C.amber,
      anchor: "end",
    }),
    rect(34, 140, 268, 1, C.line, 0.4),
    row(34, 154, 268, "DEPOSIT", "+ Kd 250.00", C.emerald),
    row(34, 182, 268, "PAY  ->  Sekai47", "- Kd 120.00", C.sky),
    row(34, 210, 268, "DEDUCT (ADMIN)", "- Kd 40.00", C.rose),
    text(34, 250, "BALANCES PERSIST ACROSS RESTARTS AND WORLDS", {
      size: 8,
      fill: C.dim,
    }),

    panel(330, 52, 292, 96, "CURRENCY"),
    row(346, 84, 260, "Currency_Prefix", "Kd", C.amber),
    row(346, 110, 260, "Currency (rate)", "0.12", C.amber),
    text(346, 143, "1 COIN OF YOUR MAIN ECONOMY = 0.12 Kd", {
      size: 8,
      fill: C.dim,
    }),

    panel(330, 160, 292, 106, "ADMIN CONTROLS"),
    text(346, 200, "/kumandra economy <player> deposit <amt>", {
      size: 8.6,
      fill: C.text,
    }),
    text(346, 220, "/kumandra economy <player> deduct  <amt>", {
      size: 8.6,
      fill: C.text,
    }),
    text(346, 240, "/kumandra economy <player> reset", {
      size: 8.6,
      fill: C.text,
    }),
    text(346, 260, "TAB COMPLETION ON EVERY ARGUMENT", {
      size: 8,
      fill: C.emerald,
      spacing: 1.2,
    }),
    text(20, 288, "/kumandra balance", { size: 9.5, fill: C.text }),
    text(180, 288, "OPENS THE ACCOUNT AND EXCHANGE SCREEN", {
      size: 9,
      fill: C.muted,
    }),
  ].join("\n"),
});

/* 2. Vault, and the primary / secondary economy switch. */
const bridgeBox = (x, y, w, h, label, sub, accent) =>
  rect(x, y, w, h, "rgba(0,0,0,0.5)", 1, accent, 0.5, 1) +
  corners(x, y, w, h, accent, 7, 1.4) +
  text(x + w / 2, y + h / 2 - 2, label, {
    size: 10,
    fill: accent,
    anchor: "middle",
    weight: 700,
  }) +
  text(x + w / 2, y + h / 2 + 14, sub, {
    size: 8,
    fill: C.muted,
    anchor: "middle",
  });

scenes["exchange"] = frame({
  title: "VAULT EXCHANGE",
  path: "Vault/VaultSupport",
  accent: C.teal,
  footer: "BESIDE THE ECONOMY YOU HAVE, INSTEAD OF IT, OR WITH NO VAULT AT ALL",
  body: [
    panel(18, 52, 604, 128, "HOW THE MONEY MOVES", C.teal),
    bridgeBox(40, 84, 150, 62, "KUMANDRA", "Kd - this plugin", C.emerald),
    `<path d="M198 115h52" stroke="${C.teal}" stroke-width="1.5" stroke-opacity="0.7"/>`,
    `<path d="M250 115l-9-5v10z" fill="${C.teal}" fill-opacity="0.85"/>`,
    `<path d="M198 115h52" stroke="${C.teal}" stroke-width="1.5" stroke-opacity="0.7"/>`,
    bridgeBox(258, 84, 124, 62, "VAULT", "optional - rate 0.12", C.teal),
    `<path d="M390 115h52" stroke="${C.teal}" stroke-width="1.5" stroke-opacity="0.7"/>`,
    `<path d="M442 115l-9-5v10z" fill="${C.teal}" fill-opacity="0.85"/>`,
    bridgeBox(450, 84, 152, 62, "YOUR ECONOMY", "Essentials, etc", C.amber),

    panel(18, 194, 194, 72, "SEPARATE_ECONOMY: TRUE", C.emerald),
    text(32, 230, "SECONDARY. Kd sits beside", { size: 8.2, fill: C.text }),
    text(32, 244, "your main currency and", { size: 8.2, fill: C.text }),
    text(32, 258, "exchanges into it.", { size: 8.2, fill: C.text }),

    panel(222, 194, 194, 72, "SEPARATE_ECONOMY: FALSE", C.amber),
    text(236, 230, "PRIMARY. Kd becomes the", { size: 8.2, fill: C.text }),
    text(236, 244, "server currency. Vault-aware", { size: 8.2, fill: C.text }),
    text(236, 258, "plugins see it as the money.", { size: 8.2, fill: C.text }),

    panel(426, 194, 196, 72, "NO VAULT AT ALL  (2.0)", C.rose),
    text(440, 230, "STANDALONE. Everything", { size: 8.2, fill: C.text }),
    text(440, 244, "works except exchange,", { size: 8.2, fill: C.text }),
    text(440, 258, "which needs a 2nd economy.", { size: 8.2, fill: C.text }),

    text(20, 288, "VAULT IS OPTIONAL IN 2.0 - NOTHING ELSE IS REQUIRED", {
      size: 9,
      fill: C.muted,
    }),
    text(620, 288, "api.primaryEconomy()", {
      size: 9,
      fill: C.teal,
      anchor: "end",
    }),
  ].join("\n"),
});

/* 3. Player to player trading. */
scenes["trading"] = frame({
  title: "LIVE TRADING",
  path: "InventoryGUI/TradingGUI",
  accent: C.amber,
  footer: "NO DROP-AND-PRAY - THE WINDOW HOLDS BOTH SIDES UNTIL BOTH CONFIRM",
  body: [
    panel(18, 52, 292, 158, "THEIR OFFER", C.amber),
    ...[0, 1, 2, 3, 4].map((i) => slot(36 + i * 32, 84)),
    ...[0, 1, 2, 3, 4].map((i) => slot(36 + i * 32, 118)),
    rect(40, 88, 18, 18, C.emerald, 0.5),
    rect(72, 88, 18, 18, C.sky, 0.45),
    rect(104, 88, 18, 18, C.amber, 0.5),
    rect(40, 122, 18, 18, C.rose, 0.4),
    row(36, 164, 256, "ASKING PRICE", "Kd 1,250.00", C.amber),

    panel(330, 52, 292, 158, "YOUR SIDE", C.emerald),
    row(348, 84, 256, "YOUR BALANCE", "Kd 4,820.75", C.emerald),
    text(348, 122, "ADJUST THE PRICE IN STEPS OF", {
      size: 8.5,
      fill: C.dim,
      spacing: 1.2,
    }),
    ...["- 10", "- 1", "+ 1", "+ 10"].map((label, i) =>
      [
        rect(
          348 + i * 66,
          132,
          58,
          26,
          "rgba(0,0,0,0.5)",
          1,
          i < 2 ? C.rose : C.emerald,
          0.5,
          1,
        ),
        text(348 + i * 66 + 29, 149, label, {
          size: 9.5,
          anchor: "middle",
          fill: i < 2 ? C.rose : C.emerald,
        }),
      ].join(""),
    ),
    rect(348, 170, 256, 26, "rgba(0,0,0,0.5)", 1, C.emerald, 0.6, 1),
    text(476, 187, "CONFIRM TRADE", {
      size: 9.5,
      anchor: "middle",
      fill: C.emerald,
      spacing: 1.4,
    }),

    panel(18, 224, 604, 42, "", C.rose),
    text(34, 240, "REQUEST EXPIRES", { size: 8.5, fill: C.dim, spacing: 1.4 }),
    meter(140, 233, 380, 0.45, C.rose, 8),
    text(606, 241, "20s", { size: 10, fill: C.rose, anchor: "end" }),

    text(20, 288, "/kumandra trade <player>", { size: 9.5, fill: C.text }),
    text(240, 288, "/ktrade accept  |  /ktrade deny", {
      size: 9,
      fill: C.muted,
    }),
  ].join("\n"),
});

/* 4. The four delivery tiers. */
const DELIVERY = [
  ["CHEAP", "180s", "Kd 25", C.muted, 1],
  ["REGULAR", "130s", "Kd 40", C.sky, 0.72],
  ["FAST", "70s", "Kd 75", C.amber, 0.39],
  ["PRIORITY", "30s", "Kd 100", C.emerald, 0.17],
];

scenes["delivery"] = frame({
  title: "DELIVERY CONTRACTS",
  path: "economy/DeliveryHandler",
  accent: C.sky,
  footer: "A LIVING COURIER FLIES THE PARCEL OVER - PAY MORE, WAIT LESS",
  body: [
    panel(18, 52, 340, 214, "PICK A SPEED", C.sky),
    ...DELIVERY.flatMap(([name, time, price, accent, pct], i) => {
      const y = 84 + i * 44;
      return [
        row(34, y, 308, name, price, accent, 22),
        text(34, y + 38, time, { size: 8.5, fill: C.dim }),
        meter(80, y + 30, 262, pct, accent, 6),
      ];
    }),

    panel(370, 52, 252, 214, "IN FLIGHT", C.emerald),
    // the courier's arc from sender to recipient
    `<path d="M396 232C396 150 470 108 596 108" fill="none" stroke="${C.emerald}" stroke-width="1.5" stroke-opacity="0.55" stroke-dasharray="5 5"/>`,
    rect(388, 226, 16, 16, C.amber, 0.7),
    text(396, 258, "SENDER", { size: 8, fill: C.dim, anchor: "middle" }),
    rect(588, 100, 16, 16, C.emerald, 0.75),
    text(596, 92, "RECIPIENT", { size: 8, fill: C.dim, anchor: "middle" }),
    rect(474, 128, 14, 14, C.sky, 0.8),
    // Beside the parcel rather than above it. The arc passes within a couple
    // of pixels of the top edge of that box, so a label centred above it sits
    // on the dashes.
    text(494, 139, "PARCEL", { size: 7.5, fill: C.sky }),
    // The arc leaves the sender almost vertically and is still around x=400 at
    // this height, so the caption starts clear of it rather than underneath.
    text(430, 200, "GOES UP, THEN ACROSS,", { size: 8.4, fill: C.text }),
    text(430, 214, "THEN DOWN TO THEM.", { size: 8.4, fill: C.text }),

    text(20, 288, "/kumandra deliver <player>", { size: 9.5, fill: C.text }),
    text(260, 288, "TIMERS AND PRICES ARE ALL CONFIG KEYS", {
      size: 9,
      fill: C.muted,
    }),
  ].join("\n"),
});

/* 5. The seven jobs and what each one pays. */
const JOBS = [
  ["FARMER", "harvest, breed", "0.25 / 0.53"],
  ["LUMBERJACK", "chop, replant", "0.22 / 0.34"],
  ["MINER", "blocks, ores", "0.21 / 0.32"],
  ["HUNTER", "hostile mobs", "0.32"],
  ["GUARDIAN", "defend villagers", "0.35"],
  ["BUILDER", "place blocks", "0.15"],
  ["FISHERMAN", "catch, treasure", "0.23 / 0.35"],
];

scenes["jobs"] = frame({
  title: "SEVEN JOBS",
  path: "InventoryGUI/JobsGUI",
  accent: C.emerald,
  footer: "PLAYERS EARN BY PLAYING - NO GRIND COMMAND, NO AFK FARM",
  body: [
    panel(18, 52, 604, 214, "JOIN FROM THE JOBS SCREEN"),
    ...JOBS.flatMap(([name, how, pay], i) => {
      const col = i % 2;
      const line = Math.floor(i / 2);
      const x = 34 + col * 296;
      const y = 82 + line * 44;
      return [
        slot(x, y, 30, "rgba(0,0,0,0.45)", C.line),
        rect(x + 7, y + 7, 16, 16, C.emerald, 0.45),
        text(x + 40, y + 13, name, { size: 9.5, fill: C.text, spacing: 1 }),
        text(x + 40, y + 26, how, { size: 8, fill: C.dim }),
        text(x + 262, y + 20, pay, {
          size: 8.6,
          fill: C.amber,
          anchor: "end",
        }),
      ];
    }),
    text(330, 256, "Kd PER ACTION - ORE RATES AND VillagerRadius FIXED IN 2.0", {
      size: 8,
      fill: C.dim,
      anchor: "middle",
    }),
    text(20, 288, "/kumandra jobs", { size: 9.5, fill: C.text }),
    text(150, 288, "HOLD 2 AT A TIME BY DEFAULT - Jobs: 2", {
      size: 9,
      fill: C.muted,
    }),
  ].join("\n"),
});

/* 6. A quest, start to reward. */
scenes["quests"] = frame({
  title: "QUESTS",
  path: "Data/Quest.yml",
  accent: C.amber,
  footer: "VILLAGERS AND ANIMALS HAND THEM OUT - REWARDS ARE YOURS TO SET",
  body: [
    panel(18, 52, 344, 214, "ACTIVE QUEST", C.amber),
    rect(34, 84, 44, 44, "rgba(0,0,0,0.45)", 1, C.amber, 0.5, 1),
    rect(42, 92, 28, 28, C.amber, 0.4),
    text(92, 100, "Kill Zombie", { size: 12, fill: C.text }),
    text(92, 118, "VILLAGER QUEST", {
      size: 8,
      fill: C.amber,
      spacing: 1.4,
    }),
    text(34, 148, '"Kill 5 zombies for a diamond sword"', {
      size: 8.8,
      fill: C.muted,
    }),
    row(34, 160, 312, "TASK", "KILL_ZOMBIE", C.sky),
    row(34, 188, 312, "PROGRESS", "3 / 5", C.emerald),
    text(34, 237, "TIME LEFT", { size: 8.5, fill: C.dim, spacing: 1.4 }),
    // The label runs to about x=92 once the letter spacing is counted, so the
    // bar starts at 100 and gives up the width instead of butting into it.
    meter(100, 230, 186, 0.62, C.amber, 8),
    text(346, 238, "320s", { size: 9, fill: C.amber, anchor: "end" }),

    panel(374, 52, 248, 122, "REWARD TYPES", C.emerald),
    row(390, 86, 216, "ITEM", "any ItemStack", C.emerald),
    row(390, 112, 216, "MONEY", "Kd payout", C.amber),
    row(390, 138, 216, "EXP", "levels", C.sky),

    panel(374, 188, 248, 78, "HOW OFTEN", C.teal),
    text(390, 226, "QuestChance   0.15", { size: 9, fill: C.text }),
    text(390, 242, "QuestInterval 5 min", { size: 9, fill: C.text }),
    text(390, 258, "AllowQuest    true", { size: 9, fill: C.emerald }),

    text(20, 288, "TASKS: KILL / FEED / MINE / CRAFT", {
      size: 9,
      fill: C.text,
    }),
    text(340, 288, "WRITE YOUR OWN IN Data/Quest.yml", {
      size: 9,
      fill: C.muted,
    }),
  ].join("\n"),
});

/* 7. Building a public shop. */
scenes["shops"] = frame({
  title: "PUBLIC SHOPS",
  path: "economy/ShopHandler",
  accent: C.teal,
  footer: "BUILD THE CHEST YOU WANT, CLONE IT, PRICE IT, WALK AWAY",
  body: [
    panel(18, 52, 344, 214, "SHOP WINDOW", C.teal),
    ...Array.from({ length: 18 }, (_, i) => {
      const x = 34 + (i % 6) * 52;
      const y = 84 + Math.floor(i / 6) * 52;
      const filled = [0, 1, 2, 6, 7, 12, 13, 14].includes(i);
      return (
        slot(x, y, 44) +
        (filled
          ? rect(
              x + 10,
              y + 8,
              24,
              24,
              [C.emerald, C.amber, C.sky, C.rose][i % 4],
              0.5,
            ) +
            text(x + 22, y + 40, `Kd ${(i + 1) * 12}`, {
              size: 7,
              fill: C.amber,
              anchor: "middle",
            })
          : "")
      );
    }),
    text(34, 256, "CLICK TO BUY - PAID STRAIGHT OUT OF THE BALANCE", {
      size: 8,
      fill: C.dim,
    }),

    panel(374, 52, 248, 214, "SETUP", C.emerald),
    ...[
      ["1", "shops create <name>", "spawns the keeper"],
      ["2", "build a chest layout", "your prototype"],
      ["3", "modify ShopUI clone", "copies it in"],
      ["4", "modify ShopUI price", "set it in chat"],
      ["5", "shops delete <name>", "removes it all"],
    ].flatMap(([n, cmd, note], i) => {
      const y = 86 + i * 36;
      return [
        rect(390, y, 20, 20, "rgba(0,0,0,0.5)", 1, C.emerald, 0.5, 1),
        text(400, y + 14, n, { size: 9, fill: C.emerald, anchor: "middle" }),
        text(418, y + 10, cmd, { size: 8.4, fill: C.text }),
        text(418, y + 23, note, { size: 7.6, fill: C.dim }),
      ];
    }),

    text(20, 288, "/kumandra shops ...", { size: 9.5, fill: C.text }),
    text(200, 288, "INVENTORIES AND PRICES SURVIVE A RESTART", {
      size: 9,
      fill: C.muted,
    }),
  ].join("\n"),
});

/* 8. Where the money is stored. */
scenes["database"] = frame({
  title: "MYSQL OR YAML",
  path: "Database.yml",
  accent: C.sky,
  footer: "POINT IT AT A DATABASE, OR DO NOTHING AND KEEP THE FLAT FILES",
  body: [
    panel(18, 52, 292, 214, "player_data", C.sky),
    rect(34, 84, 260, 22, "rgba(0,0,0,0.55)", 1, C.sky, 0.4, 1),
    text(44, 99, "uuid", { size: 8.6, fill: C.sky }),
    text(150, 99, "balance", { size: 8.6, fill: C.sky }),
    text(230, 99, "jobs", { size: 8.6, fill: C.sky }),
    ...[
      ["a41f-...", "4,820.75", "2"],
      ["9c02-...", "1,204.00", "1"],
      ["77be-...", "18,900.5", "2"],
      ["e5da-...", "62.25", "0"],
    ].flatMap(([uuid, bal, jobs], i) => {
      const y = 112 + i * 26;
      return [
        rect(34, y, 260, 22, "rgba(255,255,255,0.02)"),
        text(44, y + 15, uuid, { size: 8.4, fill: C.text }),
        text(150, y + 15, bal, { size: 8.4, fill: C.amber }),
        text(230, y + 15, jobs, { size: 8.4, fill: C.emerald }),
      ];
    }),
    text(34, 238, "CREATED FOR YOU ON FIRST CONNECT", {
      size: 8,
      fill: C.dim,
    }),
    text(34, 256, "kumandra_database", { size: 8.6, fill: C.sky }),

    panel(330, 52, 292, 122, "CONNECTION", C.emerald),
    row(346, 84, 260, "EnableDatabase", "false", C.rose),
    row(346, 110, 260, "URL", "jdbc:mysql://...", C.sky),
    row(346, 136, 260, "Database", "kumandra_database", C.sky),
    text(346, 167, "CONNECTOR/J 26.7.0 - BUNDLED & RELOCATED", { size: 7.6, fill: C.dim }),

    // Four lines need 88 of height, not 80, or the last one lands on the
    // bottom border. The panel above ends at 174, so there is room to start
    // this one higher rather than shrink the copy.
    panel(330, 178, 292, 88, "IF A SAVE FAILS", C.amber),
    text(346, 220, "IT SAYS SO, AND FALLS BACK TO", {
      size: 8.4,
      fill: C.text,
    }),
    text(346, 233, "playerData.yml. IN 1.x A FAILED", { size: 8.4, fill: C.text }),
    text(346, 246, "SAVE COULD REPORT SUCCESS.", { size: 8.4, fill: C.text }),
    text(346, 259, "NOBODY LOSES THEIR MONEY.", {
      size: 8,
      fill: C.emerald,
    }),

    text(20, 288, "OFF BY DEFAULT", { size: 9.5, fill: C.text }),
    text(160, 288, "FLAT FILES WORK FINE FOR A SINGLE SERVER", {
      size: 9,
      fill: C.muted,
    }),
  ].join("\n"),
});

/*
 * 9. The developer API.
 *
 * The panel is 214 tall and the first baseline sits at 84, so at 14px leading
 * there is room for thirteen lines before the text would cross the bottom
 * border. Adding a line here means taking one out.
 */
const CODE_LEADING = 14;
const CODE = [
  ["KumandrasEconomy plugin = (KumandrasEconomy)", C.text],
  ["    Bukkit.getPluginManager()", C.text],
  ["          .getPlugin(\"KumandrasEconomy\");", C.text],
  ["", C.text],
  ["KumandrasAPI api = plugin.getApi();", C.text],
  ["api.RegisterPlugin(\"YourPlugin\");", C.emerald],
  ["", C.text],
  ["double bal = api.getBalance(player);", C.amber],
  ["api.deposit(player, 100.0);", C.amber],
  ["api.withdraw(player, 25.0);", C.amber],
  ["", C.text],
  ["// new in 2.0, works offline", C.dim],
  ["api.transfer(from, to, 50.0);", C.sky],
];

scenes["api"] = frame({
  title: "DEVELOPER API",
  path: "KumandrasAPI.java",
  accent: C.emerald,
  footer: "FIVE LINES TO HOOK IN - 1.x INTEGRATIONS LINK AGAINST 2.0 UNCHANGED",
  body: [
    panel(18, 52, 404, 214, "KumandrasAPI"),
    ...CODE.map((line, i) =>
      text(34, 84 + i * CODE_LEADING, line[0], { size: 8.8, fill: line[1] }),
    ),

    panel(434, 52, 188, 214, "METHODS", C.amber),
    ...[
      ["getBalance", false],
      ["deposit / withdraw", false],
      ["setBalance", true],
      ["transfer", true],
      ["hasAccount", true],
      ["createAccount", true],
      ["getJobs / hasJob", true],
      ["primaryEconomy", false],
      ["getServerVersion", true],
    ].flatMap(([name, isNew], i) => {
      // Nine rows, 17 tall, inside a panel that ends at y=266. At 19 apart the
      // last one closes at 251, which keeps it clear of the border.
      const y = 82 + i * 19;
      const accent = isNew ? C.sky : C.amber;
      return [
        rect(450, y, 156, 17, "rgba(0,0,0,0.45)", 1, accent, 0.3, 1),
        rect(450, y, 3, 17, accent, 0.75),
        text(458, y + 12, name, { size: 7.6, fill: C.text }),
        isNew
          ? text(600, y + 12, "2.0", {
              size: 6.6,
              fill: C.sky,
              anchor: "end",
            })
          : "",
      ];
    }),

    text(20, 288, "EVERY 1.x METHOD KEEPS ITS SIGNATURE", {
      size: 9.5,
      fill: C.text,
    }),
    // The plugin repository is closed, so there is no doc file to point at.
    // The guide is the Developer API panel on the site.
    text(340, 288, "THE FULL GUIDE IS ON THIS PAGE", {
      size: 9,
      fill: C.muted,
    }),
  ].join("\n"),
});

/* 10. What 2.0 changed, the before and after. */
const FIXES = [
  ["VERSION CHECK", "string match, 1.16/17/18", "parsed and compared"],
  ["QUESTS ON 1.19+", "silently off", "on"],
  ["VAULT", "hard dependency", "optional"],
  ["format()", "returned null", "formatted string"],
  ["ORE INCOME", "paid block rate", "pays ore rate"],
  ["VillagerRadius", "never read", "read"],
  ["JOB TIMERS", "running 7x over", "running once"],
  ["FAILED DB SAVE", "reported success", "reports failure"],
];

scenes["whatsnew"] = frame({
  title: "WHAT 2.0 CHANGED",
  path: "release/2.0",
  accent: C.rose,
  footer: "REPLACE THE JAR AND RESTART - YOUR CONFIG IS UPGRADED IN PLACE",
  body: [
    panel(18, 52, 604, 46, "", C.emerald),
    text(34, 72, "ONE JAR", { size: 9, fill: C.dim, spacing: 1.6 }),
    text(34, 88, "1.16  ->  26.2", { size: 12, weight: 700, fill: C.emerald }),
    text(200, 80, "NO NMS  -  NO PACKETS  -  JAVA 8 AND UP", {
      size: 8.4,
      fill: C.muted,
    }),
    rect(470, 62, 136, 26, "rgba(0,0,0,0.5)", 1, C.rose, 0.6, 1),
    text(538, 79, "VAULT OPTIONAL", {
      size: 8.6,
      fill: C.rose,
      anchor: "middle",
      spacing: 1.2,
    }),

    panel(18, 110, 604, 156, "BEFORE  /  AFTER", C.rose),
    text(196, 132, "1.7", { size: 8, fill: C.dim, spacing: 1.4 }),
    text(430, 132, "2.0", { size: 8, fill: C.emerald, spacing: 1.4 }),
    ...FIXES.flatMap(([label, was, now], i) => {
      const y = 142 + i * 15;
      return [
        text(34, y + 10, label, { size: 7.8, fill: C.text }),
        text(196, y + 10, was, { size: 7.6, fill: C.rose, opacity: 0.85 }),
        `<path d="M400 ${y + 6}h18" stroke="${C.dim}" stroke-width="1"/>`,
        `<path d="M418 ${y + 6}l-5-3v6z" fill="${C.dim}"/>`,
        text(430, y + 10, now, { size: 7.6, fill: C.emerald }),
      ];
    }),

    text(20, 288, "PLUS CE3 INTEGRATION, BUNDLED CONNECTOR/J 26.7.0", {
      size: 9,
      fill: C.text,
    }),
    text(620, 288, "AND A LONG FIX LIST", {
      size: 9,
      fill: C.muted,
      anchor: "end",
    }),
  ].join("\n"),
});

/* ------------------------------------------------------ the hero banner */

const BW = 1600;
const BH = 640;

function banner() {
  const candles = Array.from({ length: 26 }, (_, i) => {
    const base = 430 - i * 5.5;
    const wob = Math.sin(i * 1.7) * 22;
    const open = base + wob;
    const close = base + Math.sin(i * 1.7 + 1) * 22;
    const up = close <= open;
    const top = Math.min(open, close);
    const height = Math.max(Math.abs(close - open), 6);
    const color = up ? C.emerald : C.rose;
    const x = 120 + i * 54;
    return (
      rect(x + 11, top - 20, 2, height + 40, color, 0.45) +
      rect(x, top, 24, height, color, up ? 0.4 : 0.55, color, 0.75, 1.5)
    );
  }).join("");

  // A coin, drawn as concentric rings with a Kd struck in the middle.
  const coin =
    `<circle cx="800" cy="250" r="122" fill="none" stroke="${C.amber}" stroke-opacity="0.28" stroke-width="2"/>` +
    `<circle cx="800" cy="250" r="98" fill="rgba(0,0,0,0.55)" stroke="${C.amber}" stroke-opacity="0.7" stroke-width="3"/>` +
    `<circle cx="800" cy="250" r="80" fill="none" stroke="${C.amber}" stroke-opacity="0.35" stroke-width="1.5" stroke-dasharray="6 8"/>` +
    text(800, 272, "Kd", {
      size: 68,
      weight: 700,
      fill: C.amber,
      anchor: "middle",
    });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BW} ${BH}" width="${BW}" height="${BH}" role="img" aria-label="Kumandra's Economy">
<defs>
<pattern id="bgrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#94a3b8" stroke-opacity="0.05"/></pattern>
<radialGradient id="bglow" cx="50%" cy="40%" r="55%"><stop offset="0%" stop-color="${C.emerald}" stop-opacity="0.18"/><stop offset="100%" stop-color="${C.emerald}" stop-opacity="0"/></radialGradient>
<radialGradient id="bvig" cx="50%" cy="45%" r="70%"><stop offset="45%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.85"/></radialGradient>
<linearGradient id="bfloor" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0b0d11" stop-opacity="0"/><stop offset="100%" stop-color="#0b0d11" stop-opacity="1"/></linearGradient>
</defs>
${rect(0, 0, BW, BH, "#08130f")}
${rect(0, 0, BW, BH, "url(#bgrid)")}
${rect(0, 0, BW, BH, "url(#bglow)")}
${candles}
${rect(0, 300, BW, 340, "url(#bfloor)")}
${coin}
${rect(0, 0, BW, BH, "url(#bvig)")}
</svg>
`;
}


/* ------------------------------------------------- the link preview card */

/**
 * The 1200x630 Open Graph card. Rasterised to public/og/kumandras-economy.png
 * by scripts/generate-og.sh, because the crawlers that build link previews do
 * not render SVG.
 */
function ogCard() {
  const OW = 1200;
  const OH = 630;

  const candles = Array.from({ length: 22 }, (_, i) => {
    const base = 470 - i * 7;
    const open = base + Math.sin(i * 1.7) * 26;
    const close = base + Math.sin(i * 1.7 + 1) * 26;
    const up = close <= open;
    const top = Math.min(open, close);
    const height = Math.max(Math.abs(close - open), 8);
    const color = up ? C.emerald : C.rose;
    const x = 60 + i * 52;
    return (
      rect(x + 11, top - 22, 2, height + 44, color, 0.4) +
      rect(x, top, 24, height, color, up ? 0.35 : 0.5, color, 0.7, 1.5)
    );
  }).join("");

  const chip = (x, y, label, accent) =>
    rect(x, y, 170, 46, "rgba(0,0,0,0.55)", 1, accent, 0.55, 2) +
    text(x + 85, y + 30, label, {
      size: 19,
      fill: accent,
      anchor: "middle",
      spacing: 1.5,
    });

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${OW} ${OH}" width="${OW}" height="${OH}">
<defs>
<pattern id="ogrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#94a3b8" stroke-opacity="0.06"/></pattern>
<radialGradient id="oglow" cx="50%" cy="42%" r="60%"><stop offset="0%" stop-color="${C.emerald}" stop-opacity="0.2"/><stop offset="100%" stop-color="${C.emerald}" stop-opacity="0"/></radialGradient>
<radialGradient id="ovig" cx="50%" cy="45%" r="72%"><stop offset="40%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.9"/></radialGradient>
</defs>
${rect(0, 0, OW, OH, "#08130f")}
${rect(0, 0, OW, OH, "url(#ogrid)")}
${rect(0, 0, OW, OH, "url(#oglow)")}
${candles}
${rect(0, 0, OW, OH, "url(#ovig)")}
${rect(0, 0, OW, OH, "#08130f", 0.55)}
<circle cx="600" cy="196" r="66" fill="rgba(0,0,0,0.6)" stroke="${C.amber}" stroke-opacity="0.8" stroke-width="4"/>
<circle cx="600" cy="196" r="52" fill="none" stroke="${C.amber}" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 8"/>
${text(600, 214, "Kd", { size: 46, weight: 700, fill: C.amber, anchor: "middle" })}
${text(600, 320, "KUMANDRA'S ECONOMY", { size: 58, weight: 700, fill: C.emerald, anchor: "middle", spacing: 4 })}
${text(600, 368, "A whole server economy in one free jar", { size: 26, fill: C.text, anchor: "middle" })}
${rect(520, 386, 160, 26, "rgba(0,0,0,0.55)", 1, C.rose, 0.7, 2)}
${text(600, 404, "VERSION 2.0 OUT NOW", { size: 14, fill: C.rose, anchor: "middle", spacing: 1.5 })}
${chip(150, 440, "7 JOBS", C.emerald)}
${chip(340, 440, "TRADING", C.amber)}
${chip(530, 440, "DELIVERY", C.sky)}
${chip(720, 440, "QUESTS", C.amber)}
${chip(910, 440, "SHOPS", C.teal)}
${text(600, 540, "SPIGOT & PAPER 1.16 - 26.2  -  ONE JAR  -  VAULT OPTIONAL", { size: 22, fill: C.muted, anchor: "middle", spacing: 2 })}
${text(600, 580, "FREE, BY JAYMAR921", { size: 20, fill: C.amber, anchor: "middle", spacing: 3 })}
${rect(0, 0, OW, 6, C.emerald, 0.6)}
${rect(0, OH - 6, OW, 6, C.amber, 0.5)}
</svg>
`;
}

/* ---------------------------------------------------------------- write */

mkdirSync(OUT, { recursive: true });

for (const [name, svg] of Object.entries(scenes)) {
  writeFileSync(resolve(OUT, `${name}.svg`), svg, "utf8");
  console.log(`wrote features/${name}.svg`);
}

writeFileSync(resolve(OUT, "../banner.svg"), banner(), "utf8");
console.log("wrote banner.svg");

writeFileSync(resolve(OUT, "../../../../scripts/og-kumandra.svg"), ogCard(), "utf8");
console.log("wrote scripts/og-kumandra.svg (rasterise with scripts/generate-og.sh)");
