import fs from "fs";
import path from "path";
import { RepoData } from "@/app/repositories/page";

const allRepoData = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "src/data/repositories_with_releases.json"), "utf-8"),
) as RepoData[];

export async function getData(): Promise<RepoData[]> {
  return allRepoData as RepoData[];
  // const res = await fetch('https://raw.githubusercontent.com/pypi-data/data/main/stats/repositories_with_releases.json')
  //
  // if (!res.ok) {
  //   // This will activate the closest `error.js` Error Boundary
  //   throw new Error('Failed to fetch data')
  // }
  //
  // return res.json()
}
