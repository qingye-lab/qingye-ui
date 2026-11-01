import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { DatePicker } from "../src/components/date-picker";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("native editing and calendar selection share the controlled local date and Field/FormData", async () => {
  const ref = createRef<HTMLInputElement>();
  function Example() {
    const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
    return <form><Field name="date" invalid><FieldLabel>日期</FieldLabel><DatePicker value={value} onValueChange={setValue} inputProps={{ ref, render: <input data-custom="yes" /> }} /><FieldDescription>当地日期</FieldDescription><FieldError>待核对</FieldError></Field></form>;
  }
  const { container } = render(<UILocaleProvider locale={enUS}><Example /></UILocaleProvider>);
  const input = screen.getByLabelText("日期") as HTMLInputElement;
  expect(ref.current).toBe(input);
  expect(input).toHaveAccessibleDescription("当地日期 待核对");
  expect(input).toHaveAttribute("aria-invalid", "true");
  fireEvent.change(input, { target: { value: "2026-10-04" } });
  expect(new FormData(container.querySelector("form")!).get("date")).toBe("2026-10-04");
  const trigger = screen.getByRole("button", { name: "Select date" });
  await userEvent.click(trigger);
  await userEvent.click(await screen.findByRole("button", { name: /October 5, 2026/ }));
  expect(input).toHaveValue("2026-10-05");
  await waitFor(() => expect(trigger).toHaveFocus());
  await userEvent.click(screen.getByRole("button", { name: "Clear date" }));
  expect(input).toHaveValue("");
});

test.each(["readOnly", "disabled", "fieldDisabled"])("%s blocks edits and calendar actions with truthful form participation", async state => {
  const change = vi.fn();
  const { container } = render(<form><Field disabled={state === "fieldDisabled"} name="date"><FieldLabel>日期</FieldLabel><DatePicker value={new Date(2026, 9, 3)} onValueChange={change} disabled={state === "disabled"} readOnly={state === "readOnly"} /></Field></form>);
  expect(screen.getByRole("button", { name: "选择日期" })).toBeDisabled();
  fireEvent.change(screen.getByLabelText("日期"), { target: { value: "2026-10-04" } });
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("date")).toBe(state === "readOnly" ? "2026-10-03" : null);
});

test("caller rejection/cancellation keeps the accepted value; Escape returns focus", async () => {
  const change = vi.fn();
  render(<UILocaleProvider locale={enUS}><DatePicker value={new Date(2026, 9, 3)} onValueChange={change} inputProps={{ "aria-label": "Date", onChange: event => event.preventBaseUIHandler() }} /></UILocaleProvider>);
  fireEvent.change(screen.getByLabelText("Date"), { target: { value: "2026-10-04" } });
  expect(change).not.toHaveBeenCalled();
  const trigger = screen.getByRole("button", { name: "Select date" });
  await userEvent.click(trigger);
  await screen.findByRole("button", { name: /October 3, 2026/ });
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(trigger).toHaveFocus());
  expect(screen.getByLabelText("Date")).toHaveValue("2026-10-03");
});

// Chrome 的 date 输入在分段只填一半、或年份超过 4 位时 value 为空串，但 validity.badInput 为真；jsdom 不模拟它，这里按 Chrome 的事实设定。
const typePartial = (input: HTMLInputElement) => {
  Object.defineProperty(input, "validity", { configurable: true, get: () => ({ badInput: true }) });
  fireEvent.change(input, { target: { value: "" } });
};

test("a half-typed or over-long entry is not a clear: the accepted date stays, and only emptying every segment clears", () => {
  const change = vi.fn();
  render(<DatePicker value={new Date(2026, 9, 3)} onValueChange={change} inputProps={{ "aria-label": "Date" }} />);
  const input = screen.getByLabelText("Date") as HTMLInputElement;
  typePartial(input);
  expect(change).not.toHaveBeenCalled();
  // 逐段删完时值一直是空串、不再有 input 事件：离开输入时所有分段都空才是清除。
  Object.defineProperty(input, "validity", { configurable: true, get: () => ({ badInput: false }) });
  fireEvent.blur(input);
  expect(change).toHaveBeenCalledWith(undefined, expect.anything());
});

