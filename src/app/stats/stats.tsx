export default async function getStats(): Promise<RepoStats> {
    const res = await fetch('https://raw.githubusercontent.com/pypi-data/data/main/stats/totals.json')

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to fetch data')
    }

    return res.json()
}


export interface RepoStats {
    total_stats: { stat: [TotalStat] };
    stats_over_time: StatsOverTime;
    skipped_files_stats: Stats;
    binary_extension_stats: Stats;
    extension_stats: Stats;
}

export interface Stats {
    stat: InnerStat[];
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
    stat: StatsOverTimeStat[];
}

export interface StatsOverTimeStat {
    month: string;
    total_uploads: number;
    project_releases: number;
    project_version_releases: number;
    total_files: number;
    total_size: number;
    total_lines: number;
    total_hours: number;
}


