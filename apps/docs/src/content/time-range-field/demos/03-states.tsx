import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeRangeField } from "@qingye_lab/ui/components/time-range-field";

export const meta = { title: "只读与禁用", titleEn: "Read-only and disabled" };

const value = { start: "09:00", end: "12:30" };

export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2"><Field><FieldLabel>只读时段</FieldLabel><TimeRangeField defaultValue={value} readOnly /></Field><Field disabled><FieldLabel>禁用时段</FieldLabel><TimeRangeField defaultValue={value} /></Field></div>;
}
