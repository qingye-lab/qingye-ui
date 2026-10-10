# 多行输入 Textarea

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/textarea
Source: packages/ui/src/components/textarea.tsx
Source SHA-256: aa904e29f936d9929096b446977889807af4232257aebfdfa993660c4c248c13

编辑备注、消息等多行文本。

## Decision
字符计数只描述当前值。限制由 maxLength 或应用规则执行；错误内容不会让 Textarea 自行判定 invalid。

## Notes
- 名称使用 FieldLabel 或真实 label；placeholder 不代替名称。
- 自动增高使用 CSS field-sizing:content；不支持时保留 rows 与原生手工调整。
- 错误、提交与持久化事实由应用提供，失败后保留草稿。
- 默认表面与尺寸是集中预设；聚焦只变边框颜色。

## Use and ownership
- 多行纯文本、备注、消息
- Avoid: 单行值用 Input
- Avoid: 富文本编辑需编辑器
- Library: 焦点、原生编辑、非受控值
- Application: 受控值、invalid、保存与错误事实

## Composition
- Field + FieldLabel + Textarea + FieldDescription / FieldError

## Responsive behavior
- 同名文字档及 -narrow 尺寸已接线；本批只验桌面

## Customization
- 已有控制档 token；className/style 属于实际 textarea

## Current exports
- Textarea: function; owner textarea; PASS; props: TextareaProps
- TextareaPrimitive: reexport; owner textarea; UNVERIFIED
- TextareaProps: type; owner textarea; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Textarea
可与 Field 组合的原生 textarea。
- rows: number; default 3. 最小起始行数；内容可自动增高，仍可手工调整高度。
- value / defaultValue: string. 受控值或非受控初值。
- onValueChange: (value, eventDetails) => void. 原语的值变化回调，可调用 eventDetails.cancel()。
- aria-invalid: boolean | 'true' | 'false'. 调用方声明的错误事实；也可由 Field invalid 传入。
- disabled / readOnly: boolean; default false. 禁用不参与 Tab/提交；只读仍可聚焦和提交，显示已有 locale 的只读文案。
- maxLength: number. 浏览器执行的字符长度上限，不由计数文案实施限制。
- render / ref / className / style: Base UI render / textarea ref / state-aware styling. 真实 textarea 的组合与样式入口；render 必须保留 textarea 语义、属性及事件。

### TextareaPrimitive
Base UI Field 命名空间；Textarea 使用其 Control 的 textarea render 出口。

## Keyboard
- Tab / Shift+Tab: 按文档顺序移动焦点。
- Enter: 插入换行，不提交表单。

## Source examples
### 多行文本
Source: apps/docs/src/content/textarea/demos/01-value.tsx
```tsx
import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export const meta = { title: "多行文本", titleEn: "Multiline text" };

export default function Demo() {
  const [value, setValue] = useState("第一行文字。\n第二行文字。");
  return (
    <Field className="w-full max-w-lg">
      <FieldLabel>备注</FieldLabel>
      <Textarea name="note" value={value} onValueChange={setValue} maxLength={160} />
      <FieldDescription>{value.length} / 160</FieldDescription>
    </Field>
  );
}
```

### 状态
Source: apps/docs/src/content/textarea/demos/02-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      <Field invalid>
        <FieldLabel>无效</FieldLabel>
        <Textarea defaultValue="待检查的文字。" />
        <FieldError>请检查内容。</FieldError>
      </Field>
      <Field>
        <FieldLabel>只读</FieldLabel>
        <Textarea readOnly defaultValue={"第一行文字。\n第二行文字。"} />
      </Field>
      <Field>
        <FieldLabel>禁用</FieldLabel>
        <Textarea disabled defaultValue="暂不可编辑。" />
      </Field>
    </div>
  );
}
```

### 密度
Source: apps/docs/src/content/textarea/demos/03-density.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export const meta = { title: "密度", titleEn: "Density" };

// 多行编辑的高度由 rows 与内容决定，密度只收紧容器与内边距。
export default function Demo() {
  return (
    <div className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Textarea rows={3} defaultValue={"第一行文字。\n第二行文字。"} />
          </Field>
        </div>
      ))}
    </div>
  );
}
```
