# DateRangePicker

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/date-range-picker
Source: packages/ui/src/components/date-range-picker.tsx
Source SHA-256: c9f53914ae6dbf34b8adeda22967d3c04eebe3f9860819d4b718d66e96fc1dbf

Type or pick start and end dates; only a complete, ordered range is a confirmed value.

## Decision
Only a complete, ordered from/to is a confirmed value. The two native date inputs and the popup calendar share one draft: typing a complete ordered range requests the change at once; one endpoint alone, a reversed range, or one out of bounds is not submitted, and after focus leaves both inputs are marked aria-invalid and onInvalid hands the explanation to the application. Endpoints are never swapped silently. Calendar picks and presets only write the draft; Cancel or Escape keeps the confirmed value and Apply requests the replacement.

## Notes
- With a granularity other than day, text that cannot be read stays in the input and the field counts as incomplete once focus leaves; order is compared by period, so the same period at both ends is valid.
- The two date inputs are native, so the display format follows the browser. Typing and the calendar share one draft and stay in step.
- Each opening starts from what the inputs currently hold. There is no default business duration or automatic repair.
- Read-only does not open the popup: the value is there, focusable and readable, but it cannot change.

## Use and ownership
- Type or pick start and end dates; only a complete, ordered range is a confirmed value.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Opening, the current range draft, in-between typing, and focus return.
- Application: Complete confirmed ranges, permitted dates, preset values, the explanation when invalid, and submission outcomes.

## Composition
- Field + FieldLabel + DateRangePicker + FieldDescription / FieldError

## Responsive behavior
- Five matching control/text profiles; coarse-pointer calendar cells have actual touch dimensions.

## Customization
- calendarProps, inputProps / endInputProps, composition root, and central theme.

