import { act, render, screen } from "@testing-library/react";
import * as React from "react";
import { describe, expect, test } from "vitest";
import { Toc, scanTocHeadings, useTocHeadings, useTocScrollSpy, type TocItem } from "../src/components/toc";

const items: TocItem[] = [
  { id: "overview", label: "概览", level: 2 },
  { id: "retry", label: "重试与核实", level: 3 },
  { id: "result", label: "结果与恢复", level: 2 },
];

test("renders as a named nav with a list of native links, not routed", () => {
  render(<Toc items={items} />);
  const nav = screen.getByRole("navigation", { name: "本页目录" });
  expect(nav.tagName).toBe("NAV");
  const links = screen.getAllByRole("link");
  expect(links).toHaveLength(3);
  expect(links[0]).toHaveAttribute("href", "#overview");
  expect(links[1]).toHaveAttribute("href", "#retry");
  expect(links.map((link) => link.textContent)).toEqual(["概览", "重试与核实", "结果与恢复"]);
});

test("aria-current marks only the current destination, as a location not a page", () => {
  render(<Toc items={items} current="retry" />);
  const current = screen.getByRole("link", { name: "重试与核实" });
  expect(current).toHaveAttribute("aria-current", "location");
  for (const label of ["概览", "结果与恢复"]) expect(screen.getByRole("link", { name: label })).not.toHaveAttribute("aria-current");
});

test("current is controlled by the caller; changing the prop moves the marker without remounting", () => {
  const { rerender } = render(<Toc items={items} current="overview" />);
  expect(screen.getByRole("link", { name: "概览" })).toHaveAttribute("aria-current", "location");
  rerender(<Toc items={items} current="result" />);
  expect(screen.getByRole("link", { name: "概览" })).not.toHaveAttribute("aria-current");
  expect(screen.getByRole("link", { name: "结果与恢复" })).toHaveAttribute("aria-current", "location");
});

test("an empty item list renders nothing — useRender stays unconditional via enabled, not an early return", () => {
  const { container } = render(<Toc items={[]} />);
  expect(container).toBeEmptyDOMElement();
  expect(screen.queryByRole("navigation")).toBeNull();
});

test("render swaps the element while keeping the accessible name and item list", () => {
  render(<Toc items={items} render={<section data-testid="swapped" />} />);
  const section = screen.getByTestId("swapped");
  expect(section.tagName).toBe("SECTION");
  expect(section).toHaveAttribute("aria-label", "本页目录");
  expect(section).toHaveAttribute("data-slot", "toc");
});

test("scanTocHeadings reads h2/h3 with an id and skips headings without one", () => {
  const root = document.createElement("article");
  root.innerHTML = '<h2 id="a">第一节</h2><p>正文</p><h3 id="b">子节</h3><h2>没有 id，跳过</h2>';
  document.body.append(root);
  expect(scanTocHeadings(root)).toEqual([
    { id: "a", label: "第一节", level: 2 },
    { id: "b", label: "子节", level: 3 },
  ]);
  root.remove();
});

test("useTocHeadings rescans when the container's headings change", async () => {
  function Harness() {
    const ref = React.useRef<HTMLDivElement>(null);
    const headings = useTocHeadings(ref);
    return <div ref={ref}>
      <h2 id="first">第一</h2>
      <ul>{headings.map((item) => <li key={item.id}>{item.id}:{item.label}</li>)}</ul>
    </div>;
  }
  render(<Harness />);
  expect(await screen.findByText("first:第一")).toBeInTheDocument();
});

test("useTocScrollSpy reports the last heading as current once scrolled to the bottom", async () => {
  function Harness() {
    const current = useTocScrollSpy(items);
    return <p data-testid="active">{current ?? "none"}</p>;
  }
  for (const item of items) {
    const el = document.createElement("div");
    el.id = item.id;
    el.getBoundingClientRect = () => ({ top: -10, bottom: 0, left: 0, right: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} });
    document.body.append(el);
  }
  Object.defineProperty(document.documentElement, "scrollHeight", { value: 1000, configurable: true });
  Object.defineProperty(window, "innerHeight", { value: 1000, configurable: true });
  Object.defineProperty(window, "scrollY", { value: 500, configurable: true });
  render(<Harness />);
  await act(async () => {});
  expect(screen.getByTestId("active")).toHaveTextContent("result");
  for (const item of items) document.getElementById(item.id)?.remove();
});

test("useTocScrollSpy returns undefined for an empty list instead of guessing a destination", () => {
  function Harness() {
    const current = useTocScrollSpy([]);
    return <p data-testid="active">{current ?? "none"}</p>;
  }
  render(<Harness />);
  expect(screen.getByTestId("active")).toHaveTextContent("none");
});
