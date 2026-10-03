import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye/ui/components/accordion";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
export const meta = { title: "展开与禁用", titleEn: "Open and disabled" };
export default function AccordionDemo() {
  return <Accordion multiple defaultValue={["first"]} className="w-full max-w-sm">
    <AccordionItem value="first"><AccordionHeader render={<h4 />}><AccordionTrigger>第一项</AccordionTrigger></AccordionHeader><AccordionPanel><Label htmlFor="accordion-value">输入</Label><Input id="accordion-value" defaultValue="" /></AccordionPanel></AccordionItem>
    <AccordionItem value="second"><AccordionHeader render={<h4 />}><AccordionTrigger>第二项</AccordionTrigger></AccordionHeader><AccordionPanel>第二项内容</AccordionPanel></AccordionItem>
    <AccordionItem value="disabled" disabled><AccordionHeader render={<h4 />}><AccordionTrigger>禁用项</AccordionTrigger></AccordionHeader><AccordionPanel>禁用项内容</AccordionPanel></AccordionItem>
  </Accordion>;
}
