import { format } from "sql-formatter";

// @ts-ignore
import mostUnique from "raw-loader!./most_unique.sql";
// @ts-ignore
import overTime from "raw-loader!./python_files_over_time.sql";
// @ts-ignore
import recentFiles from "raw-loader!./recent_pyproject_files.sql";
// @ts-ignore
import longestFiles from "raw-loader!./longest_files.sql";
// @ts-ignore
import largestVersion from "raw-loader!./largest_version.sql";

const queries = [
  createExample("Largest versions", largestVersion),
  createExample("Longest files", longestFiles),
  createExample("Largest projects by unique files", mostUnique),
  createExample("Unique files over time", overTime),
  createExample("Recent pyproject.toml files", recentFiles),
];

export default queries;

function createExample(name: string, sql: string) {
  const formatted = format(sql, {
    language: "sql",
    indentStyle: "tabularLeft",
  });
  const query = Buffer.from(formatted).toString("base64");
  return {
    name,
    query,
  };
}
