# TimeField

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/time-field
Source: packages/ui/src/components/time-field.tsx
Source SHA-256: 937f151dd1ee52cbb707c4c4d6a087c0e7c791f4e723ba4cc751aa7237f82bcf

Fill in a time of day alone, segment by segment: hour, minute, second.

## Decision
The value is zone-free text shaped like native input[type=time] (HH:mm or HH:mm:ss, optionally with a 1–3 digit fraction of a second); empty is null. A value exists only when every segment is filled: in-between states are not reported, and clearing a complete time reports null. Out-of-range values are still reported; they only mark the segments invalid and block form submission, and the application states the reason with FieldError.

## Notes
- Use TimeField for a time of day alone; use DateTimePicker for date and time together.
- Segments are divs, not native inputs, so no soft keyboard is raised; touch entry goes through key events and has not been adapted separately.
- When a value is finer than the segments (seconds under minute, milliseconds under any granularity), that part is not shown but survives edits to other segments, as native input[type=time] never rewrites its value; only clearing every segment and entering again yields a new value without it.
- There is no popup: a time of day has a small value space, and filling segments is faster than choosing from a list.

## Use and ownership
- Fill in a time of day alone, segment by segment: hour, minute, second.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Segment draft, typing buffer, and the focused segment.
- Application: The time value, constraints, error text, and submission outcomes.

## Composition
- Field + FieldLabel + TimeField + FieldDescription / FieldError

## Responsive behavior
- The same shell as Input with one geometry that follows the density axis; coarse pointers use the library's touch target.

## Customization
- Root className, style and ref, existing theme roles, granularity, hourCycle, and min / max.

## Current exports
- TimeField: function; owner time-field; PASS; props: TimeFieldProps
- TimeFieldProps: type; owner time-field; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### TimeField
- `defaultValue?`: `string | null | undefined`. 非受控的初值，原生表单 reset 会回到它。
- `disabled?`: `boolean`.
- `form?`: `string | undefined`.
- `granularity?`: `"minute" | "second"`. 填到哪一段为止。`minute` 新填出的值是 `HH:mm`，`second` 是 `HH:mm:ss`。不设毫秒分段（手填毫秒不是常见任务）； 传入的值比分段更细（`minute` 下的秒、任何粒度下的毫秒）时，那部分照原样保留，改别的分段不会把它截掉， 与原生 `input[type=time]` 不改写 value 一致。全部清空后重新填写，得到的是不带细部的新值。
- `hourCycle?`: `12 | 24`. 12 或 24 小时制。省略时跟随当前 locale 的习惯（`Intl.DateTimeFormat` 解析出的 hourCycle）。
- `max?`: `string | undefined`.
- `min?`: `string | undefined`. 最早 / 最晚时刻（同形文本）。越界的值照常上报，但分段标为无效并让表单提交被拦下。
- `name?`: `string | undefined`.
- `onValueChange?`: `((value: string | null) => void) | undefined`. 填完整得出时间，或把已有的完整时间清掉（`null`）时请求变更；还差几段的中间态不上报。
- `readOnly?`: `boolean`.
- `required?`: `boolean`.
- `value?`: `string | null | undefined`. 受控的时间文本；`null` 表示空。**传了 `value` 这个属性**（含 `value={null}`）就是受控，不传才是非受控。
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

### TimeField
A group of segmented spinbuttons plus a hidden input for submission; the Field label names the whole group.
- value / defaultValue / onValueChange: string | null / string | null / (value: string | null) => void. Passing the value prop (including value={null} for empty) makes it controlled: only an accepted callback changes the value, and a rejected change snaps the segments back. Without it the component is uncontrolled, defaultValue is the initial value, and native form reset returns to it.
- granularity: "minute" | "second"; default "minute". The last segment. A newly entered minute value is HH:mm, a second value HH:mm:ss; there is no millisecond segment.
- hourCycle: 12 | 24; default follows the locale. 12-hour adds an AM/PM segment and hours run 1–12; the value is always 24-hour text. When omitted, the current locale decides.
- min / max: string. Earliest and latest time (same text shape). A value outside marks the segments aria-invalid and blocks submission of its form; typing is neither corrected nor refused. Ranges that cross midnight (min later than max) are not supported.
- name / form: string. The hidden input joins native FormData and submits the ISO text; an incomplete time submits an empty string. A Field name can supply the name.
- disabled / readOnly / required: boolean; default false. Disabled segments leave the tab order and do not submit (Field and fieldset disabling apply too). Read-only values stay focusable, readable and submitted but cannot be edited. required blocks submission while empty.
- aria-label / aria-labelledby / className / style / ref: div props. Applied to the group shell. Outside a Field one of aria-label or aria-labelledby is required and a missing name throws; inside a Field the FieldLabel names it.

## Keyboard
- ArrowUp / ArrowDown: Step the segment by one with wrap-around and no carry into its neighbour; an empty segment starts from its minimum on up and maximum on down.
- 0–9: Type digits; the focus jumps ahead once the segment is full or cannot grow further.
- Backspace / Delete: Clear the current segment.
- ArrowLeft / ArrowRight: Move between segments.
- Home / End: Set the segment to its minimum or maximum.
- A / P: Choose AM or PM directly (the first letter in the current language also works).
- Tab / Shift+Tab: The group takes one tab stop and Tab leaves it.

## Source examples
### 起止时间
Source: apps/docs/src/content/time-field/demos/01-basic.tsx
```tsx
import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeField } from "@qingye_lab/ui/components/time-field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "起止时间", titleEn: "Start and end" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [start, setStart] = useState<string | null>("09:00");
  const [end, setEnd] = useState<string | null>("08:30");
  // 结束早于开始是应用才知道的规则：min 只把分段标为无效并拦下提交，说明文字由 FieldError 承担。
  const reversed = start !== null && end !== null && end < start;
  return (
    <form>
      <FieldGroup className="flex-row flex-wrap items-start">
        <Field name="start">
          <FieldLabel>{en ? "Start" : "开始"}</FieldLabel>
          <TimeField value={start} onValueChange={setStart} />
        </Field>
        <Field name="end" invalid={reversed}>
          <FieldLabel>{en ? "End" : "结束"}</FieldLabel>
          <TimeField value={end} onValueChange={setEnd} {...(start ? { min: start } : {})} />
          <FieldError>{en ? "End is before start" : "结束早于开始"}</FieldError>
        </Field>
      </FieldGroup>
    </form>
  );
}
```

### 秒与十二小时制
Source: apps/docs/src/content/time-field/demos/02-seconds.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { TimeField } from "@qingye_lab/ui/components/time-field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "秒与十二小时制", titleEn: "Seconds and 12-hour" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  return (
    <FieldGroup className="flex-row flex-wrap items-start">
      <Field>
        <FieldLabel>{en ? "To the second" : "精确到秒"}</FieldLabel>
        <TimeField granularity="second" defaultValue="09:30:15" />
      </Field>
      <Field>
        <FieldLabel>{en ? "12-hour" : "十二小时制"}</FieldLabel>
        <TimeField hourCycle={12} defaultValue="14:05" />
      </Field>
    </FieldGroup>
  );
}
```
