"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconCalendar, IconX } from "@tabler/icons-react";
import * as React from "react";
import { intersectNativeBounds, mergeCalendarBounds, readNativeEntry, useInputFacts, useCustomValidity, useInputRef, useTypingText, warnEmptyBounds } from "../input-facts";
import { DraftSurface } from "../draft-surface";
import { formatPeriod, isSamePeriod, parsePeriod, periodWithinBounds, type DateGranularity, type PeriodGranularity } from "../date-granularity";
import { useUILocale } from "../locale";
import { inputAdjunctClassName, withHiddenIndicator } from "../input-adjunct";
import { InputGroupReadOnlyNote } from "../input-readonly-note";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, parseLocalDate, weekRulesFor, type CalendarProps } from "./calendar";
import type { Input as InputPrimitive } from "@base-ui/react/input";
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
  /**
   * 选择的粒度，默认 `"day"`。非 `"day"` 时值仍是 `Date`，规范为该周期的起点（周：区域的周起始日；月、季、年：当月 / 季 / 年的第一天）；
   * 输入框改为文本，按区域的格式显示与解析（如「2026 年第 44 周」「2026 年 11 月」），键入在失焦或回车时才采纳；`min` / `max` 与周期有交集即可选。
   * 提交的 `name` 仍是周期起点的 ISO 日期。
   */
  granularity?: DateGranularity;
  name?: string | undefined; form?: string | undefined;
  disabled?: boolean; readOnly?: boolean;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required" | "granularity">;
};

// 固定宽度的 ISO 文本可直接按字典序比较（与 intersectNativeBounds 同理）。
const outOfRange = (entry: string, min: string | undefined, max: string | undefined) => Boolean(min && entry < min || max && entry > max);

