import { Combobox, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye/ui/components/combobox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "五档与只读", titleEn: "Five sizes and read-only" };
const items = ["甲", "乙", "丙"];
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Field key={size}><FieldLabel>{size}</FieldLabel><Combobox size={size} items={items} defaultValue="甲"><div className="flex min-w-0 gap-(--qy-action-gap)"><ComboboxInput /><ComboboxTrigger /></div><ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox></Field>)}<Field><FieldLabel>只读候选</FieldLabel><Combobox readOnly items={items} defaultValue="甲"><div className="flex min-w-0 gap-(--qy-action-gap)"><ComboboxInput /><ComboboxTrigger /></div></Combobox></Field></div>;
}
