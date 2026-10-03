import { fireEvent, render, screen } from "@testing-library/react";
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
