import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionTrigger } from "@qingye_lab/ui/components/accordion";
import { Stack } from "@qingye_lab/ui/components/layout";

export type PlanChangeProps = {
  charges: string;
  refundPolicy: string;
  invoice: string;
  nonRefundable: boolean;
};

// 唯一关键后果不放进默认收起的面板（指南 accordion.md：Avoid 唯一关键后果仅存在于默认隐藏内容）
export function PlanChange({ charges, refundPolicy, invoice, nonRefundable }: PlanChangeProps) {
  return (
    <Stack gap="panel">
      {nonRefundable && <p className="text-heading">变更后不可退款</p>}
      <Accordion>
        <AccordionItem value="charges">
          <AccordionHeader><AccordionTrigger>费用明细</AccordionTrigger></AccordionHeader>
          <AccordionPanel>{charges}</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="refund">
          <AccordionHeader><AccordionTrigger>退款规则</AccordionTrigger></AccordionHeader>
          <AccordionPanel>{refundPolicy}</AccordionPanel>
        </AccordionItem>
        <AccordionItem value="invoice">
          <AccordionHeader><AccordionTrigger>发票</AccordionTrigger></AccordionHeader>
          <AccordionPanel>{invoice}</AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Stack>
  );
}
