# DatePicker

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/date-picker
Source: packages/ui/src/components/date-picker.tsx
Source SHA-256: 648faa4d52599809a5db20634cbf4f7a8587ca864c8ccc76afd267f0f7e22eb4

Edit one local date or choose it from a calendar.

## Decision
The caller owns the local Date. Input and calendar selection request changes; clearing requests undefined. Escape closes the calendar and preserves accepted values.

## Notes
- The browser chooses the displayed date format; submission uses YYYY-MM-DD.
- Calendar selection closes the popup. Rejected controlled changes preserve the prior date.
- The component does not repair bounds or infer submission success. Express known errors with FieldError.

## Use and ownership
- Edit one local date or choose it from a calendar.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Opening and calendar focus.
- Application: Dates, constraints, errors, and submission outcomes.

## Composition
- Field + FieldLabel + DatePicker + FieldDescription / FieldError

## Responsive behavior
- Five matching control/text profiles with internal border focus; coarse pointers use the library's touch target.

## Customization
- inputProps, calendarProps, root render/refs, and existing theme roles.

## Current exports
- DatePicker: function; owner date-picker; PASS; props: DatePickerProps
- DatePickerProps: type; owner date-picker; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DatePicker
A single-date composition of Input, Button, Popover, and Calendar.
- value / onValueChange: Date | undefined / (value, event) => void. Controlled date; only an accepted callback changes the value. undefined means empty. Valid years are 1–9999.
- name / form: string. The real date input submits local YYYY-MM-DD. Field can provide its name; form associates an external form.
- disabled / readOnly: boolean; default false. Block input and auxiliary changes. Field disabled also blocks actions. Read-only values submit; disabled values do not.
- size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; default 'md'. Input, actions, and calendar share one control/text profile.
- inputProps: Input props except owned value/type/name/form/state. ref, render, ARIA, events, min, max, step, and required reach the real date input. onChange can cancel a request.
- calendarProps: CalendarProps except mode/selected/onSelect/required. Configure disabled dates, navigation bounds, and locale. The composition owns mode and selection. Synchronize native min/max/step with calendar rules in the caller.
- render / ref / className / style / ARIA / events: div composition props. Applied to the composition root. Use inputProps for the actual input outlet.

## Keyboard
- Tab / Shift+Tab: Move through the date input, calendar trigger, and clear action.
- Calendar keys: Calendar owns date-grid keyboard interaction while open.
- Escape: Close the popup and return to its trigger.

## Source examples
### 日期
Source: apps/docs/src/content/date-picker/demos/01-date.tsx
```tsx
import { useState } from "react";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "日期", titleEn: "Date" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <form><Field name="date"><FieldLabel>日期</FieldLabel><DatePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field></form>;
}
```

### 五档
Source: apps/docs/src/content/date-picker/demos/02-sizes.tsx
```tsx
import { useState } from "react";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import type { InputSize } from "@qingye/ui/components/input";
export const meta = { title: "五档", titleEn: "Five sizes" };
function DateSize({ size }: { size: InputSize }) {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <Field><FieldLabel>{size}</FieldLabel><DatePicker size={size} value={value} onValueChange={setValue} /></Field>;
}
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <DateSize key={size} size={size} />)}<Field disabled><FieldLabel>禁用日期</FieldLabel><DatePicker value={new Date(2026, 9, 3)} onValueChange={() => {}} /></Field></div>;
}
```
