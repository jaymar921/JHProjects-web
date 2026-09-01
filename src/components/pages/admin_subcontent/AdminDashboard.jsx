import { useCallback, useEffect, useMemo, useState } from "react";
import { Note, Panel, PixelButton } from "../../page_components/PixelUIKit";
import {
  BarList,
  ChartPanel,
  StatTile,
  formatDate,
  formatNumber,
  formatRelative,
  toRows,
} from "./AdminCharts";
import AdminEvents from "./AdminEvents";
import { fetchStats, isSignedOut, logout } from "../../../lib/api/admin";

/**
 * The dashboard.
 *
 * Everything on this page comes from one call to GET /api/stats, which reads
 * the rolled up counters rather than the raw events, so a refresh costs one
 * document read per project however many events are behind them. The raw rows
 * are only fetched when a project is opened, which is the one place they
 * actually answer a question the counters cannot.
 */

const COLUMNS = [
  { key: "label", label: "Project", align: "left" },
  { key: "views", label: "Views", align: "right" },
  { key: "uniqueViews", label: "Unique", align: "right" },
  { key: "clicksTotal", label: "Clicks", align: "right" },
  { key: "download", label: "Download", align: "right" },
  { key: "buy", label: "Buy", align: "right" },
  { key: "lastEventAt", label: "Last event", align: "right" },
];

/** Flattens the nested click counters so a table row is one flat object. */
function toRow(project) {
  return {
    project: project.project,
    label: project.label ?? project.project,
    views: project.views ?? 0,
    uniqueViews: project.uniqueViews ?? 0,
    clicksTotal: project.clicks?.total ?? 0,
    download: project.clicks?.download ?? 0,
    buy: project.clicks?.buy ?? 0,
    lastEventAt: project.lastEventAt ?? null,
  };
}

