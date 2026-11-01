"use client";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { useRender } from "@base-ui/react/use-render";
import { IconCheck, IconChevronDown, IconLoader2 } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { overlayGroupLabelClassName } from "../overlay-group";
import { candidateEmptyClassName, candidateItemClassName, overlayItemClassName } from "../overlay-item";
import { cn } from "../utils";
import { fillStateByData } from "../fill-state";
import { popupOffset, useFloatingLayer } from "../floating-layer";

// Keep Node's ambient types out of the browser library; process may be absent.
declare const process: { env: { NODE_ENV?: string } };

export type SelectProps<Value = unknown, Multiple extends boolean | undefined = false> = SelectPrimitive.Root.Props<Value, Multiple> & {
  /** 应用正在取候选这一事实：触发器与候选面标 aria-busy，候选面显示等待记号与「正在加载」。组件不发请求、不推断结果。 */
  loading?: boolean | undefined;
  /** 取候选失败时由应用提供的内容（说明与重试动作）；候选面以 role="alert" 摆放，组件不推断失败、不写原因。 */
  error?: React.ReactNode;
};
export type SelectTriggerProps = React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  /** 由 InputGroup 提供共同边界时使用：不自己画边框、底色与状态，几何与原生语义不变。 */
  unstyled?: boolean;
};
export type SelectValueProps = React.ComponentProps<typeof SelectPrimitive.Value>;
export type SelectItemProps = React.ComponentProps<typeof SelectPrimitive.Item>;
export type SelectPopupProps = React.ComponentProps<typeof SelectPrimitive.Popup> &
  Pick<SelectPrimitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignOffset" | "alignItemWithTrigger"> &
  Pick<SelectPrimitive.Portal.Props, "container"> & {
    positionerProps?: SelectPrimitive.Positioner.Props;
    /** 没有子项时的说法；省略时用内置的「没有可选项」。应用若要说明查询对象，在这里给出。 */
    emptyContent?: React.ReactNode;
  };

// 基础层 §2/§8、用户裁决 2026-10-05：Select 是填值控件，只有一套几何，
// 跟随密度轴；已选择的值是内容，字号不随容器高度变化。
const textProfile = "text-control-md-mobile sm:text-control-md";

const EmptyValueLabel = React.createContext<React.ReactNode>(undefined);
// 全部候选的名称（来自 Select 的 `items`）。触发器的宽度由它们中最长的一个决定，而不是由当前所选的那一个（见 SelectValue）。
const ItemLabels = React.createContext<readonly React.ReactNode[]>([]);
function itemLabels(items: unknown): React.ReactNode[] {
  if (items === undefined || items === null) return [];
  const flat = Array.isArray(items)
    ? (items as Array<{ label?: React.ReactNode; items?: Array<{ label?: React.ReactNode }> }>).flatMap(item => "items" in item && item.items ? item.items : [item])
    : Object.values(items as Record<string, React.ReactNode>).map(label => ({ label }));
  // 同名只留一个：字符串名称按字面去重，其余节点原样保留。
  const seen = new Set<string>();
  const labels: React.ReactNode[] = [];
  for (const { label } of flat) {
    if (label === undefined || label === null || label === false || label === "") continue;
    if (typeof label === "string" || typeof label === "number") { if (seen.has(String(label))) continue; seen.add(String(label)); }
    labels.push(label);
  }
  return labels;
}
// 值 → 名称与次序（来自 Select 的 `items`）。多选的触发器要把已选的值说成名称，并按候选的次序摆放，
// 而不是按点击的先后——同一组已选项无论怎么选到的，说法一致。
type ItemIndex = ReadonlyMap<unknown, { label: React.ReactNode; index: number }>;
function itemIndex(items: unknown): ItemIndex {
  const map = new Map<unknown, { label: React.ReactNode; index: number }>();
  if (items === undefined || items === null) return map;
  const entries: Array<[unknown, React.ReactNode]> = Array.isArray(items)
    ? (items as Array<{ value?: unknown; label?: React.ReactNode; items?: Array<{ value?: unknown; label?: React.ReactNode }> }>)
        .flatMap(item => "items" in item && item.items ? item.items : [item])
        .map(item => [item.value, item.label] as [unknown, React.ReactNode])
    : Object.entries(items as Record<string, React.ReactNode>);
  for (const [value, label] of entries) if (!map.has(value)) map.set(value, { label, index: map.size });
  return map;
}
// 多选的触发器最多点名几项；超出写「首项 及其余 N 项」。预设：与 TreeSelect 的 NAMED 同一取值，
// 两个名字在常见触发器宽度内通常不被截断；要换时两处一起换。
const NAMED = 2;
const MultipleState = React.createContext<{ multiple: boolean; index: ItemIndex; itemToStringLabel: ((value: unknown) => string) | undefined }>({ multiple: false, index: new Map(), itemToStringLabel: undefined });

