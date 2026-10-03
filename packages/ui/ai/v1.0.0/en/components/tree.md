# Tree

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/tree
Source: packages/ui/src/components/tree.tsx
Source SHA-256: d4c43d05973b84b4b6f339eb596be20217253b844c00f246793bd671b303fbde

Hierarchy, expansion, focus and independent single selection for stable nodes.

## Decision
Expanded IDs and selected ID are separate; focus never selects, and hidden nodes do not automatically clear selection.

## Notes
- Removing a focused node finds an enabled fallback; clearing returns owned focus to the container without stealing outside focus.

## Use and ownership
- An actual hierarchy needs keyboard positioning and independent selection.
- Avoid: Use DataTable for flat comparison; no built-in lazy loading, multiple selection, or requests.
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
- TreeChangeDetails: interface; owner tree; PASS
- TreeNode: interface; owner tree; PASS
- TreeProps: type; owner tree; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Tree
A complete hierarchical collection.
- nodes: readonly TreeNode[]. IDs and labels must be nonempty; IDs are unique across the tree. Disabled and children are explicit.
- expandedIds / defaultExpandedIds / onExpandedChange: readonly string[] / callback. Expansion is independent of selection; details.cancel() prevents commit.
- selectedId / defaultSelectedId / onSelectionChange: string | null / callback. Single selection is independent of focus and cancellable; no business state is inferred.
- selectable / disabled / emptyContent: boolean / ReactNode. Selectable defaults to true; empty trees remain focusable with caller or locale content.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

## Keyboard
- ↑ / ↓ / Home / End: Move between visible enabled nodes.
- ← / →: Collapse/expand or move to parent/child; reversed in RTL.
- Enter / Space / Typeahead: Select the current node, or navigate by a label's first character.

## Source examples
### 展开与独立选择
Source: apps/docs/src/content/tree/demos/01-task.tsx
```tsx
import * as React from "react";
import { Tree, type TreeNode } from "@qingye/ui/components/tree";
import { Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "展开与独立选择", titleEn: "Expansion and independent selection" } satisfies DemoMeta;
const nodes: TreeNode[] = [{ id: "group", label: "集合 A", children: [{ id: "a", label: "条目 A" }, { id: "b", label: "条目 B", disabled: true }] }, { id: "c", label: "条目 C" }];
export default function Demo() { const [selected, setSelected] = React.useState<string | null>(null); return <Stack><Tree aria-label="本地层级集合" nodes={nodes} defaultExpandedIds={["group"]} selectedId={selected} onSelectionChange={setSelected} /><output className="text-support">{selected ? `已选标识：${selected}` : "未选择"}</output></Stack>; }
```
