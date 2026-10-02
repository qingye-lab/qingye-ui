# 日期范围选择 DateRangePicker

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/date-range-picker
Source: packages/ui/src/components/date-range-picker.tsx
Source SHA-256: 60907c5479c510ec3c7152100842e4648c1fab3bdcdbab2edfe8a7d72bd27a86

在一个弹层里选择开始与结束日期：第一次点击定起点，第二次点击定终点并立即生效。适合报表、订单筛选等按时间段查询的场景，可配合快捷范围。

## Use and ownership
- 明确起止日期的筛选或区间输入，只有完整范围才能提交。
- Avoid: 半选结束日就修改正式值；关闭后保留过期 anchor；快捷范围绕过禁用或跨度限制。
- Library: 半选工作、预览、约束一致性、开关和清除。
- Application: 业务范围、快捷值、禁用事实、表单校验和查询请求。

## Composition
- anchor 是库内临时选择，完整 range 是正式值；关闭放弃半选。日历与 preset 共用端点/min/max/excludeDisabled 规则。

## Responsive behavior
- 窄屏单月与横向快捷项，宽屏按容量显示两月；长范围仍保留完整可访问值。

## Customization
- calendarProps 的 min/max 按自然日跨度，excludeDisabled 明确决定能否跨禁用日；导航月界限不代替 disabledDates。

## Current exports
- DateRangePicker: function; owner date-range-picker; PASS; props: DateRangePickerProps
- DateRangePickerProps: type; owner date-range-picker; PASS
- DateRangePreset: type; owner date-range-picker; PASS
- DateRangeValue: type; owner date-range-picker; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DateRangePicker
触发器与 DatePicker 相同；其余按钮属性（id、aria-*、onBlur……）作用于触发器。
- value / defaultValue: { from?: Date; to?: Date } | null. 受控 / 非受控的范围。
- onValueChange: (value: DateRangeValue | null) => void. 选定完整范围或清除时回调；只选了起点不会触发。
- presets: { label: string; value: DateRangeValue | (() => DateRangeValue) }[]. 快捷范围，桌面端显示在日历左侧，窄屏显示在顶部。用函数时在点击那一刻计算，保证“今天”始终准确。
- startName / endName: string. 以本地 YYYY-MM-DD 提交开始、结束日期的隐藏字段名。
- numberOfMonths: number; default 宽度 ≥ 768px 为 2，否则为 1. 并排显示的月份数。
- clearable: boolean; default true. 选定后在触发器末端显示清除按钮；聚焦触发器时 Backspace 也可清除。
- disabledDates: Matcher | Matcher[]. 不可选的日期，例如 { after: new Date() }。
- formatDate / formatRange: (date) => string / ({ from, to }) => string. 自定义触发器中的日期文案。默认中文只写一次年份：2026年9月1日 – 9月30日。
- open / defaultOpen / onOpenChange: boolean / (open) => void. 受控 / 非受控的弹层开关。
- size: "sm" | "default" | "lg"; default "default". 触发器尺寸，与 Select 一致。
- calendarProps: RangeCalendarProps. 范围模式的日历属性，如 startMonth、endMonth、min、max、excludeDisabled；min/max 按两端间的自然日跨度约束。日历选择与快捷范围遵守相同限制。

## Keyboard
- Enter / Space: 在触发器上打开弹层；在日期上选择起点或终点。
- ← → ↑ ↓: 按天、按周移动焦点；选择终点时会预览范围。
- Page Up / Page Down: 切换到上一月 / 下一月。
- Backspace / Delete: 聚焦触发器时清除已选范围。
- Esc: 关闭弹层，放弃未完成的选择。

## Source examples
### 基础用法
Source: apps/docs/src/content/date-range-picker/demos/01-basic.tsx
```tsx
import { DateRangePicker } from "@qingye/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";

export const meta = { title: "基础用法", description: "第一次点击定起点，第二次点击定终点；桌面端并排显示两个月。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>入住日期</FieldLabel>
      <DateRangePicker
        defaultValue={{ from: new Date(2026, 9, 12), to: new Date(2026, 9, 15) }}
        disabledDates={{ before: new Date(2026, 9, 1) }}
        endName="checkOut"
        startName="checkIn"
      />
    </Field>
  );
}
```

### 快捷范围
Source: apps/docs/src/content/date-range-picker/demos/02-presets.tsx
```tsx
import type { DateRangePreset, DateRangeValue } from "@qingye/ui/components/date-range-picker";
import { DateRangePicker } from "@qingye/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { useState } from "react";

export const meta = {
  title: "快捷范围",
  description: "常用时间段一键选定；桌面端在日历左侧，窄屏在顶部横向排列。",
};

const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

const presets: DateRangePreset[] = [
  { label: "今天", value: () => ({ from: new Date(), to: new Date() }) },
  { label: "最近 7 天", value: () => ({ from: daysAgo(6), to: new Date() }) },
  { label: "最近 30 天", value: () => ({ from: daysAgo(29), to: new Date() }) },
  {
    label: "本月",
    value: () => {
      const today = new Date();
      return { from: new Date(today.getFullYear(), today.getMonth(), 1), to: today };
    },
  },
];

export default function Demo() {
  const [range, setRange] = useState<DateRangeValue | null>(() => ({ from: daysAgo(6), to: new Date() }));
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>统计区间</FieldLabel>
      <DateRangePicker
        disabledDates={{ after: new Date() }}
        onValueChange={setRange}
        presets={presets}
        value={range}
      />
    </Field>
  );
}
```

