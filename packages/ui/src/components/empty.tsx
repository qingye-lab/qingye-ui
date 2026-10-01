// Adapted from coss ui (MIT), apps/ui/registry/default/ui/empty.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
import { cva, type VariantProps } from "class-variance-authority";
import type React from "react";
import { cn } from "../utils";

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "relative flex size-9 shrink-0 items-center justify-center rounded-md border bg-card not-dark:bg-clip-padding text-foreground shadow-sm/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-md)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)] [&_svg:not([class*='size-'])]:size-4.5",
      },
    },
  },
);

export function Empty({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance px-6 py-12 text-center md:py-20",
        className,
      )}
      data-slot="empty"
      {...props}
    />
  );
}

export function EmptyHeader({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex max-w-sm flex-col items-center text-center",
        className,
      )}
      data-slot="empty-header"
      {...props}
    />
  );
}

export function EmptyMedia({
  className,
  variant = "default",
  children,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof emptyMediaVariants>): React.ReactElement {
  // Props and className belong to the wrapper only; the visible tile and its
  // two decorative copies take just the variant styles, so ids, handlers and
  // aria attributes are never duplicated.
  return (
    <div
      className={cn("relative mb-6", className)}
      data-slot="empty-media"
      data-variant={variant}
      {...props}
    >
      {variant === "icon" && (
        <>
          <div
            aria-hidden="true"
            className={cn(
              emptyMediaVariants({ variant }),
              "pointer-events-none absolute bottom-px origin-bottom-left -translate-x-0.5 -rotate-10 scale-84 shadow-none",
            )}
          />
          <div
            aria-hidden="true"
            className={cn(
              emptyMediaVariants({ variant }),
              "pointer-events-none absolute bottom-px origin-bottom-right translate-x-0.5 rotate-10 scale-84 shadow-none",
            )}
          />
        </>
      )}
      <div className={emptyMediaVariants({ variant })} data-slot="empty-media-content">
        {children}
      </div>
    </div>
  );
}

export type EmptyTitleSize = "default" | "sm";

/**
 * The title is the loudest thing in an empty state, which suits a full-page or
 * full-panel placeholder. Inside a card or a table cell the surrounding
 * headings already set the level, so `size="sm"` steps it down to body size.
 */
export function EmptyTitle({
  className,
  size = "default",
  ...props
}: React.ComponentProps<"div"> & { size?: EmptyTitleSize }): React.ReactElement {
  return (
    <div
      className={cn("font-heading font-semibold", size === "sm" ? "text-base" : "text-title", className)}
      data-size={size}
      data-slot="empty-title"
      {...props}
    />
  );
}

export function EmptyDescription({
  className,
  ...props
}: React.ComponentProps<"p">): React.ReactElement {
  return (
    <div
      className={cn(
        "text-muted-foreground text-sm [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4 [[data-slot=empty-title]+&]:mt-1",
        className,
      )}
      data-slot="empty-description"
      {...props}
    />
  );
}

export function EmptyContent({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm",
        className,
      )}
      data-slot="empty-content"
      {...props}
    />
  );
}
