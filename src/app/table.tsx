'use client'

import {flexRender, getCoreRowModel, useReactTable} from '@tanstack/react-table'
import byteSize from "byte-size";
import {useMemo, useState} from "react";

type Column = {
    name: string,
    type?: "string" | "number" | "bytes"
}

export default function Table({data, columns, initialLimit = 15}: { data: Record<string, string | number>[], columns: Column[], initialLimit: number }) {
    const [expanded, setExpanded] = useState(false);
    // This is needed to stop a re-render loop? No idea why.
    const limitedData = useMemo(() => {
        const numbersCopy = JSON.parse(JSON.stringify(data));
        if (!expanded) {
            return numbersCopy.slice(0, initialLimit);
        } else {
            return numbersCopy
        }
    }, [data, expanded, initialLimit])
    const hasMore = data.length > initialLimit;
    console.log(`re-rendering ${data.length} ${expanded} ${hasMore} ${limitedData.length}`)

    const table = useReactTable({
        data: limitedData,
        columns: columns.map(column => ({
            id: column.name,
            accessorFn: (rowObject: Record<string, string | number>) => {
                const row = rowObject[column.name]
                if (column.type === undefined) {
                    if (typeof row === "number") {
                        return row.toLocaleString()
                    } else if (row == "") {
                        return `No ${column.name}`
                    } else {
                        return row
                    }
                }
                if (column.type === "string" || typeof row === "string") {
                    return row
                } else if (column.type === "number") {
                    return row.toLocaleString()
                } else if (column.type === "bytes") {
                    return byteSize(row, {units: 'iec', precision: 1}).toString()
                }
            }
        })),
        getCoreRowModel: getCoreRowModel(),
    })
    console.log(table.getCoreRowModel().rows.length);

    return (
        <table className="table table-xs">
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                    {headerGroup.headers.map(header => (
                        <th key={header.id}>
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
            {hasMore && (
                <tfoot>
                <tr>
                    <td colSpan={columns.length} className="text-center">
                        <button className="btn btn-xs" onClick={(e) => {
                            e.preventDefault();
                            setExpanded(!expanded);
                        }}>
                            {expanded ? "Show less" : "Show All"}
                        </button>
                    </td>
                </tr>
                </tfoot>
            )}
        </table>
    )
}
