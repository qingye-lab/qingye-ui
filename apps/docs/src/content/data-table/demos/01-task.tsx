import * as React from "react";
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton } from "@qingye/ui/components/data-table";
import { Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "真实排序与范围选择", titleEn: "Real sorting and scoped selection" } satisfies DemoMeta;
type Entry = { id: string; label: string; count: number };
const data: Entry[] = [{ id: "a", label: "条目 A", count: 0 }, { id: "b", label: "条目 B", count: 3 }, { id: "c", label: "条目 C", count: 1 }];
export default function Demo() {
  const columns = React.useMemo<ColumnDef<Entry>[]>(() => [{ id: "selection", enableSorting: false, header: ({ table }) => <DataTableSelectAll table={table} scope="filtered" aria-label="选择当前本地集合" />, cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择 ${row.original.label}`} /> }, { accessorKey: "label", meta: { rowHeader: true }, header: "条目" }, { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>数量</DataTableSortButton>, sortDescFirst: false }], []);
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() });
  return <Stack><DataTable table={table} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" /><output className="text-support">已选标识：{table.getSelectedRowModel().rows.map(row => row.id).join("、") || "无"}</output></Stack>;
}
