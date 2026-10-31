"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

/** Relationship roles, rather than a numerical spacing scale. */
export type LayoutGap = "pair" | "field" | "fields" | "actions" | "panel" | "section";

const gaps = {
  /* 成对：一个名称与它的说明、一个数值与它的单位。一分（4px）——库内读数浮层、命令快捷键、子菜单分组已经在
   * 用 --qy-space-1 表达同一种关系；它不随密度变，因为文字的材不变（屋有大小，人无大小）。 */
  pair: "gap-(--qy-space-1)",
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

/* 主轴分布。不设值时保持浏览器默认（start），不追加类名。 */
const justifications = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

type LayoutProps = useRender.ComponentProps<"div"> & {
  gap?: LayoutGap;
  /** 交叉轴对齐（Stack 为横向，Inline 为纵向）。 */
  align?: keyof typeof alignments;
  /** 主轴分布（Stack 为纵向，Inline 为横向）。纵向分布需要容器高于内容才看得出。 */
  justify?: keyof typeof justifications;
};
export type StackProps = LayoutProps;
export type InlineProps = LayoutProps & { wrap?: boolean };
export type GridProps = Omit<LayoutProps, "justify"> & {
  /** 固定列数，每列等宽。默认 2。与 minItemWidth 同时给出时以 minItemWidth 为准。 */
  columns?: number;
  /** 每列的最小宽度（CSS 长度，如 "12rem"）：按容器宽度自动决定列数，窄到放不下一列时收为单列而不溢出。 */
  minItemWidth?: string;
};

/** Content groups in reading order; semantics belong to the rendered element. */
export function Stack({ gap = "panel", align = "stretch", justify, className, render, ...props }: StackProps) {
  const defaultProps = {
    "data-slot": "stack",
    "data-gap": gap,
    className: cn("flex min-w-0 flex-col [:where(&>*)]:min-w-0 [:where(&>*)]:max-w-full", gaps[gap], alignments[align], justify && justifications[justify], className),
  };
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });
}

/** Adjacent actions or content; wraps without reordering or hiding children. */
export function Inline({ gap = "actions", align = "center", justify, wrap = true, className, render, ...props }: InlineProps) {
  const defaultProps = {
    "data-slot": "inline",
    "data-gap": gap,
    className: cn("flex min-w-0 [:where(&>*)]:min-w-0 [:where(&>*)]:max-w-full", wrap ? "flex-wrap" : "flex-nowrap", gaps[gap], alignments[align], justify && justifications[justify], className),
  };
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });
}

/**
 * 等宽多列：同一类对象并排比较或浏览（卡片、指标、选项）。纵横间隔取同一个关系角色，所以行距与列距相等。
 * 列数的两种写法都不引入新数值：`columns` 是调用方的内容决定的整数；`minItemWidth` 是调用方给的长度。
 * 默认 2 列是预设（最小的多列）；auto-fit 而非 auto-fill 也是预设——不足一行时空轨道折叠，已有项占满整行。
 */
export function Grid({ gap = "panel", align = "stretch", columns = 2, minItemWidth, className, render, style, ...props }: GridProps) {
  const template = minItemWidth
    ? `repeat(auto-fit, minmax(min(100%, ${minItemWidth}), 1fr))`
    : `repeat(${Math.max(1, Math.floor(columns) || 1)}, minmax(0, 1fr))`;
  const defaultProps = {
    "data-slot": "grid",
    "data-gap": gap,
    className: cn("grid min-w-0 [:where(&>*)]:min-w-0 [:where(&>*)]:max-w-full", gaps[gap], alignments[align], className),
    style: { gridTemplateColumns: template, ...style },
  };
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(defaultProps, props),
  });
}
