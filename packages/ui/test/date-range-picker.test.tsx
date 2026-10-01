import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import {
  DateRangePicker,
  type DateRangeValue,
} from "../src/components/date-range-picker";

const format = (date: Date) =>
  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

/** jsdom reports no media-query match, so one month renders; pin the month. */
const SEPTEMBER = new Date(2026, 8, 1);

function day(date: string): HTMLElement {
  // A day button is labelled "2026年9月4日 星期五" (plus modifiers when picked).
  const matches = screen
    .getAllByRole("button")
    .filter((node) => (node.getAttribute("aria-label") ?? "").startsWith(date));
  if (!matches[0]) throw new Error(`no day button for ${date}`);
  return matches[0];
}

test("two clicks pick a range, apply it and close", async () => {
  const onValueChange = vi.fn();
  const onOpenChange = vi.fn();
  render(
    <DateRangePicker
      defaultOpen
      calendarProps={{ defaultMonth: SEPTEMBER }}
      onOpenChange={onOpenChange}
      onValueChange={onValueChange}
      startName="from"
      endName="to"
    />,
  );

  await userEvent.click(day("2026年9月4日"));
  expect(onValueChange).not.toHaveBeenCalled();

  await userEvent.click(day("2026年9月18日"));
  const [range] = onValueChange.mock.calls[0] as [DateRangeValue];
  expect(format(range.from as Date)).toBe("2026-9-4");
  expect(format(range.to as Date)).toBe("2026-9-18");
  expect(onOpenChange).toHaveBeenLastCalledWith(false);
});

test("clicking an earlier day after the first click still produces an ordered range", async () => {
  const onValueChange = vi.fn();
  render(<DateRangePicker calendarProps={{ defaultMonth: SEPTEMBER }} defaultOpen onValueChange={onValueChange} />);

  await userEvent.click(day("2026年9月18日"));
  await userEvent.click(day("2026年9月4日"));
  const [range] = onValueChange.mock.calls[0] as [DateRangeValue];
  expect(format(range.from as Date)).toBe("2026-9-4");
  expect(format(range.to as Date)).toBe("2026-9-18");
});

test("a preset applies the whole range at once", async () => {
  const onValueChange = vi.fn();
  render(
    <DateRangePicker
      defaultOpen
      calendarProps={{ defaultMonth: SEPTEMBER }}
      onValueChange={onValueChange}
      presets={[
        {
          label: "本月",
          value: { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) },
        },
      ]}
    />,
  );

  const preset = screen.getByRole("button", { name: "本月" });
  await userEvent.click(preset);
  const [range] = onValueChange.mock.calls[0] as [DateRangeValue];
  expect(format(range.from as Date)).toBe("2026-9-1");
  expect(format(range.to as Date)).toBe("2026-9-30");
  expect(preset).toHaveAttribute("aria-pressed", "true");
});

test("the trigger shows the pending end date after the first click", async () => {
  render(<DateRangePicker calendarProps={{ defaultMonth: SEPTEMBER }} defaultOpen placeholder="选择日期范围" />);
  await userEvent.click(day("2026年9月4日"));
  expect(screen.getByText("结束日期")).toBeInTheDocument();
});

test("a half-finished selection is discarded when the popup closes", async () => {
  const onValueChange = vi.fn();
  function Harness() {
    const [open, setOpen] = useState(true);
    return (
      <>
        <DateRangePicker
          calendarProps={{ defaultMonth: SEPTEMBER }}
          onOpenChange={setOpen}
          onValueChange={onValueChange}
          open={open}
        />
        <button onClick={() => setOpen(false)} type="button">
          关闭
        </button>
      </>
    );
  }
  render(<Harness />);
  await userEvent.click(day("2026年9月4日"));
  await userEvent.click(screen.getByRole("button", { name: "关闭" }));
  expect(onValueChange).not.toHaveBeenCalled();
  // Match the trigger by its container rather than a text pattern that can also
  // hit the calendar's own date buttons.
  const trigger = within(
    document.querySelector("[data-slot=date-range-picker]") as HTMLElement,
  ).getByRole("button");
  expect(trigger).not.toHaveTextContent("结束日期");
});

test("controlled value renders the range and submits both hidden fields", async () => {
  render(
    <form aria-label="表单">
      <DateRangePicker
        endName="to"
        startName="from"
        value={{ from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) }}
      />
    </form>,
  );

  expect(screen.getByRole("button", { name: /2026年9月1日/ })).toHaveTextContent("9月30日");
  const data = new FormData(screen.getByRole("form", { name: "表单" }) as HTMLFormElement);
  expect(data.get("from")).toBe("2026-09-01");
  expect(data.get("to")).toBe("2026-09-30");
});

test("clear empties the range and returns focus to the trigger", async () => {
  const onValueChange = vi.fn();
  render(
    <DateRangePicker
      clearLabel="清除日期范围"
      defaultValue={{ from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) }}
      onValueChange={onValueChange}
    />,
  );

  await userEvent.click(screen.getByRole("button", { name: "清除日期范围" }));
  expect(onValueChange).toHaveBeenLastCalledWith(null);
  expect(screen.getByRole("button", { name: /选择日期范围/ })).toHaveFocus();
});

test("Backspace on the trigger clears the range", async () => {
  const onValueChange = vi.fn();
  render(
    <DateRangePicker
      defaultValue={{ from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) }}
      onValueChange={onValueChange}
    />,
  );

  const trigger = screen.getByRole("button", { name: /2026年9月1日/ });
  trigger.focus();
  await userEvent.keyboard("{Backspace}");
  expect(onValueChange).toHaveBeenLastCalledWith(null);
});

test("numberOfMonths controls how many month grids render", () => {
  const { unmount } = render(
    <DateRangePicker
      calendarProps={{ defaultMonth: SEPTEMBER }}
      defaultOpen
      defaultValue={{ from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) }}
      numberOfMonths={1}
    />,
  );
  expect(document.querySelectorAll("[data-slot=calendar] td[data-day]").length).toBeGreaterThan(0);
  expect(screen.queryAllByText("2026年9月").length).toBe(1);
  unmount();
});
