import { render, screen, waitFor } from "@testing-library/react";
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
  expect(screen.getByRole("textbox", { name: "范围" })).toHaveAccessibleDescription("当地日期范围");
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
