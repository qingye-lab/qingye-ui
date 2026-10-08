# 批量操作 BulkActionBar

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/bulk-action-bar
Source: packages/ui/src/components/bulk-action-bar.tsx
Source SHA-256: c8f48a1a7981e1ff7c53d581e28d26e19a61e2cefe8ff78b049d7fd50c78ae35

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
- BulkActionBarProps: type; owner bulk-action-bar; PASS
- BulkActionSnapshot: interface; owner bulk-action-bar; PASS
- BulkActionTarget: interface; owner bulk-action-bar; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### BulkActionBar
可识别的作用对象与范围。
- targets / scope: readonly BulkActionTarget[] / string. 每项 id/label/version 必填，id 唯一；version=0 合法；scope 非空。
- disabled / onClear: boolean / callback. 清除收到当前快照，不取消服务或自行清空应用状态。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### BulkActionBarActions / BulkActionBarAction / BulkActionBarClear
同组动作与清除选择。
- onExecute: (snapshot, event) => void. onClick.preventDefault() 取消；危险操作需另外提供后果保护。
- Button props: ButtonProps. 尺寸、ref、render 与真实禁用消费当前 Button。

## Keyboard

## Source examples
### 对象与当前版本
Source: apps/docs/src/content/bulk-action-bar/demos/01-task.tsx
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