function AdminDashboard({ session, onSignedOut, onChangePassword }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [sort, setSort] = useState({ key: "views", direction: "desc" });
  const [openProject, setOpenProject] = useState(null);

  const load = useCallback(
    async ({ quiet = false } = {}) => {
      if (!quiet) setLoading(true);
      setError(null);

      try {
        const payload = await fetchStats();
        setData(payload);
        setUpdatedAt(new Date());
      } catch (failure) {
        // An expired session is not an error to show on the dashboard, it is a
        // reason to be back at the login form.
        if (isSignedOut(failure)) {
          onSignedOut?.();
          return;
        }
        setError(failure.message ?? "Could not load the numbers.");
      } finally {
        setLoading(false);
      }
    },
    [onSignedOut],
  );

  useEffect(() => {
    load();
  }, [load]);

  /**
   * A quiet refresh every minute, but only while the tab is actually being
   * looked at. A dashboard left open in a background tab has no reason to keep
   * touching the database, and each request slides the session window forward,
   * which would defeat the idle timeout.
   */
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") load({ quiet: true });
    }, 60_000);

    return () => clearInterval(timer);
  }, [load]);

  async function handleSignOut() {
    try {
      await logout();
    } catch {
      // The cookie is going either way. A failed call here means the session
      // row outlives the click, and it expires on its own.
    }
    onSignedOut?.();
  }

  const rows = useMemo(() => (data?.projects ?? []).map(toRow), [data]);

  const sorted = useMemo(() => {
    const factor = sort.direction === "asc" ? 1 : -1;

    return [...rows].sort((a, b) => {
      const left = a[sort.key];
      const right = b[sort.key];

      if (typeof left === "string" && typeof right === "string") {
        return left.localeCompare(right) * factor;
      }

      // Nulls are "no data", which belongs at the quiet end of the sort
      // whichever direction it is running in.
      if (left === null) return 1;
      if (right === null) return -1;

      return (new Date(left) - new Date(right) || left - right) * factor;
    });
  }, [rows, sort]);

  const summary = data?.summary;
  const totalViews = summary?.views ?? 0;

  function toggleSort(key) {
    setSort((current) =>
      current.key === key
        ? { key, direction: current.direction === "desc" ? "asc" : "desc" }
        : { key, direction: key === "label" ? "asc" : "desc" },
    );
  }

  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-5">
        <header className="flex flex-wrap place-items-center justify-between gap-4">
          <div>
            <h1 className="pixel-font text-[12px] tracking-widest text-slate-200 md:text-[14px]">
              ANALYTICS
            </h1>
            <p className="pt-2 text-[11px] text-slate-500">
              Signed in as {session?.username ?? "admin"}
              {updatedAt && ` · updated ${formatRelative(updatedAt)}`}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <PixelButton
              accent="sky"
              icon={loading ? "fa-solid fa-circle-notch fa-spin" : "fa-solid fa-rotate"}
              onClick={() => load()}
              disabled={loading}
            >
              REFRESH
            </PixelButton>
            <PixelButton accent="amber" icon="fa-solid fa-key" onClick={onChangePassword}>
              PASSWORD
            </PixelButton>
            <PixelButton
              accent="rose"
              icon="fa-solid fa-right-from-bracket"
              onClick={handleSignOut}
            >
              SIGN OUT
            </PixelButton>
          </div>
        </header>

        {error && (
          <Note accent="rose" icon="fa-solid fa-circle-exclamation">
            {error}
          </Note>
        )}

        {loading && !data ? (
          <Panel accent="slate" className="p-10 text-center">
            <i className="fa-solid fa-circle-notch fa-spin text-slate-500" />
            <p className="pt-3 text-[11px] text-slate-500">Reading the counters…</p>
          </Panel>
        ) : (
          data && (
            <>
              <section className="grid grid-cols-2 gap-3 md:grid-cols-5">
                <StatTile
                  icon="fa-solid fa-eye"
                  label="Views"
                  value={summary?.views}
                  accent="sky"
                />
                <StatTile
                  icon="fa-solid fa-user"
                  label="Unique"
                  value={summary?.uniqueViews}
                  hint="Visitors seen once per project"
                  accent="sky"
                />
                <StatTile
                  icon="fa-solid fa-hand-pointer"
                  label="Clicks"
                  value={summary?.clicks}
                  accent="sky"
                />
                <StatTile
                  icon="fa-solid fa-download"
                  label="Downloads"
                  value={summary?.downloadClicks}
                  accent="sky"
                />
                <StatTile
                  icon="fa-solid fa-cart-shopping"
                  label="Buy clicks"
                  value={summary?.buyClicks}
                  accent="sky"
                />
              </section>

              <div className="grid gap-4 lg:grid-cols-[3fr_2fr]">
                <ChartPanel
                  title="VIEWS BY PROJECT"
                  subtitle="Every page that reports a slug, biggest first"
                  accent="sky"
                >
                  <BarList
                    rows={rows.map((row) => ({ label: row.label, value: row.views }))}
                    accent="sky"
                    total={totalViews}
                    empty="No views recorded yet"
                  />
                </ChartPanel>

                <ChartPanel
                  title="DEVICES"
                  subtitle="Across every project"
                  accent="violet"
                >
                  <BarList rows={toRows(summary?.devices)} accent="violet" />
                </ChartPanel>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <ChartPanel title="OPERATING SYSTEMS" accent="emerald">
                  <BarList rows={toRows(summary?.os)} accent="emerald" />
                </ChartPanel>
                <ChartPanel title="BROWSERS" accent="amber">
                  <BarList rows={toRows(summary?.browsers)} accent="amber" />
                </ChartPanel>
              </div>

              <ChartPanel
                title="EVERY PROJECT"
                subtitle="Click a column to sort, or a row to see the events behind it"
                accent="slate"
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px] border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-700/70">
                        {COLUMNS.map((column) => (
                          <th
                            key={column.key}
                            scope="col"
                            aria-sort={
                              sort.key === column.key
                                ? sort.direction === "asc"
                                  ? "ascending"
                                  : "descending"
                                : "none"
                            }
                            className={`px-2 py-2 ${
                              column.align === "right" ? "text-right" : "text-left"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleSort(column.key)}
                              className="border-none bg-transparent p-0 text-[9px] tracking-widest text-slate-500 uppercase hover:text-slate-300"
                            >
                              {column.label}
                              {sort.key === column.key && (
                                <i
                                  className={`fa-solid ${
                                    sort.direction === "asc"
                                      ? "fa-caret-up"
                                      : "fa-caret-down"
                                  } pl-1.5`}
                                />
                              )}
                            </button>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sorted.map((row) => (
                        <tr
                          key={row.project}
                          onClick={() =>
                            setOpenProject((current) =>
                              current === row.project ? null : row.project,
                            )
                          }
                          className={`cursor-pointer border-b border-slate-800/70 transition-colors hover:bg-white/[0.03] ${
                            openProject === row.project ? "bg-white/[0.04]" : ""
                          }`}
                        >
                          <td className="px-2 py-2 text-[11px] text-slate-300">
                            <i
                              className={`fa-solid fa-chevron-right pr-2 text-[8px] text-slate-600 transition-transform ${
                                openProject === row.project ? "rotate-90" : ""
                              }`}
                            />
                            {row.label}
                          </td>
                          <td className="px-2 py-2 text-right text-[11px] text-slate-300 tabular-nums">
                            {formatNumber(row.views)}
                          </td>
                          <td className="px-2 py-2 text-right text-[11px] text-slate-400 tabular-nums">
                            {formatNumber(row.uniqueViews)}
                          </td>
                          <td className="px-2 py-2 text-right text-[11px] text-slate-300 tabular-nums">
                            {formatNumber(row.clicksTotal)}
                          </td>
                          <td className="px-2 py-2 text-right text-[11px] text-slate-400 tabular-nums">
                            {formatNumber(row.download)}
                          </td>
                          <td className="px-2 py-2 text-right text-[11px] text-slate-400 tabular-nums">
                            {formatNumber(row.buy)}
                          </td>
                          <td className="px-2 py-2 text-right text-[10px] text-slate-500">
                            {row.lastEventAt ? formatDate(row.lastEventAt) : "never"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ChartPanel>

              {openProject && (
                <AdminEvents
                  project={openProject}
                  label={rows.find((row) => row.project === openProject)?.label}
                  onClose={() => setOpenProject(null)}
                  onSignedOut={onSignedOut}
                />
              )}

              <p className="pb-4 text-center text-[10px] text-slate-600">
                Bots are recorded but never counted. Unique views only count a visitor
                whose browser kept its id, so the real number is this or higher.
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
