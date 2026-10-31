# 批量操作 BulkActionBar

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/bulk-action-bar
Source: packages/ui/src/components/bulk-action-bar.tsx
Source SHA-256: 0ee64f6d87a9f5c4cdc29e90f2582d267f49a94e6a881bb72f3784cd8ff9a8af

明确对象、版本与范围的共同动作。

## Decision
targets 与 scope 必填；执行传递当前对象版本快照，零选择禁止执行。

## Notes
- 库显示对象版本而不推断新旧；应用在执行边界复核实际版本。

## Use and ownership
- 已明确选择对象的共同操作。
- Avoid: 工具组 Toolbar 不能推断对象或版本；不造后端确认。
- Library: 快照传递、范围呈现与零选择禁用。
- Application: 对象、版本、范围、权限、后果与执行结果。

## Composition
- BulkActionBar：可识别的作用对象与范围。
- BulkActionBarExtend：把本页选择扩展为整个集合的入口；仅在调用方渲染时出现，不推断是否还有更多。
- BulkActionBarActions / BulkActionBarAction / BulkActionBarClear：同组动作与清除选择。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

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
- `onClear?`: `(snapshot: BulkActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void`.
- `scope`: `string`.
- `sticky?`: `boolean`.
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
可识别的作用对象与范围。
- targets / scope: readonly BulkActionTarget[] / string. 每项 id/label/version 必填，id 唯一；version=0 合法；scope 非空。
- extent: { count: number; label: string }. 应用定义的整个集合（count 为正整数、label 非空）；显示计数与 label 而不列对象，targets 可为空，快照带 extent，由应用按自己持有的查询执行。
- sticky: boolean. 吸附在最近的滚动容器顶端（Workspace 中为 WorkspaceContent），不能放进带 overflow 的中间容器；吸住且有内容滚过时才出现分界线（data-stuck）。
- disabled / onClear: boolean / callback. 清除收到当前快照，不取消服务或自行清空应用状态。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### BulkActionBarExtend
把本页选择扩展为整个集合的入口；仅在调用方渲染时出现，不推断是否还有更多。
- count / onExtend: number / (event) => void. 默认文字「选择全部 N 项」，数字按界面语言分组；onClick.preventDefault() 取消。

### BulkActionBarActions / BulkActionBarAction / BulkActionBarClear
同组动作与清除选择。
- onExecute: (snapshot, event) => void. onClick.preventDefault() 取消；危险操作需另外提供后果保护。
- Button props: ButtonProps. 尺寸、ref、render 与真实禁用消费当前 Button。

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
