# 开关 Switch

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/switch
Source: packages/ui/src/components/switch.tsx
Source SHA-256: 703471aef9cb0db0fcc831071e07e2039c5cc11e6b685d336bca4cc8e623ec62

立即改变当前设置的开/关状态。

## Use and ownership
- 立即生效的二值设置
- Avoid: 待提交选择用 Checkbox
- Avoid: 不可逆命令用 Button
- Avoid: 结果未知时先核实
- Library: 焦点、键盘、非受控 checked
- Application: 当前设置、请求与保存结果、invalid

## Composition
- Field + FieldLabel + Switch + FieldDescription / FieldError

## Responsive behavior
- 窄屏保留控件高+4px，命中区不随密度缩小；本批只验桌面

## Customization
- 主题填充及前景、同名文字行高、focus宽度

## Current exports
- Switch: function; owner switch; PASS; props: SwitchProps
- SwitchPrimitive: reexport; owner switch; UNVERIFIED
- SwitchProps: type; owner switch; PASS
- SwitchSize: type; owner switch; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Switch
保持名称稳定，用 aria-checked 表达开与关。
- checked / defaultChecked: boolean. 受控设置值或非受控初值。
- onCheckedChange: (checked, eventDetails) => void. 立即设置的变化入口；请求与持久化由应用承担。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 同名文字行高决定轨道高；宽为其两倍。
- disabled / readOnly: boolean; default false. 禁用不参与 Tab/提交；只读仍可聚焦、提交但不可改变。
- aria-invalid: boolean | 'true' | 'false'. 调用方或 Field 声明无效，保留当前开/关事实。
- name / value / uncheckedValue / form: string. 原语隐藏输入的提交入口；不代表必须等待表单提交才生效。
- render / ref / inputRef / className / style: Base UI composition. 根部位与隐藏 input 的组合；渲染 button 时设置 nativeButton。

### SwitchPrimitive
完整 Base UI Switch 命名空间，包含 Root 与 Thumb。

## Keyboard
- Tab / Shift+Tab: 进入或离开开关。
- Space: 立即切换当前设置。

## Source examples
### 状态
Source: apps/docs/src/content/switch/demos/01-states.tsx
```tsx
import { useState } from "react";
import { Field, FieldContent, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      <Field orientation="horizontal">
        <Switch checked={checked} onCheckedChange={setChecked} />
        <FieldContent><FieldLabel>显示网格</FieldLabel><span className="text-support">{checked ? "开启" : "关闭"}</span></FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch defaultChecked />
        <FieldContent><FieldLabel>显示标尺</FieldLabel></FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch disabled />
        <FieldContent><FieldLabel>禁用（关）</FieldLabel></FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch disabled defaultChecked />
        <FieldContent><FieldLabel>禁用（开）</FieldLabel></FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Switch readOnly defaultChecked />
        <FieldContent><FieldLabel>只读</FieldLabel></FieldContent>
      </Field>
      <Field orientation="horizontal" invalid>
        <Switch />
        <FieldContent><FieldLabel>无效</FieldLabel><FieldError>请检查此项。</FieldError></FieldContent>
      </Field>
    </div>
  );
}
```

### 尺寸
Source: apps/docs/src/content/switch/demos/02-sizes.tsx
```tsx
import { Field, FieldContent, FieldLabel } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = { title: "尺寸", titleEn: "Sizes" };

export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Field key={size} orientation="horizontal">
          <Switch size={size} />
          <FieldContent><FieldLabel>{size}</FieldLabel></FieldContent>
        </Field>
      ))}
    </div>
  );
}
```

