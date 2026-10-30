import { act, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { afterEach, expect, test, vi } from "vitest";
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "../src/components/scroll-area";

/* jsdom 不做布局：用可改的尺寸桩表示「内容是否溢出」，并捕获 ResizeObserver 的回调来模拟尺寸变化。 */
const metrics = { scrollHeight: 0, clientHeight: 0, scrollWidth: 0, clientWidth: 0 };
let notify: (() => void) | undefined;
function stubLayout(next: Partial<typeof metrics>) {
  Object.assign(metrics, { scrollHeight: 0, clientHeight: 0, scrollWidth: 0, clientWidth: 0 }, next);
  for (const key of Object.keys(metrics) as (keyof typeof metrics)[]) vi.spyOn(HTMLElement.prototype, key, "get").mockImplementation(() => metrics[key]);
  vi.stubGlobal("ResizeObserver", class { constructor(callback: () => void) { notify = callback; } observe() {} unobserve() {} disconnect() {} });
}
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals(); notify = undefined; });

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
