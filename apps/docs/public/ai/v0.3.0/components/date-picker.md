# 日期选择器 DatePicker

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/date-picker
Source: packages/ui/src/components/date-picker.tsx
Source SHA-256: dd8e1ab582916db19492be23a269a0c93ae25f9f394741283a6b81ef298652a4

表单中的单个日期字段：外观与 Select 一致，点开后在日历中挑选，表单提交本地日期 YYYY-MM-DD。

## Use and ownership
- 表单中选择一个自然日，显示与提交同一日期事实。
- Avoid: 用 UTC 截断改变自然日；把 required 的隐藏字段当原生表单校验；名称遮住已选值。
- Library: 日选择、值格式、开关、清除和焦点返回。
- Application: 可选日期、必填校验、字段名称、提交和错误恢复。

## Composition
- 标签关联 trigger，选中值加入可访问描述；Calendar 选择后关闭，Clear 让值为空并返回字段。

## Responsive behavior
- 字段值可视觉截断但保留完整可访问内容；弹层需要容纳单月与触屏格。

## Customization
- formatDate 只改显示，name 的 YYYY-MM-DD 保持自然日提交；尺寸与其他表单控件一致。

## Current exports
- DatePicker: function; owner date-picker; PASS; props: DatePickerProps
- DatePickerClear: function; owner date-picker; PASS; props: DatePickerClearProps
- DatePickerClearProps: type; owner date-picker; PASS
- DatePickerProps: type; owner date-picker; PASS
- DatePickerTrigger: function; owner date-picker; PASS; props: DatePickerTriggerProps
- DatePickerTriggerProps: type; owner date-picker; PASS
- datePickerTriggerVariants: const; owner date-picker; UNVERIFIED
- formatLocalDate: function; owner date-picker; PASS; props: Date
- parseLocalDate: function; owner date-picker; PASS; props: string | null | undefined

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DatePicker
触发器 + 弹出日历 + 隐藏表单值。id、aria-*、onBlur 等其余属性透传到触发器按钮。
- value / defaultValue: Date | null; default null. 受控 / 非受控的日期。
- onValueChange: (value: Date | null) => void. 选中或清除时调用。
- open / defaultOpen / onOpenChange: boolean / (open) => void. 受控 / 非受控的弹出状态。
- name: string. 提交字段名；值为本地日期 YYYY-MM-DD，未选时为空字符串。
- size: "sm" | "default" | "lg"; default "default". 与 Select、Input 同一套尺寸。
- placeholder: string; default 选择日期. 未选择时的占位文字。
- clearable: boolean; default true. 选中后在末端显示清除按钮，也可在触发器上按 Backspace / Delete 清除。
- clearLabel: string; default 清除日期. 清除按钮的无障碍名称。
- disabledDates: Matcher | Matcher[]. 不可选的日期，例如 { before: new Date() }。
- formatDate: (date: Date) => string. 触发器上的显示格式；默认按 UI 语言输出中等长度日期。
- calendarProps: CalendarProps. 透传给 Calendar，例如 captionLayout、startMonth、endMonth。
- aria-invalid: boolean. 显示错误边框；配合 FieldError 说明原因。
- disabled / required: boolean. 禁用；required 以 aria-required 暴露。

### DatePickerTrigger
外观同 SelectTrigger 的按钮，末端是日历图标。用 PopoverTrigger 的 render 组合出范围、时间等其他日期控件。
- size: "sm" | "default" | "lg"; default "default". 尺寸。
- placeholder: ReactNode. children 为空时显示，使用占位色。
- icon: ReactNode | null. 替换末端图标；null 表示不显示。

### DatePickerClear
叠放在触发器末端的清除按钮，需自行提供 aria-label。

### datePickerTriggerVariants
触发器的 cva 样式，供自建日期控件复用。

### formatLocalDate / parseLocalDate
Date 与本地 YYYY-MM-DD 字符串互转，不受时区影响；无效输入返回 undefined。

## Keyboard
- Enter / Space: 打开日历，焦点落在已选日期或今天。
- 方向键 / PageUp / PageDown: 在日历中按天、按周、按月移动。
- Enter: 选中日期并关闭，焦点回到触发器。
- Esc: 关闭日历，不改变值。
- Backspace / Delete: 焦点在触发器上时清除已选日期（clearable 时）。

