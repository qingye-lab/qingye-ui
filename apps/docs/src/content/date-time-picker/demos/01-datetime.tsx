import { useState } from "react";
import { DateTimePicker } from "@qingye_lab/ui/components/date-time-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "日期与时间", titleEn: "Date and time" };
export default function Demo() {
  const [value, setValue] = useState<string | undefined>();
  return <form><Field name="datetime"><FieldLabel>日期与时间</FieldLabel><DateTimePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field></form>;
}
