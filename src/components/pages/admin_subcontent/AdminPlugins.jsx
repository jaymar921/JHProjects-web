import { useCallback, useEffect, useState } from "react";
import { Note, Panel, PixelButton } from "../../page_components/PixelUIKit";
import { BarList, ChartPanel, StatTile, formatNumber, formatRelative, toRows } from "./AdminCharts";
import AdminPluginChart from "./AdminPluginChart";
import AdminServersModal from "./AdminServersModal";
import { countryName } from "./AdminWorldMap";
import { PLUGIN_SERIES } from "./adminChartSetup";
import { fetchPluginStats, isSignedOut } from "../../../lib/api/admin";

/**
 * The plugins, as seen from the servers that run them.
 *
 * Every running copy of a plugin pings the site once an hour, and this tab is
 * what those pings add up to: how many servers are up right now, how many
 * players are on them, which versions are out there and how many errors the
 * plugins have hit. Everything comes from one call to GET /api/stats/plugins,
 * fetched separately from the site analytics so a slow aggregation on one
 * side does not hold up the other.
 *
 * "Live" is a ping inside the last two hours. A plugin pings hourly, so that
 * is one missed heartbeat of grace before a server drops off the count.
 */

/** The daily series is always fetched for the whole retention window. */
const DAYS = 90;

