import {Bars3BottomRightIcon, CircleStackIcon, CodeBracketIcon} from "@heroicons/react/24/solid";
import byteSize from "byte-size";
import {RepoData} from "@/app/repositories/page";

export default function RepoStats({data}: { data: RepoData[] }) {
    const repo_count = data.length;
    const total_releases = data.reduce((acc, repo) => acc + repo.stats.total_packages, 0).toLocaleString(undefined, {minimumFractionDigits: 0});
    const total_size = data.reduce((acc, repo) => acc + repo.size, 0);
    return (
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-primary">
                    <CodeBracketIcon className="inline-block w-8 h-8 stroke-current"/>
                </div>
                <div className="stat-title">Repositories</div>
                <div className="stat-value text-primary">{repo_count}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <Bars3BottomRightIcon className="inline-block w-8 h-8 stroke-current"/>
                </div>
                <div className="stat-title">Total Releases</div>
                <div
                    className="stat-value text-secondary">{total_releases.toLocaleString()}
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <CircleStackIcon className="inline-block w-8 h-8 stroke-current"/>
                </div>
                <div className="stat-title">Total uncompressed size</div>
                <div className="stat-value text-secondary">{byteSize(total_size, {
                    units: 'iec',
                    precision: 1
                }).toString()}</div>
            </div>
        </div>
    )
}
