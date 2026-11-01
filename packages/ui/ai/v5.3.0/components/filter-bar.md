# 筛选条件 FilterBar

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/filter-bar
Source: packages/ui/src/components/filter-bar.tsx
Source SHA-256: ded3c2eaf37f9dcb9852c5195cbdca5523d62233af35237c20026b61addc7431

分开显示草稿条件与已应用事实。

## Decision
dirty 和 appliedSummary 是必填事实；点击应用只发出意图，库不修改条件或请求结果。

## Notes
- Field/Input 放在 Fields 中；清除是应用策略，不伪造结果。

## Use and ownership
- 多个条件需要明确应用/取消边界。
- Avoid: 不要把草稿数量当作已应用结果数量。
- Library: 原生提交、fieldset 禁用与状态标记。
- Application: 草稿、已应用条件、结果、计数和异步执行。

## Composition
- FilterBar：原生筛选 form 与事实上下文。
- FilterBarFields / FilterBarApplied / FilterBarStatus / FilterBarActions：fieldset、摘要、待应用状态与同组操作。
- FilterBarApply / FilterBarCancel / FilterBarClear：复用 Button 的真实意图入口。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

## Current exports
- FilterBar: function; owner filter-bar; PASS; props: FilterBarProps
- FilterBarActions: function; owner filter-bar; PASS; props: FilterBarActionsProps
- FilterBarActionsProps: type; owner filter-bar; PASS
- FilterBarApplied: function; owner filter-bar; PASS; props: FilterBarAppliedProps
- FilterBarAppliedProps: type; owner filter-bar; PASS
- FilterBarApply: function; owner filter-bar; PASS; props: FilterBarApplyProps
- FilterBarApplyProps: type; owner filter-bar; PASS
- FilterBarCancel: function; owner filter-bar; PASS; props: FilterBarCancelProps
- FilterBarCancelProps: type; owner filter-bar; PASS
- FilterBarClear: function; owner filter-bar; PASS; props: FilterBarClearProps
- FilterBarClearProps: type; owner filter-bar; PASS
- FilterBarFields: function; owner filter-bar; PASS; props: FilterBarFieldsProps
- FilterBarFieldsProps: type; owner filter-bar; PASS
- FilterBarProps: type; owner filter-bar; PASS
- FilterBarStatus: function; owner filter-bar; PASS; props: FilterBarStatusProps
- FilterBarStatusProps: type; owner filter-bar; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### FilterBar
- `appliedSummary`: `React.ReactNode`.
- `canClear?`: `boolean`.
- `dirty`: `boolean`.
- `disabled?`: `boolean`.
- `onApply`: `React.FormEventHandler<HTMLFormElement>`.
- `onCancel?`: `React.MouseEventHandler<HTMLButtonElement>`.
- `onClear?`: `React.MouseEventHandler<HTMLButtonElement>`.
- `sticky?`: `boolean`.
- plus 287 inherited (@types/react 286, @base-ui/react 1); not expanded, see the installed declarations

### FilterBarActions
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### FilterBarApplied
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### FilterBarApply
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### FilterBarCancel
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### FilterBarClear
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### FilterBarFields
- no props declared by this library
- plus 284 inherited (@types/react 283, @base-ui/react 1); not expanded, see the installed declarations

### FilterBarStatus
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context FilterContext: without a provider throws; provided by FilterBar

## Curated API
Written descriptions; the list above is the type-resolved fact.

### FilterBar
原生筛选 form 与事实上下文。
- dirty / appliedSummary / disabled / canClear: boolean / ReactNode. 应用明确草稿差异、已应用摘要与是否可清除；零值保留。
- sticky: boolean. 吸附在最近的滚动容器顶端（Workspace 中为 WorkspaceContent），不能放进带 overflow 的中间容器；吸住且有内容滚过时才出现分界线（data-stuck）。
- onApply / onCancel / onClear / onSubmit: native event callbacks. onSubmit.preventDefault() 取消应用；Apply 阻止浏览器导航。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### FilterBarFields / FilterBarApplied / FilterBarStatus / FilterBarActions
fieldset、摘要、待应用状态与同组操作。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### FilterBarApply / FilterBarCancel / FilterBarClear
复用 Button 的真实意图入口。
- children / disabled / onClick / ref: ButtonProps. 按钮不自行更新草稿；缺少处理器或不可用事实时禁用。

## Keyboard

## Source examples
### 草稿与已应用条件
Source: apps/docs/src/content/filter-bar/demos/01-task.tsx
```tsx
import * as React from "react";
import { FilterBar, FilterBarFields, FilterBarApplied, FilterBarStatus, FilterBarActions, FilterBarApply, FilterBarCancel, FilterBarClear } from "@qingye_lab/ui/components/filter-bar";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "草稿与已应用条件", titleEn: "Draft and applied conditions" } satisfies DemoMeta;
export default function Demo() {
  const [draft, setDraft] = React.useState(""); const [applied, setApplied] = React.useState("");
  return <FilterBar className="w-full max-w-sm" dirty={draft !== applied} appliedSummary={applied ? `已应用名称：${applied}` : "已应用：全部本地条目"} canClear={Boolean(applied || draft)} onApply={() => setApplied(draft)} onCancel={() => setDraft(applied)} onClear={() => { setDraft(""); setApplied(""); }}>
    <FilterBarFields><Field><FieldLabel>名称包含</FieldLabel><Input value={draft} onChange={event => setDraft(event.target.value)} /></Field></FilterBarFields>
    <FilterBarApplied /><FilterBarStatus />
    <FilterBarActions><FilterBarApply /><FilterBarCancel /><FilterBarClear /></FilterBarActions>
  </FilterBar>;
}
```

