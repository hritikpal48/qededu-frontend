"use client";
import React, { useMemo } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
// :white_check_mark: Safely initialize annotations module
try {
  const AnnotationsModule = require("highcharts/modules/annotations");
  if (typeof AnnotationsModule === "function") {
    AnnotationsModule(Highcharts);
  }
} catch (error) {
  console.warn("Annotations module could not be loaded:", error);
}
type StockChartProps = {
  name: string;
  series: Array<[number, number]> | null | undefined;
  flags?: Array<{ x: number; title: string; text: string }>;
  className?: string;
};
const CommonHighChart: React.FC<StockChartProps> = ({
  name,
  series,
  flags = [],
  className = "h-96 w-full",
}) => {
  const chartOptions = useMemo((): Highcharts.Options => {
    // :white_check_mark: Validate & sort data
    const validSeries = Array.isArray(series)
      ? series
        .filter(([timestamp, price]) => Number.isFinite(timestamp) && Number.isFinite(price))
        .sort(([a], [b]) => a - b)
      : [];
    if (validSeries.length === 0) {
      return {
        chart: { backgroundColor: "#FFFFFF" },
        title: { text: "No Data Available" },
        credits: { enabled: false },
      };
    }
    const currentPrice = validSeries[validSeries.length - 1]?.[1] ?? 0;
    // :white_check_mark: Main price series
    const chartSeries: Highcharts.SeriesOptionsType[] = [
      {
        type: "line",
        name: name || "Stock Price",
        id: "dataseries", // VERY IMPORTANT for flags to attach correctly
        data: validSeries,
        color: "#22C55E",
        lineWidth: 2,
        marker: { enabled: false },
        tooltip: { valueDecimals: 2 },
      } as Highcharts.SeriesLineOptions,
    ];
    // :white_check_mark: Add flags (if any)
    if (flags.length > 0) {
      chartSeries.push({
        type: "flags",
        name: "Events",
        data: flags.map((flag) => ({
          x: flag.x,
          title: flag.title,
          text: flag.text,
        })),
        onSeries: "dataseries", // link to main series
        shape: "circlepin",
        width: 16,
        height: 16,
        fillColor: "#22C55E",
        color: "#22C55E",
        style: { color: "#FFFFFF", fontWeight: "bold" },
        allowOverlapX: false,
        showInLegend: false,
        tooltip: {
          pointFormat: "<b>{point.title}</b><br/>{point.text}",
          useHTML: true
        },
      } as Highcharts.SeriesFlagsOptions);
    }
    return {
      chart: {
        height: 400,
        backgroundColor: "#FFFFFF",
        style: { fontFamily: "Inter, sans-serif" },
        spacingTop: 10,
      },
      rangeSelector: { enabled: false },
      navigator: {
        enabled: true,
        height: 20,
        maskFill: "rgba(34, 197, 94, 0.2)",
        series: {
          type: "area",
          color: "#22C55E",
          fillOpacity: 0.2,
          lineWidth: 1,
          data: validSeries,
        },
      },
      scrollbar: { enabled: false },
      title: {
        text: `${name} <span style="color:#22c55e;font-size:16px;font-weight:bold;">₹${currentPrice.toFixed(
          2
        )}</span>`,
        useHTML: true,
        align: "left",
      },
      xAxis: {
        type: "datetime",
        gridLineWidth: 0,
        crosshair: { width: 1, color: "#9CA3AF", dashStyle: "Dash" },
      },
      yAxis: {
        opposite: false,
        gridLineColor: "#F3F4F6",
        plotLines: [
          {
            color: "#22C55E",
            width: 1,
            dashStyle: "Dot",
            label: {
              text: `Current: ₹${currentPrice.toFixed(2)}`,
              align: "right",
              style: { color: "#22C55E", fontSize: "10px" },
            },
          },
        ],
      },
      tooltip: {
        shared: false, // Changed to false so flags can have their own tooltip
        useHTML: true,
        formatter: function () {
          const point = this as any; // Type assertion to avoid TS errors
          if (point.series?.type === 'flags') {
            // Custom formatting for flags
            return `<div style="text-align:center;">
              <div style="margin-top:4px;">${point.point?.text || 'No description'}</div>
              <div style="font-size:10px;color:#666;margin-top:4px;">
                ${Highcharts.dateFormat("%d %b %Y", point.x as number)}
              </div>
            </div>`;
          }
          // Default formatting for price series
          return `<div style="text-align:center;">
            <div style="font-weight:bold;">${Highcharts.dateFormat("%d %b %Y", point.x as number)}</div>
            <div style="color:#22c55e;font-weight:bold;">₹${point.y?.toFixed(2)}</div>
          </div>`;
        },
      },
      legend: { enabled: false },
      series: chartSeries,
      credits: { enabled: false },
    };
  }, [name, series, flags]);
  if (!series || series.length === 0) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-50 border rounded-lg`}>
        <span className="text-gray-400 text-sm">No chart data available</span>
      </div>
    );
  }
  return (
    <div className={className}>
      <HighchartsReact highcharts={Highcharts} constructorType="stockChart" options={chartOptions} />
    </div>
  );
};
export default CommonHighChart;