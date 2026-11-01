import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Calendar, formatLocalDate, parseLocalDate } from "../src/components/calendar";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("local date text roundtrips without UTC shift and rejects impossible dates", () => {
  const date = new Date(2026, 9, 3, 23, 45);
  expect(formatLocalDate(date)).toBe("2026-10-03");
  const parsed = parseLocalDate("2026-10-03")!;
  expect(parsed.getFullYear()).toBe(2026);
  expect(parsed.getMonth()).toBe(9);
  expect(parsed.getDate()).toBe(3);
  expect(parseLocalDate("2026-02-30")).toBeUndefined();
  expect(() => formatLocalDate(new Date(NaN))).toThrow("valid local");
});

test("mature calendar selects, navigates months and moves real keyboard focus with ref/render", async () => {
  const ref = createRef<HTMLDivElement>();
  function Example() {
    const [selected, setSelected] = useState<Date | undefined>(new Date(2026, 9, 3));
    return <Calendar mode="single" selected={selected} onSelect={setSelected} defaultMonth={new Date(2026, 9)} ref={ref} render={<div data-custom="yes" />} />;
  }
  render(<UILocaleProvider locale={enUS}><Example /></UILocaleProvider>);
  expect(ref.current).toHaveAttribute("data-custom", "yes");
  const day = screen.getByRole("button", { name: /October 3, 2026/ });
  day.focus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: /October 4, 2026/ })).toHaveFocus();
  await userEvent.keyboard("{Enter}");
  expect(screen.getByRole("button", { name: /October 4, 2026/ })).toHaveAccessibleName(/Selected/);
  await userEvent.click(screen.getByRole("button", { name: "Next month" }));
  expect(screen.getByRole("button", { name: /November 4, 2026/ })).toBeInTheDocument();
});

test("disabled dates cannot become the selected value", async () => {
  const selected = vi.fn();
  render(<UILocaleProvider locale={enUS}><Calendar mode="single" defaultMonth={new Date(2026, 9)} disabled={new Date(2026, 9, 3)} onSelect={selected} /></UILocaleProvider>);
  const day = screen.getByRole("button", { name: /October 3, 2026/ });
  expect(day).toBeDisabled();
  await userEvent.click(day);
  expect(selected).not.toHaveBeenCalled();
});

const weekdays = () => Array.from(document.querySelectorAll("th")).map(cell => cell.textContent);
const caption = (code: string) => render(<UILocaleProvider locale={{ code, messages: enUS.messages }}><Calendar mode="single" defaultMonth={new Date(2026, 9)} /></UILocaleProvider>);

test("months and weekdays follow the locale code, with the week starting where the locale says", () => {
  caption("de-DE");
  expect(screen.getByRole("status")).toHaveTextContent("Oktober 2026");
  expect(weekdays()).toEqual(["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]);
});

test("ja-JP names the month in Japanese and keeps the locale's Sunday start", () => {
  caption("ja-JP");
  expect(screen.getByRole("status")).toHaveTextContent("2026年10月");
  expect(weekdays()[0]).toBe("日");
});

test("zh-CN and en-US keep their DayPicker locales (en-US starts on Sunday, zh-CN on Monday)", () => {
  const { unmount } = caption("en-US");
  expect(weekdays()[0]).toBe("Su");
  unmount();
  caption("zh-CN");
  expect(weekdays()[0]).toBe("一");
});

test("a caller-provided locale wins over the one derived from the UI locale", () => {
  render(<UILocaleProvider locale={{ code: "de-DE", messages: enUS.messages }}><Calendar mode="single" defaultMonth={new Date(2026, 9)} locale={{ code: "en-US" }} weekStartsOn={0} /></UILocaleProvider>);
  expect(weekdays()[0]).toBe("Su");
});

test("month switching is a named group, not a navigation landmark, and a consumer's labelNav wins", () => {
  const { unmount } = render(<Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} />);
  expect(screen.getByRole("group", { name: "切换月份" })).toBeInTheDocument();
  expect(screen.queryByRole("navigation")).toBeNull();
  unmount();
  render(<Calendar mode="single" defaultMonth={new Date(2026, 9, 1)} labels={{ labelNav: () => "换月" }} />);
  expect(screen.getByRole("group", { name: "换月" })).toBeInTheDocument();
});

test("month granularity is a grid of months: single value is the month start, keyboard moves cell by cell and pages by year", async () => {
  const onSelect = vi.fn();
  function Example() {
    const [value, setValue] = useState<Date | undefined>();
    return <Calendar granularity="month" mode="single" defaultMonth={new Date(2026, 10, 15)} selected={value} onSelect={next => { onSelect(next); setValue(next); }} />;
  }
  render(<UILocaleProvider locale={enUS}><Example /></UILocaleProvider>);
  const grid = screen.getByRole("grid");
  expect(grid).not.toHaveAttribute("aria-multiselectable");
  expect(screen.getAllByRole("gridcell")).toHaveLength(12);
  await userEvent.click(screen.getByRole("button", { name: "November 2026" }));
  const picked = onSelect.mock.calls[0]![0] as Date;
  expect([picked.getFullYear(), picked.getMonth(), picked.getDate()]).toEqual([2026, 10, 1]);
  const cell = screen.getByRole("button", { name: "November 2026, Selected" }).closest("td")!;
  expect(cell).toHaveAttribute("aria-selected", "true");
  expect(screen.getAllByRole("gridcell").filter(item => item.getAttribute("aria-selected") === "true")).toHaveLength(1);
  // 方向键按格移动，行首行尾 Home / End，Page 键翻一整年。
  screen.getByRole("button", { name: "November 2026, Selected" }).focus();
  await userEvent.keyboard("{ArrowLeft}");
  expect(screen.getByRole("button", { name: "October 2026" })).toHaveFocus();
  await userEvent.keyboard("{End}");
  expect(screen.getByRole("button", { name: "December 2026" })).toHaveFocus();
  await userEvent.keyboard("{ArrowUp}");
  expect(screen.getByRole("button", { name: "September 2026" })).toHaveFocus();
  await userEvent.keyboard("{Home}");
  expect(screen.getByRole("button", { name: "July 2026" })).toHaveFocus();
  await userEvent.keyboard("{End}{ArrowDown}");
  expect(screen.getByRole("button", { name: "December 2026" })).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: "January 2027" })).toHaveFocus();
  await userEvent.keyboard("{PageUp}");
  expect(screen.getByRole("button", { name: "January 2026" })).toHaveFocus();
  await userEvent.click(screen.getByRole("button", { name: "Next year" }));
  expect(screen.getByRole("button", { name: "January 2027" })).toBeInTheDocument();
});

