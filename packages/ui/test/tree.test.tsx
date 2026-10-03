import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tree, type TreeNode } from "../src/components/tree";
const nodes: TreeNode[] = [{ id: "a", label: "A", children: [{ id: "disabled", label: "禁用", disabled: true }, { id: "child", label: "Child" }] }, { id: "b", label: "B" }];
describe("Tree", () => {
  it("separates expansion, focus and selection with a real return path", async () => {
    const user = userEvent.setup(); render(<Tree aria-label="层级" nodes={nodes} />); await user.tab(); expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveAttribute("aria-expanded", "true"); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("treeitem", { name: "Child" })).toHaveFocus(); expect(screen.getByRole("treeitem", { name: "Child" })).toHaveAttribute("aria-selected", "false"); await user.keyboard("{Enter}"); expect(screen.getByRole("treeitem", { name: "Child" })).toHaveAttribute("aria-selected", "true"); await user.keyboard("{ArrowLeft}{ArrowLeft}"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus(); expect(screen.queryByRole("treeitem", { name: "Child" })).toBeNull();
  });
  it("honors cancellation and skips disabled nodes during letter navigation", async () => {
    const user = userEvent.setup(); const select = vi.fn((_, details) => details.cancel()); render(<Tree nodes={nodes} onExpandedChange={(_, details) => details.cancel()} onSelectionChange={select} />); await user.tab(); await user.keyboard("{ArrowRight}{Enter}"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveAttribute("aria-expanded", "false"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveAttribute("aria-selected", "false"); await user.keyboard("b"); expect(screen.getByRole("treeitem", { name: "B" })).toHaveFocus();
  });
  it("keeps stable focus through reorder and repairs a removed focused node", async () => {
    const user = userEvent.setup(); const { rerender } = render(<Tree nodes={nodes} />); await user.tab(); await user.keyboard("{End}"); expect(screen.getByRole("treeitem", { name: "B" })).toHaveFocus(); rerender(<Tree nodes={[nodes[1]!, nodes[0]!]} />); expect(screen.getByRole("treeitem", { name: "B" })).toHaveFocus(); rerender(<Tree nodes={[nodes[0]!]} />); await waitFor(() => expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus());
  });
  it("returns owned focus to the empty container without taking outside focus", async () => {
    const user = userEvent.setup(); const ref = { current: null as HTMLDivElement | null }; const { rerender } = render(<><Tree nodes={nodes} ref={ref} /><button>外部</button></>);
    await user.tab(); expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus(); rerender(<><Tree nodes={[]} ref={ref} /><button>外部</button></>);
    expect(screen.getByRole("tree")).toHaveFocus(); expect(ref.current).toBe(screen.getByRole("tree"));
    await user.click(screen.getByRole("button", { name: "外部" })); rerender(<><Tree nodes={nodes} ref={ref} /><button>外部</button></>); expect(screen.getByRole("button", { name: "外部" })).toHaveFocus();
  });
  it("shows a known empty sequence and rejects ambiguous duplicate identities", () => {
    const { unmount } = render(<Tree nodes={[]} />); expect(screen.getByText("没有条目")).toBeInTheDocument(); unmount(); expect(() => render(<Tree nodes={[{ id: "same", label: "一" }, { id: "same", label: "二" }]} />)).toThrow("unique");
  });
});
