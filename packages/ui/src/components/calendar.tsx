"use client";

import * as CalendarPrimitive from "@daypicker/react";
import { enUS, zhCN } from "@daypicker/react/locale";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { buttonVariants } from "./button";
import { NativeSelect } from "./native-select";

export type CalendarProps = CalendarPrimitive.DayPickerProps & { render?: useRender.ComponentProps<"div">["render"]; ref?: React.Ref<HTMLDivElement> | undefined };
export type CalendarDateRange = CalendarPrimitive.DateRange;
const RootComposition = React.createContext<Pick<CalendarProps, "render" | "ref">>({});
function CalendarRoot({ rootRef, ...props }: CalendarPrimitive.RootProps) {
  const composition = React.useContext(RootComposition);
  const refs = [rootRef, composition.ref].filter((ref): ref is React.Ref<HTMLDivElement> => ref !== undefined);
  return useRender({ defaultTagName: "div", render: composition.render, ref: refs, props: { ...props, "data-slot": "calendar" } });
}
function CalendarChevron(props: CalendarPrimitive.ChevronProps) {
  // 翻页箭头在 DayPicker 里写死为 left / right，不随 dir 翻转；从右向左时「上个月」在右侧，箭头应指向右（镜像）。
  return <CalendarPrimitive.Chevron {...props} className={cn("fill-current rtl:-scale-x-100", props.className)} />;
}
// 年月下拉是「在一组有限的值里选一个」的填值控件：直接用 NativeSelect，几何、边界、焦点与它一致，
// 平台选择器与读屏语义原样保留（2026-10-12）。DayPicker 原有的「透明 select 叠一个假标签」不再需要。
function CalendarDropdown({ options, className, ...selectProps }: CalendarPrimitive.DropdownProps) {
  return <NativeSelect {...selectProps} className={className}>{options?.map(option => <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}</NativeSelect>;
}

type WeekInfoLocale = Intl.Locale & { getWeekInfo?: () => { firstDay?: number; minimalDays?: number }; weekInfo?: { firstDay?: number; minimalDays?: number } };
/**
 * 区域推出的日历事实（2026-10-12）。中文与美式英文保持原来的 DayPicker 区域对象，显示不变；
 * 其余区域的月名、星期名、数字用平台 `Intl` 按区域代码格式化，周起始日取 `Intl.Locale` 的周信息——
 * 不引入 date-fns 的全部区域（体积）。平台没有周信息时退回 DayPicker 默认的周日起始。
 * 星期名取 short，超过 4 个字符（阿拉伯语等 short 即全称）改取 narrow：单元格宽度固定，名称随语言取最长能放下的写法（**预设**）。
 */
export function calendarLocaleFor(code: string): { locale: CalendarProps["locale"]; formatters?: CalendarProps["formatters"]; weekStartsOn?: CalendarProps["weekStartsOn"]; firstWeekContainsDate?: 1 | 4 } {
  const normalized = code.toLowerCase();
  if (normalized.startsWith("zh")) return { locale: zhCN };
  if (normalized === "en" || normalized === "en-us") return { locale: enUS };
  try {
    const info = new Intl.Locale(code) as WeekInfoLocale;
    const week = typeof info.getWeekInfo === "function" ? info.getWeekInfo() : info.weekInfo;
    const timeZone = (...sources: Array<{ timeZone?: string | undefined } | undefined>) => sources.find(source => source?.timeZone)?.timeZone;
    const formatter = (options: Intl.DateTimeFormatOptions) => (zone?: string) => new Intl.DateTimeFormat(code, zone ? { ...options, timeZone: zone } : options);
    const monthYear = formatter({ month: "long", year: "numeric" }), monthName = formatter({ month: "long" }), yearName = formatter({ year: "numeric" });
    const weekdayShort = formatter({ weekday: "short" }), weekdayNarrow = formatter({ weekday: "narrow" });
    const digits = new Intl.NumberFormat(code);
    return {
      locale: { ...enUS, code },
      ...(week?.firstDay ? { weekStartsOn: (week.firstDay % 7) as 0 | 1 | 2 | 3 | 4 | 5 | 6 } : {}),
      ...(week?.minimalDays === 1 || week?.minimalDays === 4 ? { firstWeekContainsDate: week.minimalDays } : {}),
      formatters: {
        formatCaption: (month, options, dateLib) => monthYear(timeZone(dateLib?.options, options)).format(month),
        formatMonthDropdown: (month, dateLib) => monthName(timeZone(dateLib?.options)).format(month),
        // 年份选项只要年数本身；日语等语言把年字并进数字，取 year 片段。
        formatYearDropdown: (year, dateLib) => yearName(timeZone(dateLib?.options)).formatToParts(year).find(part => part.type === "year")?.value ?? String(year.getFullYear()),
        formatWeekdayName: (weekday, options, dateLib) => {
          const zone = timeZone(dateLib?.options, options);
          const short = weekdayShort(zone).format(weekday);
          return [...short].length <= 4 ? short : weekdayNarrow(zone).format(weekday);
        },
        formatDay: date => digits.format(date.getDate()),
      },
    };
  } catch {
    return { locale: enUS };
  }
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

/**
 * 切换月份的那一组按钮：DayPicker 默认渲染成 <nav> 地标，每个日历、每个日期弹层都会往页面的地标列表里加一项无从区分的「导航栏」；
 * 它不是站点导航，是这个日历里的一组控件，所以渲染成有名称的 group（div）——nav 元素上不允许改写成 group。
 * 按钮、禁用与点击的处理与 DayPicker 自带的 Nav 相同：读同一份 components、classNames、styles、labels（名称是 labelNav，可由调用方覆写）。
 */
function CalendarNav({ onPreviousClick, onNextClick, previousMonth, nextMonth, ...props }: React.ComponentProps<typeof CalendarPrimitive.Nav>) {
  // 名称读 DayPicker 的 labelNav：Calendar 默认给它「切换月份」，调用方在 labels 里覆写时以调用方为准。
  const { components, classNames, styles, labels: { labelPrevious, labelNext, labelNav } } = CalendarPrimitive.useDayPicker();
  const UI = CalendarPrimitive.UI;
  const chevron = styles?.[UI.Chevron];
  const chevronStyle = chevron ? { style: chevron } : {};
  return <div {...(props as React.ComponentProps<"div">)} role="group" aria-label={labelNav()}>
    <components.PreviousMonthButton type="button" className={classNames[UI.PreviousMonthButton]} style={styles?.[UI.PreviousMonthButton]} tabIndex={previousMonth ? undefined : -1} aria-disabled={previousMonth ? undefined : true} aria-label={labelPrevious(previousMonth)} onClick={event => { if (previousMonth) onPreviousClick?.(event); }}>
      <components.Chevron {...(previousMonth ? {} : { disabled: true })} {...chevronStyle} className={classNames[UI.Chevron]} orientation="left" />
    </components.PreviousMonthButton>
    <components.NextMonthButton type="button" className={classNames[UI.NextMonthButton]} style={styles?.[UI.NextMonthButton]} tabIndex={nextMonth ? undefined : -1} aria-disabled={nextMonth ? undefined : true} aria-label={labelNext(nextMonth)} onClick={event => { if (nextMonth) onNextClick?.(event); }}>
      <components.Chevron {...(nextMonth ? {} : { disabled: true })} {...chevronStyle} className={classNames[UI.Chevron]} orientation="right" />
    </components.NextMonthButton>
  </div>;
}

/** Mature date semantics with current control geometry and locally formatted names. */
export function Calendar({ className, classNames, components, style, locale, formatters, labels, render, ref, ...props }: CalendarProps) {
  const { code, messages, ...resolved } = useUILocale() as ReturnType<typeof useUILocale> & { dir?: string };
  // 调用方显式给出 locale 时，名称与周起始日都归它；否则按 UILocale 的区域代码推出。
  const derived = React.useMemo(() => locale ? undefined : calendarLocaleFor(code), [locale, code]);
  // DayPicker 只认 `dir` 属性来翻转翻页箭头，不读 DOM：调用方显式给出的优先，其次 UILocale 的方向，
  // 最后是祖先元素实际生效的方向（页面上写了 dir="rtl" 就跟随）。
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [inheritedDir, setInheritedDir] = React.useState<"rtl" | undefined>();
  React.useLayoutEffect(() => {
    const node = rootRef.current;
    if (node && props.dir === undefined && resolved.dir !== "rtl") setInheritedDir(node.ownerDocument.defaultView?.getComputedStyle(node).direction === "rtl" ? "rtl" : undefined);
  }, [props.dir, resolved.dir]);
  const setRootRef = React.useCallback((node: HTMLDivElement | null) => {
    rootRef.current = node;
    if (typeof ref === "function") return ref(node);
    if (ref) ref.current = node;
  }, [ref]);
  const dir = props.dir ?? (resolved.dir === "rtl" ? "rtl" : inheritedDir);
  const nameList = new Intl.ListFormat(code, { type: "conjunction", style: "narrow" });
  const dateName = (date: Date) => new Intl.DateTimeFormat(code, { year: "numeric", month: "long", day: "numeric", weekday: "long" }).format(date);
  // 日期格与翻页按钮都是「在网格里选一个日期」的位置：几何跟随填值控件角色层，
  // 大小不表达重要性（用户裁决 2026-10-05）。单元格宽度另由 --qy-calendar-cell 定。
  const dayButton = cn(buttonVariants({ shape: "icon", variant: "quiet" }), "min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height) rounded-(--qy-fill-radius) pointer-coarse:min-h-(--qy-touch-target) pointer-coarse:w-(--qy-touch-target) [td[data-selected=true]_&]:bg-primary [td[data-selected=true]_&]:hover:bg-primary-hover [td[data-selected=true]_&]:active:bg-primary-hover [td[data-selected=true]_&]:text-primary-foreground [td[data-selected=true]_&]:[--qy-focus-ring-color:var(--qy-focus-ring-on-solid)] [td[data-today=true]_&]:font-semibold");
  return <RootComposition.Provider value={{ render, ref: setRootRef }}><CalendarPrimitive.DayPicker {...props}
    locale={locale ?? derived!.locale} navLayout={props.navLayout ?? "after"}
    {...(derived?.weekStartsOn !== undefined && props.weekStartsOn === undefined ? { weekStartsOn: derived.weekStartsOn } : {})}
    {...(derived?.firstWeekContainsDate !== undefined && props.firstWeekContainsDate === undefined ? { firstWeekContainsDate: derived.firstWeekContainsDate } : {})}
    {...(dir ? { dir } : {})}
    formatters={{ ...derived?.formatters, ...formatters }}
    className={cn("w-fit max-w-full text-foreground", className)}
    style={{ "--qy-calendar-cell": "var(--qy-fill-height)", "--qy-calendar-cell-narrow": "var(--qy-fill-height-narrow)", ...style } as React.CSSProperties}
    classNames={{
      // 月份名与翻页同一行：翻页是对月份名的操作，二者分行时箭头像孤立的工具条。
      months: "flex flex-wrap gap-(--qy-space-6)", month: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-y-(--qy-space-2)", month_caption: "flex min-w-0 items-center ps-(--qy-space-2) has-data-[slot=native-select]:ps-0", caption_label: "text-body-strong", dropdowns: "flex items-center gap-(--qy-space-2)", nav: "flex items-center justify-end",
      button_previous: dayButton, button_next: dayButton, chevron: "shrink-0",
      month_grid: "col-span-2 border-collapse", weekday: "text-support text-muted-foreground text-center", day: "p-0 text-center w-(--qy-calendar-cell-narrow) sm:w-(--qy-calendar-cell) pointer-coarse:w-(--qy-touch-target)", day_button: dayButton,
      outside: "text-muted-foreground", disabled: "opacity-disabled", hidden: "invisible", // 区间：两端实心，中段连续浅底；两端格子半格浅底，把实心端点接进中段。选中而非区间端点的中段日期不再用实心。
      range_middle: "bg-surface-selected [&>button]:bg-transparent! [&>button]:text-foreground! [&>button:hover]:bg-(--qy-surface-hover)!", range_start: "bg-linear-to-r from-transparent from-50% to-surface-selected to-50% rtl:bg-linear-to-l", range_end: "bg-linear-to-l from-transparent from-50% to-surface-selected to-50% rtl:bg-linear-to-r", footer: "text-support text-muted-foreground", ...classNames,
    }}
    components={{ Root: CalendarRoot, Chevron: CalendarChevron, Dropdown: CalendarDropdown, Nav: CalendarNav, ...components }}
    labels={{
      labelNext: () => messages.nextMonth, labelPrevious: () => messages.previousMonth, labelNav: () => messages.monthNavigation,
      labelMonthDropdown: () => messages.month, labelYearDropdown: () => messages.year,
      labelDayButton: (date, modifiers) => nameList.format([dateName(date), modifiers.today ? messages.today : "", modifiers.selected ? messages.selectedDate : ""].filter(Boolean)),
      labelGrid: date => new Intl.DateTimeFormat(code, { year: "numeric", month: "long" }).format(date),
      labelWeekday: date => new Intl.DateTimeFormat(code, { weekday: "long" }).format(date), ...labels,
    }}
  /></RootComposition.Provider>;
}

export { CalendarPrimitive };
