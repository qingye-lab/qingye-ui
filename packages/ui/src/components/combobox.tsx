"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { useFloatingLayer } from "../floating-layer";
import { cn } from "../utils";
import { Button } from "./button";
import { Input, type InputSize } from "./input";

const Size = React.createContext<InputSize>("md");
const ReadOnly = React.createContext(false);
export type ComboboxProps<Value = string> = Omit<ComboboxPrimitive.Root.Props<Value, false>, "multiple"> & { size?: InputSize };
/** One confirmed candidate value and a separate filtering draft. */
export function Combobox<Value>({ size = "md", readOnly = false, onValueChange, ...props }: ComboboxProps<Value>) {
  return <Size.Provider value={size}><ReadOnly.Provider value={readOnly}><ComboboxPrimitive.Root {...props} readOnly={readOnly} multiple={false}
    onValueChange={(next, details) => { if (details.reason === "input-clear") { details.cancel(); return; } onValueChange?.(next, details); }}
  /></ReadOnly.Provider></Size.Provider>;
}

export function ComboboxInput({ render, onChange, ...props }: ComboboxPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>) {
  const size = React.useContext(Size);
  return <ComboboxPrimitive.Input data-slot="combobox-input" {...props} onChange={event => { onChange?.(event); if (event.currentTarget.disabled || event.currentTarget.readOnly) event.preventBaseUIHandler(); }} render={(elementProps, state) => <Input nativeInput {...elementProps} size={size} render={typeof render === "function" ? inputProps => render(inputProps, state) : render} />} />;
}
export function ComboboxTrigger({ render, children, ...props }: ComboboxPrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>) {
  const size = React.useContext(Size);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <ComboboxPrimitive.Trigger data-slot="combobox-trigger" aria-label={messages.showOptions} {...props} disabled={readOnly || props.disabled} aria-labelledby={props["aria-labelledby"] ?? ""} render={(elementProps, state) => <Button variant="bordered" shape="icon" size={size} {...elementProps} className={elementProps.className ?? ""} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <ChevronDownIcon aria-hidden="true" />}</ComboboxPrimitive.Trigger>;
}
export function ComboboxClear({ render, children, ...props }: ComboboxPrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>) {
  const size = React.useContext(Size);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <ComboboxPrimitive.Clear data-slot="combobox-clear" aria-label={messages.clearSelection} {...props} disabled={readOnly || props.disabled} render={(elementProps, state) => <Button variant="quiet" shape="icon" size={size} {...elementProps} className={elementProps.className ?? ""} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <XIcon aria-hidden="true" />}</ComboboxPrimitive.Clear>;
}
export type ComboboxPopupProps = ComboboxPrimitive.Popup.Props & React.RefAttributes<HTMLDivElement> & { container?: ComboboxPrimitive.Portal.Props["container"]; positionerProps?: ComboboxPrimitive.Positioner.Props };
export function ComboboxPopup({ container, positionerProps, className, ...props }: ComboboxPopupProps) {
  const layerStyle = useFloatingLayer("popup");
  const { style: positionerStyle, ...positionerRest } = positionerProps ?? {};
  return <ComboboxPrimitive.Portal container={container}><ComboboxPrimitive.Positioner side="bottom" align="start" {...positionerRest} style={state => ({ ...layerStyle, ...(typeof positionerStyle === "function" ? positionerStyle(state) : positionerStyle) })}>
    <ComboboxPrimitive.Popup data-slot="combobox-popup" {...props} className={state => cn("min-w-(--anchor-width) max-w-(--available-width) rounded-overlay border border-border-strong bg-surface-raised text-foreground outline-none origin-(--transform-origin) focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />
  </ComboboxPrimitive.Positioner></ComboboxPrimitive.Portal>;
}
export function ComboboxList({ className, ...props }: ComboboxPrimitive.List.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.List data-slot="combobox-list" {...props} className={state => cn("max-h-(--available-height) overflow-y-auto overscroll-contain p-(--qy-space-1)", typeof className === "function" ? className(state) : className)} />;
}
const profiles: Record<InputSize, string> = {
  xs: "min-h-(--qy-control-xs-narrow) sm:min-h-(--qy-control-xs) px-(--qy-control-xs-padding) text-control-xs-mobile sm:text-control-xs",
  sm: "min-h-(--qy-control-sm-narrow) sm:min-h-(--qy-control-sm) px-(--qy-control-sm-padding) text-control-sm-mobile sm:text-control-sm",
  md: "min-h-(--qy-control-md-narrow) sm:min-h-(--qy-control-md) px-(--qy-control-md-padding) text-control-md-mobile sm:text-control-md",
  lg: "min-h-(--qy-control-lg-narrow) sm:min-h-(--qy-control-lg) px-(--qy-control-lg-padding) text-control-lg-mobile sm:text-control-lg",
  xl: "min-h-(--qy-control-xl-narrow) sm:min-h-(--qy-control-xl) px-(--qy-control-xl-padding) text-control-xl-mobile sm:text-control-xl",
};
export function ComboboxItem({ className, ...props }: ComboboxPrimitive.Item.Props & React.RefAttributes<HTMLDivElement>) {
  const size = React.useContext(Size);
  return <ComboboxPrimitive.Item data-slot="combobox-item" {...props} className={state => cn("flex min-w-0 items-center rounded-item outline-none whitespace-normal wrap-break-word data-highlighted:bg-accent data-selected:bg-surface-active data-disabled:opacity-64 data-disabled:cursor-not-allowed pointer-coarse:min-h-(--qy-touch-target)", profiles[size], typeof className === "function" ? className(state) : className)} />;
}
export const ComboboxEmpty = ComboboxPrimitive.Empty;
export { ComboboxPrimitive };
