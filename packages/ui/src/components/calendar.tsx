"use client";

import * as CalendarPrimitive from "@daypicker/react";
import { enUS, zhCN } from "@daypicker/react/locale";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { buttonVariants } from "./button";

export type CalendarProps = CalendarPrimitive.DayPickerProps & { render?: useRender.ComponentProps<"div">["render"]; ref?: React.Ref<HTMLDivElement> | undefined };
export type CalendarDateRange = CalendarPrimitive.DateRange;
const RootComposition = React.createContext<Pick<CalendarProps, "render" | "ref">>({});
function CalendarRoot({ rootRef, ...props }: CalendarPrimitive.RootProps) {
  const composition = React.useContext(RootComposition);
  const refs = [rootRef, composition.ref].filter((ref): ref is React.Ref<HTMLDivElement> => ref !== undefined);
  return useRender({ defaultTagName: "div", render: composition.render, ref: refs, props: { ...props, "data-slot": "calendar" } });
}
function CalendarChevron(props: CalendarPrimitive.ChevronProps) {
  return <CalendarPrimitive.Chevron {...props} className={cn("fill-current", props.className)} />;
}

/** ISO date-only text from local date fields; never shifts through UTC. */
export function formatLocalDate(date: Date): string {
  if (!Number.isFinite(date.getTime()) || date.getFullYear() < 1 || date.getFullYear() > 9999) throw new RangeError("A valid local calendar date in years 1–9999 is required.");
  return `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function parseLocalDate(text: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(text)) return undefined;
  const [year, month, day] = text.split("-").map(Number) as [number, number, number];
  const date = new Date(0);
  date.setHours(0, 0, 0, 0);
  date.setFullYear(year, month - 1, day);
  return year >= 1 && date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day ? date : undefined;
}

/** Mature date semantics with current control geometry and locally formatted names. */
export function Calendar({ className, classNames, components, style, locale, labels, render, ref, ...props }: CalendarProps) {
  const { code, messages } = useUILocale();
  const nameList = new Intl.ListFormat(code, { type: "conjunction", style: "narrow" });
  const dateName = (date: Date) => new Intl.DateTimeFormat(code, { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(date);
  // 日期格与翻页按钮都是「在网格里选一个日期」的位置：几何跟随填值控件角色层，
  // 大小不表达重要性（用户裁决 2026-10-05）。单元格宽度另由 --qy-calendar-cell 定。
  const dayButton = cn(buttonVariants({ shape: "icon", variant: "quiet" }), "min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) rounded-(--qy-fill-radius) pointer-coarse:min-h-(--qy-touch-target) pointer-coarse:w-(--qy-touch-target) [td[data-selected=true]_&]:bg-primary [td[data-selected=true]_&]:hover:bg-primary-hover [td[data-selected=true]_&]:active:bg-primary-hover [td[data-selected=true]_&]:text-primary-foreground [td[data-selected=true]_&]:[--qy-focus-ring-color:var(--qy-focus-ring-on-solid)] [td[data-today=true]_&]:font-semibold");
  return <RootComposition.Provider value={{ render, ref }}><CalendarPrimitive.DayPicker {...props}
    locale={locale ?? (code.startsWith("zh") ? zhCN : enUS)} navLayout={props.navLayout ?? "after"}
    className={cn("w-fit max-w-full text-foreground", className)}
    style={{ "--qy-calendar-cell": "var(--qy-fill-height)", "--qy-calendar-cell-narrow": "var(--qy-fill-height-narrow)", ...style } as React.CSSProperties}
    classNames={{
      // 月份名与翻页同一行：翻页是对月份名的操作，二者分行时箭头像孤立的工具条。
      months: "flex flex-wrap gap-(--qy-space-6)", month: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-y-(--qy-space-2)", month_caption: "flex min-w-0 items-center ps-(--qy-space-2)", caption_label: "text-body-strong", nav: "flex items-center justify-end",
      button_previous: dayButton, button_next: dayButton, chevron: "shrink-0",
      month_grid: "col-span-2 border-collapse", weekday: "text-support text-muted-foreground text-center", day: "p-0 text-center w-(--qy-calendar-cell-narrow) sm:w-(--qy-calendar-cell) pointer-coarse:w-(--qy-touch-target)", day_button: dayButton,
      outside: "text-muted-foreground", disabled: "opacity-64", hidden: "invisible", // 区间：两端实心，中段连续浅底；两端格子半格浅底，把实心端点接进中段。选中而非区间端点的中段日期不再用实心。
      range_middle: "bg-accent [&>button]:bg-transparent! [&>button]:text-foreground! [&>button:hover]:bg-(--qy-surface-active)!", range_start: "bg-linear-to-r from-transparent from-50% to-accent to-50% rtl:bg-linear-to-l", range_end: "bg-linear-to-l from-transparent from-50% to-accent to-50% rtl:bg-linear-to-r", footer: "text-support text-muted-foreground", ...classNames,
    }}
    components={{ Root: CalendarRoot, Chevron: CalendarChevron, ...components }}
    labels={{
      labelNext: () => messages.nextMonth, labelPrevious: () => messages.previousMonth,
      labelMonthDropdown: () => messages.month, labelYearDropdown: () => messages.year,
      labelDayButton: (date, modifiers) => nameList.format([dateName(date), modifiers.today ? messages.today : "", modifiers.selected ? messages.selectedDate : ""].filter(Boolean)),
      labelGrid: date => new Intl.DateTimeFormat(code, { year: "numeric", month: "long" }).format(date), ...labels,
    }}
  /></RootComposition.Provider>;
}

export { CalendarPrimitive };