## Current exports
- DateRangeDraft: type; owner date-range-picker; PASS
- DateRangeInvalidReason: type; owner date-range-picker; PASS
- DateRangePicker: function; owner date-range-picker; PASS; props: DateRangePickerProps
- DateRangePickerProps: type; owner date-range-picker; PASS
- DateRangePreset: type; owner date-range-picker; PASS
- DateRangeValue: type; owner date-range-picker; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### DateRangePicker
- `calendarProps?`: `Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required" | "granularity"> & { min?: number; max?: number; excludeDisabled?: boolean }`.
- `defaultValue?`: `DateRangeValue | undefined`. 非受控的初值，原生表单 reset 会回到它。
- `disabled?`: `boolean`.
- `endInputProps?`: `NativeInputProps`. 终点日期输入。
- `form?`: `string | undefined`.
- `granularity?`: `"day" | "week" | "month" | "quarter" | "year"`. 选择的粒度，默认 `"day"`。非 `"day"` 时值仍是 `Date`：`from` 是首个周期的起点，`to` 是末个周期的**最后一天**（传入的非边界日期会被规范到这两个日子）； 两个输入改为文本，按区域的格式显示与解析（如「2026 年第 44 周」），键入在失焦或回车时才采纳；`min` / `max` 与周期有交集即可选。 此时 `calendarProps.min` / `max`（天数限制）按规范后的整段天数计算，`excludeDisabled` 按周期判断（范围不得跨过整个被禁用的周期）；不提供多选；`presets` 的范围同样被规范到周期边界。提交的 `name.from` / `name.to` 是这两个 ISO 日期。
- `inputProps?`: `NativeInputProps`. 起点日期输入（也是 Field 标签指向的输入）。
- `max?`: `Date | undefined`.
- `min?`: `Date | undefined`. 可选的最早 / 最晚日期，一处声明同时约束两个原生输入与日历（同 DatePicker）。
- `name?`: `string | undefined`.
- `onInvalid?`: `((draft: DateRangeDraft, reason: DateRangeInvalidReason) => void) | undefined`. 键入或选择得出的草稿无法提交时通知应用，由应用决定怎么说（FieldError 等）：库不替它写文案。 只在焦点离开整个字段、弹层也已关闭后通知（并同时给两个输入标 `aria-invalid`）：键入是逐段的， 填第二个日期之前只有一端、改终点时暂时早于起点，都是正常的中间状态。草稿变成可提交时，调用方会收到 `onValueChange`。
- `onValueChange?`: `((value: DateRangeValue | undefined, event: React.SyntheticEvent) => void) | undefined`. 只有完整且有序（且在 min / max 内）的范围，或清除（`undefined`）才会请求变更。
- `presets?`: `readonly DateRangePreset[] | undefined`. 常用范围，显示在弹层里日历旁；点击只写入草稿，仍须「应用」。
- `readOnly?`: `boolean`.
- `value?`: `DateRangeValue | undefined`. 受控的完整范围；`undefined` 表示空。**传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。
- plus 277 inherited (@types/react 276, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### DateRangePicker
A composition of two native date inputs, a calendar draft, presets, and an explicit Apply.
- value / defaultValue / onValueChange: { from: Date; to: Date } | undefined / same / (value, event) => void. Passing the value prop (including value={undefined}) makes it controlled; without it the component is uncontrolled, defaultValue is the initial value, native form reset returns to it, and onValueChange is optional. Endpoints must be ordered; clearing requests undefined and a partial range never submits.
- onInvalid: (draft: { from?: Date; to?: Date }, reason: "incomplete" | "order" | "bounds" | "length" | "disabled") => void. The draft cannot be submitted: one endpoint only (incomplete), start after end (order), outside min / max (bounds), an interval length outside calendarProps min / max (length), or an endpoint on a disabled day, or a disabled day inside the range with excludeDisabled (disabled) — the same rules the calendar applies. Reported only after focus has left the whole field and the popup is closed, with both inputs marked aria-invalid; typing is segment by segment, so transient states do not count. The library writes no copy; the application explains with FieldError.
- min / max: Date. Declare the earliest and latest date once; it sets both native inputs, the calendar's disabled range and reachable months, and disables presets that fall outside. It coexists with inputProps.min/max and calendarProps.disabled; the intersection applies, and an empty one warns in development.
- granularity: "day" | "week" | "month" | "quarter" | "year"; default "day". What one selection covers. Beyond day, from is the first period's start and to is the last day of the last period (given values and presets are normalized to them); the two inputs become text shown and parsed by the locale format and adopted on blur or Enter; min / max need only overlap a period. calendarProps.min / max (day-count limits) and excludeDisabled no longer apply, and name.from / name.to submit ISO dates.
- presets: readonly { label: string; value: DateRangeValue | (() => DateRangeValue) }[]. Common ranges beside the calendar. A function value is evaluated every time the popup opens, so Last 7 days never goes stale across midnight. Clicking only writes the draft and moves to that month; Apply is still required. The preset equal to the draft is current (aria-pressed). The library receives absolute ranges computed by the application and never computes relative dates itself.
- name / form: string. Confirmed endpoints submit local YYYY-MM-DD under name.from and name.to. Field may provide the name; the two date inputs do not submit and the draft never reaches the form.
- disabled / readOnly: boolean; default false. Disabled blocks everything. Read-only keeps both inputs focusable and readable but the value cannot change and the calendar entry does not open (as in Select). Field disabled blocks the same actions. Read-only endpoints submit; disabled endpoints are excluded. Read-only shows a Read only note in the boundary. With a confirmed range and while editable, the boundary has a clear action; focus returns to the start input after clearing.
- calendarProps: CalendarProps except owned selection props. min/max here are day-interval rules (a count of days, unlike the top-level date min / max); excludeDisabled constrains disabled days. Same-day ranges are valid by default; require a cross-day range with min. Mode is range.
- inputProps / endInputProps: Input props. ref, render, ARIA, events, step, and so on for the start input (the one a Field label points to) and the end input. By default the two names are the Field label plus Start date / End date.
- render / ref / className / style / ARIA / events: div composition props. Applied to the composition root; Field provides input naming and errors.

## Keyboard
- Tab / Shift+Tab: Start, end, the calendar entry; once open, presets, the calendar, then Apply, Cancel, and Clear. An incomplete draft cannot be applied. Typing never needs the calendar.
- Calendar keys: Select a range draft in the real calendar grid.
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

### 常用范围
Source: apps/docs/src/content/date-range-picker/demos/03-presets.tsx
```tsx
import { useState } from "react";
import { DateRangePicker, type DateRangePreset, type DateRangeValue } from "@qingye_lab/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "常用范围", titleEn: "Presets" };

const lastDays = (count: number) => (): DateRangeValue => {
  const to = new Date();
  to.setHours(0, 0, 0, 0);
  const from = new Date(to);
  from.setDate(to.getDate() - (count - 1));
  return { from, to };
};
const thisMonth = (): DateRangeValue => {
  const now = new Date();
  return { from: new Date(now.getFullYear(), now.getMonth(), 1), to: new Date(now.getFullYear(), now.getMonth() + 1, 0) };
};
const presets: DateRangePreset[] = [
  { label: "近 7 日", value: lastDays(7) },
  { label: "近 30 日", value: lastDays(30) },
  { label: "本月", value: thisMonth },
];

export default function Demo() {
  const [value, setValue] = useState<DateRangeValue | undefined>();
  return <form><Field name="range"><FieldLabel>统计区间</FieldLabel><DateRangePicker value={value} onValueChange={setValue} presets={presets} /></Field></form>;
}
```

### 周、月、季、年
Source: apps/docs/src/content/date-range-picker/demos/04-granularity.tsx
```tsx
import { useState } from "react";
import { DateRangePicker, type DateRangePreset, type DateRangeValue } from "@qingye_lab/ui/components/date-range-picker";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "周、月、季、年", titleEn: "Week, month, quarter, year" };

const thisQuarter = (): DateRangeValue => {
  const now = new Date();
  const first = Math.floor(now.getMonth() / 3) * 3;
  return { from: new Date(now.getFullYear(), first, 1), to: new Date(now.getFullYear(), first + 3, 0) };
};
const quarters: DateRangePreset[] = [{ label: "本季度", value: thisQuarter }];

export default function Demo() {
  const [months, setMonths] = useState<DateRangeValue | undefined>({ from: new Date(2026, 1, 1), to: new Date(2026, 3, 30) });
  return (
    <form>
      <FieldGroup className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
        <Field name="weeks"><FieldLabel>周</FieldLabel><DateRangePicker granularity="week" defaultValue={{ from: new Date(2026, 9, 26), to: new Date(2026, 10, 8) }} /></Field>
        <Field name="months"><FieldLabel>月</FieldLabel><DateRangePicker granularity="month" value={months} onValueChange={setMonths} /></Field>
        <Field name="quarters"><FieldLabel>季度</FieldLabel><DateRangePicker granularity="quarter" presets={quarters} /></Field>
        <Field name="years"><FieldLabel>年</FieldLabel><DateRangePicker granularity="year" defaultValue={{ from: new Date(2024, 0, 1), to: new Date(2026, 11, 31) }} /></Field>
      </FieldGroup>
    </form>
  );
}
```
