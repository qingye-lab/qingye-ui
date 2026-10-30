"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { InputGroup, InputGroupAddon } from "./input-group";
import { IconCalendar, IconX } from "@tabler/icons-react";
import { dateMatchModifiers, rangeContainsModifiers } from "@daypicker/react";
import * as React from "react";
import { intersectNativeBounds, mergeCalendarBounds, readNativeEntry, useInputFacts, useInputRef, useTypingText, warnEmptyBounds } from "../input-facts";
import { useUILocale } from "../locale";
import { inputAdjunctClassName, withHiddenIndicator } from "../input-adjunct";
import { InputGroupReadOnlyNote } from "../input-readonly-note";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, parseLocalDate, type CalendarProps, type CalendarDateRange } from "./calendar";
import { Input, type InputProps } from "./input";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

export type DateRangeValue = { from: Date; to: Date };
/** 草稿的端点：键入或日历选择中，任何一端都可能还空着。 */
export type DateRangeDraft = { from?: Date | undefined; to?: Date | undefined };
/** 草稿不能提交的原因：只填了一端（`incomplete`）、起点晚于终点（`order`）、超出 `min` / `max`（`bounds`）。 */
export type DateRangeInvalidReason = "incomplete" | "order" | "bounds" | "length" | "disabled";
/** 一个常用范围。函数形式在每次打开弹层时求值，所以「近 7 日」不会因页面跨过午夜而陈旧。 */
export type DateRangePreset = { label: string; value: DateRangeValue | (() => DateRangeValue) };
type NativeInputProps = Omit<InputProps, "value" | "defaultValue" | "name" | "type" | "size" | "form" | "disabled" | "readOnly" | "onValueChange">;
export type DateRangePickerProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue" | "onChange"> & {
  /** 受控的完整范围；`undefined` 表示空。**传了 `value` 这个属性**（含 `value={undefined}`）就是受控，不传才是非受控。 */
  value?: DateRangeValue | undefined;
  /** 非受控的初值，原生表单 reset 会回到它。 */
  defaultValue?: DateRangeValue | undefined;
  /** 只有完整且有序（且在 min / max 内）的范围，或清除（`undefined`）才会请求变更。 */
  onValueChange?: ((value: DateRangeValue | undefined, event: React.SyntheticEvent) => void) | undefined;
  /**
   * 键入或选择得出的草稿无法提交时通知应用，由应用决定怎么说（FieldError 等）：库不替它写文案。
   * 只在焦点离开整个字段、弹层也已关闭后通知（并同时给两个输入标 `aria-invalid`）：键入是逐段的，
   * 填第二个日期之前只有一端、改终点时暂时早于起点，都是正常的中间状态。草稿变成可提交时，调用方会收到 `onValueChange`。
   */
  onInvalid?: ((draft: DateRangeDraft, reason: DateRangeInvalidReason) => void) | undefined;
  /** 可选的最早 / 最晚日期，一处声明同时约束两个原生输入与日历（同 DatePicker）。 */
  min?: Date | undefined; max?: Date | undefined;
  /** 常用范围，显示在弹层里日历旁；点击只写入草稿，仍须「应用」。 */
  presets?: readonly DateRangePreset[] | undefined;
  name?: string | undefined; form?: string | undefined; disabled?: boolean; readOnly?: boolean;
  /** 起点日期输入（也是 Field 标签指向的输入）。 */
  inputProps?: NativeInputProps;
  /** 终点日期输入。 */
  endInputProps?: NativeInputProps;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required"> & { min?: number; max?: number; excludeDisabled?: boolean };
};

// Field 把 name 交给它登记的输入；这里的输入只放草稿，不参与提交——提交的是确认值（name.from / name.to）。
function DraftSurface({ elementProps, state, render, onName }: { elementProps: React.ComponentPropsWithRef<"input">; state: InputPrimitive.State; render: InputProps["render"]; onName: (name: string | undefined) => void }) {
  React.useLayoutEffect(() => onName(elementProps.name), [elementProps.name, onName]);
  return useRender({ defaultTagName: "input", render, ref: elementProps.ref, state: { ...state }, props: { ...elementProps, name: undefined } });
}

const dayText = (date: Date | undefined) => date ? formatLocalDate(date) : "";
const sameDay = (a: Date | undefined, b: Date | undefined) => dayText(a) === dayText(b);
const sameRange = (a: DateRangeDraft | undefined, b: DateRangeDraft | undefined) => sameDay(a?.from, b?.from) && sameDay(a?.to, b?.to);
const assertOrdered = (range: DateRangeValue, what: string) => { if (dayText(range.from) > dayText(range.to)) throw new RangeError(`${what} requires ordered complete endpoints.`); };

