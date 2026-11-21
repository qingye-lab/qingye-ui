export type PlanChangeProps = {
  charges: string;
  refundPolicy: string;
  invoice: string;
  nonRefundable: boolean;
};

// 错解：原生 details/summary，不可退款可见
export function PlanChange({ charges, refundPolicy, invoice, nonRefundable }: PlanChangeProps) {
  return (
    <div>
      {nonRefundable && <p>变更后不可退款</p>}
      <details><summary>费用明细</summary>{charges}</details>
      <details><summary>退款规则</summary>{refundPolicy}</details>
      <details><summary>发票</summary>{invoice}</details>
    </div>
  );
}
