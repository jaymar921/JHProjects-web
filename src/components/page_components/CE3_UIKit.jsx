import React from "react";

/**
 * Shared "HUD" building blocks for the Custom Enchantments 3 page.
 * Every accent below is written out in full so Tailwind keeps the class.
 */
const ACCENTS = {
  lime: {
    text: "text-lime-300",
    chip: "border-lime-400/40 bg-lime-400/10 text-lime-300",
    corner: "border-lime-400/70",
    hover:
      "hover:border-lime-400/70 hover:shadow-[0_0_25px_rgba(163,230,53,0.22)]",
    button:
      "border-lime-400/40 text-lime-200 hover:border-lime-300 hover:bg-lime-400/15",
    glow: "[text-shadow:0_0_14px_rgba(163,230,53,0.45)]",
  },
  purple: {
    text: "text-purple-300",
    chip: "border-purple-400/40 bg-purple-400/10 text-purple-300",
    corner: "border-purple-400/70",
    hover:
      "hover:border-purple-400/70 hover:shadow-[0_0_25px_rgba(192,132,252,0.22)]",
    button:
      "border-purple-400/40 text-purple-200 hover:border-purple-300 hover:bg-purple-400/15",
    glow: "[text-shadow:0_0_14px_rgba(192,132,252,0.45)]",
  },
  amber: {
    text: "text-amber-300",
    chip: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    corner: "border-amber-400/70",
    hover:
      "hover:border-amber-400/70 hover:shadow-[0_0_25px_rgba(251,191,36,0.22)]",
    button:
      "border-amber-400/40 text-amber-200 hover:border-amber-300 hover:bg-amber-400/15",
    glow: "[text-shadow:0_0_14px_rgba(251,191,36,0.45)]",
  },
  sky: {
    text: "text-sky-300",
    chip: "border-sky-400/40 bg-sky-400/10 text-sky-300",
    corner: "border-sky-400/70",
    hover:
      "hover:border-sky-400/70 hover:shadow-[0_0_25px_rgba(56,189,248,0.22)]",
    button:
      "border-sky-400/40 text-sky-200 hover:border-sky-300 hover:bg-sky-400/15",
    glow: "[text-shadow:0_0_14px_rgba(56,189,248,0.45)]",
  },
  rose: {
    text: "text-rose-300",
    chip: "border-rose-400/40 bg-rose-400/10 text-rose-300",
    corner: "border-rose-400/70",
    hover:
      "hover:border-rose-400/70 hover:shadow-[0_0_25px_rgba(251,113,133,0.22)]",
    button:
      "border-rose-400/40 text-rose-200 hover:border-rose-300 hover:bg-rose-400/15",
    glow: "[text-shadow:0_0_14px_rgba(251,113,133,0.45)]",
  },
};

const accentOf = (accent) => ACCENTS[accent] ?? ACCENTS.lime;

export function Corners({ accent = "lime" }) {
  const c = accentOf(accent).corner;
  return (
    <>
      <span
        className={`pointer-events-none absolute -top-px -left-px h-3 w-3 border-t-2 border-l-2 ${c}`}
      />
      <span
        className={`pointer-events-none absolute -top-px -right-px h-3 w-3 border-t-2 border-r-2 ${c}`}
      />
      <span
        className={`pointer-events-none absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 ${c}`}
      />
      <span
        className={`pointer-events-none absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 ${c}`}
      />
    </>
  );
}

export function Panel({ children, accent = "lime", className = "" }) {
  return (
    <div
      className={`relative border border-slate-700/70 bg-[rgba(11,13,17,0.72)] ${className}`}
    >
      <Corners accent={accent} />
      {children}
    </div>
  );
}

