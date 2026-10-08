# FilterBar

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/filter-bar
Source: packages/ui/src/components/filter-bar.tsx
Source SHA-256: b38f125404d71978bc70615a66d849c3a72958058c1a86177d918b00b2d6c811

Shows draft conditions separately from applied facts.

## Decision
Dirty and appliedSummary are required facts; Apply emits intent without changing conditions or requesting results.

## Notes
- Place Field/Input inside Fields; clearing follows application policy and never fabricates results.

## Use and ownership
- Several conditions need explicit apply/cancel boundaries.
- Avoid: Treating draft condition counts as applied result counts.
- Library: Native submission, fieldset disabling, and state markers.
- Application: Drafts, applied conditions, results, counts, and asynchronous execution.

## Composition
- FilterBar: A native filter form and fact context.
- FilterBarFields / FilterBarApplied / FilterBarStatus / FilterBarActions: Fieldset, summary, unapplied status and related actions.
- FilterBarApply / FilterBarCancel / FilterBarClear: Real intent controls composed from Button.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

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
A native filter form and fact context.
- dirty / appliedSummary / disabled / canClear: boolean / ReactNode. Applications supply draft differences, applied summary and clear availability; zero is retained.
- onApply / onCancel / onClear / onSubmit: native event callbacks. onSubmit.preventDefault() cancels Apply; Apply prevents native navigation.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### FilterBarFields / FilterBarApplied / FilterBarStatus / FilterBarActions
Fieldset, summary, unapplied status and related actions.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### FilterBarApply / FilterBarCancel / FilterBarClear
Real intent controls composed from Button.
- children / disabled / onClick / ref: ButtonProps. Buttons never edit drafts; missing handlers or unavailable facts disable actions.

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
