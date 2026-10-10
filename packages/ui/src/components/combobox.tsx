"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { chipActionClassName, chipClassName, chipDraftControlClassName, chipFrameStyle, chipTextClassName } from "../chip";
import { useFloatingLayer } from "../floating-layer";
import { inputAdjunctClassName } from "../input-adjunct";
import { candidateEmptyClassName, candidateItemClassName, overlayItemClassName } from "../overlay-item";
import { cn } from "../utils";
import { Button } from "./button";
import { Input } from "./input";
import { InputGroup, type InputGroupProps } from "./input-group";

const ReadOnly = React.createContext(false);
const InControl = React.createContext(false);
const Multiple = React.createContext(false);
export type ComboboxProps<Value = string, Many extends boolean | undefined = false> = ComboboxPrimitive.Root.Props<Value, Many>;
/**
 * 已确认的候选值与过滤草稿分开。默认确认一个值；`multiple` 时确认的是一组值，
 * 每个已选项在编辑边界里成为一枚可单独移除的项（ComboboxChips / ComboboxChip）。
 */
export function Combobox<Value, Many extends boolean | undefined = false>({ readOnly = false, multiple, onValueChange, ...props }: ComboboxProps<Value, Many>) {
  const Root = ComboboxPrimitive.Root as React.ComponentType<ComboboxPrimitive.Root.Props<Value, boolean | undefined>>;
  return <ReadOnly.Provider value={readOnly}><Multiple.Provider value={multiple === true}><Root {...props as ComboboxPrimitive.Root.Props<Value, boolean | undefined>} readOnly={readOnly} multiple={multiple}
    onValueChange={(next, details) => { if (details.reason === "input-clear") { details.cancel(); return; } (onValueChange as ((value: unknown, details: ComboboxPrimitive.Root.ChangeEventDetails) => void) | undefined)?.(next, details); }}
  /></Multiple.Provider></ReadOnly.Provider>;
}

/**
 * 输入、清除与展开共用一条编辑边界（与 Input 内置的清除、显示密码同一规则）。
 * 不用 ComboboxControl 时各部件仍可独立组合，保持既有用法。
 * 多选时边界还要装下已选项，可换行；项、草稿与附属动作的几何与 TagInput 相同（src/chip.ts）。
 */
