# OtpField

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/otp-field
Source: packages/ui/src/components/otp-field.tsx
Source SHA-256: d6ac787b80dd6a4b61a5012e7336bbd9e3ad112e170bb3e505fc59913e6c400b

Present a fixed-length text value in segments.

## Decision
One real text input owns the caret and selection. Leading zeros remain intact. Filling the length reports no verification result; the application owns checking and requests.

## Notes
- Clicking a segment selects its character. An empty segment places the caret at the end. The real input overlays the segments invisibly and receives the pointer, so a touch long-press can reach the system paste menu.
- Compose with FieldLabel, FieldDescription, and FieldError. Visual segments are hidden from assistive tech.
- This rebuild chooses one segmented input and does not restore a prior segmented API.
- Mobile autofill, real IME, assistive tech, and focus contrast need browser/device verification.

## Use and ownership
- The task specifies a short text length.
- Avoid: Use NumberField for numeric stepping and Input for unspecified lengths.
- Library: Text drafts, caret, selection, and capacity rejection feedback.
- Application: Length, character rules, controlled values, verification, and submission outcomes.

## Composition
- Field supplies persistent names, descriptions, and errors; no built-in sign-in business logic.

## Responsive behavior
- Segments use matching control/text profiles; over-capacity external values display fully, with consumer-adjustable containers.

## Customization
- Input props belong to the actual input; controlClassName belongs to the outer container.