### 尺寸
Source: apps/docs/src/content/date-range-picker/demos/03-sizes.tsx
```tsx
import { DateRangePicker } from "@qingye/ui/components/date-range-picker";

export const meta = { title: "尺寸", description: "与 Select、Input 同一套高度。" };

const range = { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <DateRangePicker aria-label="小尺寸" defaultValue={range} size="sm" />
      <DateRangePicker aria-label="默认尺寸" defaultValue={range} />
      <DateRangePicker aria-label="大尺寸" defaultValue={range} size="lg" />
    </div>
  );
}
```

### 状态
Source: apps/docs/src/content/date-range-picker/demos/04-states.tsx
```tsx
import { DateRangePicker } from "@qingye/ui/components/date-range-picker";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";

export const meta = { title: "状态", description: "占位、跨年范围、禁用与无效。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-5 sm:grid-cols-2">
      <Field>
        <FieldLabel>活动周期</FieldLabel>
        <DateRangePicker placeholder="选择开始与结束日期" />
      </Field>
      <Field>
        <FieldLabel>年度盘点</FieldLabel>
        <DateRangePicker defaultValue={{ from: new Date(2025, 11, 20), to: new Date(2026, 0, 5) }} />
      </Field>
      <Field disabled>
        <FieldLabel>合同有效期</FieldLabel>
        <DateRangePicker defaultValue={{ from: new Date(2026, 0, 1), to: new Date(2026, 11, 31) }} disabled />
      </Field>
      <Field invalid>
        <FieldLabel>请假时间</FieldLabel>
        <DateRangePicker aria-invalid required />
        <FieldError>请选择请假的起止日期</FieldError>
      </Field>
    </div>
  );
}
```

### 筛选栏
Source: apps/docs/src/content/date-range-picker/demos/05-form.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { DateRangePicker } from "@qingye/ui/components/date-range-picker";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { useState } from "react";

export const meta = {
  title: "筛选栏",
  description: "startName / endName 以本地 YYYY-MM-DD 提交，适合直接拼进查询参数。",
};

export default function Demo() {
  const [query, setQuery] = useState("");
  return (
    <form
      className="flex w-full max-w-2xl flex-col gap-3"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setQuery(new URLSearchParams(data as unknown as Record<string, string>).toString());
      }}
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_10rem_auto] sm:items-end">
        <Field>
          <FieldLabel>下单时间</FieldLabel>
          <DateRangePicker
            defaultValue={{ from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) }}
            endName="to"
            startName="from"
          />
        </Field>
        <Field>
          <FieldLabel>订单状态</FieldLabel>
          <NativeSelect defaultValue="paid" name="status">
            <NativeSelectOption value="all">全部</NativeSelectOption>
            <NativeSelectOption value="paid">已支付</NativeSelectOption>
            <NativeSelectOption value="refunded">已退款</NativeSelectOption>
          </NativeSelect>
        </Field>
        <Button type="submit" variant="outline">
          查询
        </Button>
      </div>
      {query ? <code className="truncate rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs">?{query}</code> : null}
    </form>
  );
}
```

### 受限范围
Source: apps/docs/src/content/date-range-picker/demos/06-constraints.tsx
```tsx
import { DateRangePicker } from "@qingye/ui/components/date-range-picker";
import { Field, FieldDescription } from "@qingye/ui/components/field";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "受限范围" };

export default function Demo() {
  return (
    <Field className="w-full max-w-sm">
      <Label htmlFor="analysis-window">分析窗口</Label>
      <DateRangePicker
        aria-describedby="analysis-window-limits"
        calendarProps={{ defaultMonth: new Date(2026, 8, 1), min: 2, max: 7, excludeDisabled: true }}
        disabledDates={new Date(2026, 8, 12)}
        id="analysis-window"
        presets={[
          { label: "9月4日—7日", value: { from: new Date(2026, 8, 4), to: new Date(2026, 8, 7) } },
          { label: "9月10日—15日", value: { from: new Date(2026, 8, 10), to: new Date(2026, 8, 15) } },
          { label: "整个9月", value: { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) } },
        ]}
      />
      <FieldDescription id="analysis-window-limits">跨度 2—7 天；9 月 12 日暂停采集。</FieldDescription>
    </Field>
  );
}
```

