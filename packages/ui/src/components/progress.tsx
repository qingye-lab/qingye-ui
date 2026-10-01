// Adapted from coss ui (MIT), apps/ui/registry/default/ui/progress.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import type React from "react";
import { cn } from "../utils";

export function Progress({
  className,
  children,
  ...props
}: ProgressPrimitive.Root.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Root
      className={cn("flex w-full flex-col gap-2", className)}
      data-slot="progress"
      {...props}
    >
      {children ? (
        children
      ) : (
        <ProgressTrack>
          <ProgressIndicator />
        </ProgressTrack>
      )}
    </ProgressPrimitive.Root>
  );
}

export function ProgressLabel({
  className,
  ...props
}: ProgressPrimitive.Label.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Label
      className={cn("font-medium text-sm", className)}
      data-slot="progress-label"
      {...props}
    />
  );
}

export function ProgressTrack({
  className,
  ...props
}: ProgressPrimitive.Track.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "block h-1.5 w-full overflow-hidden rounded-full bg-input",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
}

export function ProgressIndicator({
  className,
  ...props
}: ProgressPrimitive.Indicator.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Indicator
      className={cn(
        "bg-primary transition-all duration-500",
        // Indeterminate (value={null}): a soft band sweeps the track, reusing the
        // skeleton keyframes; with reduced motion it only breathes in opacity.
        "data-indeterminate:h-full data-indeterminate:w-full data-indeterminate:animate-skeleton data-indeterminate:bg-transparent data-indeterminate:bg-[linear-gradient(90deg,transparent_28%,var(--color-primary)_42%,var(--color-primary)_58%,transparent_72%)] data-indeterminate:bg-size-[200%_100%] motion-reduce:data-indeterminate:animate-pulse motion-reduce:data-indeterminate:bg-primary/40 motion-reduce:data-indeterminate:bg-none",
        className,
      )}
      data-slot="progress-indicator"
      {...props}
    />
  );
}

export function ProgressValue({
  className,
  ...props
}: ProgressPrimitive.Value.Props): React.ReactElement {
  return (
    <ProgressPrimitive.Value
      className={cn("text-sm tabular-nums", className)}
      data-slot="progress-value"
      {...props}
    />
  );
}

export { ProgressPrimitive };
