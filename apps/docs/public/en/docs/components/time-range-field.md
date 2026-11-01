# TimeRangeField

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/time-range-field
Source: packages/ui/src/components/time-range-field.tsx
Source SHA-256: c39fe59d6990ae7bb22f03e31bc6ceccc0d6e0ad00e14cd867631e29a3534bf3

Fill in a start and an end time of day in one edit boundary, such as opening hours or a shift.

## Decision
The value is { start, end }; each end is a TimeField value (zone-free HH:mm[:ss] text, null when empty). Whenever either end becomes complete or is cleared the whole object is reported, with the other end carried as it was. End before start is invalid by default: the group is marked aria-invalid and form submission is blocked, and the application states the reason with FieldError. Equal start and end is a valid zero-length span. For "22:00 to 06:00 the next day" pass allowCrossMidnight, and the end then falls on the next day. It covers two times within one day; to pick dates as well use DateTimeRangePicker, and for a single time use TimeField.

## Notes
- Use TimeField for a single time; DateTimeRangePicker to pick an interval with dates, DateRangePicker for a date interval only, and DateTimePicker for one date plus one time.
- Start and end are the two ends of one span, so they sit in one boundary and read as a unit. What separates them is the in-control gap, not two side-by-side fields.
- Crossing midnight is an explicit choice, not an automatic repair: the library never swaps the ends or edits a value when the order is wrong.

## Use and ownership
- Fill in a start and an end time of day in one edit boundary, such as opening hours or a shift.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Each end's segment draft and typing buffer, the focused segment, and the native check of the order.
- Application: The start and end values, whether crossing midnight is allowed, the explanation when the order is wrong, and submission outcomes.

## Composition
- Field + FieldLabel + TimeRangeField + FieldDescription / FieldError

## Responsive behavior
- The boundary shares the geometry of TimeField and Input and follows the density axis with no size; coarse pointers get the real touch dimension.

## Customization
- The root className, granularity / hourCycle, and the central theme.

## Current exports
- TimeRangeField: function; owner time-range-field; PASS; props: TimeRangeFieldProps
- TimeRangeFieldProps: type; owner time-range-field; PASS
- TimeRangeValue: type; owner time-range-field; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### TimeRangeField
- `allowCrossMidnight?`: `boolean`. 允许结束早于开始，此时结束落在次日（22:00–06:00）。默认不允许：结束早于开始标为无效，并让表单提交被拦下。 相等永远有效（零长度）；跨零点时相等同样按零长度，不解释成整整 24 小时。
- `defaultValue?`: `TimeRangeValue | undefined`. 非受控的初值，原生表单 reset 会回到它。
- `disabled?`: `boolean`.
- `form?`: `string | undefined`.
- `granularity?`: `"minute" | "second"`. 分段粒度与小时制，起止两端相同；含义同 TimeField。
- `hourCycle?`: `12 | 24`.
- `max?`: `string | undefined`.
- `min?`: `string | undefined`. 起止各自的最早 / 最晚时刻（同 TimeField）；与「结束早于开始」是两件事，两者都成立才有效。
- `name?`: `string | undefined`. 提交两个值：`${name}.start` 与 `${name}.end`（同 DateRangePicker 的 `.from` / `.to`）；某端未填完整时该项提交空串。
- `onValueChange?`: `((value: TimeRangeValue) => void) | undefined`. 任一端填完整或被清掉时请求变更，值是两端的当前内容；还差几段的中间态不上报（同 TimeField）。
- `readOnly?`: `boolean`.
- `required?`: `boolean`.
- `value?`: `TimeRangeValue | undefined`. 受控的起止；任一端可为 `null`。**传了 `value` 这个属性**才是受控，不传才是非受控。
- plus 276 inherited (@types/react 276); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context InField: without a provider default-value
- Context InFieldItem: without a provider default-value; provided by OptionScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### TimeRangeField
Two TimeFields and a separator in one edit boundary. The Field label names the whole group; the start and end each have their own name (Start time, End time).
- value / defaultValue / onValueChange: { start: string | null; end: string | null } / same / (value) => void. Passing the value prop makes it controlled: only an accepted callback changes the value, and a rejected change snaps the segments back. Without it the component is uncontrolled, defaultValue is the initial value, and native form reset returns to it. In-between states of either end are not reported.
- allowCrossMidnight: boolean; default false. Allow the end to be before the start, in which case the end falls on the next day. Equal is always valid and counts as zero length even across midnight; it is never read as a full 24 hours. By default it is not allowed: an end before the start is marked invalid and blocks submission.
- granularity / hourCycle: "minute" | "second" / 12 | 24. Segment granularity and hour cycle, the same for both ends; meaning as in TimeField.
- min / max: string. The earliest and latest time for each end (as in TimeField). This is separate from end-before-start: both must hold for the range to be valid.
- name / form: string. Submits two values: name.start and name.end (as DateRangePicker submits name.from / name.to; name itself is not submitted). An end that is not complete submits an empty string. Field may provide the name. A wrong order blocks form submission.
- disabled / readOnly / required: boolean; default false. Disabled blocks everything and does not submit. Read-only keeps both ends focusable and readable but the value cannot change; it still submits and shows one Read only note at the end of the boundary. Required asks for both ends. Field disabled applies to both ends as well.
- ref / className / style / ARIA / events: div props. Applied to the outer role=group boundary. An accessible name is required: put it in a Field with a FieldLabel, or pass aria-label / aria-labelledby, otherwise it throws (as TimeField does).

