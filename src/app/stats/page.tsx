import getStats from "@/app/stats/stats";
import TotalStats from "@/app/stats/total_stats";
import StatsTable from "@/app/stats/stats_table";
import Chart from "@/app/stats/chart";


// const data2 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

export default async function Page() {
    const data = await getStats();
    const chartData = data.stats_over_time.sort((a, b) => a.month < b.month ? -1 : 1);

    const lastMonth = chartData[chartData.length - 1];

    return (
        <>
            <h1>Stats</h1>
            <TotalStats stats={data.total_stats[0]} lastMonth={lastMonth}/>

            <h1>Uploads Over time</h1>
            <Chart chartData={chartData} valueName="total_uploads"/>

            <h1>Files Over time</h1>
            <Chart chartData={chartData} valueName="total_files"/>

            <h1>Total Size Over time</h1>
            <Chart chartData={chartData} valueName="total_size"/>

            <h1>Total Lines Over time</h1>
            <Chart chartData={chartData} valueName="total_lines"/>

            <h1>Skipped files by extensions</h1>
            <StatsTable stats={data.skipped_files_stats} primary={"extension"}/>

            <h1>Binary files</h1>
            <StatsTable stats={data.binary_extension_stats} primary={"extension"}/>

            <h1>Stats By Extensions</h1>
            <StatsTable stats={data.extension_stats} primary={"extension"}/>

            <h1>Stats By Projects</h1>
            <StatsTable stats={data.projects_by_files} primary={"project_name"}/>
        </>
    )
}
