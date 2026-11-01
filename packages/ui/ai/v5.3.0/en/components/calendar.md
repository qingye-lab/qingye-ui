# Calendar

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/calendar
Source: packages/ui/src/components/calendar.tsx
Source SHA-256: 939f510230f7bb749ad55edda9f18e426b3445089850b1d0658f521ebe01744d

Navigate a local calendar and select a day, multiple dates, or a range.

## Decision
Dates use local year, month, and day. The caller declares same-day rules and unavailable dates; the library adds no business duration rules.

## Notes
- With a granularity other than day, a Calendar without a selected prop remembers the latest selection itself; passing selected (even undefined) leaves it entirely to the caller. A controlled value that is not on a period start still shows the whole week or cell as selected.
- Calendar does not create native form fields. Use DatePicker or serialize selection in the application.
- One month, label captions, and navigation after the caption are default layout choices exposed through public props.
- Surfaces, colors, corners, and size roles use the current theme presets; selection and focus reflect real state.
- In right-to-left languages the month arrows mirror. Direction comes from the dir prop, then UILocale, then the direction in effect on the ancestors.

## Use and ownership
- View local calendar dates and select a date.
- Avoid: The application must establish rules for zoned values or instants first.
- Library: Date grid, keyboard behavior, and uncontrolled navigation.
- Application: Selected dates, ranges, month/year constraints, and invalid facts.

## Composition
- Calendar or Field + DatePicker.

## Responsive behavior
- One geometry following the density axis; compact tightens the container, never the text; narrow-screen +4px, and actual coarse-pointer cell targets.

## Customization
- CalendarProps, classNames, components, and central theme roles.

## Current exports
- Calendar: function; owner calendar; PASS; props: CalendarProps
- CalendarDateRange: type; owner calendar; PASS
- calendarLocaleFor: function; owner calendar; PASS; props: string
- CalendarPrimitive: reexport; owner calendar; UNVERIFIED
- CalendarProps: type; owner calendar; PASS
- formatLocalDate: function; owner calendar; PASS; props: Date
- parseLocalDate: function; owner calendar; PASS; props: string
- weekRulesFor: function; owner calendar; PASS; props: string

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Calendar
- `granularity?`: `"day" | "week" | "month" | "quarter" | "year"`. 选择的粒度，默认 `"day"`（按天，行为不变）。`"week"` 在按天的网格里整行选一周；`"month"` / `"quarter"` / `"year"` 换成对应的格子网格。 非 `"day"` 时只支持 `mode="single"` 与 `mode="range"`；值仍是 `Date`：单选为该周期的起点，区间的 `from` 是首个周期的起点、`to` 是末个周期的最后一天。
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
Uses the installed DayPicker date, month navigation, keyboard, and selection semantics.
- mode / selected / onSelect / required: DayPickerProps discriminated union. Use the public single, multiple, or range union. The caller owns selection; required limits deselection.
- granularity: "day" | "week" | "month" | "quarter" | "year"; default "day". What one selection covers. week stays on the day grid and selects a whole row; month / quarter / year replace it with a grid of cells (the year grid pages twelve years). Values stay Date: a single value is the period start; a range's from is the first period's start and to is the last day of the last period. Non-day granularities support single and range only. The week start and the week-one rule come from the locale (weekStartsOn / firstWeekContainsDate win), falling back to Monday-start with at least four days in week one (ISO 8601).
- month / defaultMonth / onMonthChange: Date / Date / (month: Date) => void. Controlled or uncontrolled month navigation; the primitive defaults to the current month.
- disabled / hidden / startMonth / endMonth: DayPicker public props. Declare unavailable days, hidden days, and navigation bounds. disabled does not repair an existing selection.
- min / max / excludeDisabled: range mode: number / number / boolean. The caller declares range length and disabled-day rules. Same-day complete ranges are allowed by default.
- locale / labels / formatters / weekStartsOn: DayPicker public props. Follows the UILocale code. Chinese and US English use the DayPicker locales; other languages format month names, weekday names, and digits with platform Intl and take the first day of the week from Intl.Locale week info (Sunday where the platform lacks it). An explicit locale prop hands all of this to the caller; weekStartsOn or formatters alone override only that part (2026-10-12).
- captionLayout / startMonth / endMonth: "label" | "dropdown" | "dropdown-months" | "dropdown-years" / Date / Date. The dropdown layouts draw month and year as the same fill-control NativeSelect; startMonth and endMonth give the option range. Use them to reach distant dates such as birthdays.
- render / ref / className / style / classNames / components: div composition / DayPicker public props. Compose the root and override public parts. A custom Root must preserve refs and semantics.

### formatLocalDate / parseLocalDate
Convert local date fields to and from YYYY-MM-DD. Reject invalid dates without UTC shifts.

### CalendarPrimitive
The installed @daypicker/react namespace.

## Keyboard
- Arrow keys / Home / End / PageUp / PageDown（月、季、年格）: On the month, quarter and year grids, arrow keys move cell by cell, Home / End go to the row ends, and PageUp / PageDown turn a page (a year for months and quarters, twelve years for the year grid).
- Arrow keys / Home / End: The date primitive moves focus through the calendar grid.
- PageUp / PageDown: Navigate months using the primitive's calendar rules.
- Enter / Space: Select the focused day within the declared mode and disabled rules.

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

### 周、月、季、年
Source: apps/docs/src/content/calendar/demos/04-granularity.tsx
```tsx
import { useId, useState } from "react";
import { Calendar, formatLocalDate, type CalendarDateRange, type CalendarProps } from "@qingye_lab/ui/components/calendar";
import { Field, FieldTitle } from "@qingye_lab/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";

export const meta = { title: "周、月、季、年", titleEn: "Week, month, quarter, year" };

type Granularity = NonNullable<CalendarProps["granularity"]>;

export default function Demo() {
  const id = useId();
  const [granularity, setGranularity] = useState<Granularity>("week");
  const [value, setValue] = useState<CalendarDateRange | undefined>();
  const change = (next: Granularity) => { setGranularity(next); setValue(undefined); };
  return (
    <div className="grid justify-items-start gap-(--qy-field-group-gap)">
      <Field><FieldTitle id={id}>粒度</FieldTitle>
        <SegmentedControl value={granularity} onValueChange={change} aria-labelledby={id}>
          <SegmentedControlItem value="week">周</SegmentedControlItem>
          <SegmentedControlItem value="month">月</SegmentedControlItem>
          <SegmentedControlItem value="quarter">季</SegmentedControlItem>
          <SegmentedControlItem value="year">年</SegmentedControlItem>
        </SegmentedControl>
      </Field>
      <Calendar key={granularity} granularity={granularity} mode="range" selected={value} onSelect={setValue} defaultMonth={new Date(2026, 9, 1)} />
      <output className="text-support text-muted-foreground">{value?.from ? formatLocalDate(value.from) : "—"} / {value?.to ? formatLocalDate(value.to) : "—"}</output>
    </div>
  );
}
```
