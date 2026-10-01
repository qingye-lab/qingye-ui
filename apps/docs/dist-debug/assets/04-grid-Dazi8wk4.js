const e=`import { Badge } from "@qingye/ui/components/badge";
import { DescriptionDetails, DescriptionList, DescriptionListItem, DescriptionTerm } from "@qingye/ui/components/description-list";

export const meta = { title: "网格布局", description: "按容器宽度自动分列；窄屏单列，宽屏三到四列。可与 divided 同用。" };

const fields = [
  { term: "门店名称", value: "徐汇漕溪北路店" },
  { term: "门店编号", value: "XH-001", mono: true },
  { term: "负责人", value: "林嘉怡" },
  { term: "联系电话", value: "138 1652 0937", numeric: true },
  { term: "营业时间", value: "10:00–22:00", numeric: true },
  { term: "开业日期", value: "2023-04-18", numeric: true },
];

export default function Demo() {
  return (
    <div className="flex w-full flex-col gap-10">
      <DescriptionList layout="grid">
        {fields.map((field) => (
          <DescriptionListItem key={field.term}>
            <DescriptionTerm>{field.term}</DescriptionTerm>
            <DescriptionDetails className={field.mono ? "font-mono" : field.numeric ? "numeric" : undefined}>
              {field.value}
            </DescriptionDetails>
          </DescriptionListItem>
        ))}
        <DescriptionListItem>
          <DescriptionTerm>门店标签</DescriptionTerm>
          <DescriptionDetails className="flex flex-wrap gap-1.5">
            <Badge variant="outline">直营</Badge>
            <Badge variant="outline">24 小时外卖</Badge>
            <Badge variant="info">新品试点</Badge>
          </DescriptionDetails>
        </DescriptionListItem>
      </DescriptionList>
      <DescriptionList divided layout="grid">
        {fields.slice(0, 4).map((field) => (
          <DescriptionListItem key={field.term}>
            <DescriptionTerm>{field.term}</DescriptionTerm>
            <DescriptionDetails className={field.mono ? "font-mono" : field.numeric ? "numeric" : undefined}>
              {field.value}
            </DescriptionDetails>
          </DescriptionListItem>
        ))}
      </DescriptionList>
    </div>
  );
}
`;export{e as default};
