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
 * 当前页是**当前位置**：持续的事实，不是命令，也不是强调。
 * 画法取基础层 §11「当前位置用淡染」：淡染的面（12%）加焦墨字；其余页是安静的入口，字为浓墨，
 * 悬停时字回到焦墨并出现清墨底。当前与否由面的深浅和字的墨色共同承担，字重不变，一排数字不跳动。
 * 当前页悬停不变（§19：悬停是当前状态自己的悬停）。
 *
 * 沿革：2026-10-05 当前页由「加粗 + 下划线」改成实心（`--qy-primary`），因为在 1 2 3 4 里看不出停在哪一页；
 * 2026-10-12 用户裁决改为淡染，与轨道内的选中段同一理由——品牌覆写主操作的填充时，页码不随之变色、
 * 不与主按钮同重（§10）。下划线留给「这里可以离开」，不在当前页上出现。
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
          buttonVariants({ variant: "quiet" }),
          "min-w-(--qy-fill-height-narrow) font-normal numeric sm:min-w-(--qy-fill-height)",
          current
            ? "bg-(--qy-surface-active) text-foreground not-aria-disabled:hover:bg-(--qy-surface-active) not-aria-disabled:active:bg-(--qy-surface-active)"
            : "text-muted-foreground not-aria-disabled:hover:text-foreground",
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
