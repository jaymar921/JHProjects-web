import { useEffect, useRef } from "react";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import {
  ChoroplethController,
  ColorScale,
  GeoFeature,
  ProjectionScale,
} from "chartjs-chart-geo";

/**
 * Chart.js, registered once, with only the pieces the dashboard draws.
 *
 * Chart.js is tree shakeable, so the line chart, the stacked bars and the
 * choropleth each cost only the controllers, elements and scales they use.
 * Nothing imports "chart.js/auto", which would pull in every chart type for
 * the three in use.
 * This module is only ever reached through the lazy loaded admin page, so a
 * normal visitor never downloads any of it.
 */

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Filler,
  Legend,
  Tooltip,
  ChoroplethController,
  ColorScale,
  GeoFeature,
  ProjectionScale,
);

/** The text and line colours the charts share with the rest of the dashboard. */
export const CHART_INK = {
  text: "rgb(148, 163, 184)", // slate-400
  muted: "rgb(100, 116, 139)", // slate-500
  grid: "rgba(148, 163, 184, 0.12)",
  surface: "rgb(11, 13, 17)",
  tooltipBg: "rgba(11, 13, 17, 0.96)",
  tooltipBorder: "rgba(148, 163, 184, 0.35)",
};

/** The two series colours, the same steps whichever chart is drawing them. */
export const SERIES = {
  views: "#0284c7", // sky-600
  clicks: "#d97706", // amber-600
};

/**
 * One colour per plugin, in the order of shared/plugins.js, so a plugin keeps
 * its colour whichever of them are on screen. The seven were checked as a set
 * against the chart surface: every neighbouring pair stays apart under
 * simulated colour blindness, and every one clears 3:1 on the surface. The
 * legend and the tooltip name each series, so colour is never the only way to
 * tell them apart.
 */
export const PLUGIN_SERIES = {
  "ce3-lite": "#3987e5",
  "ce3-premium": "#d95926",
  "emr-lite": "#199e70",
  "emr-premium": "#c98500",
  "ft-lite": "#d55181",
  "ft-premium": "#008300",
  kd: "#9085e9",
};

/** The tooltip box, styled like the rest of the page rather than Chart.js's default. */
export const TOOLTIP_STYLE = {
  backgroundColor: CHART_INK.tooltipBg,
  borderColor: CHART_INK.tooltipBorder,
  borderWidth: 1,
  cornerRadius: 0,
  padding: 8,
  titleColor: "rgb(226, 232, 240)",
  titleFont: { size: 11 },
  bodyColor: CHART_INK.text,
  bodyFont: { size: 11 },
  displayColors: true,
  boxWidth: 8,
  boxHeight: 8,
  boxPadding: 4,
};

/**
 * Owns one Chart.js instance on a canvas. The chart is created when the
 * canvas mounts and destroyed when it unmounts; between those, a change to
 * the config is applied with update() rather than by tearing the chart down,
 * so a quiet refresh does not make the map flash.
 *
 * `build` returns the config for `new Chart(...)`. It is called once per
 * config change, and the result's data and options are copied onto the live
 * chart when one already exists.
 */
export function useChart(build, deps) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const config = build();

    if (chartRef.current) {
      chartRef.current.data = config.data;
      chartRef.current.options = config.options;
      chartRef.current.update();
      return undefined;
    }

    chartRef.current = new Chart(canvas, config);

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(
    () => () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    },
    [],
  );

  return canvasRef;
}
