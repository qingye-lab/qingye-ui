# 日历 Calendar

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/calendar
Source: packages/ui/src/components/calendar.tsx
Source SHA-256: 224bcf465e9b9ac6ef0d006f48db9272253ba1e4396cfe2d834af94fbe111612

在当地日历中导航年月，选择单日、多个日期或日期范围。

## Decision
日历的 Date 按当地年月日解释。范围是否允许同日、哪些日期不可选由调用方声明，库不添加业务时长规则。

## Notes
- 本组件不生成原生表单值；用 DatePicker 或在调用方序列化选中日期。
- 一个月、caption label 与 nav after 是默认布局选择，可通过公共 props 改动。
- 表面、颜色、圆角与尺寸角色沿用当前主题预设；选中与焦点信号来自真实状态。
- 从右向左的语言下，翻页箭头镜像；方向取 dir 属性，其次 UILocale，再次祖先元素实际生效的方向。

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
- calendarLocaleFor: function; owner calendar; PASS; props: string
- CalendarPrimitive: reexport; owner calendar; UNVERIFIED
- CalendarProps: type; owner calendar; PASS
- formatLocalDate: function; owner calendar; PASS; props: Date
- parseLocalDate: function; owner calendar; PASS; props: string

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Calendar
- `ref?`: `React.Ref<HTMLDivElement> | undefined`.
- `render?`: `useRender.ComponentProps<"div">["render"]`.
- plus 68 inherited (react-day-picker 68); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context RootComposition: without a provider default-value; provided by Calendar

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Calendar
复用安装版 DayPicker 的日期、年月、键盘与选择语义。
- mode / selected / onSelect / required: DayPickerProps discriminated union. single、multiple、range 各按公开原语类型组合；选中值归调用方，required 限制原语取消选择。
- month / defaultMonth / onMonthChange: Date / Date / (month: Date) => void. 受控或非受控年月导航；未指定时采用 DayPicker 当前月份默认值。
- disabled / hidden / startMonth / endMonth: DayPicker public props. 明确不可选日期、隐藏日期与导航范围。disabled 不替调用方纠正已有选中值。
- min / max / excludeDisabled: range mode: number / number / boolean. 范围长度与跨禁用日期的规则由调用方显式声明。默认允许同日完整范围。
- locale / labels / formatters / weekStartsOn: DayPicker public props. 默认跟随 UILocale 的语言代码：中文与美式英文用 DayPicker 自带区域；其余语言的月名、星期名、数字由平台 Intl 按代码格式化，周起始日取 Intl.Locale 的周信息（平台没有时退回周日）。显式传入 locale 时全部归调用方；单独传 weekStartsOn 或 formatters 只覆盖那一项（2026-10-12）。
- captionLayout / startMonth / endMonth: "label" | "dropdown" | "dropdown-months" | "dropdown-years" / Date / Date. dropdown 系列把月份或年份画成与 NativeSelect 同一套填值控件，选项范围由 startMonth / endMonth 给出；远日期（生日、证件日期）从这里直达。
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

### 年月下拉
Source: apps/docs/src/content/calendar/demos/03-dropdown.tsx
```tsx
import { useState } from "react";
import { Calendar, formatLocalDate } from "@qingye_lab/ui/components/calendar";
export const meta = { title: "年月下拉", titleEn: "Year and month dropdowns" };
export default function Demo() {
  const [value, setValue] = useState<Date | undefined>(new Date(1994, 4, 18));
  return <div className="grid justify-items-start gap-(--qy-field-group-gap)"><Calendar mode="single" selected={value} onSelect={setValue} defaultMonth={new Date(1994, 4, 1)} captionLayout="dropdown" startMonth={new Date(1920, 0)} endMonth={new Date(2026, 11)} /><output className="text-support text-muted-foreground">{value ? formatLocalDate(value) : "—"}</output></div>;
}
```
