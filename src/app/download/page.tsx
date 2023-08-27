import { getData as getRepoData } from "@/app/repositories/page";
import byteSize from "byte-size";
import SyntaxHighlight from "@/app/datasets/syntax";
// @ts-ignore
import contents from "raw-loader!public/download.sh";
// @ts-ignore
import example from "raw-loader!./example.sh";

// @ts-ignore
import example_2 from "raw-loader!./example_2.sh";

export default async function Download() {
  const repoData = await getRepoData();
  const total_size = repoData.reduce((acc, repo) => acc + repo.size, 0);

  return (
    <>
      <h1>Download PyPI</h1>
      <article className="prose">
        <h2>Step 1: Ensure you have space</h2>
        <p className={"text-lg"}>
          The current size of all the repositories is{" "}
          {byteSize(total_size, {
            precision: 1,
          }).toString()}
          . Make sure you have enough space on your machine before continuing.
        </p>
        <h2>Step 2: Clone the repositories</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className={"text-lg"}>Clone the repositories using the following command:</p>
            <SyntaxHighlight language="shell">{example}</SyntaxHighlight>
            <p className={"text-lg"}>
              This will create a new directory called <code>pypi_code</code> and begin fetching all the data from
              GitHub. This will take several hours.
            </p>
          </div>
          <div>
            <p className={"text-lg"}>
              <code>download.sh</code> contents:
            </p>
            <SyntaxHighlight language="shell">{contents}</SyntaxHighlight>
          </div>
        </div>
        <h2>Step 3: Use the data!</h2>
        <p className={"text-lg"}>
          The data is available by standard git tooling. To list all the files within the{" "}
          <a href={"/projects/view?name=4suite-xml"}>4suite-xml</a> package you could run:
        </p>
        <SyntaxHighlight language="shell">{example_2}</SyntaxHighlight>
        <p className={"text-lg"}>And listing all files can be done with:</p>
        <SyntaxHighlight language="shell">git rev-list --objects --all</SyntaxHighlight>
        <p className={"text-lg"}>
          There is also a dataset of all the unique Python files available for download.{" "}
          <a href={"/datasets#unique-python-files"}>See here for more information</a>.
        </p>
      </article>
    </>
  );
}
