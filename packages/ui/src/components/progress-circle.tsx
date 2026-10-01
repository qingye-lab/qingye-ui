"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import type React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type ProgressCircleSize = "xs" | "sm" | "default" | "lg" | "xl";

export type ProgressCircleStatus =
  "default" | "success" | "warning" | "error" | "info";

// Stroke widths are in CSS pixels at the nominal size and grow slower than the
// ring, so large rings stay light rather than turning into thick bands.
const sizes: Record<
  ProgressCircleSize,
  { box: string; stroke: number; px: number; text: string }
> = {
  default: { box: "size-10", px: 40, stroke: 3.5, text: "text-[0.6875rem]" },
  lg: { box: "size-16", px: 64, stroke: 4, text: "text-sm" },
  sm: { box: "size-6", px: 24, stroke: 2.5, text: "hidden" },
  xl: { box: "size-24", px: 96, stroke: 5, text: "text-xl" },
  xs: { box: "size-4", px: 16, stroke: 2, text: "hidden" },
};

const statusClasses: Record<ProgressCircleStatus, string> = {
  default: "text-primary",
  error: "text-destructive",
  info: "text-info",
  success: "text-success",
  warning: "text-warning",
};

export interface ProgressCircleProps extends Omit<
  ProgressPrimitive.Root.Props,
  "children" | "value"
> {
  /** Current value; `null` shows an indeterminate spinning arc. */
  value: number | null;
  size?: ProgressCircleSize;
  /** Ring thickness in px at the nominal size. Scales with the ring. */
  strokeWidth?: number;
  /** Colour of the filled arc. The track stays neutral. */
  status?: ProgressCircleStatus;
  /** Show the formatted value in the centre (`default` size and up). */
  showValue?: boolean;
  /**
   * Custom centre content. Pair it with `getAriaValueText` when it says more
   * than the percentage, because content inside a progressbar is not read.
   */
  children?: React.ReactNode;
}

const VIEWBOX = 100;

/** A circular progress ring with an optional centred value. */
export function ProgressCircle({
  className,
  value,
  min = 0,
  max = 100,
  size = "default",
  strokeWidth,
  status = "default",
  showValue = false,
  getAriaValueText,
  children,
  ...props
}: ProgressCircleProps): React.ReactElement {
  const { messages } = useUILocale();
  const config = sizes[size];
  const indeterminate = value === null || !Number.isFinite(value);
  const range = max - min;
  const percent = indeterminate
    ? 25
    : Math.min(100, Math.max(0, range > 0 ? ((value - min) / range) * 100 : 0));

  const stroke = ((strokeWidth ?? config.stroke) / config.px) * VIEWBOX;
  const radius = (VIEWBOX - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  const centre =
    children ??
    (showValue && !indeterminate ? <ProgressPrimitive.Value /> : null);

  return (
    <ProgressPrimitive.Root
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center",
        config.box,
        className,
      )}
      data-size={size}
      data-slot="progress-circle"
      data-status={status}
      getAriaValueText={
        getAriaValueText ??
        ((formatted, current) =>
          current === null ? messages.loading : formatted)
      }
      max={max}
      min={min}
      value={indeterminate ? null : value}
      {...props}
    >
      <svg
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full -rotate-90",
          indeterminate &&
            "animate-spin [animation-duration:1.1s] motion-reduce:[animation-duration:2.4s]",
        )}
        data-slot="progress-circle-svg"
        fill="none"
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      >
        <circle
          className="stroke-input"
          cx={VIEWBOX / 2}
          cy={VIEWBOX / 2}
          data-slot="progress-circle-track"
          r={radius}
          strokeWidth={stroke}
        />
        <circle
          className={cn(
            "stroke-current transition-[stroke-dashoffset,opacity] duration-(--qy-duration-slow) ease-(--qy-ease-out)",
            statusClasses[status],
            percent === 0 && "opacity-0",
          )}
          cx={VIEWBOX / 2}
          cy={VIEWBOX / 2}
          data-slot="progress-circle-indicator"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          strokeWidth={stroke}
        />
      </svg>
      {centre !== null ? (
        <span
          className={cn(
            "relative font-medium text-foreground leading-none numeric",
            size === "lg" || size === "xl" ? "font-semibold" : undefined,
            config.text,
          )}
          data-slot="progress-circle-value"
        >
          {centre}
        </span>
      ) : null}
    </ProgressPrimitive.Root>
  );
}
