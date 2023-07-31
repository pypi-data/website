'use client'
import {
    Cell, Label, LabelList,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart as RechartPieChart,
    ResponsiveContainer, Text, Tooltip,
    XAxis,
    YAxis
} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#ff5100', '#FF8042'];

export function Chart({chartData, valueNames}: { chartData: any[], valueNames: string[] }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
                {valueNames.map((valueName, index) => (
                    <Line key={`chart-${index}`} type="monotone" stroke={COLORS[index]} dataKey={valueName} dot={false}/>
                ))}
                <XAxis dataKey="month"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    )
}


export function PieChart({chartData, dataKey, nameKey}: { chartData: any[], dataKey: string, nameKey: string }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <RechartPieChart>
                <Pie data={chartData}
                     nameKey={nameKey}
                     dataKey={dataKey}
                     isAnimationActive={false}
                     outerRadius={120} fill="#8884d8">
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                    ))}
                    <LabelList dataKey={nameKey} position="outside" stroke={""}/>
                </Pie>
            </RechartPieChart>
            {/*<LineChart data={chartData}>*/}
            {/*  <Line type="monotone" dataKey={valueName} stroke="#8884d8" dot={false}/>*/}
            {/*  <XAxis dataKey="month"/>*/}
            {/*  <YAxis/>*/}
            {/*</LineChart>*/}
        </ResponsiveContainer>
    )
}
