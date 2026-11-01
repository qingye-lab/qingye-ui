import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { DateTimeRangePicker, type DateTimeRangeValue } from "../src/components/date-time-range-picker";
import { Field, FieldDescription, FieldLabel } from "../src/components/field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const endpoints = (container: HTMLElement) => Array.from(container.querySelectorAll<HTMLInputElement>("input[type=datetime-local]")) as [HTMLInputElement, HTMLInputElement];
const startTime = () => screen.getByLabelText("Start time") as HTMLInputElement;
const endTime = () => screen.getByLabelText("End time") as HTMLInputElement;

test("popover: pick a date range and two times; Apply submits only a complete named pair, clear removes it", async () => {
  function Example() {
    const [value, setValue] = useState<DateTimeRangeValue | undefined>();
    return <form><Field name="slot"><FieldLabel>时段</FieldLabel><DateTimeRangePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9) }} /><FieldDescription>当地时间</FieldDescription></Field></form>;
  }
  const { container } = render(<UILocaleProvider locale={enUS}><Example /></UILocaleProvider>);
  const form = container.querySelector("form")!;
  await userEvent.click(screen.getByRole("button", { name: "Select date and time range" }));
  await userEvent.click(await screen.findByRole("button", { name: /October 3, 2026/ }));
  await userEvent.click(screen.getByRole("button", { name: /October 5, 2026/ }));
  // 日期选完、时刻还空着：不能应用。
  expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  fireEvent.change(startTime(), { target: { value: "09:30" } });
  fireEvent.change(endTime(), { target: { value: "17:00" } });
  expect(screen.getByRole("button", { name: "Apply" })).toBeEnabled();
  expect(Array.from(new FormData(form).entries())).toEqual([]);
  await userEvent.click(screen.getByRole("button", { name: "Apply" }));
  expect(new FormData(form).get("slot.from")).toBe("2026-10-03T09:30");
  expect(new FormData(form).get("slot.to")).toBe("2026-10-05T17:00");
  expect(new FormData(form).has("slot")).toBe(false);
  const [start, end] = endpoints(container);
  expect(start).toHaveAccessibleName("时段 Start date and time");
  expect(end).toHaveAccessibleName("时段 End date and time");
  expect(start).toHaveAccessibleDescription("当地时间");
  expect(end).toHaveAccessibleDescription("当地时间");
  expect(start.value).toBe("2026-10-03T09:30");
  expect(end.value).toBe("2026-10-05T17:00");
  await userEvent.click(screen.getByRole("button", { name: "Select date and time range" }));
  await userEvent.click(await screen.findByRole("button", { name: "Clear" }));
  expect(Array.from(new FormData(form).entries())).toEqual([]);
});

test("popover: the same day with the end time before the start time is flagged in the popover and cannot be applied; equal times can", async () => {
  const change = vi.fn();
  render(<UILocaleProvider locale={enUS}><DateTimeRangePicker onValueChange={change} inputProps={{ "aria-label": "Slot" }} calendarProps={{ defaultMonth: new Date(2026, 9) }} /></UILocaleProvider>);
  await userEvent.click(screen.getByRole("button", { name: "Select date and time range" }));
  const day = await screen.findByRole("button", { name: /October 3, 2026/ });
  // 只点一天：起点已定、终点未选，按同一天处理（零长度的日期范围）。
  await userEvent.click(day);
  fireEvent.change(startTime(), { target: { value: "18:00" } });
  fireEvent.change(endTime(), { target: { value: "09:00" } });
  expect(screen.getByRole("alert")).toHaveTextContent("End is before start");
  expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  fireEvent.change(endTime(), { target: { value: "18:00" } });
  expect(screen.queryByRole("alert")).toBeNull();
  await userEvent.click(screen.getByRole("button", { name: "Apply" }));
  expect(change).toHaveBeenCalledWith({ from: "2026-10-03T18:00", to: "2026-10-03T18:00" }, expect.anything());
});

