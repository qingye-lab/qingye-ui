# 切换组 ToggleGroup

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/toggle-group
Source: packages/ui/src/components/toggle-group.tsx
Source SHA-256: e6d0a41d40a88d1ab06acaef373625825365b9c0a7215e0b982508522a5285a9

关联一组单选或多选的切换按钮：选项保持切换状态。

## Notes
- 没有 name 或隐藏表单值；需要提交的互斥值使用 SegmentedControl。
- single 允许全部松开；不能用它冒充必选 radio。

## Use and ownership
- 同一范围的二态工具按钮
- 允许全部取消的单选或多选切换
- Avoid: 表单互斥值用 SegmentedControl
- Avoid: 面板视角用 Tabs
- Library: 非受控值数组、roving focus、切换
- Application: 受控数组、选项、相关内容

## Composition
- ToggleGroup + ToggleGroupItem；组的名称必须说明共同范围

## Responsive behavior
- 水平方向可以换行，纵向沿上下轴导航；浏览器布局未在本批验证

## Customization
- 既有 action-gap、同名五档及 Toggle 表达

## Current exports
- ToggleGroup: function; owner toggle-group; PASS; props: ToggleGroupProps<Value>
- ToggleGroupItem: function; owner toggle-group; PASS; props: ToggleGroupItemProps<Value>
- ToggleGroupItemProps: type; owner toggle-group; PASS
- ToggleGroupPrimitive: reexport; owner toggle-group; UNVERIFIED
- ToggleGroupProps: type; owner toggle-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ToggleGroup
单选与多选都使用数组；单选允许取消成 []。
- multiple: boolean; default false. false 为 single，最多切换一项；true 为 multiple，可切换多项。
- value / defaultValue: readonly string[]. 两种模式都是值数组，single 不是 string。[] 表示全部松开。
- onValueChange: (values: string[], details) => void. 传出完整切换值数组；支持 details.cancel()。
- orientation / loopFocus: "horizontal" | "vertical" / boolean; default "horizontal" / true. 方向键焦点轴与是否在末项循环。焦点移动本身不改变值。
- disabled / size: boolean / ToggleSize. 禁用全组；size 默认 md，供项继承，可由项显式改写。
- aria-label / aria-labelledby / render / ref: Base UI composition. 共同名称与根部位，透传样式与原生事件。

### ToggleGroupItem
有唯一 value 的 Toggle，继承组的尺寸与原语状态。
- value: string. 组内唯一标识，必填。
- disabled / shape / size / render / ref: Toggle props. 项的限制、几何及公共组合入口。

### ToggleGroupPrimitive
Base UI 切换组原语；项原语由 TogglePrimitive 导出。

## Keyboard
- Tab / Shift+Tab: 保留组的一个焦点停靠点。
- ← / → 或 ↑ / ↓: 沿 orientation 移动焦点，跳过禁用项；loopFocus 决定是否循环。
- Space / Enter: 改变当前项的切换事实。

## Source examples
### 单选与多选
Source: apps/docs/src/content/toggle-group/demos/01-modes.tsx
```tsx
import { useId, useState } from "react";
import { Field, FieldGroup, FieldTitle } from "@qingye_lab/ui/components/field";
import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";

export const meta = { title: "单选与多选", titleEn: "Single and multiple" };
export default function Demo() {
  const id = useId(); const [single, setSingle] = useState(["alpha"]); const [multiple, setMultiple] = useState(["alpha"]);
  return <FieldGroup className="grid sm:grid-cols-2">
    <Field><FieldTitle id={`${id}-single`}>单选切换</FieldTitle><ToggleGroup aria-labelledby={`${id}-single`} value={single} onValueChange={setSingle}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta">记录数</ToggleGroupItem><ToggleGroupItem value="gamma">最近同步</ToggleGroupItem></ToggleGroup><output className="text-support text-foreground">{single.length} 列可见</output></Field>
    <Field><FieldTitle id={`${id}-multiple`}>多选切换</FieldTitle><ToggleGroup multiple aria-labelledby={`${id}-multiple`} value={multiple} onValueChange={setMultiple}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta">记录数</ToggleGroupItem><ToggleGroupItem value="gamma">最近同步</ToggleGroupItem></ToggleGroup><output className="text-support text-foreground">{multiple.length} 列可见</output></Field>
  </FieldGroup>;
}
```

### 方向与禁用
Source: apps/docs/src/content/toggle-group/demos/02-orientation.tsx
```tsx
import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";

export const meta = { title: "方向与禁用", titleEn: "Orientation and disabled" };
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-field-group-gap)">
    <ToggleGroup orientation="vertical" loopFocus={false} aria-label="纵向切换候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta" disabled>记录数</ToggleGroupItem><ToggleGroupItem value="gamma">最近同步</ToggleGroupItem></ToggleGroup>
    <ToggleGroup disabled aria-label="禁用的切换候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta">记录数</ToggleGroupItem></ToggleGroup>
  </div>;
}
```
