"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { Button, type ButtonProps, buttonVariants } from "./button";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "./select";
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
 * 画法取基础层 §11 反馈梯：选中面（--qy-surface-selected，全库唯一的「当前」面）加焦墨字；其余页是安静的入口，字为浓墨，
 * 悬停时字回到焦墨并出现悬停面。当前与否由面的深浅和字的墨色共同承担，字重不变，一排数字不跳动。
 * 当前页悬停不变（§19：悬停是当前状态自己的悬停）。
 *
 * 沿革：2026-10-05 当前页由「加粗 + 下划线」改成实心（`--qy-primary`），因为在 1 2 3 4 里看不出停在哪一页；
 * 2026-10-12 用户裁决改为选中面（先是淡染 12%，同日改为叠合的 4%），与轨道内的选中段同一理由——品牌覆写主操作的填充时，页码不随之变色、
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
            ? "bg-surface-selected text-foreground not-aria-disabled:hover:bg-surface-selected not-aria-disabled:active:bg-surface-selected"
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

/** Public page numbers are one-based. Zero results retain page 1 in state, without presenting a current page. */
export type PaginationValue = { page: number; pageSize: number };
export type PaginationChangeDetails = { reason: "page" | "page-size" | "total-change" };
type PaginationTotals = { totalCount: number; hasNextPage?: boolean } | { totalCount: null; hasNextPage: boolean };
export type PaginationPatternProps = Omit<PaginationProps, "page" | "totalPages" | "children" | "defaultValue" | "onChange"> & PaginationTotals & {
  value?: PaginationValue;
  defaultValue?: PaginationValue;
  onValueChange?: (value: PaginationValue, details: PaginationChangeDetails) => void;
  /** Omit to hide the page-size control. Values must be distinct positive integers. */
  pageSizeOptions?: readonly number[];
  disabled?: boolean;
};

/** Shared by standard table composition and standalone pagination; no requests or route changes occur here. */
export function normalizePaginationValue(value: PaginationValue, totalCount: number | null): PaginationValue {
  if (!Number.isInteger(value.page) || value.page < 1 || !Number.isInteger(value.pageSize) || value.pageSize < 1) throw new Error("Pagination requires positive integer page and pageSize.");
  if (totalCount !== null && (!Number.isInteger(totalCount) || totalCount < 0)) throw new Error("Pagination requires a nonnegative integer totalCount or null.");
  const lastPage = totalCount === null ? value.page : Math.max(1, Math.ceil(totalCount / value.pageSize));
  return { page: Math.min(value.page, lastPage), pageSize: value.pageSize };
}

function pageWindow(page: number, total: number): (number | "gap")[] {
  const pages = [...new Set([1, page - 1, page, page + 1, total])].filter(value => value >= 1 && value <= total).sort((a, b) => a - b);
  return pages.flatMap((value, index) => index > 0 && value - pages[index - 1]! > 1 ? ["gap", value] : [value]);
}

/** A complete local-action pager. Link-based navigation remains available through the primitive parts above. */
export function PaginationPattern({ value, defaultValue = { page: 1, pageSize: 10 }, onValueChange, totalCount, hasNextPage, pageSizeOptions, disabled = false, ...props }: PaginationPatternProps) {
  const { messages } = useUILocale();
  const [internalValue, setInternalValue] = React.useState(defaultValue);
  const source = value ?? internalValue;
  const current = normalizePaginationValue(source, totalCount);
  if (totalCount === null && typeof hasNextPage !== "boolean") throw new Error("Pagination with unknown totalCount requires explicit hasNextPage.");
  if (pageSizeOptions?.some((option, index) => !Number.isInteger(option) || option < 1 || pageSizeOptions.indexOf(option) !== index)) throw new Error("Pagination pageSizeOptions must contain distinct positive integers.");
  const totalPages = totalCount === null ? null : Math.ceil(totalCount / current.pageSize);
  const correction = React.useRef<string | null>(null);
  React.useEffect(() => {
    if (source.page === current.page && source.pageSize === current.pageSize) { correction.current = null; return; }
    const key = `${source.page}:${source.pageSize}:${current.page}:${current.pageSize}:${totalCount}`;
    if (correction.current === key) return;
    correction.current = key;
    if (value === undefined) setInternalValue(current);
    onValueChange?.(current, { reason: "total-change" });
  }, [source.page, source.pageSize, current.page, current.pageSize, totalCount, value, onValueChange]);
  const change = (next: PaginationValue, reason: "page" | "page-size") => {
    const normalized = normalizePaginationValue(next, totalCount);
    if (normalized.page === current.page && normalized.pageSize === current.pageSize) return;
    if (value === undefined) setInternalValue(normalized);
    onValueChange?.(normalized, { reason });
  };
  const options = pageSizeOptions && !pageSizeOptions.includes(current.pageSize) ? [...pageSizeOptions, current.pageSize].sort((a, b) => a - b) : pageSizeOptions;
  return <Pagination data-slot="pagination-pattern" {...props} {...(totalPages === 0 ? {} : { page: current.page })} totalPages={totalPages}>
    <PaginationList>
      <PaginationItem><PaginationPrevious disabled={disabled || current.page === 1 || totalPages === 0} onClick={() => change({ ...current, page: current.page - 1 }, "page")} /></PaginationItem>
      {totalPages !== null && pageWindow(current.page, totalPages).map((entry, index) => <PaginationItem key={entry === "gap" ? `gap-${index}` : entry}>{entry === "gap" ? <PaginationEllipsis /> : <PaginationLink page={entry} aria-label={messages.paginationPage(entry)} render={<Button variant="quiet" disabled={disabled} />} onClick={() => change({ ...current, page: entry }, "page")}>{entry}</PaginationLink>}</PaginationItem>)}
      <PaginationItem><PaginationNext disabled={disabled || (totalPages === null ? !hasNextPage : totalPages === 0 || current.page >= totalPages)} onClick={() => change({ ...current, page: current.page + 1 }, "page")} /></PaginationItem>
    </PaginationList>
    <div data-slot="pagination-details" className="flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)">
      <span data-slot="pagination-summary" className="text-support text-muted-foreground">{messages.paginationSummary(current.page, totalPages, totalCount)}</span>
      {options && options.length > 0 && <Select<number> value={current.pageSize} disabled={disabled} items={options.map(option => ({ value: option, label: String(option) }))} onValueChange={pageSize => { if (pageSize !== null) change({ page: 1, pageSize }, "page-size"); }}>
        <SelectTrigger aria-label={messages.paginationPageSize}><span>{messages.paginationPageSize}</span><SelectValue /></SelectTrigger>
        <SelectPopup>{options.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}</SelectPopup>
      </Select>}
    </div>
  </Pagination>;
}