test("cancel and Escape keep the confirmed range; disabled excludes the complete pair", async () => {
  const change = vi.fn();
  const value = { from: "2026-10-03T09:00", to: "2026-10-05T17:00" };
  const { container, rerender } = render(<UILocaleProvider locale={enUS}><form><DateTimeRangePicker name="slot" value={value} onValueChange={change} inputProps={{ "aria-label": "Slot" }} /></form></UILocaleProvider>);
  const trigger = screen.getByRole("button", { name: "Select date and time range" });
  await userEvent.click(trigger);
  await userEvent.click(await screen.findByRole("button", { name: /October 9, 2026/ }));
  await userEvent.click(screen.getByRole("button", { name: "Cancel" }));
  expect(change).not.toHaveBeenCalled();
  await waitFor(() => expect(trigger).toHaveFocus());
  await userEvent.click(trigger);
  await screen.findByRole("button", { name: "Apply" });
  await userEvent.keyboard("{Escape}");
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("slot.from")).toBe("2026-10-03T09:00");
  rerender(<form><Field disabled name="slot"><DateTimeRangePicker value={value} onValueChange={change} inputProps={{ "aria-label": "Slot" }} /></Field></form>);
  expect(screen.getByRole("button", { name: "选择日期时间范围" })).toBeDisabled();
  expect(Array.from(new FormData(container.querySelector("form")!).entries())).toEqual([]);
});

test("typing both ends requests a value only when complete and ordered; reversed is flagged after leaving and blocks submission", async () => {
  const change = vi.fn();
  const invalid = vi.fn();
  const { container } = render(<UILocaleProvider locale={enUS}><form><DateTimeRangePicker onValueChange={change} onInvalid={invalid} /></form><button>after</button></UILocaleProvider>);
  const [start, end] = endpoints(container);
  start.focus();
  fireEvent.change(start, { target: { value: "2026-10-10T10:00" } });
  expect(change).not.toHaveBeenCalled();
  fireEvent.change(end, { target: { value: "2026-10-10T08:00" } });
  expect(change).not.toHaveBeenCalled();
  expect(start).not.toHaveAttribute("aria-invalid");
  await userEvent.click(screen.getByRole("button", { name: "after" }));
  expect(start).toHaveAttribute("aria-invalid", "true");
  expect(end).toHaveAttribute("aria-invalid", "true");
  expect(invalid).toHaveBeenLastCalledWith({ from: "2026-10-10T10:00", to: "2026-10-10T08:00" }, "order");
  expect(start.validationMessage).toBe("End is before start");
  expect(container.querySelector("form")!.checkValidity()).toBe(false);
  end.focus();
  fireEvent.change(end, { target: { value: "2026-10-11T08:00" } });
  expect(change).toHaveBeenCalledWith({ from: "2026-10-10T10:00", to: "2026-10-11T08:00" }, expect.anything());
  expect(start).not.toHaveAttribute("aria-invalid");
  expect(start.validationMessage).toBe("");
});

test("one end alone is incomplete: not submitted, reported once focus has left", async () => {
  const change = vi.fn();
  const invalid = vi.fn();
  const { container } = render(<><DateTimeRangePicker onValueChange={change} onInvalid={invalid} /><button>after</button></>);
  const [start] = endpoints(container);
  start.focus();
  fireEvent.change(start, { target: { value: "2026-10-10T10:00" } });
  expect(invalid).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button", { name: "after" }));
  expect(change).not.toHaveBeenCalled();
  expect(invalid).toHaveBeenLastCalledWith({ from: "2026-10-10T10:00", to: undefined }, "incomplete");
});

test("min and max constrain both inputs, the calendar days and the time inputs on the boundary day; typed out-of-bounds is not requested", async () => {
  const change = vi.fn();
  const invalid = vi.fn();
  const { container } = render(<UILocaleProvider locale={enUS}><><DateTimeRangePicker min="2026-10-05T09:00" max="2026-10-07T18:00" onValueChange={change} onInvalid={invalid} inputProps={{ "aria-label": "Slot" }} calendarProps={{ defaultMonth: new Date(2026, 9) }} /><button>after</button></></UILocaleProvider>);
  const [start, end] = endpoints(container);
  expect(start).toHaveAttribute("min", "2026-10-05T09:00");
  expect(end).toHaveAttribute("max", "2026-10-07T18:00");
  start.focus();
  fireEvent.change(start, { target: { value: "2026-10-05T08:00" } });
  fireEvent.change(end, { target: { value: "2026-10-06T10:00" } });
  expect(change).not.toHaveBeenCalled();
  await userEvent.click(screen.getByRole("button", { name: "after" }));
  expect(invalid).toHaveBeenLastCalledWith({ from: "2026-10-05T08:00", to: "2026-10-06T10:00" }, "bounds");
  await userEvent.click(screen.getByRole("button", { name: "Select date and time range" }));
  expect(await screen.findByRole("button", { name: /October 4, 2026/ })).toBeDisabled();
  expect(screen.getByRole("button", { name: /October 8, 2026/ })).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: /October 5, 2026/ }));
  await userEvent.click(screen.getByRole("button", { name: /October 7, 2026/ }));
  expect(startTime()).toHaveAttribute("min", "09:00");
  expect(endTime()).toHaveAttribute("max", "18:00");
});

