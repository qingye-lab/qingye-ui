import { DataTablePattern, type DataTablePatternColumn } from "@qingye_lab/ui/components/data-table";
import { Link } from "@qingye_lab/ui/components/link";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "省略列里的链接", titleEn: "A link in an ellipsis column" } satisfies DemoMeta;

type Entry = { id: string; name: string; path: string; count: number };
export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const data: Entry[] = english ? [
    { id: "overview", name: "Quarterly overview of every connected workshop and remote site", path: "#overview", count: 12 },
    { id: "roles", name: "Roles", path: "#roles", count: 8 },
    { id: "export", name: "Nightly export to the shared archive, including attachments", path: "#export", count: 3 },
  ] : [
    { id: "overview", name: "所有接入车间与远端站点的季度总览，包含各站点的在线与离线记录", path: "#overview", count: 12 },
    { id: "roles", name: "角色", path: "#roles", count: 8 },
    { id: "export", name: "每晚导出到共享归档的任务，含附件与历史版本", path: "#export", count: 3 },
  ];
  const columns: DataTablePatternColumn<Entry>[] = [
    { id: "name", header: english ? "Name" : "名称", accessor: row => row.name, rowHeader: true, size: 220, ellipsis: true, cell: row => <Link href={row.path}>{row.name}</Link> },
    { id: "count", header: english ? "Records" : "记录数", accessor: row => row.count, size: 96, numeric: true },
  ];
  return <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? "Entries" : "条目"} emptyContent={english ? "No entries" : "没有条目"} />;
}
