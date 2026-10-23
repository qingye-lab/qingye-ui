import * as React from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "长集合、行激活与编辑", titleEn: "Long collection, row activation and editing" } satisfies DemoMeta;

type Entry = { id: string; index: number };
const initialRows: Entry[] = Array.from({ length: 500 }, (_, index) => ({ id: `record-${index + 1}`, index: index + 1 }));

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const [data, setData] = React.useState(initialRows);
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});
  const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 20 }, rowSelection: {}, activeRowId: null });
  const [appearance, setAppearance] = React.useState<"row" | "checkbox">("checkbox");
  const [density, setDensity] = React.useState("comfortable");
  const label = (row: Entry) => english ? `Record ${String(row.index).padStart(3, "0")}` : `记录 ${String(row.index).padStart(3, "0")}`;
  const columns: DataTablePatternColumn<Entry>[] = [
    { id: "label", header: english ? "Name" : "名称", accessor: label, rowHeader: true, size: 160, ellipsis: true },
    { id: "note", header: english ? "Note" : "备注", accessor: row => row.index % 7 === 0 ? english ? "Keep the complete note available while comparing records, including text that wraps onto several lines." : "比较记录时保留完整备注；这条较长的记录会自然换行，行高由实际内容决定。" : english ? "Ready for comparison" : "待比较", size: 240 },
    { id: "draft", header: english ? "Draft" : "草稿", accessor: row => drafts[row.id] ?? "", size: 200, cell: row => <Input aria-label={english ? `Draft for ${label(row)}` : `${label(row)}的草稿`} value={drafts[row.id] ?? ""} onChange={event => setDrafts(previous => ({ ...previous, [row.id]: event.target.value }))} /> },
    { id: "actions", header: english ? "Action" : "操作", accessor: row => row.id, size: 100, cell: row => <Button variant="quiet" size="sm" aria-label={english ? `Remove ${label(row)}` : `移除${label(row)}`} onClick={() => {
      setData(previous => previous.filter(item => item.id !== row.id));
      setState(previous => {
        const rowSelection = { ...previous.rowSelection };
        delete rowSelection[row.id];
        return { ...previous, rowSelection, activeRowId: previous.activeRowId === row.id ? null : previous.activeRowId };
      });
    }}>{english ? "Remove" : "移除"}</Button> },
  ];
  const active = data.find(row => row.id === state.activeRowId);
  return <Stack data-density={density === "compact" ? "compact" : undefined}>
    <Inline gap="field" className="flex-wrap">
      <SegmentedControl aria-label={english ? "Selection appearance" : "选择外观"} value={appearance} onValueChange={value => setAppearance(value as "row" | "checkbox")}>
        <SegmentedControlItem value="checkbox">{english ? "Checkbox" : "复选框"}</SegmentedControlItem>
        <SegmentedControlItem value="row">{english ? "Row fill" : "行底色"}</SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl aria-label={english ? "Density" : "密度"} value={density} onValueChange={setDensity}>
        <SegmentedControlItem value="comfortable">{english ? "Comfortable" : "常规"}</SegmentedControlItem>
        <SegmentedControlItem value="compact">{english ? "Compact" : "紧凑"}</SegmentedControlItem>
      </SegmentedControl>
    </Inline>
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? `Local collection · ${data.length} records` : `本地集合 · ${data.length} 项`} emptyContent={english ? "No local records" : "本地集合没有记录"} state={state} onStateChange={setState} selection={{ label: english ? "Select the complete collection" : "选择整个集合", rowLabel: row => english ? `Select ${label(row)}` : `选择${label(row)}` }} selectionAppearance={appearance} activeRow={{ trigger: "row" }} virtualization={{ height: 320, estimateRowHeight: 48, overscan: 2 }} />
    <output className="text-support text-muted-foreground">{english ? `Selected: ${Object.keys(state.rowSelection).length} · Active: ${active ? label(active) : "None"}` : `已选 ${Object.keys(state.rowSelection).length} 项 · 当前：${active ? label(active) : "无"}`}</output>
  </Stack>;
}
