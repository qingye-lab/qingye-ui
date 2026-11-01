# Tree

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/tree
Source: packages/ui/src/components/tree.tsx
Source SHA-256: 00664fdc85c13950a92cd28f8f8b5a432dd0cdbd7d30c789aad35af23f6363ab

Hierarchy, expansion, focus, independent single selection, and an optional cascading checkable mode for stable nodes.

## Decision
Expanded IDs and selected ID are separate; loading and failure are facts the component sees for itself and are never taken for "no children"; filtering only hides and never changes the value or derived checks; dragging only reports and holds no data. focus never selects, and hidden nodes do not automatically clear selection. Checkable and selectable clicks do not combine: when checkable is true, row clicks and Space toggle the check instead of selecting, so one click never carries two conflicting intents. checkedIds holds only leaf ids; a branch's checked state is a derived display (true / false / mixed) and is never written back into the value, so checking one branch cannot be miscounted as N+1 items. Cascade only touches enabled leaves: a disabled node keeps the checked fact it was given and cascade from an ancestor never changes it; a branch displays as fully checked once every one of its enabled leaf descendants is checked, even with unchecked disabled descendants remaining.

## Notes
- Removing a focused node finds an enabled fallback; clearing returns owned focus to the container without stealing outside focus.
- Dragging reports intent and never changes data: whether a move holds and where the node lands is the caller's decision, so one set of rules and one onMove serve both the pointer and the keyboard. With draggable, Enter still selects; picking up uses Ctrl/Cmd+X so no existing key is taken.

## Use and ownership
- An actual hierarchy needs keyboard positioning and independent selection.
- Avoid: Use DataTable for flat comparison; the caller makes the request and Tree only manages the loading and failed states. Use TreeSelect for a choice folded into a trigger.
- Avoid: Mixing checkable and selectable click semantics on the same tree; one click carries one intent.
- Library: Roving focus, stable keys, and focus recovery.
- Application: Nodes, expansion, selection, disabled, and empty/unknown semantics.

## Composition
- Tree: A complete hierarchical collection.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

