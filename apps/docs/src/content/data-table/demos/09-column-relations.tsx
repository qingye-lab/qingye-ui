import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Button } from "@qingye_lab/ui/components/button";
import { DataTable } from "@qingye_lab/ui/components/data-table";
import { StatusDot, type StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "按内容、按比例与上限", titleEn: "Content, proportion and limits" } satisfies DemoMeta;

type Entry = { id: string; name: string; status: string; dot: StatusDotStatus; synced: string; owner: string; note: string };
export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const data: Entry[] = english ? [
    { id: "sensors", name: "Connected devices", status: "Online", dot: "online", synced: "2026-11-03 14:20", owner: "Lin", note: "Workshop sensors and the remote sites that report through the gateway." },
    { id: "roles", name: "Permissions and roles", status: "Draft", dot: "neutral", synced: "2026-11-02 09:05", owner: "Zhou", note: "Who may view, edit and export each collection." },
    { id: "sync", name: "Sync and export", status: "Synchronizing", dot: "neutral", synced: "2026-10-30 22:41", owner: "Xu", note: "Nightly export to the shared archive." },
  ] : [
    { id: "sensors", name: "接入设备", status: "在线", dot: "online", synced: "2026-11-03 14:20", owner: "林", note: "车间传感器，以及经网关上报的远端站点。" },
    { id: "roles", name: "权限与角色", status: "草稿", dot: "neutral", synced: "2026-11-02 09:05", owner: "周", note: "谁可以查看、编辑和导出各个集合。" },
    { id: "sync", name: "同步与导出", status: "同步中", dot: "neutral", synced: "2026-10-30 22:41", owner: "徐", note: "每晚导出到共享归档。" },
  ];
  const columns: ColumnDef<Entry>[] = [
    { accessorKey: "name", header: english ? "Name" : "名称", meta: { rowHeader: true, fit: true } },
    { accessorKey: "status", header: english ? "Status" : "状态", meta: { fit: true }, cell: ({ row }) => <StatusDot status={row.original.dot} label={row.original.status} /> },
    { accessorKey: "synced", header: english ? "Last synchronized" : "最近同步", meta: { fit: true } },
    { accessorKey: "owner", header: english ? "Owner" : "负责人", minSize: 96, maxSize: 160, meta: { grow: 1 } },
    { accessorKey: "note", header: english ? "Description" : "描述", minSize: 200, meta: { grow: 3 } },
    { id: "actions", header: () => <span className="sr-only">{english ? "Actions" : "操作"}</span>, meta: { fit: true }, cell: () => <><Button variant="quiet" size="sm">{english ? "Edit" : "编辑"}</Button><Button variant="quiet" size="sm">{english ? "Delete" : "删除"}</Button></> },
  ];
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), autoResetAll: false });
  return <DataTable table={table} caption={english ? "Local collection · 3 entries" : "本地集合 · 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} />;
}
