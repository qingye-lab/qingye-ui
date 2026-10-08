# NumberField

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/number-field
Source: packages/ui/src/components/number-field.tsx
Source SHA-256: 7dd45e6592f116b40b7a0794577d8492b47fb298b646a95397ed4f2680e51bda

Edit an optional number and adjust it by a declared step.

## Decision
Direct edits outside the range remain intact for native range validation. Stepping still respects min/max. Empty, minus, and partial decimal drafts are not replaced with zero.

## Notes
- FieldLabel names the real input; FieldDescription states range and step.
- The wrapper fixes allowOutOfRange=true and does not silently correct direct edits.
- An out-of-range value is not a save failure. The caller provides invalid.
- This rebuild changes the shared boundary and size profiles. Browser focus and contrast require separate checks.

## Use and ownership
- A value has numeric meaning and needs stepping.
- Avoid: Use Input/OtpField for identifiers, verification codes, or text with meaningful leading zeros.
- Library: Editing text, stepping, focus, and uncontrolled numeric values.
- Application: Controlled numeric values, ranges, invalid facts, and submission outcomes.

## Composition
- Field + FieldLabel + NumberField / Group / Input / steppers + FieldDescription / Error

## Responsive behavior
- Five matching text profiles and narrow-screen +4px; coarse-pointer editing/stepping use the library's touch target.

## Customization
- Root and parts expose render/refs; central roles determine surfaces and dimensions.

## Current exports
- NumberField: function; owner number-field; PASS; props: NumberFieldProps
- NumberFieldDecrement: function; owner number-field; PASS; props: NumberFieldPrimitive.Decrement.Props & React.RefAttributes<HTMLButtonElement>
- NumberFieldGroup: function; owner number-field; PASS; props: NumberFieldPrimitive.Group.Props & React.RefAttributes<HTMLDivElement>
- NumberFieldIncrement: function; owner number-field; PASS; props: NumberFieldPrimitive.Increment.Props & React.RefAttributes<HTMLButtonElement>
- NumberFieldInput: function; owner number-field; PASS; props: NumberFieldPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- NumberFieldPrimitive: reexport; owner number-field; UNVERIFIED
- NumberFieldProps: type; owner number-field; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NumberField
Primitive context for the numeric value and its editable text.
- value / defaultValue / onValueChange: number | null / number / (value, details) => void. null means empty. The caller accepts controlled changes; details supports cancel().
- min / max / step: number / number / number | 'any'; default step: 1. Native range validation preserves direct edits; stepping clamps to the range. step='any' disables step validation and steps by one. Explicit min with step always enables submission step validation.
- snapOnStep / smallStep / largeStep: boolean / number / number; default false / 0.1 / 10. Snapping and Alt/Shift step sizes are explicit independent options.
- onValueCommitted: (value, details) => void. A blur or stepping commit reports the end of editing, not persistence.
- name / form / required / disabled / readOnly: Base UI Root props. Native form semantics. Read-only values submit; disabled values do not.
- locale / format: Intl.LocalesArgument / Intl.NumberFormatOptions. Explicit number formatting. Without rounding options, focus and blur preserve external precision.

### NumberFieldGroup
Shared boundary for the input and two steppers; forwards render, refs, styling, and state.

### NumberFieldInput
Composes the native Input outlet while the number primitive registers Field once.
- render / ref / className / style / ARIA / events: Base UI Input props. Applied to the real input. Render retains numeric value, draft text, and other NumberField state.

### NumberFieldDecrement / NumberFieldIncrement
Decrease/increase primitives compose quiet Button. Locale names and non-submitting buttons.

### NumberFieldPrimitive
The installed Base UI NumberField namespace.

## Keyboard
- ArrowUp / ArrowDown: Step up or down within the stepping bounds.
- Alt / Shift + Step: Use smallStep / largeStep.
- Tab / Shift+Tab: Move among numeric inputs. Stepper clicks retain input focus; keyboard stepping acts on that input. Read-only text remains focusable.

## Source examples
### 值与范围
Source: apps/docs/src/content/number-field/demos/01-values.tsx
```tsx
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "值与范围", titleEn: "Values and bounds" } satisfies DemoMeta;
const parts = <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>数量</FieldLabel><NumberField name="quantity" defaultValue={0} min={0} max={20}>{parts}</NumberField><FieldDescription>0–20，步长 1</FieldDescription></Field>
    <Field><FieldLabel>偏移</FieldLabel><NumberField name="offset" step={0.25}>{parts}</NumberField><FieldDescription>可为空，步长 0.25</FieldDescription></Field>
    <Field invalid><FieldLabel>宽度</FieldLabel><NumberField name="width" defaultValue={12} min={0} max={10}>{parts}</NumberField><FieldError>宽度需要在 0–10 之间。</FieldError></Field>
    <Field><FieldLabel>只读</FieldLabel><NumberField defaultValue={8} readOnly>{parts}</NumberField></Field>
    <Field disabled><FieldLabel>禁用</FieldLabel><NumberField defaultValue={8}>{parts}</NumberField></Field>
  </FieldGroup>;
}
```

### 密度
Source: apps/docs/src/content/number-field/demos/02-density.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "并发上限" : "重试次数"}</FieldLabel>
            <NumberField defaultValue={3}>
              <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>
            </NumberField>
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```
