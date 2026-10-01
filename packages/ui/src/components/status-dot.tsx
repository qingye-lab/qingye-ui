"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";
import type React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type StatusDotStatus =
  "online" | "offline" | "warning" | "error" | "info" | "neutral";

export type StatusDotSize = "sm" | "default" | "lg";

export const statusDotIndicatorVariants = cva(
  "relative inline-flex shrink-0 rounded-full bg-current",
  {
    defaultVariants: {
      size: "default",
      status: "neutral",
    },
    variants: {
      size: {
        default: "size-2",
        lg: "size-2.5",
        sm: "size-1.5",
      },
      status: {
        error: "text-destructive",
        info: "text-info",
        neutral: "text-muted-foreground/64",
        // Hollow, so offline stays distinct from neutral without relying on hue.
        offline:
          "bg-transparent text-muted-foreground/80 shadow-[inset_0_0_0_1.5px_currentColor]",
        online: "text-success",
        warning: "text-warning",
      },
    },
  },
);

export interface StatusDotProps extends useRender.ComponentProps<"span"> {
  status?: StatusDotStatus;
  size?: StatusDotSize;
  /**
   * A soft ring that breathes outward, for live states. It stops when the
   * user prefers reduced motion; the dot itself stays.
   */
  pulse?: boolean;
  /**
   * Spoken status when there is no visible label. Defaults to the locale name
   * of `status`, so the dot is never colour-only.
   */
  label?: string;
}

/**
 * A small status indicator with an optional visible label (children).
 */
export function StatusDot({
  className,
  render,
  status = "neutral",
  size = "default",
  pulse = false,
  label,
  children,
  ...props
}: StatusDotProps): React.ReactElement {
  const { messages } = useUILocale();
  const hasVisibleLabel =
    children !== undefined && children !== null && children !== false;
  const showPulse = pulse && status !== "offline";

  const defaultProps = {
    children: (
      <>
        <span
          aria-hidden="true"
          className={statusDotIndicatorVariants({ size, status })}
          data-slot="status-dot-indicator"
        >
          {showPulse ? (
            <span
              className="absolute inset-0 animate-ping rounded-full bg-current opacity-48 [animation-duration:2s] motion-reduce:hidden"
              data-slot="status-dot-pulse"
            />
          ) : null}
        </span>
        {hasVisibleLabel ? (
          children
        ) : (
          <span className="sr-only">
            {label ?? messages.statusLabel(status)}
          </span>
        )}
      </>
    ),
    className: cn(
      "inline-flex min-w-0 items-center text-foreground",
      size === "sm" ? "gap-1.5 text-xs" : "gap-2 text-sm",
      className,
    ),
    "data-pulse": showPulse ? "" : undefined,
    "data-size": size,
    "data-slot": "status-dot",
    "data-status": status,
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}
