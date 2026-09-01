import { Panel } from "../../page_components/PixelUIKit";

/**
 * The pieces the dashboard draws its numbers with.
 *
 * Three rules shape all of them, and they are why there is no chart library
 * here:
 *
 *   A single number is a number, not a one bar chart. The headline figures are
 *   stat tiles.
 *
 *   Every bar in a list is the same colour. Shading a bar darker because it is
 *   longer would encode the length twice and spend the only free channel on
 *   something the bar already says.
 *
 *   The value is written next to its bar. The bars are for the shape of the
 *   comparison; the digits are for the answer. Nothing here relies on colour
 *   alone to be readable.
 */

const ACCENT_TEXT = {
  sky: "text-sky-300",
  lime: "text-lime-300",
  amber: "text-amber-300",
  violet: "text-violet-300",
  emerald: "text-emerald-300",
  rose: "text-rose-300",
  slate: "text-slate-300",
};

const ACCENT_FILL = {
  sky: "bg-sky-400/70",
  lime: "bg-lime-400/70",
  amber: "bg-amber-400/70",
  violet: "bg-violet-400/70",
  emerald: "bg-emerald-400/70",
  rose: "bg-rose-400/70",
  slate: "bg-slate-400/70",
};

/** Thousands separators, because 14023 and 1402 look the same at a glance. */
export function formatNumber(value) {
  const number = Number(value ?? 0);
  if (!Number.isFinite(number)) return "0";
  return number.toLocaleString("en-US");
}

export function formatDate(value) {
  if (!value) return "never";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown";

  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** "3 minutes ago", for the times where the distance is the point. */
export function formatRelative(value) {
  if (!value) return "";

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const seconds = Math.round((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";

  const steps = [
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.35, "week"],
    [12, "month"],
  ];

  let amount = seconds / 60;
  let unit = "minute";

  for (let index = 0; index < steps.length; index += 1) {
    if (Math.abs(amount) < steps[index][0] || index === steps.length - 1) {
      unit = steps[index][1];
      break;
    }
    amount /= steps[index][0];
  }

  const rounded = Math.round(amount);
  return `${rounded} ${unit}${rounded === 1 ? "" : "s"} ago`;
}

/**
 * One headline number. The figure wears the normal text colour rather than an
 * accent, so a row of these does not read as though the colours mean something.
 */
export function StatTile({ icon, label, value, hint, accent = "sky" }) {
  return (
    <Panel accent={accent} className="flex flex-col gap-1 p-4">
      <div className="flex place-items-center gap-2">
        {icon && <i className={`${icon} text-[11px] ${ACCENT_TEXT[accent] ?? ACCENT_TEXT.sky}`} />}
        <span className="text-[10px] tracking-widest text-slate-500 uppercase">
          {label}
        </span>
      </div>
      <span className="pixel-font pt-1 text-[15px] leading-none text-slate-100 tabular-nums md:text-[20px]">
        {formatNumber(value)}
      </span>
      {hint && <span className="text-[10px] text-slate-500">{hint}</span>}
    </Panel>
  );
}

/**
 * A ranked list of bars. `rows` is [{ label, value }], already whatever order
 * it should be read in; this sorts by value because every use of it here is a
 * "which is biggest" question.
 *
 * `total` is optional and only used for the share in the tooltip, so a list
 * that is a subset of something bigger can still say what share it is of.
 */
export function BarList({ rows, accent = "sky", empty = "Nothing recorded yet", total }) {
  const entries = [...(rows ?? [])]
    .filter((row) => Number(row.value) > 0)
    .sort((a, b) => b.value - a.value);

  if (entries.length === 0) {
    return <p className="py-6 text-center text-[11px] text-slate-600">{empty}</p>;
  }

  const max = entries[0].value;
  const sum = total ?? entries.reduce((running, row) => running + row.value, 0);
  const fill = ACCENT_FILL[accent] ?? ACCENT_FILL.sky;

  return (
    <ul className="flex flex-col gap-2">
      {entries.map((row) => {
        const share = sum > 0 ? Math.round((row.value / sum) * 100) : 0;

        return (
          <li
            key={row.label}
            className="grid grid-cols-[minmax(64px,90px)_1fr_auto] place-items-center gap-3"
            title={`${row.label}: ${formatNumber(row.value)} (${share}%)`}
          >
            <span className="w-full truncate text-[11px] text-slate-400">{row.label}</span>
            <span className="h-2 w-full bg-white/5">
              <span
                className={`block h-2 rounded-r-[4px] ${fill}`}
                style={{ width: `${Math.max(2, (row.value / max) * 100)}%` }}
              />
            </span>
            <span className="text-[11px] text-slate-300 tabular-nums">
              {formatNumber(row.value)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/** A titled box for one chart, so every panel on the page has the same frame. */
export function ChartPanel({ title, subtitle, accent = "sky", children, actions }) {
  return (
    <Panel accent={accent} className="flex h-full flex-col p-4">
      <div className="flex place-items-start justify-between gap-3 pb-3">
        <div className="flex flex-col gap-1">
          <h3
            className={`pixel-font text-[10px] tracking-wider ${
              ACCENT_TEXT[accent] ?? ACCENT_TEXT.sky
            }`}
          >
            {title}
          </h3>
          {subtitle && <p className="text-[10px] text-slate-500">{subtitle}</p>}
        </div>
        {actions}
      </div>
      <div className="grow">{children}</div>
    </Panel>
  );
}

/** Turns { chrome: 4, firefox: 1 } into the rows BarList wants. */
export function toRows(record) {
  return Object.entries(record ?? {}).map(([label, value]) => ({
    label,
    value: Number(value) || 0,
  }));
}
