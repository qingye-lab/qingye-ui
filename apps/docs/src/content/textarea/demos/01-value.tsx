import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export const meta = { title: "多行文本", titleEn: "Multiline text" };

export default function Demo() {
  const [value, setValue] = useState("第一行文字。\n第二行文字。");
  return (
    <Field className="w-full max-w-lg">
      <FieldLabel>备注</FieldLabel>
      <Textarea name="note" value={value} onValueChange={setValue} maxLength={160} />
      <FieldDescription>{value.length} / 160</FieldDescription>
    </Field>
  );
}
