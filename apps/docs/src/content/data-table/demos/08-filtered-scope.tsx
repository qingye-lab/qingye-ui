import * as React from "react";
import { DataTablePattern, type DataTablePatternColumn } from "@qingye_lab/ui/components/data-table";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "全选整个结果与修饰键", titleEn: "Select the whole result and modifier keys" } satisfies DemoMeta;

type Entry = { id: string; name: string; count: number };
const rows: Entry[] = Array.from({ length: 23 }, (_, index) => ({ id: `entry-${index + 1}`, name: `${String(index + 1).padStart(2, "0")}`, count: (index * 7) % 31 }));

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const [note, setNote] = React.useState("");
  const columns: DataTablePatternColumn<Entry>[] = [
    { id: "name", header: english ? "Name" : "名称", accessor: row => english ? `Entry ${row.name}` : `条目 ${row.name}`, rowHeader: true, sortable: true },
    { id: "count", header: english ? "Records" : "记录数", accessor: row => row.count, numeric: true, size: 120 },
  ];
  return <div className="flex min-w-0 flex-col gap-(--qy-panel-gap)">
    <DataTablePattern
      data={rows} columns={columns} getRowId={row => row.id}
      caption={english ? "Entries" : "条目"} emptyContent={english ? "No entries" : "没有条目"}
      pagination={{ pageSizeOptions: [5, 10] }} defaultState={{ pagination: { page: 1, pageSize: 5 } }}
      selection={{ label: english ? "Select entries" : "选择条目", rowLabel: row => english ? `Select Entry ${row.name}` : `选择条目 ${row.name}`, scope: "filtered" }}
      activeRow={{ trigger: "row", onActivate: (row, event) => setNote(`${english ? "Activated" : "已激活"} ${row.name}${event.metaKey || event.ctrlKey ? (english ? " with Cmd/Ctrl" : "，按住了 Cmd / Ctrl") : event.shiftKey ? (english ? " with Shift" : "，按住了 Shift") : ""}`)}}
    />
    <p role="status" className="text-body text-muted-foreground">{note}</p>
  </div>;
}
