"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Inline } from "./layout";
export type PendingValueProps = useRender.ComponentProps<"div"> & {
  label: string; actions?: React.ReactNode;
  /** 原值是数字（金额、数量、计数）时设为 true，用等宽数字对齐；文本、日期等非数字值保持 false。预设 false：等宽数字只对数字成立，不能替每个值声称。 */
  numeric?: boolean;
};
/** 已发生写入但结果未知；显示原值，核实能力由应用显式组合。 */
export function PendingValue({ label, actions, numeric = false, children, className, render, ref, ...props }: PendingValueProps) {
  const { messages } = useUILocale();
  const nameId = React.useId();
  if (!label?.trim()) throw new Error("PendingValue requires a non-empty object label.");
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ role: "group", "aria-labelledby": nameId, "data-slot": "pending-value", "data-state": "unknown" }, props, {
    className: cn("flex min-w-0 flex-col gap-(--qy-field-gap) text-foreground wrap-anywhere", className),
    children: <><span id={nameId} data-slot="pending-value-label" className="text-label-mobile sm:text-label">{label}</span><span data-slot="pending-value-original" className={cn("text-body", numeric && "numeric")}>{children}</span><span data-slot="pending-value-state" className="text-support-mobile text-warning-foreground sm:text-support">{messages.buttonUnknown}</span>{actions != null && <Inline data-slot="pending-value-actions" gap="actions">{actions}</Inline>}</>,
  }) });
}
