import { useEffect, useRef } from "react";
import {
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
 * Chart.js is tree shakeable, so the line chart and the choropleth each cost
 * only the controllers, elements and scales they use. Nothing imports
 * "chart.js/auto", which would pull in every chart type for the two in use.
 * This module is only ever reached through the lazy loaded admin page, so a
 * normal visitor never downloads any of it.
 */

Chart.register(
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
