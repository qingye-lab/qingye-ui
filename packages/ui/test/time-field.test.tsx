import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { TimeField } from "../src/components/time-field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const hour = () => screen.getByRole("spinbutton", { name: "时" });
const minute = () => screen.getByRole("spinbutton", { name: "分" });
const second = () => screen.getByRole("spinbutton", { name: "秒" });
const period = () => screen.getByRole("spinbutton", { name: "上午或下午" });

test("the group is named by the Field label and holds hour and minute spinbuttons", () => {
  render(<Field><FieldLabel>开门时间</FieldLabel><TimeField /></Field>);
  const group = screen.getByRole("group", { name: "开门时间" });
  expect(group).toContainElement(hour());
  expect(group).toContainElement(minute());
  expect(hour()).toHaveAttribute("aria-valuemin", "0");
  expect(hour()).toHaveAttribute("aria-valuemax", "23");
  expect(minute()).toHaveAttribute("aria-valuemax", "59");
  expect(hour()).not.toHaveAttribute("aria-valuenow");
  expect(hour()).toHaveAttribute("aria-valuetext", "未填");
});

test("an unnamed field throws unless aria-label or aria-labelledby is given", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
  expect(() => render(<TimeField />)).toThrow(/accessible name/);
  error.mockRestore();
  render(<TimeField aria-label="提醒时间" />);
  expect(screen.getByRole("group", { name: "提醒时间" })).toBeInTheDocument();
});

test("typing digits fills segments, jumps ahead and reports only the complete value", async () => {
  const change = vi.fn();
  render(<TimeField aria-label="t" onValueChange={change} />);
  await userEvent.click(hour());
  await userEvent.keyboard("0");
  expect(change).not.toHaveBeenCalled();
  await userEvent.keyboard("9");
  expect(hour()).toHaveAttribute("aria-valuenow", "9");
  expect(minute()).toHaveFocus();
  // 分钟的「3」已经是完整的 09:03，但还能长成两位，所以焦点留在分段上等下一位。
  await userEvent.keyboard("3");
  expect(change).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenLastCalledWith("09:03");
  expect(minute()).toHaveFocus();
  await userEvent.keyboard("0");
  expect(change).toHaveBeenCalledTimes(2);
  expect(change).toHaveBeenLastCalledWith("09:30");
});

test("a first digit that cannot grow into a valid number advances at once", async () => {
  render(<TimeField aria-label="t" />);
  await userEvent.click(hour());
  await userEvent.keyboard("7");
  expect(hour()).toHaveAttribute("aria-valuenow", "7");
  expect(minute()).toHaveFocus();
  await userEvent.keyboard("8");
  expect(minute()).toHaveAttribute("aria-valuenow", "8");
});

test("arrow up and down step the segment and wrap without carrying", async () => {
  const change = vi.fn();
  render(<TimeField aria-label="t" defaultValue="23:00" onValueChange={change} />);
  await userEvent.click(hour());
  await userEvent.keyboard("{ArrowUp}");
  expect(hour()).toHaveAttribute("aria-valuenow", "0");
  expect(minute()).toHaveAttribute("aria-valuenow", "0");
  expect(change).toHaveBeenLastCalledWith("00:00");
  await userEvent.keyboard("{ArrowDown}");
  expect(hour()).toHaveAttribute("aria-valuenow", "23");
  await userEvent.keyboard("{ArrowRight}{ArrowDown}");
  expect(minute()).toHaveAttribute("aria-valuenow", "59");
  expect(change).toHaveBeenLastCalledWith("23:59");
});

test("Backspace clears the segment and withdraws the value", async () => {
  const change = vi.fn();
  render(<TimeField aria-label="t" defaultValue="09:30" onValueChange={change} />);
  await userEvent.click(minute());
  await userEvent.keyboard("{Backspace}");
  expect(minute()).not.toHaveAttribute("aria-valuenow");
  expect(hour()).toHaveAttribute("aria-valuenow", "9");
  expect(change).toHaveBeenCalledTimes(1);
  expect(change).toHaveBeenLastCalledWith(null);
  await userEvent.keyboard("45");
  expect(change).toHaveBeenLastCalledWith("09:45");
});

test("left and right move between segments and Tab leaves the whole group", async () => {
  render(<><button>前</button><TimeField aria-label="t" granularity="second" /><button>后</button></>);
  await userEvent.click(hour());
  await userEvent.keyboard("{ArrowRight}");
  expect(minute()).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(second()).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(second()).toHaveFocus();
  await userEvent.keyboard("{ArrowLeft}{ArrowLeft}");
  expect(hour()).toHaveFocus();
  await userEvent.tab();
  expect(screen.getByRole("button", { name: "后" })).toHaveFocus();
  await userEvent.tab({ shift: true });
  expect(second().ownerDocument.activeElement).toBe(hour());
});

