import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye/ui/components/field";

export const meta = { title: "尺寸", titleEn: "Sizes" };

export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
    <Field key={size} orientation="horizontal"><Checkbox size={size} defaultChecked /><FieldLabel>{size}</FieldLabel></Field>
  ))}</div>;
}
