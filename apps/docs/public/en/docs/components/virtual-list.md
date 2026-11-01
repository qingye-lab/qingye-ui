# Virtual list

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/virtual-list
Source: packages/ui/src/components/virtual-list.tsx
Source SHA-256: 772ed07d69b729cdade24c67b719669caefd00765038118f3b30ab6ce587cd90

Window fixed or measured-height collections while retaining the reading position and active editing.

## Decision
VirtualList owns windowing, measurement, reading anchors, and focus continuity. The consumer owns the collection, stable keys, unread state, and following policy; fixed heights and manual scrolling remain the defaults.

## Notes
- Fixed mode retains the itemSize contract. Explicitly choose dynamic for wrapping, expanding, or streaming content and provide a reasonable estimate. Dynamic jumps may correct their position as measurements arrive; smooth scrolling is not promised.
- Stable keys retain the visible item and within-item pixel offset across prepends and reorders. Height changes of rows entirely above the viewport compensate the scroll offset. Following does not own unread counts or loading state.
- Keys are derived only when items or getKey change. Scrolling processes the window and at most one retained focused row, without rewalking 50,000 items. Data changes or measurements can still update the size cache.
- Focused rows remain mounted offscreen; actual removal returns focus to the viewport. aria-posinset/setsize express complete collection positions. Use ordinary collections or ScrollArea for search, printing, or complete assistive-technology traversal.
- The fixed demo's 48px rows, dynamic demo's 72px estimate, and viewport heights are consumer choices adjusted through itemSize/height. No library token was added.

## Use and ownership
- Long fixed or measured-height collections with stable identities.
- Avoid: Content requiring complete DOM, or business tables.
- Library: Windowing, measurement, actual positions, and reading/focus continuity.
- Application: Collections, stable keys, content, estimated sizes, and following policy.

## Composition
- Viewport + total-height space + current window/retained focused item + optional consumer scroll controls.

## Responsive behavior
- Keep essential content and actions reachable in narrow containers; preserve the object, input, and focus when the layout changes.

## Customization
- itemSize / height / measurement / overscan / actionsRef / followEnd and public content composition.

## Current exports
- VirtualList: function; owner virtual-list; PASS; props: VirtualListProps<Item>
- VirtualListActions: type; owner virtual-list; PASS
- VirtualListProps: type; owner virtual-list; PASS
- VirtualListScrollOptions: type; owner virtual-list; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### VirtualList
- `actionsRef?`: `React.Ref<VirtualListActions>`. Separate from the native scrolling-element ref. Scrolling is instant and keeps focus.
- `followEnd?`: `boolean`. Follow appended items only when previously at the end; never initially jump to the end.
- `getKey`: `(item: Item, index: number) => React.Key`. Must remain stable across scrolling, insertion and reordering.
- `height`: `number`.
- `items`: `readonly Item[]`.
- `itemSize`: `number`. Fixed outer row extent, or the estimated outer extent in dynamic mode, in CSS px.
- `measurement?`: `"fixed" | "dynamic"`. Dynamic mode observes each mounted row's actual border-box height.
- `overscan?`: `number`. Render budget on either side of the visible window; not a visual dimension.
- `renderItem`: `(item: Item, index: number) => React.ReactNode`.
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tanstack/react-virtual, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### VirtualList<Item>
Collection rendering boundary with actual list/listitem semantics, without selection, requests, or business columns.
- items / getKey / renderItem: readonly Item[] / (item,index)=>React.Key / (item,index)=>ReactNode. Actual collection, stable unique keys, and content; duplicate keys throw. Use persistent identities across insertion and reordering, rather than positions.
- itemSize / height: number. Outer item height and viewport height in CSS px, both finite and positive. Rows are fixed by default; in dynamic mode itemSize estimates unmeasured rows without constraining their content height.
- measurement: 'fixed' | 'dynamic'; default 'fixed'. dynamic uses ResizeObserver to measure each mounted row's actual border-box height. Let normal content flow determine row height; external margins are excluded.
- actionsRef: React.Ref<VirtualListActions>. Separate actions: scrollToIndex(index, { align?: 'auto' | 'start' | 'center' | 'end' }) and scrollToEnd(). Scroll instantly without moving focus. Invalid or out-of-bounds indices throw RangeError; scrollToEnd is a no-op for empty collections.
- followEnd: boolean; default false. Explicit end following. Follow appended items only when previously at the bottom (within 1 CSS px). Reading history keeps its position, and initial mounting never jumps to the end.
- overscan: number; default 2. A nonnegative integer rendering-budget preset on both window edges, rather than a visual dimension.
- aria-label / aria-labelledby: string. One is required: the identifiable name of the collection, on the role=list scroll viewport. A missing or blank name throws.
- render / ref / style / className / events / ARIA: useRender.ComponentProps<'div'>. ref remains the native scroll viewport. Explicit height owns its height and supplies the initial server-rendered window. Browser scroll anchoring is disabled so the component owns reading continuity. Give the collection an identifiable name.

