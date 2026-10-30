import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { DateTimePicker } from "../src/components/date-time-picker";
import { Field, FieldLabel } from "../src/components/field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("a date-only draft never invents time or submission; complete Apply and clear share native FormData", async () => {
  function Example() {
    const [value, setValue] = useState<string | undefined>();
    return <form><Field name="when"><FieldLabel>日期时间</FieldLabel><DateTimePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9) }} /></Field></form>;
  }
  const { container } = render(<UILocaleProvider locale={enUS}><Example /></UILocaleProvider>);
  await userEvent.click(screen.getByRole("button", { name: "Select date and time" }));
  await userEvent.click(await screen.findByRole("button", { name: /October 3, 2026/ }));
  expect(screen.getByLabelText("Time")).toHaveValue("");
  expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  expect(new FormData(container.querySelector("form")!).getAll("when")).toEqual([""]);
  fireEvent.change(screen.getByLabelText("Time"), { target: { value: "12:30" } });
  await userEvent.click(screen.getByRole("button", { name: "Apply" }));
  expect(new FormData(container.querySelector("form")!).getAll("when")).toEqual(["2026-10-03T12:30"]);
  await userEvent.click(screen.getByRole("button", { name: "Select date and time" }));
  await userEvent.click(await screen.findByRole("button", { name: "Clear" }));
  expect(screen.getByLabelText("日期时间")).toHaveValue("");
});

test("controlled rejection/readonly preserve local wall-clock text, invalid zoned values fail", async () => {
  const change = vi.fn();
  const { container, rerender } = render(<form><DateTimePicker name="when" value="2026-10-03T12:30" onValueChange={change} readOnly inputProps={{ "aria-label": "When" }} /></form>);
  fireEvent.change(screen.getByLabelText("When"), { target: { value: "2026-10-04T10:00" } });
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("when")).toBe("2026-10-03T12:30");
  rerender(<DateTimePicker value="2026-10-03T12:30" onValueChange={change} inputProps={{ "aria-label": "When" }} />);
  fireEvent.change(screen.getByLabelText("When"), { target: { value: "2026-10-04T10:00" } });
  expect(screen.getByLabelText("When")).toHaveValue("2026-10-03T12:30");
  expect(() => render(<DateTimePicker value="2026-10-03T12:30Z" onValueChange={change} />)).toThrow("without a zone");
});

test("defaultValue makes it uncontrolled; an over-long year is not handed to the caller and does not throw", () => {
  const { container } = render(<form><DateTimePicker name="when" defaultValue="2026-10-03T12:30" inputProps={{ "aria-label": "When" }} /></form>);
  const input = screen.getByLabelText("When") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "2026-10-04T08:00" } });
  expect(new FormData(container.querySelector("form")!).get("when")).toBe("2026-10-04T08:00");
  Object.defineProperty(input, "validity", { configurable: true, get: () => ({ badInput: true }) });
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.blur(input);
  // 半截键入不再被悄悄换回旧值：保留在输入里，并让表单提交被拦下。
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(container.querySelector("form")!.checkValidity()).toBe(false);
});

test("a five-digit year the platform accepts as text is held as typing, never handed to the caller", () => {
  const change = vi.fn();
  render(<DateTimePicker value="2026-10-03T12:30" onValueChange={change} inputProps={{ "aria-label": "When" }} />);
  const input = screen.getByLabelText("When") as HTMLInputElement;
  expect(() => fireEvent.change(input, { target: { value: "20261-10-03T12:30" } })).not.toThrow();
  expect(input.value).toBe("20261-10-03T12:30");
  expect(change).not.toHaveBeenCalled();
});

test("min and max bound the native input and the calendar, and a draft outside them cannot be applied", async () => {
  render(<UILocaleProvider locale={enUS}><DateTimePicker min="2026-10-05T09:00" max="2026-10-20T18:00" inputProps={{ "aria-label": "When" }} calendarProps={{ defaultMonth: new Date(2026, 9) }} /></UILocaleProvider>);
  expect(screen.getByLabelText("When")).toHaveAttribute("min", "2026-10-05T09:00");
  await userEvent.click(screen.getByRole("button", { name: "Select date and time" }));
  expect(await screen.findByRole("button", { name: /October 4, 2026/ })).toBeDisabled();
  await userEvent.click(screen.getByRole("button", { name: /October 5, 2026/ }));
  fireEvent.change(screen.getByLabelText("Time"), { target: { value: "08:00" } });
  expect(screen.getByLabelText("Time")).toHaveAttribute("min", "09:00");
  expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  fireEvent.change(screen.getByLabelText("Time"), { target: { value: "09:30" } });
  expect(screen.getByRole("button", { name: "Apply" })).toBeEnabled();
});

test("a half-typed or out-of-range entry is kept on blur, marked invalid with a reason, and never reported", async () => {
  const change = vi.fn();
  const { container } = render(<form><DateTimePicker name="when" defaultValue="2026-10-03T12:30" min="2026-10-01T00:00" max="2026-10-20T00:00" onValueChange={change} inputProps={{ "aria-label": "When" }} /></form>);
  const input = screen.getByLabelText("When") as HTMLInputElement;
  Object.defineProperty(input, "validity", { configurable: true, get: () => ({ badInput: true }) });
  fireEvent.change(input, { target: { value: "" } });
  fireEvent.blur(input);
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input.validationMessage).toBe("日期未填完整");
  Object.defineProperty(input, "validity", { configurable: true, get: () => ({ badInput: false }) });
  fireEvent.change(input, { target: { value: "2026-11-01T08:00" } });
  expect(change).not.toHaveBeenCalled();
  expect(input).toHaveValue("2026-11-01T08:00");
  fireEvent.blur(input);
  expect(input.validationMessage).toBe("日期超出可选范围");
  fireEvent.reset(container.querySelector("form")!);
  await waitFor(() => expect(input).toHaveValue("2026-10-03T12:30"));
  expect(input).not.toHaveAttribute("aria-invalid");
  expect(input.validationMessage).toBe("");
  fireEvent.change(input, { target: { value: "2026-10-05T08:00" } });
  expect(change).toHaveBeenCalledTimes(1);
});

test("the clear action empties the value, returns focus to the input and is absent when read-only, which says so", async () => {
  const change = vi.fn();
  const { rerender } = render(<DateTimePicker defaultValue="2026-10-03T12:30" onValueChange={change} inputProps={{ "aria-label": "时刻" }} />);
  await userEvent.click(screen.getByRole("button", { name: "清除日期和时间" }));
  expect(change).toHaveBeenCalledWith(undefined, expect.anything());
  expect(screen.getByLabelText("时刻")).toHaveFocus();
  expect(screen.queryByRole("button", { name: "清除日期和时间" })).not.toBeInTheDocument();
  rerender(<DateTimePicker value="2026-10-03T12:30" onValueChange={change} readOnly inputProps={{ "aria-label": "时刻" }} />);
  expect(screen.getByText("只读")).toBeInTheDocument();
  expect(screen.queryByRole("button", { name: "清除日期和时间" })).not.toBeInTheDocument();
});
