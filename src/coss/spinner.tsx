"use client";

// Adapted from coss ui (MIT), apps/ui/registry/default/ui/spinner.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
import { Loader2Icon } from "lucide-react";
import type React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export function Spinner({
  className,
  ...props
}: React.ComponentProps<typeof Loader2Icon>): React.ReactElement {
  const { messages } = useUILocale();
  return (
    <Loader2Icon
      aria-label={messages.loading}
      className={cn("animate-spin", className)}
      role="status"
      {...props}
    />
  );
}
