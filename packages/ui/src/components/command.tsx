"use client";

import { Autocomplete as AutocompletePrimitive } from "@base-ui/react/autocomplete";
import * as React from "react";
import { useUILocale } from "../locale";
import { overlayGroupLabelClassName, overlaySeparatorClassName } from "../overlay-group";
import { candidateEmptyClassName, commandItemFrame, overlayItemClassName } from "../overlay-item";
import { isName, received } from "../require-name";
import { cn } from "../utils";
import { AutocompleteInput } from "./autocomplete";
import { buttonVariants } from "./button";
import { Dialog, DialogPopup } from "./dialog";
import { Kbd } from "./kbd";

/*
 * 命令面板（基础层 §4、§6、§8）：一个输入框加一张常开的命令列表，用来「跳到某处」或「执行某事」。
 * 语义是 combobox + listbox，高亮用 aria-activedescendant，焦点始终留在输入框，全部由 Base UI 的
 * Autocomplete（inline + open）承担；本文件只补三件原语不给的事：
 *   1. 条目由 JSX 写出（cmdk 的形状），所以过滤在条目自己身上：不匹配的条目不渲染；
 *   2. 没有可见条目的组整组收起，全无结果时才出空态——靠条目向上登记可见与否；
 *   3. 命令的外观与 Menu 项同一几何（命令是动作，不是值）。
 * 全局快捷键（⌘K）不在这里注册，那是应用的事。
 */

export type CommandFilterEntry = { value: string; label: string; keywords: readonly string[] };
/** 返回 true 即显示。query 已去掉首尾空白；空查询不会传入（恒显示）。 */
export type CommandFilter = (entry: CommandFilterEntry, query: string) => boolean;

/** 默认：不区分大小写，value / label / keywords 任一包含查询即匹配；中文直接包含匹配。 */
const defaultFilter: CommandFilter = (entry, query) => {
  const needle = query.toLowerCase();
  return [entry.value, entry.label, ...entry.keywords].some(text => text.toLowerCase().includes(needle));
};

// 登记：条目按 id 报告自己是否可见；组与 Command 各持一份计数，互不影响。
function useVisibleCount() {
  const ids = React.useRef(new Set<string>());
  const [count, setCount] = React.useState(0);
  const report = React.useCallback((id: string, visible: boolean) => {
    const set = ids.current;
    if (set.has(id) === visible) return;
    if (visible) set.add(id); else set.delete(id);
    setCount(set.size);
  }, []);
  return { count, report };
}

type Report = (id: string, visible: boolean) => void;
type CommandState = { query: string; filter: CommandFilter; ready: boolean; report: Report; onItemSelect: ((value: string) => void) | undefined };
const StateContext = React.createContext<CommandState | null>(null);
const CountContext = React.createContext(0);
const GroupReport = React.createContext<Report | null>(null);
function useCommandState(part: string): CommandState {
  const state = React.useContext(StateContext);
  if (!state) throw new Error(`${part} must be rendered inside Command.`);
  return state;
}

export type CommandProps = Omit<React.ComponentProps<"div">, "onChange" | "defaultValue"> & {
  /** 覆盖默认过滤。 */
  filter?: CommandFilter;
  /** 查询文字；受控。 */
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (query: string) => void;
  /** 任一条目被选中后调用（在条目自己的 onSelect 之后）；CommandDialog 靠它关闭。 */
  onItemSelect?: (value: string) => void;
};

/** 命令列表本体。可单独嵌在页面里，也可放进 CommandDialog。 */
export function Command({ filter = defaultFilter, query: queryProp, defaultQuery = "", onQueryChange, onItemSelect, className, children, ...props }: CommandProps) {
  const [inner, setInner] = React.useState(defaultQuery);
  const query = queryProp ?? inner;
  const { count, report } = useVisibleCount();
  const [ready, setReady] = React.useState(false);
  // 条目的登记在挂载后才完整；此前不收组、不出空态，避免服务端输出与首帧误报「没有结果」。
  React.useEffect(() => setReady(true), []);
  const state = React.useMemo<CommandState>(() => ({ query: query.trim(), filter, ready, report, onItemSelect }), [query, filter, ready, report, onItemSelect]);
  return <StateContext.Provider value={state}><CountContext.Provider value={count}>
    <AutocompletePrimitive.Root inline open autoHighlight="always" keepHighlight value={query}
      onValueChange={(next, details) => {
        // 选中条目会让原语把条目文字填回输入框；命令不是「填值」，查询保持原样。
        if (details.reason === "item-press") return;
        if (queryProp === undefined) setInner(next);
        onQueryChange?.(next);
      }}>
      <div data-slot="command" {...props} className={cn("flex min-h-0 min-w-0 flex-col gap-(--qy-field-gap)", className)}>{children}</div>
    </AutocompletePrimitive.Root>
  </CountContext.Provider></StateContext.Provider>;
}