## Source examples
### 基础用法
Source: apps/docs/src/content/date-picker/demos/01-basic.tsx
```tsx
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "基础用法", description: "触发器与 Select 同款；选中后可点末端按钮清除。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-2">
      <Label htmlFor="ship-date">发货日期</Label>
      <DatePicker id="ship-date" defaultValue={new Date()} />
    </div>
  );
}
```

### 尺寸
Source: apps/docs/src/content/date-picker/demos/02-sizes.tsx
```tsx
import { DatePicker } from "@qingye/ui/components/date-picker";

export const meta = { title: "尺寸", description: "sm / default / lg，与同尺寸的 Input、Select 等高。" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-3">
      <DatePicker size="sm" aria-label="开始日期" placeholder="小尺寸" />
      <DatePicker aria-label="开始日期" placeholder="默认尺寸" />
      <DatePicker size="lg" aria-label="开始日期" placeholder="大尺寸" />
    </div>
  );
}
```

### 状态
Source: apps/docs/src/content/date-picker/demos/03-states.tsx
```tsx
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Field, FieldDescription, FieldError } from "@qingye/ui/components/field";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "状态", description: "不可选日期、错误、禁用与不可清除。" };

export default function Demo() {
  const today = new Date();
  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-2">
      <Field>
        <Label htmlFor="visit-date">预约上门</Label>
        <DatePicker id="visit-date" disabledDates={[{ before: today }, { dayOfWeek: [0] }]} />
        <FieldDescription>周日不上门，今天之前不可选。</FieldDescription>
      </Field>
      <Field>
        <Label htmlFor="expire-date">合同到期日</Label>
        <DatePicker id="expire-date" aria-invalid aria-describedby="expire-error" />
        <FieldError id="expire-error">请选择合同到期日</FieldError>
      </Field>
      <Field>
        <Label htmlFor="signed-date">签订日期</Label>
        <DatePicker id="signed-date" defaultValue={new Date(2026, 3, 8)} disabled />
      </Field>
      <Field>
        <Label htmlFor="entry-date">入职日期</Label>
        <DatePicker id="entry-date" defaultValue={new Date(2026, 8, 1)} clearable={false} />
        <FieldDescription>必填字段不提供清除。</FieldDescription>
      </Field>
    </div>
  );
}
```

### 表单提交
Source: apps/docs/src/content/date-picker/demos/04-form.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Label } from "@qingye/ui/components/label";
import { useState, type FormEvent } from "react";

export const meta = { title: "表单提交", description: "通过 name 提交，值为本地日期 YYYY-MM-DD。" };

export default function Demo() {
  const [submitted, setSubmitted] = useState("");
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get("purchasedAt")));
  };
  return (
    <form className="flex w-full max-w-64 flex-col gap-3" onSubmit={onSubmit}>
      <Label htmlFor="purchased-at">购买日期</Label>
      <DatePicker
        id="purchased-at"
        name="purchasedAt"
        disabledDates={{ after: new Date() }}
        calendarProps={{ captionLayout: "dropdown", startMonth: new Date(2015, 0), endMonth: new Date() }}
      />
      <Button type="submit" variant="outline">提交保修登记</Button>
      {submitted ? (
        <p className="text-muted-foreground text-sm">
          purchasedAt = <code className="numeric text-foreground">{submitted || "（空）"}</code>
        </p>
      ) : null}
    </form>
  );
}
```

### 受控与快捷日期
Source: apps/docs/src/content/date-picker/demos/05-controlled.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { DatePicker } from "@qingye/ui/components/date-picker";
import { Label } from "@qingye/ui/components/label";
import { useState } from "react";

export const meta = { title: "受控与快捷日期", description: "外部按钮直接写入值，日历打开时定位到对应月份。" };

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export default function Demo() {
  const [date, setDate] = useState<Date | null>(null);
  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label htmlFor="follow-up">下次回访</Label>
      <DatePicker id="follow-up" value={date} onValueChange={setDate} disabledDates={{ before: new Date() }} />
      <div className="flex flex-wrap gap-2">
        <Button size="xs" variant="outline" onClick={() => setDate(addDays(1))}>明天</Button>
        <Button size="xs" variant="outline" onClick={() => setDate(addDays(7))}>一周后</Button>
        <Button size="xs" variant="outline" onClick={() => setDate(addDays(30))}>30 天后</Button>
      </div>
    </div>
  );
}
```

