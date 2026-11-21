import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Inline } from "@qingye_lab/ui/components/layout";

export type TagFieldProps = {
  suggestions: string[];
  onSubmit: (tag: string) => void;
};

// DN 自然解：Combobox，值只能来自候选
export function TagField({ suggestions, onSubmit }: TagFieldProps) {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Inline gap="actions" align="end">
      <Field>
        <FieldLabel>标签</FieldLabel>
        <ComboboxSelect items={suggestions} itemToStringLabel={tag => tag} value={value} onValueChange={setValue} />
      </Field>
      <Button onClick={() => { if (value !== null) onSubmit(value); }}>添加</Button>
    </Inline>
  );
}
