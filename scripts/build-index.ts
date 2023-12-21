import Fuse from "fuse.js";
import * as fs from "fs";
import * as zlib from "zlib";

async function fetchData() {
  const response = await fetch("https://data.py-code.org/data/pages.json");
  const packageList = await response.json();

  // @ts-ignore
  const packages: string[] = packageList.packages; //.slice(0, 100_000);
  // const packages: string[] = packageList.packages;

  const index = {
    json: Fuse.createIndex([], packages).toJSON(),
    packages: packages,
  };
  console.log(process.argv[2], JSON.stringify(index).length);
  const encoded = zlib.deflateSync(JSON.stringify(index), { level: 9 });
  fs.writeFileSync(process.argv[2], encoded);
}

fetchData();
