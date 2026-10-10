# 日期范围 DateRangePicker

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/date-range-picker
Source: packages/ui/src/components/date-range-picker.tsx
Source SHA-256: 5997d49fa9ea2233e17520612389ccaedfd2adb61f761234d60570e5bfd85f61

在日历中编辑范围草稿，明确应用完整的起止日期。

## Decision
只有完整 from/to 才是确认值。未完成范围留在展开草稿中，取消或 Escape 保留原确认值；应用才请求替换。

## Notes
- 范围展示固定只读；编辑在日历中完成，不把展示文字当提交值。
- 每次打开从当前调用方值建立草稿；没有默认业务长度或自动纠正。
- 调用方若需提交时范围验证，应在应用与 FieldError 中表达。

## Use and ownership
- 在日历中编辑范围草稿，明确应用完整的起止日期。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 展开、本次范围草稿、焦点返回
- Application: 完整确认范围、允许日期、提交结果

## Composition
- Field + FieldLabel + DateRangePicker + FieldDescription / FieldError

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字；日历粗指针单元采用真实触摸尺寸

## Customization
- calendarProps、inputProps、组合根与集中主题

## Current exports
- DateRangePicker: function; owner date-range-picker; PASS; props: DateRangePickerProps
- DateRangePickerProps: type; owner date-range-picker; PASS
- DateRangeValue: type; owner date-range-picker; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DateRangePicker
只读范围展示、日历草稿与明确应用动作的组合。
- value / onValueChange: { from: Date; to: Date } | undefined / (value, event) => void. 受控完整范围；起点须不晚于终点。清除请求 undefined，不生成缺端点提交值。
- name / form: string. 确认端点序列化为 name.from 与 name.to 的当地 YYYY-MM-DD。Field 可提供 name；展示 input 本身不提交。
- disabled / readOnly: boolean; default false. 禁用/只读阻止展开与改值；Field 禁用也约束附属动作。只读确认端点仍提交，禁用排除。
- calendarProps: CalendarProps except owned selection props. min/max 指日期间隔规则，excludeDisabled 约束跨禁用日期。默认同日范围合法；要跨日明确传 min。mode 固定 range。
- inputProps: Input display props. 展示出口的 ref/render/ARIA/events/placeholder；无原生 date 输入 min/max 校验，范围规则在 calendarProps 与应用校验中声明。
- render / ref / className / style / ARIA / events: div composition props. 属于组合根；输入命名与错误由 Field 公共组合提供。

## Keyboard
- Calendar keys: 在真实网格中选择范围草稿。
- Tab / Enter: 到应用、取消、清除动作；未完成草稿不能应用。
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
