import { Corners } from "./PixelUIKit";

/** Colour an enchantment card by the first item class it applies to. */
const ACCENT_BY_TYPE = {
  SWORD: "rose",
  SPEAR: "rose",
  MACE: "rose",
  BOW: "lime",
  TRIDENT: "sky",
  SHIELD: "sky",
  MAGIC_WAND: "purple",
  MAGIC: "purple",
};

const ACCENT_CLASS = {
  lime: { corner: "lime", text: "text-lime-300", ring: "hover:border-lime-400/60" },
  purple: { corner: "purple", text: "text-purple-300", ring: "hover:border-purple-400/60" },
  amber: { corner: "amber", text: "text-amber-300", ring: "hover:border-amber-400/60" },
  sky: { corner: "sky", text: "text-sky-300", ring: "hover:border-sky-400/60" },
  rose: { corner: "rose", text: "text-rose-300", ring: "hover:border-rose-400/60" },
};

function Stat({ icon, label, value, className = "" }) {
  return (
    <div className="flex place-items-center justify-between gap-2 py-0.5">
      <span className="flex place-items-center gap-2 text-[10px] text-slate-500 md:text-xs">
        <i className={icon}></i>
        {label}
      </span>
      <span className={`text-[10px] md:text-xs ${className}`}>{value}</span>
    </div>
  );
}

function TypeList({ title, values, accent }) {
  if (!values || values.length === 0) return null;
  return (
    <div className="pt-3">
      <p className="text-[9px] tracking-widest text-slate-600 uppercase">
        {title}
      </p>
      <div className="flex flex-wrap gap-1 pt-1">
        {values.map((value) => (
          <span
            key={value}
            className={`border border-slate-700 bg-[rgba(0,0,0,0.4)] px-1.5 py-0.5 text-[9px] ${accent}`}
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

function CE3_EnchantComponent({ enchantment }) {
  const {
    title,
    currency,
    price,
    type = [],
    description,
    damageType,
    resistanceType,
    absorbType,
    maxLevel,
    cooldown,
    manaCost,
  } = enchantment;

  const accent = ACCENT_BY_TYPE[String(type[0])] ?? "amber";
  const a = ACCENT_CLASS[accent];

  return (
    <div
      className={`relative flex h-full flex-col border border-slate-700/70 bg-[rgba(11,13,17,0.72)] p-4 transition-colors ${a.ring}`}
    >
      <Corners accent={a.corner} />

      <p className={`text-[9px] tracking-widest uppercase ${a.text}`}>
        {type.map(String).join(" / ")}
      </p>
      <h4 className="pixel-font pt-2 text-[11px] leading-relaxed text-slate-100 md:text-sm">
        {title}
      </h4>

      <div className="mt-3 border-y border-slate-800 py-2">
        <Stat
          icon="fa-solid fa-tag"
          label="Price"
          value={`${currency ?? ""} ${price}`}
          className="text-amber-300"
        />
        <Stat
          icon="fa-solid fa-caret-up"
          label="Max level"
          value={maxLevel}
          className="text-slate-200"
        />
        {manaCost !== 0 && (
          <Stat
            icon="fa-solid fa-droplet"
            label="Mana cost"
            value={manaCost}
            className="text-sky-300"
          />
        )}
        {cooldown !== 0 && (
          <Stat
            icon="fa-solid fa-clock-rotate-left"
            label="Cooldown"
            value={cooldown}
            className="text-purple-300"
          />
        )}
      </div>

      <p className="grow pt-3 text-[11px] leading-relaxed text-slate-400 md:text-xs">
        {description}
      </p>

      <TypeList title="Damage type" values={damageType} accent="text-rose-300" />
      <TypeList
        title="Counter resistance"
        values={resistanceType}
        accent="text-amber-300"
      />
      <TypeList
        title="Absorbs damage"
        values={absorbType}
        accent="text-sky-300"
      />
    </div>
  );
}

export default CE3_EnchantComponent;
