import { useMemo, useState } from "react";
import { ChartPanel, formatNumber } from "./AdminCharts";
import { CHART_INK, PLUGIN_SERIES, TOOLTIP_STYLE, useChart } from "./adminChartSetup";
import { PLUGINS } from "../../../../shared/plugins";

/**
 * Servers running each plugin, over time.
 *
 * One stacked bar per hour or per day, one segment per plugin, every plugin
 * in the same colour on every range. The height of a bar is the number of
 * plugin installs that were up, which is what the plugins actually report; a
 * server running two of them is in two segments. The distinct server count is
 * in the tooltip, so the honest number is one hover away and the chart does
 * not pretend to be it.
 *
 * The hourly rows only cover the last week. A per hour bar over a month is
 * narrower than a pixel, so the longer ranges switch to days.
 */

const RANGES = [
  { key: "24h", label: "24H", source: "hourly", take: 24 },
  { key: "7d", label: "7D", source: "hourly", take: 24 * 7 },
  { key: "30d", label: "30D", source: "daily", take: 30 },
  { key: "90d", label: "90D", source: "daily", take: 90 },
];

/** "2026-09-11T14:00:00.000Z" to "11 Sep 14:00" or "2026-09-11" to "11 Sep". */
function bucketLabel(value, source) {
  const date = new Date(source === "hourly" ? value : `${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return String(value);

  if (source === "hourly") {
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }

  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

/**
 * The x axis only needs a handful of ticks. Over a day the hour is enough;
 * over a week the ticks land on different days and read backwards without
 * the date on them.
 */
function tickLabel(value, source, span) {
  const date = new Date(source === "hourly" ? value : `${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return String(value);

  if (source === "hourly") {
    return date.toLocaleString("en-GB", {
      ...(span > 24 ? { day: "numeric", month: "short" } : {}),
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    });
  }

  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

function AdminPluginChart({ hourly, daily }) {
  const [range, setRange] = useState("7d");
  const active = RANGES.find((entry) => entry.key === range) ?? RANGES[1];

  const rows = useMemo(() => {
    const source = active.source === "hourly" ? (hourly?.rows ?? []) : (daily?.rows ?? []);
    return source.slice(-active.take);
  }, [active, hourly, daily]);

  // Only the plugins that ever appear in the window get a series, so the
  // legend is not seven entries for a chart with two colours in it. Order is
  // always the shared one, so the stack reads the same on every range.
  const present = useMemo(
    () =>
      PLUGINS.filter((plugin) =>
        rows.some((row) => Number(row.byPlugin?.[plugin.key]) > 0),
      ),
    [rows],
  );

  const canvasRef = useChart(
    () => ({
      type: "bar",
      data: {
        labels: rows.map((row) => row.hour ?? row.day),
        datasets: present.map((plugin) => ({
          label: plugin.label,
          data: rows.map((row) => Number(row.byPlugin?.[plugin.key]) || 0),
          backgroundColor: PLUGIN_SERIES[plugin.key],
          hoverBackgroundColor: PLUGIN_SERIES[plugin.key],
          // A 2px gap of surface between segments, so a stack of two similar
          // colours still reads as two.
          borderColor: CHART_INK.surface,
          borderWidth: { top: 2, left: 0, right: 0, bottom: 0 },
          // Chart.js only rounds the outermost segment of a stack, so the
          // bar ends in a 4px radius and sits flat on the baseline.
          borderSkipped: "start",
          borderRadius: 4,
          barPercentage: 0.8,
          categoryPercentage: 0.9,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            display: present.length > 1,
            position: "top",
            align: "end",
            labels: {
              color: CHART_INK.text,
              boxWidth: 8,
              boxHeight: 8,
              usePointStyle: true,
              pointStyle: "rect",
              font: { size: 10 },
              padding: 12,
            },
          },
          tooltip: {
            ...TOOLTIP_STYLE,
            itemSort: (a, b) => b.datasetIndex - a.datasetIndex,
            // A plugin with nothing in this bucket has no line in the tooltip.
            filter: (item) => item.parsed.y > 0,
            callbacks: {
              title: (items) => {
                const label = items[0]?.label;
                return label ? bucketLabel(label, active.source) : "";
              },
              label: (item) => ` ${item.dataset.label}: ${formatNumber(item.parsed.y)}`,
              footer: (items) => {
                const row = rows[items[0]?.dataIndex ?? -1];
                if (!row) return "";
                return `Distinct servers: ${formatNumber(row.total)}`;
              },
            },
            footerColor: CHART_INK.text,
            footerFont: { size: 10, weight: "normal" },
            footerMarginTop: 6,
          },
        },
        scales: {
          x: {
            stacked: true,
            grid: { display: false },
            border: { color: CHART_INK.grid },
            ticks: {
              color: CHART_INK.muted,
              font: { size: 9 },
              maxTicksLimit: 8,
              maxRotation: 0,
              autoSkip: true,
              callback(value) {
                return tickLabel(this.getLabelForValue(value), active.source, active.take);
              },
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            grid: { color: CHART_INK.grid },
            border: { display: false },
            ticks: {
              color: CHART_INK.muted,
              font: { size: 9 },
              maxTicksLimit: 5,
              precision: 0,
              callback: (value) => formatNumber(value),
            },
          },
        },
      },
    }),
    [rows, present, active],
  );

  const peak = rows.reduce((best, row) => Math.max(best, Number(row.total) || 0), 0);

  return (
    <ChartPanel
      title="SERVERS OVER TIME"
      subtitle={`Plugin installs reporting in, per ${
        active.source === "hourly" ? "hour" : "day"
      }, UTC. Hover a bar for the distinct server count`}
      accent="sky"
      actions={
        <div className="flex gap-1" role="group" aria-label="Range">
          {RANGES.map((entry) => (
            <button
              key={entry.key}
              type="button"
              onClick={() => setRange(entry.key)}
              aria-pressed={range === entry.key}
              style={{ fontSize: "9px", padding: "4px 8px", borderWidth: 1 }}
              className={`pixel-font rounded-none border tracking-widest transition-colors ${
                range === entry.key
                  ? "border-sky-400/70 bg-sky-500/15 text-sky-200"
                  : "border-slate-700/70 bg-transparent text-slate-500 hover:text-slate-300"
              }`}
            >
              {entry.label}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-2">
        <div className="relative h-[220px] w-full md:h-[260px]">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label={`Plugin installs reporting per ${
              active.source === "hourly" ? "hour" : "day"
            }, stacked by plugin`}
          />
        </div>
        <p className="text-[10px] text-slate-600">
          {peak > 0
            ? `Peak of ${formatNumber(peak)} distinct server${peak === 1 ? "" : "s"} in this range.`
            : "No pings in this range yet."}
        </p>
      </div>
    </ChartPanel>
  );
}

export default AdminPluginChart;
