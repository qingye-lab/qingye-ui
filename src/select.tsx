import type { ComponentProps } from "react";
import { SelectPrimitive } from "./coss/select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { SelectItem as CossSelectItem, SelectTrigger as CossSelectTrigger, SelectContent as CossSelectContent } from "./coss/select";
import { cn } from "./utils";
export { Select, SelectGroup, SelectValue, SelectSeparator, SelectGroupLabel as SelectLabel } from "./coss/select";
export function SelectContent({ alignItemWithTrigger = false, ...props }: ComponentProps<typeof CossSelectContent>) {
  return <CossSelectContent alignItemWithTrigger={alignItemWithTrigger} {...props} />;
}
export function SelectTrigger({ "aria-label": label, "aria-labelledby": labelledBy, ...props }: ComponentProps<typeof CossSelectTrigger>) {
  return <CossSelectTrigger aria-label={label} aria-labelledby={labelledBy ?? (label ? "" : undefined)} {...props} />;
}
export function SelectItem({ className, ...props }: ComponentProps<typeof CossSelectItem>) {
  return <CossSelectItem className={cn("pointer-coarse:min-h-(--control-hit-target)", className)} {...props} />;
}
export function SelectScrollUpButton(props: ComponentProps<typeof SelectPrimitive.ScrollUpArrow>) { return <SelectPrimitive.ScrollUpArrow {...props}><ChevronUpIcon /></SelectPrimitive.ScrollUpArrow>; }
export function SelectScrollDownButton(props: ComponentProps<typeof SelectPrimitive.ScrollDownArrow>) { return <SelectPrimitive.ScrollDownArrow {...props}><ChevronDownIcon /></SelectPrimitive.ScrollDownArrow>; }
