import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "名称列", titleEn: "Label column" };

export default function Demo() {
  return (
    <FieldGroup labelColumn className="w-full max-w-lg">
      <Field><FieldLabel>姓名</FieldLabel><Input defaultValue="青野" /></Field>
      <Field><FieldLabel>联系邮箱</FieldLabel><Input type="email" /><FieldDescription>说明与错误留在控件下方。</FieldDescription></Field>
      <FieldSeparator />
      <Field><FieldLabel>备注</FieldLabel><Input /></Field>
      <Field><Button className="justify-self-start">保存</Button></Field>
    </FieldGroup>
  );
}
