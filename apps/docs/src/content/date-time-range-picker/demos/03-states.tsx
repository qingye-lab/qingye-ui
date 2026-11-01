import { DateTimeRangePicker } from "@qingye_lab/ui/components/date-time-range-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "只读与禁用", titleEn: "Read-only and disabled" };

const value = { from: "2026-10-03T09:30", to: "2026-10-05T17:00" };

export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap)"><Field><FieldLabel>只读时段</FieldLabel><DateTimeRangePicker value={value} onValueChange={() => {}} readOnly /></Field><Field disabled><FieldLabel>禁用时段</FieldLabel><DateTimeRangePicker value={value} onValueChange={() => {}} /></Field></div>;
}
