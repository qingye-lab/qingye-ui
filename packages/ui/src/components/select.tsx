"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useRender } from "@base-ui/react/use-render";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { useFloatingLayer } from "../floating-layer";

export type SelectProps<Value = unknown> = Omit<SelectPrimitive.Root.Props<Value, false>, "multiple">;
export type SelectSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & { size?: SelectSize };
export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;
export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;
export type SelectPopupProps = React.ComponentProps<typeof SelectPrimitive.Popup> &
  Pick<SelectPrimitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignOffset" | "alignItemWithTrigger"> &
  Pick<SelectPrimitive.Portal.Props, "container"> & { positionerProps?: SelectPrimitive.Positioner.Props };

const textProfiles: Record<SelectSize, string> = {
  xs: "text-control-xs-mobile sm:text-control-xs",
  sm: "text-control-sm-mobile sm:text-control-sm",
  md: "text-control-md-mobile sm:text-control-md",
  lg: "text-control-lg-mobile sm:text-control-lg",
  xl: "text-control-xl-mobile sm:text-control-xl",
};

const EmptyValueLabel = React.createContext<React.ReactNode>(undefined);
function triggerState(state: SelectPrimitive.Trigger.State): SelectPrimitive.Trigger.State {
  return state.value === "" ? { ...state, placeholder: false } : state;
}

function TriggerElement({ elementProps, state, render }: { elementProps: React.ComponentPropsWithRef<"button">; state: SelectPrimitive.Trigger.State; render: SelectTriggerProps["render"] }) {
  const { ref, ...props } = elementProps;
  return useRender({ defaultTagName: "button", ref, render: typeof render === "function" ? (p) => render(p, state) : render, props: { ...props, "data-placeholder": state.placeholder ? "" : undefined } });
}

function ValueElement({ elementProps, state, render }: { elementProps: React.ComponentPropsWithRef<"span">; state: SelectPrimitive.Value.State; render: SelectValueProps["render"] }) {
  const { ref, ...props } = elementProps;
  return useRender({ defaultTagName: "span", ref, render: typeof render === "function" ? (p) => render(p, state) : render, props: { ...props, "data-placeholder": state.placeholder ? "" : undefined } });
}

/** 单值选择，null 是未选择。展开列表默认不阻断其余字段。 */
export function Select<Value>({ modal = false, ...props }: SelectProps<Value>) {
  // Base UI 1.7 把序列化为 "" 的值视为占位。这里只修正空字符串的名称与占位表达，
  // 值、隐藏 input、键盘及校验仍由原语拥有，不伪造另一套选择状态。
  const items = props.items;
  const emptyLabel = Array.isArray(items)
    ? items.flatMap(item => "items" in item ? item.items : [item]).find(item => item.value === "")?.label
    : (items as Record<string, React.ReactNode> | undefined)?.[""];
  return <EmptyValueLabel.Provider value={emptyLabel}><SelectPrimitive.Root {...props} multiple={false} modal={modal} /></EmptyValueLabel.Provider>;
}

export function SelectTrigger({ size = "md", children, className, style, render, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }: SelectTriggerProps) {
  const variables = {
    "--qy-select-height": `var(--qy-control-${size})`,
    "--qy-select-height-narrow": `var(--qy-control-${size}-narrow)`,
    "--qy-select-padding": `var(--qy-control-${size}-padding-bordered)`,
    "--qy-select-icon": `var(--qy-control-${size}-icon)`,
    "--qy-select-icon-narrow": `var(--qy-control-${size}-icon-narrow)`,
    ...(size === "xs" || size === "sm" ? { "--qy-radius-control": `var(--qy-radius-${size})` } : {}),
  } as React.CSSProperties;
  return <SelectPrimitive.Trigger
    data-slot="select-trigger" data-size={size} {...props}
    aria-label={ariaLabel}
    // Base UI adds FieldLabel automatically; an explicit name must override it.
    aria-labelledby={ariaLabelledBy ?? (ariaLabel ? "" : undefined)}
    render={(elementProps, state) => <TriggerElement elementProps={elementProps} state={triggerState(state)} render={render} />}
    className={(state) => cn(
      "inline-flex w-full min-w-0 items-center justify-between gap-(--qy-field-gap) min-h-(--qy-select-height-narrow) sm:min-h-(--qy-select-height) pointer-coarse:min-h-(--qy-touch-target) rounded-control border border-input bg-card px-(--qy-select-padding) text-foreground outline-none dark:bg-surface-inset transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong",
      textProfiles[size],
      state.disabled && "cursor-not-allowed opacity-64",
      state.readOnly && "border-dashed",
      typeof className === "function" ? className(triggerState(state)) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(triggerState(state)) : style) })}
  >{children ?? <SelectValue />}
    <SelectPrimitive.Icon data-slot="select-icon" className="pointer-events-none flex shrink-0 items-center text-muted-foreground">
      <ChevronDownIcon aria-hidden="true" className="size-(--qy-select-icon-narrow) sm:size-(--qy-select-icon)" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>;
}

