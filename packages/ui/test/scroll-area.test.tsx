import { act, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "../src/components/scroll-area";

/* jsdom 不做布局：用可改的尺寸桩表示「内容是否溢出」，并捕获 ResizeObserver 的回调来模拟尺寸变化。 */
const metrics = { scrollHeight: 0, clientHeight: 0, scrollWidth: 0, clientWidth: 0 };
let notify: (() => void) | undefined;
let callbacks: (() => void)[] = [];
function stubLayout(next: Partial<typeof metrics>) {
  Object.assign(metrics, { scrollHeight: 0, clientHeight: 0, scrollWidth: 0, clientWidth: 0 }, next);
  for (const key of Object.keys(metrics) as (keyof typeof metrics)[]) vi.spyOn(HTMLElement.prototype, key, "get").mockImplementation(() => metrics[key]);
  vi.stubGlobal("ResizeObserver", class { constructor(callback: () => void) { callbacks.push(callback); notify = () => callbacks.forEach(run => run()); } observe() {} unobserve() {} disconnect() {} });
}
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); notify = undefined; callbacks = []; });

test("an overflowing area is reachable by keyboard; one that fits is not a tab stop", () => {
  stubLayout({ scrollHeight: 400, clientHeight: 100 });
  render(<ScrollArea aria-label="条目">很长</ScrollArea>);
  const viewport = screen.getByLabelText("条目");
  expect(viewport).toHaveAttribute("tabindex", "0");
  act(() => { metrics.scrollHeight = 100; notify?.(); });
  expect(viewport).not.toHaveAttribute("tabindex");
  act(() => { metrics.scrollWidth = 500; metrics.clientWidth = 200; notify?.(); });
  expect(viewport).toHaveAttribute("tabindex", "0");
});

test("an explicit tabIndex from the caller is kept whether or not the content overflows", () => {
  stubLayout({});
  render(<ScrollArea aria-label="条目" tabIndex={-1}>短</ScrollArea>);
  expect(screen.getByLabelText("条目")).toHaveAttribute("tabindex", "-1");
});

test("the real scroll viewport is keyboard reachable and forwards ref/render/native events", () => {
  stubLayout({ scrollHeight: 400, clientHeight: 100 });
  const ref = createRef<HTMLDivElement>();
  const onScroll = vi.fn();
  const onKeyDown = vi.fn();
  render(<ScrollArea aria-label="条目" ref={ref} onScroll={onScroll} onKeyDown={onKeyDown} render={<div data-custom="yes" />}>末项</ScrollArea>);
  const viewport = screen.getByLabelText("条目");
  expect(ref.current).toBe(viewport);
  expect(viewport).toHaveAttribute("tabindex", "0");
  viewport.focus();
  expect(viewport).toHaveFocus();
  fireEvent.scroll(viewport, { target: { scrollTop: 120 } });
  fireEvent.keyDown(viewport, { key: "PageDown" });
  expect(viewport.scrollTop).toBe(120);
  expect(onScroll).toHaveBeenCalledOnce();
  expect(onKeyDown).toHaveBeenCalledOnce();
  expect(onKeyDown.mock.calls[0]![0].defaultPrevented).toBe(false);
  expect(viewport).toHaveAttribute("data-custom", "yes");
});

test("styled composition keeps distinct root and viewport refs and forwards actual scrolling", () => {
  const root = createRef<HTMLDivElement>();
  const viewport = createRef<HTMLDivElement>();
  const thumb = createRef<HTMLDivElement>();
  const onScroll = vi.fn();
  render(<ScrollAreaRoot ref={root} data-testid="styled-root">
    <ScrollAreaViewport ref={viewport} aria-label="自定义滚动条内容" role="region" tabIndex={0} onScroll={onScroll} render={<section />}>
      <ScrollAreaContent><button>保留的内容操作</button></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar keepMounted data-testid="vertical-track"><ScrollAreaThumb ref={thumb} data-testid="vertical-thumb" /></ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="horizontal" keepMounted data-testid="horizontal-track" />
    <ScrollAreaCorner />
  </ScrollAreaRoot>);
  const element = screen.getByRole("region", { name: "自定义滚动条内容" });
  expect(root.current).toBe(screen.getByTestId("styled-root"));
  expect(viewport.current).toBe(element);
  expect(element.tagName).toBe("SECTION");
  expect(element).toContainElement(screen.getByRole("button", { name: "保留的内容操作" }));
  expect(thumb.current).toBe(screen.getByTestId("vertical-thumb"));
  expect(screen.getByTestId("vertical-track")).toHaveAttribute("aria-hidden", "true");
  expect(screen.getByTestId("horizontal-track").querySelector('[data-slot="scroll-area-thumb"]')).not.toBeNull();
  element.focus();
  expect(element).toHaveFocus();
  fireEvent.scroll(element, { target: { scrollTop: 70, scrollLeft: 20 } });
  expect(element.scrollTop).toBe(70);
  expect(element.scrollLeft).toBe(20);
  expect(onScroll).toHaveBeenCalledOnce();
});

