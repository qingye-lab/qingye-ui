"use client";

import { useState, type ComponentProps } from "react";
import { CalendarIcon, XIcon } from "lucide-react";
import { useUILocale } from "../locale";
import { Button, type ButtonProps } from "./button";
import { Calendar } from "./calendar";
import { Input } from "./input";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";

export type DatePickerProps = {
  value?: Date | null;
  defaultValue?: Date | null;
  onValueChange?: (value: Date | null) => void;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  clearLabel?: string;
  formatDate?: (value: Date) => string;
  locale?: ComponentProps<typeof Calendar>["locale"];
  disabledDates?: ComponentProps<typeof Calendar>["disabled"];
  buttonProps?: Omit<ButtonProps, "children" | "disabled" | "type">;
};

export function DatePicker(props: DatePickerProps) {
  const { code, messages } = useUILocale();
  const { value, defaultValue = null, onValueChange, name, disabled = false, placeholder = messages.selectDate, clearLabel = messages.clearDate, locale, formatDate = (date) => new Intl.DateTimeFormat(locale?.code ?? code, { dateStyle: "medium" }).format(date), disabledDates, buttonProps } = props;
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const raw = value === undefined ? internal : value;
  const date = raw && !Number.isNaN(raw.getTime()) ? raw : null;
  const update = (next: Date | null) => { if (value === undefined) setInternal(next); onValueChange?.(next); setOpen(false); };
  const iso = date ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";
  return <>
    <div className="flex min-w-0 items-center gap-2">
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button variant="outline" className="w-full justify-start" {...buttonProps} type="button" disabled={disabled} />}><CalendarIcon aria-hidden="true" /><span className="flex-1 text-left">{date ? formatDate(date) : placeholder}</span></PopoverTrigger>
        <PopoverContent className="w-auto p-0" aria-label={placeholder}>
          <Calendar mode="single" selected={date ?? undefined} {...(date ? { defaultMonth: date } : {})} onSelect={(next) => update(next ?? null)} {...(locale ? { locale } : {})} {...(disabledDates ? { disabled: disabledDates } : {})} />
        </PopoverContent>
      </Popover>
      {date ? <Button type="button" variant="ghost" size="icon" disabled={disabled} aria-label={clearLabel} onClick={() => update(null)}><XIcon aria-hidden="true" /></Button> : null}
    </div>
    {name ? <Input type="hidden" nativeInput unstyled className="hidden" name={name} value={iso} readOnly disabled={disabled} /> : null}
  </>;
}
