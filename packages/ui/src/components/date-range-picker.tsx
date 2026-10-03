"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, type CalendarProps, type CalendarDateRange } from "./calendar";
import { Input, type InputProps, type InputSize } from "./input";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

export type DateRangeValue = { from: Date; to: Date };
export type DateRangePickerProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue" | "onChange"> & {
  value?: DateRangeValue | undefined;
  onValueChange: (value: DateRangeValue | undefined, event: React.SyntheticEvent) => void;
  name?: string | undefined; form?: string | undefined; size?: InputSize; disabled?: boolean; readOnly?: boolean;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "name" | "type" | "size" | "form" | "disabled" | "readOnly" | "onValueChange">;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required"> & { min?: number; max?: number; excludeDisabled?: boolean };
};
function DisplaySurface({ elementProps, state, render, onName }: { elementProps: React.ComponentPropsWithRef<"input">; state: InputPrimitive.State; render: InputProps["render"]; onName: (name: string | undefined) => void }) {
  React.useLayoutEffect(() => onName(elementProps.name), [elementProps.name, onName]);
  return useRender({ defaultTagName: "input", render, ref: elementProps.ref, state: { ...state }, props: { ...elementProps, name: undefined } });
}

/** Only explicit Apply requests a complete range; the popup draft never owns form submission. */
export function DateRangePicker({ value, onValueChange, name, form, size = "md", disabled = false, readOnly = false, inputProps = {}, calendarProps = {}, className, render, ref, ...props }: DateRangePickerProps) {
  const { messages } = useUILocale();
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState<CalendarDateRange | undefined>(value);
  const [fieldName, setFieldName] = React.useState<string | undefined>(name);
  const [fieldDisabled, setFieldDisabled] = React.useState(disabled);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
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
  if (value && formatLocalDate(value.from) > formatLocalDate(value.to)) throw new RangeError("DateRangePicker requires ordered complete endpoints.");
  const { ref: externalInputRef, render: inputRender, ...inputRest } = inputProps;
  const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof externalInputRef === "function") return externalInputRef(node);
    if (externalInputRef) externalInputRef.current = node;
  }, [externalInputRef]);
  const field = fieldName ?? name;
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-range-picker" }, props, {
    className: cn("flex min-w-0 items-start gap-(--qy-action-gap)", className),
    children: <Popover open={editable && open} onOpenChange={next => { if (next) setDraft(value); setOpen(next); }}>
      <Input {...inputRest} ref={setInputRef} name={name} form={form} size={size} disabled={disabled} readOnly value={value ? `${formatLocalDate(value.from)} — ${formatLocalDate(value.to)}` : ""} controlClassName={cn("min-w-0 flex-1", inputRest.controlClassName)}
        render={(elementProps, state) => <DisplaySurface elementProps={elementProps} state={state} render={inputRender} onName={setFieldName} />} />
      <PopoverTrigger disabled={!editable} render={<Button size={size} variant="bordered" shape="icon" aria-label={messages.selectDateRange} />}><CalendarIcon aria-hidden="true" /></PopoverTrigger>
      <PopoverPopup align="start"><div className="grid gap-(--qy-field-group-gap)"><Calendar {...(draft?.from ? { defaultMonth: draft.from } : {})} {...calendarProps} size={size} mode="range" selected={draft} disabled={editable ? calendarProps.disabled : true} autoFocus onSelect={setDraft} />
        <div className="flex flex-wrap gap-(--qy-action-gap)">
          <Button size={size} disabled={!editable || !draft?.from || !draft.to} onClick={event => { if (draft?.from && draft.to) { onValueChange({ from: draft.from, to: draft.to }, event); if (!event.defaultPrevented) setOpen(false); } }}>{messages.apply}</Button>
          <Button size={size} variant="quiet" onClick={() => { setDraft(value); setOpen(false); }}>{messages.cancel}</Button>
          <Button size={size} variant="quiet" disabled={!editable || !value} onClick={event => { onValueChange(undefined, event); if (!event.defaultPrevented) setOpen(false); }}>{messages.clear}</Button>
        </div></div></PopoverPopup>
      {value && field && <><input type="hidden" name={`${field}.from`} value={formatLocalDate(value.from)} form={form} disabled={disabled || fieldDisabled} /><input type="hidden" name={`${field}.to`} value={formatLocalDate(value.to)} form={form} disabled={disabled || fieldDisabled} /></>}
    </Popover>,
  }) });
}
