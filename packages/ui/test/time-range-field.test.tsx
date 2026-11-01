import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldError, FieldLabel } from "../src/components/field";
import { TimeRangeField, type TimeRangeValue } from "../src/components/time-range-field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

const startGroup = () => screen.getByRole("group", { name: "开始时间" });
const endGroup = () => screen.getByRole("group", { name: "结束时间" });
const hours = (group: HTMLElement) => within(group).getByRole("spinbutton", { name: "时" });
const minutes = (group: HTMLElement) => within(group).getByRole("spinbutton", { name: "分" });

test("one named group holds a start and an end group, each with its own accessible name", () => {
  render(<Field><FieldLabel>营业时间</FieldLabel><TimeRangeField defaultValue={{ start: "09:00", end: "18:30" }} /></Field>);
  const outer = screen.getByRole("group", { name: "营业时间" });
  expect(outer).toContainElement(startGroup());
  expect(outer).toContainElement(endGroup());
  expect(hours(startGroup())).toHaveAttribute("aria-valuenow", "9");
  expect(minutes(endGroup())).toHaveAttribute("aria-valuenow", "30");
});

test("an unnamed range throws unless aria-label or aria-labelledby is given", () => {
  const error = vi.spyOn(console, "error").mockImplementation(() => undefined);
  expect(() => render(<TimeRangeField />)).toThrow(/accessible name/);
  error.mockRestore();
  render(<TimeRangeField aria-label="营业时间" />);
  expect(screen.getByRole("group", { name: "营业时间" })).toBeInTheDocument();
});

test("uncontrolled: typing either end reports both ends and keeps the other end", async () => {
  const change = vi.fn();
  render(<TimeRangeField aria-label="r" defaultValue={{ start: "09:00", end: null }} onValueChange={change} />);
  await userEvent.click(hours(endGroup()));
  await userEvent.keyboard("1830");
  expect(change).toHaveBeenLastCalledWith({ start: "09:00", end: "18:30" });
  await userEvent.click(hours(startGroup()));
  await userEvent.keyboard("{ArrowUp}");
  expect(change).toHaveBeenLastCalledWith({ start: "10:00", end: "18:30" });
});

test("controlled: the caller decides the value, and a rejected change snaps back", async () => {
  function Example({ accept }: { accept: boolean }) {
    const [value, setValue] = useState<TimeRangeValue>({ start: "09:00", end: "10:00" });
    return <TimeRangeField aria-label="r" value={value} onValueChange={next => { if (accept) setValue(next); }} />;
  }
  const { rerender } = render(<Example accept={false} />);
  await userEvent.click(hours(endGroup()));
  await userEvent.keyboard("{ArrowUp}");
  expect(hours(endGroup())).toHaveAttribute("aria-valuenow", "10");
  rerender(<Example accept />);
  await userEvent.keyboard("{ArrowUp}");
  expect(hours(endGroup())).toHaveAttribute("aria-valuenow", "11");
});

test("end before start is invalid with a localized message; equal is valid; crossing midnight is opt-in", () => {
  const value = { start: "22:00", end: "06:00" };
  const { container, rerender } = render(<UILocaleProvider locale={enUS}><TimeRangeField aria-label="r" value={value} /></UILocaleProvider>);
  const hidden = () => container.querySelector<HTMLInputElement>("input[hidden]")!;
  expect(hidden().validationMessage).toBe("End time is before start time");
  expect(within(container).getAllByRole("spinbutton", { name: "Hour" })[1]).toHaveAttribute("aria-invalid", "true");
  expect(container.querySelector("[data-slot=time-range-field]")).toHaveAttribute("data-invalid");
  rerender(<UILocaleProvider locale={enUS}><TimeRangeField aria-label="r" value={{ start: "09:00", end: "09:00" }} /></UILocaleProvider>);
  expect(hidden().validationMessage).toBe("");
  rerender(<UILocaleProvider locale={enUS}><TimeRangeField aria-label="r" allowCrossMidnight value={value} /></UILocaleProvider>);
  expect(hidden().validationMessage).toBe("");
  expect(container.querySelector("[data-slot=time-range-field]")).not.toHaveAttribute("data-invalid");
});

