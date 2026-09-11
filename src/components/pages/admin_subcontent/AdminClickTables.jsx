import { useMemo } from "react";
import { ChartPanel, formatNumber } from "./AdminCharts";

/**
 * Who clicked what.
 *
 * Three tables, one per button that matters: download, buy and donate. Each
 * row is a project with two numbers. "Clicks" is the all time counter, bumped
 * on every hit. "People" is how many distinct visitors those clicks came from,
 * counted from the raw rows, which expire, so it is a floor over the retention
 * window rather than an all time figure. A row where the two are far apart is
 * one person hitting a button repeatedly, which is worth knowing before
 * quoting the bigger number.
 */

const ACTIONS = [
  {
    key: "download",
    title: "DOWNLOAD",
    icon: "fa-solid fa-download",
    accent: "sky",
    hint: "Spigot download buttons, Lite and full",
  },
  {
    key: "buy",
    title: "BUY",
    icon: "fa-solid fa-cart-shopping",
    accent: "amber",
    hint: "Spigot listing, PayPal and Wise buttons",
  },
  {
    key: "donate",
    title: "DONATE",
    icon: "fa-solid fa-heart",
    accent: "rose",
    hint: "The donation page and the Pi button on CE3",
  },
];

const ACCENT_TEXT = {
  sky: "text-sky-300",
  amber: "text-amber-300",
  rose: "text-rose-300",
};

/** Joins the counter rows and the people aggregation into one row per project. */
function buildRows(projects, clickers, action) {
  const people = new Map();
  for (const entry of clickers ?? []) {
    if (entry.action === action) people.set(entry.project, entry.people);
  }

  return (projects ?? [])
    .map((project) => ({
      project: project.project,
      label: project.label ?? project.project,
      clicks: Number(project.clicks?.[action]) || 0,
      people: people.get(project.project) ?? 0,
    }))
    .filter((row) => row.clicks > 0 || row.people > 0)
    .sort((a, b) => b.clicks - a.clicks || b.people - a.people);
}

function ClickTable({ action, rows }) {
  const totals = rows.reduce(
    (sum, row) => ({ clicks: sum.clicks + row.clicks, people: sum.people + row.people }),
    { clicks: 0, people: 0 },
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex place-items-center gap-2">
        <i className={`${action.icon} text-[11px] ${ACCENT_TEXT[action.accent]}`} />
        <h4 className={`pixel-font text-[9px] tracking-wider ${ACCENT_TEXT[action.accent]}`}>
          {action.title}
        </h4>
      </div>
      <p className="text-[10px] text-slate-500">{action.hint}</p>

      {rows.length === 0 ? (
        <p className="py-4 text-center text-[11px] text-slate-600">No clicks recorded yet</p>
      ) : (
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-700/70">
              <th scope="col" className="px-2 py-1.5 text-[9px] tracking-widest text-slate-500 uppercase">
                Project
              </th>
              <th scope="col" className="px-2 py-1.5 text-right text-[9px] tracking-widest text-slate-500 uppercase">
                Clicks
              </th>
              <th scope="col" className="px-2 py-1.5 text-right text-[9px] tracking-widest text-slate-500 uppercase">
                People
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.project} className="border-b border-slate-800/70">
                <td className="px-2 py-1.5 text-[11px] text-slate-300">{row.label}</td>
                <td className="px-2 py-1.5 text-right text-[11px] text-slate-300 tabular-nums">
                  {formatNumber(row.clicks)}
                </td>
                <td className="px-2 py-1.5 text-right text-[11px] text-slate-400 tabular-nums">
                  {formatNumber(row.people)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td className="px-2 py-1.5 text-[10px] tracking-widest text-slate-500 uppercase">
                Total
              </td>
              <td className="px-2 py-1.5 text-right text-[11px] text-slate-200 tabular-nums">
                {formatNumber(totals.clicks)}
              </td>
              <td className="px-2 py-1.5 text-right text-[11px] text-slate-300 tabular-nums">
                {formatNumber(totals.people)}
              </td>
            </tr>
          </tfoot>
        </table>
      )}
    </div>
  );
}

function AdminClickTables({ projects, clickers }) {
  const tables = useMemo(
    () => ACTIONS.map((action) => ({ action, rows: buildRows(projects, clickers, action.key) })),
    [projects, clickers],
  );

  return (
    <ChartPanel
      title="WHO CLICKED WHAT"
      subtitle="Clicks is every hit, all time. People is distinct visitors over the retention window, so it is a floor"
      accent="amber"
    >
      <div className="grid gap-6 md:grid-cols-3">
        {tables.map(({ action, rows }) => (
          <ClickTable key={action.key} action={action} rows={rows} />
        ))}
      </div>
    </ChartPanel>
  );
}

export default AdminClickTables;
