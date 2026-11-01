import { createEvent, fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Tree, type TreeNode } from "../src/components/tree";
const nodes: TreeNode[] = [{ id: "a", label: "A", children: [{ id: "disabled", label: "禁用", disabled: true }, { id: "child", label: "Child" }] }, { id: "b", label: "B" }];
describe("Tree", () => {
  it("separates expansion, focus and selection with a real return path", async () => {
    const user = userEvent.setup(); render(<Tree aria-label="层级" nodes={nodes} />); await user.tab(); expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveAttribute("aria-expanded", "true"); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("treeitem", { name: "Child" })).toHaveFocus(); expect(screen.getByRole("treeitem", { name: "Child" })).toHaveAttribute("aria-selected", "false"); await user.keyboard("{Enter}"); expect(screen.getByRole("treeitem", { name: "Child" })).toHaveAttribute("aria-selected", "true"); await user.keyboard("{ArrowLeft}{ArrowLeft}"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus(); expect(screen.queryByRole("treeitem", { name: "Child" })).toBeNull();
  });
  it("honors cancellation and skips disabled nodes during letter navigation", async () => {
    const user = userEvent.setup(); const select = vi.fn((_, details) => details.cancel()); render(<Tree aria-label="层级" nodes={nodes} onExpandedChange={(_, details) => details.cancel()} onSelectionChange={select} />); await user.tab(); await user.keyboard("{ArrowRight}{Enter}"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveAttribute("aria-expanded", "false"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveAttribute("aria-selected", "false"); await user.keyboard("b"); expect(screen.getByRole("treeitem", { name: "B" })).toHaveFocus();
  });
  it("keeps stable focus through reorder and repairs a removed focused node", async () => {
    const user = userEvent.setup(); const { rerender } = render(<Tree aria-label="层级" nodes={nodes} />); await user.tab(); await user.keyboard("{End}"); expect(screen.getByRole("treeitem", { name: "B" })).toHaveFocus(); rerender(<Tree aria-label="层级" nodes={[nodes[1]!, nodes[0]!]} />); expect(screen.getByRole("treeitem", { name: "B" })).toHaveFocus(); rerender(<Tree aria-label="层级" nodes={[nodes[0]!]} />); await waitFor(() => expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus());
  });
  it("returns owned focus to the empty container without taking outside focus", async () => {
    const user = userEvent.setup(); const ref = { current: null as HTMLDivElement | null }; const { rerender } = render(<><Tree aria-label="层级" nodes={nodes} ref={ref} /><button>外部</button></>);
    await user.tab(); expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus(); rerender(<><Tree aria-label="层级" nodes={[]} ref={ref} /><button>外部</button></>);
    expect(screen.getByRole("tree")).toHaveFocus(); expect(ref.current).toBe(screen.getByRole("tree"));
    await user.click(screen.getByRole("button", { name: "外部" })); rerender(<><Tree aria-label="层级" nodes={nodes} ref={ref} /><button>外部</button></>); expect(screen.getByRole("button", { name: "外部" })).toHaveFocus();
  });
  it("shows a known empty sequence and rejects ambiguous duplicate identities", () => {
    const { unmount } = render(<Tree aria-label="层级" nodes={[]} />); expect(screen.getByText("没有条目")).toBeInTheDocument(); unmount(); expect(() => render(<Tree aria-label="层级" nodes={[{ id: "same", label: "一" }, { id: "same", label: "二" }]} />)).toThrow("unique");
  });
});
describe("Tree typeahead and toggle", () => {
  const files: TreeNode[] = [{ id: "ap", label: "Apple" }, { id: "av", label: "Avocado" }, { id: "al", label: "Alto" }, { id: "ba", label: "Banana" }];
  it("accumulates characters typed in quick succession and cycles on a repeated one", async () => {
    const user = userEvent.setup(); render(<Tree aria-label="水果" nodes={files} />); await user.tab(); expect(screen.getByRole("treeitem", { name: "Apple" })).toHaveFocus();
    await user.keyboard("al"); expect(screen.getByRole("treeitem", { name: "Alto" })).toHaveFocus();
    await user.keyboard("t"); expect(screen.getByRole("treeitem", { name: "Alto" })).toHaveFocus();
  });
  it("starts over once the window has passed, and cycles through one leading letter", async () => {
    vi.useFakeTimers({ toFake: ["Date"] }); vi.setSystemTime(1000);
    try {
      const user = userEvent.setup({ advanceTimers: ms => vi.setSystemTime(Date.now() + ms) }); render(<Tree aria-label="水果" nodes={files} />); await user.tab();
      await user.keyboard("a"); expect(screen.getByRole("treeitem", { name: "Avocado" })).toHaveFocus();
      await user.keyboard("a"); expect(screen.getByRole("treeitem", { name: "Alto" })).toHaveFocus();
      await user.keyboard("a"); expect(screen.getByRole("treeitem", { name: "Apple" })).toHaveFocus();
      vi.setSystemTime(Date.now() + 600);
      await user.keyboard("b"); expect(screen.getByRole("treeitem", { name: "Banana" })).toHaveFocus();
      vi.setSystemTime(Date.now() + 600);
      await user.keyboard("a"); expect(screen.getByRole("treeitem", { name: "Apple" })).toHaveFocus();
    } finally { vi.useRealTimers(); }
  });
  it("keeps the expand affordance out of the focus order and accessibility tree; arrows still expand", async () => {
    const user = userEvent.setup(); const { container } = render(<Tree aria-label="层级" nodes={nodes} />);
    const toggle = container.querySelector("[data-slot=tree-toggle]") as HTMLElement;
    expect(toggle).toHaveAttribute("aria-hidden", "true"); expect(toggle).toHaveAttribute("tabindex", "-1"); expect(screen.queryByRole("button")).toBeNull();
    await user.click(toggle); expect(screen.getByRole("treeitem", { name: "A" })).toHaveAttribute("aria-expanded", "true"); expect(screen.getByRole("treeitem", { name: "A" })).toHaveFocus();
  });
});
const checkNodes: TreeNode[] = [{ id: "p", label: "父", children: [{ id: "p1", label: "子一" }, { id: "p2", label: "子二" }, { id: "p3", label: "禁用子", disabled: true }] }, { id: "q", label: "独立叶子" }];
describe("Tree checkable", () => {
  it("cascades a branch click onto enabled leaves, derives mixed/true and declares multiselectable", async () => {
    const user = userEvent.setup(); render(<Tree aria-label="权限" nodes={checkNodes} checkable defaultExpandedIds={["p"]} />);
    // 勾选模式的条目用 aria-checked 表达多个并存的勾选，树因此声明 multiselectable（APG：多选树）。
    expect(screen.getByRole("tree")).toHaveAttribute("aria-multiselectable", "true");
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

describe("Tree accessible name", () => {
  it("fails explicitly without a nonempty aria-label or aria-labelledby, and names the tree root otherwise", () => {
    const nodes: TreeNode[] = [{ id: "a", label: "A" }];
    expect(() => render(<Tree nodes={nodes} />)).toThrow(/Tree requires a nonempty aria-label or aria-labelledby/);
    expect(() => render(<Tree aria-label=" " nodes={nodes} />)).toThrow(/aria-label/);
    render(<><h2 id="tree-title">结构</h2><Tree aria-labelledby="tree-title" nodes={nodes} /></>);
    expect(screen.getByRole("tree", { name: "结构" })).toBeInTheDocument();
  });
});

describe("Tree loadChildren", () => {
  const base: TreeNode[] = [{ id: "src", label: "源" }, { id: "leaf", label: "叶", isLeaf: true }];
  it("loads on first expand only, marks the item busy meanwhile, and keeps the result", async () => {
    const user = userEvent.setup(); let resolve!: (kids: TreeNode[]) => void;
    const loadChildren = vi.fn(() => new Promise<TreeNode[]>(done => { resolve = done; }));
    render(<Tree aria-label="层级" nodes={base} loadChildren={loadChildren} />);
    expect(screen.getByRole("treeitem", { name: "源" })).toHaveAttribute("aria-expanded", "false"); expect(screen.getByRole("treeitem", { name: "叶" })).not.toHaveAttribute("aria-expanded"); expect(loadChildren).not.toHaveBeenCalled();
    await user.tab(); await user.keyboard("{ArrowRight}");
    expect(loadChildren).toHaveBeenCalledWith(expect.objectContaining({ id: "src" })); expect(screen.getByRole("treeitem", { name: "源" })).toHaveAttribute("aria-busy", "true"); expect(screen.getByRole("status")).toHaveTextContent("正在加载");
    resolve([{ id: "x", label: "子项" }]);
    expect(await screen.findByRole("treeitem", { name: "子项" })).toBeInTheDocument(); expect(screen.getByRole("treeitem", { name: "源" })).not.toHaveAttribute("aria-busy");
    await user.keyboard("{ArrowLeft}{ArrowRight}"); expect(loadChildren).toHaveBeenCalledTimes(1);
  });
  it("shows a retryable failure, and a node that loads empty becomes a leaf", async () => {
    const user = userEvent.setup(); const loadChildren = vi.fn<(node: TreeNode) => Promise<TreeNode[]>>().mockRejectedValueOnce(new Error("x")).mockResolvedValueOnce([]);
    render(<Tree aria-label="层级" nodes={base} loadChildren={loadChildren} />);
    await user.click(screen.getByRole("treeitem", { name: "源" }).querySelector("[data-slot=tree-toggle]")!);
    expect(await screen.findByRole("alert")).toHaveTextContent("加载失败"); expect(loadChildren).toHaveBeenCalledTimes(1);
    await user.click(screen.getByRole("button", { name: "重试" })); await waitFor(() => expect(screen.queryByRole("alert")).toBeNull());
    expect(loadChildren).toHaveBeenCalledTimes(2); expect(screen.getByRole("treeitem", { name: "源" })).not.toHaveAttribute("aria-expanded");
  });
  it("retries from the keyboard with ArrowRight on a failed node", async () => {
    const user = userEvent.setup(); const loadChildren = vi.fn<(node: TreeNode) => Promise<TreeNode[]>>().mockRejectedValueOnce(new Error("x")).mockResolvedValueOnce([{ id: "x", label: "子项" }]);
    render(<Tree aria-label="层级" nodes={base} loadChildren={loadChildren} />);
    await user.tab(); await user.keyboard("{ArrowRight}"); await screen.findByRole("alert"); await user.keyboard("{ArrowRight}");
    expect(await screen.findByRole("treeitem", { name: "子项" })).toBeInTheDocument(); expect(loadChildren).toHaveBeenCalledTimes(2);
  });
  it("does not check a branch whose children are not loaded yet; it expands instead", async () => {
    const user = userEvent.setup(); const onCheckedChange = vi.fn(); const loadChildren = vi.fn(async () => [{ id: "x", label: "子项", isLeaf: true }]);
    render(<Tree aria-label="层级" nodes={base} checkable loadChildren={loadChildren} onCheckedChange={onCheckedChange} />);
    await user.click(screen.getByRole("treeitem", { name: "源" })); expect(onCheckedChange).not.toHaveBeenCalled(); await screen.findByRole("treeitem", { name: "子项" });
    await user.click(screen.getByRole("treeitem", { name: "源" })); expect(onCheckedChange).toHaveBeenCalledWith(["x"], expect.anything());
  });
});

describe("Tree query", () => {
  const tree: TreeNode[] = [{ id: "a", label: "水果", children: [{ id: "a1", label: "苹果" }, { id: "a2", label: "香蕉" }] }, { id: "b", label: "蔬菜", children: [{ id: "b1", label: "苹果酱" }] }, { id: "c", label: "谷物" }];
  it("keeps matches and their ancestors, opens those branches, and marks the matched text", () => {
    render(<Tree aria-label="层级" nodes={tree} query="苹果" />);
    expect(screen.queryByRole("treeitem", { name: "谷物" })).toBeNull(); expect(screen.queryByRole("treeitem", { name: "香蕉" })).toBeNull();
    expect(screen.getByRole("treeitem", { name: "水果" })).toHaveAttribute("aria-expanded", "true"); expect(screen.getByRole("treeitem", { name: "苹果酱" })).toBeInTheDocument();
    expect(screen.getByRole("treeitem", { name: "苹果酱" }).querySelector("mark")).toHaveTextContent("苹果");
  });
  it("shows the empty content when nothing matches, and restores the tree when cleared", () => {
    const { rerender } = render(<Tree aria-label="层级" nodes={tree} query="没有" emptyContent="无匹配" />);
    expect(screen.getByText("无匹配")).toBeInTheDocument(); expect(screen.queryAllByRole("treeitem")).toHaveLength(0);
    rerender(<Tree aria-label="层级" nodes={tree} query="" emptyContent="无匹配" />); expect(screen.getAllByRole("treeitem")).toHaveLength(3);
  });
  it("derives a branch's checked state from all its leaves, not just the visible ones", async () => {
    const user = userEvent.setup(); const onCheckedChange = vi.fn();
    render(<Tree aria-label="层级" nodes={tree} query="苹果" checkable defaultCheckedIds={["a1"]} onCheckedChange={onCheckedChange} />);
    expect(screen.getByRole("treeitem", { name: "水果" })).toHaveAttribute("aria-checked", "mixed");
    await user.click(screen.getByRole("treeitem", { name: "水果" })); expect(onCheckedChange).toHaveBeenCalledWith(expect.arrayContaining(["a1", "a2"]), expect.anything());
  });
  it("lets the user move on while a search holds branches open", async () => {
    const user = userEvent.setup(); const onExpandedChange = vi.fn(); render(<Tree aria-label="层级" nodes={tree} query="苹果" onExpandedChange={onExpandedChange} />);
    await user.tab(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("treeitem", { name: "苹果" })).toHaveFocus(); expect(onExpandedChange).not.toHaveBeenCalled();
  });
});

describe("Tree draggable", () => {
  const tree: TreeNode[] = [{ id: "a", label: "甲", children: [{ id: "a1", label: "甲一" }] }, { id: "b", label: "乙" }, { id: "c", label: "丙" }, { id: "d", label: "停", disabled: true }];
  const row = (name: string) => screen.getByRole("treeitem", { name }).querySelector<HTMLElement>("[data-slot=tree-row]")!;
  const rect = (element: HTMLElement) => { element.getBoundingClientRect = () => ({ top: 0, height: 100, bottom: 100, left: 0, right: 100, width: 100, x: 0, y: 0, toJSON() {} }); };
  const dataTransfer = () => ({ setData: vi.fn(), effectAllowed: "", dropEffect: "" });
  // jsdom has no DragEvent, so the fallback Event drops clientY; set it on the event itself.
  const at = (type: "dragOver" | "drop", target: HTMLElement, clientY: number) => { const event = createEvent[type](target, { dataTransfer: dataTransfer() }); Object.defineProperty(event, "clientY", { value: clientY }); fireEvent(target, event); };
  const dragTo = (from: string, to: string, clientY: number) => { fireEvent.dragStart(row(from), { dataTransfer: dataTransfer() }); rect(row(to)); at("dragOver", row(to), clientY); return () => at("drop", row(to), clientY); };
  it("reports before, after and inside by where the pointer is over the row, and shows the insertion mark", () => {
    const onMove = vi.fn(); render(<Tree aria-label="层级" nodes={tree} draggable onMove={onMove} />);
    let drop = dragTo("丙", "乙", 5); expect(row("乙").querySelector("[data-slot=tree-drop]")).toHaveAttribute("data-position", "before"); drop(); expect(onMove).toHaveBeenLastCalledWith({ nodeId: "c", targetId: "b", position: "before" }, expect.objectContaining({ reason: "pointer" })); expect(row("乙").querySelector("[data-slot=tree-drop]")).toBeNull();
    drop = dragTo("甲", "丙", 95); drop(); expect(onMove).toHaveBeenLastCalledWith({ nodeId: "a", targetId: "c", position: "after" }, expect.anything());
    drop = dragTo("丙", "乙", 50); expect(row("乙").querySelector("[data-slot=tree-drop]")).toHaveAttribute("data-position", "inside"); drop(); expect(onMove).toHaveBeenLastCalledWith({ nodeId: "c", targetId: "b", position: "inside" }, expect.anything());
  });
  it("refuses a drop into its own subtree, onto itself, onto a disabled node, and a no-op position; canDrop narrows further", () => {
    const onMove = vi.fn(); render(<Tree aria-label="层级" nodes={tree} draggable defaultExpandedIds={["a"]} onMove={onMove} canDrop={move => move.targetId !== "c"} />);
    for (const [from, to, y] of [["甲", "甲一", 50], ["乙", "乙", 50], ["乙", "停", 50], ["乙", "丙", 5], ["甲", "丙", 50]] as const) {
      dragTo(from, to, y)(); expect(document.querySelector("[data-slot=tree-drop]")).toBeNull();
    }
    expect(onMove).not.toHaveBeenCalled();
  });
  it("is not draggable unless asked, and a disabled node cannot be dragged", () => {
    const { unmount } = render(<Tree aria-label="层级" nodes={tree} />); expect(row("乙")).not.toHaveAttribute("draggable"); unmount();
    render(<Tree aria-label="层级" nodes={tree} draggable />); expect(row("乙")).toHaveAttribute("draggable", "true"); expect(row("停")).not.toHaveAttribute("draggable");
  });
  it("moves from the keyboard: pick up, drop before/after/inside the focused node, Escape cancels, all announced", async () => {
    const user = userEvent.setup(); const onMove = vi.fn(); render(<Tree aria-label="层级" nodes={tree} draggable onMove={onMove} />);
    const announcer = () => document.querySelector("[data-slot=tree-announcer]")!;
    expect(screen.getByRole("tree")).toHaveAccessibleDescription(/Alt/);
    await user.tab(); await user.keyboard("{ArrowDown}{Control>}x{/Control}"); expect(announcer()).toHaveTextContent("已取起「乙」");
    await user.keyboard("{Escape}"); expect(announcer()).toHaveTextContent("已取消移动"); expect(onMove).not.toHaveBeenCalled();
    await user.keyboard("{Control>}x{/Control}{ArrowDown}{Alt>}{ArrowDown}{/Alt}"); expect(onMove).toHaveBeenCalledWith({ nodeId: "b", targetId: "c", position: "after" }, expect.objectContaining({ reason: "keyboard" })); expect(announcer()).toHaveTextContent("已将「乙」移到「丙」之后");
    await user.keyboard("{Control>}x{/Control}{ArrowUp}{ArrowUp}{Alt>}{Enter}{/Alt}"); expect(onMove).toHaveBeenLastCalledWith({ nodeId: "c", targetId: "a", position: "inside" }, expect.anything()); expect(announcer()).toHaveTextContent("移入「甲」");
  });
  it("says so when the chosen place is not allowed, and stays picked up", async () => {
    const user = userEvent.setup(); const onMove = vi.fn(); render(<Tree aria-label="层级" nodes={tree} draggable onMove={onMove} />);
    await user.tab(); await user.keyboard("{Control>}x{/Control}{Alt>}{ArrowUp}{/Alt}"); expect(onMove).not.toHaveBeenCalled(); expect(document.querySelector("[data-slot=tree-announcer]")).toHaveTextContent("不能放在这里");
  });
  it("leaves plain selection and the Enter key alone when draggable", async () => {
    const user = userEvent.setup(); const onSelectionChange = vi.fn(); render(<Tree aria-label="层级" nodes={tree} draggable onSelectionChange={onSelectionChange} />);
    await user.tab(); await user.keyboard("{Enter}"); expect(onSelectionChange).toHaveBeenCalledWith("a", expect.anything());
  });
});
