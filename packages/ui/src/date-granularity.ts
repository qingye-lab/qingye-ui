import type { Matcher } from "@daypicker/react";
import { addToRange, dateMatchModifiers } from "@daypicker/react";

/**
 * 日期选择的粒度：选的是「一天」还是「一个周期」。
 * 值类型不变，仍是 `Date`——周期用它的**起点**表达；区间的终点是末个周期的**最后一天**。
 */
export type DateGranularity = "day" | "week" | "month" | "quarter" | "year";
export type PeriodGranularity = Exclude<DateGranularity, "day">;

/**
 * 周的两条规则，取自区域：
 * - `firstDay`：每周的第一天，0 = 周日 … 6 = 周六（与 DayPicker 的 `weekStartsOn` 同一编号）；
 * - `minimalDays`：新年的第 1 周至少要有几天落在新年里（1 或 4 最常见）。
 * 周编号规则（同 ICU / CLDR 的 `weekInfo`，`firstDay=1, minimalDays=4` 即 ISO 8601）：
 *   第 1 周 = 含有「1 月 `minimalDays` 日」的那一周；周所属的年（周年）= 周内第 `7 - minimalDays + 1` 天所在的年，
 *   所以 12 月末的一周可以是下一年的第 1 周，1 月初的一周也可以是上一年的第 52 / 53 周。
 */
export type WeekRules = { firstDay: number; minimalDays: number };
/** 区域取不到周信息时的规则：周一起始、第 1 周至少 4 天（ISO 8601）。 */
export const defaultWeekRules: WeekRules = { firstDay: 1, minimalDays: 4 };

const MS_PER_DAY = 86_400_000;

/** 当地日历日（00:00），年份 0–99 也不被 `Date` 构造器改成 19xx；月、日可溢出，按日历进位。 */
export function localDay(year: number, month: number, date: number): Date {
  const result = new Date(0);
  result.setHours(0, 0, 0, 0);
  result.setFullYear(year, month, date);
  return result;
}
const addDays = (date: Date, days: number) => localDay(date.getFullYear(), date.getMonth(), date.getDate() + days);
/** 两个当地日历日相差的整天数，不受夏令时的 23 / 25 小时影响。 */
const daysBetween = (from: Date, to: Date) => Math.round((Date.UTC(to.getFullYear(), to.getMonth(), to.getDate()) - Date.UTC(from.getFullYear(), from.getMonth(), from.getDate())) / MS_PER_DAY);

export function startOfWeek(date: Date, rules: WeekRules): Date {
  return addDays(date, -((date.getDay() - rules.firstDay + 7) % 7));
}
/** 周年与周序号（序号从 1 起）。 */
export function weekOfYear(date: Date, rules: WeekRules): { year: number; week: number } {
  const start = startOfWeek(date, rules);
  const year = addDays(start, 7 - rules.minimalDays).getFullYear();
  return { year, week: Math.round(daysBetween(firstWeekStart(year, rules), start) / 7) + 1 };
}
const firstWeekStart = (year: number, rules: WeekRules) => startOfWeek(localDay(year, 0, rules.minimalDays), rules);
/** 周年 + 序号 → 该周的起点；这一年没有这个序号（如第 53 周不存在）时为 undefined。 */
export function startOfWeekNumber(year: number, week: number, rules: WeekRules): Date | undefined {
  if (!Number.isInteger(week) || week < 1 || week > 53) return undefined;
  const start = addDays(firstWeekStart(year, rules), (week - 1) * 7);
  return weekOfYear(start, rules).year === year ? start : undefined;
}

