// Adapted from coss ui (MIT), apps/ui/registry/default/ui/table.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type React from "react";
import { cn } from "../utils";

export type TableVariant = "default" | "card";

export type TableDensity = "default" | "compact";

export type TableProps = React.ComponentProps<"table"> & {
  variant?: TableVariant;
  /** Row height; `compact` suits dense, scannable data. Both read from tokens. */
  density?: TableDensity;
  /**
   * Pins the header row while the body scrolls. The container is the scroll
   * area, so give it a height, e.g. `render={<div className="max-h-80" />}`.
   */
  stickyHeader?: boolean;
  render?: useRender.ComponentProps<"div">["render"];
};

export function Table({
  className,
  variant = "default",
  density = "default",
  stickyHeader = false,
  render,
  ...props
}: TableProps): React.ReactElement {
  const defaultProps = {
    children: (
      <table
        className={cn(
          "w-full caption-bottom in-data-[variant=card]:border-separate in-data-[variant=card]:border-spacing-0 text-sm",
          className,
        )}
        data-slot="table"
        {...props}
      />
    ),
    // --table-row carries the density so header and cells derive from one value.
    className:
      "group/table relative w-full overflow-x-auto [--table-row:var(--qy-row-default)] data-[density=compact]:[--table-row:var(--qy-row-compact)]",
    "data-density": density,
    "data-sticky-header": stickyHeader ? "" : undefined,
    "data-slot": "table-container",
    "data-variant": variant,
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, {}),
    render,
  });
}

export function TableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">): React.ReactElement {
  return (
    <thead
      className={cn("not-in-data-sticky-header:[&_tr]:border-b [&_tr]:hover:bg-transparent!", className)}
      data-slot="table-header"
      {...props}
    />
  );
}

export function TableBody({
  className,
  ...props
}: React.ComponentProps<"tbody">): React.ReactElement {
  return (
    <tbody
      className={cn(
        "relative in-data-[variant=card]:rounded-xl in-data-[variant=card]:shadow-xs/5 before:pointer-events-none before:absolute before:inset-px not-in-data-[variant=card]:before:hidden before:rounded-[calc(var(--radius-xl)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/8%)] [&_tr:last-child]:border-0 in-data-[variant=card]:*:[tr]:border-0 in-data-[variant=card]:*:[tr]:*:[td]:border-b in-data-[variant=card]:*:[tr]:*:[td]:bg-card in-data-[variant=card]:*:[tr]:first:*:[td]:first:rounded-ss-xl in-data-[variant=card]:*:[tr]:*:[td]:first:border-s in-data-[variant=card]:*:[tr]:first:*:[td]:border-t in-data-[variant=card]:*:[tr]:last:*:[td]:last:rounded-ee-xl in-data-[variant=card]:*:[tr]:*:[td]:last:border-e in-data-[variant=card]:*:[tr]:first:*:[td]:last:rounded-se-xl in-data-[variant=card]:*:[tr]:last:*:[td]:first:rounded-es-xl in-data-[variant=card]:*:[tr]:hover:*:[td]:bg-[color-mix(in_srgb,var(--card),var(--color-black)_2%)] in-data-[variant=card]:*:[tr]:data-[state=selected]:*:[td]:bg-[color-mix(in_srgb,var(--card),var(--color-black)_4%)] dark:in-data-[variant=card]:*:[tr]:data-[state=selected]:*:[td]:bg-[color-mix(in_srgb,var(--card),var(--color-white)_4%)] dark:in-data-[variant=card]:*:[tr]:hover:*:[td]:bg-[color-mix(in_srgb,var(--card),var(--color-white)_2%)]",
        className,
      )}
      data-slot="table-body"
      {...props}
    />
  );
}

export function TableFooter({
  className,
  ...props
}: React.ComponentProps<"tfoot">): React.ReactElement {
  return (
    <tfoot
      className={cn(
        "border-t in-data-[variant=card]:border-none bg-transparent not-in-data-[variant=card]:bg-[color-mix(in_srgb,var(--card),var(--color-black)_2%)] font-medium dark:not-in-data-[variant=card]:bg-[color-mix(in_srgb,var(--card),var(--color-white)_2%)] [&>tr]:last:border-b-0",
        className,
      )}
      data-slot="table-footer"
      {...props}
    />
  );
}

export function TableRow({
  className,
  ...props
}: React.ComponentProps<"tr">): React.ReactElement {
  return (
    <tr
      className={cn(
        "relative border-b not-in-data-[variant=card]:hover:bg-[color-mix(in_srgb,var(--background),var(--color-black)_2%)] not-in-data-[variant=card]:data-[state=selected]:bg-[color-mix(in_srgb,var(--background),var(--color-black)_4%)] dark:not-in-data-[variant=card]:data-[state=selected]:bg-[color-mix(in_srgb,var(--background),var(--color-white)_4%)] dark:not-in-data-[variant=card]:hover:bg-[color-mix(in_srgb,var(--background),var(--color-white)_2%)]",
        className,
      )}
      data-slot="table-row"
      {...props}
    />
  );
}

export function TableHead({
  className,
  ...props
}: React.ComponentProps<"th">): React.ReactElement {
  return (
    <th
      className={cn(
        "h-[max(--spacing(9),calc(var(--table-row)_-_--spacing(2)))] whitespace-nowrap px-[calc(var(--qy-space-1)*2.5)] text-start align-middle font-medium text-muted-foreground leading-none has-[[role=checkbox]]:w-px last:has-[[role=checkbox]]:ps-0 first:has-[[role=checkbox]]:pe-0",
        // Sticky header: an opaque fill and an inset hairline, because collapsed
        // row borders do not travel with sticky cells.
        "group-data-sticky-header/table:sticky group-data-sticky-header/table:top-0 group-data-sticky-header/table:z-10 group-data-sticky-header/table:bg-background group-data-sticky-header/table:shadow-[inset_0_-1px_var(--color-border)] in-data-[variant=card]:group-data-sticky-header/table:bg-[linear-gradient(--alpha(var(--color-muted)/72%),--alpha(var(--color-muted)/72%)),linear-gradient(var(--color-card),var(--color-card))] in-data-[variant=card]:group-data-sticky-header/table:shadow-none",
        className,
      )}
      data-slot="table-head"
      {...props}
    />
  );
}

export function TableCell({
  className,
  ...props
}: React.ComponentProps<"td">): React.ReactElement {
  return (
    <td
      className={cn(
        "h-(--table-row) whitespace-nowrap bg-clip-padding px-[calc(var(--qy-space-1)*2.5)] py-(--qy-space-2) in-data-[slot=table-footer]:py-[calc(var(--qy-space-1)*3.5)] align-middle leading-none in-data-[variant=card]:first:ps-[calc(calc(var(--qy-space-1)*2.5)-1px)] in-data-[variant=card]:last:pe-[calc(calc(var(--qy-space-1)*2.5)-1px)] has-[[role=checkbox]]:w-px last:has-[[role=checkbox]]:ps-0 first:has-[[role=checkbox]]:pe-0",
        className,
      )}
      data-slot="table-cell"
      {...props}
    />
  );
}

export function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">): React.ReactElement {
  return (
    <caption
      className={cn(
        "in-data-[variant=card]:my-(--qy-space-4) mt-(--qy-space-4) text-muted-foreground text-sm",
        className,
      )}
      data-slot="table-caption"
      {...props}
    />
  );
}
