import { useId } from "react";
import { Field, FieldTitle } from "@qingye_lab/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";

export type Granularity = "day" | "week" | "month";

export type GranularityPickerProps = {
  value: Granularity;
  onChange: (value: Granularity) => void;
};

// 只产生一个新值、没有面板：SegmentedControl（指南 segmented-control.md Decision）
export function GranularityPicker({ value, onChange }: GranularityPickerProps) {
  const id = useId();
  return (
    <Field>
      <FieldTitle id={id}>时间粒度</FieldTitle>
      <SegmentedControl value={value} onValueChange={next => onChange(next as Granularity)} aria-labelledby={id}>
        <SegmentedControlItem value="day">日</SegmentedControlItem>
        <SegmentedControlItem value="week">周</SegmentedControlItem>
        <SegmentedControlItem value="month">月</SegmentedControlItem>
      </SegmentedControl>
    </Field>
  );
}
