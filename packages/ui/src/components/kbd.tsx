// Adapted from coss ui (MIT), apps/ui/registry/default/ui/kbd.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
import type * as React from "react";
import { cn } from "../utils";

export function Kbd({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn(
        "pointer-events-none inline-flex h-5 min-w-5 select-none items-center justify-center gap-1 rounded-[.25rem] bg-muted px-1 font-medium font-sans text-muted-foreground text-xs [&_svg:not([class*='size-'])]:size-3",
        // Inside a button, take the button's own colour so the hint reads on
        // solid fills as well as on outline and ghost surfaces.
        "in-data-[slot=button]:bg-current/10 in-data-[slot=button]:text-current/72",
        className,
      )}
      data-slot="kbd"
      {...props}
    />
  );
}

export function KbdGroup({
  className,
  ...props
}: React.ComponentProps<"kbd">): React.ReactElement {
  return (
    <kbd
      className={cn("inline-flex items-center gap-1", className)}
      data-slot="kbd-group"
      {...props}
    />
  );
}
