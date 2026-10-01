const e=`import { Input } from "@qingye/ui/components/input";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";

export const meta = {
  title: "与 Select、Input 并排",
  description: "高度、边框、内边距与图标位置和 Select 触发器完全一致，混用时不会错位。",
};

const plans = [
  { value: "monthly", label: "按月付费" },
  { value: "yearly", label: "按年付费" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      <Input aria-label="团队名称" defaultValue="青云设计" />
      <NativeSelect aria-label="付费周期（原生）" defaultValue="yearly">
        {plans.map((plan) => (
          <NativeSelectOption key={plan.value} value={plan.value}>
            {plan.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Select defaultValue="yearly" items={plans}>
        <SelectTrigger aria-label="付费周期">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {plans.map((plan) => (
            <SelectItem key={plan.value} value={plan.value}>
              {plan.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  );
}
`;export{e as default};
