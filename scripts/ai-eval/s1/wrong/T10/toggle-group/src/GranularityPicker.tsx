import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";

export type Granularity = "day" | "week" | "month";

export type GranularityPickerProps = {
  value: Granularity;
  onChange: (value: Granularity) => void;
};

// ToggleGroup：再次按压当前项会得到空集合，这里按空值透传
export function GranularityPicker({ value, onChange }: GranularityPickerProps) {
  return (
    <ToggleGroup aria-label="时间粒度" value={[value]} onValueChange={next => onChange(next[0] as Granularity)}>
      <ToggleGroupItem value="day">日</ToggleGroupItem>
      <ToggleGroupItem value="week">周</ToggleGroupItem>
      <ToggleGroupItem value="month">月</ToggleGroupItem>
    </ToggleGroup>
  );
}
