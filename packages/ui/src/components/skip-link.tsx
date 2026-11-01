"use client";

import type * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type SkipLinkProps = Omit<React.ComponentProps<"a">, "href"> & {
  /** 目标的锚点，写成 `#id`。必填：跳到哪里是页面结构的事实，不是默认值。 */
  href: `#${string}`;
};

/**
 * 跳转链接：键盘用户越过每页重复的导航，直达主要内容（WCAG 2.4.1 绕过区块）。
 * - 平时不可见也不可点（opacity-0 + pointer-events-none，仍在 Tab 序里第一个到达）；获得焦点时才现身，
 *   固定在视口左上（逻辑方向 start，从右向左排版时在右上），盖在页面之上。
 * - 目标由 href 的 `#id` 给出。点击时：把焦点移到目标并滚到可见处，不改地址栏。目标若不可聚焦，
 *   补上 tabindex="-1"，否则焦点留在链接上，下一次 Tab 又回到导航里——跳转等于没发生。
 * - 找不到目标时不拦截，交还浏览器的默认锚点跳转。
 * - 默认文字来自 locale（skipToContent），应用可用 children 覆盖。
 * - 取值都读已有角色：位置与 Workspace 内置的跳转链接同一处（2 分），高度读填值控件高度，面与线是浮起的面（surface-raised + 线 + 浮起阴影）。
 *   z-10 是预设，与 Workspace 内置链接相同；宿主要求更低的层序时用 className 覆盖。
 */
export function SkipLink({ href, children, className, onClick, ...props }: SkipLinkProps) {
  const { messages } = useUILocale();
  return (
    <a
      data-slot="skip-link" href={href} {...props}
      onClick={event => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const target = event.currentTarget.ownerDocument.getElementById(href.slice(1));
        if (!target) return;
        event.preventDefault();
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: "start" });
      }}
      className={cn(
        "pointer-events-none fixed start-(--qy-space-2) top-(--qy-space-2) z-10 inline-flex min-h-(--qy-fill-height) items-center rounded-overlay border border-border bg-surface-raised px-(--qy-control-sm-padding) text-body text-foreground opacity-0 shadow-raised outline-none focus:pointer-events-auto focus:opacity-100 focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color)",
        className,
      )}
    >{children ?? messages.skipToContent}</a>
  );
}