## Keyboard
- Tab: Reach the collection viewport and mounted internal actions.
- Arrow keys / Home / End: From the viewport or row, reach adjacent/first/last actual rows across windows. Embedded editing/button keys remain intact.

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

### 动态记录与阅读位置
Source: apps/docs/src/content/virtual-list/demos/03-dynamic.tsx
```tsx
import { useRef, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { VirtualList, type VirtualListActions } from "@qingye_lab/ui/components/virtual-list";

export const meta = { title: "动态记录与阅读位置", titleEn: "Measured records and reading continuity" };
type Entry = { id: number; text: string; expanded?: boolean };
const initial: Entry[] = Array.from({ length: 60 }, (_, id) => ({
  id,
  text: id % 3 === 0 ? "窄屏复核已完成，补充了长标题换行和键盘返回的验证记录。" : "本次检查已完成，记录保留供后续复核。",
}));
const getKey = (entry: Entry) => entry.id;
const estimate = 72;

export default function Demo() {
  const [entries, setEntries] = useState(initial);
  const actions = useRef<VirtualListActions>(null);
  const next = useRef(initial.length);
  const previous = useRef(-1);
  return <div className="grid gap-(--qy-action-gap)">
    <div className="flex flex-wrap gap-(--qy-action-gap)">
      <Button variant="bordered" onClick={() => {
        const id = previous.current--;
        setEntries(current => [{ id, text: "更早的检查记录：当时尚未发现新增问题，保留原始观察。" }, ...current]);
      }}>更早记录</Button>
      <Button variant="bordered" onClick={() => {
        const id = next.current++;
        setEntries(current => [...current, { id, text: "刚完成一轮复核，新的观察已加入记录。" }]);
      }}>新增记录</Button>
      <Button variant="quiet" onClick={() => actions.current?.scrollToIndex(Math.floor(entries.length / 2), { align: "start" })}>查看中段</Button>
      <Button variant="quiet" onClick={() => actions.current?.scrollToEnd()}>跳到最新</Button>
    </div>
    <VirtualList aria-label="检查记录" items={entries} getKey={getKey} measurement="dynamic" itemSize={estimate} height={estimate * 4} actionsRef={actions} followEnd
      renderItem={entry => <div className="grid gap-(--qy-space-2) px-(--qy-control-md-padding) py-(--qy-space-3)">
        <div className="flex items-center justify-between gap-(--qy-space-2)">
          <span className="text-support text-muted-foreground">记录 {entry.id + 1}</span>
          <Button size="xs" variant="quiet" aria-expanded={entry.expanded ?? false} onClick={() => setEntries(current => current.map(item => item.id === entry.id ? { ...item, expanded: !item.expanded } : item))}>{entry.expanded ? "收起" : "详情"}</Button>
        </div>
        <p className="text-body">{entry.text}</p>
        {entry.expanded && <p className="text-body">复核范围包含手机窄屏、放大文字与连续键盘操作。当前记录只表达已完成的检查；待验证项仍由项目单独跟踪。详情展开后继续保留正在阅读的位置。</p>}
      </div>} />
  </div>;
}
```
