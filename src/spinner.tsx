"use client";

import type { ComponentProps } from "react";
import { Loader2Icon } from "lucide-react";
import { useUILocale } from "./locale";
import { cn } from "./utils";

export function Spinner({ className, ...props }: ComponentProps<"svg">) {
  const { messages } = useUILocale(); return <Loader2Icon data-slot="spinner" role="status" aria-label={messages.loading} className={cn("size-4 animate-spin", className)} {...props} />; }