// 候选来源的三种非常态（M2）：加载、失败、空。前两者是应用告知的事实，经 Select 根传到触发器与候选面；
// 空则是候选面自己看得见的事实（没有可渲染的子项）。三者互斥地占「第一项的位置」，不并存。
const SourceState = React.createContext<{ loading: boolean; error: React.ReactNode; readOnly: boolean }>({ loading: false, error: undefined, readOnly: false });
const hasError = (error: React.ReactNode) => error !== undefined && error !== null && error !== false && error !== "";
function hasContent(node: React.ReactNode): boolean {
  if (node === null || node === undefined || typeof node === "boolean" || node === "") return false;
  if (Array.isArray(node)) return node.some(hasContent);
  if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.type === React.Fragment) return hasContent(node.props.children);
  return true;
}
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
export function Select<Value, Multiple extends boolean | undefined = false>({ modal = false, loading = false, error, ...props }: SelectProps<Value, Multiple>) {
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
  // 只读保留当前值，不打开候选（基础层 §9「只读与禁用」）。Base UI 1.8 起只读的 Select 可以打开浏览；
  // 本库只读的含义是「值在、可聚焦、可读出」，候选面是改值的入口，所以在打开请求处取消，关闭照常。
  const { readOnly, onOpenChange } = props;
  const source = React.useMemo(() => ({ loading, error, readOnly: Boolean(readOnly) }), [loading, error, readOnly]);
  const labels = React.useMemo(() => itemLabels(items), [items]);
  const multiple = Boolean(props.multiple);
  const itemToStringLabel = props.itemToStringLabel as ((value: unknown) => string) | undefined;
  const index = React.useMemo(() => itemIndex(items), [items]);
  const multipleState = React.useMemo(() => ({ multiple, index, itemToStringLabel }), [multiple, index, itemToStringLabel]);
  return <EmptyValueLabel.Provider value={emptyLabel}><ItemLabels.Provider value={labels}><MultipleState.Provider value={multipleState}><SourceState.Provider value={source}><SelectPrimitive.Root {...props as SelectPrimitive.Root.Props<Value, Multiple>} modal={modal}
    onOpenChange={(open, details) => { if (open && readOnly) { details.cancel(); return; } onOpenChange?.(open, details); }} /></SourceState.Provider></MultipleState.Provider></ItemLabels.Provider></EmptyValueLabel.Provider>;
}

export function SelectTrigger({ children, className, style, render, unstyled = false, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, ...props }: SelectTriggerProps) {
  const variables = {
    "--qy-select-height": "var(--qy-fill-height)",
    "--qy-select-height-narrow": "var(--qy-fill-height-narrow)",
    "--qy-select-padding": "var(--qy-fill-padding)",
    "--qy-select-icon": "var(--qy-fill-icon)",
    "--qy-select-icon-narrow": "var(--qy-fill-icon-narrow)",
  } as React.CSSProperties;
  const { loading, readOnly } = React.useContext(SourceState);
  const { messages } = useUILocale();
  return <SelectPrimitive.Trigger
    data-slot="select-trigger" aria-busy={loading || undefined} {...props}
    aria-label={ariaLabel}
    // Base UI adds FieldLabel automatically; an explicit name must override it.
    aria-labelledby={ariaLabelledBy ?? (ariaLabel ? "" : undefined)}
    render={(elementProps, state) => <TriggerElement elementProps={elementProps} state={triggerState(state)} render={render} />}
    className={(state) => cn(
      // 基础层 §2、§6（2026-10-05 打磨）：Select 是**选值**控件，默认宽度跟着值走，
      // 不默认拉满容器——一个「已选择：中」的触发器横跨 800px 时，文字与箭头之间会
      // 空出一大片，读不出「这里装的是一个值」。宽度由 w-fit 交给内容决定，
      // 下限只保证占位文字与箭头放得下（留白×2 + 箭头 + 字段间隔 + --qy-field-min-text）。
      // 「跟着值走」指跟着这一组候选，不是跟着当前所选的那一个：选另一项时触发器不应伸缩，
      // 把周围的版面推来推去。宽度因此由最长的候选名称撑出（SelectValue 里的隐形占位，名称来自 `items`）。
      // 要拉满时由调用方给 className（如 `w-full`），这属于版式决定，不是控件默认。
      "inline-flex w-fit max-w-full items-center justify-between gap-(--qy-field-gap) px-(--qy-select-padding) text-foreground outline-none",
      unstyled
        // 边线、底色与状态由外框（InputGroup）承担；最小高度 = 外高 − 上下两道线（--qy-line-width），与 Input 的 unstyled 同一关系。
        ? "min-h-[calc(var(--qy-select-height-narrow)-2*var(--qy-line-width))] sm:min-h-[calc(var(--qy-select-height)-2*var(--qy-line-width))] pointer-coarse:min-h-[calc(var(--qy-touch-target)-2*var(--qy-line-width))] rounded-[max(0px,calc(var(--qy-fill-radius)-var(--qy-line-width)))] data-disabled:cursor-not-allowed data-disabled:text-muted-foreground"
        : "min-h-(--qy-select-height-narrow) sm:min-h-(--qy-select-height) pointer-coarse:min-h-(--qy-touch-target) rounded-(--qy-fill-radius) border border-input bg-surface-field transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong",
      "min-w-[calc(var(--qy-select-padding)*2+var(--qy-select-icon)+var(--qy-field-gap)+var(--qy-field-min-text))]",
      textProfile,
      // 基础层 §5、§9（2026-10-05 打磨）：只读保留可读的底，禁用才用不活跃承载面。
      !unstyled && fillStateByData,
      !unstyled && state.disabled && "bg-surface-inset text-muted-foreground",
      typeof className === "function" ? className(triggerState(state)) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(triggerState(state)) : style) })}
  >{children ?? <SelectValue />}
    {/* 只读说明与 Input 同一件事、同一档字；只读本身由触发器的 aria-readonly 向读屏表达，故 aria-hidden。ms-auto 让它贴着箭头，而不是被两端对齐拉到中间。 */}
    {readOnly ? <span data-slot="select-readonly" aria-hidden="true" className="ms-auto shrink-0 text-caption text-muted-foreground">{messages.readOnly}</span> : null}
    <SelectPrimitive.Icon data-slot="select-icon" className="pointer-events-none flex shrink-0 items-center text-muted-foreground">
      <IconChevronDown aria-hidden="true" className="size-(--qy-select-icon-narrow) sm:size-(--qy-select-icon)" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>;
}

