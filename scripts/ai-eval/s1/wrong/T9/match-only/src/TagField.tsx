import { useState } from "react";
import { Autocomplete, AutocompleteControl, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup } from "@qingye_lab/ui/components/autocomplete";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Inline } from "@qingye_lab/ui/components/layout";

export type TagFieldProps = {
  suggestions: string[];
  onSubmit: (tag: string) => void;
};

// 用了 Autocomplete，但只接受候选里已有的文字
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
      <Button onClick={() => { if (suggestions.includes(value)) onSubmit(value); }}>添加</Button>
    </Inline>
  );
}