test("an unordered or zoned value throws", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
  expect(() => render(<DateTimeRangePicker value={{ from: "2026-10-05T10:00", to: "2026-10-05T09:00" }} />)).toThrow(RangeError);
  expect(() => render(<DateTimeRangePicker value={{ from: "2026-10-05T10:00Z", to: "2026-10-06T09:00" }} />)).toThrow(RangeError);
  error.mockRestore();
});

test("uncontrolled: defaultValue shows in both inputs and a native reset returns to it", async () => {
  const { container } = render(<form><DateTimeRangePicker name="slot" defaultValue={{ from: "2026-10-03T09:00", to: "2026-10-05T17:00" }} inputProps={{ "aria-label": "Slot" }} /><button type="reset">reset</button></form>);
  const [start, end] = endpoints(container);
  expect(start.value).toBe("2026-10-03T09:00");
  start.focus();
  fireEvent.change(start, { target: { value: "" } });
  end.focus();
  fireEvent.change(end, { target: { value: "" } });
  await waitFor(() => expect(new FormData(container.querySelector("form")!).has("slot.from")).toBe(false));
  await userEvent.click(screen.getByRole("button", { name: "reset" }));
  await waitFor(() => expect(new FormData(container.querySelector("form")!).get("slot.from")).toBe("2026-10-03T09:00"));
  expect(end.value).toBe("2026-10-05T17:00");
});

test("keyboard: the popover opens from the trigger, the calendar takes focus, Tab reaches the times and actions in order", async () => {
  render(<UILocaleProvider locale={enUS}><DateTimeRangePicker inputProps={{ "aria-label": "Slot" }} calendarProps={{ defaultMonth: new Date(2026, 9) }} /></UILocaleProvider>);
  const trigger = screen.getByRole("button", { name: "Select date and time range" });
  trigger.focus();
  await userEvent.keyboard("{Enter}");
  const apply = await screen.findByRole("button", { name: "Apply" });
  await waitFor(() => expect(document.activeElement?.closest("[role=grid]")).not.toBeNull());
  // 日历里用键盘选一个区间：Enter 选起点，向右移动，再 Enter 选终点。
  await userEvent.keyboard("{Enter}{ArrowRight}{Enter}");
  startTime().focus();
  await userEvent.keyboard("0930");
  expect(startTime().value).not.toBe("");
  endTime().focus();
  await userEvent.keyboard("1000");
  await waitFor(() => expect(apply).toBeEnabled());
  apply.focus();
  await userEvent.keyboard("{Enter}");
  await waitFor(() => expect(screen.queryByRole("button", { name: "Apply" })).toBeNull());
  expect(endpoints(document.body)[0].value).toMatch(/T09:30$/);
});

test("read-only keeps values and hides the entry points to change them", () => {
  const { container } = render(<UILocaleProvider locale={enUS}><form><DateTimeRangePicker name="slot" readOnly value={{ from: "2026-10-03T09:00", to: "2026-10-05T17:00" }} inputProps={{ "aria-label": "Slot" }} /></form></UILocaleProvider>);
  expect(screen.getByRole("button", { name: "Select date and time range" })).toBeDisabled();
  expect(screen.queryByRole("button", { name: "Clear date and time range" })).toBeNull();
  expect(new FormData(container.querySelector("form")!).get("slot.to")).toBe("2026-10-05T17:00");
});
