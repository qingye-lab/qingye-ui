"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { TextStep } from "../text-steps";
import { cn } from "../utils";

export type { TextStep } from "../text-steps";

// Literal classes keep Tailwind extraction reliable; the canonical list checks completeness.
const steps = {
  "display-xl": "text-display-xl",
  "display-lg": "text-display-lg",
  display: "text-display",
  title: "text-title",
  chapter: "text-chapter",
  heading: "text-heading",
  body: "text-body",
  "body-strong": "text-body-strong",
  reading: "text-reading",
  prose: "text-prose",
  "prose-strong": "text-prose-strong",
  "prose-h1": "text-prose-h1",
  "prose-h2": "text-prose-h2",
  "prose-h3": "text-prose-h3",
  support: "text-support-mobile sm:text-support",
  "support-mobile": "text-support-mobile",
  "support-strong": "text-support-strong-mobile sm:text-support-strong",
  "support-strong-mobile": "text-support-strong-mobile",
  dense: "text-dense-mobile sm:text-dense",
  "dense-mobile": "text-dense-mobile",
  "dense-strong": "text-dense-strong-mobile sm:text-dense-strong",
  "dense-strong-mobile": "text-dense-strong-mobile",
  caption: "text-caption",
  "caption-strong": "text-caption-strong",
  label: "text-label",
  metric: "text-metric numeric",
  micro: "text-micro",
  "control-xs": "text-control-xs-mobile sm:text-control-xs",
  "control-xs-mobile": "text-control-xs-mobile",
  "control-sm": "text-control-sm-mobile sm:text-control-sm",
  "control-sm-mobile": "text-control-sm-mobile",
  "control-md": "text-control-md-mobile sm:text-control-md",
  "control-md-mobile": "text-control-md-mobile",
  "control-lg": "text-control-lg-mobile sm:text-control-lg",
  "control-lg-mobile": "text-control-lg-mobile",
  "control-xl": "text-control-xl-mobile sm:text-control-xl",
  "control-xl-mobile": "text-control-xl-mobile",
} satisfies Record<TextStep, string>;

type TypeProps = { step?: TextStep; numeric?: boolean };
export type HeadingProps = useRender.ComponentProps<"h2"> & TypeProps & {
  /** Document outline, independent of the visual text step. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
};
export type TextProps = useRender.ComponentProps<"p"> & TypeProps;

const capacity = "m-0 min-w-0 max-w-full whitespace-normal wrap-anywhere";

export function Heading({ level = 2, step = "heading", numeric = false, className, render, ...props }: HeadingProps) {
  const defaultProps = {
    "data-slot": "heading",
    "data-step": step,
    className: cn(capacity, steps[step], numeric && "numeric", className),
  };
  return useRender({
    defaultTagName: `h${level}`,
    render,
    props: mergeProps<"h2">(defaultProps, props),
  });
}

/** Body, supporting copy or numeric content; language tracking stays in utilities.css. */
export function Text({ step = "body", numeric = false, className, render, ...props }: TextProps) {
  const defaultProps = {
    "data-slot": "text",
    "data-step": step,
    className: cn(capacity, steps[step], numeric && "numeric", className),
  };
  return useRender({
    defaultTagName: "p",
    render,
    props: mergeProps<"p">(defaultProps, props),
  });
}

export type CodeProps = useRender.ComponentProps<"code">;
/**
 * 正文里的一段代码（基础层 §8、§19）：等宽字，字号为所在文字的 0.875 倍并取整像素
 * （等宽字面偏大，略收一些；em 换算不能落成小数字号）；面取墨的柔底（一种机制），
 * 横向留白 1 分；跨行时每段各自带面。不另设行高，跟随所在那一行。
 */
export function Code({ className, render, ...props }: CodeProps) {
  return useRender({
    defaultTagName: "code",
    render,
    props: mergeProps({ "data-slot": "code", className: cn("rounded-marker bg-neutral-soft px-(--qy-fen) font-mono text-[round(0.875em,1px)] [box-decoration-break:clone] wrap-anywhere", className) }, props),
  });
}
