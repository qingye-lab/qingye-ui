// Adapted from coss ui (MIT), apps/ui/registry/default/ui/collapsible.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import type React from "react";
import { cn } from "../utils";

export function Collapsible({
  ...props
}: CollapsiblePrimitive.Root.Props): React.ReactElement {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
}

export function CollapsibleTrigger({
  className,
  ...props
}: CollapsiblePrimitive.Trigger.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Trigger
      className={className}
      data-slot="collapsible-trigger"
      {...props}
    />
  );
}

export function CollapsiblePanel({
  className,
  ...props
}: CollapsiblePrimitive.Panel.Props): React.ReactElement {
  return (
    <CollapsiblePrimitive.Panel
      className={cn(
        "h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-(--qy-duration-base) ease-(--qy-ease-out) data-ending-style:h-0 data-starting-style:h-0 data-ending-style:duration-(--qy-duration-fast)",
        className,
      )}
      data-slot="collapsible-panel"
      {...props}
    />
  );
}

export { CollapsiblePrimitive, CollapsiblePanel as CollapsibleContent };
