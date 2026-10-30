import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { DateRangePicker, type DateRangeValue } from "../src/components/date-range-picker";
import { Field, FieldDescription, FieldLabel } from "../src/components/field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("unfinished range is draft; Apply submits only a complete named pair, clear removes it", async () => {
  function Example() {
    const [value, setValue] = useState<DateRangeValue | undefined>();
    return <form><Field name="range"><FieldLabel>范围</FieldLabel><DateRangePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9), min: 1 }} /><FieldDescription>当地日期范围</FieldDescription></Field></form>;
  }
  const { container } = render(<UILocaleProvider locale={enUS}><Example /></UILocaleProvider>);
  const form = container.querySelector("form")!;
  await userEvent.click(screen.getByRole("button", { name: "Select date range" }));
  await userEvent.click(await screen.findByRole("button", { name: /October 3, 2026/ }));
  expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  expect(Array.from(new FormData(form).entries())).toEqual([]);
  await userEvent.click(screen.getByRole("button", { name: /October 5, 2026/ }));
  await userEvent.click(screen.getByRole("button", { name: "Apply" }));
  expect(new FormData(form).get("range.from")).toBe("2026-10-03");
  expect(new FormData(form).get("range.to")).toBe("2026-10-05");
  expect(new FormData(form).has("range")).toBe(false);
  const [start, end] = Array.from(container.querySelectorAll<HTMLInputElement>("input[type=date]"));
  expect(start).toHaveAccessibleName("范围 Start date");
  expect(end).toHaveAccessibleName("范围 End date");
  expect(start).toHaveAccessibleDescription("当地日期范围");
  expect(end).toHaveAccessibleDescription("当地日期范围");
  await userEvent.click(screen.getByRole("button", { name: "Select date range" }));
  await userEvent.click(await screen.findByRole("button", { name: "Clear" }));
  expect(Array.from(new FormData(form).entries())).toEqual([]);
});

test("cancel/rejection preserve confirmed endpoints and disabled excludes the complete pair", async () => {
  const change = vi.fn();
  const value = { from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) };
  const { container, rerender } = render(<UILocaleProvider locale={enUS}><form><DateRangePicker name="range" value={value} onValueChange={change} inputProps={{ "aria-label": "Range" }} /></form></UILocaleProvider>);
  const trigger = screen.getByRole("button", { name: "Select date range" });
  await userEvent.click(trigger);
  await userEvent.click(await screen.findByRole("button", { name: /October 9, 2026/ }));
  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(change).not.toHaveBeenCalled();
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(new FormData(container.querySelector("form")!).get("range.from")).toBe("2026-10-03");
  rerender(<form><Field disabled name="range"><DateRangePicker value={value} onValueChange={change} inputProps={{ "aria-label": "Range" }} /></Field></form>);
  expect(screen.getByRole("button", { name: "选择日期范围" })).toBeDisabled();
  expect(Array.from(new FormData(container.querySelector("form")!).entries())).toEqual([]);
});

const endpoints = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLInputElement>("input[type=date]"));

test("typing both endpoints requests a value only when complete and ordered; reversed or half-filled is flagged after leaving, never submitted", async () => {
  const change = vi.fn();
  const invalid = vi.fn();
  const { container } = render(<><DateRangePicker onValueChange={change} onInvalid={invalid} /><button>after</button></>);
  const [start, end] = endpoints(container) as [HTMLInputElement, HTMLInputElement];
  start.focus();
  fireEvent.change(start, { target: { value: "2026-10-10" } });
  expect(change).not.toHaveBeenCalled();
  fireEvent.change(end, { target: { value: "2026-10-05" } });
  expect(change).not.toHaveBeenCalled();
  expect(start).not.toHaveAttribute("aria-invalid");
  await userEvent.click(screen.getByRole("button", { name: "after" }));
  expect(start).toHaveAttribute("aria-invalid", "true");
  expect(end).toHaveAttribute("aria-invalid", "true");
  expect(invalid).toHaveBeenLastCalledWith({ from: new Date(2026, 9, 10), to: new Date(2026, 9, 5) }, "order");
  end.focus();
  fireEvent.change(end, { target: { value: "2026-10-12" } });
  expect(change).toHaveBeenCalledWith({ from: new Date(2026, 9, 10), to: new Date(2026, 9, 12) }, expect.anything());
  expect(start).not.toHaveAttribute("aria-invalid");
});

test("one endpoint alone is incomplete: not submitted, reported once focus has left", async () => {
  const change = vi.fn();
  const invalid = vi.fn();
  const { container } = render(<><DateRangePicker onValueChange={change} onInvalid={invalid} /><button>after</button></>);
  const [start] = endpoints(container) as [HTMLInputElement];
  start.focus();
  fireEvent.change(start, { target: { value: "2026-10-10" } });
  expect(invalid).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button", { name: "after" }));
  expect(invalid).toHaveBeenCalledWith({ from: new Date(2026, 9, 10), to: undefined }, "incomplete");
  expect(change).not.toHaveBeenCalled();
});

