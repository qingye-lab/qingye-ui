import { createElement, type ComponentPropsWithRef } from "react";
import { cn } from "../utils";

export type LayoutGap = "tight" | "compact" | "default" | "section";

const gapClasses: Record<LayoutGap, string> = {
  tight: "gap-(--space-1)",
  compact: "gap-(--space-2)",
  default: "gap-(--space-4)",
  section: "gap-(--density-section-gap)",
};

type StackElement = "div" | "section" | "form" | "fieldset" | "article";
export type StackProps<T extends StackElement = "div"> = {
  as?: T;
  gap?: LayoutGap;
} & ComponentPropsWithRef<T>;

export function Stack<T extends StackElement = "div">({ as, gap = "default", className, ...props }: StackProps<T>) {
  const element = as ?? "div";
  return createElement(element, {
    ...props,
    "data-slot": "stack",
    "data-gap": gap,
    className: cn("flex min-w-0 flex-col", gapClasses[gap], element === "fieldset" && "m-0 border-0 p-0", className),
  });
}

type InlineElement = "div" | "form" | "header" | "footer";
export type InlineProps<T extends InlineElement = "div"> = {
  as?: T;
  gap?: LayoutGap;
  align?: "center" | "start" | "end";
  justify?: "start" | "between" | "end";
  wrap?: boolean;
} & ComponentPropsWithRef<T>;

const alignClasses = { center: "items-center", start: "items-start", end: "items-end" };
const justifyClasses = { start: "justify-start", between: "justify-between", end: "justify-end" };

export function Inline<T extends InlineElement = "div">({ as, gap = "compact", align = "center", justify = "start", wrap = true, className, ...props }: InlineProps<T>) {
  return createElement(as ?? "div", {
    ...props,
    "data-slot": "inline",
    "data-gap": gap,
    className: cn("flex min-w-0", gapClasses[gap], alignClasses[align], justifyClasses[justify], wrap && "flex-wrap", className),
  });
}

export type GridProps = ComponentPropsWithRef<"div"> & { columns?: 1 | 2 | 3; gap?: LayoutGap };
const columnClasses = { 1: "grid-cols-1", 2: "grid-cols-1 sm:grid-cols-2", 3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" };

export function Grid({ columns = 1, gap = "default", className, ...props }: GridProps) {
  return <div {...props} data-slot="grid" data-columns={columns} data-gap={gap} className={cn("grid min-w-0", columnClasses[columns], gapClasses[gap], className)} />;
}

type TextElement = "p" | "span" | "small";
export type TextProps<T extends TextElement = "span"> = {
  as?: T;
  size?: "body" | "label" | "caption";
  tone?: "default" | "muted" | "danger";
} & ComponentPropsWithRef<T>;
const sizeClasses = { body: "text-body", label: "text-label", caption: "text-caption" };
const toneClasses = { default: "text-foreground", muted: "text-muted-foreground", danger: "text-destructive" };

export function Text<T extends TextElement = "span">({ as, size = "body", tone = "default", className, ...props }: TextProps<T>) {
  return createElement(as ?? "span", {
    ...props,
    "data-slot": "text",
    "data-size": size,
    "data-tone": tone,
    className: cn("m-0", sizeClasses[size], toneClasses[tone], className),
  });
}
