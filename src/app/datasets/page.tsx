import LinksTable from "@/app/datasets/dataset_table";
import SyntaxHighlight from "@/app/datasets/syntax";
import getStats from "@/app/stats/stats";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Table from "@/app/table";

const SQLITE_URL = "https://github.com/pypi-data/pypi-json-data/releases/download/latest/pypi-data.sqlite.gz";
const DATASET_URL = "https://github.com/pypi-data/data/raw/main/links/dataset.txt";
const PYTHON_DATASET_URL = "https://github.com/pypi-data/data/raw/main/links/only_python_files.txt";
const REPOSITORIES_DATASET_URL = "https://github.com/pypi-data/data/raw/main/stats/repositories.json";
const REPOSITORIES_WITH_RELEASES_DATASET_URL =
  "https://github.com/pypi-data/data/raw/main/stats/repositories_with_releases.json";
const CURL_EXAMPLE = `$ curl -L --remote-name-all $(curl -L "${DATASET_URL}")`;
const PYTHON_CURL_EXAMPLE = `$ curl -L --remote-name-all $(curl -L "${PYTHON_DATASET_URL}")`;
const SQLITE_CURL_EXAMPLE = `$ curl -L ${SQLITE_URL} | gzip -d > pypi-data.sqlite`;
const DUCK_DB_EXAMPLE = `${CURL_EXAMPLE}
$ duckdb -json -s "select * from '*.parquet' order by lines DESC limit 1"
[
  {
    "project_name": "EvenOrOdd",
    "project_version": "0.1.10",
    "project_release": "EvenOrOdd-0.1.10-py3-none-any.whl",
    "uploaded_on": "2021-02-21 02:25:57.832",
    "path": "EvenOrOdd/EvenOrOdd.py",
    "size": "514133366",
    "hash": "ff7f863ad0bb4413c939fb5e9aa178a5a8855774262e1171b876d1d2b51e6998",
    "skip_reason": "too-large",
    "lines": "20010001"
  }
]
`;

const EVEN_OR_ODD_EXAMPLE = `$ wget https://files.pythonhosted.org/packages/b2/82/c4265814ed9e68880ba0892eddf1664c48bb490f37113d74d32fe4757192/EvenOrOdd-0.1.10-py3-none-any.whl
$ unzip EvenOrOdd-0.1.10-py3-none-any.whl
$ wc -l EvenOrOdd/EvenOrOdd.py
 20010000 EvenOrOdd/EvenOrOdd.py

$ tail -n6 EvenOrOdd/EvenOrOdd.py
    elif num == 9999996:
        return True
    elif num == 9999997:
        return False
    elif num == 9999998:
        return True
    elif num == 9999999:
        return False
    else:
        raise Exception("Number is not within bounds")
`;

