# 视角标签 Tabs

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/tabs
Source: packages/ui/src/components/tabs.tsx
Source SHA-256: 96d314f6778de1535f266d5db4b31ef9a2cd5fc14b6ae7bb140fceaf3472e448

同一对象的不同视角，保留面板草稿。

## Decision
默认手动激活、面板保留挂载；切换视角不等于批准或保存草稿。

## Notes
- 导航线与轨道是两种外观，表达的都是「几个并列的去处」；用哪一种与条目从哪来无关。切换面板用 Tabs，跳转路由用 NavigationMenu 或链接，产生一个值用 SegmentedControl，三者都可以画成轨道，各自的语义不变。
- 横向放不下时标签栏可滑动，只在还有标签被切掉的那一端渐隐（data-overflow-start / data-overflow-end，随滚动与尺寸实测，RTL 下起止端互换）；滚到头不带动页面。
- 到达过的隐藏面板仍挂载但退出可访问树；没到达过的面板不在 DOM 里。不要把切换当成保存成功。

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
- TabsAppearance: type; owner tabs; PASS
- TabsList: function; owner tabs; PASS; props: TabsListProps
- TabsListProps: type; owner tabs; PASS
- TabsPanel: function; owner tabs; PASS; props: TabsPanelProps
- TabsPanelProps: type; owner tabs; PASS
- TabsPrimitive: reexport; owner tabs; UNVERIFIED
- TabsProps: type; owner tabs; PASS
- TabsTab: function; owner tabs; PASS; props: TabsTabProps
- TabsTabProps: type; owner tabs; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Tabs
- `appearance?`: `"track" | "line"`. 标签栏的外观，一处设置整组生效。`line`（默认）是导航线；`track` 是围在轨道里的选中面，横纵都成立。
- plus 282 inherited (@types/react 275, @base-ui/react 7); not expanded, see the installed declarations

### TabsList
- no props declared by this library
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### TabsPanel
- `keepMounted?`: `"visited" | boolean`. "visited"（默认）：第一次到达时才挂载，之后保留；true：一开始就全部挂载；false：离开即卸载。
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### TabsTab
- no props declared by this library
- plus 289 inherited (@types/react 283, @base-ui/react 6); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context AppearanceContext: without a provider default-value; provided by Tabs

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Tabs / TabsList
当前视角与手动激活列表。
- value / defaultValue / onValueChange / orientation: Base UI Root props. 值由应用或原语持有；取消不切换。
- appearance: "line" | "track"; default "line". 标签栏外观，设在 Tabs 上整组生效。line 是导航线，track 是围在轨道里的选中面，横纵都成立。外观不改变 tablist / tab / tabpanel 的语义。
- activateOnFocus: boolean; default false. 默认焦点移动不自动切换；消费者可明确选择自动激活。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### TabsTab
具有关联面板的 tab。
- value / disabled: Base UI Tab props. value 稳定；禁用标签可聚焦但不能激活。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### TabsPanel / TabsPrimitive
原生 tabpanel 与公开原语。
- value / keepMounted: Value / boolean | "visited"; default keepMounted="visited". visited：第一次到达才挂载，之后保留输入与已取回的内容，没到过的面板不发请求。true：一开始全部挂载，跨标签页一起提交的原生表单字段用它。false：离开即卸载，由应用承担后果。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

## Keyboard
- ← / → / Home / End: 移动标签焦点。
- Enter / Space: 手动激活可用标签。

## Source examples
### 同一条目的两个视角
Source: apps/docs/src/content/tabs/demos/01-task.tsx
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "同一条目的两个视角", titleEn: "Two views of one item" } satisfies DemoMeta;
export default function Demo() { return <Tabs defaultValue="text"><TabsList aria-label="条目视角"><TabsTab value="text">名称</TabsTab><TabsTab value="facts">事实</TabsTab><TabsTab value="unused" disabled>历史</TabsTab></TabsList><TabsPanel value="text"><Field><FieldLabel>名称草稿</FieldLabel><Input defaultValue="同步与导出" /></Field></TabsPanel><TabsPanel value="facts"><dl className="m-0 text-body"><dt>标识</dt><dd className="m-0">exports</dd><dt>记录数</dt><dd className="m-0">0</dd></dl></TabsPanel></Tabs>; }
```

### 轨道外观
Source: apps/docs/src/content/tabs/demos/02-track.tsx
```tsx
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "轨道外观", titleEn: "Track appearance" } satisfies DemoMeta;
export default function Demo() {
  return <Tabs appearance="track" defaultValue="day"><TabsList aria-label="统计周期"><TabsTab value="day">日</TabsTab><TabsTab value="week">周</TabsTab><TabsTab value="month">月</TabsTab></TabsList><TabsPanel value="day">今日 12 条</TabsPanel><TabsPanel value="week">本周 84 条</TabsPanel><TabsPanel value="month">本月 361 条</TabsPanel></Tabs>;
}
```
