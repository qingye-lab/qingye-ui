"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { ChevronDownIcon, XIcon } from "lucide-react";
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
export type AutocompleteProps<Value = string> = Omit<AutocompletePrimitive.Root.Props<Value>, "mode" | "items"> & { items?: readonly Value[] | undefined };
/** Free text with suggestions; highlighting never becomes a submitted value. */
export function Autocomplete<Value>({ readOnly = false, ...props }: AutocompleteProps<Value>) { return <ReadOnly.Provider value={readOnly}><AutocompletePrimitive.Root {...props} readOnly={readOnly} mode="list" /></ReadOnly.Provider>; }

/** 输入、清除与展开共用一条编辑边界；候选面以整条边界为锚点。 */
export function AutocompleteControl({ className, ...props }: InputGroupProps) {
  return <InControl.Provider value={true}><AutocompletePrimitive.InputGroup data-slot="autocomplete-control" render={<InputGroup {...props} className={cn("flex-nowrap", className)} />} /></InControl.Provider>;
}
export function AutocompleteInput({ render, onChange, ...props }: AutocompletePrimitive.Input.Props & React.RefAttributes<HTMLInputElement>) {
  const inControl = React.useContext(InControl);
  return <AutocompletePrimitive.Input data-slot="autocomplete-input" {...props} onChange={event => { onChange?.(event); if (event.currentTarget.disabled || event.currentTarget.readOnly) event.preventBaseUIHandler(); }} render={(elementProps, state) => <Input nativeInput {...elementProps} unstyled={inControl} {...(inControl ? { controlClassName: "flex-1" } : {})} render={typeof render === "function" ? inputProps => render(inputProps, state) : render} />} />;
}
export function AutocompleteTrigger({ render, children, ...props }: AutocompletePrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>) {
  const inControl = React.useContext(InControl);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <AutocompletePrimitive.Trigger data-slot="autocomplete-trigger" aria-label={messages.showOptions} {...props} disabled={readOnly || props.disabled} aria-labelledby={props["aria-labelledby"] ?? ""} render={(elementProps, state) => <Button variant={inControl ? "quiet" : "bordered"} shape="icon" {...elementProps} className={cn(inControl && inputAdjunctClassName, inControl && "aspect-square", elementProps.className)} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <ChevronDownIcon aria-hidden="true" />}</AutocompletePrimitive.Trigger>;
}
export function AutocompleteClear({ render, children, ...props }: AutocompletePrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>) {
  const inControl = React.useContext(InControl);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <AutocompletePrimitive.Clear data-slot="autocomplete-clear" aria-label={messages.clearSelection} {...props} disabled={readOnly || props.disabled} render={(elementProps, state) => <Button variant="quiet" shape="icon" {...elementProps} className={cn(inControl && inputAdjunctClassName, inControl && "aspect-square", elementProps.className)} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <XIcon aria-hidden="true" />}</AutocompletePrimitive.Clear>;
}
export type AutocompletePopupProps = AutocompletePrimitive.Popup.Props & React.RefAttributes<HTMLDivElement> & { container?: AutocompletePrimitive.Portal.Props["container"]; positionerProps?: AutocompletePrimitive.Positioner.Props };
export function AutocompletePopup({ container, positionerProps, className, ...props }: AutocompletePopupProps) {
  const layerStyle = useFloatingLayer("popup");
  const { style: positionerStyle, ...positionerRest } = positionerProps ?? {};
  return <AutocompletePrimitive.Portal container={container}><AutocompletePrimitive.Positioner side="bottom" align="start" sideOffset={4} {...positionerRest} style={state => ({ ...layerStyle, ...(typeof positionerStyle === "function" ? positionerStyle(state) : positionerStyle) })}>
    <AutocompletePrimitive.Popup data-slot="autocomplete-popup" {...props} className={state => cn("min-w-(--anchor-width) max-w-(--available-width) rounded-overlay border border-border bg-surface-raised text-foreground shadow-raised outline-none origin-(--transform-origin) focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />
  </AutocompletePrimitive.Positioner></AutocompletePrimitive.Portal>;
}
export function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props & React.RefAttributes<HTMLDivElement>) {
  return <AutocompletePrimitive.List data-slot="autocomplete-list" {...props} className={state => cn("max-h-(--available-height) overflow-y-auto overscroll-contain p-(--qy-overlay-inset) empty:p-0", typeof className === "function" ? className(state) : className)} />;
}
export function AutocompleteItem({ className, ...props }: AutocompletePrimitive.Item.Props & React.RefAttributes<HTMLDivElement>) {
  return <AutocompletePrimitive.Item data-slot="autocomplete-item" {...props} className={state => cn("flex items-center", overlayItemClassName, candidateItemClassName, typeof className === "function" ? className(state) : className)} />;
}
export function AutocompleteEmpty({ className, ...props }: AutocompletePrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>) {
  return <AutocompletePrimitive.Empty data-slot="autocomplete-empty" {...props} className={state => cn(candidateEmptyClassName, typeof className === "function" ? className(state) : className)} />;
}
export { AutocompletePrimitive };
