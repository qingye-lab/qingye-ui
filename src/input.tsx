import { Input as CossInput } from "./coss/input";
import type { InputProps } from "./coss/input";
import { cn } from "./utils";
export type { InputProps };
export function Input({ className, ...props }: InputProps) {
  return <CossInput className={cn("pointer-coarse:[&_input]:min-h-(--control-hit-target)", className)} {...props} />;
}
