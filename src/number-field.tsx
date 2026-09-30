import type { ComponentProps } from "react";
import {
  NumberField as CossNumberField,
  NumberFieldDecrement as CossNumberFieldDecrement,
  NumberFieldIncrement as CossNumberFieldIncrement,
  NumberFieldInput as CossNumberFieldInput,
} from "./coss/number-field";
import { cn } from "./utils";

export { NumberFieldGroup, NumberFieldScrubArea } from "./coss/number-field";
export function NumberField(props: ComponentProps<typeof CossNumberField>) {
  return <CossNumberField {...props} />;
}
export function NumberFieldDecrement(props: ComponentProps<typeof CossNumberFieldDecrement>) {
  return <CossNumberFieldDecrement {...props} />;
}
export function NumberFieldIncrement(props: ComponentProps<typeof CossNumberFieldIncrement>) {
  return <CossNumberFieldIncrement {...props} />;
}
export function NumberFieldInput({ className, ...props }: ComponentProps<typeof CossNumberFieldInput>) {
  return <CossNumberFieldInput className={cn("pointer-coarse:min-h-(--control-hit-target)", className)} {...props} />;
}
