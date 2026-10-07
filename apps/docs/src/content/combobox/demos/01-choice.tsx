import { useState } from "react";
import { Combobox, ComboboxClear, ComboboxControl, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye/ui/components/combobox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "确认候选", titleEn: "Confirm a candidate" };
const members = ["陈致远", "李一鸣", "王一帆", "赵子纯"];
export default function Demo() {
  const [value, setValue] = useState<string | null>("陈致远");
  return <form className="max-w-xs"><Field name="owner"><FieldLabel>负责人</FieldLabel><Combobox items={members} value={value} onValueChange={setValue}><ComboboxControl><ComboboxInput /><ComboboxClear /><ComboboxTrigger /></ComboboxControl><ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox></Field></form>;
}
