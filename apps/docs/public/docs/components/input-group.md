# 输入组合 InputGroup

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/input-group
Source: packages/ui/src/components/input-group.tsx
Source SHA-256: d338b8110a12bb8dbae442444295b626ad5f63680e8fbb1d2bd4a26ab1c54e02

让输入与标记、单位或附属动作共用编辑边界。

## Decision
InputGroupInput 复用 Input 的 unstyled 出口。静态附件不抢焦点；需要动作时用 InputGroupButton，它与输入共用同一条外边界、自己不画框，并保留动作自己的名称与状态。清空、显示密码这类动作不内置在输入框里，都由这里组合；SearchInput 与 PasswordInput 就是这样搭出来的。

## Notes
- FieldControl 注册组合时传 InputGroupInput nativeInput，避免重复注册。
- 禁用输入不意味着禁用任意附属动作；应用应声明每个动作的真实状态。

## Use and ownership
- 输入与单位、标记或附属动作属于同一编辑范围。
- Avoid: 把无关动作附在输入上；只靠附件或 Placeholder 命名输入。
- Library: 共同边界、几何接线及 Input 的原生交互。
- Application: 输入值、附件动作、名称及校验事实。

## Composition
- FieldLabel 命名输入；附件的必要说明由 aria-describedby 显式关联。搜索与密码已有现成组合 SearchInput、PasswordInput。

## Responsive behavior
- 输入占剩余宽度；边界与内部 Input 一套几何，跟随密度轴，紧凑不缩小文字，粗指针目标单独保持。

## Customization
- root 样式属于共同边界，Input 的 className/style/render/ref 属于实际输入；附件有独立 render。

## Current exports
- InputGroup: function; owner input-group; PASS; props: InputGroupProps
- InputGroupAddon: function; owner input-group; PASS; props: InputGroupAddonProps
- InputGroupAddonProps: type; owner input-group; PASS
- InputGroupButton: function; owner input-group; PASS; props: InputGroupButtonProps
- InputGroupButtonProps: type; owner input-group; PASS
- InputGroupInput: function; owner input-group; PASS; props: InputGroupInputProps
- InputGroupInputProps: type; owner input-group; PASS
- InputGroupProps: type; owner input-group; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### InputGroup
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### InputGroupAddon
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### InputGroupButton
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

### InputGroupInput
- `controlClassName?`: `string`. 编辑边界的样式入口；className / style / render 始终属于真实输入。
- `nativeInput?`: `boolean`. 已由 FieldControl 等原语注册时，直接渲染原生输入，避免重复注册。
- plus 309 inherited (@types/react 303, @base-ui/react 6); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### InputGroup
共同编辑边界，不自动建立另一个字段角色。
- render / ref / 原生属性: useRender.ComponentProps<div>. 共同边界组合入口。

### InputGroupInput
Input 的 unstyled 组合，尺寸来自组。
- InputProps（除 size / unstyled）: InputGroupInputProps. 保留原生输入、受控值、nativeInput 与实际输入 ref。

### InputGroupAddon
默认静态 span；不添加 tabIndex、聚焦处理或自动名称。
- render / ref / 原生属性: useRender.ComponentProps<span>. 单位、前缀、图标等静态内容的承载位。

### InputGroupButton
编辑边界内的动作：不画自己的框，铺满边界内高；图标形为内高见方。
- shape: "label" | "icon"; default "label". 图标形需要 aria-label。
- variant: ButtonProps["variant"]; default "quiet". 边界内默认无框。
- 其余 ButtonProps: ButtonProps. loading、disabled、onClick、render 等与 Button 相同。

## Keyboard

## Source examples
### 单位与动作
Source: apps/docs/src/content/input-group/demos/01-addon.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@qingye_lab/ui/components/input-group";

export const meta = { title: "单位与动作", titleEn: "Unit and action" };
export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>数值</FieldLabel><InputGroup><InputGroupInput inputMode="decimal" /><InputGroupAddon>px</InputGroupAddon><InputGroupButton>应用</InputGroupButton></InputGroup></Field>;
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

### 可清空的输入
Source: apps/docs/src/content/input-group/demos/03-clear.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { InputGroup, InputGroupButton, InputGroupInput } from "@qingye_lab/ui/components/input-group";
import { IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";

export const meta = { title: "可清空的输入", titleEn: "A clearable input" };

export default function Demo() {
  const [value, setValue] = useState("季度复盘");
  const input = useRef<HTMLInputElement>(null);
  return (
    <Field className="w-full max-w-sm">
      <FieldLabel>标题</FieldLabel>
      <InputGroup>
        <InputGroupInput ref={input} value={value} onChange={event => setValue(event.target.value)} />
        {value !== "" && <InputGroupButton shape="icon" aria-label="清空标题" onClick={() => { setValue(""); input.current?.focus(); }}><IconX aria-hidden="true" /></InputGroupButton>}
      </InputGroup>
    </Field>
  );
}
```
