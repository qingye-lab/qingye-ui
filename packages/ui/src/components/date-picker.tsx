"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconCalendar, IconX } from "@tabler/icons-react";
import * as React from "react";
import { intersectNativeBounds, mergeCalendarBounds, readNativeEntry, useInputFacts, useInputRef, useTypingText, warnEmptyBounds } from "../input-facts";
import { useUILocale } from "../locale";
import { inputAdjunctClassName, withHiddenIndicator } from "../input-adjunct";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, parseLocalDate, type CalendarProps } from "./calendar";
import { Input, type InputProps } from "./input";
import { InputGroup } from "./input-group";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

export type DatePickerProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue" | "onChange"> & {
  /** 受控日期；`undefined` 表示空。**传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。 */
  value?: Date | undefined;
  /** 非受控的初值，原生表单 reset 会回到它。 */
  defaultValue?: Date | undefined;
  onValueChange?: ((value: Date | undefined, event: React.SyntheticEvent) => void) | undefined;
  /**
   * 可选的最早 / 最晚日期，一处声明同时约束原生输入（min / max 属性）与日历（禁用范围与可翻到的月份）。
   * 与 `inputProps.min/max`、`calendarProps.disabled/startMonth/endMonth` 并存，同时给出时取交集。
   */
  min?: Date | undefined; max?: Date | undefined;
  name?: string | undefined; form?: string | undefined;
  disabled?: boolean; readOnly?: boolean;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">;
};

export function DatePicker(allProps: DatePickerProps) {
  const { value: valueProp, defaultValue, onValueChange, min, max, name, form, disabled = false, readOnly = false, inputProps = {}, calendarProps = {}, className, render, ref, ...props } = allProps;
  const { messages } = useUILocale();
  // 受控与否看 `value` 属性在不在，而不是它是不是 undefined：此前 `value` 就是必须由调用方持有的受控入口，
  // 空值也是 `value={undefined}`，这样既有用法的行为（拒绝变更则保持原值）一点不变。
  const controlled = "value" in allProps;
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultValue);
  const value = controlled ? valueProp : uncontrolled;
  const [open, setOpen] = React.useState(false);
  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const { ref: externalInputRef, onChange, onBlur, ...inputRest } = inputProps;
  const [inputRef, setInputRef] = useInputRef(externalInputRef);
  const facts = useInputFacts(inputRef, { disabled }, { value: false });
  const editable = !disabled && !facts.disabled && !readOnly;
  const text = value ? formatLocalDate(value) : "";
  const typing = useTypingText(text);
  const change = (next: Date | undefined, event: React.SyntheticEvent) => {
    if (!controlled) setUncontrolled(next);
    onValueChange?.(next, event);
  };
  const latest = React.useRef({ controlled, defaultValue, release: typing.release });
  latest.current = { controlled, defaultValue, release: typing.release };
  React.useEffect(() => {
    const owner = inputRef.current?.form;
    if (!owner) return;
    // 原生 reset 后非受控值回到 defaultValue；受控值归调用方，只放弃未采纳的键入。
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      if (!latest.current.controlled) setUncontrolled(latest.current.defaultValue);
      latest.current.release();
    });
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [inputRef, form]);
  const native = intersectNativeBounds(inputRest, min && formatLocalDate(min), max && formatLocalDate(max));
  warnEmptyBounds("DatePicker", native.min, native.max);
  const bounds = mergeCalendarBounds(calendarProps, min, max);
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-picker" }, props, {
    className: cn("flex min-w-0", className),
    // 日期、清除与日历共用一条编辑边界（基础层 §6「编辑边界内的附属动作」）；平台日历图标隐藏，
    // 只保留一个打开日历的入口。日期格式长度固定，边界宽度随内容，不拉满容器。
    children: <Popover open={editable && open} onOpenChange={setOpen}>
      <InputGroup ref={boundaryRef} data-slot="date-picker-control" className="w-fit max-w-full flex-nowrap">
        <Input {...inputRest} min={native.min} max={native.max} type="date" name={name} form={form} disabled={disabled} readOnly={readOnly} ref={setInputRef} value={typing.shown} unstyled controlClassName={cn("min-w-0 flex-1", inputRest.controlClassName)}
          className={withHiddenIndicator(inputRest.className)}
          onBlur={event => {
            onBlur?.(event);
            // 逐段删完时值一直是空串，浏览器不再发 input 事件：离开输入时若所有分段都空，这才是清除；其余未采纳的键入放弃。
            if (editable && typing.active && value && readNativeEntry(event.currentTarget) === "empty") change(undefined, event);
            typing.release();
          }}
          onChange={event => {
            onChange?.(event);
            if (event.defaultPrevented || event.baseUIHandlerPrevented || !editable) return;
            // 键入中间态不是值：年份可键到 5–6 位、分段可以只填一半（2026-10-12，D7）。
            // 只有「所有分段都被清空」才是清除；其余无法解释为 1–9999 年有效日期的内容留在输入里，不上报也不清空已有值。
            const entry = readNativeEntry(event.currentTarget);
            if (entry === "partial") return typing.hold("");
            if (entry === "empty") { typing.release(); return change(undefined, event); }
            const next = parseLocalDate(entry);
            if (!next) return typing.hold(entry);
            typing.release();
            change(next, event);
          }} />
        {value && editable && <Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={messages.clearDate} onClick={event => { typing.release(); change(undefined, event); }}><IconX aria-hidden="true" /></Button>}
        <PopoverTrigger disabled={!editable} render={<Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={messages.selectDate} />}><IconCalendar aria-hidden="true" /></PopoverTrigger>
      </InputGroup>
      <PopoverPopup align="start" anchor={boundaryRef}><Calendar {...(value ? { defaultMonth: value } : {})} {...calendarProps} {...bounds} mode="single" selected={value} disabled={editable ? bounds.disabled : true} autoFocus
        onSelect={(next, _day, _modifiers, event) => { if (!editable) return; change(next, event); setOpen(false); }} /></PopoverPopup>
    </Popover>,
  }) });
}
