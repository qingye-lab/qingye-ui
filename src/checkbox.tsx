import type { ComponentProps } from "react";
import { Checkbox as CossCheckbox } from "./coss/checkbox";
import { cn } from "./utils";

export function Checkbox({ className, ...props }: ComponentProps<typeof CossCheckbox>) {
  return <CossCheckbox className={cn("pointer-coarse:m-3.5 pointer-coarse:after:absolute pointer-coarse:after:-inset-3.5 pointer-coarse:after:content-['']", className)} {...props} />;
}
