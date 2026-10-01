// Adapted from coss ui (MIT), apps/ui/registry/default/ui/fieldset.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import type React from "react";
import { cn } from "../utils";

export function Fieldset({
  className,
  ...props
}: FieldsetPrimitive.Root.Props): React.ReactElement {
  return (
    <FieldsetPrimitive.Root
      className={cn("flex w-full min-w-0 flex-col gap-4", className)}
      data-slot="fieldset"
      {...props}
    />
  );
}
export function FieldsetLegend({
  className,
  variant = "legend",
  ...props
}: FieldsetPrimitive.Legend.Props & {
  /** `label` sizes the legend like a field label for compact groups. */
  variant?: "legend" | "label";
}): React.ReactElement {
  return (
    <FieldsetPrimitive.Legend
      className={cn(
        "text-foreground",
        variant === "legend"
          ? "font-semibold text-lg/6 sm:text-base/6"
          : "font-medium text-base/4.5 sm:text-sm/4",
        className,
      )}
      data-variant={variant}
      data-slot="fieldset-legend"
      {...props}
    />
  );
}

export { FieldsetPrimitive };
