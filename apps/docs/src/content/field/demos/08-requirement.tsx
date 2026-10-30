import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "必填与选填", titleEn: "Required and optional" };

export default function Demo() {
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field><FieldLabel requirement="required">设备名称</FieldLabel><Input required /></Field>
      <Field><FieldLabel requirement="optional">备注</FieldLabel><Input /></Field>
    </FieldGroup>
  );
}