export function DatePicker(allProps: DatePickerProps) {
  const { value: valueProp, defaultValue, onValueChange, min, max, granularity = "day", name, form, disabled = false, readOnly = false, inputProps = {}, calendarProps = {}, className, render, ref, ...props } = allProps;
  const { code, messages } = useUILocale();
  const period: PeriodGranularity | undefined = granularity === "day" ? undefined : granularity;
  const rules = React.useMemo(() => weekRulesFor(code, calendarProps), [code, calendarProps.weekStartsOn, calendarProps.firstWeekContainsDate, calendarProps.locale]);
  // 受控与否看 `value` 属性在不在，而不是它是不是 undefined：此前 `value` 就是必须由调用方持有的受控入口，
  // 空值也是 `value={undefined}`，这样既有用法的行为（拒绝变更则保持原值）一点不变。
  const controlled = "value" in allProps;
  const [uncontrolled, setUncontrolled] = React.useState<Date | undefined>(defaultValue);
  const value = controlled ? valueProp : uncontrolled;
  const [open, setOpen] = React.useState(false);
  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const { ref: externalInputRef, onChange, onBlur, render: inputRender, ...inputRest } = inputProps;
  const [fieldName, setFieldName] = React.useState<string | undefined>(name);
  const [inputRef, setInputRef] = useInputRef(externalInputRef);
  const facts = useInputFacts(inputRef, { disabled, readOnly }, { value: false });
  const readOnlyNow = readOnly || facts.readOnly;
  const editable = !disabled && !facts.disabled && !readOnlyNow;
  const text = value ? (period ? formatPeriod(value, period, rules, messages) : formatLocalDate(value)) : "";
  const typing = useTypingText(text);
  // 未被采纳的键入（不完整或越界）在失焦时标为无效；只在键入仍未被采纳时有效，外部改值、清除、选日历、reset 后自然失效。
  const [rejection, setRejection] = React.useState<"dateIncomplete" | "dateOutOfRange" | undefined>();
  const invalidKind = typing.active ? rejection : undefined;
  useCustomValidity(inputRef, invalidKind ? messages[invalidKind] : "");
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
  // 周期输入：键入的是文本，不像原生日期输入那样逐段有效，所以不在每次按键时采纳（键入「2026 年 1」时不能先当成一月），
  // 失焦或回车才解析；解析不了或与 min / max 没有交集，文字原样留着并标为无效（同按天的 dateIncomplete / dateOutOfRange）。
  const commitText = (raw: string, event: React.SyntheticEvent) => {
    if (!period) return;
    if (!raw.trim()) { typing.release(); setRejection(undefined); if (value) change(undefined, event); return; }
    const next = parsePeriod(raw, period, rules, messages);
    if (!next) return setRejection("dateIncomplete");
    if (!periodWithinBounds(next, period, rules, native.min ? parseLocalDate(native.min) : undefined, native.max ? parseLocalDate(native.max) : undefined)) return setRejection("dateOutOfRange");
    typing.release(); setRejection(undefined);
    if (!isSamePeriod(next, value, period, rules)) change(next, event);
  };
  const entryProps = period ? {
    type: "text" as const,
    onBlur: (event: Parameters<NonNullable<InputProps["onBlur"]>>[0]) => { onBlur?.(event); if (editable && typing.active) commitText(event.currentTarget.value, event); },
    onKeyDown: (event: Parameters<NonNullable<InputProps["onKeyDown"]>>[0]) => {
      inputRest.onKeyDown?.(event);
      if (event.key !== "Enter" || event.defaultPrevented || !editable || !typing.active) return;
      event.preventDefault();
      commitText(event.currentTarget.value, event);
    },
    onChange: (event: Parameters<NonNullable<InputProps["onChange"]>>[0]) => {
      onChange?.(event);
      if (event.defaultPrevented || !editable) return;
      setRejection(undefined);
      typing.hold(event.currentTarget.value);
    },
  } : undefined;
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-picker" }, props, {
    className: cn("flex min-w-0", className),
    // 日期、清除与日历共用一条编辑边界（基础层 §6「编辑边界内的附属动作」）；平台日历图标隐藏，
    // 只保留一个打开日历的入口。日期格式长度固定，边界宽度随内容，不拉满容器。
    children: <Popover open={editable && open} onOpenChange={setOpen}>
      <InputGroup ref={boundaryRef} data-slot="date-picker-control" data-readonly={readOnlyNow ? "" : undefined} className="w-fit max-w-full flex-nowrap">
        <Input {...inputRest} aria-invalid={inputRest["aria-invalid"] ?? (invalidKind ? true : undefined)} min={period ? undefined : native.min} max={period ? undefined : native.max} type="date" name={period ? undefined : name} form={form} disabled={disabled} readOnly={readOnly} ref={setInputRef} value={typing.shown} unstyled controlClassName={cn("min-w-0 flex-1", inputRest.controlClassName)}
          className={withHiddenIndicator(inputRest.className)}
          {...entryProps}
          {...(period ? { render: (elementProps: React.ComponentPropsWithRef<"input">, state: InputPrimitive.State) => <DraftSurface elementProps={elementProps} state={state} render={inputRender} onName={setFieldName} /> } : { render: inputRender })}
          onBlur={entryProps?.onBlur ?? (event => {
            onBlur?.(event);
            // 逐段删完时值一直是空串，浏览器不再发 input 事件：离开输入时若所有分段都空，这才是清除；其余未采纳的键入保留并标为无效（见下）。
            if (editable && typing.active && value && readNativeEntry(event.currentTarget) === "empty") change(undefined, event);
            if (!typing.active) return;
            const entry = readNativeEntry(event.currentTarget);
            if (entry === "empty") return typing.release();
            // 读者键入的内容不替他丢掉：保留文字并标为无效，让提交被拦下。
            setRejection(entry !== "partial" && parseLocalDate(entry) && outOfRange(entry, native.min, native.max) ? "dateOutOfRange" : "dateIncomplete");
          })}
          onChange={entryProps?.onChange ?? (event => {
            onChange?.(event);
            if (event.defaultPrevented || event.baseUIHandlerPrevented || !editable) return;
            // 键入中间态不是值：年份可键到 5–6 位、分段可以只填一半（2026-10-12，D7）。
            // 只有「所有分段都被清空」才是清除；其余无法解释为 1–9999 年有效日期的内容留在输入里，不上报也不清空已有值。
            setRejection(undefined);
            const entry = readNativeEntry(event.currentTarget);
            if (entry === "partial") return typing.hold("");
            if (entry === "empty") { typing.release(); return change(undefined, event); }
            const next = parseLocalDate(entry);
            if (!next) return typing.hold(entry);
            // 超出 min / max 的完整日期不是可采纳的值：不上报、不改已有值，文字留在输入里。
            if (outOfRange(entry, native.min, native.max)) return typing.hold(entry);
            typing.release();
            change(next, event);
          })} />
        {readOnlyNow && !disabled ? <InputGroupReadOnlyNote /> : null}
        {/* 清除后按钮随值消失，焦点回到输入（同 SearchInput 的清空），不落到 body。 */}
        {value && editable && <Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={messages.clearDate} onClick={event => { typing.release(); change(undefined, event); inputRef.current?.focus(); }}><IconX aria-hidden="true" /></Button>}
        <PopoverTrigger disabled={!editable} render={<Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={period ? { week: messages.selectWeek, month: messages.selectMonth, quarter: messages.selectQuarter, year: messages.selectYear }[period] : messages.selectDate} />}><IconCalendar aria-hidden="true" /></PopoverTrigger>
      </InputGroup>
      {period && (fieldName ?? name) && value && <input type="hidden" name={fieldName ?? name} value={formatLocalDate(value)} form={form} disabled={disabled || facts.disabled} />}
      <PopoverPopup align="start" anchor={boundaryRef}><Calendar {...(value ? { defaultMonth: value } : {})} {...calendarProps} {...bounds} granularity={granularity} mode="single" selected={value} disabled={editable ? bounds.disabled : true} autoFocus
        onSelect={(next, _day, _modifiers, event) => { if (!editable) return; typing.release(); change(next, event); setOpen(false); }} /></PopoverPopup>
    </Popover>,
  }) });
}
