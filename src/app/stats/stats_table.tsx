import {InnerStat} from "@/app/stats/stats";
import byteSize from "byte-size";

export default function StatsTable({stats}: { stats: InnerStat[] }) {
    return (
        <table className="table table-xs">
            <thead>
            <tr>
                <th>Extension</th>
                <th>Files</th>
                <th>Lines</th>
                <th>Size</th>
            </tr>
            </thead>
            <tbody>
            {stats.map((e) => (
                <tr key={e.extension}>
                    <td>{e.extension || "No Extension"}</td>
                    <td>{e.total_files.toLocaleString()}</td>
                    <td>{e.total_lines?.toLocaleString()}</td>
                    <td>{byteSize(e.total_size).toString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