export function SelectValue({ placeholder, className, style, render, children, ...props }: SelectValueProps) {
  const { messages } = useUILocale();
  const emptyLabel = React.useContext(EmptyValueLabel);
  const valueState = (state: SelectPrimitive.Value.State) => state.value === "" ? { ...state, placeholder: false } : state;
  return <SelectPrimitive.Value
    data-slot="select-value" {...props} placeholder={placeholder ?? messages.selectPlaceholder}
    className={(state) => cn("min-w-0 text-start whitespace-normal wrap-break-word data-placeholder:text-muted-foreground", typeof className === "function" ? className(valueState(state)) : className)}
    style={typeof style === "function" ? (state) => style(valueState(state)) : style}
    render={(elementProps, state) => <ValueElement elementProps={state.value === "" && children == null ? { ...elementProps, children: emptyLabel ?? "" } : elementProps} state={valueState(state)} render={render} />}
  >{children}</SelectPrimitive.Value>;
}

/** 入退交给 motion.css；候选继承实际所属工作面的层级。 */
export function SelectPopup({ container, side = "bottom", align = "start", sideOffset = 0, alignOffset, alignItemWithTrigger = false, positionerProps, className, children, ...props }: SelectPopupProps) {
  const layer = useFloatingLayer("popup");
  return <SelectPrimitive.Portal container={container} data-slot="select-portal">
    <SelectPrimitive.Positioner
      data-slot="select-positioner" side={side} align={align} alignOffset={alignOffset} alignItemWithTrigger={alignItemWithTrigger}
      sideOffset={sideOffset}
      {...positionerProps}
      style={state => ({ ...layer, ...(typeof positionerProps?.style === "function" ? positionerProps.style(state) : positionerProps?.style) })}
    >
      <SelectPrimitive.Popup
        data-slot="select-popup" {...props}
        className={(state) => cn("min-w-(--anchor-width) max-w-(--available-width) rounded-overlay border border-border-strong bg-surface-raised text-foreground outline-none origin-(--transform-origin) focus-visible:border-ring", typeof className === "function" ? className(state) : className)}
      >
        <SelectPrimitive.List data-slot="select-list" className="max-h-(--available-height) overflow-y-auto overscroll-contain p-(--qy-space-1)">{children}</SelectPrimitive.List>
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>;
}

export function SelectItem({ children, className, ...props }: SelectItemProps) {
  return <SelectPrimitive.Item
    data-slot="select-item" {...props}
    className={(state) => cn("grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-(--qy-field-gap) rounded-item px-(--qy-control-md-padding) py-(--qy-space-1) text-control-md-mobile sm:text-control-md outline-none data-highlighted:bg-accent data-disabled:cursor-not-allowed data-disabled:opacity-64", typeof className === "function" ? className(state) : className)}
  >
    <SelectPrimitive.ItemText data-slot="select-item-text" className="min-w-0 whitespace-normal wrap-break-word">{children}</SelectPrimitive.ItemText>
    <span aria-hidden="true" className="flex size-(--qy-control-md-icon-narrow) items-center justify-center sm:size-(--qy-control-md-icon)">
      <SelectPrimitive.ItemIndicator data-slot="select-item-indicator"><CheckIcon aria-hidden="true" className="size-full" /></SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>;
}

export function SelectGroup({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} className={(state) => cn("min-w-0", typeof className === "function" ? className(state) : className)} />;
}

export function SelectGroupLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return <SelectPrimitive.GroupLabel data-slot="select-group-label" {...props} className={(state) => cn("min-w-0 px-(--qy-control-md-padding) py-(--qy-space-1) text-label text-muted-foreground wrap-break-word", typeof className === "function" ? className(state) : className)} />;
}

export { SelectPrimitive };
