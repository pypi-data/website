export default function NavBar() {
  return (
    <div className="navbar bg-base-300 mb-5">
      <a role={"button"} href="/website" className="btn btn-ghost normal-case text-xl">
        PyPI Data
      </a>

      <a role={"button"} href="/website/stats" className="btn btn-ghost normal-case text-large">
        Stats for nerds 🤓
      </a>

      <a role={"button"} href="/website/projects" className="btn btn-ghost normal-case text-large">
        All PyPI Projects
      </a>

      <a role={"button"} href="/website/datasets" className="btn btn-ghost normal-case text-large">
        Datasets
      </a>

      <a role={"button"} href="/website/repositories" className="btn btn-ghost normal-case text-large">
        Repositories
      </a>
    </div>
  );
}
