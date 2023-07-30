'use client'

import {Chart} from "@/app/stats/chart";
import {useState} from "react";

export default function ChartScroll({chartData, charts}: { chartData: any[], charts: { name: string, valueNames: string[] }[] }) {
    const [chartIndex, setChartIndex] = useState(0);
    const selectedValueNames = charts[chartIndex].valueNames;

    return (
        <>
            <div className="grid grid-flow-col grid-cols-min auto-rows-min">
                {charts.map((chart, index) => {
                    const isSelected = index === chartIndex;
                    return (
                        <div className={"p-4"} key={`chart-${index}`}>
                            <button onClick={() => setChartIndex(index)}>
                                <h1 className={isSelected ? "font-bold" : "font-light"}>{chart.name}</h1>
                            </button>
                        </div>
                    )
                })}
            </div>
            <Chart chartData={chartData} valueNames={selectedValueNames}/>
        </>
    )
}
