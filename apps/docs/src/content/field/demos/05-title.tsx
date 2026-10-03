import { useId } from "react";
import { Field, FieldDescription, FieldGroup, FieldTitle } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "标题与自命名控件", titleEn: "Title and self-named control" };

export default function Demo() {
  const titleId = useId();
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field><FieldTitle id={titleId}>设备名称</FieldTitle><Input aria-labelledby={titleId} defaultValue="青野" /></Field>
      <Field><FieldTitle>备注</FieldTitle><FieldDescription>未填写。</FieldDescription></Field>
    </FieldGroup>
  );
}
