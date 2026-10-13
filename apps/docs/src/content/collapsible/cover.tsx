import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";

export default function Cover() {
  return <Collapsible defaultOpen className="w-full"><CollapsibleTrigger>补充内容</CollapsibleTrigger><CollapsiblePanel>内容</CollapsiblePanel></Collapsible>;
}