export function ComboboxControl({ className, style, ...props }: InputGroupProps) {
  const multiple = React.useContext(Multiple);
  // 渲染为原语的 InputGroup：候选面以整条编辑边界为锚点，与边界同宽、从边界下沿展开。
  return <InControl.Provider value={true}><ComboboxPrimitive.InputGroup data-slot="combobox-control" render={<InputGroup {...props} style={multiple ? { ...chipFrameStyle, ...style } : style} className={cn("flex-nowrap", multiple && "items-start gap-(--qy-tag-inset) p-(--qy-tag-inset)", className)} />} /></InControl.Provider>;
}
export function ComboboxInput({ render, onChange, ...props }: ComboboxPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>) {
  const inControl = React.useContext(InControl);
  const chips = React.useContext(Multiple) && inControl;
  return <ComboboxPrimitive.Input data-slot="combobox-input" {...props} onChange={event => { onChange?.(event); if (event.currentTarget.disabled || event.currentTarget.readOnly) event.preventBaseUIHandler(); }} render={(elementProps, state) => <Input nativeInput {...elementProps} unstyled={inControl} {...(chips ? { controlClassName: cn(chipDraftControlClassName, "min-w-[min(100%,4em)]"), className: cn("px-(--qy-tag-padding)", elementProps.className) } : inControl ? { controlClassName: "flex-1" } : {})} render={typeof render === "function" ? inputProps => render(inputProps, state) : render} />} />;
}
// 多选的编辑边界里，附属动作与已选项同高（一枚项高的正方形），停在第一行；单选时铺满边界内高。
function adjunctClassName(inControl: boolean, chips: boolean, className: string | undefined) {
  return cn(inControl && !chips && inputAdjunctClassName, chips && chipActionClassName, chips && "shrink-0", className);
}
export function ComboboxTrigger({ render, children, ...props }: ComboboxPrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>) {
  const inControl = React.useContext(InControl);
  const chips = React.useContext(Multiple) && inControl;
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <ComboboxPrimitive.Trigger data-slot="combobox-trigger" aria-label={messages.showOptions} {...props} disabled={readOnly || props.disabled} aria-labelledby={props["aria-labelledby"] ?? ""} render={(elementProps, state) => <Button variant={inControl ? "quiet" : "bordered"} shape="icon" {...(chips ? { size: "xs" as const } : {})} {...elementProps} className={adjunctClassName(inControl, chips, elementProps.className)} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <IconChevronDown aria-hidden="true" />}</ComboboxPrimitive.Trigger>;
}
export function ComboboxClear({ render, children, ...props }: ComboboxPrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>) {
  const inControl = React.useContext(InControl);
  const chips = React.useContext(Multiple) && inControl;
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  return <ComboboxPrimitive.Clear data-slot="combobox-clear" aria-label={messages.clearSelection} {...props} disabled={readOnly || props.disabled} render={(elementProps, state) => <Button variant="quiet" shape="icon" {...(chips ? { size: "xs" as const } : {})} {...elementProps} className={adjunctClassName(inControl, chips, elementProps.className)} render={typeof render === "function" ? p => render(p, state) : render} />}>{children ?? <IconX aria-hidden="true" />}</ComboboxPrimitive.Clear>;
}
/** 读取已确认的值；多选时用它把每个已选值摆成 ComboboxChip。 */
export const ComboboxValue = ComboboxPrimitive.Value;
/** 已选项与草稿输入同在一处、一起换行；方向键在各项与输入之间移动。放在 ComboboxControl 里。 */
export function ComboboxChips({ className, ...props }: ComboboxPrimitive.Chips.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.Chips data-slot="combobox-chips" {...props} className={state => cn("flex min-w-0 flex-1 flex-wrap items-center gap-(--qy-tag-inset)", typeof className === "function" ? className(state) : className)} />;
}
export type ComboboxChipProps = ComboboxPrimitive.Chip.Props & React.RefAttributes<HTMLDivElement> & {
  /** 移除动作的对象名；children 是纯文字时取 children。 */
  label?: string;
};
/** 一枚已确认的值，自带移除动作；只读时只是值，没有动作。 */
export function ComboboxChip({ label, className, children, ...props }: ComboboxChipProps) {
  const readOnly = React.useContext(ReadOnly);
  const { messages } = useUILocale();
  const name = label ?? (typeof children === "string" || typeof children === "number" ? String(children) : undefined);
  return <ComboboxPrimitive.Chip data-slot="combobox-chip" data-readonly={readOnly ? "" : undefined} {...props} className={state => cn(chipClassName, "outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", typeof className === "function" ? className(state) : className)}>
    <span data-slot="combobox-chip-text" className={cn("min-w-0 truncate", chipTextClassName)}>{children}</span>
    {!readOnly && <ComboboxPrimitive.ChipRemove data-slot="combobox-chip-remove" aria-label={name === undefined ? messages.remove : messages.removeTag(name)} render={<Button size="xs" variant="quiet" shape="icon" className={chipActionClassName} />}><IconX aria-hidden="true" /></ComboboxPrimitive.ChipRemove>}
  </ComboboxPrimitive.Chip>;
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
    <ComboboxPrimitive.ItemIndicator data-slot="combobox-item-indicator" className="flex shrink-0 items-center [&_svg]:size-(--qy-fill-icon)"><IconCheck aria-hidden="true" /></ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>;
}
export function ComboboxEmpty({ className, ...props }: ComboboxPrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.Empty data-slot="combobox-empty" {...props} className={state => cn(candidateEmptyClassName, typeof className === "function" ? className(state) : className)} />;
}
export { ComboboxPrimitive };
