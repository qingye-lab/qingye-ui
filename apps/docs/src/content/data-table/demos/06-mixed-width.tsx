import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@qingye_lab/ui/components/data-table";
import { StatusDot, type StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "定宽列与弹性列", titleEn: "Fixed and flexible columns" } satisfies DemoMeta;

type Entry = { id: string; name: string; status: string; dot: StatusDotStatus; count: number; note: string };
export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const data: Entry[] = english ? [
    { id: "sensors", name: "Connected devices", status: "Online", dot: "online", count: 12, note: "Workshop sensors and the remote sites that report through the gateway." },
    { id: "roles", name: "Permissions and roles", status: "Draft", dot: "neutral", count: 8, note: "Who may view, edit and export each collection." },
    { id: "sync", name: "Sync and export", status: "Paused", dot: "neutral", count: 0, note: "Nightly export to the shared archive." },
  ] : [
    { id: "sensors", name: "接入设备", status: "在线", dot: "online", count: 12, note: "车间传感器，以及经网关上报的远端站点。" },
    { id: "roles", name: "权限与角色", status: "草稿", dot: "neutral", count: 8, note: "谁可以查看、编辑和导出各个集合。" },
    { id: "sync", name: "同步与导出", status: "暂停", dot: "neutral", count: 0, note: "每晚导出到共享归档。" },
  ];
  const columns: ColumnDef<Entry>[] = [
    { accessorKey: "status", header: english ? "Status" : "状态", size: 96, cell: ({ row }) => <StatusDot status={row.original.dot} label={row.original.status} /> },
    { accessorKey: "name", header: english ? "Name" : "名称", minSize: 160, meta: { rowHeader: true } },
    { accessorKey: "note", header: english ? "Description" : "描述" },
    { accessorKey: "count", header: english ? "Records" : "记录数", size: 96, meta: { numeric: true } },
  ];
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), autoResetAll: false });
  return <DataTable table={table} caption={english ? "Local collection (mixed widths) · 3 entries" : "本地集合（混合列宽）· 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} />;
}