test("12-hour mode adds an AM/PM segment, maps to 24-hour text and wraps 12 to 1", async () => {
  const change = vi.fn();
  render(<TimeField aria-label="t" hourCycle={12} defaultValue="13:05" onValueChange={change} />);
  expect(hour()).toHaveAttribute("aria-valuenow", "1");
  expect(hour()).toHaveAttribute("aria-valuemin", "1");
  expect(hour()).toHaveAttribute("aria-valuemax", "12");
  expect(period()).toHaveAttribute("aria-valuetext", "下午");
  await userEvent.click(period());
  await userEvent.keyboard("{ArrowUp}");
  expect(period()).toHaveAttribute("aria-valuetext", "上午");
  expect(change).toHaveBeenLastCalledWith("01:05");
  await userEvent.click(hour());
  await userEvent.keyboard("{ArrowDown}");
  expect(hour()).toHaveAttribute("aria-valuenow", "12");
  expect(change).toHaveBeenLastCalledWith("00:05");
});

test("12-hour typing needs the period before it has a value; a leading 0 waits for the next digit", async () => {
  const change = vi.fn();
  render(<TimeField aria-label="t" hourCycle={12} onValueChange={change} />);
  await userEvent.click(hour());
  await userEvent.keyboard("0");
  expect(hour()).not.toHaveAttribute("aria-valuenow");
  await userEvent.keyboard("9");
  expect(hour()).toHaveAttribute("aria-valuenow", "9");
  expect(minute()).toHaveFocus();
  await userEvent.keyboard("30");
  expect(period()).toHaveFocus();
  expect(change).not.toHaveBeenCalled();
  await userEvent.keyboard("p");
  expect(change).toHaveBeenLastCalledWith("21:30");
});

test("the hour cycle follows the locale when it is not given", () => {
  const { unmount } = render(<UILocaleProvider locale={enUS}><TimeField aria-label="t" defaultValue="15:20" /></UILocaleProvider>);
  expect(screen.getByRole("spinbutton", { name: "Hour" })).toHaveAttribute("aria-valuenow", "3");
  expect(screen.getByRole("spinbutton", { name: "AM or PM" })).toHaveAttribute("aria-valuetext", "PM");
  unmount();
  render(<TimeField aria-label="t" defaultValue="15:20" />);
  expect(hour()).toHaveAttribute("aria-valuenow", "15");
  expect(screen.queryByRole("spinbutton", { name: "上午或下午" })).toBeNull();
});

test("a controlled value is the only fact: a rejected change snaps back, an accepted one shows", async () => {
  function Controlled({ accept }: { accept: boolean }) {
    const [value, setValue] = useState<string | null>("09:30");
    return <TimeField aria-label="t" value={value} onValueChange={next => { if (accept) setValue(next); }} />;
  }
  const { unmount } = render(<Controlled accept={false} />);
  await userEvent.click(hour());
  await userEvent.keyboard("{ArrowUp}");
  expect(hour()).toHaveAttribute("aria-valuenow", "9");
  unmount();
  render(<Controlled accept />);
  await userEvent.click(hour());
  await userEvent.keyboard("{ArrowUp}");
  expect(hour()).toHaveAttribute("aria-valuenow", "10");
});

test("value={null} is controlled-empty and an external value replaces a draft", () => {
  const { rerender } = render(<TimeField aria-label="t" value={null} />);
  expect(hour()).not.toHaveAttribute("aria-valuenow");
  rerender(<TimeField aria-label="t" value="18:45" />);
  expect(hour()).toHaveAttribute("aria-valuenow", "18");
  expect(minute()).toHaveAttribute("aria-valuenow", "45");
});

test("seconds granularity adds a segment and the value gains :ss", async () => {
  const change = vi.fn();
  render(<TimeField aria-label="t" granularity="second" defaultValue="09:30:15" onValueChange={change} />);
  expect(second()).toHaveAttribute("aria-valuenow", "15");
  await userEvent.click(second());
  await userEvent.keyboard("{ArrowUp}");
  expect(change).toHaveBeenLastCalledWith("09:30:16");
});

test("parts finer than the segments survive edits and drop only when every segment is cleared", async () => {
  const change = vi.fn();
  render(<TimeField aria-label="t" granularity="second" defaultValue="09:30:15.250" onValueChange={change} />);
  expect(second()).toHaveAttribute("aria-valuenow", "15");
  await userEvent.click(minute());
  await userEvent.keyboard("{ArrowUp}");
  expect(change).toHaveBeenLastCalledWith("09:31:15.250");
  await userEvent.keyboard("{Backspace}{ArrowLeft}{Backspace}{ArrowRight}{ArrowRight}{Backspace}");
  expect(change).toHaveBeenLastCalledWith(null);
  await userEvent.keyboard("{ArrowLeft}{ArrowLeft}0930{ArrowUp}");
  expect(change).toHaveBeenLastCalledWith("09:30:00");
});

