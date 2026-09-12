import { useEffect, useMemo, useState } from "react";
import { Corners, PixelButton } from "../../page_components/PixelUIKit";
import { formatDate, formatNumber, formatRelative } from "./AdminCharts";
import { countryName } from "./AdminWorldMap";
import { PLUGIN_SERIES } from "./adminChartSetup";
import { PLUGINS } from "../../../../shared/plugins";

/**
 * Every server the plugins have been heard from, one row each.
 *
 * A server is one row however many of the plugins it runs; the plugins are
 * the chips on the row, each with the version it reported. Open a row for the
 * per plugin figures: when it was first and last heard from, how many pings
 * it has sent and how many errors it has reported since.
 *
 * "Live" means a ping inside the last two hours, one missed heartbeat's worth
 * of grace. The list can be narrowed to one plugin or searched by name, and
 * both filters read the same rows the summary counted, so the numbers agree.
 */

/** Written out in full, because Tailwind only keeps a class it can see. */
const HEADINGS = [
  ["", "text-center"],
  ["Server", "text-left"],
  ["Version", "text-left"],
  ["Where", "text-left"],
  ["Players", "text-right"],
  ["Plugins", "text-left"],
  ["Last ping", "text-right"],
];

/** A small square in the plugin's colour, next to its name, so the chip matches the chart. */
function Swatch({ pluginKey }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-2 w-2 shrink-0"
      style={{ backgroundColor: PLUGIN_SERIES[pluginKey] ?? "#94a3b8" }}
    />
  );
}

