import TotalStats from "@/app/stats/total_stats";
import getStats from "@/app/stats/stats";
import byteSize from "byte-size";
import { getData as getRepoData } from "@/utils";

export default async function Home() {
  const data = await getStats();
  const repoData = await getRepoData();
  const total_size = repoData.reduce((acc, repo) => acc + repo.size, 0);
  const chartData = data.stats_over_time.sort((a, b) => (a.month < b.month ? -1 : 1));
  const lastMonth = chartData[chartData.length - 2];

  return (
    <>
      <div className="hero bg-base-200">
        <div className="hero-content flex-col">
          <div>
            <h1 className="text-5xl font-bold text-center">What is this?</h1>
          </div>
          <p className={"text-lg text-center"}>
            This project makes it easy to analyze the Python ecosystem by providing of all the code ever published to
            PyPI via <code>git</code>, parquet datasets with file metadata, and a set of tools to help analyze the data.
          </p>
          <p className={"text-lg text-center"}>
            Thanks to the power of git the contents of PyPI takes up only{" "}
            {byteSize(total_size, {
              precision: 1,
            }).toString()}{" "}
            on disk, and thanks to tools like <a href="https://libcst.readthedocs.io/en/latest/">libcst</a> every Python
            file can be analysed on a consumer-grade laptop in a few hours.
          </p>
          <p className={"text-lg text-center"}>
            <a href={"/download"} role={"button"} className={"btn btn-primary btn-sm m-3"}>
              Download all the code
            </a>
            <a href={"/datasets"} role={"button"} className={"btn btn-primary btn-sm"}>
              Explore the datasets
            </a>
          </p>
        </div>
      </div>
      <br />
      <div className="hero bg-base-200">
        <div className="hero-content flex-col">
          <div>
            <a href={"/stats"}>
              <h1 className="text-5xl font-bold text-center">Stats for nerds 🤓</h1>
            </a>
            <TotalStats stats={data.total_stats[0]} lastMonth={lastMonth} />
          </div>
          <a href={"/stats"} role={"button"} className={"btn btn-primary btn-sm"}>
            Click here for lots more stats!
          </a>
        </div>
      </div>
    </>
  );
}
