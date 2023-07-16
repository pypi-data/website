import Link from "next/link";

export default function NavBar() {
  return (
    <div className="navbar bg-base-300 mb-5">
      <Link href={"/"} className="btn btn-ghost normal-case text-xl">PyPi Data</Link>
      <Link href={"/projects/"} className="btn btn-ghost normal-case text-large">Projects</Link>
      <Link href={"/datasets/"} className="btn btn-ghost normal-case text-large">Datasets</Link>
    </div>
  )
}
