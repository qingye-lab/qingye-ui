"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { CalendarIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, parseLocalDate, type CalendarProps } from "./calendar";
import { Input, type InputProps, type InputSize } from "./input";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

export type DatePickerProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue" | "onChange"> & {
  value?: Date | undefined;
  onValueChange: (value: Date | undefined, event: React.SyntheticEvent) => void;
  name?: string | undefined; form?: string | undefined; size?: InputSize;
  disabled?: boolean; readOnly?: boolean;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">;
};

export function DatePicker({ value, onValueChange, name, form, size = "md", disabled = false, readOnly = false, inputProps = {}, calendarProps = {}, className, render, ref, ...props }: DatePickerProps) {
  const { messages } = useUILocale();
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [fieldDisabled, setFieldDisabled] = React.useState(disabled);
  React.useLayoutEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    const sync = () => setFieldDisabled(input.disabled || input.matches(":disabled"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(input.closest("fieldset") ?? input.parentElement!, { attributes: true, subtree: true, attributeFilter: ["disabled"] });
    return () => observer.disconnect();
  }, []);
  const editable = !disabled && !fieldDisabled && !readOnly;
  const text = value ? formatLocalDate(value) : "";
  const { ref: externalInputRef, onChange, ...inputRest } = inputProps;
  const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof externalInputRef === "function") return externalInputRef(node);
    if (externalInputRef) externalInputRef.current = node;
  }, [externalInputRef]);
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-picker" }, props, {
    className: cn("flex min-w-0 items-start gap-(--qy-action-gap)", className),
    children: <Popover open={editable && open} onOpenChange={setOpen}>
      <Input {...inputRest} type="date" name={name} form={form} size={size} disabled={disabled} readOnly={readOnly} ref={setInputRef} value={text} controlClassName={cn("min-w-0 flex-1", inputRest.controlClassName)}
        onChange={event => { onChange?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented && editable) onValueChange(parseLocalDate(event.currentTarget.value), event); }} />
      <PopoverTrigger disabled={!editable} render={<Button size={size} variant="bordered" shape="icon" aria-label={messages.selectDate} />}><CalendarIcon aria-hidden="true" /></PopoverTrigger>
      {value && <Button size={size} variant="quiet" shape="icon" aria-label={messages.clearDate} disabled={!editable} onClick={event => onValueChange(undefined, event)}><XIcon aria-hidden="true" /></Button>}
      <PopoverPopup align="start"><Calendar {...(value ? { defaultMonth: value } : {})} {...calendarProps} mode="single" size={size} selected={value} disabled={editable ? calendarProps.disabled : true} autoFocus
        onSelect={(next, _day, _modifiers, event) => { if (!editable) return; onValueChange(next, event); setOpen(false); }} /></PopoverPopup>
    </Popover>,
  }) });
}
