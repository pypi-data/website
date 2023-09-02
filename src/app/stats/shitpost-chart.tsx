"use client";

import ChartScroll from "@/app/stats/chart-scroll";
import React, { useEffect, useState } from "react";

function easeInExpo(x: number) {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

export default function ShitpostChart({
  chartData,
  extrapolated,
  years,
  future_value,
}: {
  chartData: any[];
  extrapolated: { month: string; new_releases: number; total_size: number; total_files: number }[];
  years: number;
  future_value: number;
}) {
  let [seeExtrapolate, setSeeExtrapolate] = useState(false);
  let [extrapolatedIndex, setExtrapolatedIndex] = useState(chartData.length);
  const extrapolatedLength = extrapolated.length - chartData.length;
  const extrapolatedOffset = extrapolatedIndex - chartData.length;

  const percentDone = extrapolatedOffset / extrapolatedLength;
  const percentLeft = 1 - percentDone;

  const humans = 8_000_000_000;
  const packages_per_human = future_value / humans;

  useEffect(() => {
    if (!seeExtrapolate && extrapolatedIndex !== 0) {
      setExtrapolatedIndex(chartData.length);
    }
  }, [seeExtrapolate, chartData, extrapolatedIndex]);

  useEffect(() => {
    if (seeExtrapolate && extrapolatedIndex < extrapolated.length - 1) {
      const timer = setTimeout(() => setExtrapolatedIndex(extrapolatedIndex + 1), easeInExpo(percentLeft) * 750);
      return () => clearTimeout(timer);
    }
  }, [percentLeft, chartData, extrapolated, seeExtrapolate, extrapolatedIndex]);

  const time = extrapolated[extrapolatedIndex].month;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div>
          <ChartScroll
            chartData={extrapolated.slice(0, extrapolatedIndex)}
            cumulative={true}
            showValueHeader={({ new_releases }) =>
              Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "long",
                maximumFractionDigits: 2,
                // @ts-ignore
              }).format(new_releases)
            }
            formats={{ total_size: "bytes" }}
            charts={[{ name: "Releases", valueNames: ["new_releases"] }]}
          />
        </div>
        <div>
          <ChartScroll
            chartData={extrapolated.slice(0, extrapolatedIndex)}
            cumulative={true}
            showValueHeader={({ total_size }) =>
              Intl.NumberFormat("en", {
                notation: "compact",
                style: "unit",
                unit: "byte",
                unitDisplay: "narrow",
                // @ts-ignore
              }).format(total_size)
            }
            formats={{ total_size: "bytes" }}
            charts={[{ name: "Size", valueNames: ["total_size"] }]}
          />
        </div>
        <div>
          <ChartScroll
            chartData={extrapolated.slice(0, extrapolatedIndex)}
            cumulative={true}
            showValueHeader={({ total_files }) =>
              Intl.NumberFormat("en-US", {
                notation: "compact",
                compactDisplay: "long",
                maximumFractionDigits: 1,
                // @ts-ignore
              }).format(total_files)
            }
            formats={{ total_size: "bytes" }}
            charts={[{ name: "Files", valueNames: ["total_files"] }]}
          />
        </div>
      </div>
      <h4 className={"text-center font-bold mb-3"}>
        PyPI is growing fast. If this dangerous expansion not stopped, our advanced machine learning models predict that
        in only {years} years the number of packages will outnumber human beings.
      </h4>
      <div className="text-center">
        <a onClick={() => setSeeExtrapolate(!seeExtrapolate)} className="btn btn-primary btn-sm text-center">
          {seeExtrapolate ? `Take me back! (Date: ${time})` : "Witness this inevitable future"}
        </a>
      </div>
    </>
  );
}
