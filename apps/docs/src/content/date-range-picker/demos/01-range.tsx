import { useState } from "react";
import { DateRangePicker, type DateRangeValue } from "@qingye/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "起止日期", titleEn: "Date endpoints" };
export default function Demo() {
  const [value, setValue] = useState<DateRangeValue | undefined>();
  return <form><Field name="range"><FieldLabel>起止日期</FieldLabel><DateRangePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1), min: 1 }} /></Field></form>;
}
