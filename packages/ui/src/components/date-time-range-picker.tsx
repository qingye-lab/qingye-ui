"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { IconCalendar, IconX } from "@tabler/icons-react";
import * as React from "react";
import { intersectNativeBounds, mergeCalendarBounds, readNativeEntry, useCustomValidity, useInputFacts, useInputRef, useTypingText, warnEmptyBounds } from "../input-facts";
import { DraftSurface } from "../draft-surface";
import { inputAdjunctClassName, withHiddenIndicator } from "../input-adjunct";
import { InputGroupReadOnlyNote } from "../input-readonly-note";
import { comparableTime, validLocalTime } from "../local-time";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, parseLocalDate, type CalendarDateRange, type CalendarProps } from "./calendar";
import { Input, type InputProps } from "./input";
import { InputGroup, InputGroupAddon } from "./input-group";
import { Label } from "./label";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

/** 起止两个时刻，各自沿用 DateTimePicker 的值：`YYYY-MM-DDTHH:mm[:ss[.SSS]]` 无时区本地文本。 */
export type DateTimeRangeValue = { from: string; to: string };
/** 草稿的端点：键入或弹层选择中，任何一端都可能还空着。 */
export type DateTimeRangeDraft = { from?: string | undefined; to?: string | undefined };
/** 草稿不能提交的原因：只填了一端（`incomplete`）、起点晚于终点（`order`）、超出 `min` / `max`（`bounds`）。 */
export type DateTimeRangeInvalidReason = "incomplete" | "order" | "bounds";
type NativeInputProps = Omit<InputProps, "value" | "defaultValue" | "name" | "type" | "size" | "form" | "disabled" | "readOnly" | "onValueChange">;
export type DateTimeRangePickerProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue" | "onChange" | "onInvalid"> & {
  /** 受控的完整范围；`undefined` 表示空。**传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。 */
  value?: DateTimeRangeValue | undefined;
  /** 非受控的初值，原生表单 reset 会回到它。 */
  defaultValue?: DateTimeRangeValue | undefined;
  /** 只有完整且有序（且在 min / max 内）的范围，或清除（`undefined`）才会请求变更。起止相同是有效的零长度范围。 */
  onValueChange?: ((value: DateTimeRangeValue | undefined, event: React.SyntheticEvent) => void) | undefined;
  /**
   * 草稿无法提交时通知应用，由应用决定怎么说（FieldError 等）：库不替它写文案。
   * 只在焦点离开整个字段、弹层也已关闭后通知（并同时给两个输入标 `aria-invalid`、挂原生校验信息），原因同 DateRangePicker。
   */
  onInvalid?: ((draft: DateTimeRangeDraft, reason: DateTimeRangeInvalidReason) => void) | undefined;
  /** 可选的最早 / 最晚时刻（无时区文本），一处声明同时约束两个原生输入、日历的可选日与边界日的时间输入。 */
  min?: string | undefined; max?: string | undefined;
  name?: string | undefined; form?: string | undefined; disabled?: boolean; readOnly?: boolean;
  /** 起点输入（也是 Field 标签指向的输入）。 */
  inputProps?: NativeInputProps;
  /** 终点输入。 */
  endInputProps?: NativeInputProps;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">;
};

const validDateTime = (text: string) => { const parts = text.split("T"); return parts.length === 2 && parseLocalDate(parts[0]!) !== undefined && validLocalTime(parts[1]!); };
// 与 DateTimePicker 同一比较：日期，再按补齐到毫秒的时刻（local-time.ts）。值本身从不被补齐或截断。
const comparable = (text: string) => { const [date = "", time = ""] = text.split("T"); return `${date}T${comparableTime(time)}`; };
const sameRange = (a: DateTimeRangeDraft | undefined, b: DateTimeRangeDraft | undefined) => (a?.from ?? "") === (b?.from ?? "") && (a?.to ?? "") === (b?.to ?? "");
const datePart = (text: string | undefined) => text?.split("T")[0] ?? "";
const timePart = (text: string | undefined) => text?.split("T")[1] ?? "";
const join = (date: Date | undefined, time: string) => date && validLocalTime(time) ? `${formatLocalDate(date)}T${time}` : undefined;

