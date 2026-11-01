# 日期范围 DateRangePicker

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/date-range-picker
Source: packages/ui/src/components/date-range-picker.tsx
Source SHA-256: 50954292790b2429d2da553a7f9594db52b6583300fc3f5e362a74118f17aad3

键入或在日历中选择起止日期，完整且有序时才是确认值。

## Decision
只有完整且有序的 from/to 才是确认值。起止两个原生日期输入与弹层日历共用同一份草稿：键入得出完整有序的范围即请求变更；只填一端、反向或越界不提交，焦点离开后两个输入标 aria-invalid 并通过 onInvalid 交给应用说明，库不静默交换端点。日历里的选择与预设只写草稿，取消或 Escape 保留原确认值，应用才请求替换。

## Notes
- granularity 不是 day 时，未能解析的文字留在输入里，整个字段在焦点离开后按未填完整处理；两端的顺序按周期比较，同一周期的起止是合法的。
- 两个日期输入是原生输入，显示格式随浏览器；键入与日历共用一份草稿，互相同步。
- 每次打开从当前输入内容建立草稿；没有默认业务长度或自动纠正。
- 只读时不开弹层：值在、可聚焦、可读出，不能改。

## Use and ownership
- 键入或在日历中选择起止日期，完整且有序时才是确认值。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 展开、本次范围草稿、键入中间态、焦点返回
- Application: 完整确认范围、允许日期、预设的取值、无效时的说明、提交结果

## Composition
- Field + FieldLabel + DateRangePicker + FieldDescription / FieldError

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字；日历粗指针单元采用真实触摸尺寸

## Customization
- calendarProps、inputProps / endInputProps、组合根与集中主题

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
- `granularity?`: `"day" | "week" | "month" | "quarter" | "year"`. 选择的粒度，默认 `"day"`。非 `"day"` 时值仍是 `Date`：`from` 是首个周期的起点，`to` 是末个周期的**最后一天**（传入的非边界日期会被规范到这两个日子）； 两个输入改为文本，按区域的格式显示与解析（如「2026 年第 44 周」），键入在失焦或回车时才采纳；`min` / `max` 与周期有交集即可选。 此时 `calendarProps.min` / `max`（天数限制）与 `excludeDisabled` 不再适用；`presets` 的范围同样被规范到周期边界。提交的 `name.from` / `name.to` 是这两个 ISO 日期。
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
起止两个原生日期输入、日历草稿、常用范围与明确应用动作的组合。
- value / defaultValue / onValueChange: { from: Date; to: Date } | undefined / same / (value, event) => void. 传了 value 属性（含 value={undefined}）即受控；不传则非受控，defaultValue 是初值，原生表单 reset 回到它，onValueChange 可省。起点须不晚于终点；清除请求 undefined，不生成缺端点提交值。
- onInvalid: (draft: { from?: Date; to?: Date }, reason: "incomplete" | "order" | "bounds" | "length" | "disabled") => void. 草稿无法提交：只填一端（incomplete）、起点晚于终点（order）、超出 min / max（bounds）、天数不合 calendarProps 的 min / max（length）、端点落在禁用日或 excludeDisabled 时跨过禁用日（disabled）——与日历点选执行同一组规则。只在焦点离开整个字段且弹层关闭后通知，同时两个输入标 aria-invalid；键入是逐段进行的，过程中的暂时状态不算。库不写文案，应用用 FieldError 说明。
- min / max: Date. 一处声明最早 / 最晚日期，同时写入两个原生输入与日历的禁用范围、可翻到的月份，并使超出范围的预设不可点。与 inputProps.min/max、calendarProps.disabled 并存，取交集；交集为空时开发环境警告。
- granularity: "day" | "week" | "month" | "quarter" | "year"; default "day". 选择的粒度。非 day 时 from 是首个周期的起点、to 是末个周期的最后一天（传入的值与 presets 都会被规范到这两个日子）；两个输入改为文本，按区域格式显示与解析，失焦或回车时采纳；min / max 与周期有交集即可选。此时 calendarProps.min / max（天数限制）与 excludeDisabled 不再适用，name.from / name.to 提交 ISO 日期。
- presets: readonly { label: string; value: DateRangeValue | (() => DateRangeValue) }[]. 常用范围，显示在日历旁。函数形式在每次打开弹层时求值（「近 7 日」不会因页面跨过午夜而陈旧）；点击只写入草稿并翻到该月，仍须应用。草稿恰等于某一项时该项为当前（aria-pressed）。库只接收应用算好的绝对区间，不自己算相对日期。
- name / form: string. 确认端点序列化为 name.from 与 name.to 的当地 YYYY-MM-DD。Field 可提供 name；两个日期输入本身不提交，草稿不入表单。
- disabled / readOnly: boolean; default false. 禁用阻止一切；只读时两个输入可聚焦、读屏读出值，但不能改值，日历入口也不开（与 Select 一致）。Field 禁用同样约束附属动作。只读确认端点仍提交，禁用排除。只读时边界内给出「只读」说明。确认范围非空且可编辑时，边界内有清除动作，清除后焦点回到起点输入。
- calendarProps: CalendarProps except owned selection props. min/max 指日期间隔规则（天数，与顶层的日期 min / max 不同），excludeDisabled 约束跨禁用日期。默认同日范围合法；要跨日明确传 min。mode 固定 range。
- inputProps / endInputProps: Input props. 起点输入（Field 标签指向它）与终点输入的 ref/render/ARIA/events/step 等。两个输入默认名称是「Field 标签 + 开始日期 / 结束日期」。
- render / ref / className / style / ARIA / events: div composition props. 属于组合根；输入命名与错误由 Field 公共组合提供。

## Keyboard
- Tab / Shift+Tab: 起点、终点、日历入口，展开后到常用范围、日历与应用、取消、清除；未完成草稿不能应用。键入不必经过日历。
- Calendar keys: 在真实网格中选择范围草稿。
- Escape: 关闭草稿并返回触发入口，保留确认端点。

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
