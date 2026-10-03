import { render, screen } from "@testing-library/react";
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
