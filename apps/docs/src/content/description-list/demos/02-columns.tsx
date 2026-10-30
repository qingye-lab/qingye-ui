import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "多列", titleEn: "Columns" } satisfies DemoMeta;

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const rows: [string, string][] = en
    ? [["Name", "Intake and devices"], ["Records", "0"], ["Last sync", "Unknown"], ["Owner", "Wang Lin"], ["Region", "East"], ["Retention", "Rolling 90 days"]]
    : [["名称", "接入与设备"], ["记录数", "0"], ["最近同步", "未知"], ["负责人", "王林"], ["区域", "华东"], ["保留策略", "滚动保留 90 天"]];
  return <DescriptionList columns={3} className="w-full">
    {rows.map(([term, detail]) => <DescriptionListItem key={term}><DescriptionListTerm>{term}</DescriptionListTerm><DescriptionListDetail>{detail}</DescriptionListDetail></DescriptionListItem>)}
  </DescriptionList>;
}
