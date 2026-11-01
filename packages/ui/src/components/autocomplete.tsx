"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import { IconChevronDown, IconX } from "@tabler/icons-react";
import * as React from "react";
import { BusyMark } from "../busy-mark";
import { useUILocale } from "../locale";
import { type CandidateStatusOptions, useCandidateStatus } from "../candidate-status";
import { popupOffset, useFloatingLayer } from "../floating-layer";
import { inputAdjunctClassName } from "../input-adjunct";
import { overlayGroupLabelClassName, overlaySeparatorClassName } from "../overlay-group";
import { candidateEmptyClassName, candidateItemClassName, overlayItemClassName } from "../overlay-item";
import { cn } from "../utils";
import { Button } from "./button";
import { Input } from "./input";
import { InputGroup, type InputGroupProps } from "./input-group";

const ReadOnly = React.createContext(false);
const InControl = React.createContext(false);
const Loading = React.createContext(false);
/** 一组建议：`value` 是组名（不参与筛选），`items` 是组内的建议。 */
export type AutocompleteItemGroup<Value = string> = { value: unknown; items: readonly Value[] };
export type AutocompleteProps<Value = string> = Omit<AutocompletePrimitive.Root.Props<Value>, "mode" | "items"> & {
  items?: readonly Value[] | readonly AutocompleteItemGroup<Value>[] | undefined;
  /**
   * 候选正在取回：与 ComboboxSelect 的 `loading` 同名同义，同一套候选状态。
   * 输入框末端出现忙碌标记（与 Button、InputGroup 同一个），输入与列表写 `aria-busy`；
   * 「正在加载」由 AutocompleteStatus 播报（一件事实一个播报者），此时 AutocompleteEmpty 不出声——
   * 等待与「没有结果」是两件事，应用此刻并不知道后者。输入始终可用，等待不禁用输入。
   */
  loading?: boolean;
};
/** Free text with suggestions; highlighting never becomes a submitted value. */
export function Autocomplete<Value>({ readOnly = false, loading = false, ...props }: AutocompleteProps<Value>) {
  const Root = AutocompletePrimitive.Root as React.ComponentType<AutocompletePrimitive.Root.Props<Value>>;
  return <ReadOnly.Provider value={readOnly}><Loading.Provider value={loading}><Root {...props as AutocompletePrimitive.Root.Props<Value>} readOnly={readOnly} mode="list" /></Loading.Provider></ReadOnly.Provider>;
}

