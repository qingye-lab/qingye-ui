import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "整组禁用", titleEn: "Disabled group" };

export default function Demo() {
  return <Fieldset className="w-full max-w-sm" disabled><FieldsetLegend>名称</FieldsetLegend><Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>简称</FieldLabel><Input defaultValue="Qingye" /></Field></Fieldset>;
}
