"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { DisclosureIcon, disclosureTriggerClassName } from "../disclosure";
import { cn } from "../utils";

export function Accordion<Value = unknown>({ className, keepMounted = true, ...props }: AccordionPrimitive.Root.Props<Value>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} keepMounted={keepMounted} className={state => cn("flex min-w-0 flex-col", typeof className === "function" ? className(state) : className)} />;
}
export function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item data-slot="accordion-item" {...props} className={state => cn("grid min-w-0 border-b border-border", typeof className === "function" ? className(state) : className)} />;
}
export function AccordionHeader({ className, ...props }: AccordionPrimitive.Header.Props) {
  return <AccordionPrimitive.Header data-slot="accordion-header" {...props} className={state => cn("min-w-0 text-heading wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
/** 一项一行：标题贴左缘，箭头在行尾；行高为一个列表行，各项之间由清墨线分隔（成列的同类分节）。 */
export function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return <AccordionPrimitive.Trigger data-slot="accordion-trigger" {...props} className={state => cn(disclosureTriggerClassName, "flex w-full min-h-(--qy-row-default) justify-between", typeof className === "function" ? className(state) : className)}>{children}<DisclosureIcon /></AccordionPrimitive.Trigger>;
}
export function AccordionPanel({ className, ...props }: AccordionPrimitive.Panel.Props) {
  return <AccordionPrimitive.Panel data-slot="accordion-panel" {...props} className={state => cn("grid min-w-0 gap-(--qy-field-gap) pb-(--qy-field-group-gap) text-body wrap-anywhere [&[hidden]:not([hidden=until-found])]:hidden", typeof className === "function" ? className(state) : className)} />;
}
export { AccordionPrimitive };
