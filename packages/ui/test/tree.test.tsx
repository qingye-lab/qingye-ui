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
const checkNodes: TreeNode[] = [{ id: "p", label: "父", children: [{ id: "p1", label: "子一" }, { id: "p2", label: "子二" }, { id: "p3", label: "禁用子", disabled: true }] }, { id: "q", label: "独立叶子" }];
describe("Tree checkable", () => {
  it("cascades a branch click onto enabled leaves, derives mixed/true without aria-multiselectable", async () => {
    const user = userEvent.setup(); render(<Tree aria-label="权限" nodes={checkNodes} checkable defaultExpandedIds={["p"]} />);
    // 勾选模式的条目用 aria-checked，不用 aria-selected，因此树不声明 multiselectable。
    expect(screen.getByRole("tree")).not.toHaveAttribute("aria-multiselectable");
    expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "false");
    await user.click(screen.getByRole("treeitem", { name: "子一" }));
    expect(screen.getByRole("treeitem", { name: "子一" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "mixed");
    await user.click(screen.getByRole("treeitem", { name: "父" }));
    expect(screen.getByRole("treeitem", { name: "子一" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("treeitem", { name: "子二" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("treeitem", { name: "禁用子" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("treeitem", { name: "父" }));
    expect(screen.getByRole("treeitem", { name: "子一" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("treeitem", { name: "子二" })).toHaveAttribute("aria-checked", "false");
    expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "false");
  });
  it("preserves a disabled leaf's own checked fact through cascade in either direction", async () => {
    const user = userEvent.setup(); render(<Tree aria-label="权限" nodes={checkNodes} checkable defaultExpandedIds={["p"]} defaultCheckedIds={["p3"]} />);
    expect(screen.getByRole("treeitem", { name: "禁用子" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "false");
    await user.click(screen.getByRole("treeitem", { name: "父" }));
    expect(screen.getByRole("treeitem", { name: "禁用子" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "true");
    await user.click(screen.getByRole("treeitem", { name: "父" }));
    expect(screen.getByRole("treeitem", { name: "禁用子" })).toHaveAttribute("aria-checked", "true");
    expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "false");
  });
  it("supports controlled checkedIds and honors cancellation without emitting leaf ids for a branch", async () => {
    const user = userEvent.setup(); const onCheckedChange = vi.fn();
    const { rerender } = render(<Tree aria-label="权限" nodes={checkNodes} checkable defaultExpandedIds={["p"]} checkedIds={[]} onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("treeitem", { name: "父" }));
    expect(onCheckedChange).toHaveBeenCalledWith(expect.arrayContaining(["p1", "p2"]), expect.anything());
    expect(onCheckedChange.mock.calls[0]![0]).not.toContain("p");
    expect(screen.getByRole("treeitem", { name: "子一" })).toHaveAttribute("aria-checked", "false");
    rerender(<Tree aria-label="权限" nodes={checkNodes} checkable defaultExpandedIds={["p"]} checkedIds={["p1", "p2"]} onCheckedChange={onCheckedChange} />);
    expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "true");
    const cancel = vi.fn((_, details) => details.cancel());
    rerender(<Tree aria-label="权限" nodes={checkNodes} checkable defaultExpandedIds={["p"]} checkedIds={["p1", "p2"]} onCheckedChange={cancel} />);
    await user.click(screen.getByRole("treeitem", { name: "父" }));
    expect(cancel).toHaveBeenCalled(); expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-checked", "true");
  });
  it("toggles the focused node with Space, leaves Enter a no-op, and keeps arrow navigation", async () => {
    const user = userEvent.setup(); render(<Tree aria-label="权限" nodes={checkNodes} checkable />);
    await user.tab(); expect(screen.getByRole("treeitem", { name: "父" })).toHaveFocus();
    await user.keyboard("{ArrowRight}"); expect(screen.getByRole("treeitem", { name: "父" })).toHaveAttribute("aria-expanded", "true");
    await user.keyboard("{ArrowDown}"); expect(screen.getByRole("treeitem", { name: "子一" })).toHaveFocus();
    await user.keyboard(" "); expect(screen.getByRole("treeitem", { name: "子一" })).toHaveAttribute("aria-checked", "true");
    await user.keyboard("{Enter}"); expect(screen.getByRole("treeitem", { name: "子一" })).toHaveAttribute("aria-checked", "true");
    await user.keyboard(" "); expect(screen.getByRole("treeitem", { name: "子一" })).toHaveAttribute("aria-checked", "false");
  });
});
