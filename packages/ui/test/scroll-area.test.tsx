import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { ScrollArea } from "../src/components/scroll-area";

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
