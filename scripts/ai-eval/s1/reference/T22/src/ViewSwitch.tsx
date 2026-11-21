import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";

export type ViewSwitchProps = {
  value: "list" | "grid";
  onValueChange: (value: "list" | "grid") => void;
};

// 必选互斥值用 SegmentedControl（指南 toggle-group.md：single 允许全部松开，不能冒充必选 radio）
export function ViewSwitch({ value, onValueChange }: ViewSwitchProps) {
  return (
    <SegmentedControl aria-label="视图" value={value} onValueChange={(v) => onValueChange(v as "list" | "grid")}>
      <SegmentedControlItem value="list">列表</SegmentedControlItem>
      <SegmentedControlItem value="grid">网格</SegmentedControlItem>
    </SegmentedControl>
  );
}
