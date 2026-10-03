import { useState } from "react";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "日期", titleEn: "Date" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <form><Field name="date"><FieldLabel>日期</FieldLabel><DatePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field></form>;
}
