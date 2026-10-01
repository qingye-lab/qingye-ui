"use client";

import { XIcon } from "lucide-react";
import * as React from "react";
import { useMediaQuery } from "../hooks/use-media-query";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, type Matcher } from "./calendar";
import {
  DatePickerClear,
  DatePickerTrigger,
  type DatePickerTriggerProps,
  formatLocalDate,
} from "./date-picker";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

type CalendarProps = React.ComponentProps<typeof Calendar>;
type CalendarLocale = NonNullable<CalendarProps["locale"]>;

/** A picked range. A committed value always carries both ends. */
export type DateRangeValue = { from?: Date | undefined; to?: Date | undefined };

export type DateRangePreset = {
  label: string;
  /** A range, or a function evaluated on click so “today” stays current. */
  value: DateRangeValue | (() => DateRangeValue);
};

export type DateRangePickerProps = Omit<
  DatePickerTriggerProps,
  | "children"
  | "defaultValue"
  | "value"
  | "onChange"
  | "placeholder"
  | "icon"
  | "valueId"
  | "name"
> & {
  value?: DateRangeValue | null;
  defaultValue?: DateRangeValue | null;
  /** Called with a complete range, or `null` when cleared. */
  onValueChange?: (value: DateRangeValue | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Submits the first day as local `YYYY-MM-DD` through a hidden input. */
  startName?: string;
  /** Submits the last day as local `YYYY-MM-DD` through a hidden input. */
  endName?: string;
  required?: boolean;
  placeholder?: string;
  /** Shortcuts shown beside the calendar, e.g. 今天、最近 7 天. */
  presets?: DateRangePreset[];
  /** Show a clear button once a range is picked. */
  clearable?: boolean;
  clearLabel?: string;
  /** Formats one end of the range. */
  formatDate?: (value: Date) => string;
  /** Formats the whole range; takes precedence over `formatDate`. */
  formatRange?: (range: { from: Date; to: Date }) => string;
  /** Months shown side by side. Defaults to 2 from 768px, otherwise 1. */
  numberOfMonths?: number;
  locale?: CalendarLocale;
  /** Days that cannot be picked, e.g. `{ before: new Date() }`. */
  disabledDates?: Matcher | Matcher[];
  /** Extra Calendar props such as `startMonth` or `endMonth`. */
  calendarProps?: Omit<
    CalendarProps,
    "mode" | "selected" | "onSelect" | "required" | "disabled" | "numberOfMonths"
  >;
  /** Class for the root wrapper; the trigger fills it. */
  className?: string;
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const sameDay = (a: Date | undefined, b: Date | undefined) =>
  Boolean(a && b && formatLocalDate(a) === formatLocalDate(b));

function isValidDate(date: Date | undefined): date is Date {
  return date instanceof Date && !Number.isNaN(date.getTime());
}

function complete(range: DateRangeValue | null | undefined): {
  from: Date;
  to: Date;
} | null {
  if (!range || !isValidDate(range.from) || !isValidDate(range.to)) return null;
  return range.from <= range.to
    ? { from: range.from, to: range.to }
    : { from: range.to, to: range.from };
}

function resolvePreset(preset: DateRangePreset): { from: Date; to: Date } | null {
  return complete(typeof preset.value === "function" ? preset.value() : preset.value);
}

/**
 * Picks a start and an end day in one popover: the first click sets the
 * start, the second the end, and the range applies. Presets apply at once.
 */
export function DateRangePicker({
  value,
  defaultValue = null,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  startName,
  endName,
  required,
  disabled = false,
  placeholder,
  presets,
  clearable = true,
  clearLabel,
  formatDate,
  formatRange,
  numberOfMonths,
  locale,
  disabledDates,
  calendarProps,
  size = "default",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  onKeyDown,
  ...triggerProps
}: DateRangePickerProps): React.ReactElement {
  const { code, messages } = useUILocale();
  const [internal, setInternal] = React.useState<DateRangeValue | null>(
    defaultValue,
  );
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  // The first click of a new range, before the end is picked.
  const [anchor, setAnchor] = React.useState<Date | null>(null);
  const [hovered, setHovered] = React.useState<Date | null>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const valueId = React.useId();
  const wide = useMediaQuery("(min-width: 768px)");
  const range = complete(value === undefined ? internal : value);
  const open = (openProp ?? internalOpen) && !disabled;
  const localeCode = locale?.code ?? code;

  const setOpen = (next: boolean) => {
    setAnchor(null);
    setHovered(null);
    if (openProp === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const update = (next: { from: Date; to: Date } | null) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };

  const formatDay = React.useCallback(
    (date: Date, withYear = true) => {
      if (formatDate) return formatDate(date);
      const options: Intl.DateTimeFormatOptions = withYear
        ? { dateStyle: "medium" }
        : { month: localeCode.startsWith("zh") ? "long" : "short", day: "numeric" };
      return new Intl.DateTimeFormat(localeCode, options).format(date);
    },
    [formatDate, localeCode],
  );

  const display = (from: Date, to: Date | undefined): React.ReactNode => {
    if (!to) {
      return (
        <>
          {formatDay(from)} –{" "}
          <span className="text-muted-foreground" data-slot="date-range-picker-pending">
            {messages.endDate}
          </span>
        </>
      );
    }
    if (formatRange) return formatRange({ from, to });
    if (sameDay(from, to)) return formatDay(from);
    if (formatDate) return `${formatDate(from)} – ${formatDate(to)}`;
    // Chinese reads best with the year once: 2026年9月1日 – 10月3日.
    if (localeCode.startsWith("zh")) {
      return `${formatDay(from)} – ${formatDay(to, from.getFullYear() !== to.getFullYear())}`;
    }
    return new Intl.DateTimeFormat(localeCode, { dateStyle: "medium" }).formatRange(from, to);
  };

  const pick = (day: Date) => {
    if (!anchor) {
      setAnchor(startOfDay(day));
      return;
    }
    const next =
      day < anchor ? { from: startOfDay(day), to: anchor } : { from: anchor, to: startOfDay(day) };
    update(next);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const applyPreset = (preset: DateRangePreset) => {
    const next = resolvePreset(preset);
    if (!next) return;
    update({ from: startOfDay(next.from), to: startOfDay(next.to) });
    setOpen(false);
    triggerRef.current?.focus();
  };

  const clear = () => {
    update(null);
    triggerRef.current?.focus();
  };

  // While choosing the end, the calendar shows the start and a hover preview.
  const selected = anchor ? { from: anchor, to: undefined } : (range ?? undefined);
  const preview =
    anchor && hovered && !sameDay(anchor, hovered)
      ? hovered < anchor
        ? { from: hovered, to: anchor, forward: false }
        : { from: anchor, to: hovered, forward: true }
      : null;
  const shown = anchor ? display(anchor, undefined) : range ? display(range.from, range.to) : null;
  const showClear = clearable && range !== null && !disabled && !anchor;
  const labelledBy = ariaLabelledBy ? `${ariaLabelledBy} ${valueId}` : undefined;
  const describedBy =
    !ariaLabelledBy && (ariaLabel || id) && shown
      ? [valueId, ariaDescribedBy].filter(Boolean).join(" ")
      : ariaDescribedBy;
  const months = numberOfMonths ?? (wide ? 2 : 1);
  const popupLabel = ariaLabel ?? placeholder ?? messages.selectDateRange;
  const defaultMonth = calendarProps?.defaultMonth ?? range?.from;

  const previewModifiers = preview
    ? {
        previewMiddle: (date: Date) => date > preview.from && date < preview.to && !sameDay(date, preview.to),
        previewEnd: (date: Date) => sameDay(date, preview.forward ? preview.to : preview.from),
        previewAnchor: (date: Date) => sameDay(date, anchor ?? undefined),
      }
    : undefined;

  return (
    <div className={cn("relative flex w-full min-w-0", className)} data-slot="date-range-picker">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <DatePickerTrigger
              {...triggerProps}
              aria-describedby={describedBy}
              aria-label={ariaLabel}
              aria-labelledby={labelledBy}
              aria-required={required || undefined}
              className={cn(showClear && (size === "sm" ? "pe-8 sm:pe-7" : "pe-9 sm:pe-8"))}
              disabled={disabled}
              icon={showClear ? null : undefined}
              id={id}
              onKeyDown={(event) => {
                onKeyDown?.(event);
                if (
                  !event.defaultPrevented &&
                  showClear &&
                  (event.key === "Backspace" || event.key === "Delete")
                ) {
                  event.preventDefault();
                  update(null);
                }
              }}
              placeholder={placeholder ?? messages.selectDateRange}
              ref={triggerRef}
              size={size}
              valueId={valueId}
            />
          }
        >
          {shown}
        </PopoverTrigger>
        <PopoverPopup align="start" aria-label={popupLabel}>
          <div
            className="flex flex-col gap-2 md:flex-row"
            data-slot="date-range-picker-content"
          >
            {presets?.length ? (
              <div
                aria-label={messages.selectDateRange}
                className="-mx-2 -mt-2 flex shrink-0 gap-1 overflow-x-auto border-b p-2 [scrollbar-width:none] md:mx-0 md:-ms-2 md:-my-2 md:w-32 md:flex-col md:overflow-visible md:border-e md:border-b-0"
                data-slot="date-range-picker-presets"
                role="group"
              >
                {presets.map((preset) => {
                  const resolved = resolvePreset(preset);
                  const active = Boolean(
                    resolved &&
                      range &&
                      !anchor &&
                      sameDay(resolved.from, range.from) &&
                      sameDay(resolved.to, range.to),
                  );
                  return (
                    <Button
                      aria-pressed={active}
                      className="shrink-0 justify-start font-normal aria-pressed:bg-accent aria-pressed:font-medium md:w-full"
                      key={preset.label}
                      onClick={() => applyPreset(preset)}
                      size="sm"
                      variant="ghost"
                    >
                      {preset.label}
                    </Button>
                  );
                })}
              </div>
            ) : null}
            <Calendar
              autoFocus
              {...calendarProps}
              className={cn("max-md:mx-auto", calendarProps?.className)}
              {...(defaultMonth ? { defaultMonth } : {})}
              mode="range"
              showOutsideDays={calendarProps?.showOutsideDays ?? months === 1}
              modifiers={{ ...calendarProps?.modifiers, ...previewModifiers }}
              modifiersClassNames={{
                ...calendarProps?.modifiersClassNames,
                previewAnchor: cn(
                  preview?.forward ? "[&>button]:rounded-e-none" : "[&>button]:rounded-s-none",
                ),
                previewEnd: cn(
                  "[&>button]:bg-accent",
                  preview?.forward ? "[&>button]:rounded-s-none" : "[&>button]:rounded-e-none",
                ),
                previewMiddle: "[&>button]:rounded-none [&>button]:bg-accent",
              }}
              numberOfMonths={months}
              onDayFocus={(day) => setHovered(day)}
              onDayMouseEnter={(day) => setHovered(day)}
              onSelect={(_range: unknown, day: Date) => pick(day)}
              selected={selected}
              {...(locale ? { locale } : {})}
              {...(disabledDates ? { disabled: disabledDates } : {})}
            />
          </div>
        </PopoverPopup>
      </Popover>
      {showClear ? (
        <DatePickerClear aria-label={clearLabel ?? messages.clear} onClick={clear} size={size}>
          <XIcon aria-hidden="true" />
        </DatePickerClear>
      ) : null}
      {startName ? (
        <input
          disabled={disabled}
          name={startName}
          type="hidden"
          value={range ? formatLocalDate(range.from) : ""}
        />
      ) : null}
      {endName ? (
        <input
          disabled={disabled}
          name={endName}
          type="hidden"
          value={range ? formatLocalDate(range.to) : ""}
        />
      ) : null}
    </div>
  );
}
