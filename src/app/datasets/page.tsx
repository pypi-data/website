import LinksTable from "@/app/datasets/dataset_table";
import SyntaxHighlight from "@/app/datasets/syntax";

export default async function Page() {
    const sampleresp = await fetch("https://raw.githubusercontent.com/pypi-data/data/main/stats/random_sample.json")
    const sampledata = await sampleresp.json();

    const linkresp = await fetch("https://raw.githubusercontent.com/pypi-data/data/main/links/dataset.txt")
    const links = (await linkresp.text()).split('\n');

    const sizes = await Promise.all(links.map(async (link) => {
        let resp = await fetch(link, {method: "HEAD"});
        return {
            url: link,
            size: Number(resp.headers.get("content-length"))
        }
    }));

    return (
        <>
            <h3>Data</h3>
            <SyntaxHighlight language="json" content={JSON.stringify(sampledata, null, 2)}/>
            <h3>Links</h3>
            <LinksTable data={sizes}/>
        </>
    )
}
