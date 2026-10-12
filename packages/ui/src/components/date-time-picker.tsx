"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconCalendar } from "@tabler/icons-react";
import * as React from "react";
import { intersectNativeBounds, mergeCalendarBounds, readNativeEntry, useInputFacts, useInputRef, useTypingText, warnEmptyBounds } from "../input-facts";
import { useUILocale } from "../locale";
import { inputAdjunctClassName, withHiddenIndicator } from "../input-adjunct";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, parseLocalDate, type CalendarProps } from "./calendar";
import { Input, type InputProps } from "./input";
import { InputGroup } from "./input-group";
import { Label } from "./label";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

export type DateTimePickerProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue" | "onChange"> & {
  /** Local wall-clock text, YYYY-MM-DDTHH:mm[:ss]; no zone or instant is inferred. **传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。 */
  value?: string | undefined;
  /** 非受控的初值（同样的无时区文本），原生表单 reset 会回到它。 */
  defaultValue?: string | undefined;
  onValueChange?: ((value: string | undefined, event: React.SyntheticEvent) => void) | undefined;
  /**
   * 可选的最早 / 最晚时刻（同样的无时区文本），一处声明同时约束原生输入、日历的禁用日期、
   * 弹层里时间输入的边界日，并使超出范围的草稿不能应用。与 `inputProps.min/max`、`calendarProps.disabled` 并存，同时给出时取交集。
   */
  min?: string | undefined; max?: string | undefined;
  name?: string | undefined; form?: string | undefined; disabled?: boolean; readOnly?: boolean;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">;
};
const validTime = (text: string) => /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(text);
const validDateTime = (text: string) => { const parts = text.split("T"); return parts.length === 2 && parseLocalDate(parts[0]!) !== undefined && validTime(parts[1]!); };
// 带不带秒的两段文本放在一起比较时补齐到秒。
const withSeconds = (text: string) => text.length === 16 ? `${text}:00` : text;