export type CommandInputProps = Omit<React.ComponentProps<typeof AutocompleteInput>, "value" | "defaultValue">;
/** 查询框。没有名字读屏无从识别它，所以缺 aria-label / aria-labelledby 时抛错。 */
export function CommandInput(props: CommandInputProps) {
  if (!isName(props["aria-label"]) && !isName(props["aria-labelledby"])) throw new Error(`CommandInput requires a nonempty aria-label or aria-labelledby naming the search box; received aria-label ${received(props["aria-label"])} and aria-labelledby ${received(props["aria-labelledby"])}.`);
  return <AutocompleteInput data-slot="command-input" {...props} />;
}

export type CommandListProps = React.ComponentProps<"div">;
/*
 * 列表最大高度取 60dvh（预设）：关系是「列表之外还要放输入框、面板内边距和视口上下的留白」，
 * 把视口的六成给列表，其余四成留给这些；用动态视口单位，移动浏览器地址栏伸缩时也不会比可见区域高。
 * 内容少时按内容高，超出在列表内滚动，输入框始终在顶部可见。
 */
export function CommandList({ className, ...props }: CommandListProps) {
  return <AutocompletePrimitive.List data-slot="command-list" {...props} className={state => cn("min-h-0 max-h-[60dvh] overflow-y-auto overscroll-contain p-(--qy-overlay-inset)", typeof className === "function" ? (className as (s: typeof state) => string)(state) : className)} />;
}

export type CommandGroupProps = Omit<React.ComponentProps<"div">, "children"> & {
  /** 组名；也是读屏读到的组名称（group 的 aria-labelledby 指向它）。 */
  heading: React.ReactNode;
  children?: React.ReactNode;
};
export function CommandGroup({ heading, className, children, ...props }: CommandGroupProps) {
  const { ready, report: reportToCommand } = useCommandState("CommandGroup");
  const { count, report } = useVisibleCount();
  // 条目同时向组与 Command 报告，两份计数各管各的。
  const both = React.useCallback<Report>((id, visible) => { report(id, visible); reportToCommand(id, visible); }, [report, reportToCommand]);
  return <GroupReport.Provider value={both}>
    <AutocompletePrimitive.Group data-slot="command-group" hidden={ready && count === 0 ? true : undefined} {...props} className={cn("min-w-0", className)}>
      <AutocompletePrimitive.GroupLabel data-slot="command-group-label" className={overlayGroupLabelClassName}>{heading}</AutocompletePrimitive.GroupLabel>
      {children}
    </AutocompletePrimitive.Group>
  </GroupReport.Provider>;
}

export type CommandSeparatorProps = React.ComponentProps<"div">;
/** 组与组之间的分界。查询非空时组会随结果收起，分界没有意义，所以不渲染（同 cmdk）。 */
export function CommandSeparator({ className, ...props }: CommandSeparatorProps) {
  const { query } = useCommandState("CommandSeparator");
  if (query !== "") return null;
  return <AutocompletePrimitive.Separator data-slot="command-separator" {...props} className={cn(overlaySeparatorClassName, className)} />;
}

export type CommandEmptyProps = React.ComponentProps<"div">;
/** 没有任何条目匹配时的文字；省略 children 用内置缺省。元素常驻、内容变化，读屏才会播报。 */
export function CommandEmpty({ className, children, ...props }: CommandEmptyProps) {
  const { ready } = useCommandState("CommandEmpty");
  const count = React.useContext(CountContext);
  const { messages } = useUILocale();
  return <div data-slot="command-empty" role="status" {...props} className={cn(candidateEmptyClassName, className)}>{ready && count === 0 ? children ?? messages.commandEmpty : null}</div>;
}

/*
 * 命令项与 Menu 项同一几何：命令是动作，高度跟随按钮的 md 档，文字起点与带框输入的文字起点同一条竖线。
 * 圆角、高亮、禁用来自 overlayItemClassName，与 Menu 同一来源（NG3）；高亮是键盘或指针的位置，
 * 命令项没有「选中」这种持续状态，所以只用悬停一级的清染，不用选中的 8% 与 font-medium。
 * 帧（整行宽、起点）与 Menu 的 md 档同一份：commandItemFrame.md。
 */
const itemClassName = cn(buttonVariants({ variant: "quiet", size: "md", shape: "label", tone: "neutral" }), overlayItemClassName, commandItemFrame.md);

