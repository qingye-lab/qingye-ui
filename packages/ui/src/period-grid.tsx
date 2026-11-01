"use client";

import { useRender } from "@base-ui/react/use-render";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import type { Matcher } from "@daypicker/react";
import * as React from "react";
import { addPeriods, formatPeriod, isSamePeriod, localDay, periodFullyDisabled, periodKey, periodWithinBounds, selectPeriod, type PeriodGranularity, type PeriodRange, type WeekRules } from "./date-granularity";
import { useUILocale } from "./locale";
import { buttonVariants } from "./components/button";
import { cn } from "./utils";

/**
 * 月 / 季 / 年的选择网格。日历在这三种粒度下选的不是「一天」而是「一格」，所以不再画星期与日期，
 * 换成 3×4（月、年）或 2×2（季）的格子；其余——标题、翻页、选中与区间的画法、焦点环——与按天的网格是同一套。
 *
 * 语义与键盘（WAI-ARIA 的 grid 模式）：
 * - `table[role=grid]` > `tr` > `td[role=gridcell]`，选中的格 `aria-selected`，区间时网格 `aria-multiselectable`；
 *   格内是一个 `button`，整个网格只有一个 Tab 停靠点（roving tabindex），Tab 进入后用方向键移动；
 * - 左右 ±1 格（从右向左时对调），上下 ±一行，Home / End 到行首 / 行尾，PageUp / PageDown 翻一页
 *   （月、季：一年；年：12 年），移出本页的焦点会带着页一起翻；
 * - 被禁用的格 `aria-disabled` 但仍可聚焦（方向键不跳格，读屏仍能读到它），激活无效。
 */
export type PeriodGridClasses = { nav: string; cell: string; solid: string; today: string; rangeMiddle: string; rangeStart: string; rangeEnd: string };
export type PeriodGridProps = {
  granularity: Exclude<PeriodGranularity, "week">;
  mode: "single" | "range";
  required?: boolean | undefined;
  selected: Date | { from?: Date | undefined; to?: Date | undefined } | undefined;
  onSelect?: ((value: Date | PeriodRange | undefined, trigger: Date, event: React.SyntheticEvent) => void) | undefined;
  disabled?: Matcher | Matcher[] | undefined;
  startMonth?: Date | undefined; endMonth?: Date | undefined;
  month?: Date | undefined; defaultMonth?: Date | undefined; onMonthChange?: ((month: Date) => void) | undefined;
  autoFocus?: boolean | undefined;
  dir?: string | undefined;
  rules: WeekRules;
  classes: PeriodGridClasses;
  className?: string | undefined; style?: React.CSSProperties | undefined;
  render?: useRender.ComponentProps<"div">["render"] | undefined;
  ref?: React.Ref<HTMLDivElement> | undefined;
};

// 每页的格数与列数。年一页 12 年、月一页 12 个月，都排成 3 列；季只有 4 格，排成 2×2。
// 这是排版预设（3 列 × 4 行与按天网格的 7 列等宽，高度随格数），不是由别的关系推出的。
const layout = { month: { perPage: 12, cols: 3 }, quarter: { perPage: 4, cols: 2 }, year: { perPage: 12, cols: 3 } } as const;

