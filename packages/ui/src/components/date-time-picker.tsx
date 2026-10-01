"use client";

import { CalendarIcon } from "lucide-react";
import { useUILocale } from "../locale";
import { useId, useState, type ComponentProps } from "react";
import { Calendar } from "./calendar";
import { Button } from "./button";
import { Input } from "./input";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./input-group";
import { Label } from "./label";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "./popover";

type DateTimePickerProps = Pick<ComponentProps<typeof Input>, "id" | "name" | "required" | "disabled" | "readOnly" | "aria-invalid" | "aria-describedby" | "aria-label"> & {
  label: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: ((value: string) => void) | undefined;
};

export function formatLocalDateTime(date: Date): string {
  const pad = (number: number, width = 2) => String(number).padStart(width, "0");
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}

function selectedDate(value: string): Date | undefined {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?$/.test(value)) return undefined;
  const date = new Date(value);
  if (!Number.isFinite(date.getTime()) || formatLocalDateTime(date).slice(0, 16) !== value.slice(0, 16)) return undefined;
  return date;
}

export function DateTimePicker({ id, name, label, value, defaultValue = "", onValueChange, disabled, readOnly, required, "aria-invalid": ariaInvalid, ...inputProps }: DateTimePickerProps) {
  const { messages } = useUILocale();
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const [localValue, setLocalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const current = value ?? localValue;
  const date = selectedDate(current);
  const time = current.split("T")[1] ?? "00:00";
  const update = (next: string) => {
    setLocalValue(next);
    onValueChange?.(next);
  };

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <InputGroup>
          <InputGroupInput nativeInput id={fieldId} value={current.replace("T", " ")} placeholder="YYYY-MM-DD HH:mm" autoComplete="off" required={required} disabled={disabled} readOnly={readOnly} aria-invalid={ariaInvalid === false || ariaInvalid === "false" ? undefined : ariaInvalid} onChange={(event) => update(event.target.value.replace(" ", "T"))} {...inputProps} />
          <InputGroupAddon align="inline-end">
            <PopoverTrigger render={<InputGroupButton size="icon-sm" aria-label={messages.selectDateTime(label)} disabled={disabled || readOnly} />}><CalendarIcon /></PopoverTrigger>
          </InputGroupAddon>
        </InputGroup>
        <PopoverContent align="start" aria-label={messages.selectDateTime(label)}>
          <div className="grid gap-3">
            <PopoverTitle className="sr-only">{label}</PopoverTitle>
            <Calendar mode="single" selected={date} {...(date ? { defaultMonth: date } : {})} onSelect={(next) => {
              if (next) update(`${formatLocalDateTime(next).slice(0, 10)}T${time}`);
            }} />
            <div className="grid gap-2">
              <Label htmlFor={`${fieldId}-time`}>{messages.time}</Label>
              <Input nativeInput id={`${fieldId}-time`} type="time" step="0.001" value={time} onChange={(event) => {
                const day = date ?? new Date();
                update(`${formatLocalDateTime(day).slice(0, 10)}T${event.target.value}`);
              }} />
            </div>
            <Button variant="outline" onClick={() => setOpen(false)}>{messages.done}</Button>
          </div>
        </PopoverContent>
      </Popover>
      {name ? <Input nativeInput unstyled className="hidden" type="hidden" name={name} value={date ? current : ""} /> : null}
    </>
  );
}