function LiveDot({ live }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${
        live ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" : "bg-slate-600"
      }`}
      title={live ? "Pinged in the last two hours" : "Not heard from recently"}
    />
  );
}

function ServerRow({ server, open, onToggle }) {
  return (
    <>
      <tr
        onClick={onToggle}
        className={`cursor-pointer border-b border-slate-800/70 transition-colors hover:bg-white/[0.03] ${
          open ? "bg-white/[0.04]" : ""
        }`}
      >
        <td className="px-2 py-2 text-center">
          <LiveDot live={server.live} />
        </td>
        <td className="px-2 py-2 text-[11px] text-slate-200">
          <i
            className={`fa-solid fa-chevron-right pr-2 text-[8px] text-slate-600 transition-transform ${
              open ? "rotate-90" : ""
            }`}
          />
          {server.serverName ?? "unknown"}
        </td>
        <td className="px-2 py-2 text-[10px] text-slate-400">{server.serverVersion ?? "-"}</td>
        <td
          className="px-2 py-2 text-[10px] text-slate-400"
          title={server.country ? countryName(server.country) : undefined}
        >
          {server.country ?? "unknown"}
        </td>
        <td className="px-2 py-2 text-right text-[11px] text-slate-300 tabular-nums">
          {formatNumber(server.totalPlayers)}
        </td>
        <td className="px-2 py-2">
          <div className="flex flex-wrap gap-1">
            {server.plugins.map((plugin) => (
              <span
                key={plugin.key}
                className={`inline-flex place-items-center gap-1.5 border border-slate-700/70 px-1.5 py-0.5 text-[10px] ${
                  plugin.live ? "text-slate-300" : "text-slate-600"
                }`}
                title={`${plugin.label} ${plugin.version ?? ""}, last ping ${formatRelative(
                  plugin.lastSeenAt,
                )}`}
              >
                <Swatch pluginKey={plugin.key} />
                {plugin.label}
                {plugin.version && <span className="text-slate-500">{plugin.version}</span>}
              </span>
            ))}
          </div>
        </td>
        <td
          className="px-2 py-2 text-right text-[10px] whitespace-nowrap text-slate-500"
          title={formatDate(server.lastSeenAt)}
        >
          {formatRelative(server.lastSeenAt) || "never"}
        </td>
      </tr>

      {open && (
        <tr className="border-b border-slate-800/70 bg-black/20">
          <td colSpan={7} className="px-4 py-3">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {server.plugins.map((plugin) => (
                <div
                  key={plugin.key}
                  className="relative border border-slate-700/70 bg-[rgba(11,13,17,0.72)] p-3"
                >
                  <div className="flex place-items-center gap-2 pb-2">
                    <Swatch pluginKey={plugin.key} />
                    <span className="pixel-font text-[9px] tracking-wider text-slate-200">
                      {plugin.label.toUpperCase()}
                    </span>
                    <span className="text-[10px] text-slate-500">{plugin.version}</span>
                    <span className="ml-auto">
                      <LiveDot live={plugin.live} />
                    </span>
                  </div>
                  <dl className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
                    <dt className="text-slate-500">Players</dt>
                    <dd className="text-right text-slate-300 tabular-nums">
                      {formatNumber(plugin.totalPlayers)}
                    </dd>
                    <dt className="text-slate-500">Pings</dt>
                    <dd className="text-right text-slate-300 tabular-nums">
                      {formatNumber(plugin.pings)}
                    </dd>
                    <dt className="text-slate-500">Errors reported</dt>
                    <dd
                      className={`text-right tabular-nums ${
                        plugin.errors > 0 ? "text-rose-300" : "text-slate-300"
                      }`}
                    >
                      {formatNumber(plugin.errors)}
                    </dd>
                    <dt className="text-slate-500">First seen</dt>
                    <dd className="text-right text-slate-400">{formatDate(plugin.firstSeenAt)}</dd>
                    <dt className="text-slate-500">Last ping</dt>
                    <dd className="text-right text-slate-400">{formatDate(plugin.lastSeenAt)}</dd>
                  </dl>
                </div>
              ))}
            </div>
            <p className="pt-3 text-[10px] text-slate-600">
              Server key {server.serverKey}, first seen {formatDate(server.firstSeenAt)}. The
              key is a one way hash; nothing here points back at an address.
            </p>
          </td>
        </tr>
      )}
    </>
  );
}

function AdminServersModal({ servers, liveWindowMinutes, initialPlugin = "all", onClose }) {
  const [query, setQuery] = useState("");
  const [pluginFilter, setPluginFilter] = useState(initialPlugin);
  const [liveOnly, setLiveOnly] = useState(false);
  const [openKey, setOpenKey] = useState(null);

  // Escape closes, and the page behind does not scroll while this is up.
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return (servers ?? []).filter((server) => {
      if (liveOnly && !server.live) return false;
      if (pluginFilter !== "all" && !server.plugins.some((p) => p.key === pluginFilter)) {
        return false;
      }
      if (needle === "") return true;

      const haystack = [
        server.serverName,
        server.serverVersion,
        server.country,
        ...server.plugins.map((p) => `${p.label} ${p.version ?? ""}`),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [servers, query, pluginFilter, liveOnly]);

  const liveCount = rows.filter((server) => server.live).length;

  // Only the plugins someone actually runs are offered as a filter.
  const filterable = PLUGINS.filter((plugin) =>
    (servers ?? []).some((server) => server.plugins.some((p) => p.key === plugin.key)),
  );

  const selectStyle = {
    fontSize: "11px",
    padding: "6px 8px",
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "rgb(203, 213, 225)",
    border: "1px solid rgba(51, 65, 85, 0.7)",
    borderRadius: 0,
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(0,0,0,0.85)] px-3 py-6 backdrop-blur-[2px] md:px-8"
      role="dialog"
      aria-modal="true"
      aria-label="Servers running the plugins"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative mx-auto flex max-w-6xl flex-col border border-slate-700/70 bg-[rgba(11,13,17,0.98)] shadow-[0_0_45px_rgba(0,0,0,0.8)]">
        <Corners accent="sky" />

        <header className="flex flex-wrap place-items-center gap-3 border-b border-slate-700/70 bg-white/[0.03] px-4 py-3">
          <i className="fa-solid fa-server text-xs text-sky-300" />
          <div>
            <h2 className="pixel-font text-[10px] tracking-widest text-slate-200 md:text-[12px]">
              SERVERS
            </h2>
            <p className="pt-1 text-[10px] text-slate-500">
              {formatNumber(rows.length)} of {formatNumber(servers?.length ?? 0)} shown,{" "}
              {formatNumber(liveCount)} live. Live is a ping in the last{" "}
              {liveWindowMinutes ?? 120} minutes.
            </p>
          </div>
          <div className="ml-auto">
            <PixelButton accent="slate" icon="fa-solid fa-xmark" onClick={onClose}>
              CLOSE
            </PixelButton>
          </div>
        </header>

        <div className="flex flex-wrap gap-2 border-b border-slate-800/70 px-4 py-3">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search name, version, country, plugin"
            aria-label="Search servers"
            style={{ ...selectStyle, minWidth: 220, flex: "1 1 220px" }}
          />
          <select
            value={pluginFilter}
            onChange={(event) => setPluginFilter(event.target.value)}
            aria-label="Filter by plugin"
            style={selectStyle}
          >
            <option value="all">Every plugin</option>
            {filterable.map((plugin) => (
              <option key={plugin.key} value={plugin.key}>
                {plugin.label}
              </option>
            ))}
          </select>
          <label className="flex cursor-pointer place-items-center gap-2 text-[11px] text-slate-400">
            <input
              type="checkbox"
              checked={liveOnly}
              onChange={(event) => setLiveOnly(event.target.checked)}
              className="accent-sky-400"
            />
            Live only
          </label>
        </div>

        <div className="max-h-[70vh] overflow-auto">
          {rows.length === 0 ? (
            <p className="py-10 text-center text-[11px] text-slate-600">
              {servers?.length ? "Nothing matches that filter." : "No server has pinged yet."}
            </p>
          ) : (
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead className="sticky top-0 bg-[rgb(11,13,17)]">
                <tr className="border-b border-slate-700/70">
                  {HEADINGS.map(([heading, align]) => (
                    <th
                      key={heading || "live"}
                      scope="col"
                      className={`px-2 py-2 text-[9px] tracking-widest text-slate-500 uppercase ${align}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((server) => (
                  <ServerRow
                    key={server.serverKey}
                    server={server}
                    open={openKey === server.serverKey}
                    onToggle={() =>
                      setOpenKey((current) =>
                        current === server.serverKey ? null : server.serverKey,
                      )
                    }
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminServersModal;
