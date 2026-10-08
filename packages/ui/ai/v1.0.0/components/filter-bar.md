# 筛选条件 FilterBar

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/filter-bar
Source: packages/ui/src/components/filter-bar.tsx
Source SHA-256: b38f125404d71978bc70615a66d849c3a72958058c1a86177d918b00b2d6c811

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### FilterBar
原生筛选 form 与事实上下文。
- dirty / appliedSummary / disabled / canClear: boolean / ReactNode. 应用明确草稿差异、已应用摘要与是否可清除；零值保留。
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
### 草稿与结果分开
Source: apps/docs/src/content/filter-bar/demos/01-task.tsx
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
