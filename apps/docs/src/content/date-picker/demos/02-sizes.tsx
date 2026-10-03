import { useState } from "react";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import type { InputSize } from "@qingye/ui/components/input";
export const meta = { title: "五档", titleEn: "Five sizes" };
function DateSize({ size }: { size: InputSize }) {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <Field><FieldLabel>{size}</FieldLabel><DatePicker size={size} value={value} onValueChange={setValue} /></Field>;
}
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <DateSize key={size} size={size} />)}<Field disabled><FieldLabel>禁用日期</FieldLabel><DatePicker value={new Date(2026, 9, 3)} onValueChange={() => {}} /></Field></div>;
}
