import byteSize from "byte-size";

export default function LinksTable({data}: { data: {url: string, size: number}[] }) {
    return (
        <table className="table table-xs">
            <thead>
            <tr>
                <th>URL</th>
                <th>Size</th>
            </tr>
            </thead>
            <tbody>
            {data.sort((a,b) => a.size < b.size ? 1 : -1).map((e) => (
                <tr key={e.url}>
                    <td>
                        <a href={e.url}>{e.url}</a>
                    </td>
                    <td>{byteSize(e.size, { units: 'iec', precision: 1 }).toString()}</td>
                </tr>
            ))}
            </tbody>
            <tfoot>
                <tr>
                <td>
                    {data.length.toLocaleString()} links
                </td>
                <td>
                    {byteSize(data.reduce((acc, cur) => acc + cur.size, 0), { units: 'iec', precision: 1 }).toString()}
                </td>
                </tr>
            </tfoot>
        </table>
    )
}
