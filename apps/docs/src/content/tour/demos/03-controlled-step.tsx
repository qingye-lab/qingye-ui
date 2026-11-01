import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Tour, type TourStep } from "@qingye_lab/ui/components/tour";

export const meta = { title: "受控的步骤与结束", titleEn: "Controlled step and ending" };

const steps: TourStep[] = [
  { target: () => document.getElementById("tour-controlled-a"), title: "第一处" },
  { target: () => document.getElementById("tour-controlled-b"), title: "第二处" },
  { target: () => document.getElementById("tour-controlled-missing"), title: "不在页面上的一步" },
];

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState("尚未开始");
  return (
    <Inline gap="actions">
      <Button id="tour-controlled-a" variant="bordered">甲</Button>
      <Button id="tour-controlled-b" variant="bordered">乙</Button>
      <Button variant="quiet" onClick={() => { setStep(0); setOpen(true); }}>开始引导</Button>
      <span className="text-body text-muted-foreground" role="status">{result}</span>
      <Tour
        steps={steps}
        open={open}
        step={step}
        onStepChange={setStep}
        onOpenChange={(next, { reason }) => {
          setOpen(next);
          if (!next) setResult(reason === "finish" ? "已完成" : reason === "skip" ? "已跳过" : "已退出");
        }}
      />
    </Inline>
  );
}
