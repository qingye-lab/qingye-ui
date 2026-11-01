# 日期时间 DateTimePicker

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/date-time-picker
Source: packages/ui/src/components/date-time-picker.tsx
Source SHA-256: 55e12b48559b0a46cd8fbe9121ed6a7c1d92b14d4031bfe344d4ffbf9af52d65

编辑完整的当地墙上日期与时间，或应用日历与时间草稿。

## Decision
value 是 YYYY-MM-DDTHH:mm[:ss[.SSS]] 的无时区 wall-clock 文本。它不表示 UTC 瞬间；时区、DST、业务可用时段由应用决定。空时间不会自动补当前时间。

## Notes
- 应用仅在日期与时间完整时可用，点击后仍由调用方接受值。
- 原生 min/max/step 校验与业务可用性是独立事实；回调不是保存成功。
- 浏览器显示格式可随用户环境变化，提交保持无时区的本地文本。

## Use and ownership
- 编辑完整的当地墙上日期与时间，或应用日历与时间草稿。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 展开、日期/时间草稿、键盘与焦点
- Application: 确认 wall-clock 文本、时区/DST 规则、约束与提交结果

## Composition
- Field + FieldLabel + DateTimePicker + FieldDescription / FieldError

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字；内部焦点与真实粗指针目标

## Customization
- inputProps、calendarProps、组合根与现有主题

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
- `value?`: `string | undefined`. Local wall-clock text, YYYY-MM-DDTHH:mm[:ss[.SSS]]; no zone or instant is inferred. **传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。
- plus 278 inherited (@types/react 277, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### DateTimePicker
真实 datetime-local Input 与日期/时间草稿组合。
- value / defaultValue / onValueChange: string | undefined / string | undefined / (value, event) => void. 传了 value 属性（含 value={undefined}）即受控；不传则非受控，defaultValue 是初值，原生表单 reset 回到它，onValueChange 可省。完整本地日期时间：有效年份 1–9999、时间 00:00–23:59，可带秒，秒后可带 1–3 位毫秒。值比 step 更细时原样保留（同原生输入，只在原生校验里报 stepMismatch），不截断也不报错。带时区或不完整外部字符串拒绝；清除请求 undefined。
- min / max: string. 同样的无时区文本。一处声明同时写入原生输入的 min / max、日历的禁用日期与可翻到的月份、边界当天时间输入的 min / max，并使超出范围的草稿不能应用。与 inputProps.min/max、calendarProps.disabled 并存，取交集；交集为空时开发环境警告（2026-10-12）。
- name / form: string. 仅确认的 datetime-local input 参与 FormData；日历与时间草稿不具提交 name。Field 可提供 name。
- disabled / readOnly: boolean; default false. 阻止原生编辑、清除与展开修改；Field disabled 同样约束动作。只读值提交，禁用值不提交；只读时边界内给出「只读」说明。非空且可编辑时，边界内有清除动作，清除后焦点回到输入。
- inputProps: Input props except owned value/type/name/form/state. 真实输入的 min/max/step/required/ARIA/events/ref/render；step 同时交给草稿 time Input。onChange 可取消原生编辑请求。
- calendarProps: CalendarProps except owned selection props. 声明日期禁用与导航边界。日期边界优先用顶层 min / max 一处声明；单独给 inputProps.min/max 时库不从中猜禁用日期。
- render / ref / className / style / ARIA / events: div composition props. 组合根出口；实际输入出口通过 inputProps 定制。

## Keyboard
- Tab / Shift+Tab: 经过真实日期时间输入与展开入口，展开后到日期、时间与动作。
- Calendar keys: 仅改变日期草稿；时间保持真实输入值。
- Escape: 退出本次草稿，回到触发入口。

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
