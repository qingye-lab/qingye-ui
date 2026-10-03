import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "五档与只读", titleEn: "Five sizes and read-only" };
const items = ["青叶", "青山", "白云"];
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Field key={size}><FieldLabel>{size}</FieldLabel><Autocomplete size={size} items={items} defaultValue="青"><div className="flex min-w-0 gap-(--qy-action-gap)"><AutocompleteInput /><AutocompleteTrigger /></div><AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></Autocomplete></Field>)}<Field><FieldLabel>只读文本</FieldLabel><Autocomplete readOnly items={items} defaultValue="自由文本"><div className="flex min-w-0 gap-(--qy-action-gap)"><AutocompleteInput /><AutocompleteTrigger /></div></Autocomplete></Field></div>;
}
