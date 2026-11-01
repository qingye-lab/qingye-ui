# DateTimeRangePicker

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/date-time-range-picker
Source: packages/ui/src/components/date-time-range-picker.tsx
Source SHA-256: 72ee3961e280d14bb29cfc38510d642b184c1b1539b2dc22c22570af8ab197b2

Type or pick a start and an end date and time; only a complete, ordered range is a confirmed value.

## Decision
The value is { from, to }; each end is a DateTimePicker value (zone-free local text YYYY-MM-DDTHH:mm[:ss[.SSS]]) rather than DateRangePicker's Date, because a time cannot live in a date-only Date and no time zone is guessed. Only a complete, ordered from/to is a confirmed value; equal ends are a valid zero-length range. The two native datetime-local inputs share one draft: typing a complete ordered range requests the change at once; one end alone, a reversed range or one out of bounds is not submitted, and after focus leaves both inputs are marked aria-invalid, the start input carries a native validity message so form submission is blocked, and onInvalid hands the explanation to the application. The popup holds a calendar range and two time inputs; on one day an end time before the start time is flagged in the popup and cannot be applied. Cancel or Escape keeps the confirmed value.

## Notes
- Use DateRangePicker to pick dates only, DateTimePicker for one date plus one time, and TimeRangeField for two times within a day.
- The two date-time inputs are native, so the display format follows the browser. Typing and the popup are two equivalent paths; the popup starts from what the inputs currently hold each time it opens.
- With only one day chosen in the popup, both ends fall on that day. There is no default start or end time and no automatic repair.

## Use and ownership
- Type or pick a start and an end date and time; only a complete, ordered range is a confirmed value.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Opening, the current range draft, the popup's date and time draft, in-between typing, and focus return.
- Application: The complete confirmed range, the permitted moments, the explanation when invalid, and submission outcomes.

## Composition
- Field + FieldLabel + DateTimeRangePicker + FieldDescription / FieldError

## Responsive behavior
- One geometry that follows the density axis and keeps the text size when compact; coarse-pointer calendar cells have actual touch dimensions.

## Customization
- calendarProps, inputProps / endInputProps, the composition root, and the central theme.

