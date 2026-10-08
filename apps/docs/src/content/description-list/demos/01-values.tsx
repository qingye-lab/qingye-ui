import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "值与未知", titleEn: "Values and uncertainty" } satisfies DemoMeta;

export default function Demo() {
  // 名称按内容宽度成列，多行共用同一条值的起始线；窄屏自动回到名称在上。
  // 演示只给名称与值，不编造业务流程（值可以是 0，也可以是「未知」）。
  return <DescriptionList className="max-w-md">
    <DescriptionListItem><DescriptionListTerm>名称</DescriptionListTerm><DescriptionListDetail>接入与设备</DescriptionListDetail></DescriptionListItem>
    <DescriptionListItem><DescriptionListTerm>记录数</DescriptionListTerm><DescriptionListDetail className="numeric">{0}</DescriptionListDetail></DescriptionListItem>
    <DescriptionListItem><DescriptionListTerm>最近同步</DescriptionListTerm><DescriptionListDetail>未知</DescriptionListDetail></DescriptionListItem>
    <DescriptionListItem><DescriptionListTerm>保留策略</DescriptionListTerm><DescriptionListDetail>滚动保留最近 90 天，更早的记录按周归档</DescriptionListDetail></DescriptionListItem>
  </DescriptionList>;
}
