import { useState } from "react";
import { DateRangePicker, type DateRangePreset, type DateRangeValue } from "@qingye_lab/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "常用范围", titleEn: "Presets" };

const lastDays = (count: number) => (): DateRangeValue => {
  const to = new Date();
  to.setHours(0, 0, 0, 0);
  const from = new Date(to);
  from.setDate(to.getDate() - (count - 1));
  return { from, to };
};
const thisMonth = (): DateRangeValue => {
  const now = new Date();
  return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: new Date(now.getFullYear(), now.getMonth() + 1, 0) };
};
const presets: DateRangePreset[] = [
  { label: "近 7 日", value: lastDays(7) },
  { label: "近 30 日", value: lastDays(30) },
  { label: "本月", value: thisMonth },
];

export default function Demo() {
  const [value, setValue] = useState<DateRangeValue | undefined>();
  return <form><Field name="range"><FieldLabel>统计区间</FieldLabel><DateRangePicker value={value} onValueChange={setValue} presets={presets} /></Field></form>;
}
