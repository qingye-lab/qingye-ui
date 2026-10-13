import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye_lab/ui/components/accordion";

export default function Cover() {
  return <Accordion defaultValue={["first"]} className="w-full">
    <AccordionItem value="first"><AccordionHeader render={<h4 />}><AccordionTrigger>第一项</AccordionTrigger></AccordionHeader><AccordionPanel>第一项内容</AccordionPanel></AccordionItem>
    <AccordionItem value="second"><AccordionHeader render={<h4 />}><AccordionTrigger>第二项</AccordionTrigger></AccordionHeader><AccordionPanel>第二项内容</AccordionPanel></AccordionItem>
  </Accordion>;
}
