import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "位置档案", titleEn: "Size profiles" };

export default function Demo() {
  return <div className="grid w-full max-w-sm gap-(--qy-field-group-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => <Field key={size}><FieldLabel>{size}</FieldLabel><Input size={size} defaultValue="青野 · Qingye" /></Field>)}</div>;
}
