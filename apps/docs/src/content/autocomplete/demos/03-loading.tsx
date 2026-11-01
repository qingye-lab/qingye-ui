import { useEffect, useState } from "react";
import { Autocomplete, AutocompleteControl, AutocompleteEmpty, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteStatus } from "@qingye_lab/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "候选加载中", titleEn: "Loading suggestions" };

const all = ["青叶", "青山", "青云", "白云", "白鹭"];

export default function Demo() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<string[]>([]);
  useEffect(() => {
    if (value === "") { setItems([]); setLoading(false); return; }
    setLoading(true);
    const timer = window.setTimeout(() => { setItems(all.filter(item => item.includes(value))); setLoading(false); }, 900);
    return () => window.clearTimeout(timer);
  }, [value]);
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>项目</FieldLabel>
      <Autocomplete items={items} filter={null} value={value} onValueChange={setValue} loading={loading}>
        <AutocompleteControl><AutocompleteInput /></AutocompleteControl>
        <AutocompletePopup>
          <AutocompleteStatus />
          <AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList>
          <AutocompleteEmpty>没有名称含「{value}」的项目</AutocompleteEmpty>
        </AutocompletePopup>
      </Autocomplete>
    </Field>
  );
}
