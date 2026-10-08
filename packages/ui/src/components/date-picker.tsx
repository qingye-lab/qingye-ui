"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconCalendar, IconX } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { inputAdjunctClassName, withHiddenIndicator } from "../input-adjunct";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, parseLocalDate, type CalendarProps } from "./calendar";
import { Input, type InputProps } from "./input";
import { InputGroup } from "./input-group";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

export type DatePickerProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue" | "onChange"> & {
  value?: Date | undefined;
  onValueChange: (value: Date | undefined, event: React.SyntheticEvent) => void;
  name?: string | undefined; form?: string | undefined;
  disabled?: boolean; readOnly?: boolean;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">;
};

export function DatePicker({ value, onValueChange, name, form, disabled = false, readOnly = false, inputProps = {}, calendarProps = {}, className, render, ref, ...props }: DatePickerProps) {
  const { messages } = useUILocale();
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
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
    if (typeof externalInputRef === "function") {
      const cleanup = externalInputRef(node);
      if (typeof cleanup === "function") return () => { inputRef.current = null; cleanup(); };
    } else if (externalInputRef) externalInputRef.current = node;
  }, [externalInputRef]);
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-picker" }, props, {
    className: cn("flex min-w-0", className),
    // 日期、清除与日历共用一条编辑边界（基础层 §6「编辑边界内的附属动作」）；平台日历图标隐藏，
    // 只保留一个打开日历的入口。日期格式长度固定，边界宽度随内容，不拉满容器。
    children: <Popover open={editable && open} onOpenChange={setOpen}>
      <InputGroup ref={boundaryRef} data-slot="date-picker-control" className="w-fit max-w-full flex-nowrap">
        <Input {...inputRest} type="date" name={name} form={form} disabled={disabled} readOnly={readOnly} ref={setInputRef} value={text} unstyled controlClassName={cn("min-w-0 flex-1", inputRest.controlClassName)}
          className={withHiddenIndicator(inputRest.className)}
          onChange={event => { onChange?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented && editable) onValueChange(parseLocalDate(event.currentTarget.value), event); }} />
        {value && editable && <Button variant="quiet" shape="icon" className={cn(inputAdjunctClassName, "aspect-square")} aria-label={messages.clearDate} onClick={event => onValueChange(undefined, event)}><IconX aria-hidden="true" /></Button>}
        <PopoverTrigger disabled={!editable} render={<Button variant="quiet" shape="icon" className={cn(inputAdjunctClassName, "aspect-square")} aria-label={messages.selectDate} />}><IconCalendar aria-hidden="true" /></PopoverTrigger>
      </InputGroup>
      <PopoverPopup align="start" anchor={boundaryRef}><Calendar {...(value ? { defaultMonth: value } : {})} {...calendarProps} mode="single" selected={value} disabled={editable ? calendarProps.disabled : true} autoFocus
        onSelect={(next, _day, _modifiers, event) => { if (!editable) return; onValueChange(next, event); setOpen(false); }} /></PopoverPopup>
    </Popover>,
  }) });
}
