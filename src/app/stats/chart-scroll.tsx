"use client";

import { Chart } from "@/app/stats/chart";
import { useEffect, useState } from "react";
import ShowSQL from "@/app/stats/sql";

interface ChartScrollProps {
  chartData: any[];
  charts: { name: string; valueNames: string[] }[];
  formats?: { [key: string]: "bytes" };
  sqlData?: string;
  cumulative?: boolean;
  showValueHeader?: (value: { [key: string]: string | number }) => string;
}

export default function ChartScroll({
  chartData,
  charts,
  sqlData,
  cumulative = false,
  formats = {},
  showValueHeader,
}: ChartScrollProps) {
  const [chartIndex, setChartIndex] = useState(0);
  useEffect(() => {
    setChartIndex(0);
  }, [charts]);
  const selectedValueNames = chartIndex < charts.length ? charts[chartIndex].valueNames : charts[0].valueNames;

  return (
    <>
      <div className="grid grid-flow-col grid-cols-min auto-rows-min text-center">
        {charts.map((chart, index) => {
          const isSelected = index === chartIndex;
          return (
            <div className={"p-4"} key={`chart-${index}`}>
              <button onClick={() => setChartIndex(index)}>
                <h1 className={isSelected ? "font-bold" : "font-light"}>{chart.name}</h1>
              </button>
            </div>
          );
        })}
      </div>
      <Chart
        chartData={chartData}
        valueNames={selectedValueNames}
        cumulative={cumulative}
        formats={formats}
        showValueHeader={showValueHeader}
      />
      {sqlData && <ShowSQL sqlData={sqlData} />}
    </>
  );
}
