"use client";

import type { ComponentProps, ReactElement, ReactNode } from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type TimelineStatus = "default" | "primary" | "success" | "warning" | "error" | "info";
export type TimelineDensity = "default" | "compact";
export type TimelineConnector = "solid" | "dashed" | "none";

/** One entry for the data-driven `items` shortcut. */
export type TimelineEntry = {
  id: string;
  title: ReactNode;
  description?: ReactNode;
  /** Displayed time, e.g. "14:32" or "3 小时前". */
  time?: ReactNode;
  /** Machine-readable value for the <time> element. */
  dateTime?: string;
  /** Marker content: an icon or an <Avatar>. Without it the marker is a dot. */
  icon?: ReactNode;
  status?: TimelineStatus;
  /** Extra content below the description, such as a comment or attachment. */
  content?: ReactNode;
};

export type TimelineProps = Omit<ComponentProps<"ol">, "children"> & {
  /** Shortcut for simple timelines; compose the parts as children for anything richer. */
  items?: readonly TimelineEntry[];
  children?: ReactNode;
  density?: TimelineDensity;
  /** The rail between markers. */
  connector?: TimelineConnector;
  /** Accessible name of the list. */
  label?: string;
};

export function Timeline({
  items,
  children,
  density = "default",
  connector = "solid",
  label,
  className,
  ...props
}: TimelineProps): ReactElement {
  const { messages } = useUILocale();
  return (
    <ol
      aria-label={label ?? messages.timeline}
      className={cn(
        "group/timeline m-0 flex min-w-0 list-none flex-col p-0 [--timeline-dot:--spacing(2)] [--timeline-gap:var(--qy-space-6)] [--timeline-marker:--spacing(6)] data-[density=compact]:[--timeline-dot:--spacing(1.5)] data-[density=compact]:[--timeline-gap:calc(var(--qy-space-1)*3.5)] data-[density=compact]:[--timeline-marker:--spacing(5)]",
        className,
      )}
      data-connector={connector}
      data-density={density}
      data-slot="timeline"
      {...props}
    >
      {items
        ? items.map((item) => (
            <TimelineItem key={item.id}>
              <TimelineMarker status={item.status}>{item.icon}</TimelineMarker>
              <TimelineContent>
                <TimelineHeader>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  {item.time != null ? <TimelineTime dateTime={item.dateTime}>{item.time}</TimelineTime> : null}
                </TimelineHeader>
                {item.description != null ? <TimelineDescription>{item.description}</TimelineDescription> : null}
                {item.content != null ? <div className="mt-[calc(var(--qy-space-1)*2.5)]">{item.content}</div> : null}
              </TimelineContent>
            </TimelineItem>
          ))
        : children}
    </ol>
  );
}

/** One event. The rail to the next item is drawn here, under the marker column. */
export function TimelineItem({ className, ...props }: ComponentProps<"li">): ReactElement {
  return (
    <li
      className={cn(
        "relative flex min-w-0 gap-(--qy-space-3) pb-(--timeline-gap) last:pb-0",
        "before:pointer-events-none before:absolute before:start-[calc(var(--timeline-marker)/2-0.5px)] before:top-[calc(var(--timeline-marker)+var(--qy-space-1)*1.5)] before:bottom-[calc(var(--qy-space-1)*1.5)] before:border-s before:border-input last:before:hidden",
        // Dots are small, so their rail runs from 4px under one dot to 4px above the next.
        "has-[>[data-variant=dot]]:before:top-[calc(var(--timeline-marker)/2_+_var(--timeline-dot)/2_+_var(--qy-space-1))] has-[>[data-variant=dot]]:before:bottom-[calc(var(--timeline-dot)/2_+_var(--qy-space-1)_-_var(--timeline-marker)/2)]",
        "group-data-[connector=dashed]/timeline:before:border-dashed group-data-[connector=none]/timeline:before:hidden",
        className,
      )}
      data-slot="timeline-item"
      {...props}
    />
  );
}

