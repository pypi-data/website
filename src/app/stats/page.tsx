import getStats from "@/app/stats/stats";
import TotalStats from "@/app/stats/total_stats";
import Chart from "@/app/stats/chart";
import Table from "@/app/table";


// const data2 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

export default async function Page() {
    const data = await getStats();
    const chartData = data.stats_over_time.sort((a, b) => a.month < b.month ? -1 : 1);

    const secretTypesResponse = await fetch("https://raw.githubusercontent.com/pypi-data/data/main/stats/github_secret_totals.json");
    const secretTypes: Map<string, number> = await secretTypesResponse.json();
    const secretTypesTable = Object.entries(secretTypes).sort((a, b) => a[1] < b[1] ? 1 : -1).map(([type, count]) => ({
        type,
        count
    }));

    const lastMonth = chartData[chartData.length - 1];

    return (
        <>
            <h1>The contents of PyPI, in numbers</h1>
            <TotalStats stats={data.total_stats[0]} lastMonth={lastMonth}/>

            <h1>Secrets</h1>
            <Table data={secretTypesTable} columns={[{name: "type"}, {name: "count"}]}/>

            <h1>Skipped files by extensions</h1>
            <Table data={data.skipped_files_stats}
                   columns={[
                       {name: "extension"},
                       {name: "total_files"},
                       {name: "total_lines"},
                       {name: "total_size", type: "bytes"},
                       {name: "unique_files"}]}/>

            <h1>Binary files</h1>
            <Table data={data.binary_extension_stats} columns={[
                {name: "extension"},
                {name: "total_files"},
                {name: "total_size", type: "bytes"},
                {name: "unique_files"}]}/>

            <h1>Stats By Extensions</h1>
            <Table data={data.extension_stats} columns={[
                {name: "extension"},
                {name: "total_files"},
                {name: "total_lines"},
                {name: "total_size", type: "bytes"},
                {name: "unique_files"}]}/>

            <h1>Stats By Projects</h1>
            <Table data={data.projects_by_files} columns={[
                {name: "project_name"},
                {name: "total_files"},
                {name: "total_lines"},
                {name: "total_size", type: "bytes"},
                {name: "unique_files"}
            ]}/>

            <h1>Uploads Over time</h1>
            <Chart chartData={chartData} valueName="total_uploads"/>

            <h1>Files Over time</h1>
            <Chart chartData={chartData} valueName="total_files"/>

            <h1>Total Size Over time</h1>
            <Chart chartData={chartData} valueName="total_size"/>

            <h1>Total Lines Over time</h1>
            <Chart chartData={chartData} valueName="total_lines"/>

        </>
    )
}
