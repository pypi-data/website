import TotalStats from "@/app/stats/total_stats";
import getStats from "@/app/stats/stats";

export default async function Home() {
    const data = await getStats();
    const chartData = data.stats_over_time.sort((a, b) => a.month < b.month ? -1 : 1);
    const lastMonth = chartData[chartData.length - 2];

    return (
        <>
            <h1>Hello World</h1>
            <TotalStats stats={data.total_stats[0]} lastMonth={lastMonth}/>
        </>
    )
}
