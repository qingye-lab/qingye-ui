"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type StatState = "known" | "unknown" | "not-applicable";
export type StatProps = useRender.ComponentProps<"dl"> & { state: StatState };
export function Stat({ state, render, className, ...props }: StatProps) {
  return useRender({ defaultTagName: "dl", render, props: mergeProps({ "data-slot": "stat", "data-state": state, className: cn("m-0 flex min-w-0 flex-col gap-(--qy-field-gap) text-body", className) }, props) });
}
export type StatLabelProps = useRender.ComponentProps<"dt">;
export function StatLabel({ render, className, ...props }: StatLabelProps) {
  return useRender({ defaultTagName: "dt", render, props: mergeProps({ "data-slot": "stat-label", className: cn("min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
export type StatValueProps = useRender.ComponentProps<"dd">;
export function StatValue({ render, className, ...props }: StatValueProps) {
  return useRender({ defaultTagName: "dd", render, props: mergeProps({ "data-slot": "stat-value", className: cn("m-0 flex min-w-0 flex-wrap items-baseline gap-(--qy-field-gap) text-metric numeric wrap-anywhere", className) }, props) });
}
export type StatUnitProps = useRender.ComponentProps<"span">;
export function StatUnit({ render, className, ...props }: StatUnitProps) {
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "stat-unit", className: cn("text-support text-muted-foreground", className) }, props) });
}
export type StatDescriptionProps = useRender.ComponentProps<"dd">;
export function StatDescription({ render, className, ...props }: StatDescriptionProps) {
  return useRender({ defaultTagName: "dd", render, props: mergeProps({ "data-slot": "stat-description", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
