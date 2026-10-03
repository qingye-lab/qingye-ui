import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "展开与保留输入", titleEn: "Reveal and retain input" };
export default function CollapsibleDemo() {
  return <Stack gap="fields" className="w-full max-w-sm"><Collapsible><CollapsibleTrigger>补充内容</CollapsibleTrigger><CollapsiblePanel><Label htmlFor="collapsible-value">输入</Label><Input id="collapsible-value" /></CollapsiblePanel></Collapsible><Collapsible disabled><CollapsibleTrigger>禁用展开</CollapsibleTrigger><CollapsiblePanel>内容</CollapsiblePanel></Collapsible></Stack>;
}
