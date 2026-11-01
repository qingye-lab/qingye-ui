# 时间段 TimeRangeField

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/time-range-field
Source: packages/ui/src/components/time-range-field.tsx
Source SHA-256: c39fe59d6990ae7bb22f03e31bc6ceccc0d6e0ad00e14cd867631e29a3534bf3

在一个编辑边界里填起止两个时刻，如营业时间、班次。

## Decision
值是 { start, end }，两端各是 TimeField 的值（无时区 HH:mm[:ss] 文本，空为 null）；任何一端填完整或被清掉就上报整个对象，另一端原样带上。结束早于开始默认无效：整组标 aria-invalid，并让表单提交被拦下，说明文字由应用用 FieldError 给出；起止相同是有效的零长度时段。需要「22:00 到次日 06:00」时显式传 allowCrossMidnight，此时结束落在次日。它只管一天之内的两个时刻；要连日期一起选，用 DateTimeRangePicker，要单个时刻，用 TimeField。

## Notes
- 单个时刻用 TimeField；连日期一起选一个区间用 DateTimeRangePicker，只选日期区间用 DateRangePicker；一个日期加一个时刻用 DateTimePicker。
- 起止是同一个时段的两端，所以放在一个边界里读作一体；它们之间是控件内间隔，不是两个并排的字段。
- 跨零点是明确的选择，不是自动纠正：库从不交换起止，也不在顺序错误时替人改值。

## Use and ownership
- 在一个编辑边界里填起止两个时刻，如营业时间、班次。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 各端的分段草稿与键入缓冲、焦点所在分段、顺序的原生校验
- Application: 起止的值、是否允许跨零点、顺序错误时的说明、提交结果

## Composition
- Field + FieldLabel + TimeRangeField + FieldDescription / FieldError

## Responsive behavior
- 外框与 TimeField / Input 同一套几何，跟随密度轴，不带 size；粗指针下取真实触摸尺寸

## Customization
- 组合根的 className、granularity / hourCycle、集中主题

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
两个 TimeField 加一个分隔符，共用一个编辑边界；整组由 Field 的标签命名，起止各有自己的名称（开始时间、结束时间）。
- value / defaultValue / onValueChange: { start: string | null; end: string | null } / same / (value) => void. 传了 value 属性即受控：调用方接受回调才改变事实，不接受时分段回到已接受的值。不传则非受控，defaultValue 是初值，原生表单 reset 回到它。每一端的中间态（还差几段）不上报。
- allowCrossMidnight: boolean; default false. 允许结束早于开始，此时结束落在次日。相等永远有效，且跨零点时同样按零长度，不解释成整整 24 小时。默认不允许：结束早于开始标为无效并拦下提交。
- granularity / hourCycle: "minute" | "second" / 12 | 24. 分段粒度与小时制，起止两端相同；含义同 TimeField。
- min / max: string. 起止各自的最早 / 最晚时刻（同 TimeField）。与「结束早于开始」是两件事：两者都成立才有效。
- name / form: string. 提交两个值：name.start 与 name.end（同 DateRangePicker 的 name.from / name.to，不提交 name 本身）；某端未填完整时该项提交空串。Field 可提供 name。顺序错误时整个表单提交被拦下。
- disabled / readOnly / required: boolean; default false. 禁用阻止一切且不提交；只读时两端可聚焦、读屏读出值，但不能改值，值仍提交，边界末尾给出一处「只读」说明；required 要求起止都填。Field 禁用同样约束两端。
- ref / className / style / ARIA / events: div props. 属于外层 role=group 的边界；必须有可访问名称：放进带 FieldLabel 的 Field，或传 aria-label / aria-labelledby，否则抛错（同 TimeField）。

## Keyboard
- Tab / Shift+Tab: 开始时间、结束时间两组之间移动，各组内的第一个分段是入口。
- ArrowLeft / ArrowRight: 在同一端的分段之间移动。
- ArrowUp / ArrowDown / 数字键: 改变当前分段，键入逐段进行（同 TimeField）。
- Backspace / Delete: 清除当前分段；把一个完整的端点清掉时上报该端为 null。

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
