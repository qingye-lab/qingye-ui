import { Combobox, ComboboxClear, ComboboxControl, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye_lab/ui/components/combobox";

const members = ["陈致远", "李一鸣", "王一帆", "赵子纯"];

export default function Cover() {
  return <Combobox items={members} defaultValue="陈致远">
    <ComboboxControl className="w-full"><ComboboxInput aria-label="负责人" /><ComboboxClear /><ComboboxTrigger /></ComboboxControl>
    <ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup>
  </Combobox>;
}