/* fade：竖向的偏移读 scrollTop，横向读 scrollLeft；jsdom 里这两个是可写的普通属性。 */
test("fade marks only the ends that are actually cut off, and follows scrolling", () => {
  stubLayout({ scrollHeight: 400, clientHeight: 100 });
  render(<ScrollArea fade aria-label="条目">很长</ScrollArea>);
  const viewport = screen.getByLabelText("条目");
  expect(viewport).not.toHaveAttribute("data-overflow-y-start");
  expect(viewport).toHaveAttribute("data-overflow-y-end");
  fireEvent.scroll(viewport, { target: { scrollTop: 150 } });
  expect(viewport).toHaveAttribute("data-overflow-y-start");
  expect(viewport).toHaveAttribute("data-overflow-y-end");
  fireEvent.scroll(viewport, { target: { scrollTop: 300 } });
  expect(viewport).toHaveAttribute("data-overflow-y-start");
  expect(viewport).not.toHaveAttribute("data-overflow-y-end");
  expect(viewport).not.toHaveAttribute("data-overflow-x-start");
  expect(viewport).not.toHaveAttribute("data-overflow-x-end");
});

test("fade measures the horizontal axis independently, in either direction", () => {
  stubLayout({ scrollWidth: 500, clientWidth: 200 });
  render(<ScrollArea fade aria-label="条目">很宽</ScrollArea>);
  const viewport = screen.getByLabelText("条目");
  expect(viewport).toHaveAttribute("data-overflow-x-end");
  expect(viewport).not.toHaveAttribute("data-overflow-x-start");
  expect(viewport).not.toHaveAttribute("data-overflow-y-end");
  fireEvent.scroll(viewport, { target: { scrollLeft: -300 } });
  expect(viewport).toHaveAttribute("data-overflow-x-start");
  expect(viewport).not.toHaveAttribute("data-overflow-x-end");
});

test("fade appears and disappears when the content grows or shrinks, and a fitting area has no fade", () => {
  stubLayout({ scrollHeight: 100, clientHeight: 100 });
  render(<ScrollArea fade aria-label="条目">短</ScrollArea>);
  const viewport = screen.getByLabelText("条目");
  expect(viewport.getAttributeNames().filter(name => name.startsWith("data-overflow"))).toEqual([]);
  act(() => { metrics.scrollHeight = 400; notify?.(); });
  expect(viewport).toHaveAttribute("data-overflow-y-end");
  act(() => { metrics.scrollHeight = 100; notify?.(); });
  expect(viewport).not.toHaveAttribute("data-overflow-y-end");
});

test("fade keeps the plain contract: ref, tabIndex and native events", () => {
  stubLayout({ scrollHeight: 400, clientHeight: 100 });
  const ref = createRef<HTMLDivElement>();
  const onScroll = vi.fn();
  render(<ScrollArea fade aria-label="条目" ref={ref} onScroll={onScroll}>末项</ScrollArea>);
  const viewport = screen.getByLabelText("条目");
  expect(ref.current).toBe(viewport);
  expect(viewport).toHaveAttribute("tabindex", "0");
  fireEvent.scroll(viewport, { target: { scrollTop: 10 } });
  expect(onScroll).toHaveBeenCalledOnce();
});

test("without fade no edge attributes are exposed", () => {
  stubLayout({ scrollHeight: 400, clientHeight: 100 });
  render(<ScrollArea aria-label="条目">很长</ScrollArea>);
  expect(screen.getByLabelText("条目").getAttributeNames().filter(name => name.startsWith("data-overflow"))).toEqual([]);
});
