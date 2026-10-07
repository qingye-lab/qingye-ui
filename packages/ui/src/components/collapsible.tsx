"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { DisclosureIcon, disclosureTriggerClassName } from "../disclosure";
import { cn } from "../utils";

export function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} className={state => cn("grid min-w-0 gap-(--qy-field-gap)", typeof className === "function" ? className(state) : className)} />;
}
/** 行内的展开入口：文字加箭头，贴着内容左缘。需要按钮外形时由调用方通过 render 组合。 */
export function CollapsibleTrigger({ render, className, children, ...props }: CollapsiblePrimitive.Trigger.Props) {
  if (render) return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} render={render} className={className}>{children}</CollapsiblePrimitive.Trigger>;
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} className={state => cn(disclosureTriggerClassName, "justify-self-start text-body-strong", typeof className === "function" ? className(state) : className)}>{children}<DisclosureIcon /></CollapsiblePrimitive.Trigger>;
}
export function CollapsiblePanel({ keepMounted = true, className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return <CollapsiblePrimitive.Panel data-slot="collapsible-panel" {...props} keepMounted={keepMounted} className={state => cn("grid min-w-0 gap-(--qy-field-gap) text-body wrap-anywhere [&[hidden]:not([hidden=until-found])]:hidden", typeof className === "function" ? className(state) : className)} />;
}
export { CollapsiblePrimitive };
