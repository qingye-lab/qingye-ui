import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Tour, type TourStep } from "@qingye_lab/ui/components/tour";

export const meta = { title: "分步引导", titleEn: "Step by step" };

const steps: TourStep[] = [
  { target: () => document.getElementById("tour-basic-new"), title: "新建", description: "从这里开始一份新的内容。" },
  { target: () => document.getElementById("tour-basic-import"), title: "导入", description: "把已有的文件带进来。" },
  { target: () => document.getElementById("tour-basic-share"), title: "分享", description: "完成后交给其他人。", side: "top" },
];

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <Inline gap="actions">
      <Button id="tour-basic-new" variant="bordered">新建</Button>
      <Button id="tour-basic-import" variant="bordered">导入</Button>
      <Button id="tour-basic-share" variant="bordered">分享</Button>
      <Button variant="quiet" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour steps={steps} open={open} onOpenChange={next => setOpen(next)} />
    </Inline>
  );
}