const markerStatusClassNames: Record<TimelineStatus, { dot: string; icon: string }> = {
  default: { dot: "bg-muted-foreground/48", icon: "text-muted-foreground" },
  error: {
    dot: "bg-destructive",
    icon: "border-destructive/24 bg-[color-mix(in_srgb,var(--color-background),var(--color-destructive)_8%)] text-destructive-foreground dark:bg-[color-mix(in_srgb,var(--color-background),var(--color-destructive)_16%)]",
  },
  info: {
    dot: "bg-info",
    icon: "border-info/24 bg-[color-mix(in_srgb,var(--color-background),var(--color-info)_8%)] text-info-foreground dark:bg-[color-mix(in_srgb,var(--color-background),var(--color-info)_16%)]",
  },
  primary: { dot: "bg-primary", icon: "border-primary bg-primary text-primary-foreground" },
  success: {
    dot: "bg-success",
    icon: "border-success/24 bg-[color-mix(in_srgb,var(--color-background),var(--color-success)_8%)] text-success-foreground dark:bg-[color-mix(in_srgb,var(--color-background),var(--color-success)_16%)]",
  },
  warning: {
    dot: "bg-warning",
    icon: "border-warning/32 bg-[color-mix(in_srgb,var(--color-background),var(--color-warning)_10%)] text-warning-foreground dark:bg-[color-mix(in_srgb,var(--color-background),var(--color-warning)_16%)]",
  },
};

export type TimelineMarkerProps = ComponentProps<"span"> & {
  status?: TimelineStatus | undefined;
  /**
   * `dot` (default without children), `icon` (default with children: a ringed
   * disc) or `plain` (no chrome, for an <Avatar>).
   */
  variant?: "dot" | "icon" | "plain";
};

/** The marker column. Decorative: the title carries the meaning. */
export function TimelineMarker({
  status = "default",
  variant,
  className,
  children,
  ...props
}: TimelineMarkerProps): ReactElement {
  const kind = variant ?? (children == null ? "dot" : "icon");
  const tone = markerStatusClassNames[status];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex size-(--timeline-marker) shrink-0 items-center justify-center",
        kind === "icon" &&
          "rounded-full border bg-background shadow-xs/5 [&_svg:not([class*='size-'])]:size-3.5 group-data-[density=compact]/timeline:[&_svg:not([class*='size-'])]:size-3 [&_svg]:shrink-0",
        kind === "icon" && tone.icon,
        className,
      )}
      data-slot="timeline-marker"
      data-status={status}
      data-variant={kind}
      {...props}
    >
      {kind === "dot" ? (
        <span
          className={cn(
            "size-(--timeline-dot) rounded-full",
            tone.dot,
          )}
        />
      ) : (
        children
      )}
    </span>
  );
}

export function TimelineContent({ className, ...props }: ComponentProps<"div">): ReactElement {
  return (
    <div
      className={cn(
        // Centres the first line of the title on the marker.
        "min-w-0 flex-1 pt-[calc((var(--timeline-marker)-1.25rem)/2)]",
        className,
      )}
      data-slot="timeline-content"
      {...props}
    />
  );
}

export function TimelineHeader({ className, ...props }: ComponentProps<"div">): ReactElement {
  return (
    <div
      className={cn("flex flex-wrap items-baseline justify-between gap-x-(--qy-space-3) gap-y-[calc(var(--qy-space-1)*0.5)]", className)}
      data-slot="timeline-header"
      {...props}
    />
  );
}

export function TimelineTitle({ className, ...props }: ComponentProps<"div">): ReactElement {
  return (
    <div
      className={cn(
        "min-w-0 font-medium text-foreground text-sm leading-5 [&_strong]:font-medium [&_strong]:text-foreground [&>a:hover]:underline [&>a]:underline-offset-4",
        className,
      )}
      data-slot="timeline-title"
      {...props}
    />
  );
}

export function TimelineTime({ className, ...props }: ComponentProps<"time">): ReactElement {
  return (
    <time
      className={cn("shrink-0 whitespace-nowrap text-muted-foreground text-xs leading-5 numeric", className)}
      data-slot="timeline-time"
      {...props}
    />
  );
}

export function TimelineDescription({ className, ...props }: ComponentProps<"div">): ReactElement {
  return (
    <div
      className={cn(
        "mt-[calc(var(--qy-space-1)*0.5)] text-pretty text-muted-foreground text-sm group-data-[density=compact]/timeline:text-xs",
        className,
      )}
      data-slot="timeline-description"
      {...props}
    />
  );
}
