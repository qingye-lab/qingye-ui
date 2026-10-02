"use client";

import { XIcon } from "lucide-react";
import { dateMatchModifiers } from "@daypicker/react";
import * as React from "react";
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
import { Input } from "./input";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "./popover";

type CalendarProps = React.ComponentProps<typeof Calendar>;

/** `YYYY-MM-DDTHH:mm:ss.sss` in local time, the format `<input type="datetime-local">` accepts. */
export function formatLocalDateTime(date: Date): string {
  const pad = (number: number, width = 2) => String(number).padStart(width, "0");
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}

/** Parses a local `YYYY-MM-DDTHH:mm[:ss[.sss]]` string; returns `undefined` when it is not a real moment. */
export function parseLocalDateTime(value: string | null | undefined): Date | undefined {
  if (!value || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?$/.test(value)) return undefined;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime()) || formatLocalDateTime(date).slice(0, 16) !== value.slice(0, 16)) return undefined;
  return date;
}

export type DateTimePickerProps = Omit<
  DatePickerTriggerProps,
  "children" | "value" | "defaultValue" | "onChange" | "placeholder" | "icon" | "valueId"
> & {
  /** Names the field in built-in labels, e.g. "开始" → "选择开始日期和时间". */
  label?: string;
  /** Local `YYYY-MM-DDTHH:mm` (seconds optional); empty string when unset. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Submits the value through a hidden input; empty until both parts are valid. */
  name?: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  /** Time granularity in seconds, as on `<input type="time">`. */
  step?: number;
  /** Time used when a day is picked before any time. */
  defaultTime?: string;
  clearable?: boolean;
  clearLabel?: string;
  formatValue?: (value: Date) => string;
  locale?: NonNullable<CalendarProps["locale"]>;
  disabledDates?: Matcher | Matcher[];
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required" | "disabled">;
  /** Class for the root wrapper; the trigger fills it. */
  className?: string;
};

export function DateTimePicker({
  label,
  value,
  defaultValue = "",
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  name,
  required,
  readOnly = false,
  disabled = false,
  placeholder,
  step = 60,
  defaultTime = "00:00",
  clearable = true,
  clearLabel,
  formatValue,
  locale,
  disabledDates,
  calendarProps,
  size = "default",
  className,
  id,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  "aria-describedby": ariaDescribedBy,
  ...triggerProps
}: DateTimePickerProps): React.ReactElement {
  const { code, messages } = useUILocale();
  const generatedId = React.useId();
  const fieldId = id ?? generatedId;
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const valueId = React.useId();
  const [localValue, setLocalValue] = React.useState(defaultValue);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const current = value ?? localValue;
  const date = parseLocalDateTime(current);
  const time = date ? (current.split("T")[1] ?? defaultTime) : defaultTime;
  const open = (openProp ?? internalOpen) && !disabled && !readOnly;
  const withSeconds = step < 60;
  const popupLabel = label ? messages.selectDateTime(label) : messages.selectDateTimePlaceholder;
  const format =
    formatValue ??
    ((moment: Date) =>
      new Intl.DateTimeFormat(locale?.code ?? code, {
        dateStyle: "medium",
        timeStyle: withSeconds ? "medium" : "short",
      }).format(moment));

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const update = (next: string) => {
    const nextDate = parseLocalDateTime(next);
    if (nextDate && disabledDates && dateMatchModifiers(nextDate, disabledDates)) return;
    if (value === undefined) setLocalValue(next);
    onValueChange?.(next);
  };
  const showClear = clearable && date !== undefined && !disabled && !readOnly;
  const todayDisabled = Boolean(disabledDates && dateMatchModifiers(new Date(), disabledDates));
  const timeDisabled = Boolean(disabledDates && dateMatchModifiers(date ?? new Date(), disabledDates));
  // Keep the picked moment audible when an external label names the trigger.
  const labelledBy = ariaLabelledBy ? `${ariaLabelledBy} ${valueId}` : undefined;
  const describedBy =
    !ariaLabelledBy && (ariaLabel || id) && date
      ? [valueId, ariaDescribedBy].filter(Boolean).join(" ")
      : ariaDescribedBy;

  return (
    <div className={cn("relative flex w-full min-w-0", className)} data-slot="date-time-picker">
      <Popover open={open} onOpenChange={(next) => !readOnly && setOpen(next)}>
        <PopoverTrigger
          render={
            <DatePickerTrigger
              {...triggerProps}
              aria-describedby={describedBy}
              aria-label={ariaLabel}
              aria-labelledby={labelledBy}
              aria-readonly={readOnly || undefined}
              aria-required={required || undefined}
              className={cn(showClear && (size === "sm" ? "pe-[calc(1.75rem+2px+var(--qy-space-1)/2)] sm:pe-[calc(1.5rem+2px+var(--qy-space-1)/2)]" : "pe-[calc(1.75rem+4px+var(--qy-space-1))] sm:pe-[calc(1.5rem+4px+var(--qy-space-1))]"))}
              disabled={disabled}
              icon={showClear ? null : undefined}
              id={fieldId}
              placeholder={placeholder ?? messages.selectDateTimePlaceholder}
              ref={triggerRef}
              size={size}
              valueId={valueId}
            />
          }
        >
          {date ? format(date) : null}
        </PopoverTrigger>
        <PopoverPopup align="start" aria-label={popupLabel}>
          <PopoverTitle className="sr-only">{popupLabel}</PopoverTitle>
          <Calendar
            autoFocus
            {...calendarProps}
            mode="single"
            selected={date}
            {...(calendarProps?.defaultMonth || date ? { defaultMonth: calendarProps?.defaultMonth ?? date! } : {})}
            onSelect={(next: Date | undefined) => {
              if (next) update(`${formatLocalDate(next)}T${time}`);
            }}
            {...(locale ? { locale } : {})}
            {...(disabledDates ? { disabled: disabledDates } : {})}
          />
          <div
            className="-mx-2 mt-(--qy-space-2) flex items-center gap-(--qy-space-2) border-t px-(--qy-space-3) pt-(--qy-space-2)"
            data-slot="date-time-picker-footer"
          >
            <label className="shrink-0 text-muted-foreground text-sm" htmlFor={`${fieldId}-time`}>
              {messages.time}
            </label>
            <Input
              className="w-auto"
              disabled={timeDisabled}
              id={`${fieldId}-time`}
              nativeInput
              onChange={(event) => {
                if (!event.target.value) return;
                update(`${formatLocalDate(date ?? new Date())}T${event.target.value}`);
              }}
              size="sm"
              step={step}
              type="time"
              value={withSeconds ? time : time.slice(0, 5)}
            />
            <div className="ms-auto flex items-center gap-(--qy-space-1)">
              <Button
                disabled={todayDisabled}
                onClick={() => {
                  const now = formatLocalDateTime(new Date());
                  update(withSeconds ? now.slice(0, 19) : now.slice(0, 16));
                }}
                size="sm"
                variant="ghost"
              >
                {messages.now}
              </Button>
              <Button onClick={() => setOpen(false)} size="sm" variant="outline">
                {messages.done}
              </Button>
            </div>
          </div>
        </PopoverPopup>
      </Popover>
      {showClear ? (
        <DatePickerClear
          aria-label={clearLabel ?? messages.clearDate}
          onClick={() => {
            update("");
            triggerRef.current?.focus();
          }}
          size={size}
        >
          <XIcon aria-hidden="true" />
        </DatePickerClear>
      ) : null}
      {name ? <input disabled={disabled} name={name} type="hidden" value={date ? current : ""} /> : null}
    </div>
  );
}