## Current exports
- Tree: function; owner tree; PASS; props: TreeProps
- TREE_TYPEAHEAD_MS: const; owner tree; UNVERIFIED
- TreeChangeDetails: interface; owner tree; PASS
- TreeCheckedState: type; owner tree; PASS
- TreeMove: interface; owner tree; PASS
- TreeMoveDetails: interface; owner tree; PASS
- TreeNode: interface; owner tree; PASS
- TreeProps: type; owner tree; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Tree
- `canDrop?`: `(move: TreeMove) => boolean`. 在内置规则（不能放进自己或自己的后代、位置不变的移动无效）之外再收紧：返回 false 的移动不可放置。
- `checkable?`: `boolean`. 级联多选模式：与 selectable 的单选高亮不组合（见组件源码顶部注释与文档 decisions）。
- `checkedIds?`: `readonly string[]`. 只含叶子节点 id：分支的勾选只是显示派生，不是业务事实，不写回值，避免「选中一个分支」被多计成 N+1 项。
- `defaultCheckedIds?`: `readonly string[]`.
- `defaultExpandedIds?`: `readonly string[]`.
- `defaultFocusedId?`: `string | null`. 首次渲染时 roving 入口（tabIndex=0）所在的节点；默认是第一个可用节点。只是初值：之后焦点怎么走由用户决定。 节点不可见（祖先未展开）或不可用时退回到它最近的可见可用祖先，再退回第一个可用节点（与焦点节点被移除时同一条规则）。 弹层里的树（TreeSelect）靠它让进入时的焦点落在已选节点上；展开其祖先由调用方通过 expandedIds 负责。
- `defaultSelectedId?`: `string | null`.
- `disabled?`: `boolean`.
- `draggable?`: `boolean`. 允许拖动节点改变位置，同时开启键盘等价操作（Ctrl/⌘+X 取起，Alt+↑ / Alt+↓ / Alt+Enter 放到当前节点之前 / 之后 / 之中，Esc 取消）。 Tree 不持有数据：只通过 onMove 报告一次移动，调用方改 nodes。禁用的节点既不能拖动也不能作为目标。 loadChildren 取回的子项由 Tree 保管、不在 nodes 里，调用方无从改起，所以它们（及其后代）不参与移动，也不能放进已取回子项的节点； 要让这部分可移动，把取回的子项合并进 nodes 的 children。
- `emptyContent?`: `React.ReactNode`.
- `expandedIds?`: `readonly string[]`.
- `loadChildren?`: `(node: TreeNode) => Promise<readonly TreeNode[]>`. 展开一个没有 children 的非叶子节点时调用，返回它的子项；首次展开才取，失败（reject）显示可重试的错误。 取回的子项由 Tree 保管（按节点 id），调用方不必合并回 nodes；id 仍须全树唯一。取回为空数组即成为叶子。
- `nodes`: `readonly TreeNode[]`.
- `onCheckedChange?`: `(ids: string[], details: TreeChangeDetails) => void`.
- `onExpandedChange?`: `(ids: string[], details: TreeChangeDetails) => void`.
- `onMove?`: `(move: TreeMove, details: TreeMoveDetails) => void`.
- `onSelectionChange?`: `(id: string | null, details: TreeChangeDetails) => void`.
- `query?`: `string`. 按名称筛选：只显示名称含它的节点（不分大小写）及这些节点的祖先，命中的文字被标出。筛选期间有命中后代的分支一律展开（展开钮此时不起作用， 也不触发 onExpandedChange），清空后回到 expandedIds 决定的展开状态。不改变勾选的派生：分支的勾选仍由它的全部叶子后代决定， 筛选只是看不见一部分。空串等于不筛选。
- `selectable?`: `boolean`.
- `selectedId?`: `string | null`.
- plus 279 inherited (@types/react 278, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Tree
A complete hierarchical collection.
- nodes: readonly TreeNode[]. IDs and labels must be nonempty; IDs are unique across the tree. Disabled and children are explicit. isLeaf declares no children, so a node is not loaded even when loadChildren is set.
- expandedIds / defaultExpandedIds / onExpandedChange: readonly string[] / callback. Expansion is independent of selection; details.cancel() prevents commit.
- selectedId / defaultSelectedId / onSelectionChange: string | null / callback. Single selection is independent of focus and cancellable; no business state is inferred.
- selectable / disabled / emptyContent: boolean / ReactNode. Selectable defaults to true; empty trees remain focusable with caller or locale content.
- checkable: boolean. Turns on cascading checkable mode; defaults to false. When true, row clicks and Space toggle the checked state instead of selectable's single-select click.
- checkedIds / defaultCheckedIds / onCheckedChange: readonly string[] / callback. Holds only leaf ids; details.cancel() prevents commit. Checking a branch adds or removes its enabled leaf descendants together; a disabled leaf keeps the fact it was given and cascade never changes it.
- defaultFocusedId: string | null. The node holding the roving entry on first render, the first enabled node by default; a hidden or disabled node falls back to its nearest visible enabled ancestor. Expanding its ancestors is the caller's job through expandedIds. TreeSelect uses it to land focus on the chosen node when its popup opens.
- loadChildren: (node: TreeNode) => Promise<readonly TreeNode[]>. Called when a node with neither children nor isLeaf is expanded for the first time (named as in Cascader). While waiting the node carries aria-busy and shows the locale's "Loading" under it; a rejection shows "Failed to load" with a retry button (→ on the node retries too); an empty result makes the node a leaf. Results are cached per node and not requested twice. In checkable mode an unloaded branch cannot be checked; clicking it only expands.
- query: string. Filters by label: matching nodes and all their ancestors stay, the rest are hidden, the matched text is marked, and emptyContent shows when nothing matches. A branch with matching descendants is forced open (its toggle then does nothing and onExpandedChange does not fire), and clearing the query restores the earlier expansion. Filtering only hides: a branch's checked state and cascade are still computed on the full tree. Pass the raw string; matching ignores case and surrounding whitespace.
- draggable / onMove / canDrop: boolean / (move: TreeMove, details: { event, reason: "keyboard" | "pointer" }) => void / (move: TreeMove) => boolean. draggable turns on repositioning: a pointer drop reports before (top quarter), after (bottom quarter) or inside (middle) by where it lands in the row, with an insertion line; the keyboard picks up with Ctrl/Cmd+X and drops before / after / inside the focused node with Alt+↑ / ↓ / Enter. Tree holds no data and only reports through onMove({ nodeId, targetId, position }); the caller changes nodes. A node cannot go onto itself or into its own subtree, a move that changes nothing is refused, and a disabled node can neither be dragged nor be a target; canDrop returning false forbids more. Picking up, dropping, cancelling and refused places are announced in a role=status region.
- aria-label / aria-labelledby: string. One is required: the name of the tree, on the role=tree root. A missing or blank name throws. Each item is named by its own label.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

## Keyboard
- ↑ / ↓ / Home / End: Move between visible enabled nodes.
- ← / →: Collapse/expand or move to parent/child; reversed in RTL. Expansion belongs to the arrow keys; the chevron at the row start is for pointers only and is outside both the Tab sequence and the accessibility tree.
- Ctrl/Cmd+X, Alt+↑ / ↓ / Enter, Esc: Only with draggable: Ctrl/Cmd+X picks up the focused node, the arrow keys move focus, Alt+↑ drops before the focused node, Alt+↓ after it and Alt+Enter inside it, and Esc or leaving the tree cancels. Every step is announced.
- Enter / Space / Typeahead: Select the current node, or type the start of a label to move: characters typed in quick succession (within 500ms, a preset) accumulate into a prefix, and repeating one character cycles through nodes starting with it. In checkable mode, Space toggles the current node and its enabled leaf descendants instead, and Enter does not select.

## Source examples
### 展开与独立选择
Source: apps/docs/src/content/tree/demos/01-task.tsx
```tsx
import * as React from "react";
import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "展开与独立选择", titleEn: "Expansion and independent selection" } satisfies DemoMeta;

// 层级是真实的一小段目录结构：展开与选择互不牵连（禁用项仍可见）。
const nodes: TreeNode[] = [
  {
    id: "settings", label: "设置", children: [
      { id: "notifications", label: "通知" },
      { id: "sync", label: "同步", disabled: true },
    ],
  },
  { id: "members", label: "成员" },
];

export default function Demo() {
  const [selected, setSelected] = React.useState<string | null>(null);
  return <Stack>
    <Tree aria-label="本地层级集合" nodes={nodes} defaultExpandedIds={["settings"]} selectedId={selected} onSelectionChange={setSelected} />
    <output className="text-support text-muted-foreground">{selected ? `已选：${selected === "notifications" ? "通知" : selected === "sync" ? "同步" : "成员"}` : "未选择"}</output>
  </Stack>;
}
```

### 级联勾选：成员权限
Source: apps/docs/src/content/tree/demos/02-checkable.tsx
```tsx
import * as React from "react";
import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "级联勾选：成员权限", titleEn: "Cascading check: member permissions" } satisfies DemoMeta;

// 真实的权限结构：按区域分组，叶子是具体权限。「删除工作区」要求所有者身份，
// 对当前成员禁用——它保留自己被授予的事实，不随上级勾选/取消改变。
const permissions: TreeNode[] = [
  {
    id: "data", label: "工作区数据", children: [
      { id: "data.view", label: "查看记录" },
      { id: "data.edit", label: "编辑记录" },
      { id: "data.delete", label: "删除工作区（仅所有者）", disabled: true },
    ],
  },
  {
    id: "members", label: "成员与权限", children: [
      { id: "members.invite", label: "邀请成员" },
      { id: "members.remove", label: "移除成员" },
    ],
  },
  {
    id: "integrations", label: "集成与密钥", children: [
      { id: "integrations.webhooks", label: "管理回调地址" },
      { id: "integrations.tokens", label: "创建访问令牌" },
    ],
  },
];

const LABELS: Record<string, string> = {
  "data.view": "查看记录", "data.edit": "编辑记录", "data.delete": "删除工作区",
  "members.invite": "邀请成员", "members.remove": "移除成员",
  "integrations.webhooks": "管理回调地址", "integrations.tokens": "创建访问令牌",
};

export default function Demo() {
  const [checked, setChecked] = React.useState<string[]>(["data.view", "data.delete", "members.invite"]);
  const granted = checked.filter(id => id !== "data.delete").map(id => LABELS[id]);
  return <Stack>
    <Tree
      aria-label="成员权限"
      nodes={permissions}
      checkable
      defaultExpandedIds={["data", "members", "integrations"]}
      checkedIds={checked}
      onCheckedChange={setChecked}
    />
    <output className="text-support text-muted-foreground">{granted.length ? `已授予：${granted.join("、")}` : "未授予任何权限"}</output>
  </Stack>;
}
```

### 按需加载子项
Source: apps/docs/src/content/tree/demos/03-lazy.tsx
```tsx
import * as React from "react";
import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "按需加载子项", titleEn: "Load children on demand" } satisfies DemoMeta;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 根节点先给出；子项在第一次展开时才取。isLeaf 声明没有子项的节点，其余都当作可加载的分支。
const roots: TreeNode[] = [
  { id: "docs", label: "文档" },
  { id: "images", label: "图片" },
  { id: "readme", label: "说明.txt", isLeaf: true },
];
const children: Record<string, TreeNode[]> = {
  docs: [{ id: "docs.plan", label: "计划.md", isLeaf: true }, { id: "docs.notes", label: "笔记", children: [{ id: "docs.notes.a", label: "周一.md" }] }],
  images: [{ id: "images.a", label: "封面.png", isLeaf: true }, { id: "images.b", label: "草图.png", isLeaf: true }],
};

export default function Demo() {
  const failed = React.useRef(false);
  return <Tree
    aria-label="按需加载的目录"
    nodes={roots}
    loadChildren={async node => {
      await delay(700);
      // 图片第一次取不到，重试后成功。
      if (node.id === "images" && !failed.current) { failed.current = true; throw new Error("offline"); }
      return children[node.id] ?? [];
    }}
  />;
}
```

### 拖动调整顺序
Source: apps/docs/src/content/tree/demos/04-reorder.tsx
```tsx
import * as React from "react";
import { Tree, type TreeMove, type TreeNode } from "@qingye_lab/ui/components/tree";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "拖动调整顺序", titleEn: "Drag to reorder" } satisfies DemoMeta;

const initial: TreeNode[] = [
  { id: "intro", label: "简介" },
  { id: "guide", label: "指南", children: [{ id: "guide.start", label: "开始" }, { id: "guide.config", label: "配置" }] },
  { id: "api", label: "接口" },
  { id: "log", label: "更新记录" },
];

// 数据归调用方：Tree 只报告「谁移到哪里」，这里把它落到自己的数组上。
function detach(list: readonly TreeNode[], id: string): { rest: TreeNode[]; found?: TreeNode | undefined } {
  let found: TreeNode | undefined;
  const rest: TreeNode[] = [];
  for (const node of list) {
    if (node.id === id) { found = node; continue; }
    if (node.children) { const inner = detach(node.children, id); if (inner.found) found = inner.found; rest.push({ ...node, children: inner.rest }); } else rest.push(node);
  }
  return { rest, found };
}
function attach(list: readonly TreeNode[], move: TreeMove, node: TreeNode): TreeNode[] {
  const out: TreeNode[] = [];
  for (const item of list) {
    const self = item.children ? { ...item, children: attach(item.children, move, node) } : item;
    if (item.id !== move.targetId) { out.push(self); continue; }
    if (move.position === "before") out.push(node, self);
    else if (move.position === "after") out.push(self, node);
    else out.push({ ...self, children: [...(self.children ?? []), node] });
  }
  return out;
}
function applyMove(list: readonly TreeNode[], move: TreeMove): TreeNode[] {
  const { rest, found } = detach(list, move.nodeId);
  return found ? attach(rest, move, found) : [...list];
}

export default function Demo() {
  const [nodes, setNodes] = React.useState(initial);
  return <Tree aria-label="可调整顺序的目录" nodes={nodes} draggable defaultExpandedIds={["guide"]} onMove={move => setNodes(current => applyMove(current, move))} />;
}
```
