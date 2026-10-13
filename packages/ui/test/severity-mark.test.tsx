import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SeverityMark } from "../src/components/severity-mark";

const states = (mark: HTMLElement) => [...mark.querySelectorAll("[data-slot=severity-mark-cell]")].map(cell => cell.getAttribute("data-state"));

test("the level is the number of filled cells and the empty cells stay to show the scale", () => {
  render(<><SeverityMark level={2} label="严重" tone="danger" /><SeverityMark level={1} max={5} label="提示" /></>);
  expect(states(screen.getByRole("img", { name: "严重" }))).toEqual(["filled", "filled", "empty"]);
  expect(states(screen.getByRole("img", { name: "提示" }))).toEqual(["filled", "empty", "empty", "empty", "empty"]);
});

test("the application's label is the one accessible name; cells and the visible name stay out of the tree", () => {
  render(<SeverityMark level={3} label="  高危  " tone="danger" />);
  const mark = screen.getByRole("img", { name: "高危" });
  expect(mark).toHaveTextContent("高危");
  for (const child of mark.children) expect(child).toHaveAttribute("aria-hidden", "true");
  expect(screen.getAllByRole("img")).toHaveLength(1);
});

test("a hidden name leaves only the cells on screen and keeps the accessible name", () => {
  render(<SeverityMark level={1} label="一般" tone="warning" name="hidden" />);
  const mark = screen.getByRole("img", { name: "一般" });
  expect(mark).not.toHaveTextContent("一般");
  expect(states(mark)).toEqual(["filled", "empty", "empty"]);
});

test("a missing or blank label is a readable error, not a TypeError", () => {
  // @ts-expect-error label is required
  expect(() => render(<SeverityMark level={1} />)).toThrow(/requires a non-empty label/);
  expect(() => render(<SeverityMark level={1} label="   " />)).toThrow(/requires a non-empty label/);
  // @ts-expect-error label must be a string
  expect(() => render(<SeverityMark level={1} label={3} />)).toThrow(/requires a non-empty label/);
});

test("level and max outside their integer ranges are rejected, never rounded", () => {
  for (const level of [0, 4, 1.5, Number.NaN]) expect(() => render(<SeverityMark level={level} label="x" />)).toThrow(RangeError);
  for (const max of [1, 6, 2.5]) expect(() => render(<SeverityMark level={1} max={max} label="x" />)).toThrow(RangeError);
  expect(() => render(<SeverityMark level={5} max={5} label="x" />)).not.toThrow();
});

test("an undeclared tone or name mode is rejected", () => {
  // @ts-expect-error tone is a closed set
  expect(() => render(<SeverityMark level={1} label="x" tone="critical" />)).toThrow(RangeError);
  // @ts-expect-error name is visible or hidden
  expect(() => render(<SeverityMark level={1} label="x" name="none" />)).toThrow(RangeError);
});

test("attributes, class and ref reach the rendered element", () => {
  let node: HTMLElement | null = null;
  render(<SeverityMark level={2} label="严重" id="s" className="custom" ref={element => { node = element; }} render={<strong />} />);
  const mark = screen.getByRole("img", { name: "严重" });
  expect(mark.tagName).toBe("STRONG");
  expect(mark).toHaveAttribute("id", "s");
  expect(mark).toHaveClass("custom");
  expect(node).toBe(mark);
});
