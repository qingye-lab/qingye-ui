import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "字段组", titleEn: "Field groups" };

export default function Demo() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Fieldset><FieldsetLegend>名称</FieldsetLegend><Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>简称</FieldLabel><Input /></Field></Fieldset>
      <FieldSeparator>备注</FieldSeparator>
      <Field><FieldLabel>补充内容</FieldLabel><Input /></Field>
    </FieldGroup>
  );
}
