"use client";

import { NumberField as NumberFieldPrimitive } from "@base-ui/react/number-field";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { fillStateByData } from "../fill-state";
import { Button } from "./button";
import { Input } from "./input";

export type NumberFieldProps = Omit<NumberFieldPrimitive.Root.Props, "allowOutOfRange"> & React.RefAttributes<HTMLDivElement>;

/** 直接编辑保留用户值；范围约束由原生校验呈现，步进仍服从范围。 */
export function NumberField({ className, style, value: valueProp, defaultValue, onValueChange, inputRef, ...props }: NumberFieldProps) {
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
  return <NumberFieldPrimitive.Root
    data-slot="number-field" {...props} allowOutOfRange
    value={valueProp === undefined ? uncontrolled : valueProp} inputRef={setHiddenRef}
    onValueChange={(next, details) => {
      onValueChange?.(next, details);
      if (!details.isCanceled && valueProp === undefined) setUncontrolled(next);
    }}
    className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)}
    style={state => ({
      // 几何只读填值控件角色层（用户裁决 2026-10-05）：跟随密度，不选档位。
      "--qy-number-height": "var(--qy-fill-height)",
      "--qy-number-height-narrow": "var(--qy-fill-height-narrow)",
      // 默认宽度容纳两个步进按钮与约 8 位数字；数值长度有限，拉满容器只会把值与步进拉开。预设，可由 className 覆写。
      "--qy-number-width": "round(calc(2 * var(--qy-fill-height) + 8ch), 1px)",
      ...(typeof style === "function" ? style(state) : style),
    } as React.CSSProperties)}
  />;
}

export function NumberFieldGroup({ className, ...props }: NumberFieldPrimitive.Group.Props & React.RefAttributes<HTMLDivElement>) {
  return <NumberFieldPrimitive.Group data-slot="number-field-group" {...props} className={state => cn(
    "flex w-[min(100%,var(--qy-number-width))] min-w-0 items-stretch rounded-(--qy-fill-radius) border border-input bg-card text-foreground min-h-(--qy-number-height-narrow) sm:min-h-(--qy-number-height) pointer-coarse:min-h-(--qy-touch-target) dark:bg-surface-inset has-[input:focus-visible]:border-ring data-invalid:border-destructive data-invalid:has-[input:focus-visible]:border-destructive-foreground", fillStateByData,
    typeof className === "function" ? className(state) : className,
  )} />;
}

export function NumberFieldInput({ className, render, ...props }: NumberFieldPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>) {
  const { messages } = useUILocale();
  return <NumberFieldPrimitive.Input
    data-slot="number-field-input" aria-roledescription={messages.numberInput} {...props}
    className={state => cn("numeric px-0 text-center tabular-nums", typeof className === "function" ? className(state) : className)}
    render={(elementProps, state) => <Input nativeInput unstyled controlClassName="flex-1" {...elementProps}
      render={typeof render === "function" ? inputProps => render(inputProps, state) : render}
    />}
  />;
}

// 步进是附属于值的动作：与其他编辑边界内的附属动作同色同形（基础层 §6）；只读时不可步进，隐藏但保留位置，值不移位。
// 几何跟随填值控件角色层（用户裁决 2026-10-05）：步进按钮不再选自己的档位，密度变化时与数值同高。
// 步进按钮是方的：边长 = 控件内高（外高 − 上下两道 1px 边线），与数值同一行盒，不撑高控件。
const stepClass = "self-stretch min-h-0 sm:min-h-0 p-0 w-[calc(var(--qy-number-height-narrow)-2px)] sm:w-[calc(var(--qy-number-height)-2px)] pointer-coarse:w-(--qy-touch-target) rounded-[max(0px,calc(var(--qy-fill-radius)-1px))] text-muted-foreground hover:text-foreground [[data-readonly]_&]:invisible";

export function NumberFieldDecrement({ className, children, render, nativeButton = true, ...props }: NumberFieldPrimitive.Decrement.Props & React.RefAttributes<HTMLButtonElement>) {
  const { messages } = useUILocale();
  return <NumberFieldPrimitive.Decrement data-slot="number-field-decrement" aria-label={messages.decrease} {...props} nativeButton={nativeButton}
    className={state => cn(stepClass, typeof className === "function" ? className(state) : className)}
    render={(elementProps, state) => <Button variant="quiet" shape="icon" {...elementProps} nativeButton={nativeButton} className={elementProps.className ?? ""}
      render={typeof render === "function" ? buttonProps => render(buttonProps, state) : render}
    />}
  >{children ?? <IconMinus aria-hidden="true" />}</NumberFieldPrimitive.Decrement>;
}

export function NumberFieldIncrement({ className, children, render, nativeButton = true, ...props }: NumberFieldPrimitive.Increment.Props & React.RefAttributes<HTMLButtonElement>) {
  const { messages } = useUILocale();
  return <NumberFieldPrimitive.Increment data-slot="number-field-increment" aria-label={messages.increase} {...props} nativeButton={nativeButton}
    className={state => cn(stepClass, typeof className === "function" ? className(state) : className)}
    render={(elementProps, state) => <Button variant="quiet" shape="icon" {...elementProps} nativeButton={nativeButton} className={elementProps.className ?? ""}
      render={typeof render === "function" ? buttonProps => render(buttonProps, state) : render}
    />}
  >{children ?? <IconPlus aria-hidden="true" />}</NumberFieldPrimitive.Increment>;
}

export { NumberFieldPrimitive };