/** A card per plugin, in the shared order, with its colour on the corner. */
function PluginCard({ plugin, onOpenServers }) {
  const versions = toRows(plugin.versions);
  const quiet = plugin.liveServers === 0 && plugin.servers24h === 0;

  return (
    <Panel accent="slate" className={`flex flex-col gap-3 p-4 ${quiet ? "opacity-60" : ""}`}>
      <div className="flex place-items-center gap-2">
        <span
          aria-hidden="true"
          className="inline-block h-2.5 w-2.5 shrink-0"
          style={{ backgroundColor: PLUGIN_SERIES[plugin.key] }}
        />
        <span className="pixel-font text-[9px] tracking-wider text-slate-200 md:text-[10px]">
          {plugin.label.toUpperCase()}
        </span>
        <span className="ml-auto text-[9px] tracking-widest text-slate-600 uppercase">
          {plugin.tier}
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div>
          <p className="text-[9px] tracking-widest text-slate-500 uppercase">Live</p>
          <p className="pixel-font pt-1 text-[14px] text-slate-100 tabular-nums">
            {formatNumber(plugin.liveServers)}
          </p>
        </div>
        <div>
          <p className="text-[9px] tracking-widest text-slate-500 uppercase">24h</p>
          <p className="pixel-font pt-1 text-[14px] text-slate-300 tabular-nums">
            {formatNumber(plugin.servers24h)}
          </p>
        </div>
        <div>
          <p className="text-[9px] tracking-widest text-slate-500 uppercase">Players</p>
          <p className="pixel-font pt-1 text-[14px] text-slate-300 tabular-nums">
            {formatNumber(plugin.players)}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 text-[10px] text-slate-500">
        <div className="flex justify-between">
          <span>Errors, 24h</span>
          <span className={plugin.errors24h > 0 ? "text-rose-300" : "text-slate-400"}>
            {formatNumber(plugin.errors24h)}
          </span>
        </div>
        {versions.length > 0 ? (
          versions
            .sort((a, b) => b.value - a.value)
            .slice(0, 3)
            .map((row) => (
              <div key={row.label} className="flex justify-between">
                <span>v{row.label}</span>
                <span className="text-slate-400 tabular-nums">{formatNumber(row.value)}</span>
              </div>
            ))
        ) : (
          <span className="text-slate-600">No live server</span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onOpenServers(plugin.key)}
        disabled={plugin.liveServers === 0 && plugin.servers24h === 0}
        style={{ border: "none", padding: 0, backgroundColor: "transparent", fontSize: "10px" }}
        className="mt-auto self-start text-sky-300 hover:text-sky-200 disabled:text-slate-700"
      >
        <i className="fa-solid fa-server pr-1.5" />
        servers
      </button>
    </Panel>
  );
}

function AdminPlugins({ onSignedOut }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [serversOpen, setServersOpen] = useState(false);
  const [initialPlugin, setInitialPlugin] = useState("all");

  const load = useCallback(
    async ({ quiet = false } = {}) => {
      if (!quiet) setLoading(true);
      setError(null);

      try {
        const payload = await fetchPluginStats({ days: DAYS });
        setData(payload);
        setUpdatedAt(new Date());
      } catch (failure) {
        if (isSignedOut(failure)) {
          onSignedOut?.();
          return;
        }
        setError(failure.message ?? "Could not load the plugin stats.");
      } finally {
        setLoading(false);
      }
    },
    [onSignedOut],
  );

  useEffect(() => {
    load();
  }, [load]);

  // The pings are hourly, so a refresh every five minutes is plenty, and only
  // while the tab is in front for the same reason the main dashboard does it.
  useEffect(() => {
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") load({ quiet: true });
    }, 5 * 60_000);

    return () => clearInterval(timer);
  }, [load]);

  function openServers(pluginKey = "all") {
    setInitialPlugin(pluginKey);
    setServersOpen(true);
  }

  const summary = data?.summary;
  const plugins = data?.plugins ?? [];
  const servers24h = plugins.reduce((sum, plugin) => sum + plugin.servers24h, 0);
  const errors24h = plugins.reduce((sum, plugin) => sum + plugin.errors24h, 0);
  const countries = toRows(summary?.countries).map((row) => ({
    ...row,
    label: row.label === "unknown" ? "unknown" : countryName(row.label),
  }));

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap place-items-center justify-between gap-3">
        <p className="text-[11px] text-slate-500">
          {updatedAt ? `Updated ${formatRelative(updatedAt)}. ` : ""}
          Each plugin pings once an hour from the server running it, and one ping is one
          server. Kept for {data?.retentionDays ?? 90} days, then dropped.
        </p>
        <div className="flex gap-2">
          <PixelButton
            accent="sky"
            icon={loading ? "fa-solid fa-circle-notch fa-spin" : "fa-solid fa-rotate"}
            onClick={() => load()}
            disabled={loading}
          >
            REFRESH
          </PixelButton>
          <PixelButton
            accent="sky"
            icon="fa-solid fa-server"
            onClick={() => openServers("all")}
            disabled={!data}
          >
            SERVERS
          </PixelButton>
        </div>
      </div>

      {error && (
        <Note accent="rose" icon="fa-solid fa-circle-exclamation">
          {error}
        </Note>
      )}

      {loading && !data ? (
        <Panel accent="slate" className="p-10 text-center">
          <i className="fa-solid fa-circle-notch fa-spin text-slate-500" />
          <p className="pt-3 text-[11px] text-slate-500">Reading the pings…</p>
        </Panel>
      ) : (
        data && (
          <>
            <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <StatTile
                icon="fa-solid fa-server"
                label="Live servers"
                value={summary?.liveServers}
                hint={`Pinged in the last ${data.liveWindowMinutes ?? 120} minutes`}
                accent="sky"
              />
              <StatTile
                icon="fa-solid fa-users"
                label="Players online"
                value={summary?.livePlayers}
                hint="Summed over the live servers"
                accent="sky"
              />
              <StatTile
                icon="fa-solid fa-plug"
                label="Installs, 24h"
                value={servers24h}
                hint={`${formatNumber(summary?.knownServers)} servers on file`}
                accent="sky"
              />
              <StatTile
                icon="fa-solid fa-triangle-exclamation"
                label="Errors, 24h"
                value={errors24h}
                hint="Reported by the plugins themselves"
                accent={errors24h > 0 ? "rose" : "sky"}
              />
            </section>

            <AdminPluginChart hourly={data.hourly} daily={data.daily} />

            <section className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
              {plugins.map((plugin) => (
                <PluginCard key={plugin.key} plugin={plugin} onOpenServers={openServers} />
              ))}
            </section>

            <div className="grid gap-4 md:grid-cols-2">
              <ChartPanel
                title="LIVE SERVERS BY PLUGIN"
                subtitle="A server running two plugins counts once for each"
                accent="sky"
              >
                <BarList
                  rows={plugins.map((plugin) => ({
                    label: plugin.label,
                    value: plugin.liveServers,
                  }))}
                  accent="sky"
                  empty="No server is live right now"
                />
              </ChartPanel>
              <ChartPanel
                title="WHERE THE SERVERS ARE"
                subtitle="Live servers by country, from the hosting edge"
                accent="emerald"
              >
                <BarList rows={countries} accent="emerald" empty="No live server to place" />
              </ChartPanel>
            </div>
          </>
        )
      )}

      {serversOpen && data && (
        <AdminServersModal
          servers={data.servers}
          liveWindowMinutes={data.liveWindowMinutes}
          initialPlugin={initialPlugin}
          onClose={() => setServersOpen(false)}
        />
      )}
    </div>
  );
}

export default AdminPlugins;
