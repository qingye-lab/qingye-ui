"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Group } from "./group";
export type PendingValueProps = useRender.ComponentProps<"div"> & { label: string; actions?: React.ReactNode };
/** 已发生写入但结果未知；显示原值，核实能力由应用显式组合。 */
export function PendingValue({ label, actions, children, className, render, ref, ...props }: PendingValueProps) {
  const { messages } = useUILocale();
  const nameId = React.useId();
  if (!label?.trim()) throw new Error("PendingValue requires a non-empty object label.");
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ role: "group", "aria-labelledby": nameId, "data-slot": "pending-value", "data-state": "unknown" }, props, {
    className: cn("flex min-w-0 flex-col gap-(--qy-field-gap) text-foreground wrap-anywhere", className),
    children: <><span id={nameId} data-slot="pending-value-label" className="text-label">{label}</span><span data-slot="pending-value-original" className="text-body">{children}</span><span data-slot="pending-value-state" className="text-support-mobile text-warning-foreground sm:text-support">{messages.buttonUnknown}</span>{actions != null && <Group data-slot="pending-value-actions" gap="actions">{actions}</Group>}</>,
  }) });
}
