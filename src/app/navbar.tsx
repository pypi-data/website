import Link from "next/link";

export default function NavBar() {
    return (
        <div className="navbar bg-base-300 mb-5">
            <Link href="/" className="btn btn-ghost normal-case text-xl" passHref={true}>PyPi Data</Link>
            <Link href="/stats/" className="btn btn-ghost normal-case text-large" passHref={true}>Stats</Link>
            <Link href="/projects/" className="btn btn-ghost normal-case text-large" passHref={true}>Projects</Link>
            <Link href="/datasets/" className="btn btn-ghost normal-case text-large" passHref={true}>Datasets</Link>
            <Link href="/repositories/" className="btn btn-ghost normal-case text-large"
                  passHref={true}>Repositories</Link>
        </div>
    )
}
