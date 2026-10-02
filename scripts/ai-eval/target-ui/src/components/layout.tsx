import type * as React from "react";
import { cn } from "../utils";

/*
 * Layout primitives: a vertical stack, a horizontal row, a responsive grid and
 * a body-text span. They exist so spacing comes from the token scale and
 * reads as intent in JSX; anything they do not cover is one Tailwind class
 * away, and plain Tailwind is just as welcome.
 */

/** A step of the spacing scale: `gap={4}` is `--qy-space-4` (1rem). */
export type LayoutGap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

const gapClasses: Record<LayoutGap, string> = {
  0: "gap-0",
  1: "gap-(--qy-space-1)",
  2: "gap-(--qy-space-2)",
  3: "gap-(--qy-space-3)",
  4: "gap-(--qy-space-4)",
  5: "gap-(--qy-space-5)",
  6: "gap-(--qy-space-6)",
  8: "gap-(--qy-space-8)",
  10: "gap-(--qy-space-10)",
  12: "gap-(--qy-space-12)",
  16: "gap-(--qy-space-16)",
};

/**
 * `as` swaps the rendered element while keeping its own props typed: with
 * `as="form"` the component accepts `onSubmit`, with `as="ol"` it does not.
 */
type PolymorphicProps<E extends React.ElementType, P> = P & {
  as?: E;
} & Omit<React.ComponentPropsWithRef<E>, keyof P | "as">;

const alignClasses = {
  baseline: "items-baseline",
  center: "items-center",
  end: "items-end",
  start: "items-start",
  stretch: "items-stretch",
} as const;

const justifyClasses = {
  between: "justify-between",
  center: "justify-center",
  end: "justify-end",
  start: "justify-start",
} as const;

/* --- Stack --------------------------------------------------------------- */

type StackElement =
  | "div"
  | "section"
  | "article"
  | "aside"
  | "header"
  | "footer"
  | "main"
  | "nav"
  | "form"
  | "fieldset"
  | "ul"
  | "ol"
  | "li";

export type StackProps<E extends StackElement = "div"> = PolymorphicProps<
  E,
  {
    /** Space between children. @default 4 */
    gap?: LayoutGap;
    /** Cross-axis alignment. @default "stretch" */
    align?: Exclude<keyof typeof alignClasses, "baseline">;
  }
>;

/** Children in a column with even spacing. */
export function Stack<E extends StackElement = "div">({
  as,
  gap = 4,
  align = "stretch",
  className,
  ...props
}: StackProps<E>): React.ReactElement {
  const Component = (as ?? "div") as React.ElementType;
  return (
    <Component
      className={cn("flex min-w-0 flex-col", gapClasses[gap], alignClasses[align], className)}
      data-slot="stack"
      {...props}
    />
  );
}

/* --- Inline -------------------------------------------------------------- */

type InlineElement = "div" | "section" | "header" | "footer" | "nav" | "form" | "ul" | "ol" | "li";

export type InlineProps<E extends InlineElement = "div"> = PolymorphicProps<
  E,
  {
    /** Space between children. @default 2 */
    gap?: LayoutGap;
    /** Cross-axis alignment. @default "center" */
    align?: keyof typeof alignClasses;
    /** Main-axis distribution. @default "start" */
    justify?: keyof typeof justifyClasses;
    /** Let children wrap onto new lines instead of overflowing. @default true */
    wrap?: boolean;
  }
>;

/** Children in a row, vertically centred, wrapping when space runs out. */
export function Inline<E extends InlineElement = "div">({
  as,
  gap = 2,
  align = "center",
  justify = "start",
  wrap = true,
  className,
  ...props
}: InlineProps<E>): React.ReactElement {
  const Component = (as ?? "div") as React.ElementType;
  return (
    <Component
      className={cn(
        "flex min-w-0",
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className,
      )}
      data-slot="inline"
      {...props}
    />
  );
}

/* --- Grid ---------------------------------------------------------------- */

type GridElement = "div" | "section" | "ul" | "ol";

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
} as const;

export type GridProps<E extends GridElement = "div"> = PolymorphicProps<
  E,
  {
    /**
     * Column count at full width. Collapses to one column on phones and two
     * from `sm`, following the viewport. @default 1
     */
    columns?: keyof typeof columnClasses;
    /**
     * Fit as many columns as the container allows, each at least this wide
     * (any CSS length, e.g. `"14rem"`). Follows the container rather than the
     * viewport, and takes precedence over `columns`.
     */
    minItemWidth?: string;
    /** Space between cells. @default 4 */
    gap?: LayoutGap;
  }
>;

/** Equal-width cells that reflow on narrow screens. */
export function Grid<E extends GridElement = "div">({
  as,
  columns = 1,
  minItemWidth,
  gap = 4,
  className,
  style,
  ...props
}: GridProps<E>): React.ReactElement {
  const Component = (as ?? "div") as React.ElementType;
  return (
    <Component
      className={cn(
        "grid min-w-0",
        minItemWidth
          ? "grid-cols-[repeat(auto-fill,minmax(min(var(--grid-min-item),100%),1fr))]"
          : columnClasses[columns],
        gapClasses[gap],
        className,
      )}
      data-slot="grid"
      style={minItemWidth ? { "--grid-min-item": minItemWidth, ...style } : style}
      {...props}
    />
  );
}

/* --- Text ---------------------------------------------------------------- */

type TextElement = "span" | "p" | "div" | "small" | "strong" | "em" | "time";

const sizeClasses = {
  body: "text-body",
  caption: "text-caption",
  label: "text-label",
} as const;

const toneClasses = {
  danger: "text-destructive-foreground",
  default: "text-foreground",
  muted: "text-muted-foreground",
  success: "text-success-foreground",
  warning: "text-warning-foreground",
} as const;

export type TextProps<E extends TextElement = "span"> = PolymorphicProps<
  E,
  {
    /** Type ramp step: body 14px, label 13px, caption 12px. @default "body" */
    size?: keyof typeof sizeClasses;
    /** Semantic colour. Inherits from the parent when omitted. */
    tone?: keyof typeof toneClasses;
  }
>;

/** Running text on the type ramp, in a semantic colour. */
export function Text<E extends TextElement = "span">({
  as,
  size = "body",
  tone,
  className,
  ...props
}: TextProps<E>): React.ReactElement {
  const Component = (as ?? "span") as React.ElementType;
  return (
    <Component
      className={cn(sizeClasses[size], tone && toneClasses[tone], className)}
      data-slot="text"
      {...props}
    />
  );
}
