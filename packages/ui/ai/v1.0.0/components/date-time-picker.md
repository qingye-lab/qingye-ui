# 日期时间 DateTimePicker

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/date-time-picker
Source: packages/ui/src/components/date-time-picker.tsx
Source SHA-256: 0dc3f2a052df85796a0828e48914bb6b211f419c91f8b36ef6d3d29b7ad679f9

编辑完整的当地墙上日期与时间，或应用日历与时间草稿。

## Decision
value 是 YYYY-MM-DDTHH:mm[:ss] 的无时区 wall-clock 文本。它不表示 UTC 瞬间；时区、DST、业务可用时段由应用决定。空时间不会自动补当前时间。

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DateTimePicker
真实 datetime-local Input 与日期/时间草稿组合。
- value / onValueChange: string | undefined / (value, event) => void. 受控完整本地日期时间；有效年份 1–9999、时间 00:00–23:59，可带秒。带时区或不完整外部字符串拒绝；清除请求 undefined。
- name / form: string. 仅确认的 datetime-local input 参与 FormData；日历与时间草稿不具提交 name。Field 可提供 name。
- disabled / readOnly: boolean; default false. 阻止原生编辑与展开修改；Field disabled 同样约束动作。只读值提交，禁用值不提交。
- inputProps: Input props except owned value/type/name/form/state. 真实输入的 min/max/step/required/ARIA/events/ref/render；step 同时交给草稿 time Input。onChange 可取消原生编辑请求。
- calendarProps: CalendarProps except owned selection props. 声明日期禁用与导航边界。native min/max 与日历规则及草稿应用校验需调用方同步；库不从 datetime 边界猜禁用日期。
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