test("a typed range the caller rejects goes back to the confirmed range", () => {
  const value = { from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) };
  const { container } = render(<DateRangePicker value={value} onValueChange={() => {}} />);
  const [, end] = endpoints(container) as [HTMLInputElement, HTMLInputElement];
  fireEvent.change(end, { target: { value: "2026-10-09" } });
  expect(end).toHaveValue("2026-10-05");
});

test("the typed endpoints and the calendar share one draft, and defaultValue makes the range uncontrolled", async () => {
  const { container } = render(<UILocaleProvider locale={enUS}><form><DateRangePicker name="r" defaultValue={{ from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) }} calendarProps={{ defaultMonth: new Date(2026, 9) }} /></form></UILocaleProvider>);
  const [start, end] = endpoints(container) as [HTMLInputElement, HTMLInputElement];
  await userEvent.click(screen.getByRole("button", { name: "Select date range" }));
  await userEvent.click(await screen.findByRole("button", { name: /October 8, 2026/ }));
  expect(start).toHaveValue("2026-10-03");
  expect(end).toHaveValue("2026-10-08");
  await userEvent.click(screen.getByRole("button", { name: "Apply" }));
  expect(new FormData(container.querySelector("form")!).get("r.to")).toBe("2026-10-08");
  fireEvent.reset(container.querySelector("form")!);
  await waitFor(() => expect(end).toHaveValue("2026-10-05"));
});

test("presets evaluate when the popup opens, only fill the draft, and the matching one reads as current", async () => {
  const change = vi.fn();
  let today = 10;
  const week = vi.fn(() => ({ from: new Date(2026, 9, today - 6), to: new Date(2026, 9, today) }));
  render(<UILocaleProvider locale={enUS}><DateRangePicker onValueChange={change} presets={[{ label: "Last 7 days", value: week }, { label: "October", value: { from: new Date(2026, 9, 1), to: new Date(2026, 9, 31) } }]} calendarProps={{ defaultMonth: new Date(2026, 9) }} /></UILocaleProvider>);
  expect(week).not.toHaveBeenCalled();
  today = 12;
  await userEvent.click(screen.getByRole("button", { name: "Select date range" }));
  const last7 = await screen.findByRole("button", { name: "Last 7 days" });
  expect(week).toHaveBeenCalled();
  expect(last7).toHaveAttribute("aria-pressed", "false");
  await userEvent.click(last7);
  expect(change).not.toHaveBeenCalled();
  expect(last7).toHaveAttribute("aria-pressed", "true");
  expect(screen.getByRole("button", { name: "October" })).toHaveAttribute("aria-pressed", "false");
  await userEvent.click(screen.getByRole("button", { name: "Apply" }));
  expect(change).toHaveBeenCalledWith({ from: new Date(2026, 9, 6), to: new Date(2026, 9, 12) }, expect.anything());
});

test("cancelling after picking a preset leaves the confirmed range untouched", async () => {
  const value = { from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) };
  const { container } = render(<UILocaleProvider locale={enUS}><DateRangePicker value={value} onValueChange={() => {}} presets={[{ label: "October", value: { from: new Date(2026, 9, 1), to: new Date(2026, 9, 31) } }]} /></UILocaleProvider>);
  await userEvent.click(screen.getByRole("button", { name: "Select date range" }));
  await userEvent.click(await screen.findByRole("button", { name: "October" }));
  expect(endpoints(container)[1]).toHaveValue("2026-10-31");
  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(endpoints(container)[1]).toHaveValue("2026-10-05");
});

test("min and max declared once bound both native endpoints and the calendar", async () => {
  const { container } = render(<UILocaleProvider locale={enUS}><DateRangePicker min={new Date(2026, 9, 5)} max={new Date(2026, 9, 20)} calendarProps={{ defaultMonth: new Date(2026, 9) }} /></UILocaleProvider>);
  for (const input of endpoints(container)) { expect(input).toHaveAttribute("min", "2026-10-05"); expect(input).toHaveAttribute("max", "2026-10-20"); }
  await userEvent.click(screen.getByRole("button", { name: "Select date range" }));
  expect(await screen.findByRole("button", { name: /October 4, 2026/ })).toBeDisabled();
});