export function SelectValue({ placeholder, className, style, render, children, ...props }: SelectValueProps) {
  const { messages } = useUILocale();
  const emptyLabel = React.useContext(EmptyValueLabel);
  const labels = React.useContext(ItemLabels);
  const { multiple, index, itemToStringLabel } = React.useContext(MultipleState);
  const shownPlaceholder = placeholder ?? messages.selectPlaceholder;
  // 多选的触发器是已确认值的摘要，不是列表（名实相符：说出选了什么，也说出还有多少没点名）：
  // 不超过 NAMED 项逐个点名并用顿号相连，更多则「首项 及其余 N 项」。没有选择时回到占位文字。
  // 点名的次序是候选的次序，不是点击的先后。完整的已选项由打开后的候选面（每项的勾）呈现。
  const summarize = (value: unknown): React.ReactNode => {
    const values = Array.isArray(value) ? value : [];
    if (values.length === 0) return shownPlaceholder;
    const ordered = values.map((item, position) => ({ item, position, rank: index.get(item)?.index ?? Number.POSITIVE_INFINITY }))
      .sort((a, b) => a.rank - b.rank || a.position - b.position);
    const names = ordered.map(({ item }) => index.get(item)?.label ?? itemToStringLabel?.(item) ?? String(item));
    if (names.length <= NAMED) return names.map((name, position) => <React.Fragment key={position}>{position > 0 ? messages.selectSeparator : null}{name}</React.Fragment>);
    return <>{names[0]} {messages.selectMore(names.length - 1)}</>;
  };
  const summary = multiple && children == null ? summarize : undefined;
  const valueState = (state: SelectPrimitive.Value.State) => state.value === "" ? { ...state, placeholder: false } : state;
  // 稳定宽度：当前值与全部候选（及占位文字）叠在同一个网格格子里，格子宽 = 其中最长者；隐形的那些不占高度、不进读屏。
  // 字符串名称用 `content: attr()` 画，不在 DOM 里留第二份文字（文本查询与复制都只见真实的那一份）；
  // 其余节点（带图标的名称等）原样放入。调用方自带 children 时，显示什么由它负责，不做占位。
  const placeholderSizer = typeof shownPlaceholder === "string" || typeof shownPlaceholder === "number" ? [shownPlaceholder] : [];
  // 多选的说法是几个名字的组合，不是单个名称：宽度按「最长的两个名字相连」与「最长的名字 及其余 N 项」两种上界估计
  // （以字数比长短，是近似；名称不是纯文字时不估计，宽度跟随内容）。
  const longest = labels.every(label => typeof label === "string" || typeof label === "number") ? labels.map(String).sort((a, b) => b.length - a.length) : [];
  const multipleSizers = longest.length === 0 ? [] : [
    longest.slice(0, NAMED).join(messages.selectSeparator),
    ...(longest.length > NAMED ? [`${longest[0]} ${messages.selectMore(longest.length - 1)}`] : []),
  ];
  const sizers = children != null ? [] : multiple ? [...multipleSizers, ...placeholderSizer] : [...labels, ...placeholderSizer];
  const value = <SelectPrimitive.Value
    data-slot="select-value" {...props} placeholder={shownPlaceholder}
    className={(state) => cn("col-start-1 row-start-1 min-w-0 text-start whitespace-normal wrap-break-word data-placeholder:text-muted-foreground", typeof className === "function" ? className(valueState(state)) : className)}
    style={typeof style === "function" ? (state) => style(valueState(state)) : style}
    render={(elementProps, state) => <ValueElement elementProps={state.value === "" && children == null ? { ...elementProps, children: emptyLabel ?? "" } : elementProps} state={valueState(state)} render={render} />}
  >{children ?? summary}</SelectPrimitive.Value>;
  if (!sizers.length) return value;
  return <span data-slot="select-value-box" className="inline-grid min-w-0">
    {value}
    {sizers.map((label, index) => typeof label === "string" || typeof label === "number"
      ? <span key={index} aria-hidden="true" data-slot="select-value-sizer" data-label={label} className="pointer-events-none invisible col-start-1 row-start-1 h-0 overflow-hidden whitespace-nowrap before:content-[attr(data-label)]" />
      : <span key={index} aria-hidden="true" data-slot="select-value-sizer" className="pointer-events-none invisible col-start-1 row-start-1 h-0 overflow-hidden whitespace-nowrap">{label}</span>)}
  </span>;
}

