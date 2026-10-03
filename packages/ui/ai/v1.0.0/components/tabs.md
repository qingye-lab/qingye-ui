# 视角标签 Tabs

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/tabs
Source: packages/ui/src/components/tabs.tsx
Source SHA-256: 070f5fc49f3a258a15676a612d2ff2a27d9f55b9abbce0add1b59770e46ff127

同一对象的不同视角，保留面板草稿。

## Decision
默认手动激活、面板保留挂载；切换视角不等于批准或保存草稿。

## Notes
- 隐藏面板仍挂载但退出可访问树；不要把切换当成保存成功。

## Use and ownership
- 同一对象多种视角需要保留编辑连续性。
- Avoid: 步骤进度用 Steps，真实目的地用链接。
- Library: 标签关联、键盘和面板可见性。
- Application: value、草稿、保存与批准。

## Composition
- Tabs / TabsList：当前视角与手动激活列表。
- TabsTab：具有关联面板的 tab。
- TabsPanel / TabsPrimitive：原生 tabpanel 与公开原语。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

## Current exports
- Tabs: function; owner tabs; PASS; props: TabsProps
- TabsList: function; owner tabs; PASS; props: TabsListProps
- TabsListProps: type; owner tabs; PASS
- TabsPanel: function; owner tabs; PASS; props: TabsPanelProps
- TabsPanelProps: type; owner tabs; PASS
- TabsPrimitive: reexport; owner tabs; UNVERIFIED
- TabsProps: type; owner tabs; PASS
- TabsTab: function; owner tabs; PASS; props: TabsTabProps
- TabsTabProps: type; owner tabs; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Tabs / TabsList
当前视角与手动激活列表。
- value / defaultValue / onValueChange / orientation: Base UI Root props. 值由应用或原语持有；取消不切换。
- activateOnFocus: boolean; default false. 默认焦点移动不自动切换；消费者可明确选择自动激活。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### TabsTab
具有关联面板的 tab。
- value / disabled: Base UI Tab props. value 稳定；禁用标签可聚焦但不能激活。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### TabsPanel / TabsPrimitive
原生 tabpanel 与公开原语。
- value / keepMounted: Base UI Panel props; default keepMounted=true. 默认保留挂载与输入；false 由应用承担卸载后果。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard
- ← / → / Home / End: 移动标签焦点。
- Enter / Space: 手动激活可用标签。

## Source examples
### 同一条目的两个视角
Source: apps/docs/src/content/tabs/demos/01-task.tsx
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye/ui/components/tabs";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "同一条目的两个视角", titleEn: "Two views of one item" } satisfies DemoMeta;
export default function Demo() { return <Tabs defaultValue="text"><TabsList aria-label="条目视角"><TabsTab value="text">名称</TabsTab><TabsTab value="facts">事实</TabsTab><TabsTab value="unused" disabled>历史</TabsTab></TabsList><TabsPanel value="text"><Field><FieldLabel>名称草稿</FieldLabel><Input defaultValue="条目 A" /></Field></TabsPanel><TabsPanel value="facts"><dl className="m-0 text-body"><dt>标识</dt><dd className="m-0">a</dd><dt>数量</dt><dd className="m-0">0</dd></dl></TabsPanel></Tabs>; }
```
