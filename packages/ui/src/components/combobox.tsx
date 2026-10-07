"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { useFloatingLayer } from "../floating-layer";
import { inputAdjunctClassName } from "../input-adjunct";
import { candidateEmptyClassName, candidateItemClassName, overlayItemClassName } from "../overlay-item";
import { cn } from "../utils";
import { Button } from "./button";
import { Input } from "./input";
import { InputGroup, type InputGroupProps } from "./input-group";

const ReadOnly = React.createContext(false);
const InControl = React.createContext(false);
export type ComboboxProps<Value = string> = Omit<ComboboxPrimitive.Root.Props<Value, false>, "multiple">;
/** One confirmed candidate value and a separate filtering draft. */
export function Combobox<Value>({ readOnly = false, onValueChange, ...props }: ComboboxProps<Value>) {
  return <ReadOnly.Provider value={readOnly}><ComboboxPrimitive.Root {...props} readOnly={readOnly} multiple={false}
    onValueChange={(next, details) => { if (details.reason === "input-clear") { details.cancel(); return; } onValueChange?.(next, details); }}
  /></ReadOnly.Provider>;
}

/**
 * 输入、清除与展开共用一条编辑边界（与 Input 内置的清除、显示密码同一规则）。
 * 不用 ComboboxControl 时各部件仍可独立组合，保持既有用法。
 */
export function ComboboxControl({ className, ...props }: InputGroupProps) {
  // 渲染为原语的 InputGroup：候选面以整条编辑边界为锚点，与边界同宽、从边界下沿展开。
  return <InControl.Provider value={true}><ComboboxPrimitive.InputGroup data-slot="combobox-control" render={<InputGroup {...props} className={cn("flex-nowrap", className)} />} /></InControl.Provider>;
}
export function ComboboxInput({ render, onChange, ...props }: ComboboxPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>) {
  const inControl = React.useContext(InControl);
  return <ComboboxPrimitive.Input data-slot="combobox-input" {...props} onChange={event => { onChange?.(event); if (event.currentTarget.disabled || event.currentTarget.readOnly) event.preventBaseUIHandler(); }} render={(elementProps, state) => <Input nativeInput {...elementProps} unstyled={inControl} {...(inControl ? { controlClassName: "flex-1" } : {})} render={typeof render === "function" ? inputProps => render(inputProps, state) : render} />} />;
}
export function ComboboxTrigger({ render, children, ...props }: ComboboxPrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>) {
  const inControl = React.useContext(InControl);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <ComboboxPrimitive.Trigger data-slot="combobox-trigger" aria-label={messages.showOptions} {...props} disabled={readOnly || props.disabled} aria-labelledby={props["aria-labelledby"] ?? ""} render={(elementProps, state) => <Button variant={inControl ? "quiet" : "bordered"} shape="icon" {...elementProps} className={cn(inControl && inputAdjunctClassName, inControl && "aspect-square", elementProps.className)} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <ChevronDownIcon aria-hidden="true" />}</ComboboxPrimitive.Trigger>;
}
export function ComboboxClear({ render, children, ...props }: ComboboxPrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>) {
  const inControl = React.useContext(InControl);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <ComboboxPrimitive.Clear data-slot="combobox-clear" aria-label={messages.clearSelection} {...props} disabled={readOnly || props.disabled} render={(elementProps, state) => <Button variant="quiet" shape="icon" {...elementProps} className={cn(inControl && inputAdjunctClassName, inControl && "aspect-square", elementProps.className)} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <XIcon aria-hidden="true" />}</ComboboxPrimitive.Clear>;
}
export type ComboboxPopupProps = ComboboxPrimitive.Popup.Props & React.RefAttributes<HTMLDivElement> & { container?: ComboboxPrimitive.Portal.Props["container"]; positionerProps?: ComboboxPrimitive.Positioner.Props };
export function ComboboxPopup({ container, positionerProps, className, ...props }: ComboboxPopupProps) {
  const layerStyle = useFloatingLayer("popup");
  const { style: positionerStyle, ...positionerRest } = positionerProps ?? {};
  return <ComboboxPrimitive.Portal container={container}><ComboboxPrimitive.Positioner side="bottom" align="start" sideOffset={4} {...positionerRest} style={state => ({ ...layerStyle, ...(typeof positionerStyle === "function" ? positionerStyle(state) : positionerStyle) })}>
    <ComboboxPrimitive.Popup data-slot="combobox-popup" {...props} className={state => cn("min-w-(--anchor-width) max-w-(--available-width) rounded-overlay border border-border bg-surface-raised text-foreground shadow-raised outline-none origin-(--transform-origin) focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />
  </ComboboxPrimitive.Positioner></ComboboxPrimitive.Portal>;
}
export function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.List data-slot="combobox-list" {...props} className={state => cn("max-h-(--available-height) overflow-y-auto overscroll-contain p-(--qy-overlay-inset) empty:p-0", typeof className === "function" ? className(state) : className)} />;
}
// 选中是事实，高亮是指针或键盘位置：选中用尾部对勾，高亮用底色，两者可以同时出现（与 Select 一致）。
export function ComboboxItem({ className, children, ...props }: ComboboxPrimitive.Item.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.Item data-slot="combobox-item" {...props} className={state => cn("flex items-center", overlayItemClassName, candidateItemClassName, typeof className === "function" ? className(state) : className)}>
    <span className="min-w-0 flex-1" data-slot="combobox-item-text">{children}</span>
    <ComboboxPrimitive.ItemIndicator data-slot="combobox-item-indicator" className="flex shrink-0 items-center [&_svg]:size-(--qy-fill-icon)"><CheckIcon aria-hidden="true" /></ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>;
}
export function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.Empty data-slot="combobox-empty" {...props} className={state => cn(candidateEmptyClassName, typeof className === "function" ? className(state) : className)} />;
}
export { ComboboxPrimitive };