export function PeriodGrid({ granularity, mode, required = false, selected, onSelect, disabled, startMonth, endMonth, month: monthProp, defaultMonth, onMonthChange, autoFocus, dir, rules, classes, className, style, render, ref }: PeriodGridProps) {
  const { code, messages } = useUILocale();
  const { perPage, cols } = layout[granularity];
  const range = mode === "range" && !(selected instanceof Date) ? selected : undefined;
  const single = mode === "single" && selected instanceof Date ? selected : undefined;
  const selectedFrom = single ?? range?.from;
  const [viewState, setViewState] = React.useState<Date>(() => defaultMonth ?? selectedFrom ?? new Date());
  const view = monthProp ?? viewState;
  const goto = (date: Date) => { setViewState(date); onMonthChange?.(date); };
  const pageFirst = localDay(Math.max(1, granularity === "year" ? Math.floor(view.getFullYear() / 12) * 12 : view.getFullYear()), 0, 1);
  const items = Array.from({ length: perPage }, (_, index) => addPeriods(pageFirst, granularity, index, rules));
  // 翻页的单位恒为「年」：月、季网格一页就是一年；年网格一页 12 年，所以一次翻 12 年。
  const step = granularity === "year" ? 12 : 1;
  const prevPage = addPeriods(pageFirst, "year", -step, rules), nextPage = addPeriods(pageFirst, "year", step, rules);
  const hasPrev = !startMonth || periodWithinBounds(addPeriods(pageFirst, granularity, -1, rules), granularity, rules, startMonth, undefined);
  const hasNext = !endMonth || periodWithinBounds(addPeriods(pageFirst, granularity, perPage, rules), granularity, rules, undefined, endMonth);

  const now = new Date();
  const [focused, setFocused] = React.useState<Date | undefined>();
  const keyOf = (date: Date) => periodKey(date, granularity, rules);
  const tabStop = [focused, selectedFrom, now].map(date => date && items.find(item => keyOf(item) === keyOf(date))).find(Boolean) ?? items[0]!;
  const gridRef = React.useRef<HTMLTableElement | null>(null);
  const focusAfter = React.useRef(false);
  const focusButton = (date: Date) => gridRef.current?.querySelector<HTMLButtonElement>(`[data-period="${keyOf(date)}"]`)?.focus();
  React.useEffect(() => { if (autoFocus) focusButton(tabStop); }, []); // 只在挂载时：弹层打开把焦点交进网格
  React.useEffect(() => {
    if (!focusAfter.current || !focused) return;
    focusAfter.current = false;
    focusButton(focused);
  });

  const inGrid = (date: Date) => periodWithinBounds(date, granularity, rules, startMonth, endMonth);
  const isDisabled = (date: Date) => !inGrid(date) || periodFullyDisabled(date, granularity, rules, disabled);
  const activate = (date: Date, event: React.SyntheticEvent) => {
    if (isDisabled(date)) return;
    onSelect?.(mode === "single" ? selectPeriod("single", date, granularity, rules, single, required) : selectPeriod("range", date, granularity, rules, range, required), date, event);
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
    const current = (event.target as HTMLElement).closest<HTMLElement>("[data-period]")?.dataset.period;
    const index = items.findIndex(item => keyOf(item) === current);
    if (index < 0 || event.altKey || event.ctrlKey || event.metaKey) return;
    const rtl = (dir ?? getComputedStyle(event.currentTarget).direction) === "rtl";
    const delta = ({ ArrowLeft: rtl ? 1 : -1, ArrowRight: rtl ? -1 : 1, ArrowUp: -cols, ArrowDown: cols, PageUp: -perPage, PageDown: perPage, Home: -(index % cols), End: cols - 1 - (index % cols) } as Record<string, number>)[event.key];
    if (delta === undefined) return;
    event.preventDefault();
    const next = addPeriods(items[index]!, granularity, delta, rules);
    if (!inGrid(next)) return;
    focusAfter.current = true;
    setFocused(next);
    if (!items.some(item => keyOf(item) === keyOf(next))) goto(next);
  };

  const yearFormat = new Intl.DateTimeFormat(code, { year: "numeric" });
  const yearName = (year: number) => yearFormat.format(localDay(year, 0, 1));
  const lastItem = items[perPage - 1]!;
  const caption = granularity === "year" ? `${yearName(pageFirst.getFullYear())} – ${yearName(lastItem.getFullYear())}` : yearName(pageFirst.getFullYear());
  const nameList = new Intl.ListFormat(code, { type: "conjunction", style: "narrow" });
  const selectLabel = { month: messages.selectMonth, quarter: messages.selectQuarter, year: messages.selectYear }[granularity];
  const monthShort = new Intl.DateTimeFormat(code, { month: "short" }), monthLong = new Intl.DateTimeFormat(code, { year: "numeric", month: "long" });
  const visibleText = (date: Date) => granularity === "month" ? monthShort.format(date) : granularity === "quarter" ? messages.quarterName.replace("{quarter}", String(Math.floor(date.getMonth() / 3) + 1)) : yearName(date.getFullYear());
  const periodName = (date: Date) => granularity === "month" ? monthLong.format(date) : granularity === "quarter" ? formatPeriod(date, "quarter", rules, messages) : yearName(date.getFullYear());
  const fromKey = selectedFrom && keyOf(selectedFrom), toKey = range?.from ? keyOf(range.to ?? range.from) : single && keyOf(single);
  const [previousLabel, nextLabel] = granularity === "year" ? [messages.previousYears, messages.nextYears] : [messages.previousYear, messages.nextYear];
  const Previous = IconChevronLeft, Next = IconChevronRight;

  return useRender({ defaultTagName: "div", render, ref, props: {
    className, style, dir, "data-slot": "calendar", "data-granularity": granularity,
    children: <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-y-(--qy-space-2)">
      <div role="status" aria-live="polite" className="flex min-w-0 items-center ps-(--qy-space-2) text-body-strong">{caption}</div>
      <div role="group" aria-label={messages.yearNavigation} className="flex items-center justify-end">
        <button type="button" className={classes.nav} tabIndex={hasPrev ? undefined : -1} aria-disabled={hasPrev ? undefined : true} aria-label={previousLabel} onClick={() => { if (hasPrev) goto(prevPage); }}><Previous aria-hidden="true" className="rtl:-scale-x-100" /></button>
        <button type="button" className={classes.nav} tabIndex={hasNext ? undefined : -1} aria-disabled={hasNext ? undefined : true} aria-label={nextLabel} onClick={() => { if (hasNext) goto(nextPage); }}><Next aria-hidden="true" className="rtl:-scale-x-100" /></button>
      </div>
      {/* 宽度与按天网格的 7 列等宽，这样同一个弹层里换粒度时日历不变宽变窄；行间留白用 border-spacing，区间的浅底才不会被行间缝隙切断。 */}
      <table ref={gridRef} role="grid" aria-multiselectable={mode === "range" ? true : undefined} aria-label={nameList.format([selectLabel, caption])} onKeyDown={onKeyDown}
        className="col-span-2 w-[calc(7*var(--qy-calendar-cell-narrow))] table-fixed border-separate border-spacing-x-0 border-spacing-y-(--qy-space-1) sm:w-[calc(7*var(--qy-calendar-cell))] pointer-coarse:w-[calc(7*var(--qy-touch-target))]">
        <tbody>
          {Array.from({ length: perPage / cols }, (_, row) => <tr key={row}>
            {items.slice(row * cols, row * cols + cols).map(date => {
              const key = keyOf(date);
              const isSelected = single ? key === fromKey : Boolean(range?.from && fromKey && toKey && key >= fromKey && key <= toKey);
              const start = isSelected && key === fromKey, end = isSelected && key === toKey;
              const off = isDisabled(date);
              const current = isSamePeriod(date, now, granularity, rules);
              return <td key={key} role="gridcell" aria-selected={isSelected || undefined} data-selected={isSelected || undefined} data-today={current || undefined} data-disabled={off || undefined}
                className={cn("p-0 text-center", isSelected && !start && !end && classes.rangeMiddle, isSelected && start && !end && classes.rangeStart, isSelected && end && !start && classes.rangeEnd)}>
                <button type="button" data-period={key} aria-disabled={off || undefined} aria-current={current ? "date" : undefined} aria-label={nameList.format([periodName(date), isSelected ? messages.selectedDate : ""].filter(Boolean))}
                  tabIndex={keyOf(tabStop) === key ? 0 : -1} className={cn(classes.cell, off && "opacity-disabled")}
                  onFocus={() => setFocused(date)} onClick={event => activate(date, event)}>{visibleText(date)}</button>
              </td>;
            })}
          </tr>)}
        </tbody>
      </table>
    </div>,
  } });
}

/** 与按天网格同一套按钮外观，宽度改为铺满格子。 */
export const periodCellClass = (solid: string, today: string) => cn(buttonVariants({ shape: "icon", variant: "quiet" }), "w-full min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) pointer-coarse:min-h-(--qy-touch-target) rounded-(--qy-fill-radius)", solid, today);
