import { RadioGroupPrimitive, RadioPrimitive } from "@yanqing/ui/components/radio-group";
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@yanqing/ui/components/segmented-control";

export const meta = {
  title: "表单取值",
  description: "基于 RadioGroup，值会随表单提交；grow 让两个选项等宽。",
};

const item = segmentedControlItemVariants({ className: "grow", state: "checked" });

export default function Demo() {
  return (
    <RadioGroupPrimitive
      aria-label="计费周期"
      className={segmentedControlRootClassName}
      defaultValue="monthly"
      name="billing"
    >
      <RadioPrimitive.Root className={item} value="monthly">
        按月付费
      </RadioPrimitive.Root>
      <RadioPrimitive.Root className={item} value="yearly">
        按年付费
        <span className="text-success-foreground text-xs">省 20%</span>
      </RadioPrimitive.Root>
    </RadioGroupPrimitive>
  );
}
