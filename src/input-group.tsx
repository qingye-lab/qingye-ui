import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { InputGroup as CossInputGroup } from "./coss/input-group";
import { Button } from "./button";
import { cn } from "./utils";
export { InputGroupAddon, InputGroupInput, InputGroupText, InputGroupTextarea } from "./coss/input-group";
export const inputGroupVariants = cva("pointer-coarse:min-h-(--control-hit-target) pointer-coarse:[&_input]:min-h-(--control-hit-target)", { variants: { size: { default: "", lg: "min-h-(--control-hit-target) [&_input]:min-h-(--control-hit-target)" } }, defaultVariants: { size: "default" } });
export function InputGroup({ className, size = "default", ...props }: ComponentProps<typeof CossInputGroup> & VariantProps<typeof inputGroupVariants>) {
  return <CossInputGroup data-size={size} className={cn(inputGroupVariants({ size }), className)} {...props} />;
}
export function InputGroupButton({ size = "xs", variant = "ghost", ...props }: Omit<ComponentProps<typeof Button>, "size"> & { size?: "xs" | "sm" | "icon-xs" | "icon-sm" }) {
  return <Button data-size={size} size={size} variant={variant} {...props} />;
}