test("a five-digit year is held as typing, not handed to the caller", () => {
  const change = vi.fn();
  render(<DatePicker value={new Date(2026, 9, 3)} onValueChange={change} inputProps={{ "aria-label": "Date" }} />);
  const input = screen.getByLabelText("Date") as HTMLInputElement;
  expect(() => fireEvent.change(input, { target: { value: "20261-10-03" } })).not.toThrow();
  expect(input.value).toBe("20261-10-03");
  expect(change).not.toHaveBeenCalled();
});

test("a half-typed entry survives blur and is marked invalid with a reason, until the reader corrects it", () => {
  const change = vi.fn();
  const { container } = render(<form><DatePicker name="d" value={new Date(2026, 9, 3)} onValueChange={change} inputProps={{ "aria-label": "Date" }} /></form>);
  const input = screen.getByLabelText("Date") as HTMLInputElement;
  typePartial(input);
  fireEvent.blur(input);
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input.validationMessage).toBe("日期未填完整");
  expect(container.querySelector("form")!.checkValidity()).toBe(false);
  Object.defineProperty(input, "validity", { configurable: true, get: () => ({ badInput: false }) });
  fireEvent.change(input, { target: { value: "2026-10-09" } });
  expect(change).toHaveBeenCalledWith(expect.any(Date), expect.anything());
  expect(input).not.toHaveAttribute("aria-invalid");
  expect(input.validationMessage).toBe("");
});

test("a complete date outside min/max is not reported, stays in the input, and is marked out of range on blur", () => {
  const change = vi.fn();
  render(<DatePicker value={new Date(2026, 9, 3)} min={new Date(2026, 9, 1)} max={new Date(2026, 9, 20)} onValueChange={change} inputProps={{ "aria-label": "Date", max: "2026-10-10" }} />);
  const input = screen.getByLabelText("Date") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "2026-10-15" } });
  expect(change).not.toHaveBeenCalled();
  expect(input).toHaveValue("2026-10-15");
  fireEvent.blur(input);
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input.validationMessage).toBe("日期超出可选范围");
  fireEvent.change(input, { target: { value: "2026-10-05" } });
  expect(change).toHaveBeenCalledTimes(1);
  expect(input).not.toHaveAttribute("aria-invalid");
});

test("the caller's own aria-invalid wins, and form reset clears the rejection", async () => {
  const { container } = render(<form><DatePicker name="d" defaultValue={new Date(2026, 9, 3)} inputProps={{ "aria-label": "Date", "aria-invalid": false }} /></form>);
  const input = screen.getByLabelText("Date") as HTMLInputElement;
  typePartial(input);
  fireEvent.blur(input);
  expect(input).toHaveAttribute("aria-invalid", "false");
  expect(input.validationMessage).toBe("日期未填完整");
  fireEvent.reset(container.querySelector("form")!);
  await waitFor(() => expect(input.validationMessage).toBe(""));
  expect(input).toHaveValue("2026-10-03");
});

test("defaultValue makes it uncontrolled: edits stick without onValueChange, and form reset returns to the default", async () => {
  const { container } = render(<form><DatePicker name="d" defaultValue={new Date(2026, 9, 3)} inputProps={{ "aria-label": "Date" }} /></form>);
  const input = screen.getByLabelText("Date") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "2026-10-09" } });
  expect(new FormData(container.querySelector("form")!).get("d")).toBe("2026-10-09");
  fireEvent.reset(container.querySelector("form")!);
  await waitFor(() => expect(input).toHaveValue("2026-10-03"));
  await userEvent.click(screen.getByRole("button", { name: "选择日期" }));
  await userEvent.click(await screen.findByRole("button", { name: /2026年10月15日/ }));
  expect(input).toHaveValue("2026-10-15");
});

