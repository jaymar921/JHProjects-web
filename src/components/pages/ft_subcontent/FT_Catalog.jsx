import { useMemo, useState } from "react";
import { FTCatalog, FTCatalogCounts } from "../../contants/farm_tales/FTCatalog";
import { PluginInformation } from "../../contants/farm_tales/FTConstants";
import {
  Body,
  Note,
  Panel,
  Section,
  SectionHeading,
  StatChip,
} from "../../page_components/PixelUIKit";

/**
 * The full catalog, every entry the jar ships, in a table you can search.
 *
 * The rows come out of FTCatalog.js, which is generated from the plugin's
 * own catalog/*.yml, so this table cannot say something the jar does not.
 * It is the one place a server owner can read the whole catalog before
 * installing anything, because the plugin is closed source and the codex is
 * inside the game.
 */
const KINDS = [
  { key: "all", label: "ALL", accent: "text-slate-300" },
  { key: "vegetable", label: "VEGETABLES", accent: "text-green-300" },
  { key: "fruit", label: "FRUITS", accent: "text-amber-300" },
  { key: "meat", label: "MEAT", accent: "text-rose-300" },
];

const FORM_LABEL = {
  crop: "Crop",
  potted: "Potted",
  tree: "Tree",
  meat: "Animal",
};

const FORM_TEXT = {
  crop: "text-green-300",
  potted: "text-lime-300",
  tree: "text-sky-300",
  meat: "text-rose-300",
};

