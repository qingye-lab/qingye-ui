# 日期输入 DatePicker

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/date-picker
Source: packages/ui/src/components/date-picker.tsx
Source SHA-256: 648faa4d52599809a5db20634cbf4f7a8587ca864c8ccc76afd267f0f7e22eb4

编辑一个当地日期，或展开日历选择。

## Decision
value 是调用方持有的当地 Date。输入和日历选择只请求变更；清除请求 undefined，Escape 关闭日历并保留已接受值。

## Notes
- 日期输入的本地显示格式由浏览器决定，提交值固定 YYYY-MM-DD。
- 日历选择完成后关闭；调用方拒绝变更时原日期仍保留。
- 没有自动修正越界值或推断提交成功；用 FieldError 表达调用方已知错误。

## Use and ownership
- 编辑一个当地日期，或展开日历选择。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 展开、日历焦点
- Application: 日期、约束、错误、提交结果

## Composition
- Field + FieldLabel + DatePicker + FieldDescription / FieldError

## Responsive behavior
- 五档 control 与同名文字，内部边框焦点；粗指针使用库内触摸目标

## Customization
- inputProps、calendarProps、根 render/ref 和现有主题角色

## Current exports
- DatePicker: function; owner date-picker; PASS; props: DatePickerProps
- DatePickerProps: type; owner date-picker; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DatePicker
当前 Input、Button、Popover、Calendar 的单日期组合。
- value / onValueChange: Date | undefined / (value, event) => void. 受控日期；调用方接受回调才改变事实，undefined 表示空。有效年份为 1–9999。
- name / form: string. 真实 date input 参与原生 FormData；Field name 可提供共同命名。序列化为当地 YYYY-MM-DD。
- disabled / readOnly: boolean; default false. 阻止输入与附属选择/清除；Field 禁用同样约束动作。只读值提交，禁用值不提交。
- size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; default 'md'. 输入、按钮和日历使用同一 control/text 档。
- inputProps: Input props except owned value/type/name/form/state. ref/render/ARIA/events/min/max/step/required 属于真实 date input。onChange 的 preventDefault 或 preventBaseUIHandler 可取消请求。
- calendarProps: CalendarProps except mode/selected/onSelect/required. 控制日期禁用、导航边界、locale 等；mode 与确认值由组合持有。native min/max/step 与日历 disabled/范围需调用方同步。
- render / ref / className / style / ARIA / events: div composition props. 属于组合根；实际输入出口放在 inputProps。

## Keyboard
- Tab / Shift+Tab: 经过日期输入、日历展开与清除动作。
- Calendar keys: 展开后由 Calendar 管理日期网格键盘。
- Escape: 关闭展开并返回触发入口。

## Source examples
### 日期
Source: apps/docs/src/content/date-picker/demos/01-date.tsx
```tsx
import { useState } from "react";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "日期", titleEn: "Date" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <form><Field name="date"><FieldLabel>日期</FieldLabel><DatePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field></form>;
}
```

### 五档
Source: apps/docs/src/content/date-picker/demos/02-sizes.tsx
```tsx
import { useState } from "react";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import type { InputSize } from "@qingye/ui/components/input";
export const meta = { title: "五档", titleEn: "Five sizes" };
function DateSize({ size }: { size: InputSize }) {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <Field><FieldLabel>{size}</FieldLabel><DatePicker size={size} value={value} onValueChange={setValue} /></Field>;
}
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <DateSize key={size} size={size} />)}<Field disabled><FieldLabel>禁用日期</FieldLabel><DatePicker value={new Date(2026, 9, 3)} onValueChange={() => {}} /></Field></div>;
}
```
