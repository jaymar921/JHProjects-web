/**
 * Draws the Custom Enchantments 3 feature card this repository owns.
 *
 * The rest of the set in src/assets/custom_enchants_3/features came out of the
 * older CE3 site's own tools/generate-feature-art.mjs and was copied in. This
 * script draws the one card that postdates it, the integrations card added for
 * 1.7.0, in the same 640x360 frame and with the same helpers, so the grid still
 * reads as one set.
 *
 * No sprites: the three plugins are named, and a resource pack sprite would say
 * nothing about a plugin that is not this one.
 *
 *   node scripts/generate-ce3-art.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const OUT = join(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "assets",
  "custom_enchants_3",
  "features",
);
mkdirSync(OUT, { recursive: true });

const W = 640,
  H = 360;
const TOP = 34,
  BOT = 326;

const A = {
  lime: "#a3e635",
  purple: "#c084fc",
  amber: "#fbbf24",
  sky: "#38bdf8",
  rose: "#fb7185",
  emerald: "#34d399",
};
const MONO = "ui-monospace,'Cascadia Mono',Consolas,'DejaVu Sans Mono',monospace";
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function t(x, y, s, o = {}) {
  const {
    size = 11,
    fill = "#94a3b8",
    anchor = "start",
    weight = 400,
    ls = 0,
    op = 1,
  } = o;
  return `<text x="${x}" y="${y}" font-family="${MONO}" font-size="${size}" font-weight="${weight}" fill="${fill}" fill-opacity="${op}" text-anchor="${anchor}"${
    ls ? ` letter-spacing="${ls}"` : ""
  }>${esc(s)}</text>`;
}
function r(x, y, w, h, o = {}) {
  const { fill = "none", stroke = "", sw = 1, op = 1, so = 1 } = o;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" fill-opacity="${op}"${
    stroke ? ` stroke="${stroke}" stroke-opacity="${so}" stroke-width="${sw}"` : ""
  }/>`;
}
function corners(x, y, w, h, c, len = 9, sw = 2) {
  const p = (d) =>
    `<path d="${d}" fill="none" stroke="${c}" stroke-width="${sw}" stroke-opacity="0.75"/>`;
  return [
    p(`M${x} ${y + len}V${y}H${x + len}`),
    p(`M${x + w - len} ${y}H${x + w}V${y + len}`),
    p(`M${x} ${y + h - len}V${y + h}H${x + len}`),
    p(`M${x + w - len} ${y + h}H${x + w}V${y + h - len}`),
  ].join("");
}
function panel(x, y, w, h, c, o = {}) {
  const { fill = "rgba(255,255,255,0.02)" } = o;
  return (
    r(x, y, w, h, { fill, stroke: "#334155", so: 0.8 }) +
    corners(x, y, w, h, c, 8, 1.5)
  );
}

function frame({ accent, title, file, body, footer }) {
  const c = A[accent];
  const s = [];
  s.push(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="${esc(title)}">`,
  );
  s.push(`<defs>
<pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M32 0H0V32" fill="none" stroke="#94a3b8" stroke-opacity="0.055"/></pattern>
<pattern id="scan" width="3" height="3" patternUnits="userSpaceOnUse"><rect width="3" height="1" fill="#000" fill-opacity="0.18"/></pattern>
<radialGradient id="vig" cx="50%" cy="45%" r="72%"><stop offset="55%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="0.55"/></radialGradient>
<linearGradient id="rule" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="${c}" stop-opacity="0.7"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></linearGradient>
</defs>`);
  s.push(r(0, 0, W, H, { fill: "#0b0d11" }));
  s.push(r(0, TOP, W, BOT - TOP, { fill: "url(#grid)" }));
  s.push(r(0, 0, W, TOP, { fill: "rgba(255,255,255,0.03)" }));
  s.push(r(0, TOP - 1, W, 1, { fill: "#334155", op: 0.8 }));
  s.push(r(14, 14, 7, 7, { fill: "#fb7185", op: 0.8 }));
  s.push(r(27, 14, 7, 7, { fill: "#fbbf24", op: 0.8 }));
  s.push(r(40, 14, 7, 7, { fill: "#a3e635", op: 0.8 }));
  s.push(t(60, 22, title, { size: 12, fill: c, weight: 700, ls: 2.2 }));
  if (file) s.push(t(W - 16, 22, file, { size: 9.5, fill: "#64748b", anchor: "end" }));
  s.push(body);
  s.push(r(0, BOT, W, 1, { fill: "#334155", op: 0.8 }));
  s.push(r(0, BOT + 1, W, H - BOT - 1, { fill: "rgba(255,255,255,0.02)" }));
  s.push(r(0, BOT + 1, 220, 2, { fill: "url(#rule)" }));
  if (footer) s.push(t(16, BOT + 22, footer, { size: 9.5, fill: "#64748b", ls: 1.4 }));
  s.push(r(0, TOP, W, BOT - TOP, { fill: "url(#scan)" }));
  s.push(r(0, 0, W, H, { fill: "url(#vig)" }));
  s.push(r(0.5, 0.5, W - 1, H - 1, { fill: "none", stroke: "#334155" }));
  s.push(corners(4, 4, W - 8, H - 8, c, 14, 2));
  s.push(`</svg>`);
  return s.join("\n");
}

const write = (name, svg) => {
  writeFileSync(join(OUT, `${name}.svg`), svg + "\n");
  console.log("wrote", name + ".svg");
};

/* -------------------------------------------------------- INTEGRATIONS */
{
  /*
   * Three columns, one per plugin, and the whole point of the card is the strip
   * underneath them: none of these is required. The lines inside each column say
   * what the pairing adds, not what the other plugin is, because a card that
   * advertises three plugins at once teaches nothing about any of them.
   */
  const cols = [
    {
      c: A.emerald,
      name: "KUMANDRA'S ECONOMY",
      tag: "2.0+",
      lines: [
        "Settle a RACO price in Kd",
        "Swap the two in the exchange",
        "RACO is bought, never minted",
        "Six keys, inert without it",
      ],
    },
    {
      c: A.rose,
      name: "EPIC MOBS REWORK",
      tag: "1.0+",
      lines: [
        "Mobs trigger real CE3 effects",
        "Loot tables drop CE3 items",
        "Kills can pay out in RACO",
        "Boundaries keep mobs out",
      ],
    },
    {
      c: A.sky,
      name: "PLACEHOLDERAPI",
      tag: "ANY",
      lines: [
        "Level, class, mana, RACO",
        "Any skill by its own name",
        "Eight timed paths published",
        "/ce perf without it",
      ],
    },
  ];

  let b = "";
  cols.forEach((col, i) => {
    const x = 16 + i * 208,
      y = 52,
      w = 196,
      h = 210;
    b += panel(x, y, w, h, col.c);
    b += r(x + 14, y + 18, 8, 8, { fill: col.c, op: 0.9 });
    b += t(x + 14, y + 50, col.name, { size: 10, fill: col.c, weight: 700, ls: 1.1 });
    b += t(x + w - 14, y + 26, col.tag, {
      size: 9,
      fill: "#64748b",
      anchor: "end",
      ls: 1.2,
    });
    b += r(x + 14, y + 60, w - 28, 1, { fill: col.c, op: 0.3 });
    col.lines.forEach((line, j) => {
      const ly = y + 84 + j * 26;
      b += r(x + 14, ly - 7, 5, 5, { fill: col.c, op: 0.8 });
      b += t(x + 26, ly - 2, line, { size: 9, fill: "#cbd5e1" });
    });
    b += t(x + 14, y + 196, "OPTIONAL", { size: 8.5, fill: "#475569", ls: 1.6 });
  });

  b += panel(16, 274, 608, 40, A.lime);
  b += t(30, 291, "ALL THREE ARE STANDALONE PLUGINS", {
    size: 9.5,
    fill: A.lime,
    weight: 700,
    ls: 1.4,
  });
  b += t(30, 306, "each one runs on its own and needs none of the others. They are simply compatible.", {
    size: 9,
    fill: "#94a3b8",
  });

  write(
    "integrations",
    frame({
      accent: "lime",
      title: "INTEGRATIONS",
      file: "config.yml",
      body: b,
      footer: "NOTHING IS BUNDLED - NO INTEGRATION CLASS IS LOADED WITHOUT THE PLUGIN IT NEEDS",
    }),
  );
}