function growth(seconds) {
  if (seconds === null) return "";
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${(m / 60).toFixed(1)}h` : `${m}m`;
}

function FT_Catalog() {
  const [kind, setKind] = useState("all");
  const [liteOnly, setLiteOnly] = useState(false);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FTCatalog.filter(
      (e) =>
        (kind === "all" || e.kind === kind) &&
        (!liteOnly || e.lite) &&
        (!q ||
          e.id.includes(q) ||
          e.name.toLowerCase().includes(q) ||
          e.rides.toLowerCase().includes(q) ||
          (e.animal ?? "").toLowerCase().includes(q) ||
          e.nutrition.join(" ").toLowerCase().includes(q)),
    );
  }, [kind, liteOnly, query]);

  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-list"
          title="The whole catalog"
          subtitle={`Every entry in ${PluginInformation.version}, read out of the plugin's own catalog files.`}
          accent="green"
        />
        <div className="mt-5 flex flex-wrap gap-2">
          <StatChip icon="fa-solid fa-carrot" value={FTCatalogCounts.vegetables} label="Vegetables" accent="green" />
          <StatChip icon="fa-solid fa-apple-whole" value={FTCatalogCounts.fruits} label="Fruits" accent="amber" />
          <StatChip icon="fa-solid fa-drumstick-bite" value={FTCatalogCounts.meats} label="Meats" accent="rose" />
          <StatChip icon="fa-solid fa-tree" value={FTCatalogCounts.trees} label="Trees" accent="sky" />
          <StatChip icon="fa-solid fa-seedling" value={FTCatalogCounts.potted} label="Potted" accent="lime" />
          <StatChip icon="fa-solid fa-beer-mug-empty" value={FTCatalogCounts.brewing} label="Brewing" accent="purple" />
          <StatChip icon="fa-solid fa-gift" value={FTCatalogCounts.lite} label="In Lite" accent="emerald" />
        </div>
        <Body className="pt-4 text-justify">
          Growth is the base time before the global multiplier, water and
          fertilizer, so a well-kept crop is faster and a dry one is slower.
          &quot;Rides on&quot; is the vanilla item the entry sits on when there
          is no resource pack. Meat has no growth time: each row is one animal
          at one grade. The four brewing grains are marked.
        </Body>
      </Section>

      <Section>
        <div className="flex flex-wrap place-items-center gap-2">
          {KINDS.map((k) => (
            <button
              key={k.key}
              onClick={() => setKind(k.key)}
              className={`pixel-font border px-3 py-2 text-[8px] tracking-widest transition-colors md:text-[9px] ${
                kind === k.key
                  ? `border-green-400/60 bg-green-500/15 ${k.accent}`
                  : "border-slate-700 bg-[rgba(0,0,0,0.4)] text-slate-500 hover:border-slate-500"
              }`}
            >
              {k.label}
            </button>
          ))}
          <button
            onClick={() => setLiteOnly((v) => !v)}
            className={`pixel-font border px-3 py-2 text-[8px] tracking-widest transition-colors md:text-[9px] ${
              liteOnly
                ? "border-emerald-400/60 bg-emerald-500/15 text-emerald-300"
                : "border-slate-700 bg-[rgba(0,0,0,0.4)] text-slate-500 hover:border-slate-500"
            }`}
          >
            <i className="fa-solid fa-gift pr-1"></i>
            LITE ONLY
          </button>
          <div className="relative grow">
            <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-xs text-slate-500"></i>
            <input
              placeholder="Search a name, an id, an item, a nutrient"
              className="w-full border border-slate-700 bg-[rgba(0,0,0,0.5)] py-2 pr-3 pl-9 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-green-400/60 md:text-sm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <p className="pt-3 text-[10px] tracking-widest text-slate-500 uppercase">
          {rows.length} of {FTCatalog.length} entries shown
        </p>

        <Panel accent="green" className="mt-3 overflow-x-auto p-2 md:p-3">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-700">
                {["Name", "Id", "Form", "Growth", "Rides on", "Nutrition", "Lite"].map(
                  (h) => (
                    <th
                      key={h}
                      className="pixel-font px-2 py-2 text-[7px] tracking-wider whitespace-nowrap text-slate-300 md:text-[9px]"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr
                  key={e.id}
                  className="border-b border-slate-800/80 transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                >
                  <td className="px-2 py-1.5 text-[11px] whitespace-nowrap text-slate-200 md:text-xs">
                    {e.name}
                    {e.brewing && (
                      <span className="pixel-font ml-2 border border-purple-400/40 bg-purple-400/10 px-1 py-0.5 text-[6px] tracking-widest text-purple-300 md:text-[7px]">
                        BREWING
                      </span>
                    )}
                  </td>
                  <td className="px-2 py-1.5 text-[10px] whitespace-nowrap text-slate-500 md:text-[11px]">
                    {e.id}
                  </td>
                  <td className={`px-2 py-1.5 text-[10px] whitespace-nowrap md:text-[11px] ${FORM_TEXT[e.form]}`}>
                    {e.form === "meat" ? `${e.animal}, ${e.grade}` : FORM_LABEL[e.form]}
                  </td>
                  <td className="px-2 py-1.5 text-[10px] whitespace-nowrap text-slate-400 md:text-[11px]">
                    {growth(e.growth)}
                  </td>
                  <td className="px-2 py-1.5 text-[10px] whitespace-nowrap text-slate-400 md:text-[11px]">
                    {e.rides}
                  </td>
                  <td className="px-2 py-1.5 text-[10px] text-slate-400 md:text-[11px]">
                    {e.nutrition.join(", ")}
                  </td>
                  <td className="px-2 py-1.5 text-center">
                    {e.lite ? (
                      <i className="fa-solid fa-circle-check text-xs text-emerald-400"></i>
                    ) : (
                      <i className="fa-solid fa-minus text-xs text-slate-700"></i>
                    )}
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-slate-500">
                    Nothing here matches &quot;{query}&quot;.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Panel>
      </Section>

      <Section>
        <Note accent="sky" icon="fa-solid fa-circle-info">
          On a 1.16.5 server five of these are skipped because their base item
          did not exist yet: daikon, okra, squash blossom, moonberry and
          mangrove plum. The console names each one and nothing else is
          affected. A 26.2 server loads all {FTCatalog.length}.
        </Note>
      </Section>
    </div>
  );
}

export default FT_Catalog;
