import { expect, test } from "vitest";
import { weekRulesFor } from "../src/components/calendar";
import { addPeriods, defaultWeekRules, formatPeriod, parsePeriod, periodEnd, periodStart, selectPeriod, weekOfYear } from "../src/date-granularity";
import { zhCN } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const iso = defaultWeekRules;
const ymd = (date: Date | undefined) => date && `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

test("periods normalize to their first day and end on their last day", () => {
  const day = new Date(2026, 10, 4, 15, 30);
  expect(ymd(periodStart(day, "week", iso))).toBe("2026-11-02");
  expect(ymd(periodEnd(day, "week", iso))).toBe("2026-11-08");
  expect(ymd(periodStart(day, "month", iso))).toBe("2026-11-01");
  expect(ymd(periodEnd(day, "month", iso))).toBe("2026-11-30");
  expect(ymd(periodStart(day, "quarter", iso))).toBe("2026-10-01");
  expect(ymd(periodEnd(day, "quarter", iso))).toBe("2026-12-31");
  expect(ymd(periodStart(day, "year", iso))).toBe("2026-01-01");
  expect(ymd(periodEnd(day, "year", iso))).toBe("2026-12-31");
  expect(ymd(periodEnd(new Date(2028, 1, 10), "month", iso))).toBe("2028-02-29");
  expect(periodStart(day, "month", iso).getHours()).toBe(0);
});

test("the week start comes from the rules and the numbering follows the minimal-days rule", () => {
  const sunday = { firstDay: 0, minimalDays: 1 };
  expect(ymd(periodStart(new Date(2026, 10, 4), "week", sunday))).toBe("2026-11-01");
  // ISO：2026-10-26 起的一周是第 44 周；2027-01-01（周五）仍属 2026 年的第 53 周。
  expect(weekOfYear(new Date(2026, 10, 1), iso)).toEqual({ year: 2026, week: 44 });
  expect(weekOfYear(new Date(2027, 0, 1), iso)).toEqual({ year: 2026, week: 53 });
  expect(weekOfYear(new Date(2025, 11, 29), iso)).toEqual({ year: 2026, week: 1 });
  // 周日起、含 1 月 1 日的那周是第 1 周：2027-01-01 所在周是 2027 年第 1 周。
  expect(weekOfYear(new Date(2027, 0, 1), sunday)).toEqual({ year: 2027, week: 1 });
});

test("weekRulesFor prefers explicit props, then the locale, then the Monday/4 default", () => {
  expect(weekRulesFor("zh-CN", { weekStartsOn: 3, firstWeekContainsDate: 1 })).toEqual({ firstDay: 3, minimalDays: 1 });
  expect(weekRulesFor("en-US").firstDay).toBe(0);
  expect(weekRulesFor("not a locale!")).toEqual(defaultWeekRules);
});

test("addPeriods moves by whole periods", () => {
  expect(ymd(addPeriods(new Date(2026, 0, 31), "month", 1, iso))).toBe("2026-02-01");
  expect(ymd(addPeriods(new Date(2026, 10, 1), "quarter", 1, iso))).toBe("2027-01-01");
  expect(ymd(addPeriods(new Date(2026, 10, 2), "week", -1, iso))).toBe("2026-10-26");
  expect(ymd(addPeriods(new Date(2026, 5, 1), "year", 12, iso))).toBe("2038-01-01");
});

test("format and parse round-trip in each locale, and accept the ISO spellings", () => {
  for (const [name, messages] of [["zh", zhCN.messages], ["en", enUS.messages]] as const) {
    for (const granularity of ["week", "month", "quarter", "year"] as const) {
      const date = periodStart(new Date(2026, 10, 4), granularity, iso);
      const text = formatPeriod(date, granularity, iso, messages);
      expect(ymd(parsePeriod(text, granularity, iso, messages)), `${name} ${granularity} ${text}`).toBe(ymd(date));
    }
  }
  expect(formatPeriod(new Date(2026, 10, 4), "week", iso, zhCN.messages)).toBe("2026 年第 45 周");
  expect(formatPeriod(new Date(2026, 10, 4), "month", iso, zhCN.messages)).toBe("2026 年 11 月");
  expect(formatPeriod(new Date(2026, 10, 4), "quarter", iso, zhCN.messages)).toBe("2026 年第 4 季度");
  expect(formatPeriod(new Date(2027, 0, 1), "week", iso, zhCN.messages)).toBe("2026 年第 53 周");
  expect(ymd(parsePeriod("2026-W44", "week", iso, zhCN.messages))).toBe("2026-10-26");
  expect(ymd(parsePeriod("2026-11", "month", iso, zhCN.messages))).toBe("2026-11-01");
  expect(ymd(parsePeriod("2026-Q4", "quarter", iso, zhCN.messages))).toBe("2026-10-01");
  expect(ymd(parsePeriod("２０２６年第３季度", "quarter", iso, zhCN.messages))).toBe("2026-07-01");
  expect(ymd(parsePeriod("2026年11月", "month", iso, zhCN.messages))).toBe("2026-11-01");
});

test("parse rejects out-of-range fields and unreadable text", () => {
  expect(parsePeriod("2026 年 13 月", "month", iso, zhCN.messages)).toBeUndefined();
  expect(parsePeriod("2026 年第 5 季度", "quarter", iso, zhCN.messages)).toBeUndefined();
  expect(parsePeriod("2026 年第 54 周", "week", iso, zhCN.messages)).toBeUndefined();
  expect(parsePeriod("2025 年第 53 周", "week", iso, zhCN.messages)).toBeUndefined();
  expect(parsePeriod("下个月", "month", iso, zhCN.messages)).toBeUndefined();
  expect(parsePeriod("", "year", iso, zhCN.messages)).toBeUndefined();
});

test("selectPeriod gives period starts for single and first-start / last-end for range", () => {
  expect(ymd(selectPeriod("single", new Date(2026, 10, 18), "month", iso, undefined, false))).toBe("2026-11-01");
  expect(selectPeriod("single", new Date(2026, 10, 18), "month", iso, new Date(2026, 10, 1), false)).toBeUndefined();
  expect(ymd(selectPeriod("single", new Date(2026, 10, 18), "month", iso, new Date(2026, 10, 1), true))).toBe("2026-11-01");
  const first = selectPeriod("range", new Date(2026, 1, 14), "month", iso, undefined, false)!;
  expect([ymd(first.from), ymd(first.to)]).toEqual(["2026-02-01", "2026-02-28"]);
  const both = selectPeriod("range", new Date(2026, 3, 9), "month", iso, first, false)!;
  expect([ymd(both.from), ymd(both.to)]).toEqual(["2026-02-01", "2026-04-30"]);
  const weeks = selectPeriod("range", new Date(2026, 10, 12), "week", iso, { from: new Date(2026, 10, 2), to: new Date(2026, 10, 8) }, false)!;
  expect([ymd(weeks.from), ymd(weeks.to)]).toEqual(["2026-11-02", "2026-11-15"]);
});