test("min / max from both inputs and the top level intersect, and a typed date outside the intersection is a bounds problem", async () => {
  const change = vi.fn();
  const invalid = vi.fn();
  const { container } = render(<><DateRangePicker onValueChange={change} onInvalid={invalid} max={new Date(2026, 9, 25)} inputProps={{ min: "2026-10-03" }} endInputProps={{ min: "2026-10-05", max: "2026-10-28" }} /><button>after</button></>);
  for (const input of endpoints(container)) { expect(input).toHaveAttribute("min", "2026-10-05"); expect(input).toHaveAttribute("max", "2026-10-25"); }
  const [start, end] = endpoints(container) as [HTMLInputElement, HTMLInputElement];
  start.focus();
  fireEvent.change(start, { target: { value: "2026-10-04" } });
  fireEvent.change(end, { target: { value: "2026-10-10" } });
  await userEvent.click(screen.getByRole("button", { name: "after" }));
  expect(change).not.toHaveBeenCalled();
  expect(invalid).toHaveBeenLastCalledWith({ from: new Date(2026, 9, 4), to: new Date(2026, 9, 10) }, "bounds");
});

test("typing obeys the calendar's range rules: interval length and, with excludeDisabled, disabled days in between", async () => {
  const change = vi.fn();
  const invalid = vi.fn();
  const { container } = render(<><DateRangePicker onValueChange={change} onInvalid={invalid} calendarProps={{ min: 2, max: 7, disabled: { dayOfWeek: [0, 6] }, excludeDisabled: true }} /><button>after</button></>);
  const [start, end] = endpoints(container) as [HTMLInputElement, HTMLInputElement];
  start.focus();
  // 周一到周二：只差 1 天，短于 min 2。
  fireEvent.change(start, { target: { value: "2026-10-05" } });
  fireEvent.change(end, { target: { value: "2026-10-06" } });
  await userEvent.click(screen.getByRole("button", { name: "after" }));
  expect(invalid).toHaveBeenLastCalledWith({ from: new Date(2026, 9, 5), to: new Date(2026, 9, 6) }, "length");
  // 周五到下周一：跨过周末。
  start.focus();
  fireEvent.change(start, { target: { value: "2026-10-09" } });
  fireEvent.change(end, { target: { value: "2026-10-12" } });
  await userEvent.click(screen.getByRole("button", { name: "after" }));
  expect(invalid).toHaveBeenLastCalledWith({ from: new Date(2026, 9, 9), to: new Date(2026, 9, 12) }, "disabled");
  expect(change).not.toHaveBeenCalled();
  start.focus();
  fireEvent.change(start, { target: { value: "2026-10-05" } });
  fireEvent.change(end, { target: { value: "2026-10-08" } });
  expect(change).toHaveBeenCalledWith({ from: new Date(2026, 9, 5), to: new Date(2026, 9, 8) }, expect.anything());
});

test("a picker placed outside its form follows the form attribute: both inputs belong to it and its reset restores the range", async () => {
  const { container } = render(<><form id="outer" /><DateRangePicker form="outer" defaultValue={{ from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) }} /></>);
  const [start, end] = endpoints(container) as [HTMLInputElement, HTMLInputElement];
  const form = container.querySelector("form")!;
  expect(start.form).toBe(form);
  expect(end.form).toBe(form);
  fireEvent.change(end, { target: { value: "2026-10-09" } });
  expect(end).toHaveValue("2026-10-09");
  fireEvent.reset(form);
  await waitFor(() => expect(end).toHaveValue("2026-10-05"));
});

test("read-only keeps both endpoints focusable and readable but does not open the calendar", async () => {
  const { container } = render(<DateRangePicker readOnly value={{ from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) }} onValueChange={() => {}} />);
  const [start] = endpoints(container) as [HTMLInputElement];
  expect(start).toHaveAttribute("readonly");
  expect(start).toHaveValue("2026-10-03");
  start.focus();
  await userEvent.keyboard("{Enter}");
  expect(screen.queryByRole("dialog")).toBeNull();
  expect(screen.getByRole("button", { name: "选择日期范围" })).toBeDisabled();
});

test("the clear action removes the confirmed range and returns focus to the start input; read-only says so and has no clear", async () => {
  const change = vi.fn();
  const range = { from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) };
  const { container, rerender } = render(<DateRangePicker defaultValue={range} onValueChange={change} />);
  await userEvent.click(screen.getByRole("button", { name: "清除日期范围" }));
  expect(change).toHaveBeenCalledWith(undefined, expect.anything());
  const [start] = endpoints(container) as [HTMLInputElement];
  expect(start).toHaveValue("");
  expect(start).toHaveFocus();
  expect(screen.queryByRole("button", { name: "清除日期范围" })).not.toBeInTheDocument();
  rerender(<DateRangePicker readOnly value={range} onValueChange={change} />);
  expect(screen.getByText("只读")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "清除日期范围" })).not.toBeInTheDocument();
});
