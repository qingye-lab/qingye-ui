import type { ComponentProps } from "react";
import { Badge } from "./badge";
import { cn } from "./utils";

export function StatusPill({ className, variant = "neutral", ...props }: ComponentProps<typeof Badge>) {
  return <Badge className={cn("whitespace-nowrap", className)} variant={variant} {...props} />;
}
