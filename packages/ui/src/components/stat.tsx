"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import {
  ArrowDownRightIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type StatSize = "sm" | "default" | "lg";

export interface StatProps extends useRender.ComponentProps<"div"> {
  /** `sm` for dense side panels, `lg` for the one figure a view leads with. */
  size?: StatSize;
}

/** A single metric: label, value, and optional delta, helper text and trend. */
export function Stat({
  className,
  render,
  size = "default",
  ...props
}: StatProps): React.ReactElement {
  const defaultProps = {
    className: cn(
      "group/stat flex min-w-0 flex-col gap-(--qy-space-2) data-[size=sm]:gap-[calc(var(--qy-space-1)*1.5)]",
      className,
    ),
    "data-size": size,
    "data-slot": "stat",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function StatLabel({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex min-w-0 items-center gap-[calc(var(--qy-space-1)*1.5)] font-medium text-muted-foreground text-sm group-data-[size=sm]/stat:text-xs [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className,
    ),
    "data-slot": "stat-label",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export function StatValue({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex min-w-0 flex-wrap items-baseline gap-x-(--qy-space-1) font-heading font-semibold text-2xl text-foreground leading-none numeric group-data-[size=lg]/stat:text-[2rem] group-data-[size=sm]/stat:text-xl",
      className,
    ),
    "data-slot": "stat-value",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

/** A unit or currency sign set beside the value, quieter than the figure. */
export function StatUnit({
  className,
  render,
  ...props
}: useRender.ComponentProps<"span">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "font-medium text-muted-foreground text-sm group-data-[size=lg]/stat:text-base group-data-[size=sm]/stat:text-xs",
      className,
    ),
    "data-slot": "stat-unit",
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

export type StatTrend = "up" | "down" | "flat";

export interface StatDeltaProps extends useRender.ComponentProps<"span"> {
  /** Direction of change. Picks the icon and the spoken prefix. */
  trend?: StatTrend;
  /**
   * Set when a decrease is the good outcome (error rate, latency, cost):
   * down reads as positive, up as negative.
   */
  inverse?: boolean;
  /** `badge` adds a soft tinted fill; `default` is coloured text only. */
  variant?: "default" | "badge";
  /** Overrides the screen-reader prefix taken from the locale. */
  trendLabel?: string;
}

const trendIcons = {
  down: ArrowDownRightIcon,
  flat: ArrowRightIcon,
  up: ArrowUpRightIcon,
} as const;

/** Change against a named period. Colour follows whether the change is good. */
export function StatDelta({
  className,
  render,
  trend = "flat",
  inverse = false,
  variant = "default",
  trendLabel,
  children,
  ...props
}: StatDeltaProps): React.ReactElement {
  const { messages } = useUILocale();
  const sentiment =
    trend === "flat"
      ? "neutral"
      : (trend === "up") !== inverse
        ? "positive"
        : "negative";
  const Icon = trendIcons[trend];
  const spoken =
    trendLabel ??
    (trend === "up"
      ? messages.trendUp
      : trend === "down"
        ? messages.trendDown
        : messages.trendFlat);

  const defaultProps = {
    children: (
      <>
        <Icon aria-hidden="true" />
        <span className="sr-only">{spoken} </span>
        {children}
      </>
    ),
    className: cn(
      "inline-flex w-fit shrink-0 items-center gap-[calc(var(--qy-space-1)*0.5)] whitespace-nowrap font-medium text-sm leading-none numeric sm:text-xs [&_svg]:pointer-events-none [&_svg]:-mx-px [&_svg]:size-3.5 [&_svg]:shrink-0 sm:[&_svg]:size-3",
      "data-[sentiment=negative]:text-destructive-foreground data-[sentiment=neutral]:text-muted-foreground data-[sentiment=positive]:text-success-foreground",
      variant === "badge" &&
        "h-5.5 rounded-sm px-(--qy-space-1) data-[sentiment=negative]:bg-destructive/8 data-[sentiment=neutral]:bg-muted data-[sentiment=positive]:bg-success/8 sm:h-4.5 dark:data-[sentiment=negative]:bg-destructive/16 dark:data-[sentiment=positive]:bg-success/16",
      className,
    ),
    "data-sentiment": sentiment,
    "data-slot": "stat-delta",
    "data-trend": trend,
    "data-variant": variant,
  };

  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(defaultProps, props),
    render,
  });
}

/** Helper text under the value; a natural home for the delta and its period. */
export function StatDescription({
  className,
  render,
  ...props
}: useRender.ComponentProps<"div">): React.ReactElement {
  const defaultProps = {
    className: cn(
      "flex min-w-0 flex-wrap items-center gap-x-[calc(var(--qy-space-1)*1.5)] gap-y-(--qy-space-1) text-muted-foreground text-sm sm:text-xs",
      className,
    ),
    "data-slot": "stat-description",
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}

export interface StatSparklineProps extends Omit<
  React.ComponentProps<"div">,
  "children"
> {
  /** Values in time order; at least two points draw a line. */
  data: readonly number[];
  /** Soft wash under the line. */
  fill?: boolean;
  /** Mark the latest value with a dot. */
  showEnd?: boolean;
  /** Accessible summary. Without it the sparkline is decorative. */
  label?: string;
}

const SPARK_WIDTH = 100;
const SPARK_HEIGHT = 40;
const SPARK_INSET = 3;

/**
 * A dependency-free trend line for stat tiles. Colour comes from `currentColor`
 * (default `text-chart-1`); the stroke stays 1.5px at any rendered size.
 */
export function StatSparkline({
  className,
  data,
  fill = true,
  showEnd = true,
  label,
  ...props
}: StatSparklineProps): React.ReactElement {
  const gradientId = `stat-spark-${React.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const points = data.filter((value) => Number.isFinite(value));
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min;
  const coordinates = points.map((value, index) => {
    const x =
      points.length > 1
        ? (index / (points.length - 1)) * SPARK_WIDTH
        : SPARK_WIDTH;
    const y =
      range === 0
        ? SPARK_HEIGHT / 2
        : SPARK_INSET +
          (1 - (value - min) / range) * (SPARK_HEIGHT - SPARK_INSET * 2);
    return [x, y] as const;
  });
  const line = coordinates
    .map(
      ([x, y], index) =>
        `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`,
    )
    .join(" ");
  const area = `${line} L${SPARK_WIDTH} ${SPARK_HEIGHT} L0 ${SPARK_HEIGHT} Z`;
  const end = coordinates.at(-1);

  return (
    <div
      aria-hidden={label ? undefined : true}
      aria-label={label}
      className={cn("relative h-10 w-full text-chart-1", className)}
      data-slot="stat-sparkline"
      role={label ? "img" : undefined}
      {...props}
    >
      {coordinates.length > 1 ? (
        <svg
          aria-hidden="true"
          className="absolute inset-0 size-full overflow-visible"
          preserveAspectRatio="none"
          viewBox={`0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`}
        >
          {fill ? (
            <>
              <defs>
                <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="currentColor"
                    stopOpacity={0.16}
                  />
                  <stop
                    offset="100%"
                    stopColor="currentColor"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <path d={area} fill={`url(#${gradientId})`} />
            </>
          ) : null}
          <path
            d={line}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      ) : null}
      {showEnd && end && coordinates.length > 1 ? (
        <span
          className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current ring-2 ring-card"
          data-slot="stat-sparkline-end"
          style={{
            left: `${(end[0] / SPARK_WIDTH) * 100}%`,
            top: `${(end[1] / SPARK_HEIGHT) * 100}%`,
          }}
        />
      ) : null}
    </div>
  );
}
