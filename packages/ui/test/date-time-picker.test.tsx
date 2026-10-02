import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { DateTimePicker, formatLocalDateTime, parseLocalDateTime } from "../src/components/date-time-picker";

test("parses only real local date-times", () => {
  expect(parseLocalDateTime("2026-10-12T14:30")?.getHours()).toBe(14);
  expect(parseLocalDateTime("2026-10-12T14:30:05.120")?.getSeconds()).toBe(5);
  expect(parseLocalDateTime("2026-02-30T10:00")).toBeUndefined();
  expect(parseLocalDateTime("2026-10-12")).toBeUndefined();
  expect(formatLocalDateTime(new Date(2026, 9, 12, 9, 5)).slice(0, 16)).toBe("2026-10-12T09:05");
});

function Controlled({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial);
  return (
    <>
      <DateTimePicker aria-label="评审会" name="at" value={value} onValueChange={setValue} defaultTime="09:00" />
      <output data-testid="value">{value}</output>
    </>
  );
}

test("picking a day keeps the time; editing the time keeps the day", async () => {
  const user = userEvent.setup();
  const { container } = render(<Controlled initial="2026-10-12T14:30" />);
  await user.click(screen.getByRole("button", { name: "评审会" }));
  const dialog = await screen.findByRole("dialog");
  await user.click(dialog.querySelector('[data-day="2026-10-20"] button') as HTMLElement);
  expect(screen.getByTestId("value")).toHaveTextContent("2026-10-20T14:30");
  // Picking a day does not close, so the time can follow.
  expect(screen.getByRole("dialog")).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText("时间"), { target: { value: "08:15" } });
  expect(screen.getByTestId("value")).toHaveTextContent("2026-10-20T08:15");
  expect(container.querySelector<HTMLInputElement>('input[name="at"]')?.value).toBe("2026-10-20T08:15");

  await user.click(screen.getByRole("button", { name: "完成" }));
  expect(screen.getByRole("button", { name: "评审会" })).toHaveTextContent("2026年10月20日 08:15");
});

test("uses defaultTime for a first pick and clears to an empty string", async () => {
  const user = userEvent.setup();
  render(<Controlled />);
  await user.click(screen.getByRole("button", { name: "评审会" }));
  const dialog = await screen.findByRole("dialog");
  await user.click(dialog.querySelector("[data-today] button") as HTMLElement);
  expect(screen.getByTestId("value").textContent).toMatch(/^\d{4}-\d{2}-\d{2}T09:00$/);
  await user.keyboard("{Escape}");
  await user.click(screen.getByRole("button", { name: "清除日期" }));
  expect(screen.getByTestId("value")).toHaveTextContent("");
});

test("read-only never opens", async () => {
  const user = userEvent.setup();
  render(<DateTimePicker aria-label="创建时间" readOnly defaultValue="2026-09-28T16:42" />);
  const trigger = screen.getByRole("button", { name: "创建时间" });
  expect(trigger).toHaveAttribute("aria-readonly", "true");
  await user.click(trigger);
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
});

test("now and time editing cannot create a value on a disabled day", async () => {
  const user = userEvent.setup();
  const onValueChange = vi.fn();
  const disabledDates = (date: Date) => date.toDateString() === new Date().toDateString();
  render(<DateTimePicker aria-label="预约" defaultOpen disabledDates={disabledDates} onValueChange={onValueChange} />);
  const now = screen.getByRole("button", { name: "此刻" });
  expect(now).toBeDisabled();
  await user.click(now);
  fireEvent.change(screen.getByLabelText("时间"), { target: { value: "08:15" } });
  expect(onValueChange).not.toHaveBeenCalled();
});

test("an existing date may still change time when today is disabled", () => {
  const onValueChange = vi.fn();
  render(<DateTimePicker defaultOpen defaultValue="2026-09-01T14:30"
    disabledDates={(date) => date.getFullYear() !== 2026 || date.getMonth() !== 8 || date.getDate() !== 1}
    onValueChange={onValueChange} />);
  fireEvent.change(screen.getByLabelText("时间"), { target: { value: "08:15" } });
  expect(onValueChange).toHaveBeenLastCalledWith("2026-09-01T08:15");
});
