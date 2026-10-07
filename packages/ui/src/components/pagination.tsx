"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Button, type ButtonProps, buttonVariants } from "./button";
import { useUILocale } from "../locale";
import { cn } from "../utils";

const PageContext = React.createContext<number | undefined>(undefined);
export type PaginationProps = useRender.ComponentProps<"nav"> & { page?: number; totalPages: number | null };
export function Pagination({ page, totalPages, render, className, ...props }: PaginationProps) {
  const { messages } = useUILocale();
  const element = useRender({ defaultTagName: "nav", render, props: mergeProps({ "data-slot": "pagination", "aria-label": messages.pagination, "data-page": page, "data-total-state": totalPages === null ? "unknown" : "known", "data-total-pages": totalPages ?? undefined, className: cn("flex min-w-0 flex-col gap-(--qy-field-gap) text-body", className) }, props) });
  return <PageContext.Provider value={page}>{element}</PageContext.Provider>;
}
export type PaginationListProps = useRender.ComponentProps<"ul">;
export function PaginationList({ render, className, ...props }: PaginationListProps) {
  return useRender({ defaultTagName: "ul", render, props: mergeProps({ "data-slot": "pagination-list", className: cn("m-0 flex min-w-0 list-none flex-wrap items-center gap-(--qy-action-gap) p-0", className) }, props) });
}
export type PaginationItemProps = useRender.ComponentProps<"li">;
export function PaginationItem({ render, className, ...props }: PaginationItemProps) {
  return useRender({ defaultTagName: "li", render, props: mergeProps({ "data-slot": "pagination-item", className: cn("min-w-0", className) }, props) });
}
export type PaginationLinkProps = useRender.ComponentProps<"a"> & { page: number };
/**
 * 基础层 §6（2026-10-05 打磨）：当前页原来是「加粗 + 下划线」同其余链接一样，
 * 在 1 2 3 4 里看不出现在停在哪一页。当前位置是**事实**，不是强调——它与勾选、
 * 开关、分段控件选中同一角色，因此同样用填充表达：当前页是一枚实心控件，
 * 其余页是安静的链接。下划线留给「这里可以离开」，不在当前页上出现。
 */
export function PaginationLink({ page, render, className, ...props }: PaginationLinkProps) {
  const current = React.useContext(PageContext) === page;
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps(
      { "data-slot": "pagination-link", "data-page": page, "aria-current": current ? "page" : undefined },
      props,
      {
        className: cn(
          // 成排的同等入口（基础层 §19）：复用按钮画法；最小宽度等于外高，单个数字时是正方形。
          buttonVariants({ variant: current ? "solid" : "quiet" }),
          "min-w-(--qy-fill-height-narrow) font-normal numeric sm:min-w-(--qy-fill-height)",
          className,
        ),
      },
    ),
  });
}
export type PaginationPreviousProps = ButtonProps;
export function PaginationPrevious({ children, ...props }: PaginationPreviousProps) {
  const { messages } = useUILocale();
  return <Button variant="quiet" data-slot="pagination-previous" {...props}>{children ?? messages.previousPage}</Button>;
}
export type PaginationNextProps = ButtonProps;
export function PaginationNext({ children, ...props }: PaginationNextProps) {
  const { messages } = useUILocale();
  return <Button variant="quiet" data-slot="pagination-next" {...props}>{children ?? messages.nextPage}</Button>;
}
export type PaginationEllipsisProps = useRender.ComponentProps<"span">;
export function PaginationEllipsis({ render, className, ...props }: PaginationEllipsisProps) {
  const { messages } = useUILocale();
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "pagination-ellipsis", className: cn("text-support text-muted-foreground", className), children: <><span aria-hidden="true">…</span><span className="sr-only">{messages.morePages}</span></> }, props) });
}
