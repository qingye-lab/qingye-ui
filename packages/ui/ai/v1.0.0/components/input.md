# 输入框 Input

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/input
Source: packages/ui/src/components/input.tsx
Source SHA-256: a05c8fdaddbcad8ff68d0e5813051cb7a079aa36c590657de0268905a65ab1db

输入一个文本值。

## Decision
输入框只做一件事：承载一个值的输入。清空、搜索图标与显示密码是附在编辑边界上的另一件事，由 SearchInput、PasswordInput 或 InputGroup 组合出来，输入框不内置。Placeholder 不能代替持续可见的名称。

## Notes
- aria-invalid 来自应用或浏览器校验；值的真伪与是否送达分开表达。
- 提供 FieldLabel、原生 label 或 aria-label。Placeholder 是输入提示，不是名称。
- clearable / clearLabel / onClear 与 visibilityToggle / visible / defaultVisible / onVisibleChange / showLabel 已移除：搜索用 SearchInput，密码用 PasswordInput，其他附属动作用 InputGroup + InputGroupButton 组合。
- type="file" 保留浏览器文件选择行为与语言；文件列表和业务校验由调用方提供。

## Use and ownership
- 输入一个文本值，原生 type 与内容匹配。
- Avoid: 搜索用 SearchInput，密码用 PasswordInput。
- Avoid: 用 placeholder 代替名称；把超时变成无效；把未知转成空串或 0；校验失败清空草稿。
- Library: 原生输入、Field 关联、焦点与只读标记。
- Application: 值的含义、校验事实、候选范围、未知/不适用及送达结果。

## Composition
- 与 FieldLabel、FieldDescription、FieldError 共处；单位、标记与附属动作（清空、应用）交给 InputGroup + InputGroupButton。

## Responsive behavior
- xs/sm/md/lg/xl 消费基础层档案；窄屏增加 4px，粗指针编辑区至少 44px。

## Customization
- className、style、render 与 ref 属于真实 input；controlClassName 属于编辑边界。

## Current exports
- Input: function; owner input; PASS; props: InputProps
- InputPrimitive: reexport; owner input; UNVERIFIED
- InputProps: type; owner input; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Input
真实边框界定编辑区；Base UI Input 保留 Field 注册和原生属性。
- type: React.HTMLInputTypeAttribute; default "text". 原生类型原样生效，不附带任何额外动作。搜索与密码用 SearchInput / PasswordInput。
- value / defaultValue / onValueChange: 原生值 / 初始值 / (value, details) => void. 支持受控与非受控值；onChange 同样透传。
- readOnly: boolean; default false. 保留焦点、复制与表单提交，阻止编辑；默认显示只读标记。
- className / style / render / ref: Base UI Input props. 全部作用于真实 input；className/style 支持状态函数。
- controlClassName: string. 调整共同编辑边界，例如宽度与所在布局；不替代原生属性。
- unstyled: boolean; default false. 由 InputGroup 等公共组合承担边界；保留内高、档案与原生状态。
- nativeInput: boolean; default false. 已由 FieldControl 或其他原语注册时使用原生出口；保留 render/ref/事件，避免重复注册。

## Keyboard
- Tab / Shift+Tab: 进入与离开输入。

## Source examples
### 设备名称
Source: apps/docs/src/content/input/demos/01-default.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "设备名称", titleEn: "Device name" };

export default function Demo() {
  return <Field className="w-full max-w-xs"><FieldLabel>设备名称</FieldLabel><Input name="device-name" defaultValue="3 号楼东侧摄像头" /></Field>;
}
```

### 密度
Source: apps/docs/src/content/input/demos/02-density.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "密度", titleEn: "Density" };

// 填值控件只有一套几何，紧凑密度收紧容器，不改值文字（用户裁决 2026-10-05）。
export default function Demo() {
  return (
    <div className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Input name={`device-${density}`} defaultValue="3 号楼东侧摄像头" />
          </Field>
        </div>
      ))}
    </div>
  );
}
```

### 字段状态
Source: apps/docs/src/content/input/demos/03-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "字段状态", titleEn: "Field states" };

export default function Demo() {
  return <div className="grid w-full max-w-xs gap-(--qy-field-group-gap)"><Field invalid><FieldLabel>邮箱</FieldLabel><Input defaultValue="li.na@" type="email" /><FieldError>邮箱地址不完整。</FieldError></Field><Field><FieldLabel>工号</FieldLabel><Input defaultValue="QY-20481" readOnly /></Field><Field disabled><FieldLabel>所属部门</FieldLabel><Input defaultValue="运维中心" /></Field></div>;
}
```

### 文件选择
Source: apps/docs/src/content/input/demos/04-file.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "文件选择", titleEn: "File selection" };

export default function Demo() {
  return <Field className="w-full max-w-md"><FieldLabel>文件</FieldLabel><Input accept="image/*,.pdf" name="file" type="file" /><FieldDescription>图片或 PDF。</FieldDescription></Field>;
}
```

### 字数提示
Source: apps/docs/src/content/input/demos/05-character-count.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
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
