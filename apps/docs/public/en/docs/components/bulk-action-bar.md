# BulkActionBar

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/bulk-action-bar
Source: packages/ui/src/components/bulk-action-bar.tsx
Source SHA-256: c8f48a1a7981e1ff7c53d581e28d26e19a61e2cefe8ff78b049d7fd50c78ae35

Shared actions with explicit targets, versions and scope.

## Decision
Targets and scope are required; execution receives the current target/version snapshot, and zero selection prevents execution.

## Notes
- The library displays versions without judging freshness; applications revalidate actual versions at execution.

## Use and ownership
- Shared actions for explicitly selected objects.
- Avoid: Toolbar cannot infer objects or versions; do not invent backend confirmation.
- Library: Snapshot delivery, scope presentation, and disabling zero-selection actions.
- Application: Objects, versions, scope, permissions, consequences, and execution outcomes.

## Composition
- BulkActionBar: Identifiable operation targets and scope.
- BulkActionBarActions / BulkActionBarAction / BulkActionBarClear: Related actions and selection clearing.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

## Current exports
- BulkActionBar: function; owner bulk-action-bar; PASS; props: BulkActionBarProps
- BulkActionBarAction: function; owner bulk-action-bar; PASS; props: BulkActionBarActionProps
- BulkActionBarActionProps: type; owner bulk-action-bar; PASS
- BulkActionBarActions: function; owner bulk-action-bar; PASS; props: BulkActionBarActionsProps
- BulkActionBarActionsProps: type; owner bulk-action-bar; PASS
- BulkActionBarClear: function; owner bulk-action-bar; PASS; props: BulkActionBarClearProps
- BulkActionBarClearProps: type; owner bulk-action-bar; PASS
- BulkActionBarProps: type; owner bulk-action-bar; PASS
- BulkActionSnapshot: interface; owner bulk-action-bar; PASS
- BulkActionTarget: interface; owner bulk-action-bar; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### BulkActionBar
- `disabled?`: `boolean`.
- `onClear?`: `(snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void`.
- `scope`: `string`.
- `targets`: `readonly BulkActionTarget[]`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### BulkActionBarAction
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `onExecute`: `(snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void`.
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### BulkActionBarActions
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### BulkActionBarClear
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context BulkContext: without a provider throws; provided by BulkActionBar

## Curated API
Written descriptions; the list above is the type-resolved fact.

### BulkActionBar
Identifiable operation targets and scope.
- targets / scope: readonly BulkActionTarget[] / string. Each target requires id, label and version; IDs are unique, version=0 is valid and scope is nonempty.
- disabled / onClear: boolean / callback. Clear receives the current snapshot; it never cancels a service or clears application state itself.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### BulkActionBarActions / BulkActionBarAction / BulkActionBarClear
Related actions and selection clearing.
- onExecute: (snapshot, event) => void. onClick.preventDefault() cancels execution; dangerous actions require separate consequence protection.
- Button props: ButtonProps. Sizes, refs, render and actual disabled behavior use the current Button.

## Keyboard

## Source examples
### 已选对象与动作
Source: apps/docs/src/content/bulk-action-bar/demos/01-task.tsx
```tsx
import * as React from "react";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "已选对象与动作", titleEn: "Selected targets and actions" } satisfies DemoMeta;
const selection = [{ id: "a", label: "接入设备", version: 1 }, { id: "b", label: "权限与角色", version: 1 }];
export default function Demo() {
  const [targets, setTargets] = React.useState(selection);
  const clear = () => setTargets([]);
  return <BulkActionBar className="w-full max-w-xl" targets={targets} scope="所选条目" onClear={clear}>
    <BulkActionBarActions><BulkActionBarAction onExecute={clear}>标记</BulkActionBarAction><BulkActionBarClear /></BulkActionBarActions>
  </BulkActionBar>;
}
```

### 对象与当前版本
Source: apps/docs/src/content/bulk-action-bar/demos/02-versions.tsx
```tsx
import * as React from "react";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "对象与当前版本", titleEn: "Targets and current versions" } satisfies DemoMeta;
export default function Demo() {
  const [items, setItems] = React.useState([{ id: "a", label: "接入设备", version: 0, marked: false }, { id: "b", label: "权限与角色", version: 1, marked: false }]); const [selected, setSelected] = React.useState<string[]>(["a"]); const [result, setResult] = React.useState("未执行");
  return <Stack>{items.map(item => <Inline key={item.id}><Checkbox aria-label={`选择 ${item.label}`} checked={selected.includes(item.id)} onCheckedChange={checked => setSelected(value => checked ? [...value, item.id] : value.filter(id => id !== item.id))} /><span className="text-body">{item.label} · {item.marked ? "已标记" : "未标记"}</span></Inline>)}<BulkActionBar targets={items.filter(item => selected.includes(item.id))} scope="本地集合所选条目" onClear={() => setSelected([])}><BulkActionBarActions><BulkActionBarAction onExecute={snapshot => { const ids = new Set(snapshot.targets.map(item => item.id)); setItems(value => value.map(item => ids.has(item.id) ? { ...item, marked: true, version: item.version + 1 } : item)); setResult(`已标记 ${snapshot.targets.length} 项`); }}>标记</BulkActionBarAction><BulkActionBarClear /></BulkActionBarActions></BulkActionBar><output className="text-support">{result}</output></Stack>;
}
```