export function SectionHeading({
  icon,
  title,
  subtitle,
  accent = "lime",
  align = "left",
}) {
  const a = accentOf(accent);
  const centered = align === "center";
  return (
    <div className={`w-full ${centered ? "text-center" : "text-left"}`}>
      <div
        className={`flex place-items-center gap-3 ${centered ? "justify-center" : ""}`}
      >
        <span
          className={`inline-flex h-8 w-8 md:h-10 md:w-10 shrink-0 place-items-center justify-center border-2 text-sm md:text-base ${a.chip}`}
        >
          <i className={icon}></i>
        </span>
        <h3
          className={`pixel-font text-[0.8em] md:text-[1.2em] font-bold tracking-wider ${a.text} ${a.glow}`}
        >
          {title}
        </h3>
      </div>
      {subtitle && (
        <p className="pt-3 text-xs md:text-sm text-slate-400">{subtitle}</p>
      )}
      <div
        className={`mt-3 h-[2px] w-full bg-gradient-to-r from-slate-500/60 via-slate-700/40 to-transparent`}
      />
    </div>
  );
}

export function StatChip({ icon, label, value, accent = "lime" }) {
  const a = accentOf(accent);
  return (
    <div
      className={`flex place-items-center gap-2 border px-3 py-2 ${a.chip} bg-[rgba(0,0,0,0.45)]`}
    >
      <i className={`${icon} text-xs md:text-sm`}></i>
      <span className="pixel-font text-[9px] md:text-[11px] leading-none">
        {value}
      </span>
      <span className="text-[9px] md:text-[11px] uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
  );
}

export function ActionCard({
  icon,
  title,
  description,
  buttonLabel,
  buttonIcon,
  hint,
  badge,
  onClick,
  accent = "lime",
}) {
  const a = accentOf(accent);
  return (
    <div
      className={`group relative flex h-full flex-col border border-slate-700/70 bg-[rgba(11,13,17,0.72)] p-4 transition-all duration-200 hover:-translate-y-1 ${a.hover}`}
    >
      <Corners accent={accent} />
      {badge && (
        <span
          className={`pixel-font absolute -top-2 right-3 border px-2 py-1 text-[8px] leading-none ${a.chip} bg-[#0b0d11]`}
        >
          {badge}
        </span>
      )}
      <div className="flex place-items-center gap-3">
        <span
          className={`inline-flex h-10 w-10 shrink-0 place-items-center justify-center border-2 text-base transition-transform duration-200 group-hover:scale-110 ${a.chip}`}
        >
          <i className={icon}></i>
        </span>
        <h4 className="pixel-font text-[10px] md:text-xs tracking-wide text-slate-200">
          {title}
        </h4>
      </div>
      <p className="grow pt-3 text-xs md:text-sm text-slate-400">
        {description}
      </p>
      <button
        className={`mt-4 w-full rounded-none border bg-[rgba(0,0,0,0.5)] py-2 text-xs md:text-sm transition-colors ${a.button}`}
        onClick={onClick}
      >
        {buttonIcon && <i className={`${buttonIcon} pr-2`}></i>}
        {buttonLabel}
        {hint && (
          <span className="block pt-1 text-[9px] tracking-widest text-slate-500 uppercase">
            {hint}
          </span>
        )}
      </button>
    </div>
  );
}

export function Terminal({ title, children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden border border-slate-700/70 bg-[#0b0d11] ${className}`}
    >
      <div className="flex place-items-center gap-2 border-b border-slate-700/70 bg-[rgba(255,255,255,0.03)] px-3 py-2">
        <span className="h-2.5 w-2.5 bg-rose-500/80"></span>
        <span className="h-2.5 w-2.5 bg-amber-500/80"></span>
        <span className="h-2.5 w-2.5 bg-lime-500/80"></span>
        <p className="pixel-font ml-2 truncate text-[8px] md:text-[10px] text-slate-500">
          {title}
        </p>
      </div>
      <div className="overflow-x-auto px-4 py-3">{children}</div>
    </div>
  );
}

export function TerminalLabel({ children }) {
  return (
    <p className="mt-4 mb-0 w-fit border border-slate-600/60 bg-[rgba(255,255,255,0.05)] px-2 py-1 pixel-font text-[8px] md:text-[10px] text-lime-300">
      {children}
    </p>
  );
}
