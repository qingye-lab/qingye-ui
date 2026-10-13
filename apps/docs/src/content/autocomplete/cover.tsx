import { Autocomplete, AutocompleteClear, AutocompleteControl, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye_lab/ui/components/autocomplete";

const items = ["青叶", "青山", "白云"];

export default function Cover() {
  return <Autocomplete items={items} defaultValue="青">
    <AutocompleteControl className="w-full"><AutocompleteInput aria-label="文字" /><AutocompleteClear /><AutocompleteTrigger /></AutocompleteControl>
    <AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup>
  </Autocomplete>;
}