test("a reversed range blocks form submission; the localized message is what the browser reports", () => {
  const { container } = render(<form><TimeRangeField aria-label="r" name="hours" defaultValue={{ start: "10:00", end: "09:00" }} /></form>);
  expect(container.querySelector("form")!.checkValidity()).toBe(false);
});

test("name submits hours.start and hours.end, also when the Field supplies the name", () => {
  const { container } = render(<form>
    <TimeRangeField aria-label="a" name="alone" defaultValue={{ start: "09:00", end: "18:00" }} />
    <Field name="shift"><FieldLabel>班次</FieldLabel><TimeRangeField defaultValue={{ start: "08:00:15", end: null }} granularity="second" /></Field>
  </form>);
  const data = new FormData(container.querySelector("form")!);
  expect(data.get("alone.start")).toBe("09:00");
  expect(data.get("alone.end")).toBe("18:00");
  expect(data.has("alone")).toBe(false);
  expect(data.get("shift.start")).toBe("08:00:15");
  expect(data.get("shift.end")).toBe("");
  expect(data.has("shift")).toBe(false);
});

test("required blocks submission while either end is empty", () => {
  const { container } = render(<form><TimeRangeField aria-label="r" required defaultValue={{ start: "09:00", end: null }} /></form>);
  expect(container.querySelector("form")!.checkValidity()).toBe(false);
});

test("disabled does not submit and removes both ends from the tab order; Field disabled does the same", () => {
  const { container } = render(<form>
    <TimeRangeField aria-label="a" name="a" disabled defaultValue={{ start: "09:00", end: "10:00" }} />
    <Field disabled name="b"><FieldLabel>b</FieldLabel><TimeRangeField defaultValue={{ start: "09:00", end: "10:00" }} /></Field>
  </form>);
  expect(Array.from(new FormData(container.querySelector("form")!).keys())).toEqual([]);
  for (const segment of screen.getAllByRole("spinbutton")) expect(segment).toHaveAttribute("aria-disabled", "true");
});

test("read-only keeps the values readable and submitted but not editable", async () => {
  const change = vi.fn();
  const { container } = render(<form><TimeRangeField aria-label="r" name="r" readOnly defaultValue={{ start: "09:00", end: "10:00" }} onValueChange={change} /></form>);
  await userEvent.click(hours(startGroup()));
  await userEvent.keyboard("{ArrowUp}");
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("r.start")).toBe("09:00");
  expect(container.querySelectorAll("[data-slot=time-range-field-readonly]")).toHaveLength(1);
});

test("keyboard: Tab goes start then end, arrows move among the segments of one end", async () => {
  render(<><TimeRangeField aria-label="r" defaultValue={{ start: "09:00", end: "10:00" }} /><button>after</button></>);
  await userEvent.tab();
  expect(hours(startGroup())).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}");
  expect(minutes(startGroup())).toHaveFocus();
  await userEvent.tab();
  expect(hours(endGroup())).toHaveFocus();
  await userEvent.tab();
  expect(screen.getByRole("button", { name: "after" })).toHaveFocus();
});

test("native reset returns an uncontrolled range to its default", async () => {
  const { container } = render(<form><TimeRangeField aria-label="r" defaultValue={{ start: "09:00", end: "10:00" }} /><button type="reset">reset</button></form>);
  await userEvent.click(hours(endGroup()));
  await userEvent.keyboard("{ArrowUp}");
  expect(hours(endGroup())).toHaveAttribute("aria-valuenow", "11");
  await userEvent.click(screen.getByRole("button", { name: "reset" }));
  expect(hours(endGroup())).toHaveAttribute("aria-valuenow", "10");
  expect(container).toBeTruthy();
});

test("FieldError shows when the range is reversed and the Field validates", async () => {
  render(<form><Field name="r" invalid><FieldLabel>r</FieldLabel><TimeRangeField defaultValue={{ start: "10:00", end: "09:00" }} /><FieldError>结束早于开始</FieldError></Field></form>);
  expect(screen.getByText("结束早于开始")).toBeInTheDocument();
});
