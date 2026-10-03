import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "禁用", titleEn: "Disabled" };

export default function Demo() {
  return <Field className="w-full max-w-xs" disabled><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" /></Field>;
}
