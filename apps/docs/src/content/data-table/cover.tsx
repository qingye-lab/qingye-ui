import * as React from "react";
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableSortButton } from "@qingye_lab/ui/components/data-table";

type Entry = { id: string; label: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "设备", count: 12 },
  { id: "roles", label: "角色", count: 8 },
  { id: "sync", label: "同步", count: 0 },
];

export default function Cover() {
  const columns = React.useMemo<ColumnDef<Entry>[]>(() => [
    { accessorKey: "label", meta: { rowHeader: true }, header: "名称" },
    { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>数量</DataTableSortButton>, sortDescFirst: false, meta: { numeric: true } },
  ], []);
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() });
  return <DataTable table={table} emptyContent="没有条目" containerProps={{ className: "w-full" }} />;
}
