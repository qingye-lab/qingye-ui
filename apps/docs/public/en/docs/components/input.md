# Input

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/input
Source: packages/ui/src/components/input.tsx
Source SHA-256: 0e11564ab354356c394ea528a2c250a6bea9ce2b4894506a9e727c0c5e98391c

Enter one text value.

## Decision
Input does one thing: it carries the entry of one value. Clearing, a search icon and password visibility are a separate matter on the editing boundary, composed by SearchInput, PasswordInput or InputGroup rather than built into Input. A placeholder does not replace a persistent visible name.

## Notes
- aria-invalid comes from application or browser validation. Value validity and delivery are separate facts.
- Provide FieldLabel, a native label, or aria-label. A placeholder is a hint rather than a name.
- clearable / clearLabel / onClear and visibilityToggle / visible / defaultVisible / onVisibleChange / showLabel are removed: use SearchInput for search, PasswordInput for passwords, and compose InputGroup + InputGroupButton for other adjunct actions.
- type="file" retains browser behavior and language. The caller owns file lists and business validation.

## Use and ownership
- Enter one text value with a matching native type.
- Avoid: Use SearchInput for search and PasswordInput for passwords.
- Avoid: Placeholders replacing names; timeouts treated as invalid; unknown converted to empty or zero; drafts cleared after validation failure.
- Library: Native input, Field associations, focus, and the read-only marker.
- Application: Value meaning, validation facts, candidate scope, unknown/not-applicable values, and delivery outcomes.

## Composition
- Keep FieldLabel, FieldDescription, and FieldError together; InputGroup + InputGroupButton supply units, markers, and adjunct actions such as clearing or applying.

## Responsive behavior
- xs/sm/md/lg/xl use foundation profiles; narrow heights add 4px and coarse-pointer editing areas are at least 44px.

## Customization
- className, style, render, and refs belong to the actual input; controlClassName belongs to its editing boundary.

## Current exports
- Input: function; owner input; PASS; props: InputProps
- InputPrimitive: reexport; owner input; UNVERIFIED
- InputProps: type; owner input; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Input
- `controlClassName?`: `string`. 编辑边界的样式入口；className / style / render 始终属于真实输入。
- `nativeInput?`: `boolean`. 已由 FieldControl 等原语注册时，直接渲染原生输入，避免重复注册。
- `size?`: `number | undefined`. 原生 input.size 的字符宽度含义；与呈现无关，由原生属性承担。
- `unstyled?`: `boolean`. 由 InputGroup 提供共同边界时使用，不移除输入几何和原生语义。
- plus 309 inherited (@types/react 303, @base-ui/react 6); not expanded, see the installed declarations

### InputPrimitive
- no props declared by this library
- plus 310 inherited (@types/react 304, @base-ui/react 6); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Input
A real border identifies the editable area. Base UI Input retains Field registration and native attributes.
- type: React.HTMLInputTypeAttribute; default "text". The native type applies as is, with no extra action attached. Use SearchInput / PasswordInput for search and passwords.
- value / defaultValue / onValueChange: Native value / initial value / (value, details) => void. Controlled and uncontrolled values; onChange is also forwarded.
- readOnly: boolean; default false. Retains focus, copying, and form submission while blocking edits. Shows a read-only marker.
- className / style / render / ref: Base UI Input props. Applied to the real input. className/style support state functions.
- controlClassName: string. Styles the shared editable boundary, including its width and placement.
- unstyled: boolean; default false. Lets a public composition such as InputGroup supply the boundary while retaining inner geometry and native state.
- nativeInput: boolean; default false. Native outlet for an input already registered by FieldControl or another primitive. Retains render, refs, and events without double registration.

## Keyboard
- Tab / Shift+Tab: Enter and leave the input.

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
import { Field, FieldDescription, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { useMemo, useState } from "react";

export const meta = { title: "字数提示", titleEn: "Character limit" };

const max = 20;
const near = 10;

/** 用户所见的字数：一个字形一个字，emoji 与生僻字不按 UTF-16 码元拆成两个。 */
function useCount() {
  const segmenter = useMemo(() => new Intl.Segmenter(undefined, { granularity: "grapheme" }), []);
  return (text: string) => { let count = 0; for (const _ of segmenter.segment(text)) count++; return count; };
}

export default function Demo() {
  const count = useCount();
  const [value, setValue] = useState("杭州滨江仓 🏭");
  const left = max - count(value);
  // 播报只在跨档时发生：每一档的文字固定、不含数字，同一档内按键不改变它，读屏不会逐字重读。
  const band = left < 0 ? "over" : left === 0 ? "full" : left <= near ? "near" : "far";
  const spoken = { over: "已超出字数上限", full: "已达字数上限", near: "接近字数上限", far: "" }[band];
  return (
    <Field className="w-full max-w-xs" invalid={left < 0}>
      <FieldLabel>仓库简称</FieldLabel>
      {/* 不设 maxLength：它按 UTF-16 码元计，与按字形的计数对不上，粘贴超长还会被悄悄截断。超出只标出，不拦。 */}
      <Input onValueChange={setValue} value={value} />
      {left >= 0 ? <FieldDescription className="numeric">还可输入 {left} 个字</FieldDescription> : <FieldError match>已超出 {-left} 个字</FieldError>}
      <span role="status" className="sr-only">{spoken}</span>
    </Field>
  );
}
```
