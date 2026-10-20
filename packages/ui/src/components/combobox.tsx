"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { chipActionClassName, chipClassName, chipDraftControlClassName, chipFrameStyle, chipTextClassName } from "../chip";
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
  return <ComboboxPrimitive.Input data-slot="combobox-input" {...props} onChange={event => { onChange?.(event); if (event.currentTarget.disabled || event.currentTarget.readOnly) event.preventBaseUIHandler(); }} render={(elementProps, state) => <Input nativeInput {...elementProps} unstyled={inControl} {...(chips ? { controlClassName: cn(chipDraftControlClassName, "min-w-[min(100%,var(--qy-field-min-text))]"), className: cn("px-(--qy-tag-padding)", elementProps.className) } : inControl ? { controlClassName: "flex-1" } : {})} render={typeof render === "function" ? inputProps => render(inputProps, state) : render} />} />;
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
  return <ComboboxPrimitive.Portal container={container}><ComboboxPrimitive.Positioner side="bottom" align="start" sideOffset={popupOffset} {...positionerRest} style={state => ({ ...layerStyle, ...(typeof positionerStyle === "function" ? positionerStyle(state) : positionerStyle) })}>
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
/**
 * 一组候选与它的组名。数据用 Base UI 的分组形态（`items={[{ value: "页面", items: [...] }]}`），
 * 列表以函数子级逐组渲染；组内用 ComboboxCollection。画法与 SelectGroup / SelectGroupLabel 同一来源（NG3）。
 * 多选时分组同样成立：组只决定候选如何摆放，不改变已确认值的形态。
 */
export function ComboboxGroup({ className, ...props }: ComboboxPrimitive.Group.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.Group data-slot="combobox-group" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />;
}
/** 组名只对读屏用 aria-labelledby 关联到所在的组；自身不可选、不入键盘序列。 */
export function ComboboxGroupLabel({ className, ...props }: ComboboxPrimitive.GroupLabel.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.GroupLabel data-slot="combobox-group-label" {...props} className={state => cn(overlayGroupLabelClassName, typeof className === "function" ? className(state) : className)} />;
}
/** 组与组之间比间距更强的分界；与 MenuSeparator 同一画法。分组靠间距已读得出时不必用。 */
export function ComboboxSeparator({ className, ...props }: ComboboxPrimitive.Separator.Props & React.RefAttributes<HTMLDivElement>) {
  return <ComboboxPrimitive.Separator data-slot="combobox-separator" {...props} className={state => cn(overlaySeparatorClassName, typeof className === "function" ? className(state) : className)} />;
}
/** 在分组数据的函数子级里，渲染一组之内的候选。 */
export const ComboboxCollection = ComboboxPrimitive.Collection;
export type ComboboxStatusProps = ComboboxPrimitive.Status.Props & React.RefAttributes<HTMLDivElement> & Omit<CandidateStatusOptions, "children">;
/**
 * 列表自身状态的读屏播报：加载中、结果数、应用自己的提示。放在 ComboboxPopup 里，始终保持挂载，
 * 变的是它的内容。「没有结果」归 ComboboxEmpty，这里 `count={0}` 不出声。
 */
export function ComboboxStatus({ loading, count, visible, className, children, ...props }: ComboboxStatusProps) {
  const status = useCandidateStatus({ children, loading, count, visible });
  return <ComboboxPrimitive.Status data-slot="combobox-status" {...props} className={state => cn(status.className, typeof className === "function" ? className(state) : className)}>{status.content}</ComboboxPrimitive.Status>;
}

export type ComboboxSelectProps<Value = string> = Omit<ComboboxProps<Value>, "children" | "multiple" | "items" | "itemToStringLabel"> & {
  /** 平铺候选；分组、多选或自定义解剖使用 Combobox 的公开部件。 */
  items: readonly Value[];
  /** 输入框、过滤与候选共用的可读名称；富候选另用 renderItem。 */
  itemToStringLabel: (item: Value) => string;
  renderItem?: ((item: Value) => React.ReactNode) | undefined;
  /** 当前查询已完成且没有候选时的内容，由应用说明查询对象。 */
  emptyContent: React.ReactNode;
  /** 只表达调用方的请求事实，不发请求、不推断失败。 */
  loading?: boolean | undefined;
  clearable?: boolean | undefined;
  inputProps?: React.ComponentProps<typeof ComboboxInput> | undefined;
  controlProps?: InputGroupProps | undefined;
  popupProps?: ComboboxPopupProps | undefined;
};

/**
 * 单选的常用组合：一条编辑边界、清除、展开、候选和真实的空/加载状态。
 * value 是确认值，inputValue 是查询草稿；生命周期、竞态与候选是否仍有效由应用持有。
 * 不另建状态机，全部选择、键盘、Field 与表单行为继续由 Combobox 原语承担。
 */
export function ComboboxSelect<Value>({ items, itemToStringLabel, renderItem, emptyContent, loading = false, clearable = true, inputProps, controlProps, popupProps, ...props }: ComboboxSelectProps<Value>) {
  return <Combobox {...props} items={items} itemToStringLabel={itemToStringLabel}>
    <ComboboxControl {...controlProps}>
      <ComboboxInput aria-busy={loading || undefined} {...inputProps} />
      {clearable && <ComboboxClear />}
      <ComboboxTrigger />
    </ComboboxControl>
    <ComboboxPopup {...popupProps}>
      <ComboboxStatus loading={loading} visible={loading} />
      <ComboboxEmpty>{loading ? null : emptyContent}</ComboboxEmpty>
      <ComboboxList aria-busy={loading || undefined}>{(item: Value, index: number) => <ComboboxItem key={props.itemToStringValue?.(item) ?? index} value={item}>{renderItem ? renderItem(item) : itemToStringLabel(item)}</ComboboxItem>}</ComboboxList>
    </ComboboxPopup>
  </Combobox>;
}
export { ComboboxPrimitive };
