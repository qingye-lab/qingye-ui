import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "列宽与完整文字", titleEn: "Column widths and complete text" } satisfies DemoMeta;

type Entry = { id: string; label: string; count: number };
export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const data: Entry[] = [
    { id: "sensors", label: english ? "Connected devices — workshop and remote locations" : "接入设备——车间与远端站点的完整列表", count: 12 },
    { id: "roles", label: english ? "Permissions and roles" : "权限与角色", count: 8 },
    { id: "sync", label: english ? "Sync and export" : "同步与导出", count: 0 },
  ];
  const columns: ColumnDef<Entry>[] = [{ id: "collection", header: english ? "Local collection" : "本地集合", columns: [
    { accessorKey: "label", header: english ? "Name" : "名称", size: 240, minSize: 160, maxSize: 320, meta: { rowHeader: true, ellipsis: true } },
    { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>{english ? "Records" : "记录数"}</DataTableSortButton>, size: 120, minSize: 100, sortDescFirst: false, meta: { numeric: true } },
  ] }];
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), autoResetAll: false });
  return <DataTable table={table} caption={english ? "Local collection · 3 entries" : "本地集合 · 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} />;
}
