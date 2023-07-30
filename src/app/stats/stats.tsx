export default async function getStats(): Promise<RepoStats> {
    const res = await fetch('https://raw.githubusercontent.com/pypi-data/data/main/stats/totals.json')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    const json_res = await res.json();
    const repo_stats = {}
    for (const item of json_res as {name: string, stat: any[]}[]) {
        // @ts-ignore
        repo_stats[item.name] = item.stat
        // console.log(key, value);
    }
    console.log(repo_stats)
    return repo_stats as RepoStats
}


export interface RepoStats {
    total_stats: [TotalStat];
    stats_over_time: StatsOverTime[];
    skipped_files_stats: InnerStat[];
    binary_extension_stats: InnerStat[];
    extension_stats: InnerStat[];
    projects_by_files: InnerStat[]
}
export interface TotalStat {
    total_files: number;
    total_lines: number;
    total_size: number;
    unique_files: number;
}


export interface InnerStat {
    extension: string;
    total_files: number;
    total_lines?: number;
    total_size: number;
    unique_files?: number;
}


export interface StatsOverTime {
    month: string;
    total_uploads: number;
    project_releases: number;
    project_version_releases: number;
    total_files: number;
    total_size: number;
    total_lines: number;
    total_hours: number;
}


