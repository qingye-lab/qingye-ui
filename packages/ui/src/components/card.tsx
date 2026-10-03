"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type React from "react";
import { cn } from "../utils";

export type CardProps = useRender.ComponentProps<"div">;

/** 独立对象的内容边界；内容通过组合决定自己的布局。 */
export function Card({
  className,
  render,
  ...props
}: CardProps): React.ReactElement {
  // 展示族决定 2 与基础层 §6：只围合独立对象，不替内容决定标题、内边距或布局。
  // 基础层 §4、§18：面板保留自身身份；嵌套同心由组合的外圆角与 inset 显式推导，
  // 不在父容器覆盖控件圆角。密度、方向、语言沿容器继承，不由 Card 写入。
  const defaultProps = {
    className: cn(
      "min-w-0 rounded-panel border border-border bg-card text-card-foreground focus-visible:outline-none focus-visible:border-ring",
      className,
    ),
    "data-slot": "card",
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
