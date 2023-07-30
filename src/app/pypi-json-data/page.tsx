import byteSize from "byte-size";
export default async function Page() {
    const sqliteResponse = await fetch("https://github.com/pypi-data/pypi-json-data/releases/download/latest/pypi-data.sqlite.gz", {method: "HEAD"})
    const sqliteSize = Number(sqliteResponse.headers.get("content-length"))

    return (
        <>
            <h1>PyPI JSON data</h1>
            <p>
                sqlite size: {byteSize(sqliteSize, { units: 'iec', precision: 0 }).toString()}
            </p>
        </>
    )
}