test("quarter and year granularity select the first day; the year grid pages twelve years", async () => {
  const onQuarter = vi.fn(), onYear = vi.fn();
  const { unmount } = render(<UILocaleProvider locale={enUS}><Calendar granularity="quarter" mode="single" defaultMonth={new Date(2026, 10)} onSelect={onQuarter} /></UILocaleProvider>);
  expect(screen.getAllByRole("gridcell")).toHaveLength(4);
  await userEvent.click(screen.getByRole("button", { name: "Q4 2026" }));
  const quarter = onQuarter.mock.calls[0]![0] as Date;
  expect([quarter.getFullYear(), quarter.getMonth(), quarter.getDate()]).toEqual([2026, 9, 1]);
  unmount();
  render(<UILocaleProvider locale={enUS}><Calendar granularity="year" mode="single" defaultMonth={new Date(2026, 0)} onSelect={onYear} /></UILocaleProvider>);
  expect(screen.getAllByRole("gridcell")).toHaveLength(12);
  await userEvent.click(screen.getByRole("button", { name: "2024" }));
  const year = onYear.mock.calls[0]![0] as Date;
  expect([year.getFullYear(), year.getMonth(), year.getDate()]).toEqual([2024, 0, 1]);
  await userEvent.click(screen.getByRole("button", { name: "Next years" }));
  expect(screen.queryByRole("button", { name: "2024" })).not.toBeInTheDocument();
  expect(screen.getAllByRole("gridcell")).toHaveLength(12);
  expect(screen.getByRole("button", { name: "2028" })).toBeInTheDocument();
});

test("range granularity returns the first period start and the last day of the last period; a controlled range shows as selected cells", async () => {
  const onSelect = vi.fn();
  render(<UILocaleProvider locale={enUS}><Calendar granularity="month" mode="range" defaultMonth={new Date(2026, 0)} onSelect={onSelect} /></UILocaleProvider>);
  expect(screen.getByRole("grid")).toHaveAttribute("aria-multiselectable", "true");
  await userEvent.click(screen.getByRole("button", { name: "February 2026" }));
  const first = onSelect.mock.calls[0]![0] as { from: Date; to: Date };
  expect([first.from.getMonth(), first.from.getDate(), first.to.getMonth(), first.to.getDate()]).toEqual([1, 1, 1, 28]);
  // 没传 selected 时是非受控：选中的格自己记住。
  expect(screen.getAllByRole("gridcell").filter(item => item.getAttribute("aria-selected") === "true")).toHaveLength(1);
  cleanup();
  const range = { from: new Date(2026, 1, 1), to: new Date(2026, 3, 30) };
  render(<UILocaleProvider locale={enUS}><Calendar granularity="month" mode="range" defaultMonth={new Date(2026, 0)} selected={range} /></UILocaleProvider>);
  expect(screen.getAllByRole("gridcell").filter(item => item.getAttribute("aria-selected") === "true")).toHaveLength(3);
});

