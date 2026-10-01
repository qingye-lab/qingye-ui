import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test, vi } from "vitest";
import { DatePicker, formatLocalDate, parseLocalDate } from "../src/components/date-picker";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

describe("local date helpers", () => {
  test("round-trip YYYY-MM-DD without time zone drift", () => {
    expect(formatLocalDate(new Date(2026, 0, 5))).toBe("2026-01-05");
    expect(parseLocalDate("2026-10-01")?.getDate()).toBe(1);
    expect(parseLocalDate("2026-02-30")).toBeUndefined();
    expect(parseLocalDate("2026-10-01T09:00")).toBeUndefined();
    expect(parseLocalDate("")).toBeUndefined();
  });
});

describe("DatePicker", () => {
  test("picks a day, submits YYYY-MM-DD and closes back to the trigger", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    const { container } = render(
      <DatePicker name="due" defaultValue={new Date(2026, 9, 1)} onValueChange={onValueChange} />,
    );
    const trigger = screen.getByRole("button", { name: /2026年10月1日/ });
    expect(container.querySelector<HTMLInputElement>('input[name="due"]')?.value).toBe("2026-10-01");

    await user.click(trigger);
    const dialog = await screen.findByRole("dialog");
    await user.click(dialog.querySelector('[data-day="2026-10-15"] button') as HTMLElement);

    expect(onValueChange).toHaveBeenCalledWith(new Date(2026, 9, 15));
    expect(container.querySelector<HTMLInputElement>('input[name="due"]')?.value).toBe("2026-10-15");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveTextContent("2026年10月15日");
  });

  test("clears with the clear button or Backspace and returns focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="到期日" defaultValue={new Date(2026, 9, 1)} />);
    await user.click(screen.getByRole("button", { name: "清除日期" }));
    const trigger = screen.getByRole("button", { name: "到期日" });
    expect(trigger).toHaveTextContent("选择日期");
    expect(trigger).toHaveFocus();
    expect(screen.queryByRole("button", { name: "清除日期" })).not.toBeInTheDocument();
  });

  test("Backspace on the trigger clears the value", async () => {
    const user = userEvent.setup();
    render(<DatePicker aria-label="到期日" defaultValue={new Date(2026, 9, 1)} />);
    const trigger = screen.getByRole("button", { name: "到期日" });
    trigger.focus();
    await user.keyboard("{Backspace}");
    expect(trigger).toHaveTextContent("选择日期");
  });

  test("keeps the picked date audible next to an external label", () => {
    render(
      <>
        <span id="label">发货日期</span>
        <DatePicker aria-labelledby="label" defaultValue={new Date(2026, 9, 1)} />
      </>,
    );
    expect(screen.getByRole("button", { name: /发货日期.*2026年10月1日/ })).toBeInTheDocument();
  });

  test("controlled value and disabled state", () => {
    const { rerender } = render(<DatePicker aria-label="日期" value={null} disabled />);
    const trigger = screen.getByRole("button", { name: "日期" });
    expect(trigger).toBeDisabled();
    expect(trigger).toHaveAttribute("data-disabled");
    rerender(<DatePicker aria-label="日期" value={new Date(2026, 4, 20)} />);
    expect(trigger).toHaveTextContent("2026年5月20日");
  });

  test("defaults follow the UI locale", () => {
    render(
      <UILocaleProvider locale={enUS}>
        <DatePicker defaultValue={new Date(2026, 9, 1)} />
      </UILocaleProvider>,
    );
    expect(screen.getByRole("button", { name: "Clear date" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Oct 1, 2026/ })).toBeInTheDocument();
  });
});
