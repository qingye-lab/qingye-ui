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
