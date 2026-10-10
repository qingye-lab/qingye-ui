# DateTimePicker

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/date-time-picker
Source: packages/ui/src/components/date-time-picker.tsx
Source SHA-256: 374970c5b8d6d511b706ef6906c84d8df4c22406917923630bba401e2580b10f

Edit complete local wall-clock date/time, or apply calendar and time drafts.

## Decision
value is unzoned YYYY-MM-DDTHH:mm[:ss] wall-clock text, not a UTC instant. The application owns timezone, DST, and availability rules. Empty time never becomes the current time automatically.

## Notes
- Apply is available only with complete date and time; the caller still accepts the value.
- Native min/max/step validation and business availability are independent. A callback is not successful persistence.
- The browser's display may vary by environment; submission remains unzoned local text.

## Use and ownership
- Edit complete local wall-clock date/time, or apply calendar and time drafts.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Opening, date/time drafts, keyboard, and focus.
- Application: Confirmed wall-clock text, zone/DST rules, constraints, and submission outcomes.

## Composition
- Field + FieldLabel + DateTimePicker + FieldDescription / FieldError

## Responsive behavior
- Five control/text profiles, internal focus, and actual coarse-pointer targets.

## Customization
- inputProps, calendarProps, composition root, and existing theme.

## Current exports
- DateTimePicker: function; owner date-time-picker; PASS; props: DateTimePickerProps
- DateTimePickerProps: type; owner date-time-picker; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DateTimePicker
A real datetime-local input composed with calendar and time drafts.
- value / onValueChange: string | undefined / (value, event) => void. Controlled complete local date/time: years 1–9999, time 00:00–23:59, optional seconds. Zoned or incomplete external strings are rejected; clearing requests undefined.
- name / form: string. Only the confirmed datetime-local input submits. Calendar and time drafts have no submission names. Field may provide the name.
- disabled / readOnly: boolean; default false. Block native editing and popup changes, including Field disabled. Read-only values submit; disabled values do not.
- inputProps: Input props except owned value/type/name/form/state. Native min, max, step, required, ARIA, events, refs, and render. step also reaches the time draft. onChange can cancel native edit requests.
- calendarProps: CalendarProps except owned selection props. Declare disabled dates and navigation bounds. Synchronize native min/max, calendar rules, and draft-apply validation in the caller; datetime bounds do not imply disabled calendar days.
- render / ref / className / style / ARIA / events: div composition props. Composition root outlet; customize the actual input through inputProps.

## Keyboard
- Tab / Shift+Tab: Move through the native input and trigger; while open, reach calendar, time, and actions.
- Calendar keys: Change only the date draft; time retains its real input value.
- Escape: Leave the current draft and return to its trigger.

## Source examples
### 日期与时间
Source: apps/docs/src/content/date-time-picker/demos/01-datetime.tsx
```tsx
import { useState } from "react";
import { DateTimePicker } from "@qingye_lab/ui/components/date-time-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "日期与时间", titleEn: "Date and time" };
export default function Demo() {
  const [value, setValue] = useState<string | undefined>();
  return <form><Field name="datetime"><FieldLabel>日期与时间</FieldLabel><DateTimePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field></form>;
}
```

### 只读与禁用
Source: apps/docs/src/content/date-time-picker/demos/02-states.tsx
```tsx
import { DateTimePicker } from "@qingye_lab/ui/components/date-time-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "只读与禁用", titleEn: "Read-only and disabled" };
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2"><Field><FieldLabel>只读日期时间</FieldLabel><DateTimePicker value="2026-10-03T12:30" onValueChange={() => {}} readOnly /></Field><Field disabled><FieldLabel>禁用日期时间</FieldLabel><DateTimePicker value="2026-10-03T12:30" onValueChange={() => {}} /></Field></div>;
}
```