export function DateTimePicker(allProps: DateTimePickerProps) {
  const { value: valueProp, defaultValue, onValueChange, min, max, name, form, disabled = false, readOnly = false, inputProps = {}, calendarProps = {}, className, render, ref, ...props } = allProps;
  // 受控与否看 `value` 属性在不在（同 DatePicker）：既有的受控用法，包括 `value={undefined}` 表示空，行为不变。
  const controlled = "value" in allProps;
  const [uncontrolled, setUncontrolled] = React.useState<string | undefined>(defaultValue);
  const value = controlled ? valueProp : uncontrolled;
  if (value && !validDateTime(value)) throw new RangeError("DateTimePicker requires complete local date/time text without a zone.");
  if (min && !validDateTime(min) || max && !validDateTime(max)) throw new RangeError("DateTimePicker min and max require complete local date/time text without a zone.");
  const { messages } = useUILocale();
  const timeId = React.useId();
  const [open, setOpen] = React.useState(false);
  const [dateDraft, setDateDraft] = React.useState<Date | undefined>(parseLocalDate(value?.split("T")[0] ?? ""));
  const [timeDraft, setTimeDraft] = React.useState(value?.split("T")[1] ?? "");
  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const { ref: externalInputRef, onChange, onBlur, ...inputRest } = inputProps;
  const [inputRef, setInputRef] = useInputRef(externalInputRef);
  const facts = useInputFacts(inputRef, { disabled }, { value: false });
  const editable = !disabled && !facts.disabled && !readOnly;
  const typing = useTypingText(value ?? "");
  const change = (next: string | undefined, event: React.SyntheticEvent) => {
    if (!controlled) setUncontrolled(next);
    onValueChange?.(next, event);
  };
  const latest = React.useRef({ controlled, defaultValue, release: typing.release });
  latest.current = { controlled, defaultValue, release: typing.release };
  React.useEffect(() => {
    const owner = inputRef.current?.form;
    if (!owner) return;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      if (!latest.current.controlled) setUncontrolled(latest.current.defaultValue);
      latest.current.release();
    });
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [inputRef, form]);
  const native = intersectNativeBounds(inputRest, min, max);
  warnEmptyBounds("DateTimePicker", native.min, native.max);
  const bounds = mergeCalendarBounds(calendarProps, min ? parseLocalDate(min.split("T")[0]!) : undefined, max ? parseLocalDate(max.split("T")[0]!) : undefined);
  const draftText = dateDraft && validTime(timeDraft) ? `${formatLocalDate(dateDraft)}T${timeDraft}` : undefined;
  const draftInRange = draftText !== undefined && (!min || withSeconds(draftText) >= withSeconds(min)) && (!max || withSeconds(draftText) <= withSeconds(max));
  // 边界那一天的时间也受约束：日期草稿落在 min / max 当天时，时间输入带上对应的时刻边界。
  const draftDay = dateDraft ? formatLocalDate(dateDraft) : undefined;
  const timeMin = min && draftDay === min.split("T")[0] ? min.split("T")[1] : undefined;
  const timeMax = max && draftDay === max.split("T")[0] ? max.split("T")[1] : undefined;
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-time-picker" }, props, {
    className: cn("flex min-w-0", className),
    children: <Popover open={editable && open} onOpenChange={next => { if (next) { setDateDraft(parseLocalDate(value?.split("T")[0] ?? "")); setTimeDraft(value?.split("T")[1] ?? ""); } setOpen(next); }}>
      {/* 基础层 §6：日期时间与日历入口共用一条编辑边界；格式长度固定，宽度随内容。 */}
      <InputGroup ref={boundaryRef} data-slot="date-time-picker-control" className="w-fit max-w-full flex-nowrap">
        <Input {...inputRest} min={native.min} max={native.max} ref={setInputRef} type="datetime-local" name={name} form={form} disabled={disabled} readOnly={readOnly} value={typing.shown} unstyled controlClassName={cn("min-w-0 flex-1", inputRest.controlClassName)} className={withHiddenIndicator(inputRest.className)}
          onBlur={event => {
            onBlur?.(event);
            if (editable && typing.active && value && readNativeEntry(event.currentTarget) === "empty") change(undefined, event);
            typing.release();
          }}
          onChange={event => {
            onChange?.(event);
            if (event.defaultPrevented || event.baseUIHandlerPrevented || !editable) return;
            // 与 DatePicker 同理（2026-10-12）：键入中间态与 5–6 位年份不是值，不上报、不清空；
            // 此前把 `20261-10-03T12:30` 原样交给调用方，下一次渲染就会因「不是完整的本地日期时间」而抛错。
            const entry = readNativeEntry(event.currentTarget);
            if (entry === "partial") return typing.hold("");
            if (entry === "empty") { typing.release(); return change(undefined, event); }
            if (!validDateTime(entry)) return typing.hold(entry);
            typing.release();
            change(entry, event);
          }} />
        <PopoverTrigger disabled={!editable} render={<Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={messages.selectDateTime} />}><IconCalendar aria-hidden="true" /></PopoverTrigger>
      </InputGroup>
      <PopoverPopup align="start" anchor={boundaryRef}><div className="grid gap-(--qy-field-group-gap)"><Calendar {...(dateDraft ? { defaultMonth: dateDraft } : {})} {...calendarProps} {...bounds} mode="single" selected={dateDraft} disabled={editable ? bounds.disabled : true} autoFocus onSelect={setDateDraft} />
        <div className="grid gap-(--qy-field-gap)"><Label htmlFor={timeId}>{messages.time}</Label><Input nativeInput id={timeId} type="time" value={timeDraft} disabled={!editable} step={inputProps.step} {...(timeMin ? { min: timeMin } : {})} {...(timeMax ? { max: timeMax } : {})} onChange={event => setTimeDraft(event.currentTarget.value)} /></div>
        <div className="flex flex-wrap gap-(--qy-action-gap)"><Button disabled={!editable || !draftInRange} onClick={event => { if (draftText && draftInRange) { change(draftText, event); if (!event.defaultPrevented) setOpen(false); } }}>{messages.apply}</Button><Button variant="quiet" onClick={() => setOpen(false)}>{messages.cancel}</Button><Button variant="quiet" disabled={!editable || !value} onClick={event => { change(undefined, event); if (!event.defaultPrevented) setOpen(false); }}>{messages.clear}</Button></div>
      </div></PopoverPopup>
    </Popover>,
  }) });
}
