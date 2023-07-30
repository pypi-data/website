export default async function getStats(): Promise<RepoStats> {
  const res = await fetch('https://raw.githubusercontent.com/pypi-data/data/main/stats/totals.json')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const json_res = await res.json();
  const repo_stats = {}
  for (const item of json_res as { name: string, stat: any[] }[]) {
    // @ts-ignore
    repo_stats[item.name] = item.stat
    // console.log(key, value);
  }
  return repo_stats as RepoStats
}


export type RepoStats = {
  total_stats: [TotalStat];
  stats_over_time: StatsOverTime[];
  skipped_files_stats: InnerStat[];
  binary_extension_stats: InnerStat[];
  extension_stats: InnerStat[];
  projects_by_files: ProjectStat[]
  skip_reason_stats: [{skip_reason: string, count: number}]
}

export type TotalStat = {
  total_files: number;
  total_lines: number;
  total_size: number;
  unique_files: number;
}


export type InnerStat = {
  extension: string;
  total_files: number;
  total_lines: number;
  total_size: number;
  unique_files: number;
}

export type ProjectStat = {
  project_name: string;
  unique_files: number;
  total_files: number;
  total_lines: number;
  total_size: number;
}

export type StatsOverTime = {
  month: string;
  total_uploads: number;
  project_releases: number;
  project_version_releases: number;
  total_files: number;
  total_size: number;
  total_lines: number;
  total_hours: number;
}


