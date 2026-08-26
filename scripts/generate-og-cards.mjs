/**
 * Draws the Open Graph cards that are not Kumandra's Economy.
 *
 * generate-kumandra-art.mjs already writes og-kumandra.svg. This one writes
 * the other three, in the same style and at the same 1200x630, so that
 * generate-og.sh can rasterise all of them with one pass of ImageMagick:
 *
 *   og-jhprojects.svg      -> public/og/jhprojects.png
 *   og-custom-warps.svg    -> public/og/custom-warps.png
 *   og-fishing-contest.svg -> public/og/fishing-contest.png
 *
 * The site card is the reason this file exists. index.html was pointing its
 * og:image at the Custom Enchantments 3 card, so a link to the site itself
 * previewed as one of its plugins.
 *
 * Everything is vector on purpose. The cards carry no bitmap, so there is no
 * base64 payload to keep in sync and the whole thing stays legible in the
 * diff.
 *
 *   node scripts/generate-og-cards.mjs && bash scripts/generate-og.sh
 */

import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

const W = 1200;
const H = 630;
const MONO =
  "ui-monospace,'Cascadia Mono',Consolas,'DejaVu Sans Mono',monospace";

/** XML-escape, so an apostrophe or ampersand in a title cannot break the SVG. */
const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const text = (x, y, content, options = {}) => {
  const {
    size = 24,
    fill = "#e2e8f0",
    weight = 400,
    anchor = "middle",
    spacing = 0,
  } = options;
  return `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${
    spacing ? ` letter-spacing="${spacing}"` : ""
  }>${esc(content)}</text>`;
};

/** The bordered pills along the bottom third of every card. */
const chipRow = (chips, y, { width = 190, height = 46, gap = 20 } = {}) => {
  const total = chips.length * width + (chips.length - 1) * gap;
  let x = (W - total) / 2;
  return chips
    .map((chip) => {
      const box = `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="rgba(0,0,0,0.55)" stroke="${chip.color}" stroke-opacity="0.55" stroke-width="2"/>`;
      const label = text(x + width / 2, y + height / 2 + 7, chip.label, {
        size: 19,
        fill: chip.color,
        spacing: 1.5,
      });
      x += width + gap;
      return box + label;
    })
    .join("");
};

/**
 * The frame every card shares: background, grid, accent glow, vignette and the
 * two rules top and bottom.
 */
const frame = ({ background, accent, secondary, body }) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
<pattern id="ogrid" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#94a3b8" stroke-opacity="0.06"/></pattern>
<radialGradient id="oglow" cx="50%" cy="40%" r="62%"><stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/></radialGradient>
<radialGradient id="ovig" cx="50%" cy="45%" r="72%"><stop offset="40%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.9"/></radialGradient>
<linearGradient id="odepth" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${accent}" stop-opacity="0.18"/><stop offset="100%" stop-color="${accent}" stop-opacity="0"/></linearGradient>
</defs>
<rect x="0" y="0" width="${W}" height="${H}" fill="${background}"/>
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#ogrid)"/>
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#oglow)"/>
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#odepth)"/>
${body}
<rect x="0" y="0" width="${W}" height="${H}" fill="url(#ovig)"/>
<rect x="0" y="0" width="${W}" height="6" fill="${accent}" fill-opacity="0.6"/>
<rect x="0" y="${H - 6}" width="${W}" height="6" fill="${secondary}" fill-opacity="0.5"/>
</svg>
`;

/** The amber ARCHIVED plaque both legacy cards wear, top left. */
const archivedPlaque = (year) => `
<rect x="70" y="56" width="290" height="48" fill="rgba(0,0,0,0.6)" stroke="#fbbf24" stroke-opacity="0.7" stroke-width="2"/>
${text(215, 88, `ARCHIVED - ${year}`, { size: 20, fill: "#fbbf24", spacing: 2 })}
`;

/* ------------------------------------------------------------ SITE CARD */
/**
 * The mark is drawn rather than imported: a bordered tile with JH in it, which
 * is what the favicon reads as at preview size anyway.
 */
const jhMark = `
<rect x="536" y="112" width="128" height="128" fill="rgba(0,0,0,0.6)" stroke="#38bdf8" stroke-opacity="0.8" stroke-width="4"/>
<rect x="552" y="128" width="96" height="96" fill="none" stroke="#38bdf8" stroke-opacity="0.3" stroke-width="2" stroke-dasharray="6 8"/>
${text(600, 196, "JH", { size: 54, fill: "#38bdf8", weight: 700, spacing: 4 })}
`;

const siteCard = frame({
  background: "#0e1014",
  accent: "#38bdf8",
  secondary: "#fbbf24",
  body: `
