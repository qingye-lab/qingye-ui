# 虚拟列表 VirtualList

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/virtual-list
Source: packages/ui/src/components/virtual-list.tsx
Source SHA-256: 3543991a92bb175ae6d33351e09983ca82ef9282223fb68199844b3a037d009b

以稳定项身份呈现等高长集合的可达窗口。

## Decision
VirtualList 不代表选择、加载或业务结果。稳定 key、等高项和可达窗口是当前契约；overscan=2 是渲染预算预设。

## Notes
- 只有等高项；动态高度、完整 DOM 搜索/打印使用普通集合或 ScrollArea。
- 聚焦行即使离屏也保留挂载；真实移除后焦点回到视口，可继续导航。aria-posinset/setsize 表达完整集合位置。
- 示例行高 48px 是消费示例选择，视口容纳四项；修改入口是示例 rowSize 与组件 itemSize/height，未新增库 token。

## Use and ownership
- 明确等高与稳定身份的长集合
- Avoid: 可变高内容、需要全量 DOM 的内容、业务表格
- Library: 窗口、真实位置、焦点连续性
- Application: 集合、稳定 key、等高 extent、项内容

## Composition
- 视口 + 总高空间 + 当前窗口/保留焦点项

## Responsive behavior
- 窄容器保留必要内容与可达操作；布局改变时保留对象、输入和焦点。

## Customization
- itemSize / height / overscan 与公开内容出口

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
集合渲染边界，真实 list/listitem，不提供选择或业务列。
- items / getKey / renderItem: readonly Item[] / (item,index)=>React.Key / (item,index)=>ReactNode. 真实集合、稳定唯一 key 与内容；重复 key 显式报错。不得用不稳定位置冒充项身份。
- itemSize / height: number. 调用方提供等高项外高与视口高，CSS px；有限正数，0/无穷等显式报错。总高/偏移/窗口从关系计算。
- overscan: number; default 2. 窗口两侧的渲染预算预设，非负整数；不是视觉尺寸。
- render / ref / style / className / events / ARIA: useRender.ComponentProps<'div'>. 真实滚动视口出口；height 由显式 height 参数承担，测量实际 clientHeight 适应视口变化。给集合可识别名称。

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
