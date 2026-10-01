// Adapted from coss ui (MIT), apps/ui/registry/default/ui/alert.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "../utils";

// One column by default, so a title and description stack and wrap full width.
// An icon splits the grid into an icon column plus the text column, which is
// what puts AlertAction on the trailing column of the first row on wide screens.
// Without an icon, an action still needs its own trailing column from sm up,
// otherwise it would claim the first column and push the title and description
// side by side; on phone widths it spans the row instead and stacks below.
const alertVariants = cva(
  "relative grid w-full items-start gap-x-2 gap-y-0.5 rounded-xl border px-3.5 py-3 text-card-foreground text-sm has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] has-[>svg]:has-data-[slot=alert-action]:grid-cols-[calc(var(--spacing)*4)_1fr_auto] sm:has-data-[slot=alert-action]:grid-cols-[1fr_auto] [&>svg]:h-lh [&>svg]:w-4",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default:
          "bg-transparent dark:bg-input/32 [&>svg]:text-muted-foreground",
        destructive:
          "border-destructive/32 bg-destructive/4 [&>svg]:text-destructive",
        error:
          "border-destructive/32 bg-destructive/4 [&>svg]:text-destructive",
        info: "border-info/32 bg-info/4 [&>svg]:text-info",
        success: "border-success/32 bg-success/4 [&>svg]:text-success",
        warning: "border-warning/32 bg-warning/4 [&>svg]:text-warning",
      },
    },
  },
);

export function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof alertVariants>): React.ReactElement {
  return (
    <div
      className={cn(alertVariants({ variant }), className)}
      data-slot="alert"
      role="alert"
      {...props}
    />
  );
}

export function AlertTitle({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn("font-medium [svg~&]:col-start-2", className)}
      data-slot="alert-title"
      {...props}
    />
  );
}

export function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 text-muted-foreground [svg~&]:col-start-2",
        className,
      )}
      data-slot="alert-description"
      {...props}
    />
  );
}

export function AlertAction({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex gap-1 max-sm:col-start-1 max-sm:col-end-[-1] max-sm:mt-2 sm:row-start-1 sm:row-end-3 sm:self-center sm:[[data-slot=alert-description]~&]:col-start-2 sm:[[data-slot=alert-title]~&]:col-start-2 sm:[svg~&]:col-start-2 sm:[svg~[data-slot=alert-description]~&]:col-start-3 sm:[svg~[data-slot=alert-title]~&]:col-start-3",
        className,
      )}
      data-slot="alert-action"
      {...props}
    />
  );
}
