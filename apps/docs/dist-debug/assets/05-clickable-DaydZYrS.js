const n=`import { Button } from "@qingye/ui/components/button";
import { Steps } from "@qingye/ui/components/steps";
import { useState } from "react";

export const meta = {
  title: "可点击的向导",
  description: "onStepClick 让步骤成为按钮；之后的步骤设为 disabled，只能回到已完成的步骤。",
};

const steps = [
  { id: "plan", title: "选择套餐", body: "专业版 · 按年付费，每席位 ¥59/月。" },
  { id: "team", title: "邀请成员", body: "已邀请 林晓雯、周子航 等 6 位成员。" },
  { id: "pay", title: "确认支付", body: "合计 ¥4,248，支持对公转账与企业支付宝。" },
];

export default function Demo() {
  const [current, setCurrent] = useState(1);
  return (
    <div className="flex w-full max-w-xl flex-col gap-6">
      <Steps
        current={current}
        items={steps.map((step, index) => ({ ...step, disabled: index > current }))}
        label="开通向导"
        onStepClick={setCurrent}
      />
      <p className="rounded-lg bg-muted px-4 py-3 text-sm">{steps[current]?.body}</p>
      <div className="flex justify-end gap-2">
        <Button disabled={current === 0} onClick={() => setCurrent(current - 1)} variant="outline">
          上一步
        </Button>
        <Button disabled={current === steps.length - 1} onClick={() => setCurrent(current + 1)}>
          下一步
        </Button>
      </div>
    </div>
  );
}
`;export{n as default};