test("disabled and out-of-range periods stay focusable but cannot be chosen", async () => {
  const onSelect = vi.fn();
  render(<UILocaleProvider locale={enUS}><Calendar granularity="month" mode="single" defaultMonth={new Date(2026, 5)} startMonth={new Date(2026, 2)} endMonth={new Date(2026, 8)} disabled={{ before: new Date(2026, 4, 1) }} onSelect={onSelect} /></UILocaleProvider>);
  const march = screen.getByRole("button", { name: "March 2026" });
  expect(march).toHaveAttribute("aria-disabled", "true");
  await userEvent.click(march);
  await userEvent.click(screen.getByRole("button", { name: "January 2026" }));
  expect(onSelect).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button", { name: "May 2026" }));
  expect(onSelect).toHaveBeenCalledTimes(1);
});

test("week granularity selects the whole row; the start day follows the locale unless the caller sets it, and the name carries the week number", async () => {
  const onSelect = vi.fn();
  const { unmount } = render(<UILocaleProvider locale={enUS}><Calendar granularity="week" mode="single" defaultMonth={new Date(2026, 10)} onSelect={onSelect} /></UILocaleProvider>);
  expect(screen.getByRole("grid")).not.toHaveAttribute("aria-multiselectable");
  await userEvent.click(screen.getByRole("button", { name: /November 4, 2026/ }));
  const [value, trigger] = onSelect.mock.calls[0]!;
  // en-US 的周从周日起。
  expect([(value as Date).getMonth(), (value as Date).getDate()]).toEqual([10, 1]);
  expect([(trigger as Date).getMonth(), (trigger as Date).getDate()]).toEqual([10, 1]);
  expect(screen.getAllByRole("gridcell").filter(item => item.getAttribute("aria-selected") === "true")).toHaveLength(7);
  unmount();
  render(<UILocaleProvider locale={enUS}><Calendar granularity="week" mode="single" weekStartsOn={1} firstWeekContainsDate={4} defaultMonth={new Date(2026, 10)} selected={new Date(2026, 10, 2)} onSelect={onSelect} /></UILocaleProvider>);
  expect(screen.getAllByRole("gridcell").filter(item => item.getAttribute("aria-selected") === "true")).toHaveLength(7);
  expect(screen.getByRole("button", { name: /November 4, 2026.*Week 45, 2026.*Selected/ })).toBeInTheDocument();
});

test("week granularity is controlled by the value, normalizes it to a whole week, and keeps day-grid keyboard navigation", async () => {
  function Example() {
    const [value, setValue] = useState<Date | undefined>(new Date(2026, 10, 12));
    return <Calendar granularity="week" mode="single" required weekStartsOn={0} defaultMonth={new Date(2026, 10)} selected={value} onSelect={setValue} />;
  }
  render(<UILocaleProvider locale={enUS}><Example /></UILocaleProvider>);
  // 受控值不在周起点上，也整周显示为选中：11/8–11/14。
  expect(screen.getAllByRole("gridcell").filter(item => item.getAttribute("aria-selected") === "true")).toHaveLength(7);
  expect(screen.getByRole("button", { name: /November 8, 2026/ }).closest("td")).toHaveAttribute("aria-selected", "true");
  await userEvent.click(screen.getByRole("button", { name: /November 18, 2026/ }));
  expect(screen.getByRole("button", { name: /November 15, 2026/ }).closest("td")).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("button", { name: /November 8, 2026/ }).closest("td")).not.toHaveAttribute("aria-selected");
  await userEvent.keyboard("{ArrowRight}");
  expect(screen.getByRole("button", { name: /November 19, 2026/ })).toHaveFocus();
});

test("week range extends from the first week start to the last week end", async () => {
  const onSelect = vi.fn();
  render(<UILocaleProvider locale={enUS}><Calendar granularity="week" mode="range" weekStartsOn={1} defaultMonth={new Date(2026, 10)} selected={{ from: new Date(2026, 10, 2), to: new Date(2026, 10, 8) }} onSelect={onSelect} /></UILocaleProvider>);
  await userEvent.click(screen.getByRole("button", { name: /November 18, 2026/ }));
  const range = onSelect.mock.calls[0]![0] as { from: Date; to: Date };
  expect([range.from.getDate(), range.to.getDate()]).toEqual([2, 22]);
});

test("non-day granularity refuses multiple selection instead of quietly changing it", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  for (const granularity of ["week", "month"] as const) expect(() => render(<Calendar granularity={granularity} mode="multiple" />)).toThrow('supports mode="single" or mode="range" only');
  vi.restoreAllMocks();
});