### 草稿与结果分开
Source: apps/docs/src/content/filter-bar/demos/02-results.tsx
```tsx
import * as React from "react";
import { FilterBar, FilterBarFields, FilterBarApplied, FilterBarStatus, FilterBarActions, FilterBarApply, FilterBarCancel, FilterBarClear } from "@qingye_lab/ui/components/filter-bar";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "草稿与结果分开", titleEn: "Drafts separate from results" } satisfies DemoMeta;
const items = ["接入设备", "权限与角色", "同步与导出"];
export default function Demo() {
  const [draft, setDraft] = React.useState(""); const [applied, setApplied] = React.useState(""); const results = items.filter(item => item.includes(applied));
  return <Stack><FilterBar dirty={draft !== applied} appliedSummary={applied ? `已应用名称：${applied}` : "已应用：全部本地条目"} canClear={Boolean(applied || draft)} onApply={() => setApplied(draft)} onCancel={() => setDraft(applied)} onClear={() => { setDraft(""); setApplied(""); }}><FilterBarFields><Field><FieldLabel>名称包含</FieldLabel><Input value={draft} onChange={event => setDraft(event.target.value)} /></Field></FilterBarFields><FilterBarApplied /><FilterBarStatus /><FilterBarActions><FilterBarApply /><FilterBarCancel /><FilterBarClear /></FilterBarActions></FilterBar><p className="m-0 text-support">{results.length} 项</p>{results.length ? <ul className="m-0 text-body">{results.map(item => <li key={item}>{item}</li>)}</ul> : <p className="m-0 text-body">没有符合已应用条件的条目</p>}</Stack>;
}
```

### 吸顶
Source: apps/docs/src/content/filter-bar/demos/03-sticky.tsx
```tsx
import * as React from "react";
import { FilterBar, FilterBarFields, FilterBarActions, FilterBarApply } from "@qingye_lab/ui/components/filter-bar";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "吸顶", titleEn: "Sticky" } satisfies DemoMeta;
export default function Demo() {
  const [draft, setDraft] = React.useState(""); const [applied, setApplied] = React.useState("");
  return <div className="h-64 overflow-y-auto bg-surface"><FilterBar sticky dirty={draft !== applied} appliedSummary={applied ? `已应用名称：${applied}` : "已应用：全部"} onApply={() => setApplied(draft)}><FilterBarFields><Field><FieldLabel>名称包含</FieldLabel><Input value={draft} onChange={event => setDraft(event.target.value)} /></Field></FilterBarFields><FilterBarActions><FilterBarApply /></FilterBarActions></FilterBar><ul className="m-0 text-body">{Array.from({ length: 30 }, (_, index) => <li key={index}>条目 {index + 1}</li>)}</ul></div>;
}
```

### 收起次要条件
Source: apps/docs/src/content/filter-bar/demos/04-collapsible.tsx
```tsx
import * as React from "react";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye_lab/ui/components/collapsible";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { FilterBar, FilterBarActions, FilterBarApplied, FilterBarApply, FilterBarCancel, FilterBarClear, FilterBarFields, FilterBarStatus } from "@qingye_lab/ui/components/filter-bar";
import { Input } from "@qingye_lab/ui/components/input";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "收起次要条件", titleEn: "Secondary conditions collapsed" } satisfies DemoMeta;

type Conditions = { name: string; owner: string; tag: string };
const empty: Conditions = { name: "", owner: "", tag: "" };
const labels: Record<keyof Conditions, string> = { name: "名称", owner: "负责人", tag: "标签" };

export default function Demo() {
  const [draft, setDraft] = React.useState(empty); const [applied, setApplied] = React.useState(empty);
  const set = (key: keyof Conditions) => (event: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, [key]: event.target.value });
  const active = (Object.keys(labels) as (keyof Conditions)[]).filter(key => applied[key]);
  const secondary = active.filter(key => key !== "name").length;
  const dirty = (Object.keys(labels) as (keyof Conditions)[]).some(key => draft[key] !== applied[key]);
  return <FilterBar className="w-full max-w-lg" dirty={dirty} appliedSummary={active.length ? `已应用：${active.map(key => `${labels[key]}「${applied[key]}」`).join("、")}` : "已应用：全部条目"} canClear={active.length > 0 || dirty} onApply={() => setApplied(draft)} onCancel={() => setDraft(applied)} onClear={() => { setDraft(empty); setApplied(empty); }}>
    <FilterBarFields><Field><FieldLabel>名称包含</FieldLabel><Input value={draft.name} onChange={set("name")} /></Field></FilterBarFields>
    <Collapsible>
      <CollapsibleTrigger>{secondary ? `更多条件（${secondary}）` : "更多条件"}</CollapsibleTrigger>
      <CollapsiblePanel><FilterBarFields>
        <Field><FieldLabel>负责人</FieldLabel><Input value={draft.owner} onChange={set("owner")} /></Field>
        <Field><FieldLabel>标签</FieldLabel><Input value={draft.tag} onChange={set("tag")} /></Field>
      </FilterBarFields></CollapsiblePanel>
    </Collapsible>
    <FilterBarApplied /><FilterBarStatus />
    <FilterBarActions><FilterBarApply /><FilterBarCancel /><FilterBarClear /></FilterBarActions>
  </FilterBar>;
}
```
