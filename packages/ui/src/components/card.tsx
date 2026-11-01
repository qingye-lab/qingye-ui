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
  // 整张卡只通向一个去处时渲染成链接或按钮（render={<a href />}），按反馈阶梯给悬停与按下底色。
  // 反馈色叠在卡片底色上（background-image），不顶替 bg-card，与 DataTable 固定列同一写法。不加阴影：卡片没有离开平面，悬停抬升是假层级（NG11/NG12）。
  const defaultProps = {
    className: cn(
      "min-w-0 rounded-panel border border-border bg-card text-card-foreground focus-visible:outline-none focus-visible:border-ring",
      "[&:is(a[href],button:enabled)]:not-aria-disabled:cursor-pointer [&:is(a[href],button:enabled)]:not-aria-disabled:hover:[background-image:linear-gradient(var(--qy-surface-hover),var(--qy-surface-hover))] [&:is(a[href],button:enabled)]:not-aria-disabled:active:[background-image:linear-gradient(var(--qy-surface-active),var(--qy-surface-active))] [button&]:w-full [button&]:text-start",
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
