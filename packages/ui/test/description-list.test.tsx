import { act, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "../src/components/description-list";

describe("DescriptionList", () => {
  it("preserves native dt/dd relationships and zero", () => {
    const { container } = render(<DescriptionList><DescriptionListItem><DescriptionListTerm>数量</DescriptionListTerm><DescriptionListDetail>{0}</DescriptionListDetail></DescriptionListItem></DescriptionList>);
    expect(container.querySelector("dl > div > dt")).toHaveTextContent("数量"); expect(container.querySelector("dl > div > dd")).toHaveTextContent("0");
  });
  it("retains caller uncertainty and structured links", () => {
    render(<DescriptionList><DescriptionListItem><DescriptionListTerm>值</DescriptionListTerm><DescriptionListDetail>未知</DescriptionListDetail></DescriptionListItem><DescriptionListItem><DescriptionListTerm>入口</DescriptionListTerm><DescriptionListDetail><a href="/detail">详情</a></DescriptionListDetail></DescriptionListItem></DescriptionList>);
    expect(screen.getByText("未知").tagName).toBe("DD"); expect(screen.getByRole("link")).toHaveAttribute("href", "/detail");
  });
});

const items = (count: number) => Array.from({ length: count }, (_, i) => <DescriptionListItem key={i}><DescriptionListTerm>名称{i}</DescriptionListTerm><DescriptionListDetail>值{i}</DescriptionListDetail></DescriptionListItem>);
const fitWidth = (width: number, fen = 4) => {
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockImplementation(() => width);
  vi.spyOn(window, "getComputedStyle").mockImplementation(() => ({ columnGap: "16px", getPropertyValue: (name: string) => name === "--qy-fen" ? `${fen}px` : "" }) as unknown as CSSStyleDeclaration);
};
describe("DescriptionList columns and layout", () => {
  afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
  it("keeps the dt/dd order in the DOM, which is the reading order, however many columns are asked for", () => {
    const { container } = render(<DescriptionList columns={3}>{items(5)}</DescriptionList>);
    expect([...container.querySelectorAll("dt, dd")].map(node => node.textContent)).toEqual(["名称0", "值0", "名称1", "值1", "名称2", "值2", "名称3", "值3", "名称4", "值4"]);
    expect(container.querySelectorAll("dl > div > dt")).toHaveLength(5);
  });
  it("uses the requested columns until a width is measured, then falls back to fewer when the container is narrow", () => {
    let notify: (() => void) | undefined;
    vi.stubGlobal("ResizeObserver", class { constructor(callback: () => void) { notify = callback; } observe() {} unobserve() {} disconnect() {} });
    const { container } = render(<DescriptionList columns={3}>{items(3)}</DescriptionList>);
    const list = container.querySelector("dl")!;
    expect(list).toHaveAttribute("data-columns", "3");
    // 一组至少 60 分 = 240px，组间 16px：600px 放两组，900px 放三组，200px 只放一组。
    fitWidth(600); act(() => notify?.()); expect(list).toHaveAttribute("data-columns", "2");
    fitWidth(900); act(() => notify?.()); expect(list).toHaveAttribute("data-columns", "3");
    fitWidth(200); act(() => notify?.()); expect(list).toHaveAttribute("data-columns", "1");
  });
  it("never exceeds the requested columns and rejects nonsense", () => {
    expect(() => render(<DescriptionList columns={0}>{items(1)}</DescriptionList>)).toThrow(/positive integer/);
    expect(() => render(<DescriptionList columns={1.5}>{items(1)}</DescriptionList>)).toThrow(/positive integer/);
  });
  it("inline layout keeps dl/dt/dd, with the name before the value in each item", () => {
    const { container } = render(<DescriptionList layout="inline">{items(3)}</DescriptionList>);
    const list = container.querySelector("dl")!;
    expect(list).toHaveAttribute("data-layout", "inline");
    expect(container.querySelectorAll("dl > div")).toHaveLength(3);
    for (const item of container.querySelectorAll("dl > div")) expect([...item.children].map(node => node.tagName)).toEqual(["DT", "DD"]);
  });
});
