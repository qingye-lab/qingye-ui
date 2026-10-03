import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Stack } from "@qingye/ui/components/layout";
import { Step, StepDescription, Steps, StepTitle, type StepState } from "@qingye/ui/components/steps";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "明确的过程状态", titleEn: "Explicit process states" } satisfies DemoMeta;
export default function Demo() {
  const [state, setState] = useState<StepState>("current");
  return <Stack><Steps><Step state={state}><StepTitle>第一步</StepTitle><StepDescription>{state === "complete" ? "已标记完成" : "等待标记完成"}</StepDescription></Step><Step state="upcoming"><StepTitle>第二步</StepTitle></Step><Step state="error"><StepTitle>第三步</StepTitle><StepDescription>需要重新编辑</StepDescription></Step></Steps><Button className="self-start" variant="bordered" onClick={() => setState(state === "complete" ? "current" : "complete")}>{state === "complete" ? "返回进行中" : "标记完成"}</Button></Stack>;
}
