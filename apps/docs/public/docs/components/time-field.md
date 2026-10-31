# 时间输入 TimeField

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/time-field
Source: packages/ui/src/components/time-field.tsx
Source SHA-256: 937f151dd1ee52cbb707c4c4d6a087c0e7c791f4e723ba4cc751aa7237f82bcf

只填一个时刻，按时、分、秒分段输入。

## Decision
value 是与原生 input[type=time] 同形的无时区文本（HH:mm、HH:mm:ss，秒后可带 1–3 位小数），空为 null。每一段都填了才有值：还差几段的中间态不上报，把已有的完整时间清掉时上报 null。越界的值照常上报，只把分段标为无效并让表单提交被拦下，说明文字由应用用 FieldError 给出。

## Notes
- 只填时刻用 TimeField；日期和时间一起用 DateTimePicker。
- 分段是 div 而不是原生输入，所以没有软键盘唤起；触屏上的输入走键盘事件，尚未单独适配。
- 值比分段更细时（minute 下的秒、任何粒度下的毫秒），那部分不显示，但改别的分段时照原样保留，与原生 input[type=time] 不改写 value 一致；全部清空后重新填写才是不带细部的新值。
- 没有弹层：时刻的取值空间很小，直接分段填比从列表里选更快。

## Use and ownership
- 只填一个时刻，按时、分、秒分段输入。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 分段草稿、键入缓冲、焦点所在段
- Application: 时间值、约束、错误说明、提交结果

## Composition
- Field + FieldLabel + TimeField + FieldDescription / FieldError

## Responsive behavior
- 与 Input 同一套外壳，一套几何，跟随密度轴；粗指针使用库内触摸目标

## Customization
- 根 className / style / ref 和现有主题角色；granularity、hourCycle、min / max

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
一组分段的 spinbutton 加一个提交用的隐藏输入；整组由 Field 的标签命名。
- value / defaultValue / onValueChange: string | null / string | null / (value: string | null) => void. 传了 value 属性（含 value={null}，表示空）即受控：调用方接受回调才改变事实；调用方不接受时，分段回到已接受的值。不传 value 则非受控，defaultValue 是初值，原生表单 reset 回到它。
- granularity: "minute" | "second"; default "minute". 分到哪一段为止。minute 新填出的值是 HH:mm，second 是 HH:mm:ss；不设毫秒分段。
- hourCycle: 12 | 24; default 跟随 locale. 12 小时制多一个上午/下午分段，小时为 1–12；值始终是 24 小时文本。省略时取当前 locale 的习惯。
- min / max: string. 最早 / 最晚时刻（同形文本）。越界的值分段标 aria-invalid，并让所在表单的提交被拦下；不修正、不拒绝键入。不支持跨午夜的区间（min 晚于 max）。
- name / form: string. 隐藏输入参与原生 FormData，提交 ISO 文本；未填完整时提交空串。Field 的 name 可代为命名。
- disabled / readOnly / required: boolean; default false. disabled 的分段离开 Tab 序且值不提交（Field 与 fieldset 的禁用同样生效）；readOnly 的值仍可聚焦、读取、提交，但不能编辑；required 让空值拦下提交。
- aria-label / aria-labelledby / className / style / ref: div props. 属于整组的外壳。字段外使用时必须自带 aria-label 或 aria-labelledby，缺名称会抛错；在 Field 里由 FieldLabel 命名。

## Keyboard
- ArrowUp / ArrowDown: 当前段加一 / 减一，越界回绕，不进位到相邻段；空段按上从最小、按下从最大开始。
- 0–9: 直接输入数字；填满或再添一位必然越界时自动跳到下一段。
- Backspace / Delete: 清空当前段。
- ArrowLeft / ArrowRight: 在分段间移动。
- Home / End: 当前段取最小 / 最大值。
- A / P: 上午 / 下午段直接选择（也认当前语言的首字）。
- Tab / Shift+Tab: 整组只占一个 Tab 位，离开整组。

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
