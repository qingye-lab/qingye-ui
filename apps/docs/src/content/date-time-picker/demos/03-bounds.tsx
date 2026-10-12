import { DateTimePicker } from "@qingye_lab/ui/components/date-time-picker";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "时段范围", titleEn: "Bounds" };

export default function Demo() {
  return <form><Field name="slot"><FieldLabel>预约时间</FieldLabel><DateTimePicker defaultValue="2026-10-12T10:00" min="2026-10-12T09:00" max="2026-10-30T18:00" calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /><FieldDescription>10 月 12 日 09:00 起，10 月 30 日 18:00 止</FieldDescription></Field></form>;
}
