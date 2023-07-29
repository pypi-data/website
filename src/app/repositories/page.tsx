import byteSize from 'byte-size';
import parseIso from 'date-fns/parseISO';
import format from 'date-fns/format';
import differenceInDays from 'date-fns/differenceInDays';
import Link from "next/link";

export default async function RepositoriesList() {
  const data = await getData()

  return (
    <table className="table-fixed">
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
              <Link href={`/repositories/${p.name}`} className="btn btn-small btn-ghost normal-case text-small" passHref={true}>{p.name}</Link>
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
  const res = await fetch('https://github.com/pypi-data/data/raw/main/stats/repositories.json')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
