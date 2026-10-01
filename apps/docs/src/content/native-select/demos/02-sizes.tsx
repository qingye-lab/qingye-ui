import { NativeSelect, NativeSelectOption } from "@yanqing/ui/components/native-select";

export const meta = { title: "尺寸", description: "与 Select 触发器相同的三档尺寸；移动端自动加高 4px。" };

const sizes = [
  { size: "sm", label: "小" },
  { size: "default", label: "默认" },
  { size: "lg", label: "大" },
] as const;

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {sizes.map(({ size, label }) => (
        <NativeSelect aria-label={`${label}尺寸`} defaultValue="week" key={size} size={size}>
          <NativeSelectOption value="day">按天汇总</NativeSelectOption>
          <NativeSelectOption value="week">按周汇总</NativeSelectOption>
          <NativeSelectOption value="month">按月汇总</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  );
}
