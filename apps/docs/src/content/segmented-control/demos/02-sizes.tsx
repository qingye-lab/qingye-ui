import { RadioGroupPrimitive, RadioPrimitive } from "@yanqing/ui/components/radio-group";
import { segmentedControlItemVariants, segmentedControlRootClassName } from "@yanqing/ui/components/segmented-control";

export const meta = { title: "尺寸", description: "sm、default、lg 三档。" };

const sizes = ["sm", "default", "lg"] as const;
const ranges = [
  { value: "24h", label: "24 小时" },
  { value: "7d", label: "7 天" },
  { value: "30d", label: "30 天" },
];

export default function Demo() {
  return (
    <div className="flex flex-col items-center gap-4">
      {sizes.map((size) => (
        <RadioGroupPrimitive
          aria-label="统计范围"
          className={segmentedControlRootClassName}
          defaultValue="7d"
          key={size}
        >
          {ranges.map((range) => (
            <RadioPrimitive.Root
              className={segmentedControlItemVariants({ size, state: "checked" })}
              key={range.value}
              value={range.value}
            >
              {range.label}
            </RadioPrimitive.Root>
          ))}
        </RadioGroupPrimitive>
      ))}
    </div>
  );
}
