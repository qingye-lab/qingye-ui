"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { DisclosureIcon, disclosureTriggerClassName } from "../disclosure";
import { cn } from "../utils";

export function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} className={state => cn("grid min-w-0 gap-(--qy-field-gap)", typeof className === "function" ? className(state) : className)} />;
}
/**
 * 行内的展开入口：文字加箭头，贴着内容左缘。需要按钮外形时由调用方通过 render 组合。
 * 触发区只有一行字高；粗指针下用 touch-target 把命中区放大到 --qy-touch-target，可见尺寸不变（STANDARDS §2 触摸目标）。
 * 它是独占一行的入口，不是行内链接，所以适用 touch-target（link.tsx 对行内链接的例外不适用）。
 */
export type CollapsibleTriggerProps = CollapsiblePrimitive.Trigger.Props & {
  /** 是否显示尾部展开箭头，默认显示。设为 false 时触发器只剩文字（预设：二值，不接受自定义图标，因为箭头的旋转由 DisclosureIcon 与展开态绑定）。 */
  indicator?: boolean;
};
export function CollapsibleTrigger({ render, className, children, indicator = true, ...props }: CollapsibleTriggerProps) {
  if (render) return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} render={render} className={className}>{children}</CollapsiblePrimitive.Trigger>;
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} className={state => cn(disclosureTriggerClassName, "touch-target justify-self-start text-body-strong", typeof className === "function" ? className(state) : className)}>{children}{indicator && <DisclosureIcon />}</CollapsiblePrimitive.Trigger>;
}
export function CollapsiblePanel({ keepMounted = true, className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return <CollapsiblePrimitive.Panel data-slot="collapsible-panel" {...props} keepMounted={keepMounted} className={state => cn("qy-collapsible-panel grid min-w-0 gap-(--qy-field-gap) text-body wrap-anywhere [&[hidden]:not([hidden=until-found])]:hidden", typeof className === "function" ? className(state) : className)} />;
}
export { CollapsiblePrimitive };
