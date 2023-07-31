'use client'

import {Chart} from "@/app/stats/chart";
import {useState} from "react";
import ShowSQL from "@/app/stats/sql";

interface ChartScrollProps {
    chartData: any[];
    charts: { name: string, valueNames: string[]}[];
    formats?: {[key: string]: 'bytes'},
    sqlData?: string;
    cumulative?: boolean;
}

export default function ChartScroll({chartData, charts, sqlData, cumulative = false, formats={}}: ChartScrollProps) {
    const [chartIndex, setChartIndex] = useState(0);
    const selectedValueNames = charts[chartIndex].valueNames;

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
                    )
                })}
            </div>
            <Chart chartData={chartData} valueNames={selectedValueNames} cumulative={cumulative} formats={formats}/>
            {sqlData && (<ShowSQL sqlData={sqlData}/>)}
        </>
    )
}
