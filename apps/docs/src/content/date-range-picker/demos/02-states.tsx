import { DateRangePicker } from "@qingye/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "只读与禁用", titleEn: "Read-only and disabled" };
const value = { from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) };
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2"><Field><FieldLabel>只读范围</FieldLabel><DateRangePicker value={value} onValueChange={() => {}} readOnly /></Field><Field disabled><FieldLabel>禁用范围</FieldLabel><DateRangePicker value={value} onValueChange={() => {}} /></Field></div>;
}
