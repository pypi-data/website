import Fuse from "fuse.js";
import * as fs from "fs";
import * as zlib from "zlib";

const packageListData = fs.readFileSync(process.argv[2], "utf8");
const packageList = JSON.parse(packageListData);

// @ts-ignore
const packages: string[] = packageList.packages; //.slice(0, 100_000);
// const packages: string[] = packageList.packages;

const index = {
  json: Fuse.createIndex([], packages).toJSON(),
  packages: packages,
};
console.log(process.argv[3], JSON.stringify(index).length);
const encoded = zlib.deflateSync(JSON.stringify(index), { level: 9 });
fs.writeFileSync(process.argv[3], encoded);