export default async function Page() {
  const stats = await getStats();

  const sampleresp = await fetch("https://raw.githubusercontent.com/pypi-data/data/main/stats/random_sample.json");
  const sampledata = await sampleresp.json();

  const linkresp = await fetch(DATASET_URL);
  const links = (await linkresp.text()).split("\n").filter((e) => e.length > 0);

  const sqliteResponse = await fetch(SQLITE_URL, { method: "HEAD" });
  const sqliteSize = Number(sqliteResponse.headers.get("content-length"));

  const sqliteSchemaResponse = await fetch(
    "https://raw.githubusercontent.com/pypi-data/pypi-json-data/main/scripts/schema.sql",
  );
  const sqliteSchema = await sqliteSchemaResponse.text();

  const sqliteSizes = [{ url: SQLITE_URL, size: sqliteSize }];

  const sizes = await Promise.all(
    links.map(async (link) => {
      let resp = await fetch(link, {
        method: "HEAD",
        headers: {
          "accept-encoding": "",
        },
      });
      return {
        url: link,
        size: Number(resp.headers.get("content-length")),
      };
    }),
  );

  const pythonlinkresp = await fetch(PYTHON_DATASET_URL);
  const pythonlinks = (await pythonlinkresp.text()).split("\n").filter((e) => e.length > 0);

  const pythonsampleresp = await fetch(
    "https://raw.githubusercontent.com/pypi-data/data/main/stats/random_sample_python_only.json",
  );
  const pythonsampledata = await pythonsampleresp.json();

  const pythonsizes = await Promise.all(
    pythonlinks.map(async (link) => {
      let resp = await fetch(link, {
        method: "HEAD",
        headers: {
          "accept-encoding": "",
        },
      });
      return {
        url: link,
        size: Number(resp.headers.get("content-length")),
      };
    }),
  );

  const repo_metadata_sizes = await Promise.all(
    [REPOSITORIES_DATASET_URL, REPOSITORIES_WITH_RELEASES_DATASET_URL].map(async (link) => {
      let resp = await fetch(link, {
        method: "HEAD",
        headers: {
          "accept-encoding": "",
        },
      });
      return {
        url: link,
        size: Number(resp.headers.get("content-length")),
      };
    }),
  );

  return (
    <>
      <h1>Datasets</h1>
      <article className="prose">
        <p className={"mb-0"}>There are several datasets available for use:</p>
        <ol className={"mt-0"}>
          <li>
            <a href="#metadata">Metadata about every file uploaded to PyPI</a>
          </li>
          <li>
            <a href="#sqlite-dump">SQLite dump of all PyPI metadata</a>
          </li>
          <li>
            <a href="#repositories">Repository metadata</a>
          </li>
          <li>
            <a href="#unique-python-files">Unique Python files within every release</a>
          </li>
        </ol>
        <p>
          These datasets allow you to analyse the contents of PyPI without having to download and process every package
          yourself. All of the statistics within the <a href="/website/stats">stats page</a>
          are periodically generated using the datasets below.
        </p>
      </article>

      <div className="card rounded-box bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 id="metadata" className="card-title">
            Metadata about every file uploaded to PyPI
          </h1>
          <h3>About</h3>
          <article className="prose lg:prose-md">
            <p>This dataset contains information about every file within every release uploaded to PyPi, including:</p>
            <ol>
              <li>Project name, version and release upload date</li>
              <li>File path, size and line count</li>
              <li>SHA256 hash</li>
            </ol>
            <p>
              The dataset should be accessed by downloading the files specified within{" "}
              <a href={DATASET_URL} target="_blank">
                <code>{DATASET_URL}</code>
              </a>{" "}
              . The following command downloads the dataset from this URL:
            </p>
            <SyntaxHighlight language="shell">{CURL_EXAMPLE}</SyntaxHighlight>

            <details className="collapse bg-base-200 mb-5 mt-5">
              <summary className="collapse-title">
                <h3 className="mt-3">
                  <div className="inline-flex self-center h-4 w-4 relative mr-1">
                    <ChevronDownIcon />
                  </div>
                  Using DuckDB to process the dataset
                </h3>
              </summary>
              <div className="collapse-content">
                <p className="mt-0">
                  <a href="https://duckdb.org/">DuckDB</a> is a great tool for processing the dataset. It is very fast
                  and supports SQL queries over Parquet files. The following command uses DuckDB to find the largest
                  file ever uploaded to PyPI:
                </p>
                <SyntaxHighlight language="shell">{DUCK_DB_EXAMPLE}</SyntaxHighlight>
                <p>Woah, a whopping 20 million lines of code! Lets confirm it:</p>
                <SyntaxHighlight language="shell">{EVEN_OR_ODD_EXAMPLE}</SyntaxHighlight>
                <p>Very funny, I hope this module is a joke 😅</p>
              </div>
            </details>

            <details className="collapse bg-base-200 mb-5 mt-5">
              <summary className="collapse-title">
                <h3 className="mt-3">
                  <div className="inline-flex self-center h-4 w-4 relative mr-1">
                    <ChevronDownIcon />
                  </div>
                  About skipped files
                </h3>
              </summary>
              <div className="grid grid-cols-2 gap-4">
                <div className="ml-5">
                  <p className="mt-0">
                    The dataset contains a <code>skip_reason</code> column. If a file is not present in the git
                    repositories then the reason for skipping is recorded here. On the right is a list of the current
                    skip reasons and the number of files excluded from the git repositories for each reason.
                  </p>
                  <p>
                    The exact reasons for skipping a file are not fully documented here, but <code>ignored</code> files
                    include virtual environments accidentally uploaded to PyPI. <code>text-long-lines</code> means the
                    file had very few lines, but the total size was large.
                  </p>
                </div>
                <div>
                  <strong>Skipped reasons:</strong>
                  <Table
                    data={stats.skip_reason_stats.filter(({ skip_reason }) => skip_reason != "")}
                    columns={[
                      { name: "skip_reason" },
                      { name: "count", type: "number" },
                      {
                        name: "total_size",
                        type: "bytes",
                      },
                    ]}
                  />
                </div>
              </div>
            </details>
          </article>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3>Current Links</h3>
              <LinksTable data={sizes} />
            </div>
            <div>
              <h3>Schema</h3>
              <SyntaxHighlight language="json">{JSON.stringify(sampledata, null, 2)}</SyntaxHighlight>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="card rounded-box bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 id="sqlite-dump" className="card-title">
            SQLite dump of all PyPI metadata
          </h1>
          <h3>About</h3>
          <p>
            This is a SQLite dump of all PyPI metadata fetched from the PyPI API. It is updated daily. It can be
            accessed directly from the following url:&nbsp;
            <a href={SQLITE_URL} target="_blank">
              <code>{SQLITE_URL}</code>
            </a>
            :
          </p>
          <SyntaxHighlight language="shell">{SQLITE_CURL_EXAMPLE}</SyntaxHighlight>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3>Links</h3>
              <LinksTable data={sqliteSizes} />
            </div>
            <div>
              <h3>Schema</h3>
              <SyntaxHighlight language="sql">{sqliteSchema}</SyntaxHighlight>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="card rounded-box bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 className="card-title" id="repositories">
            Repository Metadata
          </h1>
          <p>
            This dataset contains one row per <strong>unique</strong> Python file within every release uploaded to PyPI.
            Only the sha256 hash and a random path to the file is provided. This dataset is useful if you want to parse
            the Python files yourself, but want to avoid parsing the same file multiple times.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3>About</h3>

              <h3>Current Links</h3>
              <LinksTable data={repo_metadata_sizes} />
            </div>
            <div>
              <h3>Schema</h3>
              <SyntaxHighlight language="json">{JSON.stringify(pythonsampledata, null, 2)}</SyntaxHighlight>
            </div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      <div className="card rounded-box bg-base-100 shadow-2xl">
        <div className="card-body">
          <h1 className="card-title" id="unique-python-files">
            Unique Python files
          </h1>
          <p>
            This dataset contains one row per <strong>unique</strong> Python file within every release uploaded to PyPI.
            Only the sha256 hash and a random path to the file is provided. This dataset is useful if you want to parse
            the Python files yourself, but want to avoid parsing the same file multiple times.
          </p>
          <p>
            Like the main dataset, the unique files dataset should be accessed by downloading the links
            <a href={PYTHON_DATASET_URL} target="_blank">
              from the following file
            </a>{" "}
            :
          </p>
          <SyntaxHighlight language="shell">{PYTHON_CURL_EXAMPLE}</SyntaxHighlight>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3>About</h3>

              <h3>Current Links</h3>
              <LinksTable data={pythonsizes} />
            </div>
            <div>
              <h3>Schema</h3>
              <SyntaxHighlight language="json">{JSON.stringify(pythonsampledata, null, 2)}</SyntaxHighlight>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
