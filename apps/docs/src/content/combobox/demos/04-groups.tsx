import { useState } from "react";
import { Combobox, ComboboxChip, ComboboxChips, ComboboxClear, ComboboxCollection, ComboboxControl, ComboboxEmpty, ComboboxGroup, ComboboxGroupLabel, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger, ComboboxValue } from "@qingye_lab/ui/components/combobox";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "分组候选", titleEn: "Grouped candidates" };
const teams = [
  { value: "设计", items: ["陈致远", "李一鸣", "王一帆"] },
  { value: "工程", items: ["赵子纯", "周知行", "吴清和"] },
];
function Groups() {
  return <ComboboxList>{(group: (typeof teams)[number]) => <ComboboxGroup key={group.value} items={group.items}><ComboboxGroupLabel>{group.value}</ComboboxGroupLabel><ComboboxCollection>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxCollection></ComboboxGroup>}</ComboboxList>;
}
export default function Demo() {
  const [owner, setOwner] = useState<string | null>("李一鸣");
  const [reviewers, setReviewers] = useState<string[]>(["陈致远", "周知行"]);
  return <form className="w-full"><FieldGroup className="grid grid-cols-2 items-start">
    <Field name="owner"><FieldLabel>负责人</FieldLabel><Combobox items={teams} value={owner} onValueChange={setOwner}><ComboboxControl><ComboboxInput /><ComboboxClear /><ComboboxTrigger /></ComboboxControl><ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><Groups /></ComboboxPopup></Combobox></Field>
    <Field name="reviewers"><FieldLabel>评审人</FieldLabel><Combobox multiple items={teams} value={reviewers} onValueChange={setReviewers}><ComboboxControl><ComboboxChips><ComboboxValue>{(selected: string[]) => selected.map(member => <ComboboxChip key={member}>{member}</ComboboxChip>)}</ComboboxValue><ComboboxInput /></ComboboxChips><ComboboxTrigger /></ComboboxControl><ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><Groups /></ComboboxPopup></Combobox></Field>
  </FieldGroup></form>;
}
