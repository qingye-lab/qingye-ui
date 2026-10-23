import * as React from "react";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { Stack } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "排序、选择与分页", titleEn: "Sorting, selection and pagination" } satisfies DemoMeta;

type Entry = { id: string; label: string; labelEn: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "接入设备", labelEn: "Connected devices", count: 12 },
  { id: "roles", label: "权限与角色", labelEn: "Permissions and roles", count: 8 },
  { id: "sync", label: "同步与导出", labelEn: "Sync and export", count: 0 },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const label = (row: Entry) => english ? row.labelEn : row.label;
  const columns: DataTablePatternColumn<Entry>[] = [
    { id: "label", header: english ? "Name" : "名称", accessor: label, rowHeader: true },
    { id: "count", header: english ? "Records" : "记录数", accessor: row => row.count, sortable: true, sortDescFirst: false, numeric: true },
  ];
  const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 2 }, rowSelection: {}, activeRowId: null });
  const selected = data.filter(row => state.rowSelection[row.id]);
  return <Stack>
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? "Local collection · 3 entries" : "本地集合 · 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} state={state} onStateChange={setState} pagination={{ pageSizeOptions: [2, 5] }} selection={{ label: english ? "Select this page" : "选择当页条目", rowLabel: row => english ? `Select ${label(row)}` : `选择${label(row)}` }} activeRow={{ columnId: "label" }} />
    <output className="text-support text-muted-foreground">{english ? "Selected: " : "已选："}{selected.map(label).join(english ? ", " : "、") || (english ? "None" : "无")}</output>
  </Stack>;
}
