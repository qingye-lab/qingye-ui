"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

/** Relationship roles, rather than a numerical spacing scale. */
export type LayoutGap = "field" | "fields" | "actions" | "panel" | "section";

const gaps = {
  field: "gap-(--qy-field-gap)",
  fields: "gap-(--qy-field-group-gap)",
  actions: "gap-(--qy-action-gap)",
  panel: "gap-(--qy-panel-gap)",
  section: "gap-(--qy-section-gap)",
} satisfies Record<LayoutGap, string>;

const alignments = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

type LayoutProps = useRender.ComponentProps<"div"> & {
  gap?: LayoutGap;
  align?: keyof typeof alignments;
};
export type StackProps = LayoutProps;
export type InlineProps = LayoutProps & { wrap?: boolean };

/** Content groups in reading order; semantics belong to the rendered element. */
export function Stack({ gap = "panel", align = "stretch", className, render, ...props }: StackProps) {
  const defaultProps = {
    "data-slot": "stack",
    "data-gap": gap,
    className: cn("flex min-w-0 flex-col [&>*]:min-w-0 [&>*]:max-w-full", gaps[gap], alignments[align], className),
  };
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });
}

/** Adjacent actions or content; wraps without reordering or hiding children. */
export function Inline({ gap = "actions", align = "center", wrap = true, className, render, ...props }: InlineProps) {
  const defaultProps = {
    "data-slot": "inline",
    "data-gap": gap,
    className: cn("flex min-w-0 [&>*]:min-w-0 [&>*]:max-w-full", wrap ? "flex-wrap" : "flex-nowrap", gaps[gap], alignments[align], className),
  };
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });
}
