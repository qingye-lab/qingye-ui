// 错解（DN 自然解）：不可退款写在“退款规则”面板里
import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye_lab/ui/components/accordion";
import { Stack } from "@qingye_lab/ui/components/layout";

export type PlanChangeProps = {
  charges: string;
  refundPolicy: string;
  invoice: string;
  nonRefundable: boolean;
};

export function PlanChange({ charges, refundPolicy, invoice, nonRefundable }: PlanChangeProps) {
  return (
    <Stack gap="panel">
      <Accordion>
        <AccordionItem value="charges">
          <AccordionHeader><AccordionTrigger>费用明细</AccordionTrigger></AccordionHeader>
          <AccordionPanel>{charges}</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="refund">
          <AccordionHeader><AccordionTrigger>退款规则</AccordionTrigger></AccordionHeader>
          <AccordionPanel>{nonRefundable && <p>变更后不可退款</p>}{refundPolicy}</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="invoice">
          <AccordionHeader><AccordionTrigger>发票</AccordionTrigger></AccordionHeader>
          <AccordionPanel>{invoice}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
