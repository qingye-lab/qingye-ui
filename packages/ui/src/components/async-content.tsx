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
 * 子节点的顺序固定为 内容 → 空态 → 反馈，且不随状态重排：内容区总在最前，刷新或失败的反馈出现在它后面，
 * 不会把正在阅读的内容往下推（design.md「随状态改变尺寸」；重排还会移动含焦点的节点）。
 * 内容之后的元素会被反馈推动一次，这是反馈真实占位的代价，预设；需要零位移时由应用为反馈预留位置。
 * 错误反馈带 role="alert"，由组件承担「失败要被听到」，调用方的 errorContent 不必再自带。
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
        {hasContent && <div key="content" data-slot="async-content-body" aria-busy={status === "pending"} className="min-w-0">{children}</div>}
        {!hasContent && status === "success" && <div key="empty" data-slot="async-content-empty">{emptyContent}</div>}
        {feedback != null && <div key="feedback" data-slot="async-content-feedback" role={status === "error" ? "alert" : undefined}>{feedback}</div>}
      </>,
    }, props),
  });
}
