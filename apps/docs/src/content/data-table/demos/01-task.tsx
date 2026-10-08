import * as React from "react";
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "真实排序与范围选择", titleEn: "Real sorting and scoped selection" } satisfies DemoMeta;

type Entry = { id: string; label: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "接入设备", count: 12 },
  { id: "roles", label: "权限与角色", count: 8 },
  { id: "sync", label: "同步与导出", count: 0 },
];

export default function Demo() {
  const columns = React.useMemo<ColumnDef<Entry>[]>(() => [
    // marker 列只放一个复选框，不占文字列的留白（基础层 §6）。
    { id: "selection", enableSorting: false, meta: { marker: true }, header: ({ table }) => <DataTableSelectAll table={table} scope="filtered" aria-label="选择当前本地集合" />, cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择${row.original.label}`} /> },
    { accessorKey: "label", meta: { rowHeader: true }, header: "名称" },
    { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>记录数</DataTableSortButton>, sortDescFirst: false, meta: { numeric: true } },
  ], []);
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() });
  return <Stack>
    <DataTable table={table} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" />
    <output className="text-support text-muted-foreground">已选：{table.getSelectedRowModel().rows.map(row => row.original.label).join("、") || "无"}</output>
  </Stack>;
}
