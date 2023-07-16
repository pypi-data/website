import packageList from '@/../public/data/pages.json';
import Link from 'next/link'

// @ts-ignore
const packages: string[] = packageList.packages.slice(0, 1000);
// @ts-ignore
const totalPackages: number = packageList.total_packages;

export default function ProjectsList() {
  return (
    <>
      <article className="prose lg:prose-xl mb-3">
        <h1>Projects List</h1>
        <p>
          Due to time constraints this page is not done yet and only the first 1,000 projects are shown.
          There are {totalPackages} projects in total.
        </p>
        <p>
          To visit a project use a direct URL, e.g so: <Link href={`/projects/django/`}>/projects/django</Link>
        </p>
      </article>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
          <tr>
            <th>Name</th>
            <th>Link</th>
          </tr>
          </thead>
          <tbody>
          {packages.map((p, idx) => {
            return (
              <tr key={idx}>
                <td>{p}</td>
                <td>
                  <button className="btn btn-info btn-xs">
                    <Link href={`/projects/${p}/`}>View</Link>
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
