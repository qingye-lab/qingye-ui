"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useRender } from "@base-ui/react/use-render";
import { IconCheck, IconChevronDown } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { candidateItemClassName, overlayItemClassName } from "../overlay-item";
import { cn } from "../utils";
import { fillStateByData } from "../fill-state";
import { useFloatingLayer } from "../floating-layer";

// Keep Node's ambient types out of the browser library; process may be absent.
declare const process: { env: { NODE_ENV?: string } };

export type SelectProps<Value = unknown> = Omit<SelectPrimitive.Root.Props<Value, false>, "multiple">;
export type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger>;
export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;
export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;
export type SelectPopupProps = React.ComponentProps<typeof SelectPrimitive.Popup> &
  Pick<SelectPrimitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignOffset" | "alignItemWithTrigger"> &
  Pick<SelectPrimitive.Portal.Props, "container"> & { positionerProps?: SelectPrimitive.Positioner.Props };

// 基础层 §2/§8、用户裁决 2026-10-05：Select 是填值控件，只有一套几何，
// 跟随密度轴；已选择的值是内容，字号不随容器高度变化。
const textProfile = "text-control-md-mobile sm:text-control-md";

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
  // 名实相符（2026-10-05 打磨）：没有 items 时，触发器拿不到「值→名称」的表，只能显示原始值
  // （例如 compact 而不是「紧凑密度」）——候选面没打开，SelectItem 的文字还不存在。这是静默的
  // 错误，因此开发环境里明确提示。生产环境不提示也不改写值。
  const hasValue = props.value !== undefined && props.value !== null || props.defaultValue !== undefined && props.defaultValue !== null;
  React.useEffect(() => {
    if (typeof process === "undefined" || process.env.NODE_ENV === "production") return;
    if (hasValue && items === undefined) console.warn("Select: a value is set but `items` is missing, so the trigger shows the raw value instead of its label. Pass `items` (value → label).");
  }, [hasValue, items]);
  return <EmptyValueLabel.Provider value={emptyLabel}><SelectPrimitive.Root {...props} multiple={false} modal={modal} /></EmptyValueLabel.Provider>;
}

export function SelectTrigger({ children, className, style, render, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }: SelectTriggerProps) {
  const variables = {
    "--qy-select-height": "var(--qy-fill-height)",
    "--qy-select-height-narrow": "var(--qy-fill-height-narrow)",
    "--qy-select-padding": "var(--qy-fill-padding)",
    "--qy-select-icon": "var(--qy-fill-icon)",
    "--qy-select-icon-narrow": "var(--qy-fill-icon-narrow)",
  } as React.CSSProperties;
  return <SelectPrimitive.Trigger
    data-slot="select-trigger" {...props}
    aria-label={ariaLabel}
    // Base UI adds FieldLabel automatically; an explicit name must override it.
    aria-labelledby={ariaLabelledBy ?? (ariaLabel ? "" : undefined)}
    render={(elementProps, state) => <TriggerElement elementProps={elementProps} state={triggerState(state)} render={render} />}
    className={(state) => cn(
      // 基础层 §2、§6（2026-10-05 打磨）：Select 是**选值**控件，默认宽度跟着值走，
      // 不默认拉满容器——一个「已选择：中」的触发器横跨 800px 时，文字与箭头之间会
      // 空出一大片，读不出「这里装的是一个值」。宽度由 w-fit 交给内容决定，
      // 下限只保证占位文字与箭头放得下（留白×2 + 箭头 + 字段间隔 + 4em）。
      // 要拉满时由调用方给 className（如 `w-full`），这属于版式决定，不是控件默认。
      "inline-flex w-fit max-w-full items-center justify-between gap-(--qy-field-gap) min-h-(--qy-select-height-narrow) sm:min-h-(--qy-select-height) pointer-coarse:min-h-(--qy-touch-target) rounded-(--qy-fill-radius) border border-input bg-card px-(--qy-select-padding) text-foreground outline-none dark:bg-surface-inset transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong",
      "min-w-[calc(var(--qy-select-padding)*2+var(--qy-select-icon)+var(--qy-field-gap)+4em)]",
      textProfile,
      // 基础层 §5、§9（2026-10-05 打磨）：只读保留可读的底，禁用才用不活跃承载面。
      fillStateByData,
      state.disabled && "bg-surface-inset text-muted-foreground",
      typeof className === "function" ? className(triggerState(state)) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(triggerState(state)) : style) })}
  >{children ?? <SelectValue />}
    <SelectPrimitive.Icon data-slot="select-icon" className="pointer-events-none flex shrink-0 items-center text-muted-foreground">
      <IconChevronDown aria-hidden="true" className="size-(--qy-select-icon-narrow) sm:size-(--qy-select-icon)" />
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
export function SelectPopup({ container, side = "bottom", align = "start", sideOffset = 4, alignOffset, alignItemWithTrigger = false, positionerProps, className, children, ...props }: SelectPopupProps) {
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
        className={(state) => cn("min-w-(--anchor-width) max-w-(--available-width) rounded-overlay border border-border bg-surface-raised text-foreground shadow-raised outline-none origin-(--transform-origin) focus-visible:border-ring", typeof className === "function" ? className(state) : className)}
      >
        <SelectPrimitive.List data-slot="select-list" className="max-h-(--available-height) overflow-y-auto overscroll-contain p-(--qy-overlay-inset)">{children}</SelectPrimitive.List>
      </SelectPrimitive.Popup>
    </SelectPrimitive.Positioner>
  </SelectPrimitive.Portal>;
}

export function SelectItem({ children, className, ...props }: SelectItemProps) {
  return <SelectPrimitive.Item
    data-slot="select-item" {...props}
    className={(state) => cn("grid grid-cols-[minmax(0,1fr)_auto] items-center", overlayItemClassName, candidateItemClassName, typeof className === "function" ? className(state) : className)}
  >
    <SelectPrimitive.ItemText data-slot="select-item-text" className="min-w-0 whitespace-normal wrap-break-word">{children}</SelectPrimitive.ItemText>
    <span aria-hidden="true" className="flex size-(--qy-fill-icon-narrow) items-center justify-center sm:size-(--qy-fill-icon)">
      <SelectPrimitive.ItemIndicator data-slot="select-item-indicator"><IconCheck aria-hidden="true" className="size-full" /></SelectPrimitive.ItemIndicator>
    </span>
  </SelectPrimitive.Item>;
}

export function SelectGroup({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} className={(state) => cn("min-w-0", typeof className === "function" ? className(state) : className)} />;
}

export function SelectGroupLabel({ className, ...props }: React.ComponentProps<typeof SelectPrimitive.GroupLabel>) {
  return <SelectPrimitive.GroupLabel data-slot="select-group-label" {...props} className={(state) => cn("min-w-0 px-[calc(var(--qy-control-md-padding-bordered)-var(--qy-overlay-inset))] pt-(--qy-space-2) pb-(--qy-space-1) text-caption text-muted-foreground wrap-break-word", typeof className === "function" ? className(state) : className)} />;
}

export { SelectPrimitive };