export type CommandItemProps = Omit<React.ComponentProps<"div">, "onSelect" | "value"> & {
  /** 命令的标识，也是默认参与匹配的文字；onSelect 收到它。 */
  value: string;
  /** 额外的匹配词（别名、英文名、拼音），不显示。 */
  keywords?: readonly string[];
  /** 被选中（Enter 或点击）时调用。 */
  onSelect?: (value: string) => void;
  /** 禁用项显示为不可用，不参与高亮与键盘移动，不能被选中。 */
  disabled?: boolean;
  /** 快捷键的显示，不注册快捷键。数组按键逐个显示。 */
  shortcut?: string | readonly string[];
};

export function CommandItem({ value, keywords, onSelect, disabled = false, shortcut, className, children, onClick, ...props }: CommandItemProps) {
  const state = useCommandState("CommandItem");
  const groupReport = React.useContext(GroupReport);
  const id = React.useId();
  const label = typeof children === "string" ? children : value;
  const visible = state.query === "" || state.filter({ value, label, keywords: keywords ?? [] }, state.query);
  const report = groupReport ?? state.report;
  React.useLayoutEffect(() => {
    report(id, visible);
    return () => report(id, false);
  }, [report, id, visible]);
  if (!visible) return null;
  const keys = shortcut === undefined ? [] : typeof shortcut === "string" ? [shortcut] : shortcut;
  const content = <>
    {children}
    {keys.length > 0 && <span data-slot="command-shortcut" className="ms-auto flex shrink-0 items-center gap-(--qy-space-1) ps-(--qy-field-gap)">{keys.map(key => <Kbd key={key}>{key}</Kbd>)}</span>}
  </>;
  // Base UI 的 Combobox 让禁用项仍可被方向键走到（focusableWhenDisabled），没有开关能改。命令面板要的是
  // 「走过去就能按 Enter」，走到却按不动只会让人困惑，所以禁用项不交给原语登记：
  // 仍是列表里的一个 option、读屏读得到并读出「不可用」，但不参与高亮与键盘移动，点击也无效。
  if (disabled) return <div role="option" aria-disabled="true" data-slot="command-item" data-disabled="" {...props} className={cn("flex items-center", itemClassName, className)}>{content}</div>;
  // 必须把 value 交给原语：不给时「常开列表」初次挂载的自动高亮会落在最后一项而不是第一项。
  return <AutocompletePrimitive.Item data-slot="command-item" value={value} {...props}
    onClick={event => {
      onClick?.(event);
      onSelect?.(value);
      state.onItemSelect?.(value);
    }}
    className={state2 => cn("flex items-center", itemClassName, typeof className === "function" ? (className as (s: typeof state2) => string)(state2) : className)}>
    {content}
  </AutocompletePrimitive.Item>;
}

export type CommandDialogProps = Omit<CommandProps, "aria-label" | "aria-labelledby"> & {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** 选中条目后关闭，默认 true。 */
  closeOnSelect?: boolean;
  /** 对话框的名字，二选一必填，缺失抛错。 */
  "aria-label"?: string;
  "aria-labelledby"?: string;
  /** 对话框面板的宽度等。 */
  popupClassName?: string;
};

/*
 * 对话框里的命令面板。面板宽度取 min(32rem, 100%)（预设）：一行命令名加右端快捷键需要的宽度，
 * 窄视口退到容器宽度；其余内边距、圆角、阴影来自 Dialog，不另写。
 * 每次打开都是新的一份（Dialog 关闭即卸载），所以查询自然清空，不需要重置逻辑。
 */
export function CommandDialog({ open, defaultOpen, onOpenChange, closeOnSelect = true, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, popupClassName, onItemSelect, children, ...props }: CommandDialogProps) {
  if (!isName(ariaLabel) && !isName(ariaLabelledBy)) throw new Error(`CommandDialog requires a nonempty aria-label or aria-labelledby naming the dialog; received aria-label ${received(ariaLabel)} and aria-labelledby ${received(ariaLabelledBy)}.`);
  const [inner, setInner] = React.useState(defaultOpen ?? false);
  const change = (next: boolean) => { if (open === undefined) setInner(next); onOpenChange?.(next); };
  return <Dialog open={open ?? inner} onOpenChange={change}>
    <DialogPopup aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} data-slot="command-dialog" className={cn("w-[min(32rem,100%)]", popupClassName)}>
      <Command {...props} onItemSelect={value => { onItemSelect?.(value); if (closeOnSelect) change(false); }}>{children}</Command>
    </DialogPopup>
  </Dialog>;
}

export { AutocompletePrimitive as CommandPrimitive };
