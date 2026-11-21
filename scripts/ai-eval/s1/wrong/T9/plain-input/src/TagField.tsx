import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline } from "@qingye_lab/ui/components/layout";

export type TagFieldProps = {
  suggestions: string[];
  onSubmit: (tag: string) => void;
};

// 普通输入框，建议只以文字列在下方、不可选
export function TagField({ suggestions, onSubmit }: TagFieldProps) {
  const [value, setValue] = useState("");
  const shown = value ? suggestions.filter(s => s.includes(value)) : [];
  return (
    <div>
      <Inline gap="actions" align="end">
        <Field>
          <FieldLabel>标签</FieldLabel>
          <Input value={value} onValueChange={setValue} />
        </Field>
        <Button onClick={() => onSubmit(value)}>添加</Button>
      </Inline>
      <ul>{shown.map(s => <li key={s}>{s}</li>)}</ul>
    </div>
  );
}
