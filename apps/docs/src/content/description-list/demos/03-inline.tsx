import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "横排事实条", titleEn: "Inline facts" } satisfies DemoMeta;

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const rows: [string, string][] = en
    ? [["Created by", "Wang Lin"], ["Created", "2026-10-30 09:12"], ["Status", "Unknown"]]
    : [["创建人", "王林"], ["创建时间", "2026-10-30 09:12"], ["状态", "未知"]];
  return <DescriptionList layout="inline">
    {rows.map(([term, detail]) => <DescriptionListItem key={term}><DescriptionListTerm>{term}</DescriptionListTerm><DescriptionListDetail>{detail}</DescriptionListDetail></DescriptionListItem>)}
  </DescriptionList>;
}
