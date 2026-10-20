import * as React from "react";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "排序、选择与分页", titleEn: "Sorting, selection and pagination" } satisfies DemoMeta;

type Entry = { id: string; label: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "接入设备", count: 12 },
  { id: "roles", label: "权限与角色", count: 8 },
  { id: "sync", label: "同步与导出", count: 0 },
];
const columns: DataTablePatternColumn<Entry>[] = [
  { id: "label", header: "名称", accessor: row => row.label, rowHeader: true },
  { id: "count", header: "记录数", accessor: row => row.count, sortable: true, sortDescFirst: false, numeric: true },
];

export default function Demo() {
  const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 2 }, rowSelection: {}, activeRowId: null });
  const selected = data.filter(row => state.rowSelection[row.id]);
  return <Stack>
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" state={state} onStateChange={setState} pagination={{ pageSizeOptions: [2, 5] }} selection={{ label: "选择当页条目", rowLabel: row => `选择${row.label}` }} activeRow={{ columnId: "label" }} />
    <output className="text-support text-muted-foreground">已选：{selected.map(row => row.label).join("、") || "无"}</output>
  </Stack>;
}
