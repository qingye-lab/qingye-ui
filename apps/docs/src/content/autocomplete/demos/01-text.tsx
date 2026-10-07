import { useState } from "react";
import { Autocomplete, AutocompleteControl, AutocompleteClear, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "自由文本", titleEn: "Free text" };
const items = ["青叶", "青山", "白云"];
export default function Demo() {
  const [value, setValue] = useState("");
  return <form><Field name="text"><FieldLabel>文字</FieldLabel><Autocomplete items={items} value={value} onValueChange={setValue}><AutocompleteControl><AutocompleteInput /><AutocompleteClear /><AutocompleteTrigger /></AutocompleteControl><AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></Autocomplete><output className="text-support text-muted-foreground">{value || "—"}</output></Field></form>;
}
