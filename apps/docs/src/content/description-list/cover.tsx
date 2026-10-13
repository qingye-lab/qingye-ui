import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";

export default function Cover() {
  return <DescriptionList className="w-full">
    <DescriptionListItem><DescriptionListTerm>名称</DescriptionListTerm><DescriptionListDetail>接入与设备</DescriptionListDetail></DescriptionListItem>
    <DescriptionListItem><DescriptionListTerm>记录数</DescriptionListTerm><DescriptionListDetail className="numeric">{0}</DescriptionListDetail></DescriptionListItem>
    <DescriptionListItem><DescriptionListTerm>最近同步</DescriptionListTerm><DescriptionListDetail>未知</DescriptionListDetail></DescriptionListItem>
  </DescriptionList>;
}
