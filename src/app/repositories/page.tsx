import byteSize from "byte-size";
import parseIso from "date-fns/parseISO";
import format from "date-fns/format";
import differenceInDays from "date-fns/differenceInDays";
import fs from "fs";
import path from "path";
import RepoStats from "@/app/repositories/repo-stats";

const allRepoData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/data/repositories_with_releases.json"), "utf-8"),
) as RepoData[];

export default async function RepositoriesList() {
  const data = await getData();

  return (
    <>
      <article className="prose lg:prose-md mb-3">
        <h1>Repositories</h1>
        <div className="text-center">
          <RepoStats data={data} />
        </div>
        <p>
          Repositories are the top level of the PyPI data. Each repository contains one or more projects published to
          PyPI. This page shows the list of repositories with the size and completion percent. Click on a repository to
          view a list of packages contained within.
        </p>
      </article>

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
          {data
            .sort((a, b) => b.index - a.index)
            .map((p) => {
              const earliest = parseIso(p.stats.earliest_package);
              const latest = parseIso(p.stats.latest_package);
              return (
                <tr key={p.name}>
                  <td>
                    <a href={`/repositories/${p.name}`} className="normal-case text-small">
                      {p.name}
                    </a>
                  </td>
                  <td>{format(earliest, "dd/MM/yyyy")}</td>
                  <td>{format(latest, "dd/MM/yyyy")}</td>
                  <td>{differenceInDays(latest, earliest)}</td>
                  <td>{byteSize(p.size, { units: "iec", precision: 1 }).toString()}</td>
                  <td>{p.stats.total_packages}</td>
                  <td>{p.percent_done}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export type RepoData = {
  name: string;
  index: number;
  percent_done: number;
  size: number;
  url: string;
  packages_url: string;
  stats: {
    earliest_package: string;
    latest_package: string;
    total_packages: number;
    done_packages: number;
  };
  projects: Map<string, number>;
};

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