## Keyboard
- Tab / Shift+Tab: Moves between the start group and the end group; the first segment of each is the entry.
- ArrowLeft / ArrowRight: Moves between the segments of one end.
- ArrowUp / ArrowDown / 数字键: Changes the current segment; typing goes segment by segment (as in TimeField).
- Backspace / Delete: Clears the current segment; clearing a complete end reports it as null.

## Source examples
### 起止时间
Source: apps/docs/src/content/time-range-field/demos/01-basic.tsx
```tsx
import { useState } from "react";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeRangeField, type TimeRangeValue } from "@qingye_lab/ui/components/time-range-field";

export const meta = { title: "起止时间", titleEn: "Start and end" };

export default function Demo() {
  const [value, setValue] = useState<TimeRangeValue>({ start: "09:00", end: "18:00" });
  return <form><Field name="hours"><FieldLabel>营业时间</FieldLabel><TimeRangeField value={value} onValueChange={setValue} /><FieldDescription>当天内的起止</FieldDescription></Field></form>;
}
```

### 跨零点与顺序
Source: apps/docs/src/content/time-range-field/demos/02-cross-midnight.tsx
```tsx
import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeRangeField, type TimeRangeValue } from "@qingye_lab/ui/components/time-range-field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "跨零点与顺序", titleEn: "Crossing midnight and order" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [day, setDay] = useState<TimeRangeValue>({ start: "18:00", end: "09:00" });
  const [night, setNight] = useState<TimeRangeValue>({ start: "22:00", end: "06:00" });
  // 结束早于开始时，组件把整组标为无效并拦下提交；说明文字由应用用 FieldError 给出。
  const reversed = day.start !== null && day.end !== null && day.end < day.start;
  return (
    <form>
      <FieldGroup>
        <Field name="day" invalid={reversed}>
          <FieldLabel>{en ? "Opening hours" : "营业时间"}</FieldLabel>
          <TimeRangeField value={day} onValueChange={setDay} />
          <FieldError>{en ? "End is before start" : "结束早于开始"}</FieldError>
        </Field>
        <Field name="night">
          <FieldLabel>{en ? "Night shift (ends the next day)" : "夜班（结束在次日）"}</FieldLabel>
          <TimeRangeField value={night} onValueChange={setNight} allowCrossMidnight />
        </Field>
      </FieldGroup>
    </form>
  );
}
```

### 只读与禁用
Source: apps/docs/src/content/time-range-field/demos/03-states.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeRangeField } from "@qingye_lab/ui/components/time-range-field";

export const meta = { title: "只读与禁用", titleEn: "Read-only and disabled" };

const value = { start: "09:00", end: "12:30" };

export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2"><Field><FieldLabel>只读时段</FieldLabel><TimeRangeField defaultValue={value} readOnly /></Field><Field disabled><FieldLabel>禁用时段</FieldLabel><TimeRangeField defaultValue={value} /></Field></div>;
}
```