test("min and max constrain the native input and the calendar from one declaration, and intersect with the old per-part props", async () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  render(<UILocaleProvider locale={enUS}><DatePicker min={new Date(2026, 9, 5)} max={new Date(2026, 9, 20)} defaultValue={new Date(2026, 9, 10)} inputProps={{ "aria-label": "Date", min: "2026-10-08" }} /></UILocaleProvider>);
  const input = screen.getByLabelText("Date");
  expect(input).toHaveAttribute("min", "2026-10-08");
  expect(input).toHaveAttribute("max", "2026-10-20");
  await userEvent.click(screen.getByRole("button", { name: "Select date" }));
  expect(await screen.findByRole("button", { name: /October 4, 2026/ })).toBeDisabled();
  expect(screen.getByRole("button", { name: /October 21, 2026/ })).toBeDisabled();
  expect(screen.getByRole("button", { name: /October 12, 2026/ })).toBeEnabled();
  expect(warn).not.toHaveBeenCalled();
  warn.mockRestore();
});

test("contradictory min and max warn in development", () => {
  const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
  render(<DatePicker min={new Date(2026, 9, 20)} max={new Date(2026, 9, 5)} inputProps={{ "aria-label": "Date" }} />);
  expect(warn).toHaveBeenCalledWith(expect.stringContaining("no date can be chosen"));
  warn.mockRestore();
});

test("an outer fieldset disabled at runtime disables the calendar entry too", async () => {
  const { container } = render(<fieldset id="outer"><fieldset><DatePicker value={new Date(2026, 9, 3)} onValueChange={() => {}} inputProps={{ "aria-label": "Date" }} /></fieldset></fieldset>);
  expect(screen.getByRole("button", { name: "选择日期" })).toBeEnabled();
  container.querySelector("#outer")!.setAttribute("disabled", "");
  await waitFor(() => expect(screen.getByRole("button", { name: "选择日期" })).toBeDisabled());
});

test("the clear action returns focus to the input; read-only says so beside the value and offers no clear", async () => {
  const change = vi.fn();
  const { rerender } = render(<DatePicker defaultValue={new Date(2026, 9, 3)} onValueChange={change} inputProps={{ "aria-label": "日期" }} />);
  await userEvent.click(screen.getByRole("button", { name: "清除日期" }));
  expect(change).toHaveBeenCalledWith(undefined, expect.anything());
  expect(screen.getByLabelText("日期")).toHaveFocus();
  expect(screen.queryByText("只读")).not.toBeInTheDocument();
  rerender(<DatePicker value={new Date(2026, 9, 3)} onValueChange={change} readOnly inputProps={{ "aria-label": "日期" }} />);
  expect(screen.getByText("只读")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "清除日期" })).not.toBeInTheDocument();
});

