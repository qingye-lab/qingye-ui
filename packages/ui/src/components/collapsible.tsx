"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { Button } from "./button";
import { cn } from "../utils";

export function Collapsible({ className, ...props }: CollapsiblePrimitive.Root.Props) {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} className={state => cn("grid min-w-0 gap-(--qy-field-gap)", typeof className === "function" ? className(state) : className)} />;
}
export function CollapsibleTrigger({ render, className, ...props }: CollapsiblePrimitive.Trigger.Props) {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} render={render ?? <Button variant="quiet" />} className={className} />;
}
export function CollapsiblePanel({ keepMounted = true, className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return <CollapsiblePrimitive.Panel data-slot="collapsible-panel" {...props} keepMounted={keepMounted} className={state => cn("grid min-w-0 gap-(--qy-field-gap) text-body wrap-anywhere [&[hidden]:not([hidden=until-found])]:hidden", typeof className === "function" ? className(state) : className)} />;
}
export { CollapsiblePrimitive };
