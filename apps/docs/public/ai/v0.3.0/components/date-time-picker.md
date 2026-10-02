# 日期时间选择器 DateTimePicker

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/date-time-picker
Source: packages/ui/src/components/date-time-picker.tsx
Source SHA-256: 31bc16c9ea96427027c40058f724886b2cf753901c011f1b98a63acf92f63f7c

同时选择日期与时刻，例如预约、发布时间。触发器与 DatePicker 一致，弹层底部输入时间。

## Use and ownership
- 同时选择日期与时刻，例如预约、发布时间。触发器与 DatePicker 一致，弹层底部输入时间。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- DateTimePicker: function; owner date-time-picker; PASS; props: DateTimePickerProps
- DateTimePickerProps: type; owner date-time-picker; PASS
- formatLocalDateTime: function; owner date-time-picker; PASS; props: Date
- parseLocalDateTime: function; owner date-time-picker; PASS; props: string | null | undefined

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DateTimePicker
值是本地时间字符串 YYYY-MM-DDTHH:mm（step 小于 60 时带秒），与 <input type="datetime-local"> 相同。其余属性透传到触发器按钮。
- value / defaultValue: string; default "". 受控 / 非受控的值；空字符串表示未选择。
- onValueChange: (value: string) => void. 选日期、改时间、点「此刻」或清除时调用。
- open / defaultOpen / onOpenChange: boolean / (open) => void. 受控 / 非受控的弹出状态。
- label: string. 字段名，用于弹层的无障碍名称，如「开始」→「选择开始日期和时间」。
- name: string. 提交字段名；值无效时提交空字符串。
- step: number; default 60. 时间粒度（秒）；小于 60 时显示并提交秒。
- defaultTime: string; default "00:00". 先选日期时使用的时间。
- size: "sm" | "default" | "lg"; default "default". 与 Select、Input 同一套尺寸。
- clearable: boolean; default true. 有值时在末端显示清除按钮。
- disabledDates: Matcher | Matcher[]. 不可选的日期。
- formatValue: (date: Date) => string. 触发器上的显示格式。
- disabled / readOnly / required / aria-invalid: boolean. 禁用、只读（不打开弹层）、必填与错误状态。

### formatLocalDateTime
Date → 本地 YYYY-MM-DDTHH:mm:ss.sss。截取前 16 位即为分钟精度。

### parseLocalDateTime
本地日期时间字符串 → Date；格式或日期无效时返回 undefined。

## Keyboard
- Enter / Space: 打开弹层，焦点落在已选日期或今天。
- 方向键 / PageUp / PageDown: 在日历中移动；Enter 选中日期，弹层保持打开。
- Tab: 从日历移到时间输入、「此刻」与「完成」。
- ↑ / ↓: 在时间输入中调整时、分。
- Esc: 关闭弹层，焦点回到触发器。

## Source examples
### 基础用法
Source: apps/docs/src/content/date-time-picker/demos/01-basic.tsx
```tsx
import { DateTimePicker } from "@qingye/ui/components/date-time-picker";
import { Label } from "@qingye/ui/components/label";
import { useState } from "react";

export const meta = { title: "基础用法", description: "先选日期，再在底部输入时间；值为本地时间字符串。" };

export default function Demo() {
  const [value, setValue] = useState("2026-10-12T14:30");
  return (
    <div className="flex w-full max-w-72 flex-col gap-2">
      <Label htmlFor="meeting-at">评审会时间</Label>
      <DateTimePicker id="meeting-at" label="评审会" value={value} onValueChange={setValue} />
      <p className="text-muted-foreground text-xs">
        value = <code className="numeric text-foreground">{value || "（空）"}</code>
      </p>
    </div>
  );
}
```

### 尺寸
Source: apps/docs/src/content/date-time-picker/demos/02-sizes.tsx
```tsx
import { DateTimePicker } from "@qingye/ui/components/date-time-picker";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-72 flex-col gap-3">
      <DateTimePicker size="sm" aria-label="提醒时间" defaultValue="2026-10-08T09:00" />
      <DateTimePicker aria-label="提醒时间" defaultValue="2026-10-08T09:00" />
      <DateTimePicker size="lg" aria-label="提醒时间" defaultValue="2026-10-08T09:00" />
    </div>
  );
}
```

### 状态
Source: apps/docs/src/content/date-time-picker/demos/03-states.tsx
```tsx
import { DateTimePicker } from "@qingye/ui/components/date-time-picker";
import { Field, FieldDescription, FieldError } from "@qingye/ui/components/field";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "状态", description: "精确到秒、错误、只读与禁用。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-2">
      <Field>
        <Label htmlFor="cutover-at">切换窗口</Label>
        <DateTimePicker id="cutover-at" label="切换窗口" step={1} defaultValue="2026-10-18T02:00:00" />
        <FieldDescription>step=1，精确到秒。</FieldDescription>
      </Field>
      <Field>
        <Label htmlFor="publish-at">定时发布</Label>
        <DateTimePicker id="publish-at" label="发布" aria-invalid aria-describedby="publish-error" />
        <FieldError id="publish-error">请设置发布时间</FieldError>
      </Field>
      <Field>
        <Label htmlFor="created-at">工单创建时间</Label>
        <DateTimePicker id="created-at" readOnly defaultValue="2026-09-28T16:42" />
      </Field>
      <Field>
        <Label htmlFor="locked-at">锁定时间</Label>
        <DateTimePicker id="locked-at" disabled defaultValue="2026-09-30T18:00" />
      </Field>
    </div>
  );
}
```

### 组合：预约上门安装
Source: apps/docs/src/content/date-time-picker/demos/04-booking.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { DateTimePicker } from "@qingye/ui/components/date-time-picker";
import { Field, FieldDescription } from "@qingye/ui/components/field";
import { Label } from "@qingye/ui/components/label";
import { useState, type FormEvent } from "react";

export const meta = { title: "组合：预约上门安装", description: "只能约今天以后的工作日，默认时间 09:00，通过 name 提交。" };

export default function Demo() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get("visitAt")));
  };
  return (
    <form className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs/5" onSubmit={onSubmit}>
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-sm">空调安装预约</h3>
        <p className="text-muted-foreground text-xs">订单 2026100388 · 格力云佳 1.5 匹</p>
      </div>
      <Field>
        <Label htmlFor="visit-at">上门时间</Label>
        <DateTimePicker
          id="visit-at"
          name="visitAt"
          label="上门"
          defaultTime="09:00"
          disabledDates={[{ before: new Date() }, { dayOfWeek: [0, 6] }]}
        />
        <FieldDescription>师傅会在约定时间前 30 分钟电话联系。</FieldDescription>
      </Field>
      <Button type="submit">确认预约</Button>
      {submitted !== null ? (
        <p className="text-muted-foreground text-xs">
          visitAt = <code className="numeric text-foreground">{submitted || "（空）"}</code>
        </p>
      ) : null}
    </form>
  );
}
```

