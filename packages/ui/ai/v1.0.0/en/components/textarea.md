# Textarea

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/textarea
Source: packages/ui/src/components/textarea.tsx
Source SHA-256: aa904e29f936d9929096b446977889807af4232257aebfdfa993660c4c248c13

Edit multiline notes and messages.

## Decision
Character counts describe the current value only. maxLength or application rules enforce limits; error text does not make Textarea infer invalid.

## Notes
- FieldLabel or an actual label supplies names; placeholders cannot replace them.
- Automatic growth uses CSS field-sizing:content. Unsupported environments retain rows and native manual resizing.
- Applications supply error, submission, and persistence facts; retain drafts after failure.
- Default surfaces/dimensions are central presets; focus changes border color only.

## Use and ownership
- Multiline plain text, notes, or messages.
- Avoid: Use Input for single-line values.
- Avoid: Rich text needs an editor.
- Library: Focus, native editing, and uncontrolled values.
- Application: Controlled values, invalid, save, and error facts.

## Composition
- Field + FieldLabel + Textarea + FieldDescription / FieldError

## Responsive behavior
- Matching text profiles and -narrow dimensions are wired; this batch checked desktop only.

## Customization
- Existing control-profile tokens; className/style belong to the actual textarea.

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
A native textarea composable with Field.
- rows: number; default 3. Minimum starting rows; content may grow automatically and still be resized manually.
- value / defaultValue: string. Controlled value or uncontrolled initial value.
- onValueChange: (value, eventDetails) => void. Primitive value callback, cancelable with eventDetails.cancel().
- aria-invalid: boolean | 'true' | 'false'. Caller-declared error fact, also available from Field invalid.
- disabled / readOnly: boolean; default false. Disabled excludes tabbing/submission; read-only retains focus/submission and existing localized read-only text.
- maxLength: number. Browser-enforced maximum text length; count text does not enforce it.
- render / ref / className / style: Base UI render / textarea ref / state-aware styling. Actual textarea composition/styling; render must retain textarea semantics, attributes, and events.

### TextareaPrimitive
The Base UI Field namespace; Textarea uses its Control's textarea render outlet.

## Keyboard
- Tab / Shift+Tab: Move focus in document order.
- Enter: Insert a newline without form submission.

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