${jhMark}
${text(600, 320, "JHPROJECTS", { size: 62, fill: "#38bdf8", weight: 700, spacing: 6 })}
${text(600, 366, "Minecraft plugins by JayMar921", { size: 26, fill: "#cbd5e1" })}
${chipRow(
  [
    { label: "ENCHANTMENTS", color: "#a3e635" },
    { label: "ECONOMY", color: "#34d399" },
    { label: "WARPS", color: "#a78bfa" },
    { label: "CONTESTS", color: "#22d3ee" },
  ],
  424,
  { width: 230, gap: 18 },
)}
${text(600, 540, "TWO LIVE PROJECTS  -  TWO IN THE ARCHIVE", { size: 22, fill: "#64748b", spacing: 2 })}
${text(600, 580, "ONE DEVELOPER. NO COMMITTEE. JUST SHIPPED.", { size: 20, fill: "#fbbf24", spacing: 3 })}
`,
});

/* ----------------------------------------------------- CUSTOM WARPS CARD */
/**
 * A 9x3 warp menu, with the same eight slots filled that the page's slot demo
 * fills. It is the plugin's one recognisable image.
 */
const warpGrid = (() => {
  const filled = new Set([10, 12, 13, 14, 16, 20, 22, 24]);
  const cell = 34;
  const gap = 6;
  const cols = 9;
  const rows = 3;
  const gridW = cols * cell + (cols - 1) * gap;
  const gridH = rows * cell + (rows - 1) * gap;
  const x0 = (W - gridW) / 2;
  const y0 = 118;

  let out = `<rect x="${x0 - 16}" y="${y0 - 16}" width="${gridW + 32}" height="${gridH + 32}" fill="rgba(0,0,0,0.5)" stroke="#a78bfa" stroke-opacity="0.5" stroke-width="2"/>`;
  for (let index = 0; index < cols * rows; index += 1) {
    const x = x0 + (index % cols) * (cell + gap);
    const y = y0 + Math.floor(index / cols) * (cell + gap);
    const on = filled.has(index);
    out += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="${
      on ? "rgba(167,139,250,0.28)" : "rgba(255,255,255,0.03)"
    }" stroke="${on ? "#a78bfa" : "#475569"}" stroke-opacity="${on ? 0.9 : 0.5}" stroke-width="2"/>`;
    if (on) {
      out += `<circle cx="${x + cell / 2}" cy="${y + cell / 2}" r="6" fill="#c4b5fd" fill-opacity="0.9"/>`;
    }
  }
  return out;
})();

const warpsCard = frame({
  background: "#0b0a12",
  accent: "#a78bfa",
  secondary: "#fbbf24",
  body: `
${archivedPlaque(2021)}
${warpGrid}
${text(600, 330, "CUSTOM WARPS", { size: 60, fill: "#a78bfa", weight: 700, spacing: 6 })}
${text(600, 376, "Forty warps, one GUI, no config file to hand edit", { size: 26, fill: "#cbd5e1" })}
${chipRow(
  [
    { label: "40 SLOTS", color: "#a78bfa" },
    { label: "8 COMMANDS", color: "#c084fc" },
    { label: "15 COLOURS", color: "#fbbf24" },
    { label: "FREE", color: "#2dd4bf" },
  ],
  428,
  { width: 220, gap: 18 },
)}
${text(600, 544, "SPIGOT 1.16 - 1.18  -  LAST UPDATED AUG 2021", { size: 22, fill: "#64748b", spacing: 2 })}
${text(600, 582, "ARCHIVED PROJECT BY JAYMAR921", { size: 20, fill: "#fbbf24", spacing: 3 })}
`,
});

/* -------------------------------------------------- FISHING CONTEST CARD */
/** The leaderboard, which is what the plugin actually looked like in play. */
const contestBoard = (() => {
  const rows = [
    { name: "You", value: 19, you: true },
    { name: "Rhea", value: 18, you: false },
    { name: "Tomas", value: 14, you: false },
  ];
  const barW = 420;
  const x0 = (W - barW - 200) / 2;
  let y = 120;
  let out = "";
  for (const row of rows) {
    out += text(x0, y + 18, row.name, {
      size: 22,
      fill: row.you ? "#67e8f9" : "#94a3b8",
      anchor: "start",
    });
    out += `<rect x="${x0 + 120}" y="${y}" width="${barW}" height="24" fill="rgba(255,255,255,0.05)"/>`;
    out += `<rect x="${x0 + 120}" y="${y}" width="${(row.value / 19) * barW}" height="24" fill="${
      row.you ? "#22d3ee" : "#64748b"
    }" fill-opacity="${row.you ? 0.85 : 0.6}"/>`;
    out += text(x0 + 120 + barW + 40, y + 18, String(row.value), {
      size: 22,
      fill: "#cbd5e1",
      anchor: "end",
    });
    y += 40;
  }
  return out;
})();

const fishingCard = frame({
  background: "#04121a",
  accent: "#22d3ee",
  secondary: "#fbbf24",
  body: `
${archivedPlaque(2021)}
${contestBoard}
${text(600, 330, "FISHING CONTEST", { size: 58, fill: "#22d3ee", weight: 700, spacing: 6 })}
${text(600, 376, "A server-wide fishing event that ran itself", { size: 26, fill: "#cbd5e1" })}
${chipRow(
  [
    { label: "LEADERBOARD", color: "#22d3ee" },
    { label: "VAULT PAYOUTS", color: "#fbbf24" },
    { label: "4 LANGUAGES", color: "#2dd4bf" },
    { label: "FREE", color: "#38bdf8" },
  ],
  428,
  { width: 240, gap: 16 },
)}
${text(600, 544, "SPIGOT 1.16 - 1.18  -  LAST UPDATED AUG 2021", { size: 22, fill: "#64748b", spacing: 2 })}
${text(600, 582, "ARCHIVED PROJECT BY JAYMAR921", { size: 20, fill: "#fbbf24", spacing: 3 })}
`,
});

const cards = [
  ["og-jhprojects.svg", siteCard],
  ["og-custom-warps.svg", warpsCard],
  ["og-fishing-contest.svg", fishingCard],
];

for (const [name, svg] of cards) {
  const out = resolve(here, name);
  writeFileSync(out, svg, "utf8");
  console.log(`wrote ${out}`);
}
