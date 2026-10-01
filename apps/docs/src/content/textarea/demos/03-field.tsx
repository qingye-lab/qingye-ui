import { Field, FieldDescription, FieldLabel } from "@yanqing/ui/components/field";
import { Textarea } from "@yanqing/ui/components/textarea";
import { useState } from "react";

export const meta = { title: "配合标签与字数", description: "放在 Field 中，并用 maxLength 提示剩余字数。" };

export default function Demo() {
  const max = 200;
  const [value, setValue] = useState("");
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>问题描述</FieldLabel>
      <Textarea
        maxLength={max}
        onChange={(event) => setValue(event.target.value)}
        placeholder="请描述故障现象、出现时间和影响范围"
        value={value}
      />
      <FieldDescription aria-live="polite" className="numeric self-end">
        {value.length} / {max}
      </FieldDescription>
    </Field>
  );
}
