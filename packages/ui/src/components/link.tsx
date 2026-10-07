"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

/**
 * 文字链接的唯一画法（基础层 §5、§15）。Breadcrumb、Item、Toolbar、HoverCard 的文字链接
 * 都读这一条，不各自复制。成列的同等导航入口（NavigationMenu、Sidebar、Pagination）由位置
 * 表明是导航，画成 quiet 入口，不逐项加下划线。
 *
 * - 名实相符：链接去往一个地方，按钮执行一个动作；外观不同，读者才分得开。
 * - 骨法用笔：下划线就是链接的线。平时是重墨，悬停与焦点时加深为文字本色，不加粗。
 *   颜色不是唯一的区分方式（WCAG 1.4.1），所以下划线常在。
 * - 焦点：自身盒内 1px 细线（quiet 入口的规则），不外扩。
 * - 行内链接不加 touch-target：44px 的命中层会盖住上下行的文字（WCAG 2.5.8 行内例外）。
 *   独立成行的入口（面包屑、侧栏）由调用方加 `touch-target`。
 */
export const linkClassName =
  "rounded-marker text-foreground underline decoration-(color:--qy-border-input) [text-decoration-thickness:1px] underline-offset-[round(0.25em,1px)] outline-none transition-[text-decoration-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) hover:decoration-current focus-visible:decoration-current focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring";

export type LinkProps = useRender.ComponentProps<"a">;

/** 去往一个地址；路由链接通过 `render` 接入，库不读路由。 */
export function Link({ className, render, ...props }: LinkProps) {
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps({ "data-slot": "link", className: cn(linkClassName, className) }, props),
  });
}
