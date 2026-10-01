import type { DateRangePreset, DateRangeValue } from "@yanqing/ui/components/date-range-picker";
import { DateRangePicker } from "@yanqing/ui/components/date-range-picker";
import { Field, FieldLabel } from "@yanqing/ui/components/field";
import { useState } from "react";

export const meta = {
  title: "快捷范围",
  description: "常用时间段一键选定；桌面端在日历左侧，窄屏在顶部横向排列。",
};

const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const presets: DateRangePreset[] = [
  { label: "今天", value: () => ({ from: new Date(), to: new Date() }) },
  { label: "最近 7 天", value: () => ({ from: daysAgo(6), to: new Date() }) },
  { label: "最近 30 天", value: () => ({ from: daysAgo(29), to: new Date() }) },
  {
    label: "本月",
    value: () => {
      const today = new Date();
      return { from: new Date(today.getFullYear(), today.getMonth(), 1), to: today };
    },
  },
];

export default function Demo() {
  const [range, setRange] = useState<DateRangeValue | null>(() => ({ from: daysAgo(6), to: new Date() }));
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>统计区间</FieldLabel>
      <DateRangePicker
        disabledDates={{ after: new Date() }}
        onValueChange={setRange}
        presets={presets}
        value={range}
      />
    </Field>
  );
}
