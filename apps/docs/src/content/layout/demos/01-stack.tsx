import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { Stack } from "@qingye/ui/components/layout";

export const meta = { title: "纵向排列", titleEn: "Vertical layout" };

export default function Demo() {
  return (
    <Stack gap="fields" className="w-full max-w-sm" render={<section aria-label="名称" />}>
      <Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field>
      <Field><FieldLabel>简称</FieldLabel><Input defaultValue="Qingye" /><FieldDescription>可选。</FieldDescription></Field>
    </Stack>
  );
}
