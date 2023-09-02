export default function NavBar() {
  return (
    <div className="navbar bg-base-300 mb-3 text-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 place-content-stretch">
      <a role={"button"} href="/" className="btn btn-ghost normal-case">
        PyPI Data
      </a>
      <a role={"button"} href="/download" className="btn btn-ghost normal-case ">
        Download PyPI
      </a>
      <a role={"button"} href="/stats" className="btn btn-ghost normal-case ">
        Stats for nerds 🤓
      </a>

      <a role={"button"} href="/projects" className="btn btn-ghost normal-case ">
        Search PyPI projects
      </a>

      <a role={"button"} href="/datasets" className="btn btn-ghost normal-case ">
        Datasets
      </a>

      <a role={"button"} href="/repositories" className="btn btn-ghost normal-case ">
        Repositories
      </a>
    </div>
  );
}
