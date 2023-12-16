import parseIso from "date-fns/parseISO";
import format from "date-fns/format";
import byteSize from "byte-size";
import { getData } from "@/utils";

export default async function RepositoryDetail({ params }: { params: { name: string } }) {
  const data = await getData();
  const repo = data.find((repo) => repo.name === params.name);
  if (repo == undefined) {
    return <h1>Unknown repo</h1>;
  }
  const earliest = parseIso(repo.stats.earliest_package);
  const latest = parseIso(repo.stats.latest_package);
  return (
    <>
      <article className="prose lg:prose-md mb-3">
        <h1>{repo.name}</h1>
        <p>
          This repository contains {repo.stats.total_packages} packages published between{" "}
          {format(earliest, "dd/MM/yyyy")}{" "}
          and {format(latest, "dd/MM/yyyy")}. The compressed size of this repository is{" "}
          {byteSize(repo.size, { units: "iec", precision: 1 }).toString()}
        </p>
        <p>
          Link: <a href={repo.packages_url}>{repo.url}</a>
        </p>
      </article>
      <table className="table table-fixed">
        <thead>
          <tr>
            <th>Package</th>
            <th>Github</th>
            <th>Project</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(repo.projects)
            .sort(([, a], [, b]) => b - a)
            .map(([name, count]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>
                  <a href={`${repo.packages_url}/${name}`} target="_blank">
                    Browse Code
                  </a>
                </td>
                <td>
                  <a href={`/projects/view?name=${name}`} className="normal-case text-small">
                    View all releases
                  </a>
                </td>
                <td>{count}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export async function generateStaticParams() {
  const repos = await getData();
  return repos.map((repo) => ({
    name: repo.name,
  }));
}
