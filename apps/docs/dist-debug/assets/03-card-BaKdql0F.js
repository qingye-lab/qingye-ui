const a=`import { Label } from "@qingye/ui/components/label";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";

export const meta = { title: "卡片选项", description: "适合套餐、方案这类需要对比的选择。" };

const plans = [
  { value: "basic", name: "基础版", detail: "10 台设备 · 7 天数据", price: "¥0" },
  { value: "pro", name: "专业版", detail: "200 台设备 · 90 天数据", price: "¥299/月" },
  { value: "enterprise", name: "企业版", detail: "不限设备 · 私有部署", price: "联系销售" },
];

export default function Demo() {
  return (
    <RadioGroup aria-label="订阅套餐" defaultValue="pro" className="grid w-full max-w-2xl gap-2 sm:grid-cols-3">
      {plans.map((plan) => (
        <Label
          key={plan.value}
          className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
        >
          <Radio value={plan.value} className="mt-px" />
          <span className="flex min-w-0 flex-col gap-1">
            <span>{plan.name}</span>
            <span className="font-normal text-muted-foreground text-xs">{plan.detail}</span>
            <span className="mt-1 font-semibold text-sm numeric">{plan.price}</span>
          </span>
        </Label>
      ))}
    </RadioGroup>
  );
}
`;export{a as default};