/** 输入、清除与展开共用一条编辑边界；候选面以整条边界为锚点。 */
export function AutocompleteControl({ className, children, ...props }: InputGroupProps) {
  const loading = React.useContext(Loading);
  // 忙碌标记直接用共享的 BusyMark，不经 InputGroup 的 `loading`：后者自带一个播报者，这里的播报归 AutocompleteStatus。
  return <InControl.Provider value={true}><AutocompletePrimitive.InputGroup data-slot="autocomplete-control" render={<InputGroup {...props} data-loading={loading ? "" : undefined} className={cn("flex-nowrap", className)}>
    {children}
    {loading ? <BusyMark className="order-2 self-center ps-0 pe-(--qy-input-group-padding) text-muted-foreground" data-slot="autocomplete-busy" /> : null}
  </InputGroup>} /></InControl.Provider>;
}
export function AutocompleteInput({ render, onChange, ...props }: AutocompletePrimitive.Input.Props & React.RefAttributes<HTMLInputElement>) {
  const inControl = React.useContext(InControl);
  const loading = React.useContext(Loading);
  return <AutocompletePrimitive.Input data-slot="autocomplete-input" aria-busy={loading || undefined} {...props} onChange={event => { onChange?.(event); if (event.currentTarget.disabled || event.currentTarget.readOnly) event.preventBaseUIHandler(); }} render={(elementProps, state) => <Input nativeInput {...elementProps} unstyled={inControl} {...(inControl ? { controlClassName: "flex-1" } : {})} render={typeof render === "function" ? inputProps => render(inputProps, state) : render} />} />;
}
export function AutocompleteTrigger({ render, children, ...props }: AutocompletePrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>) {
  const inControl = React.useContext(InControl);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <AutocompletePrimitive.Trigger data-slot="autocomplete-trigger" aria-label={messages.showOptions} {...props} disabled={readOnly || props.disabled} aria-labelledby={props["aria-labelledby"] ?? ""} render={(elementProps, state) => <Button variant={inControl ? "quiet" : "bordered"} shape="icon" {...elementProps} className={cn(inControl && inputAdjunctClassName, elementProps.className)} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <IconChevronDown aria-hidden="true" />}</AutocompletePrimitive.Trigger>;
}
export function AutocompleteClear({ render, children, ...props }: AutocompletePrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>) {
  const inControl = React.useContext(InControl);
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <AutocompletePrimitive.Clear data-slot="autocomplete-clear" aria-label={messages.clearSelection} {...props} disabled={readOnly || props.disabled} render={(elementProps, state) => <Button variant="quiet" shape="icon" {...elementProps} className={cn(inControl && inputAdjunctClassName, elementProps.className)} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <IconX aria-hidden="true" />}</AutocompletePrimitive.Clear>;
}
export type AutocompletePopupProps = AutocompletePrimitive.Popup.Props & React.RefAttributes<HTMLDivElement> & { container?: AutocompletePrimitive.Portal.Props["container"]; positionerProps?: AutocompletePrimitive.Positioner.Props };
// 边界与阴影档同 Popover（见 popover.tsx 的 PopoverPopup）：border-border 线 + shadow-raised。
export function AutocompletePopup({ container, positionerProps, className, ...props }: AutocompletePopupProps) {
  const layerStyle = useFloatingLayer("popup");
  const { style: positionerStyle, ...positionerRest } = positionerProps ?? {};
  return <AutocompletePrimitive.Portal container={container}><AutocompletePrimitive.Positioner side="bottom" align="start" sideOffset={popupOffset} {...positionerRest} style={state => ({ ...layerStyle, ...(typeof positionerStyle === "function" ? positionerStyle(state) : positionerStyle) })}>
    <AutocompletePrimitive.Popup data-slot="autocomplete-popup" {...props} className={state => cn("qy-autocomplete-popup min-w-(--anchor-width) max-w-(--available-width) rounded-overlay border border-border bg-surface-raised text-foreground shadow-raised outline-none origin-(--transform-origin) focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />
  </AutocompletePrimitive.Positioner></AutocompletePrimitive.Portal>;
}
export function AutocompleteList({ className, ...props }: AutocompletePrimitive.List.Props & React.RefAttributes<HTMLDivElement>) {
  const loading = React.useContext(Loading);
  return <AutocompletePrimitive.List data-slot="autocomplete-list" aria-busy={loading || undefined} {...props} className={state => cn("max-h-(--available-height) overflow-y-auto overscroll-contain p-(--qy-overlay-inset) empty:p-0", typeof className === "function" ? className(state) : className)} />;
}
export function AutocompleteItem({ className, ...props }: AutocompletePrimitive.Item.Props & React.RefAttributes<HTMLDivElement>) {
  return <AutocompletePrimitive.Item data-slot="autocomplete-item" {...props} className={state => cn("flex items-center", overlayItemClassName, candidateItemClassName, typeof className === "function" ? className(state) : className)} />;
}
// 空态与 Select、Combobox 同一画法与同一默认用语；候选来自查询时，应用应传 children 说明查询对象。
export function AutocompleteEmpty({ className, children, ...props }: AutocompletePrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>) {
  const { messages } = useUILocale();
  const loading = React.useContext(Loading);
  return <AutocompletePrimitive.Empty data-slot="autocomplete-empty" {...props} className={state => cn(candidateEmptyClassName, typeof className === "function" ? className(state) : className)}>{loading ? null : children === undefined ? messages.selectEmpty : children}</AutocompletePrimitive.Empty>;
}
/**
 * 一组候选与它的组名。数据用 Base UI 的分组形态（`items={[{ value: "页面", items: [...] }]}`），
 * 列表以函数子级逐组渲染；组内用 AutocompleteCollection。画法与 SelectGroup / SelectGroupLabel 同一来源（NG3）。
 */
export function AutocompleteGroup({ className, ...props }: AutocompletePrimitive.Group.Props & React.RefAttributes<HTMLDivElement>) {
  return <AutocompletePrimitive.Group data-slot="autocomplete-group" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />;
}
/** 组名自身不可选；读屏经所在组的 aria-labelledby 读到它。 */
export function AutocompleteGroupLabel({ className, ...props }: AutocompletePrimitive.GroupLabel.Props & React.RefAttributes<HTMLDivElement>) {
  return <AutocompletePrimitive.GroupLabel data-slot="autocomplete-group-label" {...props} className={state => cn(overlayGroupLabelClassName, typeof className === "function" ? className(state) : className)} />;
}
/** 组与组之间比间距更强的分界；与 MenuSeparator 同一画法。分组靠间距已读得出时不必用。 */
export function AutocompleteSeparator({ className, ...props }: AutocompletePrimitive.Separator.Props & React.RefAttributes<HTMLDivElement>) {
  return <AutocompletePrimitive.Separator data-slot="autocomplete-separator" {...props} className={state => cn(overlaySeparatorClassName, typeof className === "function" ? className(state) : className)} />;
}
/** 在分组数据的函数子级里，渲染一组之内的候选。 */
export const AutocompleteCollection = AutocompletePrimitive.Collection;
export type AutocompleteStatusProps = AutocompletePrimitive.Status.Props & React.RefAttributes<HTMLDivElement> & Omit<CandidateStatusOptions, "children">;
/**
 * 列表自身状态的读屏播报：加载中、结果数、应用自己的提示。放在 AutocompletePopup 里，始终保持挂载，
 * 变的是它的内容。「没有结果」归 AutocompleteEmpty，这里 `count={0}` 不出声。
 * 所在 Autocomplete 处于 `loading` 时，这里默认播报「正在加载」并同时显示（坐在 Empty 的位置上）；显式传值则以传入为准。
 */
export function AutocompleteStatus({ loading, count, visible, className, children, ...props }: AutocompleteStatusProps) {
  const rootLoading = React.useContext(Loading);
  const busy = loading ?? rootLoading;
  const status = useCandidateStatus({ children, loading: busy, count, visible: visible ?? busy });
  return <AutocompletePrimitive.Status data-slot="autocomplete-status" {...props} className={state => cn(status.className, typeof className === "function" ? className(state) : className)}>{status.content}</AutocompletePrimitive.Status>;
}
export { AutocompletePrimitive };
