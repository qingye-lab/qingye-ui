# 虚拟列表 VirtualList

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/virtual-list
Source: packages/ui/src/components/virtual-list.tsx
Source SHA-256: 772ed07d69b729cdade24c67b719669caefd00765038118f3b30ab6ce587cd90

以稳定项身份呈现等高或动态高度长集合，保留阅读位置与正在编辑的内容。

## Decision
VirtualList 只拥有窗口、测量、阅读锚点与焦点连续性。集合、稳定 key、未读状态及是否跟随由消费项目决定；默认保持固定高度和手动滚动。

## Notes
- 固定模式保持 itemSize 契约；内容会换行、展开或流式增长时显式选 dynamic，并给未测量行合理估计。动态跳转可随实际测量修正位置，不承诺平滑滚动。
- 稳定 key 在前插和排序后保留同一可见项及项内像素偏移；视口上方整行高度变化会补偿滚动。尾部跟随不代替应用的未读计数或加载状态。
- 键只在 items 或 getKey 变化时派生。滚动时只处理窗口和最多一个保留焦点行，不重新遍历 50,000 项；数据变化或测量更新仍可能更新尺寸缓存。
- 聚焦行即使离屏也保留挂载；真实移除后焦点回到视口。aria-posinset/setsize 表达完整集合位置。搜索、打印或需要全量辅助技术遍历时改用普通集合或 ScrollArea。
- 窗口示例的 48px 等高、动态示例的 72px 估计及视口高度均是消费示例选择，修改入口为 itemSize/height；未新增库 token。

## Use and ownership
- 具有稳定身份的等高或动态高度长集合
- Avoid: 需要完整 DOM 的内容、业务表格
- Library: 窗口、测量、真实位置、阅读与焦点连续性
- Application: 集合、稳定 key、内容、估计尺寸、尾部跟随策略

## Composition
- 视口 + 总高空间 + 当前窗口/保留焦点项 + 可选应用滚动入口

## Responsive behavior
- 窄容器保留必要内容与可达操作；布局改变时保留对象、输入和焦点。

## Customization
- itemSize / height / measurement / overscan / actionsRef / followEnd 与公开内容出口

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
集合渲染边界，真实 list/listitem，不提供选择、请求或业务列。
- items / getKey / renderItem: readonly Item[] / (item,index)=>React.Key / (item,index)=>ReactNode. 真实集合、稳定唯一 key 与内容；重复 key 显式报错。插入、排序时用持久身份，不用位置。
- itemSize / height: number. 项外高与视口高，CSS px，均为有限正数。默认固定高度；动态模式中 itemSize 是未测量行的估计值，不限制内容高度。
- measurement: 'fixed' | 'dynamic'; default 'fixed'. dynamic 用 ResizeObserver 测量已挂载行的实际 border-box 高度；整行高度应由正常内容流决定，外部 margin 不计入测量。
- actionsRef: React.Ref<VirtualListActions>. 独立动作出口：scrollToIndex(index, { align?: 'auto' | 'start' | 'center' | 'end' }) 与 scrollToEnd()。立即滚动，不转移焦点。非法或越界 index 抛 RangeError；空集合 scrollToEnd 无操作。
- followEnd: boolean; default false. 显式尾部跟随。仅原先停在底部（1 CSS px 容差）时跟随追加项；向上阅读后保持阅读位置，不在初次挂载时跳到底部。
- overscan: number; default 2. 窗口两侧的渲染预算预设，非负整数；不是视觉尺寸。
- aria-label / aria-labelledby: string. 必填其一：集合的可识别名称，落在 role=list 的滚动视口上；缺失或为空时抛错。
- render / ref / style / className / events / ARIA: useRender.ComponentProps<'div'>. ref 仍是原生滚动视口。显式 height 承担视口高度；初始服务端窗口使用它。浏览器默认滚动锚定关闭，由组件统一维持阅读位置。给集合可识别名称。

## Keyboard
- Tab: 到达集合视口与已挂载的内部操作。
- 方向 / Home / End: 从视口或行本身到相邻/首末真实行，跨窗口滚动挂载；内嵌编辑/按钮键位不被接管。

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
