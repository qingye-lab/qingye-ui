# Calendar

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/calendar
Source: packages/ui/src/components/calendar.tsx
Source SHA-256: 7a47bbc0043172cd71716aa38ee26f34bd2160bae3e7011184f8c36d1a77b1a9

Navigate a local calendar and select a day, multiple dates, or a range.

## Decision
Dates use local year, month, and day. The caller declares same-day rules and unavailable dates; the library adds no business duration rules.

## Notes
- Calendar does not create native form fields. Use DatePicker or serialize selection in the application.
- One month, label captions, and navigation after the caption are default layout choices exposed through public props.
- Surfaces, colors, corners, and size roles use the current theme presets; selection and focus reflect real state.

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
Uses the installed DayPicker date, month navigation, keyboard, and selection semantics.
- mode / selected / onSelect / required: DayPickerProps discriminated union. Use the public single, multiple, or range union. The caller owns selection; required limits deselection.
- month / defaultMonth / onMonthChange: Date / Date / (month: Date) => void. Controlled or uncontrolled month navigation; the primitive defaults to the current month.
- disabled / hidden / startMonth / endMonth: DayPicker public props. Declare unavailable days, hidden days, and navigation bounds. disabled does not repair an existing selection.
- min / max / excludeDisabled: range mode: number / number / boolean. The caller declares range length and disabled-day rules. Same-day complete ranges are allowed by default.
- locale / labels / formatters: DayPicker public props. Chinese/English date language and names follow UILocale. Supply a DayPicker locale for other date languages.
- render / ref / className / style / classNames / components: div composition / DayPicker public props. Compose the root and override public parts. A custom Root must preserve refs and semantics.

### formatLocalDate / parseLocalDate
Convert local date fields to and from YYYY-MM-DD. Reject invalid dates without UTC shifts.

### CalendarPrimitive
The installed @daypicker/react namespace.

## Keyboard
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
