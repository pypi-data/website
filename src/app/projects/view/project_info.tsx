"use client";
import useSWRImmutable from "swr/immutable";
import Timestamp from "react-timestamp";

type PackageWithIndex = {
  index: number;
  package_filename: string;
  package: {
    project_name: string;
    project_version: string;
    url: string;
    upload_time: string;
    processed: boolean;
  };
};

type ProjectInfo = {
  name: string;
  packages_with_indexes: PackageWithIndex[];
};

function getInspectorLink(p: PackageWithIndex): string {
  const url = new URL(p.package.url);
  return `https://inspector.pypi.io/project/${p.package.project_name}/${p.package.project_version}${url.pathname}`;
}

const ASSET_PATH = (process.env.NEXT_PUBLIC_ASSET_PATH || "").replace("http://", "https://");

export default function ProjectInfo({ name }: { name: string }) {
  const first_char = Array.from(name)[0];
  const { data, error, isLoading } = useSWRImmutable(`${ASSET_PATH}/data/packages/${first_char}/${name}.json`);
  if (isLoading) {
    return <p>Loading</p>;
  }
  const project_info: ProjectInfo = data;
  return (
    <>
      <article className="prose lg:prose-md mb-3">
        <h1>{project_info.name}</h1>
        <p>
          {project_info.name} has {project_info.packages_with_indexes.length} packages.
        </p>
      </article>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Version</th>
              <th>Release</th>
              <th>Github</th>
              <th>Published on</th>
              <th>PyPi</th>
            </tr>
          </thead>
          <tbody>
            {project_info.packages_with_indexes.map((p, idx) => {
              return (
                <tr key={idx}>
                  <td>{p.package.project_version}</td>
                  <td>{p.package_filename}</td>
                  <td>
                    <a
                      className="btn btn-info btn-xs"
                      href={`https://github.com/pypi-data/pypi-mirror-${p.index}/tree/code/packages/${p.package.project_name}/${p.package_filename}`}
                      target="_blank"
                    >
                      View Code
                    </a>
                  </td>
                  <td>
                    <Timestamp date={p.package.upload_time} />
                  </td>
                  <td>
                    <a className="btn btn-outline btn-info btn-xs mr-1" href={p.package.url}>
                      Download
                    </a>
                    <a className="btn btn-outline btn-info btn-xs" href={getInspectorLink(p)} target="_blank">
                      Inspector
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
