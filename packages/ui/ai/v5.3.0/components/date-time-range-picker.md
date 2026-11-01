# 日期时间范围 DateTimeRangePicker

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/date-time-range-picker
Source: packages/ui/src/components/date-time-range-picker.tsx
Source SHA-256: f0bf1dd0084422c8188b26900c7152b6394fe65411b1f5a8a794b68f18a53142

键入或在弹层里选起止日期和时间，完整且有序时才是确认值。

## Decision
值是 { from, to }，两端各是 DateTimePicker 的值（无时区的本地文本 YYYY-MM-DDTHH:mm[:ss[.SSS]]），而不是 DateRangePicker 的 Date：时间不能放进只含日期的 Date，也不会因此猜一个时区。只有完整且有序的 from/to 才是确认值；起止相同是有效的零长度范围。两个原生 datetime-local 输入共用一份草稿：键入得出完整有序的范围即请求变更；只填一端、反向或越界不提交，焦点离开后两个输入标 aria-invalid，起点输入带原生校验信息让表单提交被拦下，并通过 onInvalid 交给应用说明。弹层里是日历区间加两个时间输入，同一天时结束时刻早于开始时刻会在弹层里提示并不能应用；取消或 Escape 保留原确认值。

## Notes
- 只选日期区间用 DateRangePicker；一个日期加一个时刻用 DateTimePicker；一天之内的两个时刻用 TimeRangeField。
- 两个日期时间输入是原生输入，显示格式随浏览器；键入与弹层是两条等价路径，弹层每次打开从输入当前内容建立。
- 弹层里只选了一天时，起止按同一天处理；没有默认的开始或结束时刻，也没有自动纠正。

## Use and ownership
- 键入或在弹层里选起止日期和时间，完整且有序时才是确认值。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 展开、本次范围草稿、弹层里的日期与时间草稿、键入中间态、焦点返回
- Application: 完整确认范围、允许的时刻、无效时的说明、提交结果

## Composition
- Field + FieldLabel + DateTimeRangePicker + FieldDescription / FieldError

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字；日历粗指针单元采用真实触摸尺寸

## Customization
- calendarProps、inputProps / endInputProps、组合根与集中主题

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
起止两个原生日期时间输入、弹层里的日历区间与两个时间输入、明确的应用动作的组合。
- value / defaultValue / onValueChange: { from: string; to: string } | undefined / same / (value, event) => void. from / to 是 DateTimePicker 同形的无时区本地文本。传了 value 属性（含 value={undefined}）即受控；不传则非受控，defaultValue 是初值，原生表单 reset 回到它。起点须不晚于终点，否则抛 RangeError；清除请求 undefined，不生成缺端点的提交值。
- onInvalid: (draft: { from?: string; to?: string }, reason: "incomplete" | "order" | "bounds") => void. 草稿无法提交：只填一端（incomplete）、起点晚于终点（order）、超出 min / max（bounds）。只在焦点离开整个字段且弹层关闭后通知，同时两个输入标 aria-invalid；键入是逐段进行的，过程中的暂时状态不算。库不写文案，应用用 FieldError 说明。
- min / max: string. 一处声明最早 / 最晚时刻（无时区文本），同时写入两个原生输入、日历的禁用范围，并让落在边界那一天的时间输入带上对应的时刻边界。与 inputProps.min/max、calendarProps.disabled 并存，取交集；交集为空时开发环境警告。
- name / form: string. 确认的起止序列化为 name.from 与 name.to（与 DateRangePicker 同名规则），值是同样的本地文本。Field 可提供 name；两个输入本身不提交，草稿不入表单。
- disabled / readOnly: boolean; default false. 禁用阻止一切；只读时两个输入可聚焦、读屏读出值，但不能改值，弹层入口也不开。Field 禁用同样约束附属动作。只读确认值仍提交，禁用排除。确认值非空且可编辑时，边界内有清除动作，清除后焦点回到起点输入。
- calendarProps: CalendarProps except owned selection props. 日历的其余属性（默认月份、禁用日等）；mode 固定 range。键入的值不受日历禁用日约束，只受 min / max 约束。
- inputProps / endInputProps: Input props. 起点输入（Field 标签指向它）与终点输入的 ref/render/ARIA/events/step 等；step 同时带到弹层里的时间输入。两个输入默认名称是「Field 标签 + 开始 / 结束日期和时间」。
- render / ref / className / style / ARIA / events: div composition props. 属于组合根；输入命名与错误由 Field 公共组合提供。

## Keyboard
- Tab / Shift+Tab: 起点、终点、弹层入口，展开后到日历、开始时间、结束时间，再到应用、取消、清除；起止没选全、时间没填、或顺序错误时不能应用。键入不必经过弹层。
- Calendar keys: 在真实网格中选择起止日期。
- Escape: 关闭弹层并返回触发入口，保留确认值。

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
