import { useMemo } from "react";
import { ChartPanel, StatTile, formatNumber } from "./AdminCharts";
import { CHART_INK, SERIES, TOOLTIP_STYLE, useChart } from "./adminChartSetup";

/**
 * The last thirty days, one point per day.
 *
 * The counters say how many, ever. This says whether that was a steady trickle
 * or one busy week after a Spigot post, which is the question a total cannot
 * answer. Two lines, views and clicks, on one axis; clicks are a fraction of
 * views, so the second line sits low, and that is the honest picture. A
 * second axis would make them look the same size.
 *
 * Every day is present in the data even when nothing happened, so a quiet
 * week is a flat line at zero and not a gap.
 */

/** "2026-09-11" to "11 Sep", read as UTC so the label matches the bucket. */
function shortDay(iso) {
  const date = new Date(`${iso}T00:00:00Z`);
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
}

function sumOf(rows, key) {
  return rows.reduce((sum, row) => sum + (Number(row[key]) || 0), 0);
}

function AdminTimeline({ daily }) {
  const rows = useMemo(() => daily?.rows ?? [], [daily]);

  const last7 = rows.slice(-7);
  const previous7 = rows.slice(-14, -7);
  const today = rows[rows.length - 1];

  const canvasRef = useChart(
    () => ({
      type: "line",
      data: {
        labels: rows.map((row) => row.day),
        datasets: [
          {
            label: "Views",
            data: rows.map((row) => row.views),
            borderColor: SERIES.views,
            backgroundColor: "rgba(2, 132, 199, 0.12)",
            fill: true,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: SERIES.views,
            pointHoverBorderColor: CHART_INK.surface,
            pointHoverBorderWidth: 2,
            cubicInterpolationMode: "monotone",
          },
          {
            label: "Clicks",
            data: rows.map((row) => row.clicks),
            borderColor: SERIES.clicks,
            backgroundColor: "transparent",
            fill: false,
            borderWidth: 2,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: SERIES.clicks,
            pointHoverBorderColor: CHART_INK.surface,
            pointHoverBorderWidth: 2,
            cubicInterpolationMode: "monotone",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: {
            display: true,
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
            callbacks: {
              title: (items) => {
                const day = items[0]?.label;
                return day ? shortDay(day) : "";
              },
              label: (item) => ` ${item.dataset.label}: ${formatNumber(item.parsed.y)}`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { color: CHART_INK.grid },
            ticks: {
              color: CHART_INK.muted,
              font: { size: 9 },
              maxTicksLimit: 8,
              maxRotation: 0,
              callback(value) {
                return shortDay(this.getLabelForValue(value));
              },
            },
          },
          y: {
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
    [rows],
  );

  return (
    <ChartPanel
      title={`LAST ${daily?.days ?? 30} DAYS`}
      subtitle="Views and clicks per day, UTC. Raw events only, so this covers the retention window and not all time"
      accent="sky"
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatTile
            icon="fa-solid fa-calendar-day"
            label="Views today"
            value={today?.views}
            accent="sky"
          />
          <StatTile
            icon="fa-solid fa-hand-pointer"
            label="Clicks today"
            value={today?.clicks}
            accent="amber"
          />
          <StatTile
            icon="fa-solid fa-calendar-week"
            label="Views, 7 days"
            value={sumOf(last7, "views")}
            hint={`${formatNumber(sumOf(previous7, "views"))} the week before`}
            accent="sky"
          />
          <StatTile
            icon="fa-solid fa-download"
            label="Downloads, 7 days"
            value={sumOf(last7, "download")}
            hint={`${formatNumber(sumOf(previous7, "download"))} the week before`}
            accent="amber"
          />
        </div>

        <div className="relative h-[220px] w-full md:h-[260px]">
          <canvas ref={canvasRef} role="img" aria-label="Views and clicks per day for the last 30 days" />
        </div>
      </div>
    </ChartPanel>
  );
}

export default AdminTimeline;
