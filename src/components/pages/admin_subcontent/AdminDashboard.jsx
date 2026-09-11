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
import AdminClickTables from "./AdminClickTables";
import AdminEvents from "./AdminEvents";
import AdminTimeline from "./AdminTimeline";
import AdminWorldMap from "./AdminWorldMap";
import { fetchStats, isSignedOut, logout } from "../../../lib/api/admin";

/**
 * The dashboard.
 *
 * Everything on this page comes from one call to GET /api/stats. The totals,
 * the breakdowns and the project table are read from the rolled up counters,
 * so they cost one document read per project however many events are behind
 * them. The timeline and the "people" columns are the two things a counter
 * cannot answer, and the server runs them as bounded aggregations in the same
 * call. The raw rows are only fetched when a project is opened.
 */

const COLUMNS = [
  { key: "label", label: "Project", align: "left" },
  { key: "views", label: "Views", align: "right" },
  { key: "uniqueViews", label: "Unique", align: "right" },
  { key: "clicksTotal", label: "Clicks", align: "right" },
  { key: "download", label: "Download", align: "right" },
  { key: "buy", label: "Buy", align: "right" },
  { key: "donate", label: "Donate", align: "right" },
  { key: "conversion", label: "Dl rate", align: "right" },
  { key: "lastEventAt", label: "Last event", align: "right" },
];

/** Flattens the nested click counters so a table row is one flat object. */
function toRow(project) {
  const views = project.views ?? 0;
  const download = project.clicks?.download ?? 0;

  return {
    project: project.project,
    label: project.label ?? project.project,
    views,
    uniqueViews: project.uniqueViews ?? 0,
    clicksTotal: project.clicks?.total ?? 0,
    download,
    buy: project.clicks?.buy ?? 0,
    donate: project.clicks?.donate ?? 0,
    // Downloads per hundred views. Null rather than zero when there are no
    // views, so a project with no traffic sorts to the quiet end.
    conversion: views > 0 ? (download / views) * 100 : null,
    lastEventAt: project.lastEventAt ?? null,
  };
}

/** "3.4%", or a dash where there is nothing to divide by. */
function formatPercent(value) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "-";
  return `${value < 10 ? value.toFixed(1) : Math.round(value)}%`;
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
  const bugReports = data?.bugReports;

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
              <section className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
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
                <StatTile
                  icon="fa-solid fa-heart"
                  label="Donate clicks"
                  value={summary?.donateClicks}
                  accent="sky"
                />
                <StatTile
                  icon="fa-solid fa-bug"
                  label="Bug reports"
                  value={bugReports?.total}
                  hint={
                    bugReports?.failed
                      ? `${formatNumber(bugReports.failed)} never emailed`
                      : bugReports?.lastReportAt
                        ? `last ${formatRelative(bugReports.lastReportAt)}`
                        : "none yet"
                  }
                  accent={bugReports?.failed ? "rose" : "sky"}
                />
              </section>

              <AdminTimeline daily={data.daily} />

              <AdminWorldMap summary={summary} />

              <AdminClickTables projects={data.projects} clickers={data.clickers} />

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

              <div className="grid gap-4 md:grid-cols-2">
                <ChartPanel
                  title="WHERE THEY CAME FROM"
                  subtitle="Referrer of each view. Direct is a typed URL, a bookmark or a link that hid its referrer; internal is another page of this site"
                  accent="lime"
                >
                  <BarList rows={toRows(summary?.referrers)} accent="lime" />
                </ChartPanel>
                <ChartPanel
                  title="LANGUAGES"
                  subtitle="The browser's first preferred language, region dropped"
                  accent="violet"
                >
                  <BarList rows={toRows(summary?.languages)} accent="violet" />
                </ChartPanel>
              </div>

              <ChartPanel
                title="EVERY PROJECT"
                subtitle="Click a column to sort, or a row to see the events behind it"
                accent="slate"
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[820px] border-collapse text-left">
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
                              // index.css styles every <button> outside
                              // Tailwind's layers, so these have to be inline.
                              style={{
                                border: "none",
                                padding: 0,
                                fontSize: "9px",
                                backgroundColor: "transparent",
                              }}
                              className="tracking-widest text-slate-500 uppercase hover:text-slate-300"
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
                          <td className="px-2 py-2 text-right text-[11px] text-slate-400 tabular-nums">
                            {formatNumber(row.donate)}
                          </td>
                          <td className="px-2 py-2 text-right text-[11px] text-slate-400 tabular-nums">
                            {formatPercent(row.conversion)}
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
                Bots are recorded but never counted. Unique views and people only count a
                visitor whose browser kept its id, so the real number is this or higher.
                Countries come from the hosting edge and are never looked up from an
                address here.
              </p>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
