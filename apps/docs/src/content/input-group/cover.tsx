import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@qingye_lab/ui/components/input-group";

export default function Cover() {
  return <InputGroup className="w-full"><InputGroupInput inputMode="decimal" defaultValue="16" aria-label="数值" /><InputGroupAddon>px</InputGroupAddon><InputGroupButton>应用</InputGroupButton></InputGroup>;
}
