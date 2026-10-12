import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye_lab/ui/components/accordion";
export const meta = { title: "页内查找", titleEn: "Find in page" };
export default function AccordionDemo() {
  return <Accordion hiddenUntilFound className="w-full max-w-sm">
    <AccordionItem value="shipping"><AccordionHeader render={<h4 />}><AccordionTrigger>配送</AccordionTrigger></AccordionHeader><AccordionPanel>下单后三个工作日内发出，偏远地区另加两天。</AccordionPanel></AccordionItem>
    <AccordionItem value="returns"><AccordionHeader render={<h4 />}><AccordionTrigger>退换</AccordionTrigger></AccordionHeader><AccordionPanel>签收后七日内可退换，商品需保持原包装。</AccordionPanel></AccordionItem>
    <AccordionItem value="invoice"><AccordionHeader render={<h4 />}><AccordionTrigger>发票</AccordionTrigger></AccordionHeader><AccordionPanel>电子发票在发货后写入订单详情。</AccordionPanel></AccordionItem>
  </Accordion>;
}
