import * as React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Button } from "../src/components/button";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "../src/components/table";

describe("Table", () => {
  it("retains native caption, column and row headers and zero cells", () => {
    const ref = React.createRef<HTMLTableElement>();
    render(<TableContainer><Table ref={ref}><TableCaption>比较</TableCaption><TableHeader><TableRow><TableHead>名称</TableHead><TableHead>数量</TableHead></TableRow></TableHeader><TableBody><TableRow><TableHead scope="row">条目</TableHead><TableCell>{0}</TableCell></TableRow></TableBody></Table></TableContainer>);
    expect(ref.current).toBe(screen.getByRole("table", { name: "比较" })); expect(screen.getAllByRole("columnheader")).toHaveLength(2); expect(screen.getByRole("rowheader")).toHaveAttribute("scope", "row"); expect(screen.getByRole("cell")).toHaveTextContent("0");
  });
  it("leaves sorting and an empty-row span to the application", () => {
    const sort = vi.fn();
    render(<Table><TableHeader><TableRow><TableHead aria-sort="descending"><Button variant="quiet" onClick={sort}>排序</Button></TableHead><TableHead>第二列</TableHead></TableRow></TableHeader><TableBody><TableRow><TableCell colSpan={2}>无结果</TableCell></TableRow></TableBody></Table>);
    fireEvent.click(screen.getByRole("button")); expect(sort).toHaveBeenCalledOnce(); expect(screen.getByRole("columnheader", { name: "排序" })).toHaveAttribute("aria-sort", "descending"); expect(screen.getByRole("cell")).toHaveAttribute("colspan", "2"); expect(screen.getAllByRole("columnheader")).toHaveLength(2);
  });
  it("declares a numeric column on the header and its cells alike, not by content", () => {
    render(<Table><TableHeader><TableRow><TableHead>名称</TableHead><TableHead numeric>数量</TableHead></TableRow></TableHeader><TableBody><TableRow><TableHead scope="row">条目</TableHead><TableCell numeric>{12}</TableCell></TableRow><TableRow><TableHead scope="row">另一项</TableHead><TableCell>{34}</TableCell></TableRow></TableBody></Table>);
    expect(screen.getByRole("columnheader", { name: "数量" })).toHaveAttribute("data-numeric");
    expect(screen.getByRole("cell", { name: "12" })).toHaveAttribute("data-numeric");
    expect(screen.getByRole("columnheader", { name: "名称" })).not.toHaveAttribute("data-numeric");
    expect(screen.getByRole("cell", { name: "34" })).not.toHaveAttribute("data-numeric");
  });
  describe("keyboard scrolling stop", () => {
    // jsdom has no layout: the test supplies the measurements the browser would.
    function overflow(width: { scroll: number; client: number }) {
      const scroll = vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(width.scroll);
      const client = vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(width.client);
      return () => { scroll.mockRestore(); client.mockRestore(); };
    }
    it("is not a Tab stop while the content fits", () => {
      render(<TableContainer aria-label="放得下"><Table /></TableContainer>);
      expect(screen.getByLabelText("放得下")).not.toHaveAttribute("tabindex");
    });
    it("becomes a named, focusable region once the content overflows, borrowing the table's caption", () => {
      const restore = overflow({ scroll: 900, client: 300 });
      try {
        render(<TableContainer><Table><TableCaption>季度比较</TableCaption></Table></TableContainer>);
        const region = screen.getByRole("region", { name: "季度比较" });
        expect(region).toHaveAttribute("tabindex", "0");
      } finally { restore(); }
    });
    it("keeps a caller-supplied name and an unframed container focusable", () => {
      const restore = overflow({ scroll: 900, client: 300 });
      try {
        render(<TableContainer framed={false} aria-label="卡片内"><Table aria-label="表自己的名字" /></TableContainer>);
        expect(screen.getByRole("region", { name: "卡片内" })).toHaveAttribute("tabindex", "0");
      } finally { restore(); }
    });
    it("follows the container as its size changes", () => {
      let notify = () => {};
      const original = globalThis.ResizeObserver;
      globalThis.ResizeObserver = class { constructor(callback: () => void) { notify = callback; } observe() {} unobserve() {} disconnect() {} } as unknown as typeof ResizeObserver;
      try {
        render(<TableContainer aria-label="随尺寸"><Table /></TableContainer>);
        expect(screen.getByLabelText("随尺寸")).not.toHaveAttribute("tabindex");
        const restore = overflow({ scroll: 900, client: 300 });
        act(() => notify());
        expect(screen.getByLabelText("随尺寸")).toHaveAttribute("tabindex", "0");
        restore();
        act(() => notify());
        expect(screen.getByLabelText("随尺寸")).not.toHaveAttribute("tabindex");
      } finally { globalThis.ResizeObserver = original; }
    });
  });
  it("marks a sticky header for the caller to observe", () => {
    render(<Table><TableHeader sticky><TableRow><TableHead>名称</TableHead></TableRow></TableHeader></Table>);
    expect(screen.getByRole("columnheader").closest("thead")).toHaveAttribute("data-sticky", "true");
  });
  it("offsets a sticky header below a fixed bar, and ignores the offset when not sticky", () => {
    const { rerender } = render(<Table><TableHeader sticky stickyOffset={56}><TableRow><TableHead>名称</TableHead></TableRow></TableHeader></Table>);
    const head = () => screen.getByRole("columnheader").closest("thead")!;
    expect(head().style.top).toBe("56px");
    rerender(<Table><TableHeader sticky stickyOffset="var(--app-bar)"><TableRow><TableHead>名称</TableHead></TableRow></TableHeader></Table>);
    expect(head().style.top).toBe("var(--app-bar)");
    rerender(<Table><TableHeader stickyOffset={56}><TableRow><TableHead>名称</TableHead></TableRow></TableHeader></Table>);
    expect(head().style.top).toBe("");
  });
});
