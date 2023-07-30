import TotalStats from "@/app/stats/total_stats";
import getStats from "@/app/stats/stats";
import {getData as getRepoData} from "@/app/repositories/page";
import RepoStats from "@/app/repositories/repo-stats";

export default async function Home() {
    const data = await getStats();
    const repoData = await getRepoData();
    const chartData = data.stats_over_time.sort((a, b) => a.month < b.month ? -1 : 1);
    const lastMonth = chartData[chartData.length - 2];

    return (
        <>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col">
                    <div>
                        <h1 className="text-5xl font-bold text-center">What is this?</h1>
                    </div>
                    Explainer goes here
                </div>
            </div>
            <br/>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col">
                    <div>
                        <h1 className="text-5xl font-bold text-center">Explore Datasets</h1>
                    </div>
                    Stuff about datasets go here
                </div>
            </div>
            <br/>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col">
                    <div>
                        <h1 className="text-5xl font-bold text-center">View repositories</h1>
                        <RepoStats data={repoData}/>
                    </div>
                    <a href={"/website/stats"} role={"button"} className={"btn btn-primary btn-sm"}>Click here for lots of repositories!</a>
                </div>
            </div>
            <br/>
            <div className="hero bg-base-200">
                <div className="hero-content flex-col">
                    <div>
                        <h1 className="text-5xl font-bold text-center">Stats for nerds 🤓</h1>
                        <TotalStats stats={data.total_stats[0]} lastMonth={lastMonth}/>
                    </div>
                    <a href={"/website/stats"} role={"button"} className={"btn btn-primary btn-sm"}>Click here for lots of graphs!</a>
                </div>
            </div>
        </>
    )
}
