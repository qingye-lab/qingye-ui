# Tree

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/tree
Source: packages/ui/src/components/tree.tsx
Source SHA-256: beaccb8054cd33b7cb3b00282400c92e6e2a491c0c0821da4a0155dccb0a9e0b

Hierarchy, expansion, focus, independent single selection, and an optional cascading checkable mode for stable nodes.

## Decision
Expanded IDs and selected ID are separate; focus never selects, and hidden nodes do not automatically clear selection. Checkable and selectable clicks do not combine: when checkable is true, row clicks and Space toggle the check instead of selecting, so one click never carries two conflicting intents. checkedIds holds only leaf ids; a branch's checked state is a derived display (true / false / mixed) and is never written back into the value, so checking one branch cannot be miscounted as N+1 items. Cascade only touches enabled leaves: a disabled node keeps the checked fact it was given and cascade from an ancestor never changes it; a branch displays as fully checked once every one of its enabled leaf descendants is checked, even with unchecked disabled descendants remaining.

## Notes
- Removing a focused node finds an enabled fallback; clearing returns owned focus to the container without stealing outside focus.

## Use and ownership
- An actual hierarchy needs keyboard positioning and independent selection.
- Avoid: Use DataTable for flat comparison; no built-in lazy loading or requests. Use TreeSelect for a choice folded into a trigger.
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
- TreeNode: interface; owner tree; PASS
- TreeProps: type; owner tree; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Tree
- `checkable?`: `boolean`. 级联多选模式：与 selectable 的单选高亮不组合（见组件源码顶部注释与文档 decisions）。
- `checkedIds?`: `readonly string[]`. 只含叶子节点 id：分支的勾选只是显示派生，不是业务事实，不写回值，避免「选中一个分支」被多计成 N+1 项。
- `defaultCheckedIds?`: `readonly string[]`.
- `defaultExpandedIds?`: `readonly string[]`.
- `defaultFocusedId?`: `string | null`. 首次渲染时 roving 入口（tabIndex=0）所在的节点；默认是第一个可用节点。只是初值：之后焦点怎么走由用户决定。 节点不可见（祖先未展开）或不可用时退回到它最近的可见可用祖先，再退回第一个可用节点（与焦点节点被移除时同一条规则）。 弹层里的树（TreeSelect）靠它让进入时的焦点落在已选节点上；展开其祖先由调用方通过 expandedIds 负责。
- `defaultSelectedId?`: `string | null`.
- `disabled?`: `boolean`.
- `emptyContent?`: `React.ReactNode`.
- `expandedIds?`: `readonly string[]`.
- `nodes`: `readonly TreeNode[]`.
- `onCheckedChange?`: `(ids: string[], details: TreeChangeDetails) => void`.
- `onExpandedChange?`: `(ids: string[], details: TreeChangeDetails) => void`.
- `onSelectionChange?`: `(id: string | null, details: TreeChangeDetails) => void`.
- `selectable?`: `boolean`.
- `selectedId?`: `string | null`.
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Tree
A complete hierarchical collection.
- nodes: readonly TreeNode[]. IDs and labels must be nonempty; IDs are unique across the tree. Disabled and children are explicit.
- expandedIds / defaultExpandedIds / onExpandedChange: readonly string[] / callback. Expansion is independent of selection; details.cancel() prevents commit.
- selectedId / defaultSelectedId / onSelectionChange: string | null / callback. Single selection is independent of focus and cancellable; no business state is inferred.
- selectable / disabled / emptyContent: boolean / ReactNode. Selectable defaults to true; empty trees remain focusable with caller or locale content.
- checkable: boolean. Turns on cascading checkable mode; defaults to false. When true, row clicks and Space toggle the checked state instead of selectable's single-select click.
- checkedIds / defaultCheckedIds / onCheckedChange: readonly string[] / callback. Holds only leaf ids; details.cancel() prevents commit. Checking a branch adds or removes its enabled leaf descendants together; a disabled leaf keeps the fact it was given and cascade never changes it.
- defaultFocusedId: string | null. The node holding the roving entry on first render, the first enabled node by default; a hidden or disabled node falls back to its nearest visible enabled ancestor. Expanding its ancestors is the caller's job through expandedIds. TreeSelect uses it to land focus on the chosen node when its popup opens.
- aria-label / aria-labelledby: string. One is required: the name of the tree, on the role=tree root. A missing or blank name throws. Each item is named by its own label.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

## Keyboard
- ↑ / ↓ / Home / End: Move between visible enabled nodes.
- ← / →: Collapse/expand or move to parent/child; reversed in RTL. Expansion belongs to the arrow keys; the chevron at the row start is for pointers only and is outside both the Tab sequence and the accessibility tree.
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
