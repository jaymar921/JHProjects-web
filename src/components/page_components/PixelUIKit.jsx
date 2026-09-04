
/**
 * Shared "HUD" building blocks for the plugin pages. Custom Enchantments 3
 * runs on lime and purple, Kumandra's Economy on emerald and amber, Epic Mobs
 * Rework on ember and amber, the archived Custom Warps on violet and Fishing
 * Contest on cyan.
 * Every accent below is written out in full so Tailwind keeps the class.
 */
const ACCENTS = {
  /**
   * Epic Mobs Rework's primary. Orange rather than amber, so the two are
   * distinguishable when they sit next to each other, which on that page they
   * constantly do.
   */
  ember: {
    text: "text-orange-300",
    chip: "border-orange-400/40 bg-orange-400/10 text-orange-300",
    corner: "border-orange-400/70",
    hover:
      "hover:border-orange-400/70 hover:shadow-[0_0_25px_rgba(249,115,22,0.24)]",
    button:
      "border-orange-400/40 text-orange-200 hover:border-orange-300 hover:bg-orange-400/15",
    glow: "[text-shadow:0_0_14px_rgba(249,115,22,0.5)]",
    field: "focus:border-orange-400/70",
  },
  lime: {
    text: "text-lime-300",
    chip: "border-lime-400/40 bg-lime-400/10 text-lime-300",
    corner: "border-lime-400/70",
    hover:
      "hover:border-lime-400/70 hover:shadow-[0_0_25px_rgba(163,230,53,0.22)]",
    button:
      "border-lime-400/40 text-lime-200 hover:border-lime-300 hover:bg-lime-400/15",
    glow: "[text-shadow:0_0_14px_rgba(163,230,53,0.45)]",
    field: "focus:border-lime-400/70",
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
    field: "focus:border-purple-400/70",
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
    field: "focus:border-amber-400/70",
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
    field: "focus:border-sky-400/70",
  },
  emerald: {
    text: "text-emerald-300",
    chip: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
    corner: "border-emerald-400/70",
    hover:
      "hover:border-emerald-400/70 hover:shadow-[0_0_25px_rgba(52,211,153,0.22)]",
    button:
      "border-emerald-400/40 text-emerald-200 hover:border-emerald-300 hover:bg-emerald-400/15",
    glow: "[text-shadow:0_0_14px_rgba(52,211,153,0.45)]",
    field: "focus:border-emerald-400/70",
  },
  teal: {
    text: "text-teal-300",
    chip: "border-teal-400/40 bg-teal-400/10 text-teal-300",
    corner: "border-teal-400/70",
    hover:
      "hover:border-teal-400/70 hover:shadow-[0_0_25px_rgba(45,212,191,0.22)]",
    button:
      "border-teal-400/40 text-teal-200 hover:border-teal-300 hover:bg-teal-400/15",
    glow: "[text-shadow:0_0_14px_rgba(45,212,191,0.45)]",
    field: "focus:border-teal-400/70",
  },
  violet: {
    text: "text-violet-300",
    chip: "border-violet-400/40 bg-violet-400/10 text-violet-300",
    corner: "border-violet-400/70",
    hover:
      "hover:border-violet-400/70 hover:shadow-[0_0_25px_rgba(167,139,250,0.22)]",
    button:
      "border-violet-400/40 text-violet-200 hover:border-violet-300 hover:bg-violet-400/15",
    glow: "[text-shadow:0_0_14px_rgba(167,139,250,0.45)]",
    field: "focus:border-violet-400/70",
  },
  cyan: {
    text: "text-cyan-300",
    chip: "border-cyan-400/40 bg-cyan-400/10 text-cyan-300",
    corner: "border-cyan-400/70",
    hover:
      "hover:border-cyan-400/70 hover:shadow-[0_0_25px_rgba(34,211,238,0.22)]",
    button:
      "border-cyan-400/40 text-cyan-200 hover:border-cyan-300 hover:bg-cyan-400/15",
    glow: "[text-shadow:0_0_14px_rgba(34,211,238,0.45)]",
    field: "focus:border-cyan-400/70",
  },
  slate: {
    text: "text-slate-300",
    chip: "border-slate-400/40 bg-slate-400/10 text-slate-300",
    corner: "border-slate-400/70",
    hover:
      "hover:border-slate-400/70 hover:shadow-[0_0_25px_rgba(148,163,184,0.22)]",
    button:
      "border-slate-400/40 text-slate-200 hover:border-slate-300 hover:bg-slate-400/15",
    glow: "[text-shadow:0_0_14px_rgba(148,163,184,0.45)]",
    field: "focus:border-slate-400/70",
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
    field: "focus:border-rose-400/70",
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
  image,
  imageAlt,
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
      {image && (
        <div className="mb-4 overflow-hidden border border-slate-700/70 bg-[#0b0d11]">
          <img
            src={image}
            alt={imageAlt ?? title}
            loading="lazy"
            className="w-full transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
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

export function TerminalLabel({ children, accent = "lime" }) {
  const a = accentOf(accent);
  return (
    <p
      className={`mt-4 mb-0 w-fit border border-slate-600/60 bg-[rgba(255,255,255,0.05)] px-2 py-1 pixel-font text-[8px] md:text-[10px] ${a.text}`}
    >
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ *
 * Pieces below are shared by the sub content panels so every window   *
 * reads like the rest of the page.                                    *
 * ------------------------------------------------------------------ */

/** An in game command or a config key, dropped inline in a sentence. */
export function Cmd({ children, accent = "lime" }) {
  const a = accentOf(accent);
  return (
    <span
      className={`pixel-font mx-0.5 inline-block border px-1.5 py-0.5 text-[8px] leading-normal md:text-[10px] ${a.chip} bg-[rgba(0,0,0,0.5)]`}
    >
      {children}
    </span>
  );
}

/** Small label pill, used for lists of types and versions. */
export function Chip({ children, accent = "lime" }) {
  const a = accentOf(accent);
  return (
    <span
      className={`inline-block border px-2 py-1 text-[10px] md:text-xs ${a.chip} bg-[rgba(0,0,0,0.35)]`}
    >
      {children}
    </span>
  );
}

export function SubHeading({ children, accent = "lime", className = "" }) {
  const a = accentOf(accent);
  return (
    <h4
      className={`pixel-font text-[10px] tracking-wider md:text-xs ${a.text} ${className}`}
    >
      {children}
    </h4>
  );
}

/** Body copy, so every panel shares one text size and colour. */
export function Body({ children, className = "" }) {
  return (
    <p
      className={`text-xs leading-relaxed text-slate-300 md:text-sm ${className}`}
    >
      {children}
    </p>
  );
}

/** A single line of guidance with an accent marker instead of a bullet. */
export function Bullet({ children, accent = "lime" }) {
  const a = accentOf(accent);
  return (
    <li className="flex gap-3 py-1">
      <span className={`mt-[7px] h-1.5 w-1.5 shrink-0 ${a.chip} border`} />
      <span className="text-xs leading-relaxed text-slate-300 md:text-sm">
        {children}
      </span>
    </li>
  );
}

export function Bullets({ children, className = "" }) {
  return <ul className={`list-none ${className}`}>{children}</ul>;
}

/** Numbered setup step. The number sits in a bordered box on the left. */
export function Step({ n, children, accent = "lime" }) {
  const a = accentOf(accent);
  return (
    <li className="flex gap-3 py-2">
      <span
        className={`pixel-font inline-flex h-6 w-6 shrink-0 place-items-center justify-center border text-[9px] ${a.chip}`}
      >
        {n}
      </span>
      <span className="pt-1 text-xs leading-relaxed text-slate-300 md:text-sm">
        {children}
      </span>
    </li>
  );
}

export function Steps({ children, className = "" }) {
  return <ol className={`list-none ${className}`}>{children}</ol>;
}

/** Highlighted aside for warnings and things worth reading twice. */
export function Note({ children, icon = "fa-solid fa-circle-info", accent = "amber" }) {
  const a = accentOf(accent);
  return (
    <div
      className={`flex gap-3 border-l-2 bg-[rgba(0,0,0,0.4)] p-3 ${a.corner} border-l-2`}
    >
      <i className={`${icon} pt-0.5 text-xs ${a.text}`}></i>
      <p className="text-[11px] leading-relaxed text-slate-400 md:text-xs">
        {children}
      </p>
    </div>
  );
}

/** A screenshot or piece of feature art, framed and captioned. */
export function Shot({ src, alt, caption, accent = "lime", className = "", fit = "contain" }) {
  return (
    <figure className={className}>
      <Panel accent={accent} className="p-1">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full ${fit === "cover" ? "h-[220px] object-cover md:h-[320px]" : "h-auto"}`}
        />
      </Panel>
      {caption && (
        <figcaption className="pt-2 text-center text-[10px] tracking-wide text-slate-500 md:text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Framed 16:9 slot for the YouTube walkthroughs and the loot plot clip. */
export function Media({ children, caption, accent = "lime", className = "" }) {
  return (
    <figure className={className}>
      <Panel accent={accent} className="p-1">
        <div className="aspect-video w-full [&>iframe]:h-full [&>iframe]:w-full [&>video]:h-full [&>video]:w-full [&>video]:object-cover">
          {children}
        </div>
      </Panel>
      {caption && (
        <figcaption className="pt-2 text-center text-[10px] tracking-wide text-slate-500 md:text-xs">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** The squared off button used everywhere on the page. */
export function PixelButton({
  children,
  onClick,
  icon,
  accent = "lime",
  className = "",
  as = "button",
  href,
  type,
  disabled = false,
}) {
  const a = accentOf(accent);
  const cls = `pixel-font inline-flex place-items-center justify-center gap-2 rounded-none border-2 bg-[rgba(0,0,0,0.5)] px-4 py-3 text-[9px] tracking-widest transition-all hover:-translate-y-0.5 md:text-[11px] ${a.button} ${
    disabled ? "pointer-events-none opacity-50" : ""
  } ${className}`;
  if (as === "a")
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        {icon && <i className={icon}></i>}
        {children}
      </a>
    );
  return (
    <button
      className={cls}
      onClick={onClick}
      // A button inside a form submits it by default, which is what the bug
      // report form wants. Everywhere else the button is a plain control and
      // would otherwise submit a form it happens to sit in.
      type={type ?? (onClick ? "button" : "submit")}
      disabled={disabled}
    >
      {icon && <i className={icon}></i>}
      {children}
    </button>
  );
}

/** Wrapper that gives every sub content window the same rhythm. */
export function Section({ children, className = "" }) {
  return (
    <section className={`w-full py-6 ${className}`}>
      <div className="mx-auto w-[94%] md:w-[88%]">{children}</div>
    </section>
  );
}

/** A square icon badge in an accent colour. Used for job and feature rows. */
export function IconBadge({ icon, accent = "lime", className = "" }) {
  const a = accentOf(accent);
  return (
    <span
      className={`inline-flex h-9 w-9 shrink-0 place-items-center justify-center border-2 text-sm ${a.chip} ${className}`}
    >
      <i className={icon}></i>
    </span>
  );
}

/** A key and its value on one line, the way a config file reads. */
export function KeyValue({ label, value, accent = "lime" }) {
  const a = accentOf(accent);
  return (
    <div className="flex justify-between gap-2 py-1">
      <span className="text-[10px] text-slate-500 md:text-[11px]">{label}</span>
      <span className={`pixel-font text-[9px] md:text-[10px] ${a.text}`}>
        {value}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Form controls. Squared off and dark like the rest of the HUD, with   *
 * a visible focus ring, because a keyboard user on a dark form with no *
 * focus state has no idea where they are.                              *
 * ------------------------------------------------------------------ */

const FIELD_BASE =
  "w-full rounded-none border bg-[rgba(0,0,0,0.55)] px-3 py-2 text-xs text-slate-200 outline-none transition-colors placeholder:text-slate-600 md:text-sm";

/** Label, control and, when something is wrong, the reason why. */
export function Field({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  children,
  className = "",
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="pixel-font text-[9px] tracking-wider text-slate-400 md:text-[10px]"
      >
        {label}
        {required && <span className="pl-1 text-rose-400">*</span>}
      </label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="text-[10px] text-rose-300 md:text-[11px]"
        >
          <i className="fa-solid fa-circle-exclamation pr-1.5"></i>
          {error}
        </p>
      ) : (
        hint && (
          <p
            id={`${htmlFor}-hint`}
            className="text-[10px] text-slate-500 md:text-[11px]"
          >
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export function TextInput({ accent = "lime", invalid = false, className = "", ...props }) {
  const a = accentOf(accent);
  const border = invalid
    ? "border-rose-400/70 focus:border-rose-300"
    : `border-slate-700/80 ${a.field}`;

  return (
    <input
      {...props}
      aria-invalid={invalid || undefined}
      className={`${FIELD_BASE} ${border} focus:bg-[rgba(0,0,0,0.75)] ${className}`}
    />
  );
}

export function TextArea({ accent = "lime", invalid = false, className = "", ...props }) {
  const a = accentOf(accent);
  const border = invalid
    ? "border-rose-400/70 focus:border-rose-300"
    : `border-slate-700/80 ${a.field}`;

  return (
    <textarea
      {...props}
      aria-invalid={invalid || undefined}
      className={`${FIELD_BASE} ${border} min-h-[110px] resize-y leading-relaxed focus:bg-[rgba(0,0,0,0.75)] ${className}`}
    />
  );
}

/**
 * A set of radio buttons that look like the chips elsewhere on the page. Radios
 * rather than a select because there are only four and the hint text for each
 * is the part that actually helps someone pick.
 */
export function ChoiceGroup({ name, value, onChange, options, legend }) {
  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="pixel-font pb-1.5 text-[9px] tracking-wider text-slate-400 md:text-[10px]">
        {legend}
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const a = accentOf(option.accent ?? "lime");
          const selected = value === option.value;

          return (
            <label
              key={option.value}
              className={`flex cursor-pointer gap-2.5 border p-2.5 transition-colors ${
                selected
                  ? `${a.chip} bg-[rgba(0,0,0,0.55)]`
                  : "border-slate-700/70 bg-[rgba(0,0,0,0.35)] hover:border-slate-500/70"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="mt-0.5 h-3 w-3 shrink-0 accent-slate-300"
              />
              <span className="flex flex-col gap-0.5">
                <span
                  className={`pixel-font text-[9px] tracking-wider md:text-[10px] ${
                    selected ? a.text : "text-slate-300"
                  }`}
                >
                  {option.label}
                </span>
                {option.hint && (
                  <span className="text-[10px] leading-snug text-slate-500">
                    {option.hint}
                  </span>
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/**
 * The result banner a form shows after submitting. Success, a warning that
 * something partly worked, or a failure, in the same frame each time so the
 * layout does not jump between them.
 */
export function FormStatus({ tone = "success", title, children }) {
  const accent = { success: "lime", warning: "amber", error: "rose" }[tone] ?? "lime";
  const icon = {
    success: "fa-solid fa-circle-check",
    warning: "fa-solid fa-triangle-exclamation",
    error: "fa-solid fa-circle-xmark",
  }[tone];
  const a = accentOf(accent);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex gap-3 border p-4 ${a.chip} bg-[rgba(0,0,0,0.5)]`}
    >
      <i className={`${icon} pt-0.5 ${a.text}`}></i>
      <div className="flex flex-col gap-1">
        {title && (
          <p className={`pixel-font text-[9px] tracking-wider md:text-[10px] ${a.text}`}>
            {title}
          </p>
        )}
        <p className="text-[11px] leading-relaxed text-slate-300 md:text-xs">
          {children}
        </p>
      </div>
    </div>
  );
}
