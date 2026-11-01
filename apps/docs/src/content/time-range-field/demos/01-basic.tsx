import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeRangeField, type TimeRangeValue } from "@qingye_lab/ui/components/time-range-field";

export const meta = { title: "起止时间", titleEn: "Start and end" };

export default function Demo() {
  const [value, setValue] = useState<TimeRangeValue>({ start: "09:00", end: "18:00" });
  return <form><Field name="hours"><FieldLabel>营业时间</FieldLabel><TimeRangeField value={value} onValueChange={setValue} /><FieldDescription>当天内的起止</FieldDescription></Field></form>;
}