test("minute granularity keeps the seconds of a given value", async () => {
  const change = vi.fn();
  render(<TimeField aria-label="t" defaultValue="09:30:15.5" onValueChange={change} />);
  await userEvent.click(hour());
  await userEvent.keyboard("{ArrowUp}");
  expect(change).toHaveBeenLastCalledWith("10:30:15.5");
});

test("bounds compare to the millisecond regardless of written precision", () => {
  const { rerender } = render(<TimeField aria-label="t" granularity="second" value="09:00:00.5" max="09:00:00.500" />);
  expect(hour()).not.toHaveAttribute("aria-invalid");
  rerender(<TimeField aria-label="t" granularity="second" value="09:00:00.501" max="09:00:00.5" />);
  expect(hour()).toHaveAttribute("aria-invalid", "true");
  expect(() => rerender(<TimeField aria-label="t" value="09:00:00.1234" />)).toThrow(RangeError);
});

test("values outside min / max are reported but marked invalid and block form submission", () => {
  const { container, rerender } = render(<form><TimeField aria-label="t" name="open" value="08:00" min="09:00" max="18:00" /></form>);
  const form = container.querySelector("form")!;
  expect(hour()).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("group")).toHaveAttribute("data-invalid");
  expect(form.checkValidity()).toBe(false);
  rerender(<form><TimeField aria-label="t" name="open" value="09:00" min="09:00" max="18:00" /></form>);
  expect(hour()).not.toHaveAttribute("aria-invalid");
  expect(form.checkValidity()).toBe(true);
  rerender(<form><TimeField aria-label="t" name="open" value="18:00:30" min="09:00" max="18:00" /></form>);
  expect(minute()).toHaveAttribute("aria-invalid", "true");
});

test("the form receives the ISO text, an empty string when unset, and reset restores the default", async () => {
  const { container } = render(<form><TimeField aria-label="t" name="remind" defaultValue="07:15" /></form>);
  const form = container.querySelector("form")!;
  expect(new FormData(form).get("remind")).toBe("07:15");
  await userEvent.click(hour());
  await userEvent.keyboard("{Backspace}");
  expect(new FormData(form).get("remind")).toBe("");
  await act(async () => form.reset());
  expect(hour()).toHaveAttribute("aria-valuenow", "7");
  expect(new FormData(form).get("remind")).toBe("07:15");
});

test("required reaches the form and the spinbuttons; an incomplete draft is not a value", async () => {
  const { container } = render(<form><TimeField aria-label="t" name="open" required /></form>);
  const form = container.querySelector("form")!;
  expect(hour()).toHaveAttribute("aria-required", "true");
  expect(form.checkValidity()).toBe(false);
  await userEvent.click(hour());
  await userEvent.keyboard("09");
  expect(new FormData(form).get("open")).toBe("");
  await userEvent.keyboard("30");
  expect(form.checkValidity()).toBe(true);
  expect(new FormData(form).get("open")).toBe("09:30");
});

test("readOnly keeps the value and its submission but refuses edits; disabled leaves the tab order", async () => {
  const change = vi.fn();
  const { container, rerender } = render(<form><TimeField aria-label="t" name="n" readOnly defaultValue="09:30" onValueChange={change} /></form>);
  await userEvent.click(hour());
  await userEvent.keyboard("{ArrowUp}1{Backspace}");
  expect(hour()).toHaveAttribute("aria-valuenow", "9");
  expect(change).not.toHaveBeenCalled();
  expect(hour()).toHaveAttribute("aria-readonly", "true");
  await userEvent.keyboard("{ArrowRight}");
  expect(minute()).toHaveFocus();
  expect(new FormData(container.querySelector("form")!).get("n")).toBe("09:30");
  rerender(<form><TimeField aria-label="t" name="n" disabled defaultValue="09:30" /></form>);
  expect(hour()).toHaveAttribute("aria-disabled", "true");
  expect(hour()).not.toHaveAttribute("tabindex");
  expect(new FormData(container.querySelector("form")!).get("n")).toBeNull();
});

test("Field disabled blocks editing", () => {
  render(<Field disabled><FieldLabel>时间</FieldLabel><TimeField defaultValue="09:30" /></Field>);
  expect(hour()).toHaveAttribute("aria-disabled", "true");
});

test("a Field invalid state reaches the segments", () => {
  render(<Field invalid><FieldLabel>时间</FieldLabel><TimeField defaultValue="09:30" /></Field>);
  expect(hour()).toHaveAttribute("aria-invalid", "true");
});
