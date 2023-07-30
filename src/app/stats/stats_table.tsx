import {InnerStat} from "@/app/stats/stats";
import byteSize from "byte-size";

export default function StatsTable({stats, primary}: { stats: InnerStat[], primary: string }) {

    return (
        <table className="table table-xs">
            <thead>
            <tr>
                <th>{primary}</th>
                <th>Files</th>
                <th>Lines</th>
                <th>Size</th>
            </tr>
            </thead>
            <tbody>
            {stats.map((e) => {
                // @ts-ignore
                const key = e[primary];
                return (
                    <tr key={key}>
                        <td>{key || `No ${primary}`}</td>
                        <td>{e.total_files.toLocaleString()}</td>
                        <td>{e.total_lines?.toLocaleString()}</td>
                        <td>{byteSize(e.total_size, { units: 'iec', precision: 1 }).toString()}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}
