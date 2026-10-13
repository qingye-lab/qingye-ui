import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye_lab/ui/components/select";

const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Cover() {
  return <Select items={options} defaultValue="center">
    <SelectTrigger aria-label="对齐" className="w-full" />
    <SelectPopup>{options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectPopup>
  </Select>;
}
