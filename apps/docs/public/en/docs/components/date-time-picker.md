# DateTimePicker

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/date-time-picker
Source: packages/ui/src/components/date-time-picker.tsx
Source SHA-256: 290763ec85ab114335ed974e59dfcdfbb6d857d1de258127dfe5da72f343a81e

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### DateTimePicker
- `calendarProps?`: `Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">`.
- `defaultValue?`: `string | undefined`. 非受控的初值（同样的无时区文本），原生表单 reset 会回到它。
- `disabled?`: `boolean`.
- `form?`: `string | undefined`.
- `inputProps?`: `Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">`.
- `max?`: `string | undefined`.
- `min?`: `string | undefined`. 可选的最早 / 最晚时刻（同样的无时区文本），一处声明同时约束原生输入、日历的禁用日期、 弹层里时间输入的边界日，并使超出范围的草稿不能应用。与 `inputProps.min/max`、`calendarProps.disabled` 并存，同时给出时取交集。
- `name?`: `string | undefined`.
- `onValueChange?`: `((value: string | undefined, event: React.SyntheticEvent) => void) | undefined`.
- `readOnly?`: `boolean`.
- `value?`: `string | undefined`. Local wall-clock text, YYYY-MM-DDTHH:mm[:ss]; no zone or instant is inferred. **传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。
- plus 278 inherited (@types/react 277, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### DateTimePicker
A real datetime-local input composed with calendar and time drafts.
- value / defaultValue / onValueChange: string | undefined / string | undefined / (value, event) => void. Passing the value prop (including value={undefined}) makes it controlled; without it the component is uncontrolled, defaultValue is the initial value, native form reset returns to it, and onValueChange is optional. Complete local date/time: years 1–9999, time 00:00–23:59, optional seconds. Zoned or incomplete external strings are rejected; clearing requests undefined.
- min / max: string. Unzoned text of the same form. Declare once: it sets the native min / max, the calendar's disabled days and reachable months, the time input's min / max on a boundary day, and blocks applying a draft outside the range. It coexists with inputProps.min/max and calendarProps.disabled; the intersection applies, and an empty one warns in development (2026-10-12).
- name / form: string. Only the confirmed datetime-local input submits. Calendar and time drafts have no submission names. Field may provide the name.
- disabled / readOnly: boolean; default false. Block native editing and popup changes, including Field disabled. Read-only values submit; disabled values do not.
- inputProps: Input props except owned value/type/name/form/state. Native min, max, step, required, ARIA, events, refs, and render. step also reaches the time draft. onChange can cancel native edit requests.
- calendarProps: CalendarProps except owned selection props. Declare disabled dates and navigation bounds. Prefer the top-level min / max to declare bounds once; inputProps.min/max alone does not imply disabled calendar days.
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

### 时段范围
Source: apps/docs/src/content/date-time-picker/demos/03-bounds.tsx
```tsx
import { DateTimePicker } from "@qingye_lab/ui/components/date-time-picker";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "时段范围", titleEn: "Bounds" };

export default function Demo() {
  return <form><Field name="slot"><FieldLabel>预约时间</FieldLabel><DateTimePicker defaultValue="2026-10-12T10:00" min="2026-10-12T09:00" max="2026-10-30T18:00" calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /><FieldDescription>10 月 12 日 09:00 起，10 月 30 日 18:00 止</FieldDescription></Field></form>;
}
```
