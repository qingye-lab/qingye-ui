import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { ScrollArea, ScrollAreaContent, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaViewport } from "../src/components/scroll-area";

test("the real scroll viewport is keyboard reachable and forwards ref/render/native events", () => {
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
