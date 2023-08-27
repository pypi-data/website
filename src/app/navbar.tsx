export default function NavBar() {
  return (
    <div className="navbar bg-base-300 mb-5">
      <a role={"button"} href="/" className="btn btn-ghost normal-case text-xl">
        PyPI Data
      </a>

      <a role={"button"} href="/download" className="btn btn-ghost normal-case text-large">
        Download PyPI
      </a>

      <a role={"button"} href="/stats" className="btn btn-ghost normal-case text-large">
        Stats for nerds 🤓
      </a>

      <a role={"button"} href="/projects" className="btn btn-ghost normal-case text-large">
        Search PyPI projects
      </a>

      <a role={"button"} href="/datasets" className="btn btn-ghost normal-case text-large">
        Datasets
      </a>

      <a role={"button"} href="/repositories" className="btn btn-ghost normal-case text-large">
        Repositories
      </a>
    </div>
  );
}