## Current exports
- OtpField: function; owner otp-field; PASS; props: OtpFieldProps
- OtpFieldProps: type; owner otp-field; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### OtpField
- `controlClassName?`: `string`. 编辑边界的样式入口；className / style / render 始终属于真实输入。
- `defaultValue?`: `string`.
- `groups?`: `readonly number[]`. 分组，如 `[3, 3]`：组间画一道短横作分隔，读屏仍是一个输入。总和必须等于 `length`，否则抛错。 分隔只是呈现，不进入值；超出 `length` 的外部值多出的格归入最后一组，不再增加分隔。
- `length`: `number`. 文本容量，以 Unicode code point 计；由任务给出，不预设验证码长度。
- `mask?`: `boolean`. 已输入的格画成圆点。只改格子怎么画：值、粘贴与复制都不变，输入仍是 `type="text"`。 不用 `type="password"`：它会让浏览器与密码管理器把这格当凭据（提示保存、不再给出一次性验证码建议）， 并让 `autocomplete="one-time-code"` 失效；而这里真实输入本就透明地盖在格子上，遮蔽只需要换掉格子里画的东西。 代价要说明白：辅助技术读到的仍是真实文本，遮蔽是视觉上的防窥，不是保密。
- `nativeInput?`: `boolean`. 已由 FieldControl 等原语注册时，直接渲染原生输入，避免重复注册。
- `normalizeValue?`: `(text: string) => string`. 键入与粘贴的文本先经过它，再按 `length` 校验；返回值就是写入的文本。 默认去掉空白与连字符：验证码常以分组形式送达（`123 456`、`123-456`）， WCAG 3.3.8（可访问认证）要求不得靠拒绝粘贴来为难人。 需要限定字符集时由调用方给出，例如 `text => text.replace(/\D/g, "")`； 码本身含连字符时传 `text => text` 保留。
- `onValueChange?`: `(value: string, event: React.ChangeEvent<HTMLInputElement>) => void`.
- `unstyled?`: `boolean`. 由 InputGroup 提供共同边界时使用，不移除输入几何和原生语义。
- `value?`: `string`.
- plus 304 inherited (@types/react 301, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### OtpField
Segmented presentation of Input with one Field registration.
- length: number. Required positive integer, counted as Unicode code points. Over-capacity insertions are rejected whole with feedback. External values are shown in full.
- value / defaultValue: string; default defaultValue: ''. Controlled or uncontrolled text; leading zeros remain.
- onValueChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void. Requests a text change. A controlled caller may retain the previous value. During IME composition the text is echoed as typed; the length rule applies once composition ends.
- normalizeValue: (text: string) => string; default strip whitespace and hyphens. Typed and pasted text is normalised first, then checked against length; the result is what is written. Codes often arrive grouped (123 456, 123-456) and WCAG 3.3.8 forbids refusing a paste, so whitespace and hyphens are stripped by default. Restrict the character set with text => text.replace(/\D/g, ""); pass text => text when the code itself contains hyphens.
- groups: readonly number[]. Splits length into groups with a separator drawn between them, for example [3, 3]. The groups must be positive integers summing to length, otherwise it throws. Separators are decorative; assistive technology still meets one input and the value contains no separator.
- placeholder: string. Exactly one character (counted in code points) is shown in every empty cell and gives way once filled; any other length is not drawn in the cells and only becomes the real input's placeholder attribute.
- mask: boolean; default false. Filled cells show a dot instead of the character. Presentation only: the value, paste, form submission and the text read by assistive technology are unchanged. type=password is not used because browsers would treat it as a password to save, prompt password managers and break one-time-code autofill; a code needs shoulder-surfing cover, not password storage semantics.
- inputMode / autoComplete: native input props; default autoComplete: 'one-time-code'. Choose inputMode for the character set. The input type remains text.
- render / ref / className / style / ARIA / events: Input props. Applied to the real input. Render must retain input semantics, its controlled value, and events. The segments are fixed dir=ltr (a code is a digit or letter string) and do not mirror with the page.
- controlClassName: string. Styles the segmented container's placement and layout.
- disabled / readOnly / name / form / required: native input props. Disabled text does not submit. Read-only text remains focusable, copyable, and submitted.

## Keyboard
- Typing / Paste: Replace the native selection and advance the caret; over-capacity paste preserves the original text.
- ArrowLeft / ArrowRight / Home / End: Move the native caret; Shift extends native selection.
- Backspace / Delete: Delete according to the native caret or selection.
- Tab / Shift+Tab: The whole field has one focus stop.

## Source examples
### 文本
Source: apps/docs/src/content/otp-field/demos/01-input.tsx
```tsx
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { OtpField } from "@qingye_lab/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "文本", titleEn: "Text" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field className="sm:col-span-2"><FieldLabel>编码</FieldLabel><OtpField length={6} inputMode="numeric" defaultValue="0012" name="code" /><FieldDescription>6 个字符；可直接粘贴 123 456</FieldDescription></Field>
    <Field><FieldLabel>字符编号</FieldLabel><OtpField length={4} defaultValue="A01" /><FieldDescription>4 个字符</FieldDescription></Field>
    <Field invalid><FieldLabel>待核对</FieldLabel><OtpField length={4} defaultValue="0012" /><FieldError>编码尚未核对。</FieldError></Field>
    <Field><FieldLabel>只读</FieldLabel><OtpField length={4} defaultValue="0012" readOnly /></Field>
    <Field disabled><FieldLabel>禁用</FieldLabel><OtpField length={4} defaultValue="0012" /></Field>
  </FieldGroup>;
}
```

### 密度
Source: apps/docs/src/content/otp-field/demos/02-density.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { OtpField } from "@qingye_lab/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

export default function Demo() {
  return (
    <FieldGroup className="grid w-full sm:grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <OtpField length={4} defaultValue="01" />
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```

### 分组、占位与遮蔽
Source: apps/docs/src/content/otp-field/demos/03-groups-mask.tsx
```tsx
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { OtpField } from "@qingye_lab/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "分组、占位与遮蔽", titleEn: "Groups, placeholder and mask" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>验证码</FieldLabel><OtpField length={6} groups={[3, 3]} inputMode="numeric" placeholder="·" defaultValue="123" /><FieldDescription>3 + 3 分组；读屏仍是一个输入框</FieldDescription></Field>
    <Field><FieldLabel>序列号</FieldLabel><OtpField length={8} groups={[2, 3, 3]} placeholder="_" /><FieldDescription>2 + 3 + 3 分组</FieldDescription></Field>
    <Field><FieldLabel>恢复码</FieldLabel><OtpField length={6} mask inputMode="numeric" defaultValue="4821" /><FieldDescription>已输入的字符以圆点显示；值与粘贴不变</FieldDescription></Field>
  </FieldGroup>;
}
```
