import { Item, ItemContent, ItemTitle } from "@qingye_lab/ui/components/item";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "条目里显示名称", titleEn: "Name shown in a list" } satisfies DemoMeta;

const rows = [
  { name: "正文对比度低于 4.5:1", level: 3, label: "高", tone: "danger" },
  { name: "触屏目标小于 44px", level: 2, label: "中", tone: "warning" },
  { name: "行高不在 4px 格上", level: 1, label: "低", tone: "info" },
] as const;

export default function Demo() {
  return <ul className="m-0 w-full max-w-md list-none p-0">{rows.map(row => <Item render={<li />} key={row.name}>
    <ItemContent><ItemTitle>{row.name}</ItemTitle></ItemContent>
    <SeverityMark level={row.level} tone={row.tone} label={row.label} />
  </Item>)}</ul>;
}
