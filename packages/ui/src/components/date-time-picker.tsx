"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { Calendar, formatLocalDate, parseLocalDate, type CalendarProps } from "./calendar";
import { Input, type InputProps, type InputSize } from "./input";
import { Label } from "./label";
import { Popover, PopoverPopup, PopoverTrigger } from "./popover";

export type DateTimePickerProps = Omit<useRender.ComponentProps<"div">, "children" | "defaultValue" | "onChange"> & {
  /** Local wall-clock text, YYYY-MM-DDTHH:mm[:ss]; no zone or instant is inferred. */
  value?: string | undefined;
  onValueChange: (value: string | undefined, event: React.SyntheticEvent) => void;
  name?: string | undefined; form?: string | undefined; size?: InputSize; disabled?: boolean; readOnly?: boolean;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "type" | "size" | "name" | "form" | "disabled" | "readOnly" | "onValueChange">;
  calendarProps?: Omit<CalendarProps, "mode" | "selected" | "onSelect" | "required">;
};
const validTime = (text: string) => /^(?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?$/.test(text);

export function DateTimePicker({ value, onValueChange, name, form, size = "md", disabled = false, readOnly = false, inputProps = {}, calendarProps = {}, className, render, ref, ...props }: DateTimePickerProps) {
  if (value && (!parseLocalDate(value.split("T")[0] ?? "") || !validTime(value.split("T")[1] ?? "") || value.split("T").length !== 2)) throw new RangeError("DateTimePicker requires complete local date/time text without a zone.");
  const { messages } = useUILocale();
  const timeId = React.useId();
  const [open, setOpen] = React.useState(false);
  const [dateDraft, setDateDraft] = React.useState<Date | undefined>(parseLocalDate(value?.split("T")[0] ?? ""));
  const [timeDraft, setTimeDraft] = React.useState(value?.split("T")[1] ?? "");
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
  const { ref: externalInputRef, onChange, ...inputRest } = inputProps;
  const setInputRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof externalInputRef === "function") return externalInputRef(node);
    if (externalInputRef) externalInputRef.current = node;
  }, [externalInputRef]);
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "date-time-picker" }, props, {
    className: cn("flex min-w-0 items-start gap-(--qy-action-gap)", className),
    children: <Popover open={editable && open} onOpenChange={next => { if (next) { setDateDraft(parseLocalDate(value?.split("T")[0] ?? "")); setTimeDraft(value?.split("T")[1] ?? ""); } setOpen(next); }}>
      <Input {...inputRest} ref={setInputRef} type="datetime-local" name={name} form={form} size={size} disabled={disabled} readOnly={readOnly} value={value ?? ""} controlClassName={cn("min-w-0 flex-1", inputRest.controlClassName)} onChange={event => { onChange?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented && editable) onValueChange(event.currentTarget.value || undefined, event); }} />
      <PopoverTrigger disabled={!editable} render={<Button size={size} variant="bordered" shape="icon" aria-label={messages.selectDateTime("")} />}><CalendarIcon aria-hidden="true" /></PopoverTrigger>
      <PopoverPopup align="start"><div className="grid gap-(--qy-field-group-gap)"><Calendar {...(dateDraft ? { defaultMonth: dateDraft } : {})} {...calendarProps} mode="single" size={size} selected={dateDraft} disabled={editable ? calendarProps.disabled : true} autoFocus onSelect={setDateDraft} />
        <div className="grid gap-(--qy-field-gap)"><Label htmlFor={timeId}>{messages.time}</Label><Input nativeInput id={timeId} type="time" size={size} value={timeDraft} disabled={!editable} step={inputProps.step} onChange={event => setTimeDraft(event.currentTarget.value)} /></div>
        <div className="flex flex-wrap gap-(--qy-action-gap)"><Button size={size} disabled={!editable || !dateDraft || !validTime(timeDraft)} onClick={event => { if (dateDraft && validTime(timeDraft)) { onValueChange(`${formatLocalDate(dateDraft)}T${timeDraft}`, event); if (!event.defaultPrevented) setOpen(false); } }}>{messages.apply}</Button><Button size={size} variant="quiet" onClick={() => setOpen(false)}>{messages.cancel}</Button><Button size={size} variant="quiet" disabled={!editable || !value} onClick={event => { onValueChange(undefined, event); if (!event.defaultPrevented) setOpen(false); }}>{messages.clear}</Button></div>
      </div></PopoverPopup>
    </Popover>,
  }) });
}
