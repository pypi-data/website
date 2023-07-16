import packageList from '@/../public/data/pages.json';
import Link from 'next/link'

// @ts-ignore
const packages: string[] = packageList.packages;

export default function ProjectsList() {
  return (
    <>
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
                    <Link href={`/projects/${p}/`}>Home</Link>
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
