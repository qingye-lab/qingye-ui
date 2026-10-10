# Virtual list

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/virtual-list
Source: packages/ui/src/components/virtual-list.tsx
Source SHA-256: 3543991a92bb175ae6d33351e09983ca82ef9282223fb68199844b3a037d009b

An accessible window over a fixed-height collection with stable item identity.

## Decision
VirtualList expresses no selection, loading, or business result. Stable keys, equal-height items, and a reachable window are its current contract; overscan=2 is a rendering-budget preset.

## Notes
- Equal-height items only. Use ordinary collections or ScrollArea for dynamic height, complete DOM search, or printing.
- Focused rows remain mounted offscreen; actual removal returns focus to the viewport so navigation can continue. aria-posinset/setsize identify positions in the complete collection.
- The example's 48px row height is a consumer choice with four visible rows. Adjust example rowSize or component itemSize/height; no library token was added.

## Use and ownership
- Long collections with explicit equal heights and stable identities.
- Avoid: Variable heights, content requiring full DOM, or business tables.
- Library: Windowing, actual positions, and focus continuity.
- Application: Collections, stable keys, equal extents, and item content.

## Composition
- Viewport + total-height space + current window/retained focused item.

## Responsive behavior
- Keep essential content and actions reachable in narrow containers; preserve the object, input, and focus when the layout changes.

## Customization
- itemSize / height / overscan and public content composition.

## Current exports
- VirtualList: function; owner virtual-list; PASS; props: VirtualListProps<Item>
- VirtualListProps: type; owner virtual-list; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### VirtualList<Item>
Collection rendering boundary with actual list/listitem semantics, without selection or business columns.
- items / getKey / renderItem: readonly Item[] / (item,index)=>React.Key / (item,index)=>ReactNode. Actual collection, stable unique keys, and content; duplicate keys throw. Unstable positions cannot impersonate identity.
- itemSize / height: number. Caller-supplied equal outer item height and viewport height in CSS px. Finite positive values; zero/infinity throw. Total height, offsets, and window derive from these relationships.
- overscan: number; default 2. A nonnegative integer rendering-budget preset on both window edges, rather than a visual dimension.
- render / ref / style / className / events / ARIA: useRender.ComponentProps<'div'>. Actual viewport composition; explicit height owns its height, and measured clientHeight adapts to viewport changes. Give the collection an identifiable name.

## Keyboard
- Tab: Reach the collection viewport and mounted internal actions.
- Arrow keys / Home / End: From the viewport or row, reach adjacent/first/last actual rows, scrolling/mounting across windows. Embedded editing/button keys remain intact.

## Source examples
### 集合窗口
Source: apps/docs/src/content/virtual-list/demos/01-window.tsx
```tsx
import { VirtualList } from "@qingye_lab/ui/components/virtual-list";
export const meta = { title: "集合窗口", titleEn: "Collection window" };
const items = Array.from({ length: 100 }, (_, id) => ({ id, label: `条目 ${id + 1}` }));
const rowSize = 48;
export default function Demo() {
  return <VirtualList aria-label="等高条目" items={items} getKey={item => item.id} itemSize={rowSize} height={rowSize * 4} renderItem={item => <span className="flex h-full items-center px-(--qy-control-md-padding) text-body">{item.label}</span>} />;
}
```

### 项身份与焦点
Source: apps/docs/src/content/virtual-list/demos/02-focus.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Input } from "@qingye_lab/ui/components/input";
import { VirtualList } from "@qingye_lab/ui/components/virtual-list";
export const meta = { title: "项身份与焦点", titleEn: "Identity and focus" };
const initial = Array.from({ length: 40 }, (_, id) => ({ id, label: `条目 ${id + 1}` }));
const rowSize = 48;
export default function Demo() {
  const [items, setItems] = useState(initial);
  return <div className="grid gap-(--qy-action-gap)"><div className="flex flex-wrap gap-(--qy-action-gap)"><Button variant="bordered" onClick={() => setItems(current => [...current].reverse())}>倒序</Button><Button variant="quiet" onClick={() => setItems(current => current.slice(1))} disabled={items.length === 0}>移除首项</Button></div><VirtualList aria-label="可编辑条目" items={items} getKey={item => item.id} itemSize={rowSize} height={rowSize * 4} renderItem={item => <div className="flex h-full items-center px-(--qy-control-md-padding)"><Input aria-label={item.label} defaultValue={item.label} /></div>} /></div>;
}
```
