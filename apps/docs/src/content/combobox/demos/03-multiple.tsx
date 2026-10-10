import { useState } from "react";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxControl, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger, ComboboxValue } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "确认多个候选", titleEn: "Confirm several candidates" };
const members = ["陈致远", "李一鸣", "王一帆", "赵子纯", "周知行", "吴清和"];
export default function Demo() {
  const [value, setValue] = useState<string[]>(["陈致远", "王一帆"]);
  return <form className="w-full max-w-xs"><Field name="reviewers"><FieldLabel>评审人</FieldLabel><Combobox multiple items={members} value={value} onValueChange={setValue}>
    <ComboboxControl>
      <ComboboxChips><ComboboxValue>{(selected: string[]) => selected.map(member => <ComboboxChip key={member}>{member}</ComboboxChip>)}</ComboboxValue><ComboboxInput /></ComboboxChips>
      <ComboboxTrigger />
    </ComboboxControl>
    <ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup>
  </Combobox></Field></form>;
}
