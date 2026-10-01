import { Field, FieldDescription, FieldLabel, Input } from "@yanqing/ui";
import { useState } from "react";

export const meta = { title: "字数提示", description: "用 maxLength 限制长度，并在说明里实时显示剩余字数。" };

export default function Demo() {
  const max = 20;
  const [value, setValue] = useState("杭州滨江仓");
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>仓库简称</FieldLabel>
      <Input maxLength={max} onChange={(event) => setValue(event.target.value)} value={value} />
      <FieldDescription aria-live="polite" className="numeric">
        还可输入 {max - value.length} 个字
      </FieldDescription>
    </Field>
  );
}