export function periodStart(date: Date, granularity: DateGranularity, rules: WeekRules): Date {
  switch (granularity) {
    case "week": return startOfWeek(date, rules);
    case "month": return localDay(date.getFullYear(), date.getMonth(), 1);
    case "quarter": return localDay(date.getFullYear(), date.getMonth() - date.getMonth() % 3, 1);
    case "year": return localDay(date.getFullYear(), 0, 1);
    default: return localDay(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
/** 周期的最后一天（当地 00:00）。 */
export function periodEnd(date: Date, granularity: DateGranularity, rules: WeekRules): Date {
  const start = periodStart(date, granularity, rules);
  switch (granularity) {
    case "week": return addDays(start, 6);
    case "month": return localDay(start.getFullYear(), start.getMonth() + 1, 0);
    case "quarter": return localDay(start.getFullYear(), start.getMonth() + 3, 0);
    case "year": return localDay(start.getFullYear(), 11, 31);
    default: return start;
  }
}
/** 平移若干个周期，结果仍是周期起点。 */
export function addPeriods(date: Date, granularity: DateGranularity, count: number, rules: WeekRules): Date {
  const start = periodStart(date, granularity, rules);
  switch (granularity) {
    case "week": return addDays(start, 7 * count);
    case "month": return localDay(start.getFullYear(), start.getMonth() + count, 1);
    case "quarter": return localDay(start.getFullYear(), start.getMonth() + 3 * count, 1);
    case "year": return localDay(start.getFullYear() + count, 0, 1);
    default: return addDays(start, count);
  }
}

const isoDay = (date: Date) => `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
/** 周期起点的 ISO 日文本；同一周期的任何日期得到同一个键，固定宽度故可直接按字典序比较。 */
export const periodKey = (date: Date, granularity: DateGranularity, rules: WeekRules) => isoDay(periodStart(date, granularity, rules));
export const isSamePeriod = (a: Date | undefined, b: Date | undefined, granularity: DateGranularity, rules: WeekRules) => (!a && !b) || Boolean(a && b && periodKey(a, granularity, rules) === periodKey(b, granularity, rules));

/** 一个周期与 [min, max] 是否有交集（min / max 为空即不设限）；日粒度退化为「这一天在不在范围内」。 */
export function periodWithinBounds(date: Date, granularity: DateGranularity, rules: WeekRules, min: Date | undefined, max: Date | undefined): boolean {
  const first = isoDay(periodStart(date, granularity, rules)), last = isoDay(periodEnd(date, granularity, rules));
  return (!min || last >= isoDay(min)) && (!max || first <= isoDay(max));
}
/** 周期内每一天都被禁用才算整个周期不可选；有一天可选就能选（选中的仍是整个周期）。逐日判断，遇到第一个可选日即停。 */
export function periodFullyDisabled(date: Date, granularity: DateGranularity, rules: WeekRules, disabled: Matcher | Matcher[] | undefined): boolean {
  if (!disabled) return false;
  const last = periodEnd(date, granularity, rules);
  for (let day = periodStart(date, granularity, rules); day <= last; day = addDays(day, 1)) if (!dateMatchModifiers(day, disabled)) return false;
  return true;
}

// ---- 选择：点一个周期得到新的值 -------------------------------------------------------------------
/** 周期区间：`from` 是首个周期的起点，`to` 是末个周期的最后一天。 */
export type PeriodRange = { from: Date; to: Date };
/** 把区间还原成「首末周期的起点」，供 `addToRange` 在周期层面做与按天相同的区间规则。 */
const rangeStarts = (range: { from?: Date | undefined; to?: Date | undefined } | undefined, granularity: DateGranularity, rules: WeekRules) =>
  range?.from ? { from: periodStart(range.from, granularity, rules), to: periodStart(range.to ?? range.from, granularity, rules) } : undefined;

/**
 * 单选：点已选的那一个周期是取消（`required` 时保持），点别的周期就选它；结果是周期起点。
 * 区间：沿用 DayPicker 按天选区间的规则（`addToRange`，不设长度限制），只是把「天」换成「周期」——
 * 第一次点选得到只含这一个周期的区间，再点另一个周期把它扩成区间，点区间两端或内部按同一套规则收缩 / 延伸。
 */
export function selectPeriod(mode: "single", target: Date, granularity: DateGranularity, rules: WeekRules, current: Date | undefined, required: boolean): Date | undefined;
export function selectPeriod(mode: "range", target: Date, granularity: DateGranularity, rules: WeekRules, current: { from?: Date | undefined; to?: Date | undefined } | undefined, required: boolean): PeriodRange | undefined;
export function selectPeriod(mode: "single" | "range", target: Date, granularity: DateGranularity, rules: WeekRules, current: Date | { from?: Date | undefined; to?: Date | undefined } | undefined, required: boolean): Date | PeriodRange | undefined {
  const start = periodStart(target, granularity, rules);
  if (mode === "single") return current instanceof Date && isSamePeriod(current, start, granularity, rules) && !required ? undefined : start;
  const next = addToRange(start, rangeStarts(current instanceof Date ? undefined : current, granularity, rules), 0, 0, required);
  return next?.from ? { from: periodStart(next.from, granularity, rules), to: periodEnd(next.to ?? next.from, granularity, rules) } : undefined;
}

// ---- 文本：格式字符串走区域，输入与显示用同一份 -------------------------------------------------
/** 区域给出的四条周期格式，占位符为 `{year}` `{week}` `{month}` `{quarter}`（数字，不含补零），例如「{year} 年第 {week} 周」。 */
export type PeriodFormats = { periodWeek: string; periodMonth: string; periodQuarter: string; periodYear: string };
const templateOf = (granularity: PeriodGranularity, formats: PeriodFormats) => ({ week: formats.periodWeek, month: formats.periodMonth, quarter: formats.periodQuarter, year: formats.periodYear })[granularity];
const yearText = (year: number) => String(year).padStart(4, "0");

/** 周期的文本。周用周年与周序号，月 / 季 / 年用日期本身的字段。 */
export function formatPeriod(date: Date, granularity: PeriodGranularity, rules: WeekRules, formats: PeriodFormats): string {
  const week = granularity === "week" ? weekOfYear(date, rules) : undefined;
  const fields: Record<string, string> = {
    year: yearText(week ? week.year : date.getFullYear()), week: String(week?.week ?? ""), month: String(date.getMonth() + 1), quarter: String(Math.floor(date.getMonth() / 3) + 1),
  };
  return templateOf(granularity, formats).replace(/\{(year|week|month|quarter)\}/g, (_, key: string) => fields[key]!);
}

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** 由格式字符串反推出匹配它的正则：字面部分里的空白宽松匹配（有无、多少都行），数字字段按位数收窄。 */
function patternOf(template: string): { regex: RegExp; fields: string[] } {
  const fields: string[] = [];
  const source = template.split(/(\{year\}|\{week\}|\{month\}|\{quarter\})/).map(part => {
    const field = /^\{(year|week|month|quarter)\}$/.exec(part)?.[1];
    if (field) { fields.push(field); return field === "year" ? "(\\d{4})" : "(\\d{1,2})"; }
    return escapeRegExp(part).replace(/\s+/g, "\\s*");
  }).join("");
  return { regex: new RegExp(`^\\s*${source}\\s*$`, "i"), fields };
}
// 区域格式之外一律接受的 ISO 写法，让键入「2026-W44」「2026-11」「2026-Q4」「2026」也能被理解。
const isoForms: Record<PeriodGranularity, { regex: RegExp; fields: string[] }> = {
  week: { regex: /^\s*(\d{4})\s*-?\s*W\s*(\d{1,2})\s*$/i, fields: ["year", "week"] },
  month: { regex: /^\s*(\d{4})\s*[-/.]\s*(\d{1,2})\s*$/, fields: ["year", "month"] },
  quarter: { regex: /^\s*(\d{4})\s*-?\s*Q\s*([1-4])\s*$/i, fields: ["year", "quarter"] },
  year: { regex: /^\s*(\d{4})\s*$/, fields: ["year"] },
};

/** 文本 → 周期起点；不符合格式、年份不在 1–9999、月 / 季 / 周序号越界都是 undefined。全角数字按半角读。 */
export function parsePeriod(text: string, granularity: PeriodGranularity, rules: WeekRules, formats: PeriodFormats): Date | undefined {
  const normalized = text.normalize("NFKC");
  for (const { regex, fields } of [patternOf(templateOf(granularity, formats)), isoForms[granularity]]) {
    const match = regex.exec(normalized);
    if (!match) continue;
    const values = Object.fromEntries(fields.map((field, index) => [field, Number(match[index + 1])])) as Record<string, number>;
    const year = values.year!;
    if (year < 1 || year > 9999) return undefined;
    if (granularity === "year") return localDay(year, 0, 1);
    if (granularity === "quarter") return values.quarter! >= 1 && values.quarter! <= 4 ? localDay(year, (values.quarter! - 1) * 3, 1) : undefined;
    if (granularity === "month") return values.month! >= 1 && values.month! <= 12 ? localDay(year, values.month! - 1, 1) : undefined;
    return startOfWeekNumber(year, values.week!, rules);
  }
  return undefined;
}
