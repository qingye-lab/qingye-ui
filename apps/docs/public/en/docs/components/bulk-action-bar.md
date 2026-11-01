# BulkActionBar

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/bulk-action-bar
Source: packages/ui/src/components/bulk-action-bar.tsx
Source SHA-256: 5562a5a02d396089e7726042e528cd777bae5d96974767a833a7ac537f4d9680

Shared actions with explicit targets, versions and scope.

## Decision
Targets and scope are required; execution receives the current target/version snapshot, and zero selection prevents execution.

## Notes
- The library displays versions without judging freshness; applications revalidate actual versions at execution.
- Since 5.2.0: formatCount and summary rewrite the count text per object and add totals; omitting them behaves as before.

## Use and ownership
- Shared actions for explicitly selected objects.
- Avoid: Toolbar cannot infer objects or versions; do not invent backend confirmation.
- Library: Snapshot delivery, scope presentation, and disabling zero-selection actions.
- Application: Objects, versions, scope, permissions, consequences, and execution outcomes.

## Composition
- BulkActionBar: Identifiable operation targets and scope.
- BulkActionBarExtend: Entry that extends the page selection to the whole set; it appears only when rendered and never infers whether more exist.
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
- BulkActionBarExtend: function; owner bulk-action-bar; PASS; props: BulkActionBarExtendProps
- BulkActionBarExtendProps: type; owner bulk-action-bar; PASS
- BulkActionBarProps: type; owner bulk-action-bar; PASS
- BulkActionExtent: interface; owner bulk-action-bar; PASS
- BulkActionSnapshot: interface; owner bulk-action-bar; PASS
- BulkActionTarget: interface; owner bulk-action-bar; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### BulkActionBar
- `disabled?`: `boolean`.
- `extent?`: `BulkActionExtent | undefined`.
- `formatCount?`: `(count: number) => string`. 自定已选数量的文案（默认「已选 N 项」）。传函数而非量词：量词与名词的位置与单复数随语言和对象变化，由调用方按当前界面语言写完整句；入参是 extent.count（有 extent 时）或 targets.length。
- `onClear?`: `(snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void`.
- `scope`: `string`.
- `sticky?`: `boolean`.
- `summary?`: `React.ReactNode`. 数量之后的补充摘要（如合计金额）。与数量同在 aria-describedby 引用的区域，读屏一并读出；不截断，放不下的是后面的对象清单。
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

### BulkActionBarExtend
- `className?`: `string`.
- `count`: `number`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `onClick?`: `ButtonProps["onClick"]`.
- `onExtend`: `(event: React.MouseEvent<HTMLButtonElement>) => void`.
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 287 inherited (@types/react 284, @base-ui/react 3); not expanded, see the installed declarations

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
- extent: { count: number; label: string }. An application-defined whole set (positive integer count, nonempty label); shows count and label instead of listing targets, targets may be empty, and the snapshot carries extent for the application to execute against its own query.
- sticky: boolean. Sticks to the nearest scroll container (WorkspaceContent in a Workspace); do not place it inside an intermediate overflow container. The divider appears only while stuck with content scrolling beneath (data-stuck).
- formatCount: (count: number) => string. Customizes the selected-count text; the default reads "N selected". It receives extent.count when extent is present, otherwise targets.length. A function rather than a unit string, since measure word, noun placement and plurals vary by language and object: the caller writes the whole phrase for the current UI language.
- summary: React.ReactNode. A supplementary summary after the count, such as a total amount or size. It lives in the same aria-describedby region as the count, so screen readers read both; it uses tabular numbers and is not truncated, the target list after it truncates first. The application computes the data; the library does not aggregate.
- disabled / onClear: boolean / callback. Clear receives the current snapshot; it never cancels a service or clears application state itself.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### BulkActionBarExtend
Entry that extends the page selection to the whole set; it appears only when rendered and never infers whether more exist.
- count / onExtend: number / (event) => void. Default text is Select all N items with locale-grouped digits; onClick.preventDefault() cancels.

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

### 跨页范围
Source: apps/docs/src/content/bulk-action-bar/demos/03-extent.tsx
```tsx
import * as React from "react";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear, BulkActionBarExtend } from "@qingye_lab/ui/components/bulk-action-bar";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "跨页范围", titleEn: "Extent beyond the page" } satisfies DemoMeta;
const page = [{ id: "a", label: "接入设备", version: 1 }, { id: "b", label: "权限与角色", version: 1 }];
export default function Demo() {
  const [extended, setExtended] = React.useState(false); const [result, setResult] = React.useState("未执行");
  return <Stack><BulkActionBar targets={extended ? [] : page} extent={extended ? { count: 1284, label: "符合当前筛选的全部条目" } : undefined} scope="本地筛选结果" onClear={() => setExtended(false)}>{!extended && <BulkActionBarExtend count={1284} onExtend={() => setExtended(true)} />}<BulkActionBarActions><BulkActionBarAction onExecute={snapshot => setResult(snapshot.extent ? `按应用持有的查询处理 ${snapshot.extent.count} 项` : `处理 ${snapshot.targets.length} 项`)}>标记</BulkActionBarAction><BulkActionBarClear /></BulkActionBarActions></BulkActionBar><output className="text-support">{result}</output></Stack>;
}
```

### 量词与合计
Source: apps/docs/src/content/bulk-action-bar/demos/04-summary.tsx
```tsx
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "量词与合计", titleEn: "Unit and total" } satisfies DemoMeta;

const targets = [{ id: "a", label: "文件 A", version: 1, size: 12 }, { id: "b", label: "文件 B", version: 1, size: 30 }, { id: "c", label: "文件 C", version: 2, size: 8 }];

export default function Demo() {
  const total = targets.reduce((sum, target) => sum + target.size, 0);
  return (
    <BulkActionBar targets={targets} scope="当前文件夹所选文件" formatCount={count => `已选 ${count} 个文件`} summary={`共 ${total} MB`}>
      <BulkActionBarActions><BulkActionBarAction onExecute={() => {}}>移动</BulkActionBarAction><BulkActionBarClear onClick={() => {}} /></BulkActionBarActions>
    </BulkActionBar>
  );
}
```
