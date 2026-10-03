import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BulkActionBar, BulkActionBarAction, BulkActionBarClear } from "../src/components/bulk-action-bar";
describe("BulkActionBar", () => {
  it("shows explicit targets, zero version and scope and executes the current snapshot", () => {
    const execute = vi.fn(); const { rerender } = render(<BulkActionBar targets={[{ id: "a", label: "A", version: 0 }]} scope="本集合所选项"><BulkActionBarAction onExecute={execute}>操作</BulkActionBarAction></BulkActionBar>); expect(screen.getByRole("group", { name: "本集合所选项" })).toBeInTheDocument(); expect(screen.getByText("A · 版本 0")).toBeInTheDocument(); rerender(<BulkActionBar targets={[{ id: "b", label: "B", version: 2 }]} scope="另一明确范围"><BulkActionBarAction onExecute={execute}>操作</BulkActionBarAction></BulkActionBar>); fireEvent.click(screen.getByRole("button")); expect(execute.mock.calls[0]?.[0]).toEqual({ targets: [{ id: "b", label: "B", version: 2 }], scope: "另一明确范围" });
  });
  it("honors public Base UI cancellation for execute and clear", () => {
    const execute = vi.fn(); const clear = vi.fn(); render(<BulkActionBar targets={[{ id: "a", label: "A", version: 0 }]} scope="所选项" onClear={clear}><BulkActionBarAction onClick={event => event.preventBaseUIHandler()} onExecute={execute}>操作</BulkActionBarAction><BulkActionBarClear onClick={event => event.preventBaseUIHandler()} /></BulkActionBar>); fireEvent.click(screen.getByRole("button", { name: "操作" })); fireEvent.click(screen.getByRole("button", { name: "清除选择" })); expect(execute).not.toHaveBeenCalled(); expect(clear).not.toHaveBeenCalled();
  });
  it("prevents zero-selection execution and keeps canceled actions from clearing facts", () => {
    const execute = vi.fn(); const clear = vi.fn(); const { rerender } = render(<BulkActionBar targets={[]} scope="所选项" onClear={clear}><BulkActionBarAction onExecute={execute}>操作</BulkActionBarAction><BulkActionBarClear /></BulkActionBar>); fireEvent.click(screen.getByRole("button", { name: "操作" })); expect(execute).not.toHaveBeenCalled(); rerender(<BulkActionBar targets={[{ id: "a", label: "A", version: "v1" }]} scope="所选项" onClear={clear}><BulkActionBarAction onClick={event => event.preventDefault()} onExecute={execute}>操作</BulkActionBarAction><BulkActionBarClear onClick={event => event.preventDefault()} /></BulkActionBar>); fireEvent.click(screen.getByRole("button", { name: "操作" })); fireEvent.click(screen.getByRole("button", { name: "清除选择" })); expect(execute).not.toHaveBeenCalled(); expect(clear).not.toHaveBeenCalled(); expect(screen.getByText("A · 版本 v1")).toBeInTheDocument();
  });
});
