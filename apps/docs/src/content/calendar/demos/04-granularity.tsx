import { useId, useState } from "react";
import { Calendar, formatLocalDate, type CalendarDateRange, type CalendarProps } from "@qingye_lab/ui/components/calendar";
import { Field, FieldTitle } from "@qingye_lab/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";

export const meta = { title: "周、月、季、年", titleEn: "Week, month, quarter, year" };

type Granularity = NonNullable<CalendarProps["granularity"]>;

export default function Demo() {
  const id = useId();
  const [granularity, setGranularity] = useState<Granularity>("week");
  const [value, setValue] = useState<CalendarDateRange | undefined>();
  const change = (next: Granularity) => { setGranularity(next); setValue(undefined); };
  return (
    <div className="grid justify-items-start gap-(--qy-field-group-gap)">
      <Field><FieldTitle id={id}>粒度</FieldTitle>
        <SegmentedControl value={granularity} onValueChange={change} aria-labelledby={id}>
          <SegmentedControlItem value="week">周</SegmentedControlItem>
          <SegmentedControlItem value="month">月</SegmentedControlItem>
          <SegmentedControlItem value="quarter">季</SegmentedControlItem>
          <SegmentedControlItem value="year">年</SegmentedControlItem>
        </SegmentedControl>
      </Field>
      <Calendar key={granularity} granularity={granularity} mode="range" selected={value} onSelect={setValue} defaultMonth={new Date(2026, 9, 1)} />
      <output className="text-support text-muted-foreground">{value?.from ? formatLocalDate(value.from) : "—"} / {value?.to ? formatLocalDate(value.to) : "—"}</output>
    </div>
  );
}
