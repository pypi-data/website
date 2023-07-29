import byteSize from 'byte-size';
import parseIso from 'date-fns/parseISO';
import format from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';
import Link from "next/link";
import fs from 'fs'
import path from 'path'
import {Bars3BottomRightIcon, CircleStackIcon, CodeBracketIcon} from "@heroicons/react/24/solid";

const allRepoData = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'src/data/repositories_with_releases.json'), 'utf-8')) as RepoData[];

export default async function RepositoriesList() {
    const data = await getData();
    const repo_count = data.length;
    const total_releases = data.reduce((acc, repo) => acc + repo.stats.total_packages, 0).toLocaleString(undefined, {minimumFractionDigits: 0});
    const total_size = data.reduce((acc, repo) => acc + repo.size, 0);

    return (
        <>
            <article className="prose lg:prose-md mb-3">
                <h1>Repositories</h1>
            </article>
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
                    <div className="stat-value text-secondary">{byteSize(total_size).toString()}</div>
                </div>
            </div>

            <table className="table table-sm table-fixed border-spacing-0">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Days</th>
                    <th>Size</th>
                    <th>Packages</th>
                    <th>Progress</th>
                </tr>
                </thead>
                <tbody>
                {data.sort((a, b) => b.index - a.index).map((p) => {
                    const earliest = parseIso(p.stats.earliest_package);
                    const latest = parseIso(p.stats.latest_package);
                    return (
                        <tr key={p.name}>
                            <td>
                                <Link href={`/repositories/${p.name}`}
                                      className="normal-case text-small"
                                      passHref={true}>{p.name}</Link>
                            </td>
                            <td>{format(earliest, 'dd/MM/yyyy')}</td>
                            <td>{format(latest, 'dd/MM/yyyy')}</td>
                            <td>{differenceInDays(latest, earliest)}</td>
                            <td>{byteSize(p.size).toString()}</td>
                            <td>{p.stats.total_packages}</td>
                            <td>{p.percent_done}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export type RepoData = {
    name: string,
    index: number,
    percent_done: number,
    size: number,
    url: string,
    packages_url: string,
    stats: {
        earliest_package: string,
        latest_package: string,
        total_packages: number,
        done_packages: number,
    }
    projects: Map<string, number>
}

export async function getData(): Promise<RepoData[]> {
    return allRepoData as RepoData[];
    // const res = await fetch('https://raw.githubusercontent.com/pypi-data/data/main/stats/repositories_with_releases.json')
    //
    // if (!res.ok) {
    //   // This will activate the closest `error.js` Error Boundary
    //   throw new Error('Failed to fetch data')
    // }
    //
    // return res.json()
}