test("month granularity: the value is normalized to the month start, shown as locale text, and submitted as an ISO date", async () => {
  const onValueChange = vi.fn();
  function Example() {
    const [value, setValue] = useState<Date | undefined>(new Date(2026, 10, 18));
    return <form><Field name="period"><FieldLabel>月份</FieldLabel><DatePicker granularity="month" value={value} onValueChange={next => { onValueChange(next); setValue(next); }} /></Field></form>;
  }
  const { container } = render(<UILocaleProvider locale={enUS}><Example /></UILocaleProvider>);
  const input = screen.getByLabelText("月份") as HTMLInputElement;
  expect(input).toHaveAttribute("type", "text");
  expect(input).toHaveValue("11/2026");
  expect(new FormData(container.querySelector("form")!).get("period")).toBe("2026-11-18");
  const trigger = screen.getByRole("button", { name: "Select month" });
  await userEvent.click(trigger);
  expect(await screen.findByRole("grid")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Next year" }));
  await userEvent.click(screen.getByRole("button", { name: "February 2027" }));
  const picked = onValueChange.mock.calls.at(-1)![0] as Date;
  expect([picked.getFullYear(), picked.getMonth(), picked.getDate()]).toEqual([2027, 1, 1]);
  expect(input).toHaveValue("2/2027");
  expect(new FormData(container.querySelector("form")!).get("period")).toBe("2027-02-01");
  await waitFor(() => expect(trigger).toHaveFocus());
});

test("period text is held while typing, adopted on Enter or blur, and a blank text clears", async () => {
  const onValueChange = vi.fn();
  render(<UILocaleProvider locale={enUS}><DatePicker granularity="quarter" inputProps={{ "aria-label": "季度" }} defaultValue={new Date(2026, 0, 1)} onValueChange={onValueChange} /></UILocaleProvider>);
  const input = screen.getByLabelText("季度") as HTMLInputElement;
  expect(input).toHaveValue("Q1 2026");
  await userEvent.clear(input);
  await userEvent.type(input, "Q3 2027");
  expect(onValueChange).not.toHaveBeenCalled();
  await userEvent.keyboard("{Enter}");
  const picked = onValueChange.mock.calls[0]![0] as Date;
  expect([picked.getFullYear(), picked.getMonth(), picked.getDate()]).toEqual([2027, 6, 1]);
  expect(input).toHaveValue("Q3 2027");
  await userEvent.clear(input);
  await userEvent.tab();
  expect(onValueChange.mock.calls.at(-1)![0]).toBeUndefined();
  expect(input).toHaveValue("");
});

test("unparsable or out-of-bounds period text is rejected with the existing validity messages and the confirmed value stays", async () => {
  const onValueChange = vi.fn();
  render(<UILocaleProvider locale={enUS}><DatePicker granularity="year" inputProps={{ "aria-label": "年份" }} defaultValue={new Date(2026, 0, 1)} min={new Date(2020, 5, 1)} max={new Date(2030, 5, 1)} onValueChange={onValueChange} /></UILocaleProvider>);
  const input = screen.getByLabelText("年份") as HTMLInputElement;
  await userEvent.clear(input);
  await userEvent.type(input, "next year");
  await userEvent.tab();
  expect(onValueChange).not.toHaveBeenCalled();
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input.validationMessage).toBe("Date is incomplete");
  await userEvent.clear(input);
  await userEvent.type(input, "2040");
  await userEvent.tab();
  expect(input.validationMessage).toBe("Date is outside the allowed range");
  expect(onValueChange).not.toHaveBeenCalled();
  // 与 min / max 有交集的周期可选：2020 年含 6 月 1 日之后的日子。
  await userEvent.clear(input);
  await userEvent.type(input, "2020");
  await userEvent.tab();
  expect(onValueChange).toHaveBeenCalledTimes(1);
});

test("week granularity shows the week number text and the calendar selects a whole week", async () => {
  const onValueChange = vi.fn();
  render(<UILocaleProvider locale={{ ...enUS, messages: { ...enUS.messages, periodWeek: "{year} 年第 {week} 周" } }}><DatePicker granularity="week" inputProps={{ "aria-label": "周" }} calendarProps={{ weekStartsOn: 1, firstWeekContainsDate: 4 }} defaultValue={new Date(2026, 10, 4)} onValueChange={onValueChange} /></UILocaleProvider>);
  const input = screen.getByLabelText("周") as HTMLInputElement;
  expect(input).toHaveValue("2026 年第 45 周");
  await userEvent.click(screen.getByRole("button", { name: "Select week" }));
  await userEvent.click(await screen.findByRole("button", { name: /November 12, 2026/ }));
  const picked = onValueChange.mock.calls[0]![0] as Date;
  expect([picked.getMonth(), picked.getDate()]).toEqual([10, 9]);
  expect(input).toHaveValue("2026 年第 46 周");
});

test("a disabled granular picker cannot be opened", () => {
  render(<UILocaleProvider locale={enUS}><DatePicker granularity="month" inputProps={{ "aria-label": "月" }} disabled defaultValue={new Date(2026, 10, 1)} /></UILocaleProvider>);
  expect(screen.getByLabelText("月")).toBeDisabled();
  expect(screen.getByRole("button", { name: "Select month" })).toBeDisabled();
});
