import { useState } from "react";
import { Combobox, ComboboxClear, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye/ui/components/combobox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "确认候选", titleEn: "Confirm a candidate" };
const items = ["甲", "乙", "丙"];
export default function Demo() {
  const [value, setValue] = useState<string | null>("甲");
  return <form><Field name="choice"><FieldLabel>候选</FieldLabel><Combobox items={items} value={value} onValueChange={setValue}><div className="flex min-w-0 gap-(--qy-action-gap)"><ComboboxInput /><ComboboxClear /><ComboboxTrigger /></div><ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox><output className="text-support text-muted-foreground">{value ?? "—"}</output></Field></form>;
}
