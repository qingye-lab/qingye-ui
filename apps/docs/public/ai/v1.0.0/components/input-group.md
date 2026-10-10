# 输入组合 InputGroup

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/input-group
Source: packages/ui/src/components/input-group.tsx
Source SHA-256: b51acf251a0804792370d6cad9330c80faa37a60a64d93842eab229e62334551

让输入与标记、单位或附属动作共用编辑边界。

## Decision
InputGroupInput 复用 Input 的 unstyled 出口。静态附件不抢焦点；需要动作时组合 Button，并保留动作自己的名称与状态。

## Notes
- FieldControl 注册组合时传 InputGroupInput nativeInput，避免重复注册。
- 禁用输入不意味着禁用任意附属动作；应用应声明每个动作的真实状态。

## Use and ownership
- 输入与单位、标记或附属动作属于同一编辑范围。
- Avoid: 把无关动作附在输入上；只靠附件或 Placeholder 命名输入。
- Library: 共同边界、几何接线及 Input 的原生交互。
- Application: 输入值、附件动作、名称及校验事实。

## Composition
- FieldLabel 命名输入；附件的必要说明由 aria-describedby 显式关联。已有搜索和密码形态直接用 Input。

## Responsive behavior
- 输入占剩余宽度；边界与内部 Input 一套几何，跟随密度轴，紧凑不缩小文字，粗指针目标单独保持。

## Customization
- root 样式属于共同边界，Input 的 className/style/render/ref 属于实际输入；附件有独立 render。

## Current exports
- InputGroup: function; owner input-group; PASS; props: InputGroupProps
- InputGroupAddon: function; owner input-group; PASS; props: InputGroupAddonProps
- InputGroupAddonProps: type; owner input-group; PASS
- InputGroupInput: function; owner input-group; PASS; props: InputGroupInputProps
- InputGroupInputProps: type; owner input-group; PASS
- InputGroupProps: type; owner input-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### InputGroup
共同编辑边界，不自动建立另一个字段角色。
- render / ref / 原生属性: useRender.ComponentProps<div>. 共同边界组合入口。

### InputGroupInput
Input 的 unstyled 组合，尺寸来自组。
- InputProps（除 size / unstyled）: InputGroupInputProps. 保留原生输入、受控值、搜索/密码、nativeInput 与实际输入 ref。

### InputGroupAddon
默认静态 span；不添加 tabIndex、聚焦处理或自动名称。
- render / ref / 原生属性: useRender.ComponentProps<span>. 单位、标记或显式 Button 的承载位。

## Keyboard

## Source examples
### 单位与动作
Source: apps/docs/src/content/input-group/demos/01-addon.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye_lab/ui/components/input-group";

export const meta = { title: "单位与动作", titleEn: "Unit and action" };
export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>数值</FieldLabel><InputGroup><InputGroupInput inputMode="decimal" /><InputGroupAddon>px</InputGroupAddon><InputGroupAddon className="p-0"><Button variant="quiet" className="min-h-0 self-stretch sm:min-h-0">应用</Button></InputGroupAddon></InputGroup></Field>;
}
```

### 状态
Source: apps/docs/src/content/input-group/demos/02-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "状态", titleEn: "States" };
export default function Demo() {
  return <Stack gap="fields" className="w-full max-w-sm"><Field disabled><FieldLabel>禁用</FieldLabel><InputGroup><InputGroupInput /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field><FieldLabel>只读</FieldLabel><InputGroup><InputGroupInput readOnly defaultValue="0" /><InputGroupAddon>px</InputGroupAddon></InputGroup></Field><Field invalid><FieldLabel>数值</FieldLabel><InputGroup><InputGroupInput /><InputGroupAddon>px</InputGroupAddon></InputGroup><FieldError>请输入数值</FieldError></Field></Stack>;
}
```
