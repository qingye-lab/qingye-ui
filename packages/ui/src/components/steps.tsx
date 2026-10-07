"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { CheckIcon, XIcon } from "lucide-react";
import { threadClassName } from "../thread";
import { cn } from "../utils";

/*
 * 步骤是一条路径上的几个点（基础层 §6、§19；应物象形：圆以标点，骨法用笔：线就是路径）。
 * - 点：直径一材，正好坐在标题那一行里，中心整数对齐；序号用计数器，不依赖调用方传入。
 * - 线：1px，从这一点的下缘到下一点的上缘，各留半分；走过的那段是焦墨，没走过的是清墨。
 * - 状态落在点上：完成 = 焦墨实心 + 对勾；进行中 = 焦墨圈 + 序号；未开始 = 重墨圈 + 浓墨序号；
 *   出错 = 危险实心 + 叉。状态名只给读屏——它与点表达的是同一件事（NG1）。
 * - 步与步之间一个组间距；最后一步没有线。
 */
export type StepsProps = useRender.ComponentProps<"ol">;
export function Steps({ render, className, ...props }: StepsProps) {
  const { messages } = useUILocale();
  return useRender({ defaultTagName: "ol", render, props: mergeProps({ "data-slot": "steps", "aria-label": messages.steps, className: cn("m-0 flex min-w-0 list-none flex-col p-0 text-body [counter-reset:qy-step]", className) }, props) });
}
export type StepState = "upcoming" | "current" | "complete" | "error";
export type StepProps = useRender.ComponentProps<"li"> & { state: StepState };
const marker: Record<StepState, string> = {
  complete: "bg-primary text-primary-foreground",
  current: "border border-foreground text-foreground before:content-[counter(qy-step)]",
  upcoming: "border border-input text-muted-foreground before:content-[counter(qy-step)]",
  error: "bg-destructive-fill text-destructive-on-fill",
};
export function Step({ state, render, className, children, ...props }: StepProps) {
  const { messages } = useUILocale();
  const label = { upcoming: messages.stepUpcoming, current: messages.stepCurrent, complete: messages.stepComplete, error: messages.stepError }[state];
  return useRender({ defaultTagName: "li", render, props: mergeProps({
    "data-slot": "step", "data-state": state, "aria-current": state === "current" ? "step" : undefined,
    className: cn(
      "relative grid min-w-0 grid-cols-[var(--qy-cai)_minmax(0,1fr)] gap-x-(--qy-field-gap) pb-(--qy-field-group-gap) wrap-anywhere [counter-increment:qy-step] last:pb-0",
      // 路径：从点的下缘半分处，到下一点的上缘半分处。
      threadClassName, "[--qy-thread-marker:var(--qy-cai)]",
      state === "complete" ? "after:bg-foreground" : "after:bg-border",
      className),
    children: <>
      <span aria-hidden="true" data-slot="step-marker" className={cn("inline-flex size-(--qy-cai) items-center justify-center rounded-full text-dense numeric [&_svg]:size-3", marker[state])}>{state === "complete" ? <CheckIcon strokeWidth={2.5} /> : state === "error" ? <XIcon strokeWidth={2.5} /> : null}</span>
      <div className="min-w-0">{children}</div>
      <span data-slot="step-state" className="sr-only">{label}</span>
    </> }, props) });
}
export type StepTitleProps = useRender.ComponentProps<"div">;
export function StepTitle({ render, className, ...props }: StepTitleProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "step-title", className: cn("min-w-0 text-body text-foreground [[data-state=upcoming]_&]:text-muted-foreground [[data-state=current]_&]:font-medium", className) }, props) });
}
export type StepDescriptionProps = useRender.ComponentProps<"p">;
export function StepDescription({ render, className, ...props }: StepDescriptionProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "step-description", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere [[data-state=error]_&]:text-destructive-foreground", className) }, props) });
}
