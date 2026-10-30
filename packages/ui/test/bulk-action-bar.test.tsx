import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { act } from "@testing-library/react";
import { BulkActionBar, BulkActionBarAction, BulkActionBarClear, BulkActionBarExtend } from "../src/components/bulk-action-bar";
describe("BulkActionBar", () => {
  it("shows explicit targets, zero version and scope and executes the current snapshot", () => {
    const execute = vi.fn(); const { rerender } = render(<BulkActionBar targets={[{ id: "a", label: "A", version: 0 }]} scope="本集合所选项"><BulkActionBarAction onExecute={execute}>操作</BulkActionBarAction></BulkActionBar>); expect(screen.getByRole("group", { name: "本集合所选项" })).toBeInTheDocument(); expect(screen.getByText((_, el) => el?.tagName === "LI" && el.textContent === "A · 版本 0")).toBeInTheDocument(); rerender(<BulkActionBar targets={[{ id: "b", label: "B", version: 2 }]} scope="另一明确范围"><BulkActionBarAction onExecute={execute}>操作</BulkActionBarAction></BulkActionBar>); fireEvent.click(screen.getByRole("button")); expect(execute.mock.calls[0]?.[0]).toEqual({ targets: [{ id: "b", label: "B", version: 2 }], scope: "另一明确范围" });
  });
  it("honors public Base UI cancellation for execute and clear", () => {
    const execute = vi.fn(); const clear = vi.fn(); render(<BulkActionBar targets={[{ id: "a", label: "A", version: 0 }]} scope="所选项" onClear={clear}><BulkActionBarAction onClick={event => event.preventBaseUIHandler()} onExecute={execute}>操作</BulkActionBarAction><BulkActionBarClear onClick={event => event.preventBaseUIHandler()} /></BulkActionBar>); fireEvent.click(screen.getByRole("button", { name: "操作" })); fireEvent.click(screen.getByRole("button", { name: "清除选择" })); expect(execute).not.toHaveBeenCalled(); expect(clear).not.toHaveBeenCalled();
  });
  it("prevents zero-selection execution and keeps canceled actions from clearing facts", () => {
    const execute = vi.fn(); const clear = vi.fn(); const { rerender } = render(<BulkActionBar targets={[]} scope="所选项" onClear={clear}><BulkActionBarAction onExecute={execute}>操作</BulkActionBarAction><BulkActionBarClear /></BulkActionBar>); fireEvent.click(screen.getByRole("button", { name: "操作" })); expect(execute).not.toHaveBeenCalled(); rerender(<BulkActionBar targets={[{ id: "a", label: "A", version: "v1" }]} scope="所选项" onClear={clear}><BulkActionBarAction onClick={event => event.preventDefault()} onExecute={execute}>操作</BulkActionBarAction><BulkActionBarClear onClick={event => event.preventDefault()} /></BulkActionBar>); fireEvent.click(screen.getByRole("button", { name: "操作" })); fireEvent.click(screen.getByRole("button", { name: "清除选择" })); expect(execute).not.toHaveBeenCalled(); expect(clear).not.toHaveBeenCalled(); expect(screen.getByText((_, el) => el?.tagName === "LI" && el.textContent === "A · 版本 v1")).toBeInTheDocument();
  });
  it("expresses an application-defined extent without listing targets and keeps actions usable", () => {
    const execute = vi.fn(); render(<BulkActionBar targets={[]} extent={{ count: 1284, label: "符合当前筛选的全部订单" }} scope="订单筛选结果"><BulkActionBarAction onExecute={execute}>操作</BulkActionBarAction></BulkActionBar>);
    expect(screen.getByText("已选 1,284 项")).toBeInTheDocument(); expect(screen.getByText("符合当前筛选的全部订单")).toBeInTheDocument(); expect(screen.getByRole("group")).toHaveAttribute("data-extent");
    fireEvent.click(screen.getByRole("button", { name: "操作" })); expect(execute.mock.calls[0]?.[0]).toEqual({ targets: [], scope: "订单筛选结果", extent: { count: 1284, label: "符合当前筛选的全部订单" } });
  });
  it("rejects an invalid extent", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    for (const extent of [{ count: 0, label: "全部" }, { count: 1.5, label: "全部" }, { count: 3, label: " " }]) expect(() => render(<BulkActionBar targets={[]} extent={extent} scope="范围" />)).toThrow(); spy.mockRestore();
  });
  it("offers a grouped extend action only when rendered and reports the click", () => {
    const extend = vi.fn(); render(<BulkActionBar targets={[{ id: "a", label: "A", version: 1 }]} scope="范围"><BulkActionBarExtend count={1284} onExtend={extend} /></BulkActionBar>);
    fireEvent.click(screen.getByRole("button", { name: "选择全部 1,284 项" })); expect(extend).toHaveBeenCalledOnce();
  });
  it("marks sticky bars and shows the stuck state only when the sentinel leaves above the container", () => {
    let callback: IntersectionObserverCallback = () => {}; const original = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = class { constructor(cb: IntersectionObserverCallback) { callback = cb; } observe() {} disconnect() {} unobserve() {} takeRecords() { return []; } } as unknown as typeof IntersectionObserver;
    try {
      render(<BulkActionBar sticky targets={[{ id: "a", label: "A", version: 1 }]} scope="范围" />); const bar = screen.getByRole("group"); expect(bar).toHaveAttribute("data-sticky"); expect(bar).not.toHaveAttribute("data-stuck");
      act(() => callback([{ intersectionRatio: 0.9, boundingClientRect: { top: -1 }, rootBounds: { top: 0 } } as IntersectionObserverEntry], {} as IntersectionObserver)); expect(bar).toHaveAttribute("data-stuck");
      act(() => callback([{ intersectionRatio: 1, boundingClientRect: { top: 40 }, rootBounds: { top: 0 } } as IntersectionObserverEntry], {} as IntersectionObserver)); expect(bar).not.toHaveAttribute("data-stuck");
    } finally { globalThis.IntersectionObserver = original; }
  });
});
