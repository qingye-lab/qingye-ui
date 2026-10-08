# 日历 Calendar

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/calendar
Source: packages/ui/src/components/calendar.tsx
Source SHA-256: 7a47bbc0043172cd71716aa38ee26f34bd2160bae3e7011184f8c36d1a77b1a9

在当地日历中导航年月，选择单日、多个日期或日期范围。

## Decision
日历的 Date 按当地年月日解释。范围是否允许同日、哪些日期不可选由调用方声明，库不添加业务时长规则。

## Notes
- 本组件不生成原生表单值；用 DatePicker 或在调用方序列化选中日期。
- 一个月、caption label 与 nav after 是默认布局选择，可通过公共 props 改动。
- 表面、颜色、圆角与尺寸角色沿用当前主题预设；选中与焦点信号来自真实状态。

## Use and ownership
- 需要查看当地年月日并选择日期
- Avoid: 具有时区或时间点意义的值先在应用确定规则
- Library: 日期网格、键盘、非受控导航
- Application: 选中日期、范围、年月约束与无效事实

## Composition
- Calendar 或 Field + DatePicker

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字；窄屏 +4px，粗指针实体单元命中

## Customization
- CalendarProps、classNames、components 与集中主题角色

## Current exports
- Calendar: function; owner calendar; PASS; props: CalendarProps
- CalendarDateRange: type; owner calendar; PASS
- CalendarPrimitive: reexport; owner calendar; UNVERIFIED
- CalendarProps: type; owner calendar; PASS
- formatLocalDate: function; owner calendar; PASS; props: Date
- parseLocalDate: function; owner calendar; PASS; props: string

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Calendar
复用安装版 DayPicker 的日期、年月、键盘与选择语义。
- mode / selected / onSelect / required: DayPickerProps discriminated union. single、multiple、range 各按公开原语类型组合；选中值归调用方，required 限制原语取消选择。
- month / defaultMonth / onMonthChange: Date / Date / (month: Date) => void. 受控或非受控年月导航；未指定时采用 DayPicker 当前月份默认值。
- disabled / hidden / startMonth / endMonth: DayPicker public props. 明确不可选日期、隐藏日期与导航范围。disabled 不替调用方纠正已有选中值。
- min / max / excludeDisabled: range mode: number / number / boolean. 范围长度与跨禁用日期的规则由调用方显式声明。默认允许同日完整范围。
- locale / labels / formatters: DayPicker public props. 默认按 UILocale 的中文/英文提供日期语言与名称；其他日期语言可传 DayPicker locale。
- render / ref / className / style / classNames / components: div composition / DayPicker public props. 根出口支持组合；classNames/components 显式覆写实际部位。替换 Root 时由调用方保留 ref 与语义。

### formatLocalDate / parseLocalDate
本地年月日与 YYYY-MM-DD 互转；无效日期拒绝，不经 UTC 移日。

### CalendarPrimitive
安装版 @daypicker/react 命名空间。

## Keyboard
- Arrow keys / Home / End: 由日期原语在真实日历网格中移动焦点。
- PageUp / PageDown: 按日期原语规则导航年月。
- Enter / Space: 选择聚焦日期，遵守 disabled 与当前选择模式。

## Source examples
### 单日
Source: apps/docs/src/content/calendar/demos/01-single.tsx
```tsx
import { useState } from "react";
import { Calendar, formatLocalDate } from "@qingye_lab/ui/components/calendar";
export const meta = { title: "单日", titleEn: "Single day" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 9, 3));
  return <div className="grid justify-items-start gap-(--qy-field-group-gap)"><Calendar mode="single" selected={value} onSelect={setValue} defaultMonth={new Date(2026, 9, 1)} /><output className="text-support text-muted-foreground">{value ? formatLocalDate(value) : "—"}</output></div>;
}
```

### 范围与禁用日期
Source: apps/docs/src/content/calendar/demos/02-range.tsx
```tsx
import { useState } from "react";
import { Calendar, formatLocalDate, type CalendarDateRange } from "@qingye_lab/ui/components/calendar";
export const meta = { title: "范围与禁用日期", titleEn: "Range and disabled dates" };
export default function Demo() {
  const [value, setValue] = useState<CalendarDateRange | undefined>({ from: new Date(2026, 9, 3), to: new Date(2026, 9, 5) });
  return <div className="grid justify-items-start gap-(--qy-field-group-gap)"><Calendar mode="range" selected={value} onSelect={setValue} min={1} excludeDisabled disabled={new Date(2026, 9, 8)} defaultMonth={new Date(2026, 9, 1)} /><output className="text-support text-muted-foreground">{value?.from ? formatLocalDate(value.from) : "—"} / {value?.to ? formatLocalDate(value.to) : "—"}</output></div>;
}
```
