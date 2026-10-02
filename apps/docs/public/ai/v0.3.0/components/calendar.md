# 日历 Calendar

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/calendar
Source: packages/ui/src/components/calendar.tsx
Source SHA-256: c13768263411376cd8eef65e6772e4ea94e0e02039fe5343358f1c18b8c414b6

内联展示的月历，支持单选、范围和多选。需要放进表单字段时用 DatePicker。

## Use and ownership
- 需要持续可见的自然日选择，或作为日期字段弹层内的选择工作面。
- Avoid: 将月份导航边界误当作可选日期约束；用今天的标记冒充选中；只靠颜色区分禁用日。
- Library: 月历原语、日期焦点、语言、选中和禁用部位。
- Application: 日期限制、已选值、时区解释和业务提交。

## Composition
- 用 selected/onSelect 表达当前选择，用 disabled/min/max 表达限制；单字段提交复用 DatePicker。

## Responsive behavior
- 多个月份在窄屏纵向排列；触屏格遵守命中目标，不能为了排下两月压缩日期格。

## Customization
- classNames/components 可修改部位，但保留日历按钮名称、键盘行为和真实状态。

## Current exports
- Calendar: function; owner calendar; PASS; props: React.ComponentProps<typeof DayPicker>
- DateRange: reexport; owner calendar; UNVERIFIED
- Matcher: reexport; owner calendar; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @daypicker/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Calendar
基于 DayPicker 10。月份、星期与无障碍标签跟随 UILocaleProvider，而不是浏览器语言。
- mode: "single" | "range" | "multiple"; default "single". 选择模式。
- selected: Date | DateRange | Date[]. 受控的选中值，类型随 mode 变化。
- onSelect: (value, triggerDate, modifiers, event) => void. 选择变化时调用。
- numberOfMonths: number; default 1. 并排显示的月份数；窄屏下纵向堆叠。
- captionLayout: "label" | "dropdown" | "dropdown-months" | "dropdown-years"; default "label". 标题区改为月份 / 年份下拉，配合 startMonth、endMonth 限定范围。
- disabled: Matcher | Matcher[]. 不可选的日期，例如 { before: today } 或 { dayOfWeek: [0, 6] }。
- showOutsideDays: boolean; default true. 显示相邻月份补位的日期。
- defaultMonth: Date. 初始显示的月份。
- min / max: number. range / multiple 模式下的最少、最多天数。
- locale: DayPicker Locale. 覆盖由 UI 语言推导的日期语言包。

## Keyboard
- ← → ↑ ↓: 按天 / 按周移动焦点。
- Home / End: 移动到本周第一天 / 最后一天。
- PageUp / PageDown: 切换到上个月 / 下个月；加 Shift 按年切换。
- Enter / Space: 选中焦点所在日期。

## Source examples
### 单选
Source: apps/docs/src/content/calendar/demos/01-single.tsx
```tsx
import { Calendar } from "@qingye/ui/components/calendar";
import { useState } from "react";

export const meta = { title: "单选", description: "今天以小圆点标出；补位的相邻月份日期也可点选。" };

export default function Demo() {
  const today = new Date();
  const [date, setDate] = useState<Date | undefined>(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
  );
  return <Calendar mode="single" selected={date} onSelect={setDate} />;
}
```

### 范围与双月
Source: apps/docs/src/content/calendar/demos/02-range.tsx
```tsx
import { Calendar } from "@qingye/ui/components/calendar";
import { type DateRange } from "@qingye/ui";
import { useState } from "react";

export const meta = {
  title: "范围与双月",
  description: "mode=\"range\" 选择起止日期，numberOfMonths 并排显示两个月；今天之前不可选。",
};

export default function Demo() {
  const today = new Date();
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 9),
  });
  return (
    <Calendar
      mode="range"
      numberOfMonths={2}
      selected={range}
      onSelect={setRange}
      disabled={{ before: today }}
    />
  );
}
```

### 多选
Source: apps/docs/src/content/calendar/demos/03-multiple.tsx
```tsx
import { Calendar } from "@qingye/ui/components/calendar";
import { useState } from "react";

export const meta = { title: "多选", description: "最多选择 5 个值班日；周末不可选。" };

export default function Demo() {
  const today = new Date();
  const [days, setDays] = useState<Date[] | undefined>([]);
  return (
    <div className="flex flex-col items-center gap-3">
      <Calendar
        mode="multiple"
        max={5}
        selected={days}
        onSelect={setDays}
        disabled={{ dayOfWeek: [0, 6] }}
        defaultMonth={today}
      />
      <p className="text-muted-foreground text-sm numeric">已选 {days?.length ?? 0} / 5 天</p>
    </div>
  );
}
```

### 年月下拉
Source: apps/docs/src/content/calendar/demos/04-dropdown.tsx
```tsx
import { Calendar } from "@qingye/ui/components/calendar";
import { useState } from "react";

export const meta = {
  title: "年月下拉",
  description: "captionLayout=\"dropdown\" 适合跨度大的日期，例如出生日期。",
};

export default function Demo() {
  const [date, setDate] = useState<Date | undefined>(new Date(1994, 5, 18));
  return (
    <Calendar
      mode="single"
      captionLayout="dropdown"
      startMonth={new Date(1950, 0)}
      endMonth={new Date()}
      defaultMonth={new Date(1994, 5)}
      selected={date}
      onSelect={setDate}
    />
  );
}
```

### 组合：会议室预订
Source: apps/docs/src/content/calendar/demos/05-booking.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Calendar } from "@qingye/ui/components/calendar";
import { type DateRange } from "@qingye/ui";
import { useState } from "react";

export const meta = { title: "组合：会议室预订", description: "日历放进卡片，下方汇总所选天数。", flush: true };

const format = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" });

export default function Demo() {
  const today = new Date();
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
  });
  const nights =
    range?.from && range.to ? Math.round((range.to.getTime() - range.from.getTime()) / 86_400_000) + 1 : 0;

  return (
    <div className="mx-auto flex w-fit flex-col rounded-2xl border bg-card shadow-xs/5">
      <div className="p-2">
        <Calendar mode="range" selected={range} onSelect={setRange} disabled={{ before: today }} />
      </div>
      <div className="flex items-center justify-between gap-3 border-t px-4 py-3">
        <div className="flex min-w-0 flex-col">
          <span className="font-medium text-sm">3 号会议室 · 12 人</span>
          <span className="truncate text-muted-foreground text-xs">
            {range?.from ? format.format(range.from) : "未选择"}
            {range?.to ? ` – ${format.format(range.to)}` : ""}
          </span>
        </div>
        <Button size="sm" disabled={!nights} className="numeric">
          {`预订 ${nights} 天`}
        </Button>
      </div>
    </div>
  );
}
```