## Current exports
- DateTimeRangeDraft: type; owner date-time-range-picker; PASS
- DateTimeRangeInvalidReason: type; owner date-time-range-picker; PASS
- DateTimeRangePicker: function; owner date-time-range-picker; PASS; props: DateTimeRangePickerProps
- DateTimeRangePickerProps: type; owner date-time-range-picker; PASS
- DateTimeRangeValue: type; owner date-time-range-picker; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### DateTimeRangePicker
- `calendarProps?`: `Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">`.
- `defaultValue?`: `DateTimeRangeValue | undefined`. 非受控的初值，原生表单 reset 会回到它。
- `disabled?`: `boolean`.
- `endInputProps?`: `NativeInputProps`. 终点输入。
- `form?`: `string | undefined`.
- `inputProps?`: `NativeInputProps`. 起点输入（也是 Field 标签指向的输入）。
- `max?`: `string | undefined`.
- `min?`: `string | undefined`. 可选的最早 / 最晚时刻（无时区文本），一处声明同时约束两个原生输入、日历的可选日与边界日的时间输入。
- `name?`: `string | undefined`.
- `onInvalid?`: `((draft: DateTimeRangeDraft, reason: DateTimeRangeInvalidReason) => void) | undefined`. 草稿无法提交时通知应用，由应用决定怎么说（FieldError 等）：库不替它写文案。 只在焦点离开整个字段、弹层也已关闭后通知（并同时给两个输入标 `aria-invalid`、挂原生校验信息），原因同 DateRangePicker。
- `onValueChange?`: `((value: DateTimeRangeValue | undefined, event: React.SyntheticEvent) => void) | undefined`. 只有完整且有序（且在 min / max 内）的范围，或清除（`undefined`）才会请求变更。起止相同是有效的零长度范围。
- `readOnly?`: `boolean`.
- `value?`: `DateTimeRangeValue | undefined`. 受控的完整范围；`undefined` 表示空。**传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。
- plus 277 inherited (@types/react 276, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### DateTimeRangePicker
A composition of two native date-time inputs, a calendar range with two time inputs in a popup, and an explicit Apply.
- value / defaultValue / onValueChange: { from: string; to: string } | undefined / same / (value, event) => void. from / to are zone-free local text shaped like DateTimePicker's value. Passing the value prop (including value={undefined}) makes it controlled; without it the component is uncontrolled, defaultValue is the initial value, and native form reset returns to it. Start after end throws a RangeError; clearing requests undefined and a partial range never submits.
- onInvalid: (draft: { from?: string; to?: string }, reason: "incomplete" | "order" | "bounds") => void. The draft cannot be submitted: one end only (incomplete), start after end (order), outside min / max (bounds). Reported only after focus has left the whole field and the popup is closed, with both inputs marked aria-invalid; typing is segment by segment, so transient states do not count. The library writes no copy; the application explains with FieldError.
- min / max: string. Declare the earliest and latest moment once (zone-free text); it sets both native inputs and the calendar's disabled range, and a time input whose day is the boundary day gets the matching time bound. It coexists with inputProps.min/max and calendarProps.disabled; the intersection applies, and an empty one warns in development.
- name / form: string. The confirmed ends submit under name.from and name.to (the same naming as DateRangePicker), as the same local text. Field may provide the name; the two inputs do not submit and the draft never reaches the form.
- disabled / readOnly: boolean; default false. Disabled blocks everything. Read-only keeps both inputs focusable and readable but the value cannot change and the popup entry does not open. Field disabled blocks the same actions. Read-only values still submit; disabled values are excluded. With a confirmed value and while editable, the boundary has a clear action; focus returns to the start input after clearing.
- calendarProps: CalendarProps except owned selection props. The remaining calendar props (default month, disabled days and so on); mode is range. A typed value is not held to the calendar's disabled days, only to min / max.
- inputProps / endInputProps: Input props. ref, render, ARIA, events, step and so on for the start input (the one a Field label points to) and the end input; step is carried to the popup's time inputs. By default the two names are the Field label plus Start / End date and time.
- render / ref / className / style / ARIA / events: div composition props. Applied to the composition root; Field provides input naming and errors.

## Keyboard
- Tab / Shift+Tab: Start, end, the popup entry; once open, the calendar, the start time, the end time, then Apply, Cancel and Clear. Apply is unavailable until both days and both times are filled and the order is right. Typing never needs the popup.
- Calendar keys: Select the start and end days in the real calendar grid.
- Escape: Close the popup and return to its trigger, preserving the confirmed value.

## Source examples
### 起止日期时间
Source: apps/docs/src/content/date-time-range-picker/demos/01-range.tsx
```tsx
import { useState } from "react";
import { DateTimeRangePicker, type DateTimeRangeValue } from "@qingye_lab/ui/components/date-time-range-picker";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "起止日期时间", titleEn: "Date and time endpoints" };

export default function Demo() {
  const [value, setValue] = useState<DateTimeRangeValue | undefined>({ from: "2026-10-03T09:30", to: "2026-10-05T17:00" });
  return <form><Field name="slot"><FieldLabel>活动时段</FieldLabel><DateTimeRangePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /><FieldDescription>当地时间</FieldDescription></Field></form>;
}
```

### 可选范围与无效说明
Source: apps/docs/src/content/date-time-range-picker/demos/02-bounds.tsx
```tsx
import { useState } from "react";
import { DateTimeRangePicker, type DateTimeRangeInvalidReason, type DateTimeRangeValue } from "@qingye_lab/ui/components/date-time-range-picker";
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "可选范围与无效说明", titleEn: "Bounds and the invalid note" };

export default function Demo() {
  const { code } = useUILocale();
  const en = code.startsWith("en");
  const [value, setValue] = useState<DateTimeRangeValue | undefined>();
  const [reason, setReason] = useState<DateTimeRangeInvalidReason | null>(null);
  // 草稿无法提交时库只通知原因，说明文字由应用用 FieldError 给出。
  const note = reason === "order" ? (en ? "End is before start" : "结束早于开始") : reason === "bounds" ? (en ? "Outside the bookable window" : "不在可预订的时间内") : reason ? (en ? "Fill in both ends" : "起止都要填") : "";
  return (
    <form>
      <Field name="booking" invalid={reason !== null}>
        <FieldLabel>{en ? "Booking window" : "预订时段"}</FieldLabel>
        <DateTimeRangePicker value={value} onValueChange={next => { setValue(next); setReason(null); }} onInvalid={(_, why) => setReason(why)}
          min="2026-10-05T09:00" max="2026-10-09T18:00" calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} />
        <FieldError match={reason !== null}>{note}</FieldError>
      </Field>
    </form>
  );
}
```

### 只读与禁用
Source: apps/docs/src/content/date-time-range-picker/demos/03-states.tsx
```tsx
import { DateTimeRangePicker } from "@qingye_lab/ui/components/date-time-range-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "只读与禁用", titleEn: "Read-only and disabled" };

const value = { from: "2026-10-03T09:30", to: "2026-10-05T17:00" };

export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap)"><Field><FieldLabel>只读时段</FieldLabel><DateTimeRangePicker value={value} onValueChange={() => {}} readOnly /></Field><Field disabled><FieldLabel>禁用时段</FieldLabel><DateTimeRangePicker value={value} onValueChange={() => {}} /></Field></div>;
}
```
