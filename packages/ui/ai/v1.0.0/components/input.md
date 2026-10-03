# 输入框 Input

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/input
Source: packages/ui/src/components/input.tsx
Source SHA-256: 5c4c1e1a52bdf42332b150a7ac805f98fc8468a37c336c537d80ea1879fb24ab

输入一个文本值。搜索、密码与清空动作使用同一个输入入口。

## Decision
输入框只持有输入值；搜索结果与提交由调用方处理。Placeholder 不能代替持续可见的名称。

## Notes
- aria-invalid 来自应用或浏览器校验；值的真伪与是否送达分开表达。
- 提供 FieldLabel、原生 label 或 aria-label。Placeholder 是输入提示，不是名称。
- 原 SearchInput / PasswordInput 改为 Input type="search" / type="password"；loading 与 shortcut 改为明确的状态或 InputGroup 组合。size="default" 改为 "md"；旧外框 className 改为 controlClassName。
- type="file" 保留浏览器文件选择行为与语言；文件列表和业务校验由调用方提供。

## Use and ownership
- 输入一个文本值，原生 type 与内容匹配；搜索结果和提交行为由组合负责。
- Avoid: 用 placeholder 代替名称；把超时变成无效；把未知转成空串或 0；校验失败清空草稿。
- Library: 原生输入、Field 关联、焦点、清空与密码可见性。
- Application: 值的含义、校验事实、候选范围、未知/不适用及送达结果。

## Composition
- 与 FieldLabel、FieldDescription、FieldError 共处；额外单位、标记和动作交给 InputGroup。

## Responsive behavior
- xs/sm/md/lg/xl 消费基础层档案；窄屏增加 4px，粗指针编辑区至少 44px。

## Customization
- className、style、render 与 ref 属于真实 input；controlClassName 属于编辑边界。

## Current exports
- Input: function; owner input; PASS; props: InputProps
- InputPrimitive: reexport; owner input; UNVERIFIED
- InputProps: type; owner input; PASS
- InputSize: type; owner input; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Input
真实边框界定编辑区；Base UI Input 保留 Field 注册和原生属性。
- type: React.HTMLInputTypeAttribute; default "text". search 加搜索标记与可清空动作；password 加可见性开关。不会自动补名称或 placeholder。
- size: "xs" | "sm" | "md" | "lg" | "xl" | number; default "md". 位置对应的几何与控件文字档；数字保留原生 size 的字符宽度含义。
- value / defaultValue / onValueChange: 原生值 / 初始值 / (value, details) => void. 支持受控与非受控值；onChange 同样透传。清空沿同一事件链更新值。
- clearable / clearLabel / onClear: boolean / string / () => void; default type === search. 非空可编辑值可清空；按钮返回输入焦点。禁用与只读时隐藏。
- visibilityToggle: boolean; default type === password. password 的可选附属动作，不更改内容或提交表单。
- visible / defaultVisible / onVisibleChange: boolean / boolean / (visible) => void; default defaultVisible: false. 独立支持受控与非受控可见性。
- showLabel: string. 可见性开关的稳定名称，默认从 locale 读取；aria-pressed 表达当前可见性。
- readOnly: boolean; default false. 保留焦点、复制与表单提交，阻止编辑与清空；默认显示只读标记。
- className / style / render / ref: Base UI Input props. 全部作用于真实 input；className/style 支持状态函数。
- controlClassName: string. 调整共同编辑边界，例如宽度与所在布局；不替代原生属性。
- unstyled: boolean; default false. 由 InputGroup 等公共组合承担边界；保留内高、档案与原生状态。
- nativeInput: boolean; default false. 已由 FieldControl 或其他原语注册时使用原生出口；保留 render/ref/事件，避免重复注册。

## Keyboard
- Tab / Shift+Tab: 在输入与可用附属动作之间移动；禁用动作不进入顺序。
- Escape: 可清空且非空时清空，后续 Escape 返回外层；输入法组字及调用方取消时保留草稿。
- Enter / Space: 焦点在附属按钮上时立即执行，不提交表单。

## Source examples
### 设备名称
Source: apps/docs/src/content/input/demos/01-default.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "设备名称", titleEn: "Device name" };

export default function Demo() {
  return <Field className="w-full max-w-xs"><FieldLabel>设备名称</FieldLabel><Input name="device-name" defaultValue="3 号楼东侧摄像头" /></Field>;
}
```

### 位置档案
Source: apps/docs/src/content/input/demos/02-sizes.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "位置档案", titleEn: "Size profiles" };

export default function Demo() {
  return <div className="grid w-full max-w-sm gap-(--qy-field-group-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => <Field key={size}><FieldLabel>{size}</FieldLabel><Input size={size} defaultValue="青野 · Qingye" /></Field>)}</div>;
}
```

### 字段状态
Source: apps/docs/src/content/input/demos/03-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "字段状态", titleEn: "Field states" };

export default function Demo() {
  return <div className="grid w-full max-w-xs gap-(--qy-field-group-gap)"><Field invalid><FieldLabel>邮箱</FieldLabel><Input defaultValue="li.na@" type="email" /><FieldError>邮箱地址不完整。</FieldError></Field><Field><FieldLabel>工号</FieldLabel><Input defaultValue="QY-20481" readOnly /></Field><Field disabled><FieldLabel>所属部门</FieldLabel><Input defaultValue="运维中心" /></Field></div>;
}
```

### 文件选择
Source: apps/docs/src/content/input/demos/04-file.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "文件选择", titleEn: "File selection" };

export default function Demo() {
  return <Field className="w-full max-w-md"><FieldLabel>文件</FieldLabel><Input accept="image/*,.pdf" name="file" type="file" /><FieldDescription>图片或 PDF。</FieldDescription></Field>;
}
```

### 字数提示
Source: apps/docs/src/content/input/demos/05-character-count.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = { title: "字数提示", titleEn: "Character limit" };

export default function Demo() {
  const max = 20;
  const [value, setValue] = useState("杭州滨江仓");
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>仓库简称</FieldLabel>
      <Input maxLength={max} onValueChange={setValue} value={value} />
      <FieldDescription aria-live="polite" className="numeric">
        还可输入 {max - value.length} 个字
      </FieldDescription>
    </Field>
  );
}
```

### 搜索与清空
Source: apps/docs/src/content/input/demos/06-search.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "搜索与清空", titleEn: "Search and clearing" };

export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>搜索</FieldLabel><Input type="search" defaultValue="青野" /></Field>;
}
```

### 密码
Source: apps/docs/src/content/input/demos/07-password.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = { title: "密码", titleEn: "Password" };

export default function Demo() {
  const [visible, setVisible] = useState(false);
  return <Field className="w-full max-w-sm"><FieldLabel>新密码</FieldLabel><Input type="password" autoComplete="new-password" defaultValue="qingye-2026" visible={visible} onVisibleChange={setVisible} /></Field>;
}
```
