# OtpField

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/otp-field
Source: packages/ui/src/components/otp-field.tsx
Source SHA-256: e56dfbdafac9f89d1e1f468c52e4b20694f3ba4cd20a2715a36a75769e13cb7c

Present a fixed-length text value in segments.

## Decision
One real text input owns the caret and selection. Leading zeros remain intact. Filling the length reports no verification result; the application owns checking and requests.

## Notes
- Clicking a segment selects its character. An empty segment places the caret at the end.
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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### OtpField
Segmented presentation of Input with one Field registration.
- length: number. Required positive integer, counted as Unicode code points. Over-capacity insertions are rejected whole with feedback. External values are shown in full.
- value / defaultValue: string; default defaultValue: ''. Controlled or uncontrolled text; leading zeros remain.
- onValueChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void. Requests a text change. A controlled caller may retain the previous value.
- inputMode / autoComplete: native input props; default autoComplete: 'one-time-code'. Choose inputMode for the character set. The input type remains text.
- render / ref / className / style / ARIA / events: Input props. Applied to the real input. Render must retain input semantics, its controlled value, and events.
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
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { OtpField } from "@qingye/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "文本", titleEn: "Text" } satisfies DemoMeta;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>编码</FieldLabel><OtpField length={6} inputMode="numeric" defaultValue="0012" name="code" /><FieldDescription>6 个字符</FieldDescription></Field>
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
import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { OtpField } from "@qingye/ui/components/otp-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
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