/** Only explicit Apply (or a complete, ordered, typed pair) requests a range; the draft never owns form submission. */
export function DateRangePicker(allProps: DateRangePickerProps) {
  const { value: valueProp, defaultValue, onValueChange, onInvalid, min, max, presets, name, form, disabled = false, readOnly = false, inputProps = {}, endInputProps = {}, calendarProps = {}, className, render, ref, ...props } = allProps;
  const { messages } = useUILocale();
  const controlled = "value" in allProps;
  const [uncontrolled, setUncontrolled] = React.useState<DateRangeValue | undefined>(defaultValue);
  const value = controlled ? valueProp : uncontrolled;
  if (value) assertOrdered(value, "DateRangePicker");
  const [open, setOpen] = React.useState(false);
  const [fieldName, setFieldName] = React.useState<string | undefined>(name);
  const boundaryRef = React.useRef<HTMLDivElement | null>(null);
  const endId = React.useId();
  type InputEvents = { change: Parameters<NonNullable<InputProps["onChange"]>>[0]; blur: Parameters<NonNullable<InputProps["onBlur"]>>[0] };

  const { ref: externalInputRef, render: inputRender, onChange: onStartChange, onBlur: onStartBlur, ...startRest } = inputProps;
  const { ref: externalEndRef, onChange: onEndChange, onBlur: onEndBlur, ...endRest } = endInputProps;
  const [startRef, setStartRef] = useInputRef(externalInputRef);
  const [, setEndRef] = useInputRef(externalEndRef);
  const facts = useInputFacts(startRef, { disabled, readOnly }, { value: false });
  const readOnlyNow = readOnly || facts.readOnly;
  const editable = !disabled && !facts.disabled && !readOnlyNow;

  // 草稿 = 两个输入与弹层日历共用的一份当前内容。确认值变化（外部改值、应用、清除、reset）后，草稿回到确认值。
  const valueKey = `${dayText(value?.from)}|${dayText(value?.to)}`;
  const [draftState, setDraftState] = React.useState<{ base: string; draft: DateRangeDraft } | undefined>();
  const draft: DateRangeDraft = draftState && draftState.base === valueKey ? draftState.draft : { from: value?.from, to: value?.to };
  const setDraft = (next: DateRangeDraft) => setDraftState({ base: valueKey, draft: next });
  const fromTyping = useTypingText(dayText(draft.from));
  const toTyping = useTypingText(dayText(draft.to));
  const releaseTyping = () => { fromTyping.release(); toTyping.release(); };

  const change = (next: DateRangeValue | undefined, event: React.SyntheticEvent) => {
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
  const native = intersectNativeBounds(intersectNativeBounds(startRest, text(endRest.min), text(endRest.max)), min && formatLocalDate(min), max && formatLocalDate(max));
  warnEmptyBounds("DateRangePicker", native.min, native.max);
  const bounds = mergeCalendarBounds(calendarProps, min, max);
  const inBounds = (date: Date) => (!native.min || dayText(date) >= native.min) && (!native.max || dayText(date) <= native.max);
  const problem = (target: DateRangeDraft): DateRangeInvalidReason | null => {
    if (!target.from && !target.to) return null;
    if (!target.from || !target.to) return "incomplete";
    if (dayText(target.from) > dayText(target.to)) return "order";
    if (!inBounds(target.from) || !inBounds(target.to)) return "bounds";
    // 日历点选时 DayPicker 执行的区间规则，键入同样执行：天数差（同 `addToRange`）与禁用日（同 `excludeDisabled`）。
    const days = Math.round((Date.UTC(target.to.getFullYear(), target.to.getMonth(), target.to.getDate()) - Date.UTC(target.from.getFullYear(), target.from.getMonth(), target.from.getDate())) / 86_400_000);
    if ((calendarProps.max && calendarProps.max > 0 && days > calendarProps.max) || (calendarProps.min && calendarProps.min > 1 && days < calendarProps.min)) return "length";
    const off = calendarProps.disabled;
    if (off !== undefined && (dateMatchModifiers(target.from, off) || dateMatchModifiers(target.to, off) || (calendarProps.excludeDisabled && rangeContainsModifiers({ from: target.from, to: target.to }, off)))) return "disabled";
    return null;
  };
  // 键入得出完整、有序、在范围内的范围，就像 DatePicker 的键入一样立即请求变更，草稿不留：调用方拒绝时输入回到已确认值。
  // 否则（只填一端、反向、越界）草稿留在输入里，等待修正；两端都清空是清除。日历与预设的选择另走 `setDraft`，等「应用」。
  const settle = (next: DateRangeDraft, event: React.SyntheticEvent) => {
    if (!next.from && !next.to) { setDraftState(undefined); if (value) change(undefined, event); return; }
    if (next.from && next.to && problem(next) === null) {
      setDraftState(undefined);
      if (!sameRange(next, value)) change({ from: next.from, to: next.to }, event);
      return;
    }
    setDraft(next);
  };

  const [focusWithin, setFocusWithin] = React.useState(false);
  // 键入是逐段进行的（年份 0002、0020、0202、2026 都是有效中间态；改终点的「2」会暂时早于起点）：
  // 无效只在焦点离开整个字段、弹层也关闭之后判定与通知，键入过程中不闪烁、不逐键播报。
  const invalid = focusWithin || open ? null : problem(draft);
  const pendingInvalid = React.useRef(onInvalid);
  pendingInvalid.current = onInvalid;
  const invalidKey = invalid ? `${invalid}:${valueKey}:${dayText(draft.from)}|${dayText(draft.to)}` : "";
  React.useEffect(() => { if (invalid) pendingInvalid.current?.(draft, invalid); }, [invalidKey]);

  const field = fieldName ?? name;
  // 两个输入各要一个名称：Field 的标签 + 「开始日期 / 结束日期」；没有标签时只有后者。
  // 起点输入是 Field 登记的那一个（标签的 for、说明与无效都挂在它上面），终点输入沿用同一份标签与说明。
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
    // 键入中间态不是值（同 DatePicker）：不改草稿、不上报，只留在输入里。
    const entry = readNativeEntry(event.currentTarget);
    if (entry === "partial") return typing.hold("");
    if (entry === "empty") { typing.release(); return settle({ ...draft, [end]: undefined }, event); }
    const date = parseLocalDate(entry);
    if (!date) return typing.hold(entry);
    typing.release();
    settle({ ...draft, [end]: date }, event);
  };
  const handleBlur = (end: "from" | "to") => (event: InputEvents["blur"]) => {
    (end === "from" ? onStartBlur : onEndBlur)?.(event);
    const typing = end === "from" ? fromTyping : toTyping;
    // 逐段删完时值一直是空串，浏览器不再发 input 事件：离开输入时所有分段都空，这才是清除这一端。
    if (editable && typing.active && draft[end] && readNativeEntry(event.currentTarget) === "empty") settle({ ...draft, [end]: undefined }, event);
    typing.release();
  };

  // 弹层打开时拍下草稿快照；取消、Escape、点外面都回到快照，应用与清除才改确认值。
  const snapshot = React.useRef<DateRangeDraft>(draft);
  const [visibleMonth, setVisibleMonth] = React.useState<Date>(() => calendarProps.defaultMonth ?? new Date());
  const [presetValues, setPresetValues] = React.useState<DateRangeValue[] | undefined>();
  const resolvePresets = () => (presets ?? []).map(preset => { const range = typeof preset.value === "function" ? preset.value() : preset.value; assertOrdered(range, "DateRangePicker preset"); return range; });
  const resolved = presets && (presetValues && presetValues.length === presets.length ? presetValues : open ? resolvePresets() : []);
  const onOpenChange = (next: boolean) => {
    if (next) {
      snapshot.current = draft;
      setVisibleMonth(calendarProps.defaultMonth ?? draft.from ?? new Date());
      if (presets) setPresetValues(resolvePresets());
    } else setDraft(snapshot.current);
    setOpen(next);
  };
  const closeWith = (next: boolean) => setOpen(next);
  const calendarRange = draft.from || draft.to ? { from: draft.from, to: draft.to } as CalendarDateRange : undefined;
  const complete = draft.from && draft.to && problem(draft) === null;

  const nameless = (render: InputProps["render"]) => (elementProps: React.ComponentPropsWithRef<"input">, state: InputPrimitive.State) => <DraftSurface elementProps={elementProps} state={state} render={render} onName={setFieldName} />;
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-range-picker" }, props, {
    className: cn("flex min-w-0", className),
    children: <Popover open={editable && open} onOpenChange={onOpenChange}>
      {/* 起止各一个原生日期输入，共用同一份草稿（基础层 §6「编辑边界内的附属动作」；键入是等价路径）。
          平台日历图标隐藏，只保留一个打开日历的入口。真正的 readOnly 由边界 data-readonly 表达。 */}
      <InputGroup ref={boundaryRef} data-slot="date-range-picker-control" data-readonly={readOnlyNow ? "" : undefined} className="w-fit max-w-full flex-nowrap"
        onFocus={() => setFocusWithin(true)}
        onBlur={event => {
          if (event.currentTarget.contains(event.relatedTarget as Node | null)) return;
          setFocusWithin(false);
        }}>
        <Input {...startRest} min={native.min} max={native.max} type="date" form={form} disabled={disabled} readOnly={readOnly} ref={setStartRef} unstyled value={fromTyping.shown}
          {...named(wiring.id, messages.startDate)} {...(startRest["aria-label"] ? { "aria-label": startRest["aria-label"] } : {})} {...(startRest["aria-labelledby"] ? { "aria-labelledby": startRest["aria-labelledby"] } : {})} aria-invalid={invalid ? true : startRest["aria-invalid"]}
          controlClassName={cn("min-w-0 flex-1", startRest.controlClassName)} className={withHiddenIndicator(startRest.className)}
          onChange={handleEntry("from")} onBlur={handleBlur("from")}
          render={nameless(inputRender)} />
        <InputGroupAddon aria-hidden="true" className="px-0">—</InputGroupAddon>
        <Input nativeInput {...endRest} min={native.min} max={native.max} type="date" form={form} disabled={disabled} readOnly={readOnly} ref={setEndRef} id={endId} unstyled value={toTyping.shown}
          {...named(endId, messages.endDate)} aria-describedby={endRest["aria-describedby"] ?? wiring.described} {...(endRest["aria-label"] ? { "aria-label": endRest["aria-label"] } : {})} {...(endRest["aria-labelledby"] ? { "aria-labelledby": endRest["aria-labelledby"] } : {})} aria-invalid={invalid ? true : endRest["aria-invalid"]}
          controlClassName={cn("min-w-0 flex-1", endRest.controlClassName)} className={withHiddenIndicator(endRest.className)}
          onChange={handleEntry("to")} onBlur={handleBlur("to")} />
        {readOnlyNow && !disabled ? <InputGroupReadOnlyNote /> : null}
        {/* 与 DatePicker 同一套清除：确认值非空且可编辑时出现；清除也放弃未采纳的键入与草稿，焦点回到起点输入。 */}
        {value && editable && <Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={messages.clearDateRange} onClick={event => { releaseTyping(); change(undefined, event); setDraftState(undefined); startRef.current?.focus(); }}><IconX aria-hidden="true" /></Button>}
        <PopoverTrigger disabled={!editable} render={<Button variant="quiet" shape="icon" className={inputAdjunctClassName} aria-label={messages.selectDateRange} />}><IconCalendar aria-hidden="true" /></PopoverTrigger>
      </InputGroup>
      <PopoverPopup align="start" anchor={boundaryRef}><div className="flex flex-wrap items-start gap-(--qy-field-group-gap)">
        {resolved && resolved.length > 0 && <div role="group" aria-label={messages.dateRangePresets} data-slot="date-range-presets" className="flex min-w-0 flex-col gap-(--qy-space-1)">
          {presets!.map((preset, index) => {
            const range = resolved[index]!;
            const current = sameRange(draft, range);
            return <Button key={index} variant="quiet" aria-pressed={current} disabled={!editable || !inBounds(range.from) || !inBounds(range.to)}
              className={cn("justify-start", current && "bg-surface-selected text-foreground not-aria-disabled:hover:bg-surface-selected not-aria-disabled:active:bg-surface-selected")}
              onClick={() => { releaseTyping(); setDraft({ from: range.from, to: range.to }); setVisibleMonth(range.from); }}>{preset.label}</Button>;
          })}
        </div>}
        <div className="grid gap-(--qy-field-group-gap)"><Calendar {...calendarProps} {...bounds} month={calendarProps.month ?? visibleMonth} onMonthChange={month => { setVisibleMonth(month); calendarProps.onMonthChange?.(month); }}
          mode="range" selected={calendarRange} disabled={editable ? bounds.disabled : true} autoFocus onSelect={next => { releaseTyping(); setDraft({ from: next?.from, to: next?.to }); }} />
          <div className="flex flex-wrap gap-(--qy-action-gap)">
            <Button disabled={!editable || !complete} onClick={event => { if (draft.from && draft.to && complete) { change({ from: draft.from, to: draft.to }, event); setDraftState(undefined); if (!event.defaultPrevented) closeWith(false); } }}>{messages.apply}</Button>
            <Button variant="quiet" onClick={() => { setDraft(snapshot.current); closeWith(false); }}>{messages.cancel}</Button>
            <Button variant="quiet" disabled={!editable || !value} onClick={event => { change(undefined, event); setDraftState(undefined); if (!event.defaultPrevented) closeWith(false); }}>{messages.clear}</Button>
          </div></div>
      </div></PopoverPopup>
      {value && field && <><input type="hidden" name={`${field}.from`} value={formatLocalDate(value.from)} form={form} disabled={disabled || facts.disabled} /><input type="hidden" name={`${field}.to`} value={formatLocalDate(value.to)} form={form} disabled={disabled || facts.disabled} /></>}
    </Popover>,
  }) });
}
