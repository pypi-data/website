"use client";

import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import byteSize from "byte-size";
import { useMemo, useState } from "react";

type Column = {
  name: string;
  type?: "string" | "number" | "bytes";
};

interface TableProps {
  data: Record<string, string | number>[];
  columns: Column[];
  initialLimit?: number;
  addFooter?: boolean
}

export default function Table({ data, columns, initialLimit = 15, addFooter = true }: TableProps) {
  const [expanded, setExpanded] = useState(false);
  // This is needed to stop a re-render loop? No idea why.
  const limitedData = useMemo(() => {
    const numbersCopy = JSON.parse(JSON.stringify(data));
    if (!expanded) {
      return numbersCopy.slice(0, initialLimit);
    } else {
      return numbersCopy;
    }
  }, [data, expanded, initialLimit]);
  const hasMore = data.length > initialLimit;

  const table = useReactTable({
    data: limitedData,
    columns: columns.map((column) => ({
      id: column.name,
      header: column.name.replace("_", " "),
      footer: !addFooter ? undefined : ({ table }) => {
        if (column.name == columns[0].name) {
          return "Total";
        }
        if (column.type === "bytes" || column.type === "number") {
          // @ts-ignore
          const total = data.reduce((total, row) => total + row[column.name], 0);
          if (column.type == "number") {
            return total.toLocaleString();
          }
          return byteSize(total, { units: "iec", precision: 1 }).toString();
        }
      },
      cell: (props) => {
        const row = props.getValue();
        if (column.type === undefined) {
          if (row == "") {
            return `No ${column.name}`;
          } else {
            return row;
          }
        }
        if (column.type === "string" || typeof row === "string") {
          return row;
        } else if (column.type === "number") {
          return row.toLocaleString();
        } else if (column.type === "bytes") {
          return byteSize(row, { units: "iec", precision: 1 }).toString();
        }
      },
      accessorKey: column.name,
    })),
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="table table-xs">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map((header) => (
              <td key={header.id}>{flexRender(header.column.columnDef.footer, header.getContext())}</td>
            ))}
          </tr>
        ))}
        {hasMore && (
          <tr>
            <td colSpan={columns.length} className="text-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setExpanded(!expanded);
                }}
              >
                {expanded ? "Show less" : `Show All ${data.length} Rows`}
              </button>
            </td>
          </tr>
        )}
      </tfoot>
    </table>
  );
}
