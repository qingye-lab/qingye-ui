import { DateTimePicker } from "@qingye_lab/ui/components/date-time-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "只读与禁用", titleEn: "Read-only and disabled" };
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2"><Field><FieldLabel>只读日期时间</FieldLabel><DateTimePicker value="2026-10-03T12:30" onValueChange={() => {}} readOnly /></Field><Field disabled><FieldLabel>禁用日期时间</FieldLabel><DateTimePicker value="2026-10-03T12:30" onValueChange={() => {}} /></Field></div>;
}
