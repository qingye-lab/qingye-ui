"use client";

import { CalendarIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Calendar, type Matcher } from "./calendar";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";
import { selectTriggerIconClassName, selectTriggerVariants } from "./select";

type CalendarProps = React.ComponentProps<typeof Calendar>;
type CalendarLocale = NonNullable<CalendarProps["locale"]>;

const pad = (value: number, width = 2) => String(value).padStart(width, "0");

/** Formats a date as the local calendar day `YYYY-MM-DD`, ignoring time zones. */
export function formatLocalDate(date: Date): string {
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Parses `YYYY-MM-DD` as a local calendar day; returns `undefined` for anything else. */
export function parseLocalDate(value: string | null | undefined): Date | undefined {
  const match = value ? /^(\d{4})-(\d{2})-(\d{2})$/.exec(value) : null;
  if (!match) return undefined;
  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return formatLocalDate(date) === value ? date : undefined;
}

/**
 * Trigger styling shared by every date control. It is the Select trigger, so
 * date fields line up with selects and inputs in the same form.
 */
export const datePickerTriggerVariants = selectTriggerVariants;

export type DatePickerTriggerProps = Omit<React.ComponentProps<"button">, "value"> & {
  size?: "sm" | "default" | "lg";
  /** Shown in the muted placeholder colour while `children` is empty. */
  placeholder?: React.ReactNode;
  /** Replaces the trailing calendar icon; `null` hides it. */
  icon?: React.ReactNode;
  /** Id of the value span, so a label can reference both name and value. */
  valueId?: string;
};

/**
 * A button that reads like a form control. Compose it with `PopoverTrigger`
 * (`render={<DatePickerTrigger />}`) to build date, range and time pickers.
 */
export function DatePickerTrigger({
  className,
  size = "default",
  placeholder,
  icon,
  valueId,
  children,
  disabled,
  type = "button",
  ...props
}: DatePickerTriggerProps): React.ReactElement {
  const empty = children === undefined || children === null || children === "" || children === false;
  return (
    <button
      className={cn(datePickerTriggerVariants({ size }), "min-w-0", className)}
      data-disabled={disabled ? "" : undefined}
      data-placeholder={empty ? "" : undefined}
      disabled={disabled}
      type={type}
      {...props}
      // Composed triggers (PopoverTrigger) pass their own slot; this one wins.
      data-slot="date-picker-trigger"
    >
      <span
        className="min-w-0 flex-1 truncate numeric in-data-placeholder:text-muted-foreground/72"
        data-slot="date-picker-value"
        id={valueId}
      >
        {empty ? placeholder : children}
      </span>
      {icon === undefined ? (
        <CalendarIcon aria-hidden="true" className={selectTriggerIconClassName} data-slot="date-picker-icon" />
      ) : (
        icon
      )}
    </button>
  );
}

export type DatePickerClearProps = React.ComponentProps<"button"> & {
  size?: "sm" | "default" | "lg";
};

/** The clear button that sits over the end of a `DatePickerTrigger`. */
export function DatePickerClear({
  className,
  size = "default",
  type = "button",
  ...props
}: DatePickerClearProps): React.ReactElement {
  return (
    <button
      className={cn(
        "qy-pressable touch-target absolute top-1/2 inline-flex size-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-foreground opacity-72 outline-none transition-[opacity,background-color] hover:bg-accent hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-[length:var(--qy-focus-button-width)] focus-visible:ring-ring sm:size-6 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        size === "sm" ? "end-0.5" : "end-1",
        className,
      )}
      data-slot="date-picker-clear"
      type={type}
      {...props}
    />
  );
}

export type DatePickerProps = Omit<
  DatePickerTriggerProps,
  "children" | "defaultValue" | "onChange" | "placeholder" | "icon" | "valueId"
> & {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Submits the day as local `YYYY-MM-DD` through a hidden input. */
  name?: string;
  required?: boolean;
  placeholder?: string;
  /** Show a clear button once a date is picked. */
  clearable?: boolean;
  clearLabel?: string;
  formatDate?: (value: Date) => string;
  locale?: CalendarLocale;
  /** Days that cannot be picked, e.g. `{ before: new Date() }`. */
  disabledDates?: Matcher | Matcher[];
  /** Extra Calendar props such as `captionLayout`, `startMonth`, `endMonth`. */
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required" | "disabled">;
  /** Class for the root wrapper; the trigger fills it. */
  className?: string;
};

export function DatePicker({
  value,
  defaultValue = null,
  onValueChange,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  name,
  required,
  disabled = false,
  placeholder,
  clearable = true,
  clearLabel,
  formatDate,
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
}: DatePickerProps): React.ReactElement {
  const { code, messages } = useUILocale();
  const [internal, setInternal] = React.useState<Date | null>(defaultValue);
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const valueId = React.useId();
  const raw = value === undefined ? internal : value;
  const date = raw && !Number.isNaN(raw.getTime()) ? raw : null;
  const open = (openProp ?? internalOpen) && !disabled;
  const format =
    formatDate ??
    ((day: Date) => new Intl.DateTimeFormat(locale?.code ?? code, { dateStyle: "medium" }).format(day));

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setInternalOpen(next);
    onOpenChange?.(next);
  };
  const update = (next: Date | null) => {
    if (value === undefined) setInternal(next);
    onValueChange?.(next);
  };
  const clear = () => {
    update(null);
    triggerRef.current?.focus();
  };
  const showClear = clearable && date !== null && !disabled;
  // A label that names the trigger would otherwise hide the picked date from
  // assistive technology, so the value joins the name or the description.
  const labelledBy = ariaLabelledBy ? `${ariaLabelledBy} ${valueId}` : undefined;
  const describedBy =
    !ariaLabelledBy && (ariaLabel || id) && date
      ? [valueId, ariaDescribedBy].filter(Boolean).join(" ")
      : ariaDescribedBy;

  return (
    <div className={cn("relative flex w-full min-w-0", className)} data-slot="date-picker">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          render={
            <DatePickerTrigger
              {...triggerProps}
              aria-describedby={describedBy}
              aria-label={ariaLabel}
              aria-labelledby={labelledBy}
              aria-required={required || undefined}
              disabled={disabled}
              icon={showClear ? null : undefined}
              id={id}
              onKeyDown={(event) => {
                onKeyDown?.(event);
                if (!event.defaultPrevented && showClear && (event.key === "Backspace" || event.key === "Delete")) {
                  event.preventDefault();
                  update(null);
                }
              }}
              placeholder={placeholder ?? messages.selectDate}
              ref={triggerRef}
              size={size}
              valueId={valueId}
              className={cn(showClear && (size === "sm" ? "pe-[calc(1.75rem+2px+var(--qy-space-1)/2)] sm:pe-[calc(1.5rem+2px+var(--qy-space-1)/2)]" : "pe-[calc(1.75rem+4px+var(--qy-space-1))] sm:pe-[calc(1.5rem+4px+var(--qy-space-1))]"))}
            />
          }
        >
          {date ? format(date) : null}
        </PopoverTrigger>
        <PopoverPopup align="start" aria-label={ariaLabel ?? placeholder ?? messages.selectDate}>
          <Calendar
            autoFocus
            {...calendarProps}
            mode="single"
            selected={date ?? undefined}
            {...(calendarProps?.defaultMonth || date ? { defaultMonth: calendarProps?.defaultMonth ?? date! } : {})}
            onSelect={(next: Date | undefined) => {
              update(next ?? null);
              setOpen(false);
            }}
            {...(locale ? { locale } : {})}
            {...(disabledDates ? { disabled: disabledDates } : {})}
          />
        </PopoverPopup>
      </Popover>
      {showClear ? (
        <DatePickerClear aria-label={clearLabel ?? messages.clearDate} onClick={clear} size={size}>
          <XIcon aria-hidden="true" />
        </DatePickerClear>
      ) : null}
      {name ? <input disabled={disabled} name={name} type="hidden" value={date ? formatLocalDate(date) : ""} /> : null}
    </div>
  );
}
