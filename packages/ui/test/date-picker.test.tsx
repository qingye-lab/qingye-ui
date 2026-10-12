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
  fireEvent.blur(input);
  Object.defineProperty(input, "validity", { configurable: true, get: () => ({ badInput: false }) });
  fireEvent.change(input, { target: { value: "" } });
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

test("a typed entry the caller never accepted is dropped when focus leaves", () => {
  render(<DatePicker value={new Date(2026, 9, 3)} onValueChange={() => {}} inputProps={{ "aria-label": "Date" }} />);
  const input = screen.getByLabelText("Date") as HTMLInputElement;
  typePartial(input);
  fireEvent.blur(input);
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
