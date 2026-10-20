"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { ReactNode } from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type AsyncContentProps = Omit<useRender.ComponentProps<"div">, "children"> & {
  /** 应用声明的最近一次请求事实；组件不发请求，也不推断结果。 */
  status: "pending" | "success" | "error";
  /** 是否还有可用的内容。刷新与刷新失败时保持 true，避免卸载草稿与焦点。 */
  hasContent: boolean;
  children?: ReactNode;
  emptyContent: ReactNode;
  loadingContent?: ReactNode;
} & ({ status: "error"; errorContent: ReactNode } | { status: "pending" | "success"; errorContent?: ReactNode });

/**
 * 最近请求的状态与有效内容是两个事实。保留内容不等于请求成功；空态只属于已完成的零结果。
 * 反馈与内容的间隔复用 panel 关系，不建立额外的卡片、滚动容器或禁用范围。
 * 权限、只读、局部失败、重试、请求竞态和数据有效性均由应用持有。
 */
export function AsyncContent({ status, hasContent, children, emptyContent, loadingContent, errorContent, className, render, ...props }: AsyncContentProps) {
  const { messages } = useUILocale();
  const feedback = status === "pending" ? (loadingContent ?? <span role="status">{messages.loading}</span>) : status === "error" ? errorContent : null;
  return useRender({
    defaultTagName: "div", render,
    props: mergeProps({
      "data-slot": "async-content", "data-status": status, "data-retained": hasContent && status !== "success" ? "" : undefined,
      className: cn("flex min-w-0 flex-col gap-(--qy-panel-gap)", className),
      children: <>
        {feedback != null && <div key="feedback" data-slot="async-content-feedback">{feedback}</div>}
        {hasContent && <div key="content" data-slot="async-content-body" aria-busy={status === "pending"} className="min-w-0">{children}</div>}
        {!hasContent && status === "success" && <div key="empty" data-slot="async-content-empty">{emptyContent}</div>}
      </>,
    }, props),
  });
}
