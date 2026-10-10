# DateRangePicker

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/date-range-picker
Source: packages/ui/src/components/date-range-picker.tsx
Source SHA-256: 5997d49fa9ea2233e17520612389ccaedfd2adb61f761234d60570e5bfd85f61

Edit a calendar range draft and explicitly apply complete endpoints.

## Decision
Only complete from/to endpoints form a confirmed value. Incomplete ranges stay in the popup draft. Cancel or Escape preserves the prior value; Apply requests a replacement.

## Notes
- The display is read-only; calendar editing never submits its display text.
- Each opening starts from the current caller value. There is no default business duration or automatic repair.
- Express submission-time range validation in the application and FieldError.

## Use and ownership
- Edit a calendar range draft and explicitly apply complete endpoints.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Opening, the current range draft, and focus return.
- Application: Complete confirmed ranges, permitted dates, and submission outcomes.

## Composition
- Field + FieldLabel + DateRangePicker + FieldDescription / FieldError

## Responsive behavior
- Five matching control/text profiles; coarse-pointer calendar cells have actual touch dimensions.

## Customization
- calendarProps, inputProps, composition root, and central theme.

## Current exports
- DateRangePicker: function; owner date-range-picker; PASS; props: DateRangePickerProps
- DateRangePickerProps: type; owner date-range-picker; PASS
- DateRangeValue: type; owner date-range-picker; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DateRangePicker
A composition of range display, calendar draft, and explicit Apply.
- value / onValueChange: { from: Date; to: Date } | undefined / (value, event) => void. Controlled complete range with ordered endpoints. Clearing requests undefined; partial ranges never submit.
- name / form: string. Confirmed endpoints submit local YYYY-MM-DD under name.from and name.to. Field may provide the name; the display input does not submit.
- disabled / readOnly: boolean; default false. Block opening and changes, including Field disabled. Read-only endpoints submit; disabled endpoints are excluded.
- calendarProps: CalendarProps except owned selection props. min/max declare day interval rules; excludeDisabled constrains disabled days. Same-day ranges are valid by default; require a cross-day range with min. Mode is range.
- inputProps: Input display props. ref, render, ARIA, events, and placeholder for the display. There is no native date min/max validation; declare rules in calendarProps and application validation.
- render / ref / className / style / ARIA / events: div composition props. Applied to the composition root; Field provides input naming and errors.

## Keyboard
- Calendar keys: Select a range draft in the real calendar grid.
- Tab / Enter: Reach Apply, Cancel, and Clear. An incomplete draft cannot be applied.
- Escape: Close the draft and return to its trigger, preserving confirmed endpoints.

## Source examples
### 起止日期
Source: apps/docs/src/content/date-range-picker/demos/01-range.tsx
```tsx
import { useState } from "react";
import { DateRangePicker, type DateRangeValue } from "@qingye_lab/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "起止日期", titleEn: "Date endpoints" };
export default function Demo() {
  const [value, setValue] = useState<DateRangeValue | undefined>();
  return <form><Field name="range"><FieldLabel>起止日期</FieldLabel><DateRangePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1), min: 1 }} /></Field></form>;
}
```

### 只读与禁用
Source: apps/docs/src/content/date-range-picker/demos/02-states.tsx
```tsx
import { DateRangePicker } from "@qingye_lab/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "只读与禁用", titleEn: "Read-only and disabled" };
const value = { from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) };
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2"><Field><FieldLabel>只读范围</FieldLabel><DateRangePicker value={value} onValueChange={() => {}} readOnly /></Field><Field disabled><FieldLabel>禁用范围</FieldLabel><DateRangePicker value={value} onValueChange={() => {}} /></Field></div>;
}
```
