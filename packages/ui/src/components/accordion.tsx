"use client";

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { Button } from "./button";
import { cn } from "../utils";

export function Accordion<Value = unknown>({ className, keepMounted = true, ...props }: AccordionPrimitive.Root.Props<Value>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} keepMounted={keepMounted} className={state => cn("flex min-w-0 flex-col gap-(--qy-field-group-gap)", typeof className === "function" ? className(state) : className)} />;
}
export function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return <AccordionPrimitive.Item data-slot="accordion-item" {...props} className={state => cn("grid min-w-0 gap-(--qy-field-gap)", typeof className === "function" ? className(state) : className)} />;
}
export function AccordionHeader({ className, ...props }: AccordionPrimitive.Header.Props) {
  return <AccordionPrimitive.Header data-slot="accordion-header" {...props} className={state => cn("min-w-0 text-heading wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export function AccordionTrigger({ render, className, ...props }: AccordionPrimitive.Trigger.Props) {
  return <AccordionPrimitive.Trigger data-slot="accordion-trigger" {...props} render={render ?? <Button variant="quiet" />} className={state => cn("w-full justify-start", typeof className === "function" ? className(state) : className)} />;
}
export function AccordionPanel({ className, ...props }: AccordionPrimitive.Panel.Props) {
  return <AccordionPrimitive.Panel data-slot="accordion-panel" {...props} className={state => cn("grid min-w-0 gap-(--qy-field-gap) text-body wrap-anywhere [&[hidden]:not([hidden=until-found])]:hidden", typeof className === "function" ? className(state) : className)} />;
}
export { AccordionPrimitive };
