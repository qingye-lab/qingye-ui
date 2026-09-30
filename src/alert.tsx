import type { ComponentProps } from "react";
import { Alert as CossAlert, AlertAction as CossAlertAction } from "./coss/alert";
import { cn } from "./utils";
export { AlertTitle, AlertDescription } from "./coss/alert";
export function Alert({ variant, className, ...props }: Omit<ComponentProps<typeof CossAlert>, "variant"> & { variant?: ComponentProps<typeof CossAlert>["variant"] | "destructive" }) {
  return <CossAlert variant={variant === "destructive" ? "error" : variant} className={cn("max-sm:has-data-[slot=alert-action]:grid-cols-1 max-sm:has-[>svg]:has-data-[slot=alert-action]:grid-cols-[auto_minmax(0,1fr)]", className)} {...props} />;
}
export function AlertAction({ className, ...props }: ComponentProps<typeof CossAlertAction>) {
  return <CossAlertAction className={cn("min-w-0 flex-wrap gap-2 max-sm:col-start-1 max-sm:row-start-3 max-sm:[svg~&]:col-start-2", className)} {...props} />;
}
