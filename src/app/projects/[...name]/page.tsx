'use client'
import useSWR from 'swr'
import Timestamp from 'react-timestamp';

type PackageWithIndex = {
  index: number,
  package_filename: string,
  package: {
    project_name: string,
    project_version: string,
    url: string,
    upload_time: string,
    processed: boolean
  }
}

type ProjectInfo = {
  name: string,
  packages_with_indexes: PackageWithIndex[]
}

function getInspectorLink(p: PackageWithIndex) : string {
  const url = new URL(p.package.url);
  return `https://inspector.pypi.io/project/${p.package.project_name}/${p.package.project_version}${url.pathname}`;
}

export default function Page({params}: { params: { name: string } }) {
  const name = params.name[0]; // Why do we need to do this??
  const first_char = Array.from(name)[0];
  const {
    data,
    error,
    isLoading
  } = useSWR(`/data/packages/${first_char}/${name}.json`);
  if (isLoading) {
    return <p>Loading</p>
  }
  const project_info: ProjectInfo = data;
  return (
    <>
      <article className="prose lg:prose-lg mb-3">
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
                  <button className="btn btn-info btn-xs">
                    <a
                      href={`https://github.com/pypi-data/pypi-mirror-${p.index}/tree/code/packages/${p.package.project_name}/${p.package_filename}`}
                      target="_blank">View Code</a>
                  </button>
                </td>
                <td><Timestamp date={p.package.upload_time}/></td>
                <td>
                  <button className="btn btn-outline btn-info btn-xs mr-1">
                    <a href={p.package.url} target="_blank">Download</a>
                  </button>
                  <button className="btn btn-outline btn-info btn-xs">
                    <a href={getInspectorLink(p)} target="_blank">Inspector</a>
                  </button>
                </td>
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
    </>
  )
}
