"use client";

import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Input, type InputProps, type InputSize } from "./input";

export type OtpFieldProps = Omit<InputProps, "value" | "defaultValue" | "onValueChange" | "type" | "size" | "maxLength" | "clearable" | "visibilityToggle"> & {
  /** 文本容量，以 Unicode code point 计；由任务给出，不预设验证码长度。 */
  length: number;
  size?: InputSize;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
};

const profiles: Record<InputSize, string> = {
  xs: "rounded-xs text-control-xs-mobile sm:text-control-xs",
  sm: "rounded-sm text-control-sm-mobile sm:text-control-sm",
  md: "rounded-control text-control-md-mobile sm:text-control-md",
  lg: "rounded-control text-control-lg-mobile sm:text-control-lg",
  xl: "rounded-control text-control-xl-mobile sm:text-control-xl",
};

/** 一个可选择和复制的真实文本输入；分段只是呈现，长度完成不代表验证。 */
export function OtpField({
  length, size = "md", value: valueProp, defaultValue = "", onValueChange,
  className, controlClassName, ref, onChange, onSelect, onFocus, onBlur, onPaste,
  "aria-describedby": describedBy, ...props
}: OtpFieldProps) {
  if (!Number.isInteger(length) || length < 1) throw new Error("OtpField length must be a positive integer.");
  const { messages } = useUILocale();
  const feedbackId = React.useId();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const [selection, setSelection] = React.useState({ start: 0, end: 0 });
  const [feedback, setFeedback] = React.useState(false);
  const value = valueProp ?? uncontrolled;
  const characters = Array.from(value);
  const countBefore = (offset: number) => Array.from(value.slice(0, offset)).length;
  const active = Math.min(countBefore(selection.start), Math.max(length, characters.length) - 1);
  const syncSelection = (input: HTMLInputElement) => setSelection({ start: input.selectionStart ?? 0, end: input.selectionEnd ?? 0 });
  const setRef = React.useCallback((node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === "function") {
      const cleanup = ref(node);
      if (typeof cleanup === "function") return () => { inputRef.current = null; cleanup(); };
    } else if (ref) ref.current = node;
  }, [ref]);
  React.useEffect(() => {
    const input = inputRef.current;
    const form = input?.form;
    const reset = (event: Event) => queueMicrotask(() => {
      if (event.defaultPrevented) return;
      if (valueProp === undefined) setUncontrolled(defaultValue);
      setFeedback(false);
      setSelection({ start: 0, end: 0 });
    });
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [defaultValue, valueProp, props.form]);

  return <div data-slot="otp-field" className={cn("flex min-w-0 flex-col gap-(--qy-field-gap)", controlClassName)}>
    <div data-slot="otp-field-segments" className="group/otp relative grid w-fit max-w-full gap-(--qy-field-gap) has-[input:disabled]:opacity-64"
      style={{
        gridTemplateColumns: `repeat(${Math.max(length, characters.length)}, minmax(0, 1fr))`,
        "--qy-otp-cell": `var(--qy-control-${size})`,
        "--qy-otp-cell-narrow": `var(--qy-control-${size}-narrow)`,
      } as React.CSSProperties}
      onPointerDown={event => {
        if (event.defaultPrevented || event.button !== 0) return;
        const input = inputRef.current;
        const segment = (event.target as Element).closest<HTMLElement>("[data-otp-index]");
        if (!input || input.disabled || input.matches(":disabled") || !segment) return;
        event.preventDefault();
        input.focus();
        const index = Math.min(Number(segment.dataset.otpIndex), characters.length);
        const offset = characters.slice(0, index).join("").length;
        input.setSelectionRange(offset, offset < value.length ? offset + (characters[index]?.length ?? 0) : offset);
        syncSelection(input);
      }}
    >
      {Array.from({ length: Math.max(length, characters.length) }, (_, index) => <span key={index}
        data-slot="otp-field-segment" data-otp-index={index} aria-hidden="true"
        data-active={index === active ? "" : undefined}
        data-selected={index >= countBefore(selection.start) && index < countBefore(selection.end) ? "" : undefined}
        className={cn(
          "flex aspect-square min-w-0 w-(--qy-otp-cell-narrow) max-w-full items-center justify-center border border-input bg-card text-foreground sm:w-(--qy-otp-cell) pointer-coarse:min-h-(--qy-touch-target) pointer-coarse:w-(--qy-touch-target) dark:bg-surface-inset group-has-[input:read-only]/otp:border-dashed group-has-[input[aria-invalid=true]]/otp:border-destructive data-selected:bg-accent",
          index === active && "group-has-[input:focus-visible]/otp:border-ring group-has-[input[aria-invalid=true]:focus-visible]/otp:border-destructive-foreground",
          profiles[size],
        )}
      >{characters[index] ?? ""}</span>)}
      <Input {...props} ref={setRef} size={size} type="text" value={value} unstyled clearable={false} visibilityToggle={false}
        data-slot="otp-field-input" autoComplete={props.autoComplete ?? "one-time-code"}
        aria-describedby={[describedBy, feedback ? feedbackId : undefined].filter(Boolean).join(" ") || undefined}
        controlClassName="absolute inset-0 pointer-events-none" className={state => cn("opacity-0", typeof className === "function" ? className(state) : className)}
        onFocus={event => { onFocus?.(event); syncSelection(event.currentTarget); }}
        onBlur={event => { onBlur?.(event); syncSelection(event.currentTarget); }}
        onSelect={event => { onSelect?.(event); syncSelection(event.currentTarget); }}
        onChange={event => {
          onChange?.(event);
          if (event.defaultPrevented || event.baseUIHandlerPrevented || event.currentTarget.disabled || event.currentTarget.readOnly) return;
          const next = event.currentTarget.value;
          const nextLength = Array.from(next).length;
          if (nextLength > length && nextLength >= characters.length) { event.preventBaseUIHandler(); setFeedback(true); return; }
          setFeedback(false);
          if (valueProp === undefined) setUncontrolled(next);
          onValueChange?.(next, event);
          syncSelection(event.currentTarget);
        }}
        onPaste={event => {
          onPaste?.(event);
          if (event.defaultPrevented || event.baseUIHandlerPrevented || event.currentTarget.disabled || event.currentTarget.readOnly) return;
          const input = event.currentTarget;
          const next = value.slice(0, input.selectionStart ?? 0) + event.clipboardData.getData("text") + value.slice(input.selectionEnd ?? 0);
          const nextLength = Array.from(next).length;
          if (nextLength > length && nextLength >= characters.length) { event.preventDefault(); setFeedback(true); }
        }}
      />
    </div>
    {props.readOnly && <span data-slot="otp-field-readonly" className="text-support text-muted-foreground">{messages.readOnly}</span>}
    {feedback && <div id={feedbackId} data-slot="otp-field-feedback" role="status" className="text-support-mobile text-muted-foreground sm:text-support">{messages.otpLengthExceeded(length)}</div>}
  </div>;
}