/** 入退交给 motion.css；候选继承实际所属工作面的层级。边界与阴影档同 Popover（见 popover.tsx 的 PopoverPopup）。 */
export function SelectPopup({ container, side = "bottom", align = "start", sideOffset = popupOffset, alignOffset, alignItemWithTrigger = false, positionerProps, className, children, emptyContent, ...props }: SelectPopupProps) {
  const layer = useFloatingLayer("popup");
  const { messages } = useUILocale();
  const { loading, error } = React.useContext(SourceState);
  const failed = hasError(error);
  // 加载不是「没有」（§9：等待与结果是两件事），失败更不是；只有两者都不是、且确实没有子项时才说没有可选项。
  const empty = !loading && !failed && !hasContent(children);
  // 三种说法坐在第一项的位置上：同一起点、同一行高、同一字号（candidateEmptyClassName）；
  // 等待记号的尺寸读填值图标角色（与候选项尾部对勾同一尺寸），不新增取值。
  const marker = "size-(--qy-fill-icon-narrow) shrink-0 sm:size-(--qy-fill-icon)";
  return <SelectPrimitive.Portal container={container} data-slot="select-portal">
    <SelectPrimitive.Positioner
      data-slot="select-positioner" side={side} align={align} alignOffset={alignOffset} alignItemWithTrigger={alignItemWithTrigger}
      sideOffset={sideOffset}
      {...positionerProps}
      style={state => ({ ...layer, ...(typeof positionerProps?.style === "function" ? positionerProps.style(state) : positionerProps?.style) })}
    >
      <SelectPrimitive.Popup
        data-slot="select-popup" {...props}
        className={(state) => cn("qy-select-popup min-w-(--anchor-width) max-w-(--available-width) rounded-overlay border border-border bg-surface-raised text-foreground shadow-raised outline-none origin-(--transform-origin) focus-visible:border-ring", typeof className === "function" ? className(state) : className)}
      >
        {failed && <div role="alert" data-slot="select-error" className={cn(candidateEmptyClassName, "flex flex-wrap items-center gap-(--qy-field-gap) text-foreground")}>{error}</div>}
        {loading && !failed && <div role="status" data-slot="select-loading" className={cn(candidateEmptyClassName, "flex items-center gap-(--qy-field-gap)")}><IconLoader2 aria-hidden="true" className={cn("qy-spin", marker)} />{messages.loading}</div>}
        {empty && <div data-slot="select-empty" className={candidateEmptyClassName}>{emptyContent ?? messages.selectEmpty}</div>}
        <SelectPrimitive.List data-slot="select-list" aria-busy={loading || undefined} className="max-h-(--available-height) overflow-y-auto overscroll-contain p-(--qy-overlay-inset) empty:p-0">{children}</SelectPrimitive.List>
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
  return <SelectPrimitive.GroupLabel data-slot="select-group-label" {...props} className={(state) => cn(overlayGroupLabelClassName, typeof className === "function" ? className(state) : className)} />;
}

export { SelectPrimitive };
