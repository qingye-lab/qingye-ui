"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type StepsProps = useRender.ComponentProps<"ol">;
export function Steps({ render, className, ...props }: StepsProps) {
  const { messages } = useUILocale();
  return useRender({ defaultTagName: "ol", render, props: mergeProps({ "data-slot": "steps", "aria-label": messages.steps, className: cn("m-0 flex min-w-0 list-decimal flex-col gap-(--qy-panel-gap) ps-(--qy-panel-gap) text-body", className) }, props) });
}
export type StepState = "upcoming" | "current" | "complete" | "error";
export type StepProps = useRender.ComponentProps<"li"> & { state: StepState };
export function Step({ state, render, className, children, ...props }: StepProps) {
  const { messages } = useUILocale();
  const label = { upcoming: messages.stepUpcoming, current: messages.stepCurrent, complete: messages.stepComplete, error: messages.stepError }[state];
  return useRender({ defaultTagName: "li", render, props: mergeProps({ "data-slot": "step", "data-state": state, "aria-current": state === "current" ? "step" : undefined, className: cn("min-w-0 wrap-anywhere", className), children: <>{children}<span data-slot="step-state" className="mt-(--qy-field-gap) block text-support text-muted-foreground">{label}</span></> }, props) });
}
export type StepTitleProps = useRender.ComponentProps<"div">;
export function StepTitle({ render, className, ...props }: StepTitleProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "step-title", className: cn("min-w-0 text-body-strong", className) }, props) });
}
export type StepDescriptionProps = useRender.ComponentProps<"p">;
export function StepDescription({ render, className, ...props }: StepDescriptionProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "step-description", className: cn("m-0 mt-(--qy-field-gap) min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
