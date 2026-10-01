const i=`import { RadioGroupPrimitive, RadioPrimitive } from "@qingye/ui/components/radio-group";
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@qingye/ui/components/segmented-control";

export const meta = { title: "禁用", description: "可以禁用单个选项，也可以禁用整组。" };

const item = segmentedControlItemVariants({ state: "checked" });

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <RadioGroupPrimitive aria-label="部署区域" className={segmentedControlRootClassName} defaultValue="hz">
        <RadioPrimitive.Root className={item} value="hz">
          华东
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} value="bj">
          华北
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} disabled value="sg">
          新加坡（即将开放）
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>
      <RadioGroupPrimitive
        aria-label="部署区域"
        className={segmentedControlRootClassName}
        defaultValue="hz"
        disabled
      >
        <RadioPrimitive.Root className={item} value="hz">
          华东
        </RadioPrimitive.Root>
        <RadioPrimitive.Root className={item} value="bj">
          华北
        </RadioPrimitive.Root>
      </RadioGroupPrimitive>
    </div>
  );
}
`;export{i as default};
