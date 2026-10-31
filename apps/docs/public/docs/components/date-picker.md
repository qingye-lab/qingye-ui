# 日期输入 DatePicker

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/date-picker
Source: packages/ui/src/components/date-picker.tsx
Source SHA-256: 4c967eae5350995183082d1c9c69a5a2ce250b2f669ff4551a48ba30d2daa7d5

编辑一个当地日期，或展开日历选择。

## Decision
value 是调用方持有的当地 Date。输入和日历选择只请求变更；清除请求 undefined，Escape 关闭日历并保留已接受值。

## Notes
- 日期输入的本地显示格式由浏览器决定，提交值固定 YYYY-MM-DD。
- 日历选择完成后关闭；调用方拒绝变更时原日期仍保留。
- 没有自动修正越界值或推断提交成功；用 FieldError 表达调用方已知错误。
- 年份可键到 5–6 位、分段可只填一半：这些键入中间态不是值，不上报也不清空已有值，焦点离开后回到已接受的日期；只有所有分段都被清空才是清除。

## Use and ownership
- 编辑一个当地日期，或展开日历选择。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 展开、日历焦点
- Application: 日期、约束、错误、提交结果

## Composition
- Field + FieldLabel + DatePicker + FieldDescription / FieldError

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字，内部边框焦点；粗指针使用库内触摸目标

## Customization
- inputProps、calendarProps、根 render/ref 和现有主题角色

## Current exports
- DatePicker: function; owner date-picker; PASS; props: DatePickerProps
- DatePickerProps: type; owner date-picker; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### DatePicker
- `calendarProps?`: `Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">`.
- `defaultValue?`: `Date | undefined`. 非受控的初值，原生表单 reset 会回到它。
- `disabled?`: `boolean`.
- `form?`: `string | undefined`.
- `inputProps?`: `Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">`.
- `max?`: `Date | undefined`.
- `min?`: `Date | undefined`. 可选的最早 / 最晚日期，一处声明同时约束原生输入（min / max 属性）与日历（禁用范围与可翻到的月份）。 与 `inputProps.min/max`、`calendarProps.disabled/startMonth/endMonth` 并存，同时给出时取交集。
- `name?`: `string | undefined`.
- `onValueChange?`: `((value: Date | undefined, event: React.SyntheticEvent) => void) | undefined`.
- `readOnly?`: `boolean`.
- `value?`: `Date | undefined`. 受控日期；`undefined` 表示空。**传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。
- plus 278 inherited (@types/react 277, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### DatePicker
当前 Input、Button、Popover、Calendar 的单日期组合。
- value / defaultValue / onValueChange: Date | undefined / Date | undefined / (value, event) => void. 传了 value 属性（含 value={undefined}，表示空）即受控：调用方接受回调才改变事实。不传 value 则非受控，defaultValue 是初值，原生表单 reset 回到它，onValueChange 可省。有效年份为 1–9999。
- min / max: Date. 一处声明最早 / 最晚日期，同时写入原生输入的 min / max 与日历的禁用范围和可翻到的月份。与 inputProps.min/max、calendarProps.disabled/startMonth/endMonth 并存，同时给出时取交集；交集为空时开发环境警告（2026-10-12）。
- name / form: string. 真实 date input 参与原生 FormData；Field name 可提供共同命名。序列化为当地 YYYY-MM-DD。
- disabled / readOnly: boolean; default false. 阻止输入与附属选择/清除；Field 禁用同样约束动作。只读值提交，禁用值不提交；只读时边界内给出「只读」说明（与 Input 同一机制）。
- inputProps: Input props except owned value/type/name/form/state. ref/render/ARIA/events/min/max/step/required 属于真实 date input。onChange 的 preventDefault 或 preventBaseUIHandler 可取消请求。
- calendarProps: CalendarProps except mode/selected/onSelect/required. 控制日期禁用、导航边界、locale 等；mode 与确认值由组合持有。原生 step 仍在 inputProps；日期边界优先用顶层 min / max 一处声明。
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
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "日期", titleEn: "Date" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <form><Field name="date"><FieldLabel>日期</FieldLabel><DatePicker value={value} onValueChange={setValue} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} /></Field></form>;
}
```

### 密度
Source: apps/docs/src/content/date-picker/demos/02-density.tsx
```tsx
import { useState } from "react";
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度", titleEn: "Density" };

function Picker() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <DatePicker value={value} onValueChange={setValue} />;
}

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Picker />
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```

### 范围与非受控
Source: apps/docs/src/content/date-picker/demos/03-bounds.tsx
```tsx
import { DatePicker } from "@qingye_lab/ui/components/date-picker";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "范围与非受控", titleEn: "Bounds and uncontrolled" };

export default function Demo() {
  return (
    <form>
      <FieldGroup className="grid w-full items-start gap-(--qy-field-group-gap) sm:grid-cols-2">
        <Field name="checkin">
          <FieldLabel>入住</FieldLabel>
          <DatePicker defaultValue={new Date(2026, 9, 12)} min={new Date(2026, 9, 5)} max={new Date(2026, 10, 30)} calendarProps={{ defaultMonth: new Date(2026, 9, 1) }} />
          <FieldDescription>10 月 5 日至 11 月 30 日</FieldDescription>
        </Field>
        <Field name="birthday">
          <FieldLabel>生日</FieldLabel>
          <DatePicker calendarProps={{ captionLayout: "dropdown", startMonth: new Date(1920, 0), endMonth: new Date(2026, 11), defaultMonth: new Date(1990, 0) }} />
        </Field>
      </FieldGroup>
    </form>
  );
}
```
