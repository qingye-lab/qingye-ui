"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import * as React from "react";
import { Button, type ButtonProps, buttonVariants } from "./button";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "./select";
import { useMediaQuery } from "../hooks/use-media-query";
import { useUIDirection, useUILocale } from "../locale";
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
 * 悬停时字回到焦墨并出现悬停面。当前页另有一条不靠颜色的线索：font-medium（WCAG 1.4.1，选中面与悬停面只差一档墨，
 * 不能是唯一的区别；全库「当前」的列表类都加字重）。当前页悬停不变（§19：悬停是当前状态自己的悬停）。
 * 字重不能让按钮变宽（NG9：状态改变尺寸）：数字用等宽数字（numeric），并且每个页码的宽度一律按 medium 字重预留——
 * 标签里叠一份不可见的 medium 副本（data-reserve，伪元素，同一格栅格），宽度取两者较大者，所以当前页进出任何一页，外缘都不动。
 * 实测系统字体 14px 下，tabular 数字 400 → 500 每位宽 8.67 → 8.86px，两位数就差 0.4px，只靠最小宽度压不住。
 *
 * 沿革：2026-10-05 当前页由「加粗 + 下划线」改成实心（`--qy-primary`），因为在 1 2 3 4 里看不出停在哪一页；
 * 2026-10-12 用户裁决改为选中面（先是淡染 12%，同日改为叠合的 4%），与轨道内的选中段同一理由——品牌覆写主操作的填充时，页码不随之变色、
 * 不与主按钮同重（§10）。下划线留给「这里可以离开」，不在当前页上出现。
 */
