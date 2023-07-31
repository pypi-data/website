import getStats from "@/app/stats/stats";
import TotalStats from "@/app/stats/total_stats";
import {Chart, PieChart} from "@/app/stats/chart";
import Table from "@/app/table";
import {InformationCircleIcon} from '@heroicons/react/24/solid'
import byteSize from "byte-size";
import ChartScroll from "@/app/stats/chart-scroll";

// const data2 = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}];

function InfoBubble({text}: { text: string }) {
    return (
        <div className="alert text-sm mb-2 p-3">
            <InformationCircleIcon width={24}/>
            <span>{text}</span>
        </div>
    )
}

export default async function Page() {
    const data = await getStats();
    const chartData = data.stats_over_time.sort((a, b) => a.month < b.month ? -1 : 1);
    const projectStats = data.project_level_breakdowns.sort((a, b) => a.month < b.month ? -1 : 1);

    const secretTypesResponse = await fetch("https://raw.githubusercontent.com/pypi-data/data/main/stats/github_secret_totals.json");
    const secretTypes: Map<string, number> = await secretTypesResponse.json();
    const secretTypesTable = Object.entries(secretTypes).sort((a, b) => a[1] < b[1] ? 1 : -1).map(([type, count]) => ({
        type,
        count
    }));

    const lastMonth = chartData[chartData.length - 1];

    const binarySizes = data.binary_sizes.map((el) => {
        const is_binary = el.is_binary ? "Binary" : "Text";
        const text = `${is_binary}: ${byteSize(el.total_size, {precision: 1, units: "iec"})}`
        return {
            ...el,
            text
        }
    });

    const tensorflow_total_size = data.projects_by_files.filter((el) => el.project_name.startsWith("tf-") || el.project_name.startsWith("tensorflow-")).reduce((acc, el) => acc + el.total_size, 0)
    const total_size = binarySizes.reduce((acc, el) => acc + el.total_size, 0);
    const tensorflow_percentage = Math.round((tensorflow_total_size / total_size) * 100);
    const tensorflow_human_size = byteSize(tensorflow_total_size, {precision: 1, units: "iec"});

    return (
        <>
            <h1>The contents of PyPI, in numbers</h1>
            <TotalStats stats={data.total_stats[0]} lastMonth={lastMonth}/>

            <ChartScroll chartData={projectStats} charts={[
                {name: "Setup.py vs PyProject.toml", valueNames: ["total_project_uploads", "has_setup_py", "has_pyproject", "has_requirements_txt"]},
                {name: "Markdown vs RST", valueNames: ["total_project_uploads", "has_markdown", "has_rst"]},
                {name: "File Formats", valueNames: ["total_project_uploads", "has_json", "has_ini", "has_xml", "has_toml", "has_yaml"]},
                {name: "Test Runner", valueNames: ["total_project_uploads", "has_tests", "has_pytest", "has_tox"]},
            ]}/>
            <div className="divider"></div>
            <h1>Secrets Detected</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    To-Do: write something here.
                </div>
                <div>
                    <Table data={secretTypesTable} columns={[{name: "type"}, {name: "count", type: "number"}]}/>
                </div>
            </div>
            <div className="divider"></div>
            <h1>Binary files</h1>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p>
                        This shows a breakdown of the binary files on PyPI, by extension.
                        Binary files are the vast majority of the content on PyPI, accounting for nearly 75% of the
                        uncompressed size.
                    </p>
                    <PieChart chartData={binarySizes} dataKey="total_size" nameKey="text"/>
                </div>
                <div>
                    <Table data={data.binary_extension_stats} columns={[
                        {name: "extension"},
                        {name: "total_files", type: "number"},
                        {name: "total_size", type: "bytes"},
                        {name: "unique_files", type: "number"}]}/>
                </div>
            </div>
            <div className="divider"></div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h1>Largest Projects by size</h1>
                    <InfoBubble text={`Tensorflow dominates this list with ${tensorflow_human_size}, ${tensorflow_percentage}% of all data on PyPI.`}/>
                    <Table data={data.projects_by_files} columns={[
                        {name: "project_name"},
                        {name: "unique_files", type: "number"},
                        {name: "total_files", type: "number"},
                        {name: "total_lines", type: "number"},
                        {name: "total_size", type: "bytes"},
                    ]}/>
                </div>
                <div>
                    <h1>Stats By Extensions</h1>
                    <InfoBubble text={`This only considers the last suffix of the file path as the extension`}/>
                    <Table data={data.extension_stats} columns={[
                        {name: "extension"},
                        {name: "total_files", type: "number"},
                        {name: "total_lines", type: "number"},
                        {name: "total_size", type: "bytes"},
                        {name: "unique_files", type: "number"}]}/>
                </div>

            </div>
            <div className="divider"></div>
            <ChartScroll chartData={chartData} charts={[
                {name: "Uploads", valueNames: ["total_uploads", "project_releases", "project_version_releases"]},
                {name: "Files", valueNames: ["total_files"]},
                {name: "Size", valueNames: ["total_size"]},
                {name: "Lines", valueNames: ["total_lines"]},
            ]}/>
        </>
    )
}
