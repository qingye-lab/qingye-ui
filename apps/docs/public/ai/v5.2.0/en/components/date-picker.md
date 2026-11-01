# DatePicker

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/date-picker
Source: packages/ui/src/components/date-picker.tsx
Source SHA-256: f7a4c6d63df4dd08e95bb0da89d430426236ec6d84728930a43011e90709b663

Edit one local date or choose it from a calendar.

## Decision
The caller owns the local Date. Input and calendar selection request changes; clearing requests undefined. Escape closes the calendar and preserves accepted values.

## Notes
- With a granularity other than day the input is no longer the browser's native date control, so the display format comes from the locale's periodWeek / periodMonth / periodQuarter / periodYear, and ISO spellings such as 2026-W44, 2026-11, 2026-Q4 and 2026 are also accepted.
- The browser chooses the displayed date format; submission uses YYYY-MM-DD.
- Calendar selection closes the popup. Rejected controlled changes preserve the prior date.
- The component does not repair bounds or infer submission success. Express known errors with FieldError.
- The year can be typed to five or six digits and a segment can be left half-filled. These in-between entries are not values: they neither report nor clear the accepted date, and the input returns to it once focus leaves. Only emptying every segment clears.

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### DatePicker
- `calendarProps?`: `Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required" | "granularity">`.
- `defaultValue?`: `Date | undefined`. 非受控的初值，原生表单 reset 会回到它。
- `disabled?`: `boolean`.
- `form?`: `string | undefined`.
- `granularity?`: `"day" | "week" | "month" | "quarter" | "year"`. 选择的粒度，默认 `"day"`。非 `"day"` 时值仍是 `Date`，规范为该周期的起点（周：区域的周起始日；月、季、年：当月 / 季 / 年的第一天）； 输入框改为文本，按区域的格式显示与解析（如「2026 年第 44 周」「2026 年 11 月」），键入在失焦或回车时才采纳；`min` / `max` 与周期有交集即可选。 提交的 `name` 仍是周期起点的 ISO 日期。
- `inputProps?`: `Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">`.
- `max?`: `Date | undefined`.
- `min?`: `Date | undefined`. 可选的最早 / 最晚日期，一处声明同时约束原生输入（min / max 属性）与日历（禁用范围与可翻到的月份）。 与 `inputProps.min/max`、`calendarProps.disabled/startMonth/endMonth` 并存，同时给出时取交集。
- `name?`: `string | undefined`.
- `onValueChange?`: `((value: Date | undefined, event: React.SyntheticEvent) => void) | undefined`.
- `readOnly?`: `boolean`.
- `value?`: `Date | undefined`. 受控日期；`undefined` 表示空。**传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。
- plus 278 inherited (@types/react 277, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### DatePicker
A single-date composition of Input, Button, Popover, and Calendar.
- value / defaultValue / onValueChange: Date | undefined / Date | undefined / (value, event) => void. Passing the value prop (including value={undefined} for empty) makes it controlled: only an accepted callback changes the value. Without it the component is uncontrolled, defaultValue is the initial value, native form reset returns to it, and onValueChange is optional. Valid years are 1–9999.
- min / max: Date. Declare the earliest and latest date once; it sets the native min / max and the calendar's disabled range and reachable months. It coexists with inputProps.min/max and calendarProps.disabled/startMonth/endMonth, and the intersection applies when both are given. An empty intersection warns in development (2026-10-12).
- granularity: "day" | "week" | "month" | "quarter" | "year"; default "day". What one selection covers. Beyond day the input becomes text that is shown and parsed by the locale format (for example Week 44 2026, 11/2026, Q4 2026); typing is adopted on blur or Enter, blank text clears, and text that cannot be read stays in the input marked incomplete (reusing the dateIncomplete / dateOutOfRange messages). The value is the period start (a date off the boundary shows as its period); min / max need only overlap a period; name submits an ISO date.
- name / form: string. The real date input submits local YYYY-MM-DD. Field can provide its name; form associates an external form.
- disabled / readOnly: boolean; default false. Block input and auxiliary changes. Field disabled also blocks actions. Read-only values submit; disabled values do not. Read-only shows a Read only note inside the boundary, the same as Input.
- inputProps: Input props except owned value/type/name/form/state. ref, render, ARIA, events, min, max, step, and required reach the real date input. onChange can cancel a request.
- calendarProps: CalendarProps except mode/selected/onSelect/required. Configure disabled dates, navigation bounds, and locale. The composition owns mode and selection. Native step stays in inputProps; prefer the top-level min / max to declare date bounds once.
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
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "日期", titleEn: "Date" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <form><Field name="date"><FieldLabel>日期</FieldLabel><DatePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field></form>;
}
```

### 密度
Source: apps/docs/src/content/date-picker/demos/02-density.tsx
```tsx
import { useState } from "react";
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度", titleEn: "Density" };

function Picker() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <DatePicker value={value} onValueChange={setValue} />;
}

export default function Demo() {
  return (
    <FieldGroup className="grid w-full sm:grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Picker />
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```

### 范围与非受控
Source: apps/docs/src/content/date-picker/demos/03-bounds.tsx
```tsx
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "范围与非受控", titleEn: "Bounds and uncontrolled" };

export default function Demo() {
  return (
    <form>
      <FieldGroup className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
        <Field name="checkin">
          <FieldLabel>入住</FieldLabel>
          <DatePicker defaultValue={new Date(2026, 9, 12)} min={new Date(2026, 9, 5)} max={new Date(2026, 10, 30)} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} />
          <FieldDescription>10 月 5 日至 11 月 30 日</FieldDescription>
        </Field>
        <Field name="birthday">
          <FieldLabel>生日</FieldLabel>
          <DatePicker calendarProps={{ captionLayout: "dropdown", startMonth: new Date(1920, 0), endMonth: new Date(2026, 11), defaultMonth: new Date(1990, 0) }} />
        </Field>
      </FieldGroup>
    </form>
  );
}
```

### 周、月、季、年
Source: apps/docs/src/content/date-picker/demos/04-granularity.tsx
```tsx
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "周、月、季、年", titleEn: "Week, month, quarter, year" };

export default function Demo() {
  return (
    <form>
      <FieldGroup className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
        <Field name="week"><FieldLabel>周</FieldLabel><DatePicker granularity="week" defaultValue={new Date(2026, 9, 28)} /></Field>
        <Field name="month"><FieldLabel>月</FieldLabel><DatePicker granularity="month" defaultValue={new Date(2026, 10, 1)} /></Field>
        <Field name="quarter"><FieldLabel>季度</FieldLabel><DatePicker granularity="quarter" defaultValue={new Date(2026, 9, 1)} /></Field>
        <Field name="year"><FieldLabel>年</FieldLabel><DatePicker granularity="year" defaultValue={new Date(2026, 0, 1)} min={new Date(2020, 0, 1)} max={new Date(2030, 11, 31)} /></Field>
      </FieldGroup>
    </form>
  );
}
```
