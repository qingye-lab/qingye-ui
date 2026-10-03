"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { MinusIcon, PlusIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { Input, type InputSize } from "./input";

const SizeContext = React.createContext<InputSize>("md");
export type NumberFieldProps = Omit<NumberFieldPrimitive.Root.Props, "allowOutOfRange"> & React.RefAttributes<HTMLDivElement> & { size?: InputSize };

/** 直接编辑保留用户值；范围约束由原生校验呈现，步进仍服从范围。 */
export function NumberField({ size = "md", className, style, value: valueProp, defaultValue, onValueChange, inputRef, ...props }: NumberFieldProps) {
  const [uncontrolled, setUncontrolled] = React.useState<number | null>(defaultValue ?? null);
  const hiddenRef = React.useRef<HTMLInputElement | null>(null);
  const setHiddenRef = React.useCallback((node: HTMLInputElement | null) => {
    hiddenRef.current = node;
    if (typeof inputRef === "function") {
      const cleanup = inputRef(node);
      if (typeof cleanup === "function") return () => { hiddenRef.current = null; cleanup(); };
    } else if (inputRef) inputRef.current = node;
  }, [inputRef]);
  React.useEffect(() => {
    const form = hiddenRef.current?.form;
    const reset = (event: Event) => queueMicrotask(() => {
      if (!event.defaultPrevented && valueProp === undefined) setUncontrolled(defaultValue ?? null);
    });
    form?.addEventListener("reset", reset);
    return () => form?.removeEventListener("reset", reset);
  }, [defaultValue, valueProp, props.form]);
  return <SizeContext.Provider value={size}><NumberFieldPrimitive.Root
    data-slot="number-field" {...props} allowOutOfRange
    value={valueProp === undefined ? uncontrolled : valueProp} inputRef={setHiddenRef}
    onValueChange={(next, details) => {
      onValueChange?.(next, details);
      if (!details.isCanceled && valueProp === undefined) setUncontrolled(next);
    }}
    className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)}
    style={state => ({
      "--qy-number-height": `var(--qy-control-${size})`,
      "--qy-number-height-narrow": `var(--qy-control-${size}-narrow)`,
      "--qy-number-step-padding": `var(--qy-control-${size}-icon-padding-bordered)`,
      "--qy-number-step-padding-narrow": `var(--qy-control-${size}-icon-padding-bordered-narrow)`,
      ...(size === "xs" || size === "sm" ? { "--qy-radius-control": `var(--qy-radius-${size})` } : {}),
      ...(typeof style === "function" ? style(state) : style),
    } as React.CSSProperties)}
  /></SizeContext.Provider>;
}

export function NumberFieldGroup({ className, ...props }: NumberFieldPrimitive.Group.Props & React.RefAttributes<HTMLDivElement>) {
  return <NumberFieldPrimitive.Group data-slot="number-field-group" {...props} className={state => cn(
    "flex w-full min-w-0 items-stretch rounded-control border border-input bg-card text-foreground min-h-(--qy-number-height-narrow) sm:min-h-(--qy-number-height) pointer-coarse:min-h-(--qy-touch-target) dark:bg-surface-inset has-[input:focus-visible]:border-ring data-disabled:opacity-64 data-readonly:border-dashed data-invalid:border-destructive data-invalid:has-[input:focus-visible]:border-destructive-foreground",
    typeof className === "function" ? className(state) : className,
  )} />;
}

export function NumberFieldInput({ className, render, ...props }: NumberFieldPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>) {
  const size = React.useContext(SizeContext);
  const { messages } = useUILocale();
  return <NumberFieldPrimitive.Input
    data-slot="number-field-input" aria-roledescription={messages.numberInput} {...props}
    className={state => cn("numeric", typeof className === "function" ? className(state) : className)}
    render={(elementProps, state) => <Input nativeInput unstyled controlClassName="flex-1" {...elementProps} size={size}
      render={typeof render === "function" ? inputProps => render(inputProps, state) : render}
    />}
  />;
}

const stepClass = "self-stretch min-h-0 sm:min-h-0 py-(--qy-number-step-padding-narrow) sm:py-(--qy-number-step-padding) pointer-coarse:w-(--qy-touch-target) rounded-[max(0px,calc(var(--qy-radius-control)-1px))]";

export function NumberFieldDecrement({ className, children, render, nativeButton = true, ...props }: NumberFieldPrimitive.Decrement.Props & React.RefAttributes<HTMLButtonElement>) {
  const size = React.useContext(SizeContext);
  const { messages } = useUILocale();
  return <NumberFieldPrimitive.Decrement data-slot="number-field-decrement" aria-label={messages.decrease} {...props} nativeButton={nativeButton}
    className={state => cn(stepClass, typeof className === "function" ? className(state) : className)}
    render={(elementProps, state) => <Button variant="quiet" shape="icon" size={size} {...elementProps} nativeButton={nativeButton} className={elementProps.className ?? ""}
      render={typeof render === "function" ? buttonProps => render(buttonProps, state) : render}
    />}
  >{children ?? <MinusIcon aria-hidden="true" />}</NumberFieldPrimitive.Decrement>;
}

export function NumberFieldIncrement({ className, children, render, nativeButton = true, ...props }: NumberFieldPrimitive.Increment.Props & React.RefAttributes<HTMLButtonElement>) {
  const size = React.useContext(SizeContext);
  const { messages } = useUILocale();
  return <NumberFieldPrimitive.Increment data-slot="number-field-increment" aria-label={messages.increase} {...props} nativeButton={nativeButton}
    className={state => cn(stepClass, typeof className === "function" ? className(state) : className)}
    render={(elementProps, state) => <Button variant="quiet" shape="icon" size={size} {...elementProps} nativeButton={nativeButton} className={elementProps.className ?? ""}
      render={typeof render === "function" ? buttonProps => render(buttonProps, state) : render}
    />}
  >{children ?? <PlusIcon aria-hidden="true" />}</NumberFieldPrimitive.Increment>;
}

export { NumberFieldPrimitive };
