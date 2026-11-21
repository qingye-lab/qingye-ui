import { useState } from "react";
import { Autocomplete, AutocompleteControl, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@qingye_lab/ui/components/autocomplete";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Inline } from "@qingye_lab/ui/components/layout";

export type TagFieldProps = {
  suggestions: string[];
  onSubmit: (tag: string) => void;
};

// 输入文字本身就是值，候选只是建议（指南 autocomplete.md Use：搜索词、标签名、地址）
export function TagField({ suggestions, onSubmit }: TagFieldProps) {
  const [value, setValue] = useState("");
  return (
    <Inline gap="actions" align="end">
      <Field>
        <FieldLabel>标签</FieldLabel>
        <Autocomplete items={suggestions} value={value} onValueChange={setValue}>
          <AutocompleteControl><AutocompleteInput /></AutocompleteControl>
          <AutocompletePopup>
            <AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList>
          </AutocompletePopup>
        </Autocomplete>
      </Field>
      <Button onClick={() => onSubmit(value)}>添加</Button>
    </Inline>
  );
}
