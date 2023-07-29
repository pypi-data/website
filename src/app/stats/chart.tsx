'use client'
import {LineChart, Line, XAxis, YAxis, ResponsiveContainer} from 'recharts';

export default function Chart({chartData, valueName}: { chartData: any[], valueName: string }) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
                <Line type="monotone" dataKey={valueName} stroke="#8884d8" dot={false}/>
                <XAxis dataKey="month"/>
                <YAxis/>
            </LineChart>
        </ResponsiveContainer>

    )
}