/** Only explicit Apply (or a complete, ordered, typed pair) requests a range; the draft never owns form submission. */
export function DateTimeRangePicker(allProps: DateTimeRangePickerProps) {
  const { value: valueProp, defaultValue, onValueChange, onInvalid, min, max, name, form, disabled = false, readOnly = false, inputProps = {}, endInputProps = {}, calendarProps = {}, className, render, ref, ...props } = allProps;
  const { messages } = useUILocale();
  const controlled = "value" in allProps;
  const [uncontrolled, setUncontrolled] = React.useState<DateTimeRangeValue | undefined>(defaultValue);
  const value = controlled ? valueProp : uncontrolled;
  if (value && (!validDateTime(value.from) || !validDateTime(value.to))) throw new RangeError("DateTimeRangePicker requires complete local date/time text without a zone.");
  if (value && comparable(value.from) > comparable(value.to)) throw new RangeError("DateTimeRangePicker requires ordered complete endpoints.");
  if (min && !validDateTime(min) || max && !validDateTime(max)) throw new RangeError("DateTimeRangePicker min and max require complete local date/time text without a zone.");
  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState<string | undefined>(name);
  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const endId = React.useId();
  const fromTimeId = React.useId();
  const toTimeId = React.useId();
  type InputEvents = { change: Parameters<NonNullable<InputProps["onChange"]>>[0]; blur: Parameters<NonNullable<InputProps["onBlur"]>>[0] };

  const { ref: externalInputRef, render: inputRender, onChange: onStartChange, onBlur: onStartBlur, ...startRest } = inputProps;
  const { ref: externalEndRef, onChange: onEndChange, onBlur: onEndBlur, ...endRest } = endInputProps;
  const [startRef, setStartRef] = useInputRef(externalInputRef);
  const [, setEndRef] = useInputRef(externalEndRef);
  const facts = useInputFacts(startRef, { disabled, readOnly }, { value: false });
  const readOnlyNow = readOnly || facts.readOnly;
  const editable = !disabled && !facts.disabled && !readOnlyNow;

  // 草稿 = 两个输入共用的一份当前内容。确认值变化（外部改值、应用、清除、reset）后，草稿回到确认值。
  const valueKey = `${value?.from ?? ""}|${value?.to ?? ""}`;
  const [draftState, setDraftState] = React.useState<{ base: string; draft: DateTimeRangeDraft } | undefined>();
  const draft: DateTimeRangeDraft = draftState && draftState.base === valueKey ? draftState.draft : { from: value?.from, to: value?.to };
  const setDraft = (next: DateTimeRangeDraft) => setDraftState({ base: valueKey, draft: next });
  const fromTyping = useTypingText(draft.from ?? "");
  const toTyping = useTypingText(draft.to ?? "");
  const releaseTyping = () => { fromTyping.release(); toTyping.release(); };

  const change = (next: DateTimeRangeValue | undefined, event: React.SyntheticEvent) => {
    if (!controlled) setUncontrolled(next);
    onValueChange?.(next, event);
  };
  const latest = React.useRef({ controlled, defaultValue, releaseTyping });
  latest.current = { controlled, defaultValue, releaseTyping };
  React.useEffect(() => {
    const owner = startRef.current?.form;
    if (!owner) return;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      if (!latest.current.controlled) setUncontrolled(latest.current.defaultValue);
      setDraftState(undefined);
      latest.current.releaseTyping();
    });
    owner.addEventListener("reset", reset);
    return () => owner.removeEventListener("reset", reset);
  }, [startRef, form]);

  // 两个输入各自的 min / max 与顶层 min / max 三处取交集，两端共用同一对边界。
  const text = (bound: string | number | undefined) => bound === undefined ? undefined : String(bound);
  const native = intersectNativeBounds(intersectNativeBounds(startRest, text(endRest.min), text(endRest.max)), min, max);
  warnEmptyBounds("DateTimeRangePicker", native.min, native.max);
  const bounds = mergeCalendarBounds(calendarProps, native.min ? parseLocalDate(datePart(native.min)) : undefined, native.max ? parseLocalDate(datePart(native.max)) : undefined);
  const inBounds = (entry: string) => (!native.min || comparable(entry) >= comparable(native.min)) && (!native.max || comparable(entry) <= comparable(native.max));
  const problem = (target: DateTimeRangeDraft): DateTimeRangeInvalidReason | null => {
    if (!target.from && !target.to) return null;
    if (!target.from || !target.to) return "incomplete";
    if (comparable(target.from) > comparable(target.to)) return "order";
    if (!inBounds(target.from) || !inBounds(target.to)) return "bounds";
    return null;
  };
  // 键入得出完整、有序、在范围内的范围，就像 DateTimePicker 的键入一样立即请求变更，草稿不留：调用方拒绝时输入回到已确认值。
  // 否则（只填一端、反向、越界）草稿留在输入里，等待修正；两端都清空是清除。弹层的选择另走自己的草稿，等「应用」。
  const settle = (next: DateTimeRangeDraft, event: React.SyntheticEvent) => {
    if (!next.from && !next.to) { setDraftState(undefined); if (value) change(undefined, event); return; }
    if (next.from && next.to && problem(next) === null) {
      setDraftState(undefined);
      if (!sameRange(next, value)) change({ from: next.from, to: next.to }, event);
      return;
    }
    setDraft(next);
  };

  const [focusWithin, setFocusWithin] = React.useState(false);
  // 无效只在焦点离开整个字段、弹层也关闭之后判定与通知（同 DateRangePicker）：键入逐段进行，中间态不闪烁、不逐键播报。
  const invalid = focusWithin || open ? null : problem(draft);
  const pendingInvalid = React.useRef(onInvalid);
  pendingInvalid.current = onInvalid;
  const invalidKey = invalid ? `${invalid}:${valueKey}:${draft.from ?? ""}|${draft.to ?? ""}` : "";
  React.useEffect(() => { if (invalid) pendingInvalid.current?.(draft, invalid); }, [invalidKey]);
  // 原生校验信息：让表单提交在无效草稿上被拦下并读出原因。挂在起点输入上（Field 登记的那一个）。
  useCustomValidity(startRef, invalid === "order" ? messages.dateTimeRangeOrder : invalid === "bounds" ? messages.dateOutOfRange : invalid === "incomplete" ? messages.dateIncomplete : "");

  const field = fieldName ?? name;
  // 两个输入各要一个名称：Field 的标签 + 「开始 / 结束日期和时间」；没有标签时只有后者（接线同 DateRangePicker）。
  const [wiring, setWiring] = React.useState<{ id: string; label: string | undefined; described: string | undefined }>({ id: "", label: undefined, described: undefined });
  React.useLayoutEffect(() => {
    const input = startRef.current;
    if (!input) return;
    const next = { id: input.id, label: input.labels?.[0]?.id || undefined, described: input.getAttribute("aria-describedby") ?? undefined };
    setWiring(previous => previous.id === next.id && previous.label === next.label && previous.described === next.described ? previous : next);
  });
  const named = (self: string, label: string) => wiring.label && self ? { "aria-label": label, "aria-labelledby": `${wiring.label} ${self}` } : { "aria-label": label };

  const handleEntry = (end: "from" | "to") => (event: InputEvents["change"]) => {
    (end === "from" ? onStartChange : onEndChange)?.(event);
    if (event.defaultPrevented || event.baseUIHandlerPrevented || !editable) return;
    const typing = end === "from" ? fromTyping : toTyping;
    // 键入中间态与 5–6 位年份不是值（同 DateTimePicker）：不改草稿、不上报，只留在输入里。
    const entry = readNativeEntry(event.currentTarget);
    if (entry === "partial") return typing.hold("");
    if (entry === "empty") { typing.release(); return settle({ ...draft, [end]: undefined }, event); }
    if (!validDateTime(entry)) return typing.hold(entry);
    typing.release();
    settle({ ...draft, [end]: entry }, event);
  };
  const handleBlur = (end: "from" | "to") => (event: InputEvents["blur"]) => {
    (end === "from" ? onStartBlur : onEndBlur)?.(event);
    const typing = end === "from" ? fromTyping : toTyping;
    // 逐段删完时值一直是空串，浏览器不再发 input 事件：离开输入时所有分段都空，这才是清除这一端。
    if (editable && typing.active && draft[end] && readNativeEntry(event.currentTarget) === "empty") settle({ ...draft, [end]: undefined }, event);
    typing.release();
  };

  // 弹层有自己的一份草稿：日历选日期区间，两个原生 time 输入选起止时刻。打开时取自输入草稿；取消、Escape、点外面都丢弃，应用与清除才改确认值。
  const [dates, setDates] = React.useState<CalendarDateRange | undefined>();
  const [fromTime, setFromTime] = React.useState("");
  const [toTime, setToTime] = React.useState("");
  const [visibleMonth, setVisibleMonth] = React.useState<Date>(() => calendarProps.defaultMonth ?? new Date());
  const onOpenChange = (next: boolean) => {
    if (next) {
      const from = parseLocalDate(datePart(draft.from));
      const to = parseLocalDate(datePart(draft.to));
      setDates(from || to ? { from, to } as CalendarDateRange : undefined);
      setFromTime(timePart(draft.from));
      setToTime(timePart(draft.to));
      setVisibleMonth(calendarProps.defaultMonth ?? from ?? new Date());
    }
    setOpen(next);
  };
  const popDraft: DateTimeRangeDraft = { from: join(dates?.from, fromTime), to: join(dates?.to ?? dates?.from, toTime) };
  const popProblem = problem(popDraft);
  // 起止在日历上选完、两个时刻也填好之后，才有「顺序」与「范围」可言；还缺的只是还没填，不报错。
  const popMessage = popDraft.from && popDraft.to ? (popProblem === "order" ? messages.dateTimeRangeOrder : popProblem === "bounds" ? messages.dateOutOfRange : "") : "";
  // 边界那一天的时间也受约束：某端的日期落在 min / max 当天时，该端的时间输入带上对应的时刻边界。
  const timeBound = (date: Date | undefined, bound: string | undefined) => date && bound && formatLocalDate(date) === datePart(bound) ? timePart(bound) : undefined;
  const fromDay = dates?.from, toDay = dates?.to ?? dates?.from;

  const nameless = (render: InputProps["render"]) => (elementProps: React.ComponentPropsWithRef<"input">, state: InputPrimitive.State) => <DraftSurface elementProps={elementProps} state={state} render={render} onName={setFieldName} />;
  const fromMin = timeBound(fromDay, native.min), fromMax = timeBound(fromDay, native.max), toMin = timeBound(toDay, native.min), toMax = timeBound(toDay, native.max);
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-time-range-picker" }, props, {
    className: cn("flex min-w-0", className),
    children: <Popover open={editable && open} onOpenChange={onOpenChange}>
      {/* 起止各一个原生日期时间输入，共用同一份草稿（基础层 §6「编辑边界内的附属动作」；键入是等价路径）。
          平台日历图标隐藏，只保留一个打开弹层的入口。真正的 readOnly 由边界 data-readonly 表达。 */}
      <InputGroup ref={boundaryRef} data-slot="date-time-range-picker-control" data-readonly={readOnlyNow ? "" : undefined} className="w-fit max-w-full flex-nowrap"
        onFocus={() => setFocusWithin(true)}
        onBlur={event => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          setFocusWithin(false);
        }}>
        <Input {...startRest} placeholder={startRest.placeholder ?? messages.startTime} min={native.min} max={native.max} type="datetime-local" form={form} disabled={disabled} readOnly={readOnly} ref={setStartRef} unstyled value={fromTyping.shown}
          {...named(wiring.id, messages.startDateTime)} {...(startRest["aria-label"] ? { "aria-label": startRest["aria-label"] } : {})} {...(startRest["aria-labelledby"] ? { "aria-labelledby": startRest["aria-labelledby"] } : {})} aria-invalid={invalid ? true : startRest["aria-invalid"]}
          controlClassName={cn("min-w-0 flex-1", startRest.controlClassName)} className={withHiddenIndicator(startRest.className)}
          onChange={handleEntry("from")} onBlur={handleBlur("from")}
          render={nameless(inputRender)} />
        <InputGroupAddon aria-hidden="true" className="px-0">—</InputGroupAddon>
        <Input nativeInput {...endRest} placeholder={endRest.placeholder ?? messages.endTime} min={native.min} max={native.max} type="datetime-local" form={form} disabled={disabled} readOnly={readOnly} ref={setEndRef} id={endId} unstyled value={toTyping.shown}
          {...named(endId, messages.endDateTime)} aria-describedby={endRest["aria-describedby"] ?? wiring.described} {...(endRest["aria-label"] ? { "aria-label": endRest["aria-label"] } : {})} {...(endRest["aria-labelledby"] ? { "aria-labelledby": endRest["aria-labelledby"] } : {})} aria-invalid={invalid ? true : endRest["aria-invalid"]}
          controlClassName={cn("min-w-0 flex-1", endRest.controlClassName)} className={withHiddenIndicator(endRest.className)}
          onChange={handleEntry("to")} onBlur={handleBlur("to")} />
        {readOnlyNow && !disabled ? <InputGroupReadOnlyNote /> : null}
        {/* 与 DateRangePicker 同一套清除：确认值非空且可编辑时出现；清除也放弃未采纳的键入与草稿，焦点回到起点输入。 */}
        {value && editable && <Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={messages.clearDateTimeRange} onClick={event => { releaseTyping(); change(undefined, event); setDraftState(undefined); startRef.current?.focus(); }}><IconX aria-hidden="true" /></Button>}
        <PopoverTrigger disabled={!editable} render={<Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={messages.selectDateTimeRange} />}><IconCalendar aria-hidden="true" /></PopoverTrigger>
      </InputGroup>
      <PopoverPopup align="start" anchor={boundaryRef}><div className="grid gap-(--qy-field-group-gap)">
        <Calendar {...calendarProps} {...bounds} month={calendarProps.month ?? visibleMonth} onMonthChange={month => { setVisibleMonth(month); calendarProps.onMonthChange?.(month); }}
          mode="range" selected={dates} disabled={editable ? bounds.disabled : true} autoFocus onSelect={next => setDates(next)} />
        <div className="grid grid-cols-2 gap-(--qy-field-group-gap)">
          <div className="grid gap-(--qy-field-gap)"><Label htmlFor={fromTimeId}>{messages.startTime}</Label><Input nativeInput id={fromTimeId} type="time" value={fromTime} disabled={!editable} step={startRest.step} {...(fromMin ? { min: fromMin } : {})} {...(fromMax ? { max: fromMax } : {})} onChange={event => setFromTime(event.currentTarget.value)} /></div>
          <div className="grid gap-(--qy-field-gap)"><Label htmlFor={toTimeId}>{messages.endTime}</Label><Input nativeInput id={toTimeId} type="time" value={toTime} disabled={!editable} step={endRest.step ?? startRest.step} {...(toMin ? { min: toMin } : {})} {...(toMax ? { max: toMax } : {})} onChange={event => setToTime(event.currentTarget.value)} /></div>
        </div>
        {popMessage && <p role="alert" data-slot="date-time-range-picker-message" className="text-caption text-destructive-foreground">{popMessage}</p>}
        <div className="flex flex-wrap gap-(--qy-action-gap)">
          <Button disabled={!editable || !popDraft.from || !popDraft.to || popProblem !== null} onClick={event => { if (popDraft.from && popDraft.to && popProblem === null) { releaseTyping(); change({ from: popDraft.from, to: popDraft.to }, event); setDraftState(undefined); if (!event.defaultPrevented) setOpen(false); } }}>{messages.apply}</Button>
          <Button variant="quiet" onClick={() => setOpen(false)}>{messages.cancel}</Button>
          <Button variant="quiet" disabled={!editable || !value} onClick={event => { releaseTyping(); change(undefined, event); setDraftState(undefined); if (!event.defaultPrevented) setOpen(false); }}>{messages.clear}</Button>
        </div>
      </div></PopoverPopup>
      {value && field && <><input type="hidden" name={`${field}.from`} value={value.from} form={form} disabled={disabled || facts.disabled} /><input type="hidden" name={`${field}.to`} value={value.to} form={form} disabled={disabled || facts.disabled} /></>}
    </Popover>,
  }) });
}
