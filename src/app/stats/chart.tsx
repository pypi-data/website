"use client";
import {
  CartesianGrid,
  Cell,
  Customized,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart as RechartPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import byteSize from "byte-size";
import { cumulative_sum } from "@/app/stats/utils";
import { genColours } from "./colours";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#ff5100", "#FF8042"];

export function Chart({
  chartData,
  valueNames,
  cumulative = false,
  formats = {},
  showValueHeader,
}: {
  chartData: { [key: string]: string | number }[];
  valueNames: string[];
  cumulative?: boolean;
  formats?: { [key: string]: "bytes" };
  showValueHeader?: (value: { [key: string]: string | number }) => string;
}) {
  // remove null values from the chartData array, stopping after first non-null value is found
  const firstNonNullIndex = chartData.findIndex((value) => {
    for (const valueName of valueNames) {
      if (value[valueName] !== 0) {
        return true;
      }
    }
    return false;
  });
  if (firstNonNullIndex > 0) {
    chartData = chartData.slice(firstNonNullIndex);
  }

  if (cumulative) {
    chartData = cumulative_sum(chartData, valueNames);
  }

  const colours = genColours(valueNames.length);

  return (
    <>
      {showValueHeader && <h2 className={"text-center"}>{showValueHeader(chartData[chartData.length - 1])}</h2>}
      <ResponsiveContainer width="90%" height={400}>
        <LineChart key={`${valueNames}`} data={chartData}>
          {valueNames.map((valueName, index) => {
            const name = valueName.replaceAll("_", " ");
            return (
              <Line
                key={valueName}
                animationDuration={750}
                type="monotone"
                name={name}
                stroke={colours[index]}
                dataKey={valueName}
                dot={false}
              />
            );
          })}
          <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
          <XAxis dataKey="month" />
          <YAxis
            tick={{ fontSize: 10 }}
            tickFormatter={(value, _) => {
              // @ts-ignore
              return new Intl.NumberFormat("en").format(value);
            }}
          />
          <Tooltip
            formatter={(value, name, item) => {
              // @ts-ignore
              if (formats[item.dataKey] == "bytes" && typeof value === "number") {
                return byteSize(value, { precision: 2, units: "iec" }).toString();
              }
              // @ts-ignore
              return new Intl.NumberFormat("en").format(value);
            }}
          />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export function PieChart({
  chartData,
  dataKey,
  nameKey,
  limit,
}: {
  chartData: any[];
  dataKey: string;
  nameKey: string;
  limit?: number;
}) {
  if (limit) {
    let rest_total = chartData.slice(limit, chartData.length).reduce((acc, value) => acc + value[dataKey], 0);
    let rest_item = {
      [nameKey]: "Other",
      [dataKey]: rest_total,
    };
    chartData = [...chartData.slice(0, limit), rest_item];
  }

  const colours = genColours(chartData.length);

  return (
    <div>
      <ResponsiveContainer width="100%" height={400}>
        <RechartPieChart>
          <Pie
            data={chartData}
            nameKey={nameKey}
            dataKey={dataKey}
            isAnimationActive={false}
            // outerRadius={120}
            fill="#8884d8"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colours[index]} />
            ))}
            {/*<LabelList className={"invisible md:visible"} dataKey={nameKey} position="outside" stroke={""} />*/}
          </Pie>
          <Tooltip cursor={false} />
          <Legend />
        </RechartPieChart>
      </ResponsiveContainer>
    </div>
  );
}