export function PaginationLink({ page, render, className, children, ...props }: PaginationLinkProps) {
  const current = React.useContext(PageContext) === page;
  const label = typeof children === "string" || typeof children === "number"
    ? <span data-slot="pagination-link-label" data-reserve={children} className="inline-grid justify-items-center after:invisible after:col-start-1 after:row-start-1 after:h-0 after:overflow-hidden after:font-medium after:content-[attr(data-reserve)]"><span className="col-start-1 row-start-1">{children}</span></span>
    : children;
  return useRender({
    defaultTagName: "a",
    render,
    props: mergeProps(
      { "data-slot": "pagination-link", "data-page": page, "aria-current": current ? "page" : undefined, children: label },
      props,
      {
        className: cn(
          // 成排的同等入口（基础层 §19）：复用按钮画法；最小宽度等于外高，横向留白收为 1 分，
          // 两位数以内的页码都是正方形，页窗各格同宽（按钮默认的标签留白会让一位数也宽出 5px，格位参差）。
          buttonVariants({ variant: "quiet" }),
          "min-w-(--qy-fill-height-narrow) px-(--qy-space-1) numeric sm:min-w-(--qy-fill-height)",
          current
            ? "bg-surface-selected font-medium text-foreground not-aria-disabled:hover:bg-surface-selected not-aria-disabled:active:bg-surface-selected"
            : "font-normal text-muted-foreground not-aria-disabled:hover:text-foreground",
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
  /**
   * 正在取数（例如 DataTablePattern busy）。与 disabled 的区别：翻页被挡住，但按钮保持可聚焦——
   * 原生 disabled 会让刚按下的那个按钮立刻丢掉焦点，键盘用户被甩到页面顶部。页大小选择改为只读（同样留住焦点）。
   */
  busy?: boolean;
};

/** Shared by standard table composition and standalone pagination; no requests or route changes occur here. */
export function normalizePaginationValue(value: PaginationValue, totalCount: number | null): PaginationValue {
  if (!Number.isInteger(value.page) || value.page < 1 || !Number.isInteger(value.pageSize) || value.pageSize < 1) throw new Error("Pagination requires positive integer page and pageSize.");
  if (totalCount !== null && (!Number.isInteger(totalCount) || totalCount < 0)) throw new Error("Pagination requires a nonnegative integer totalCount or null.");
  const lastPage = totalCount === null ? value.page : Math.max(1, Math.ceil(totalCount / value.pageSize));
  return { page: Math.min(value.page, lastPage), pageSize: value.pageSize };
}

/**
 * 页窗：首页、末页各一格，当前页两侧各 siblings 格，断开处各一格省略号，**格数恒定**（2 × siblings + 5）。
 * 格数恒定是**派生**的：翻页时页码排总宽不变，上一页、下一页不在指针下挪位（NG9：状态不改变尺寸）。
 * 宽屏 siblings = 1（7 格）；窄屏 siblings = 0（5 格）：窄屏外高下 7 格加两枚箭头约 388px，超出 375 宽视口的内容宽，5 格约 300px（**派生**）。
 */
function pageWindow(page: number, total: number, siblings: number): (number | "gap")[] {
  const slots = 2 * siblings + 5;
  const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, index) => from + index);
  if (total <= slots) return range(1, total);
  if (page <= siblings + 3) return [...range(1, slots - 2), "gap", total];
  if (page >= total - siblings - 2) return [1, "gap", ...range(total - slots + 3, total)];
  return [1, "gap", ...range(page - siblings, page + siblings), "gap", total];
}

/**
 * A complete local-action pager. Link-based navigation remains available through the primitive parts above.
 *
 * 一行：行首是安静的摘要（辅助字号、淡墨、等宽数字），行尾是翻页与条数——摘要回答「我看到的是哪些」，控件回答「去哪」，
 * 各部件之间一个组间距（**派生**，§3）。窄屏有页码时，摘要与条数选择在第一行，页码排独占第二行。
 * 只出现有事可做的部件（**约束**，名实相符：不可操作的入口不是入口）：
 * - 页码排：已知总数时多于一页才出现；未知总数时不在第 1 页或还有下一页才出现。
 * - 条数选择：换一个候选能改变分页时才出现——已知总数时总数大于最小候选；未知总数时可翻页，或当前条数大于最小候选。
 * - 未知总数、第 1 页、没有下一页、条数也无可换时，整个组件不渲染，使用方不必自己判断。
 * 上一页、下一页是图标按钮，可访问名称来自 locale；页码在旁，箭头的方向不需要文字再说一遍。从右向左时箭头镜像。
 */
export function PaginationPattern({ value, defaultValue = { page: 1, pageSize: 10 }, onValueChange, totalCount, hasNextPage, pageSizeOptions, disabled = false, busy = false, className, ...props }: PaginationPatternProps) {
  const { messages } = useUILocale();
  const dir = useUIDirection();
  const narrow = useMediaQuery("max-sm");
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
    if (busy) return;
    const normalized = normalizePaginationValue(next, totalCount);
    if (normalized.page === current.page && normalized.pageSize === current.pageSize) return;
    if (value === undefined) setInternalValue(normalized);
    onValueChange?.(normalized, { reason });
  };
  const options = pageSizeOptions && !pageSizeOptions.includes(current.pageSize) ? [...pageSizeOptions, current.pageSize].sort((a, b) => a - b) : pageSizeOptions;
  const paging = totalPages === null ? current.page > 1 || hasNextPage === true : totalPages > 1;
  const smallest = options && options.length > 0 ? Math.min(...options) : undefined;
  const sizing = smallest !== undefined && (totalCount === null ? paging || current.pageSize > smallest : totalCount > smallest);
  const summary = totalCount === null
    ? paging ? messages.paginationPage(current.page) : null
    : messages.paginationRange(totalCount === 0 ? 0 : (current.page - 1) * current.pageSize + 1, Math.min(current.page * current.pageSize, totalCount), totalCount);
  if (summary === null && !paging && !sizing) return null;
  const Back = dir === "rtl" ? IconChevronRight : IconChevronLeft;
  const Forward = dir === "rtl" ? IconChevronLeft : IconChevronRight;
  return <Pagination data-slot="pagination-pattern" {...props} className={cn("flex-row flex-wrap items-center gap-x-(--qy-field-group-gap) gap-y-(--qy-field-gap)", className)} {...(totalPages === 0 ? {} : { page: current.page })} totalPages={totalPages}>
    {summary !== null && <span data-slot="pagination-summary" className="numeric text-support text-muted-foreground">{summary}</span>}
    {/* 行尾是 quiet 图标按钮时抵消它的横向留白，箭头压在行尾（§19：没有形的入口以字形对齐）；行尾是条数选择时它有边，以外缘对齐，不抵消。
     *  窄屏有页码时，页码排独占第二行、铺满并两端对齐，两侧都抵消留白；摘要与条数选择留在第一行。 */}
    {paging && <PaginationList className={cn("ms-auto", !sizing && "-me-[calc((var(--qy-fill-height-narrow)-var(--qy-fill-icon-narrow))/2)] sm:-me-[calc((var(--qy-fill-height)-var(--qy-fill-icon))/2)]", totalPages !== null && "max-sm:order-last max-sm:-mx-[calc((var(--qy-fill-height-narrow)-var(--qy-fill-icon-narrow))/2)] max-sm:basis-[calc(100%+var(--qy-fill-height-narrow)-var(--qy-fill-icon-narrow))] max-sm:justify-between")}>
      <PaginationItem><PaginationPrevious shape="icon" aria-label={messages.previousPage} disabled={disabled || current.page === 1} aria-disabled={busy || undefined} onClick={() => change({ ...current, page: current.page - 1 }, "page")}><Back aria-hidden="true" /></PaginationPrevious></PaginationItem>
      {totalPages !== null && pageWindow(current.page, totalPages, narrow ? 0 : 1).map((entry, index) => <PaginationItem key={entry === "gap" ? `gap-${index}` : entry}>{entry === "gap"
        // 省略号占一个页码格宽，格位与页码同一节拍。
        ? <PaginationEllipsis className="inline-flex min-w-(--qy-fill-height-narrow) justify-center sm:min-w-(--qy-fill-height)" />
        : <PaginationLink page={entry} aria-label={messages.paginationPage(entry)} render={<Button variant="quiet" disabled={disabled} />} aria-disabled={busy || undefined} onClick={() => change({ ...current, page: entry }, "page")}>{entry}</PaginationLink>}</PaginationItem>)}
      <PaginationItem><PaginationNext shape="icon" aria-label={messages.nextPage} disabled={disabled || (totalPages === null ? !hasNextPage : current.page >= totalPages)} aria-disabled={busy || undefined} onClick={() => change({ ...current, page: current.page + 1 }, "page")}><Forward aria-hidden="true" /></PaginationNext></PaginationItem>
    </PaginationList>}
    {sizing && <Select<number> value={current.pageSize} disabled={disabled} readOnly={busy} items={options!.map(option => ({ value: option, label: messages.paginationPageSizeOption(option) }))} onValueChange={pageSize => { if (pageSize !== null) change({ page: 1, pageSize }, "page-size"); }}>
      {/* 可见文字只写「10 条/页」：单位随值写出，读者一眼知道这是什么，不再挂一个与值并列的字段名；
       *  可访问名称仍是「每页条数」，读屏先读名称再读当前值。 */}
      <SelectTrigger aria-label={messages.paginationPageSize} className={cn(!paging ? "ms-auto" : totalPages !== null && "max-sm:ms-auto")}><SelectValue /></SelectTrigger>
      <SelectPopup>{options!.map(option => <SelectItem key={option} value={option}>{messages.paginationPageSizeOption(option)}</SelectItem>)}</SelectPopup>
    </Select>}
  </Pagination>;
}
