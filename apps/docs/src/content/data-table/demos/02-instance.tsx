import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "自定实例", titleEn: "Custom instance" } satisfies DemoMeta;

type Entry = { id: string; label: string; count: number };
const data: Entry[] = [{ id: "sensors", label: "接入设备", count: 12 }, { id: "roles", label: "权限与角色", count: 8 }, { id: "sync", label: "同步与导出", count: 0 }];
const columns: ColumnDef<Entry>[] = [
  { accessorKey: "label", header: "名称", meta: { rowHeader: true } },
  { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>记录数</DataTableSortButton>, sortDescFirst: false, meta: { numeric: true } },
];

export default function Demo() {
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), autoResetAll: false });
  return <DataTable table={table} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" />;
}
