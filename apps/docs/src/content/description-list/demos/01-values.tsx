import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye/ui/components/description-list";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "值与未知", titleEn: "Values and uncertainty" } satisfies DemoMeta;
export default function Demo() {
  return <DescriptionList><DescriptionListItem className="sm:grid-cols-2"><DescriptionListTerm>数量</DescriptionListTerm><DescriptionListDetail>{0}</DescriptionListDetail></DescriptionListItem><DescriptionListItem className="sm:grid-cols-2"><DescriptionListTerm>宽度</DescriptionListTerm><DescriptionListDetail>未知</DescriptionListDetail></DescriptionListItem><DescriptionListItem className="sm:grid-cols-2"><DescriptionListTerm>名称</DescriptionListTerm><DescriptionListDetail>一段更长的名称，保留完整内容与原生名称值关系</DescriptionListDetail></DescriptionListItem></DescriptionList>;
}
