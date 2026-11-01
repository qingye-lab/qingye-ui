import { useState } from "react";
import { DateTimeRangePicker, type DateTimeRangeValue } from "@qingye_lab/ui/components/date-time-range-picker";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "起止日期时间", titleEn: "Date and time endpoints" };

export default function Demo() {
  const [value, setValue] = useState<DateTimeRangeValue | undefined>({ from: "2026-10-03T09:30", to: "2026-10-05T17:00" });
  return <form><Field name="slot"><FieldLabel>活动时段</FieldLabel><DateTimeRangePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /><FieldDescription>当地时间</FieldDescription></Field></form>;
}
