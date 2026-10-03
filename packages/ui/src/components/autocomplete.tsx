"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { ChevronDownIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { useFloatingLayer } from "../floating-layer";
import { cn } from "../utils";
import { Button } from "./button";
import { Input, type InputSize } from "./input";

const Size = React.createContext<InputSize>("md");
const ReadOnly = React.createContext(false);
export type AutocompleteProps<Value = string> = Omit<AutocompletePrimitive.Root.Props<Value>, "mode" | "items"> & { items?: readonly Value[] | undefined; size?: InputSize };
/** Free text with suggestions; highlighting never becomes a submitted value. */
export function Autocomplete<Value>({ size = "md", readOnly = false, ...props }: AutocompleteProps<Value>) { return <Size.Provider value={size}><ReadOnly.Provider value={readOnly}><AutocompletePrimitive.Root {...props} readOnly={readOnly} mode="list" /></ReadOnly.Provider></Size.Provider>; }

export function AutocompleteInput({ render, onChange, ...props }: AutocompletePrimitive.Input.Props & React.RefAttributes<HTMLInputElement>) {
  const size = React.useContext(Size);
  return <AutocompletePrimitive.Input data-slot="autocomplete-input" {...props} onChange={event => { onChange?.(event); if (event.currentTarget.disabled || event.currentTarget.readOnly) event.preventBaseUIHandler(); }} render={(elementProps, state) => <Input nativeInput {...elementProps} size={size} render={typeof render === "function" ? inputProps => render(inputProps, state) : render} />} />;
}
export function AutocompleteTrigger({ render, children, ...props }: AutocompletePrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>) {
  const size = React.useContext(Size);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <AutocompletePrimitive.Trigger data-slot="autocomplete-trigger" aria-label={messages.showOptions} {...props} disabled={readOnly || props.disabled} aria-labelledby={props["aria-labelledby"] ?? ""} render={(elementProps, state) => <Button variant="bordered" shape="icon" size={size} {...elementProps} className={elementProps.className ?? ""} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <ChevronDownIcon aria-hidden="true" />}</AutocompletePrimitive.Trigger>;
}
export function AutocompleteClear({ render, children, ...props }: AutocompletePrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>) {
  const size = React.useContext(Size);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <AutocompletePrimitive.Clear data-slot="autocomplete-clear" aria-label={messages.clearSelection} {...props} disabled={readOnly || props.disabled} render={(elementProps, state) => <Button variant="quiet" shape="icon" size={size} {...elementProps} className={elementProps.className ?? ""} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <XIcon aria-hidden="true" />}</AutocompletePrimitive.Clear>;
}
export type AutocompletePopupProps = AutocompletePrimitive.Popup.Props & React.RefAttributes<HTMLDivElement> & { container?: AutocompletePrimitive.Portal.Props["container"]; positionerProps?: AutocompletePrimitive.Positioner.Props };
export function AutocompletePopup({ container, positionerProps, className, ...props }: AutocompletePopupProps) {
  const layerStyle = useFloatingLayer("popup");
  const { style: positionerStyle, ...positionerRest } = positionerProps ?? {};
  return <AutocompletePrimitive.Portal container={container}><AutocompletePrimitive.Positioner side="bottom" align="start" {...positionerRest} style={state => ({ ...layerStyle, ...(typeof positionerStyle === "function" ? positionerStyle(state) : positionerStyle) })}>
    <AutocompletePrimitive.Popup data-slot="autocomplete-popup" {...props} className={state => cn("min-w-(--anchor-width) max-w-(--available-width) rounded-overlay border border-border-strong bg-surface-raised text-foreground outline-none origin-(--transform-origin) focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />
  </AutocompletePrimitive.Positioner></AutocompletePrimitive.Portal>;
}
export function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props & React.RefAttributes<HTMLDivElement>) {
  return <AutocompletePrimitive.List data-slot="autocomplete-list" {...props} className={state => cn("max-h-(--available-height) overflow-y-auto overscroll-contain p-(--qy-space-1)", typeof className === "function" ? className(state) : className)} />;
}
const profiles: Record<InputSize, string> = {
  xs: "min-h-(--qy-control-xs-narrow) sm:min-h-(--qy-control-xs) px-(--qy-control-xs-padding) text-control-xs-mobile sm:text-control-xs",
  sm: "min-h-(--qy-control-sm-narrow) sm:min-h-(--qy-control-sm) px-(--qy-control-sm-padding) text-control-sm-mobile sm:text-control-sm",
  md: "min-h-(--qy-control-md-narrow) sm:min-h-(--qy-control-md) px-(--qy-control-md-padding) text-control-md-mobile sm:text-control-md",
  lg: "min-h-(--qy-control-lg-narrow) sm:min-h-(--qy-control-lg) px-(--qy-control-lg-padding) text-control-lg-mobile sm:text-control-lg",
  xl: "min-h-(--qy-control-xl-narrow) sm:min-h-(--qy-control-xl) px-(--qy-control-xl-padding) text-control-xl-mobile sm:text-control-xl",
};
export function AutocompleteItem({ className, ...props }: AutocompletePrimitive.Item.Props & React.RefAttributes<HTMLDivElement>) {
  const size = React.useContext(Size);
  return <AutocompletePrimitive.Item data-slot="autocomplete-item" {...props} className={state => cn("flex min-w-0 items-center rounded-item outline-none whitespace-normal wrap-break-word data-highlighted:bg-accent data-selected:bg-surface-active data-disabled:opacity-64 data-disabled:cursor-not-allowed pointer-coarse:min-h-(--qy-touch-target)", profiles[size], typeof className === "function" ? className(state) : className)} />;
}
export const AutocompleteEmpty = AutocompletePrimitive.Empty;
export { AutocompletePrimitive };
