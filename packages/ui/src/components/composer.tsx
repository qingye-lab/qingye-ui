"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconArrowUp } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { fillStateByData } from "../fill-state";
import { chipFrameStyle } from "../chip";
import { candidateEmptyClassName, candidateItemClassName, overlayItemClassName } from "../overlay-item";
import { overlayGroupLabelClassName } from "../overlay-group";
import { isName } from "../require-name";
import {
  composerTokenNear, composerValueEquals, composerValueLength, composerValueToText, findComposerTrigger,
  isComposerValueEmpty, normalizeComposerValue, sliceComposerValue, spliceComposerValue,
  type ComposerSegment, type ComposerTriggerMatch, type ComposerValue,
} from "../composer/model";
import {
  parseEditor, readSelection, rangeRect, renderEditor, writeSelection, type ModelSelection,
} from "../composer/dom";
import { Button, type ButtonProps } from "./button";
import { Popover, PopoverPopup } from "./popover";

// 值模型与纯函数帮手一并公开：序列化、还原、切片都不依赖 DOM。
export {
  composerValueFromText, composerValueLength, composerValueToText, emptyComposerValue, isComposerValueEmpty,
  normalizeComposerValue, parseComposerValue,
  type ComposerSegment, type ComposerTextSegment, type ComposerTokenSegment, type ComposerValue,
} from "../composer/model";

/* ───────────────────────── 公开类型 ───────────────────────── */

export type ComposerItem = {
  /** 稳定标识（业务对象 id）；令牌以它为身份。 */
  id: string;
  /** 显示名；令牌显示为 `触发字符 + label`，读屏同。 */
  label: string;
  /** 候选项里的第二行说明（不进入令牌）。 */
  description?: string | undefined;
  icon?: React.ReactNode | undefined;
  /** 分组名；同名的项归为一组，组按首次出现的顺序排列。 */
  group?: string | undefined;
  disabled?: boolean | undefined;
  /** 覆盖触发项的 select：该项插入令牌，还是直接执行（删掉触发文字并回调 onSelect）。 */
  select?: "token" | "action" | undefined;
};

export type ComposerTrigger = {
  /** 触发字符，例如 "@"、"/"。每个触发项的字符应互不相同。 */
  char: string;
  /**
   * 候选来源。同步返回数组即时显示；返回 Promise 时显示「正在加载」，
   * 结果到达时若查询已变（或浮层已关）就丢弃，不会覆盖更新的结果。
   * signal 在查询变化或浮层关闭时被中止，可传给 fetch。
   */
  getItems: (query: string, context: { signal: AbortSignal }) => readonly ComposerItem[] | PromiseLike<readonly ComposerItem[]>;
  /** 选中后的默认行为：token（默认）插入令牌；action 删掉触发文字、不留痕迹，由 onSelect 执行。 */
  select?: "token" | "action" | undefined;
  /** 选中后回调（token 与 action 都会调用，details.mode 区分）。action 的动作写在这里。 */
  onSelect?: ((item: ComposerItem, details: { mode: "token" | "action" }) => void) | undefined;
  /** 只在输入的最开头认这个触发字符（命令 "/" 的常见约定）。默认任意词首。 */
  startOnly?: boolean | undefined;
  /** 候选列表的可访问名称；缺省沿用输入框的名称。 */
  label?: string | undefined;
  /** 查询已完成而没有候选时的文案；缺省用内置的「没有可选项」。 */
  emptyText?: string | undefined;
};

export type ComposerChangeReason = "input" | "paste" | "cut" | "newline" | "token" | "action" | "delete-token" | "undo" | "redo" | "clear";
export type ComposerChangeDetails = {
  reason: ComposerChangeReason;
  event: Event | React.SyntheticEvent | undefined;
  cancel: () => void;
  readonly isCanceled: boolean;
};
export type ComposerSubmitDetails = {
  event: Event | React.SyntheticEvent | undefined;
  /** 把值清空（经 onValueChange，reason 为 "clear"）。受控时由应用决定是否真的清。 */
  clear: () => void;
};

/* ───────────────────────── 根与上下文 ───────────────────────── */

type ComposerContextValue = {
  value: ComposerValue;
  valueRef: React.RefObject<ComposerValue>;
  commit: (next: ComposerSegment[], reason: ComposerChangeReason, event: ComposerChangeDetails["event"]) => boolean;
  disabled: boolean;
  readOnly: boolean;
  submitOn: "enter" | "mod-enter";
  submit: (event: ComposerChangeDetails["event"]) => void;
  canSubmit: boolean;
  inputRef: React.RefObject<HTMLElement | null>;
  /** 每次提交变更（含被取消的）加一：值没变时也要让输入区重新对齐 DOM。 */
  revision: number;
};
const ComposerContext = React.createContext<ComposerContextValue | null>(null);
function useComposerContext(part: string): ComposerContextValue {
  const context = React.useContext(ComposerContext);
  if (!context) throw new Error(`${part} must be used inside <Composer>.`);
  return context;
}

export type ComposerProps = Omit<useRender.ComponentProps<"div">, "defaultValue" | "onChange" | "onSubmit"> & {
  /** 受控值。片段数组：文字片段与令牌片段。 */
  value?: ComposerValue | undefined;
  defaultValue?: ComposerValue | undefined;
  onValueChange?: ((value: ComposerSegment[], details: ComposerChangeDetails) => void) | undefined;
  /** 提交（Enter 或 ComposerSubmit）。内容为空（没有令牌且文字全是空白）时不会调用。 */
  onSubmit?: ((value: ComposerSegment[], details: ComposerSubmitDetails) => void) | undefined;
  /** enter：Enter 提交、Shift+Enter 换行；mod-enter：Ctrl/⌘+Enter 提交、Enter 换行。 */
  submitOn?: "enter" | "mod-enter" | undefined;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
};

/*
 * 根：一条填值边界，把输入区与其下（或四周）的工具条框在一起。
 * 边界读填值控件角色层（与 Input、Textarea 同一套线、面与圆角，随密度轴），
 * 只读/禁用走 fillStateByData；焦点与无效状态由内部编辑区的 :focus-visible / aria-invalid 经 has-[] 上浮。
 */
export function Composer({
  value: valueProp, defaultValue, onValueChange, onSubmit, submitOn = "enter", disabled = false, readOnly = false,
  className, render, ref, children, ...props
}: ComposerProps) {
  const controlled = valueProp !== undefined;
  const [inner, setInner] = React.useState<ComposerValue>(() => normalizeComposerValue(defaultValue ?? []));
  const controlledValue = React.useMemo(() => (valueProp === undefined ? undefined : normalizeComposerValue(valueProp)), [valueProp]);
  const value = controlledValue ?? inner;
  const valueRef = React.useRef<ComposerValue>(value);
  valueRef.current = value;
  const [revision, setTick] = React.useState(0);
  const latest = React.useRef({ onValueChange, onSubmit, disabled, readOnly });
  latest.current = { onValueChange, onSubmit, disabled, readOnly };
  const inputRef = React.useRef<HTMLElement | null>(null);

  const commit = React.useCallback<ComposerContextValue["commit"]>((next, reason, event) => {
    let canceled = false;
    const details: ComposerChangeDetails = { reason, event, cancel: () => { canceled = true; }, get isCanceled() { return canceled; } };
    latest.current.onValueChange?.(next, details);
    // 被取消、或受控的应用没有采纳时，编辑区的 DOM 已经先改了：多渲染一次，让同步步骤把 DOM 拉回到 value。
    setTick((tick) => tick + 1);
    if (canceled) return false;
    valueRef.current = next;
    if (!controlled) setInner(next);
    return true;
  }, [controlled]);

  const submit = React.useCallback<ComposerContextValue["submit"]>((event) => {
    if (latest.current.disabled || latest.current.readOnly) return;
    const current = valueRef.current;
    if (isComposerValueEmpty(current)) return;
    latest.current.onSubmit?.(current as ComposerSegment[], { event, clear: () => { commit([], "clear", event); } });
  }, [commit]);

  const context = React.useMemo<ComposerContextValue>(() => ({
    value, valueRef, commit, disabled, readOnly, submitOn, submit,
    canSubmit: !disabled && !readOnly && !isComposerValueEmpty(value), inputRef, revision,
  }), [value, commit, disabled, readOnly, submitOn, submit, revision]);

  const element = useRender({
    defaultTagName: "div", render, ref,
    props: mergeProps({ "data-slot": "composer", "data-disabled": disabled ? "" : undefined, "data-readonly": readOnly && !disabled ? "" : undefined, children }, props, {
      className: cn(
        "relative flex w-full min-w-0 flex-col rounded-(--qy-fill-radius) border border-input bg-surface-field text-foreground transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
        "has-[[data-slot=composer-input]:focus-visible]:border-ring not-data-disabled:not-data-readonly:not-has-[[data-slot=composer-input]:focus-visible]:not-has-[[aria-invalid=true]]:hover:border-border-strong",
        "has-[[aria-invalid=true]]:border-destructive has-[[aria-invalid=true]:focus-visible]:border-destructive-foreground",
        fillStateByData, className,
      ),
    }),
  });
  return <ComposerContext.Provider value={context}>{element}</ComposerContext.Provider>;
}

/* ───────────────────────── 输入区 ───────────────────────── */

type ComposerInputName = { "aria-label": string; "aria-labelledby"?: string | undefined } | { "aria-labelledby": string; "aria-label"?: string | undefined };

export type ComposerInputProps = Omit<React.ComponentPropsWithRef<"div">, "children" | "contentEditable" | "role" | "aria-label" | "aria-labelledby" | "defaultValue"> & ComposerInputName & {
  placeholder?: string | undefined;
  triggers?: readonly ComposerTrigger[] | undefined;
  /**
   * 起始行数（默认 1）。几何读填值控件角色层：一行 = 一个填值控件高，
   * 之后每多一行加一个行高（--qy-fill-text-leading），与 Textarea 的 rows 同一换算。
   */
  minRows?: number | undefined;
  /**
   * 增长上限，行数（默认 8）。超过后在输入区内滚动，不再撑高。
   * 上限同时不超过视口高度的一半（50dvh）：输入区不能把它所回应的内容挤出视野。
   * 两个数都是预设（见组件内注释），不是由理念推出的。
   */
  maxRows?: number | undefined;
};

const NO_TRIGGERS: readonly ComposerTrigger[] = Object.freeze([]);

/*
 * 令牌（编辑区内的已确认项）：与 TagInput 的标签同属「边界内一枚已确认的值」，圆角读 chip 几何里的
 * --qy-tag-radius（由 chipFrameStyle 写在编辑区上），底色是中性柔底。
 * 令牌嵌在行内文字里，不另设高度，让它跟正文共用一个行高，所以不用 chipClassName 的定高。
 * 左右留白 = 控件内间隔（--qy-control-content-gap）：触发符与名称同在一个对象里，分界靠底色，不需要更宽。
 * 这一留白是预设。
 */
const tokenClassName = "rounded-(--qy-tag-radius) bg-neutral-soft px-(--qy-control-content-gap) text-foreground box-decoration-clone cursor-default";

const isThenable = (value: unknown): value is PromiseLike<readonly ComposerItem[]> =>
  typeof value === "object" && value !== null && typeof (value as PromiseLike<unknown>).then === "function";

type FlatItem = { item: ComposerItem; group: string | undefined };
type HistoryState = { entries: { value: ComposerSegment[]; selection: ModelSelection }[]; index: number; at: number; coalescing: boolean };
const freshHistory = (): HistoryState => ({ entries: [], index: 0, at: 0, coalescing: false });

const nextEnabled = (items: readonly FlatItem[], from: number, step: 1 | -1) => {
  if (items.length === 0) return -1;
  for (let i = 1; i <= items.length; i += 1) {
    const index = (((from + step * i) % items.length) + items.length) % items.length;
    if (!items[index]!.item.disabled) return index;
  }
  return -1;
};

/*
 * 编辑区：contenteditable，不是 textarea。令牌必须是行内的原子对象（整体删除、光标进不去、读屏读名字），
 * 原生文本框做不到。代价由这里承担：
 * - DOM 是命令式渲染的（React 不管它的子节点），每次 input 把 DOM 读回成值；值与 DOM 不一致时（外部改值、
 *   受控方拒绝）才重画，打字本身不触发重画，所以输入法与拼写检查不受干扰；
 * - 选区以「模型偏移」保存与恢复（文字按码元，令牌计 1）；
 * - 粘贴、拖放一律只收纯文字；撤销/重做用自己的快照栈，因为重画会让浏览器原生的撤销栈失效。
 * 候选浮层按 combobox 模式接线：编辑区是 role=textbox（多行的 combobox 不存在），
 * 打开时带 aria-controls 与 aria-activedescendant，选项是 role=option。
 */
export function ComposerInput({
  placeholder, triggers = NO_TRIGGERS, minRows = 1, maxRows = 8, className, style, ref,
  onKeyDown, onInput, onPaste, onCopy, onCut, onDrop, onDragStart, onCompositionStart, onCompositionEnd, onBlur, tabIndex,
  ...props
}: ComposerInputProps) {
  const label = props["aria-label"];
  const labelledBy = props["aria-labelledby"];
  if (!isName(label) && !isName(labelledBy)) throw new Error("ComposerInput requires a nonempty aria-label or aria-labelledby; received neither.");
  const { messages } = useUILocale();
  const context = useComposerContext("ComposerInput");
  const { value, valueRef, commit, disabled, readOnly, submitOn, submit, inputRef } = context;
  const blocked = disabled || readOnly;

  const editorRef = React.useRef<HTMLDivElement | null>(null);
  const setRefs = React.useCallback((node: HTMLDivElement | null) => {
    editorRef.current = node;
    inputRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) ref.current = node;
  }, [ref, inputRef]);
  const listId = React.useId();
  const composing = React.useRef(false);
  const selection = React.useRef<ModelSelection>({ start: 0, end: 0 });
  const history = React.useRef<HistoryState>(freshHistory());

  const [active, setActive] = React.useState<ComposerTriggerMatch | null>(null);
  const [dismissed, setDismissed] = React.useState<{ start: number; char: string } | null>(null);
  const [candidates, setCandidates] = React.useState<{ key: string; status: "loading" | "ready"; items: readonly ComposerItem[] }>({ key: "", status: "ready", items: [] });
  const [highlight, setHighlight] = React.useState(-1);

  const trigger = active ? triggers[active.index] : undefined;
  const open = Boolean(active && trigger && !blocked && !(dismissed && dismissed.start === active.start && dismissed.char === trigger.char));
  const queryKey = active && trigger ? `${active.index}\u0000${active.query}` : "";
  const fresh = candidates.key === queryKey;
  const grouped = React.useMemo(() => {
    const items = fresh ? candidates.items : [];
    const order: (string | undefined)[] = [];
    for (const item of items) if (!order.includes(item.group)) order.push(item.group);
    const groups = order.map((group) => ({ group, items: items.filter((item) => item.group === group) }));
    const flat: FlatItem[] = groups.flatMap(({ group, items: members }) => members.map((item) => ({ item, group })));
    return { groups, flat };
  }, [candidates, fresh]);
  const loading = fresh && candidates.status === "loading";

  // 最新的 props/状态给事件处理器用：处理器只在 effect 里挂一次（selectionchange、native beforeinput），不能闭包旧值。
  const live = { triggers, trigger, active, open, grouped, highlight, blocked };
  const liveRef = React.useRef(live);
  liveRef.current = live;

  /* —— 值 ↔ DOM —— */

  React.useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor || composing.current) return;
    if (composerValueEquals(parseEditor(editor), value)) return;
    const focused = editor.ownerDocument.activeElement === editor;
    renderEditor(editor, value, tokenClassName);
    history.current = freshHistory();
    if (focused) {
      const length = composerValueLength(value);
      writeSelection(editor, Math.min(selection.current.start, length), Math.min(selection.current.end, length));
    }
  });

  const pushHistory = (before: ComposerValue, beforeSelection: ModelSelection, after: ComposerSegment[], afterSelection: ModelSelection, coalesce: boolean) => {
    const h = history.current;
    if (h.entries.length === 0) { h.entries = [{ value: before as ComposerSegment[], selection: beforeSelection }]; h.index = 0; }
    h.entries = h.entries.slice(0, h.index + 1);
    const now = Date.now();
    if (coalesce && h.coalescing && now - h.at < 1000) h.entries[h.index] = { value: after, selection: afterSelection };
    else { h.entries.push({ value: after, selection: afterSelection }); h.index = h.entries.length - 1; }
    if (h.entries.length > 100) { h.entries.shift(); h.index -= 1; }
    h.at = now;
    h.coalescing = coalesce;
  };

  const showValue = (next: ComposerValue, caret: ModelSelection) => {
    const editor = editorRef.current;
    if (!editor) return;
    renderEditor(editor, next, tokenClassName);
    selection.current = caret;
    if (editor.ownerDocument.activeElement === editor) writeSelection(editor, caret.start, caret.end);
  };

  /** 替换 [start, end)，光标落在 caret；所有结构性编辑（换行、令牌、粘贴、删除令牌）走这里。 */
  const replaceRange = (start: number, end: number, insert: ComposerValue, caret: number, reason: ComposerChangeReason, event: ComposerChangeDetails["event"]) => {
    const before = valueRef.current;
    const editor = editorRef.current;
    const beforeSelection = (editor && readSelection(editor)) ?? selection.current;
    const next = spliceComposerValue(before, start, end, insert);
    if (!commit(next, reason, event)) return false;
    showValue(next, { start: caret, end: caret });
    pushHistory(before, beforeSelection, next, { start: caret, end: caret }, false);
    refreshTrigger();
    return true;
  };

  const currentSelection = (): ModelSelection => {
    const editor = editorRef.current;
    return (editor && readSelection(editor)) ?? selection.current;
  };
  const replaceSelection = (insert: ComposerValue, reason: ComposerChangeReason, event: ComposerChangeDetails["event"]) => {
    const { start, end } = currentSelection();
    const length = composerValueLength(valueRef.current);
    const from = Math.min(start, length);
    return replaceRange(from, Math.min(end, length), insert, from + composerValueLength(insert), reason, event);
  };

  const deleteTokenNear = (direction: "backward" | "forward", event: ComposerChangeDetails["event"]) => {
    const { start, end } = currentSelection();
    if (start !== end) return false;
    const near = composerTokenNear(valueRef.current, start, direction);
    if (!near) return false;
    return replaceRange(near.start, near.end, [], near.start, "delete-token", event);
  };

  const travel = (direction: "undo" | "redo", event: ComposerChangeDetails["event"]) => {
    const h = history.current;
    const index = direction === "undo" ? h.index - 1 : h.index + 1;
    const entry = h.entries[index];
    if (!entry) return;
    if (!commit(entry.value, direction, event)) return;
    h.index = index;
    h.coalescing = false;
    showValue(entry.value, entry.selection);
    refreshTrigger();
  };

  /* —— 触发与候选 —— */

  const refreshTrigger = () => {
    const editor = editorRef.current;
    const { triggers: rules, blocked: isBlocked } = liveRef.current;
    if (!editor) return;
    if (isBlocked || composing.current || rules.length === 0) { setActive(null); return; }
    const current = readSelection(editor);
    if (!current || current.start !== current.end) { setActive(null); return; }
    selection.current = current;
    const match = findComposerTrigger(valueRef.current, current.start, rules.map((rule) => ({ char: rule.char, startOnly: rule.startOnly })));
    setActive((previous) => (previous && match && previous.index === match.index && previous.start === match.start && previous.end === match.end && previous.query === match.query ? previous : match));
  };

  React.useEffect(() => { if (!active) setDismissed(null); }, [active]);

  React.useEffect(() => {
    const onSelectionChange = () => { refreshTrigger(); };
    document.addEventListener("selectionchange", onSelectionChange);
    return () => document.removeEventListener("selectionchange", onSelectionChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const { trigger: source, active: match } = liveRef.current;
    if (!open || !source || !match) return;
    let stale = false;
    const controller = new AbortController();
    let result: ReturnType<ComposerTrigger["getItems"]>;
    try { result = source.getItems(match.query, { signal: controller.signal }); } catch { result = []; }
    if (isThenable(result)) {
      setCandidates({ key: queryKey, status: "loading", items: [] });
      result.then(
        (items) => { if (!stale) setCandidates({ key: queryKey, status: "ready", items: [...items] }); },
        () => { if (!stale) setCandidates({ key: queryKey, status: "ready", items: [] }); },
      );
    } else {
      setCandidates({ key: queryKey, status: "ready", items: [...result] });
    }
    return () => { stale = true; controller.abort(); };
  }, [open, queryKey]);

  React.useEffect(() => {
    setHighlight(nextEnabled(grouped.flat, -1, 1));
  }, [candidates, fresh]);

  const optionId = (index: number) => `${listId}-option-${index}`;
  const highlighted = open && fresh ? grouped.flat[highlight] : undefined;

  React.useEffect(() => {
    if (!open || highlight < 0) return;
    document.getElementById(optionId(highlight))?.scrollIntoView?.({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlight, open]);

  const selectItem = (entry: FlatItem) => {
    const { active: match, trigger: source } = liveRef.current;
    if (!match || !source || entry.item.disabled) return;
    const mode = entry.item.select ?? source.select ?? "token";
    const before = valueRef.current;
    let insert: ComposerSegment[] = [];
    let caret = match.start;
    if (mode === "token") {
      const following = sliceComposerValue(before, match.end, match.end + 1)[0];
      const needsSpace = !(following?.type === "text" && /^\s/.test(following.text));
      insert = [{ type: "token", trigger: source.char, id: entry.item.id, label: entry.item.label }, ...(needsSpace ? [{ type: "text" as const, text: " " }] : [])];
      caret = match.start + 1 + (needsSpace ? 1 : 0);
    }
    setActive(null);
    if (replaceRange(match.start, match.end, insert, caret, mode === "token" ? "token" : "action", undefined)) {
      source.onSelect?.(entry.item, { mode });
    }
  };

  /* —— 事件 —— */

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || blocked) return;
    if (composing.current || event.nativeEvent.isComposing || event.keyCode === 229) return;
    const mod = event.metaKey || event.ctrlKey;
    if (open) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setHighlight((from) => { const next = nextEnabled(grouped.flat, from, event.key === "ArrowDown" ? 1 : -1); return next < 0 ? from : next; });
        return;
      }
      if ((event.key === "Enter" || event.key === "Tab") && !event.shiftKey && !mod && highlighted) {
        event.preventDefault();
        selectItem(highlighted);
        return;
      }
      if (event.key === "Escape" && active && trigger) {
        event.preventDefault();
        event.stopPropagation();
        setDismissed({ start: active.start, char: trigger.char });
        return;
      }
    }
    if (mod && !event.altKey && event.key.toLowerCase() === "z") { event.preventDefault(); travel(event.shiftKey ? "redo" : "undo", event); return; }
    if (event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "y") { event.preventDefault(); travel("redo", event); return; }
    if (event.key === "Enter") {
      event.preventDefault();
      const submits = submitOn === "enter" ? !event.shiftKey && !mod && !event.altKey : mod;
      if (submits) submit(event);
      else replaceSelection([{ type: "text", text: "\n" }], "newline", event);
      return;
    }
    if ((event.key === "Backspace" || event.key === "Delete") && deleteTokenNear(event.key === "Backspace" ? "backward" : "forward", event)) event.preventDefault();
  };

  const handleInput = (event: React.InputEvent<HTMLDivElement>) => {
    onInput?.(event);
    const editor = editorRef.current;
    if (!editor || blocked) return;
    const before = valueRef.current;
    const next = parseEditor(editor);
    if (composerValueEquals(next, before)) { refreshTrigger(); return; }
    const beforeSelection = selection.current;
    if (!commit(next, "input", event.nativeEvent)) return;
    const after = readSelection(editor) ?? { start: composerValueLength(next), end: composerValueLength(next) };
    selection.current = after;
    pushHistory(before, beforeSelection, next, after, true);
    refreshTrigger();
  };

  // 原生 beforeinput 要用 addEventListener：React 的 onBeforeInput 是 textInput 的合成事件，拿不到 inputType。
  const nativeBeforeInput = (event: InputEvent) => {
    if (liveRef.current.blocked) { event.preventDefault(); return; }
    const type = event.inputType;
    if (type === "insertParagraph" || type === "insertLineBreak") { event.preventDefault(); replaceSelection([{ type: "text", text: "\n" }], "newline", event); }
    else if (type === "historyUndo" || type === "historyRedo") { event.preventDefault(); travel(type === "historyUndo" ? "undo" : "redo", event); }
    else if (/^delete.*Backward$/.test(type)) { if (deleteTokenNear("backward", event)) event.preventDefault(); }
    else if (/^delete.*Forward$/.test(type)) { if (deleteTokenNear("forward", event)) event.preventDefault(); }
  };
  const beforeInputRef = React.useRef(nativeBeforeInput);
  beforeInputRef.current = nativeBeforeInput;
  React.useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    const listener = (event: Event) => beforeInputRef.current(event as InputEvent);
    editor.addEventListener("beforeinput", listener);
    return () => editor.removeEventListener("beforeinput", listener);
  }, []);

  const selectedText = () => {
    const { start, end } = currentSelection();
    return start === end ? "" : composerValueToText(sliceComposerValue(valueRef.current, start, end));
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    onPaste?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    if (blocked) return;
    const text = event.clipboardData.getData("text/plain").replace(/\r\n?/g, "\n");
    if (text) replaceSelection([{ type: "text", text }], "paste", event);
  };
  const handleCopy = (event: React.ClipboardEvent<HTMLDivElement>) => {
    onCopy?.(event);
    if (event.defaultPrevented) return;
    const text = selectedText();
    if (!text) return;
    event.preventDefault();
    event.clipboardData.setData("text/plain", text);
  };
  const handleCut = (event: React.ClipboardEvent<HTMLDivElement>) => {
    onCut?.(event);
    if (event.defaultPrevented) return;
    const text = selectedText();
    if (!text) return;
    event.preventDefault();
    if (blocked) return;
    event.clipboardData.setData("text/plain", text);
    replaceSelection([], "cut", event);
  };
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    onDrop?.(event);
    if (event.defaultPrevented) return;
    event.preventDefault();
    if (blocked) return;
    const text = event.dataTransfer.getData("text/plain").replace(/\r\n?/g, "\n");
    if (text) replaceSelection([{ type: "text", text }], "paste", event);
  };

  const hasTriggers = triggers.length > 0;
  const statusText = open && fresh
    ? loading ? messages.loading : grouped.flat.length > 0 ? messages.resultCount(grouped.flat.length) : (trigger?.emptyText ?? messages.selectEmpty)
    : "";

  const anchor = React.useMemo(() => ({
    get contextElement() { return editorRef.current ?? undefined; },
    getBoundingClientRect: () => {
      const editor = editorRef.current;
      const match = liveRef.current.active;
      const rect = editor && match ? rangeRect(editor, match.start, match.end) : null;
      return rect ?? editor?.getBoundingClientRect() ?? new DOMRect();
    },
  }), []);

  const empty = composerValueLength(value) === 0;
  let optionIndex = 0;
  return <>
    <div
      {...props}
      ref={setRefs}
      data-slot="composer-input"
      data-empty={empty ? "" : undefined}
      data-placeholder={placeholder}
      role="textbox"
      aria-multiline="true"
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
      aria-placeholder={placeholder}
      aria-autocomplete={hasTriggers ? "list" : undefined}
      aria-controls={open ? listId : undefined}
      aria-activedescendant={open && highlighted ? optionId(highlight) : undefined}
      contentEditable={!blocked}
      suppressContentEditableWarning
      spellCheck={props.spellCheck}
      tabIndex={disabled ? undefined : (tabIndex ?? 0)}
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      onPaste={handlePaste}
      onCopy={handleCopy}
      onCut={handleCut}
      onDrop={handleDrop}
      onDragStart={(event) => { onDragStart?.(event); event.preventDefault(); }}
      onCompositionStart={(event) => { onCompositionStart?.(event); composing.current = true; setActive(null); }}
      onCompositionEnd={(event) => { onCompositionEnd?.(event); composing.current = false; refreshTrigger(); }}
      onBlur={(event) => { onBlur?.(event); setActive(null); }}
      style={{ ...chipFrameStyle, "--qy-composer-rows": minRows, "--qy-composer-max-rows": maxRows, ...style } as React.CSSProperties}
      className={cn(
        "block w-full min-w-0 cursor-text overflow-y-auto rounded-[inherit] whitespace-pre-wrap wrap-break-word bg-transparent text-foreground outline-none",
        "text-control-md-mobile sm:text-control-md",
        // 竖向留白与 Textarea 同一公式：(填值外高 − 行高 − 两道线) / 2；横向读填值内缘。
        "px-(--qy-fill-padding) py-[calc((var(--qy-fill-height-narrow)-var(--qy-fill-text-leading-narrow)-2*var(--qy-line-width))/2)] sm:py-[calc((var(--qy-fill-height)-var(--qy-fill-text-leading)-2*var(--qy-line-width))/2)]",
        // 起始高 = 行数 × 行高 + 上下留白；粗指针下不低于触屏目标。
        "min-h-[calc(var(--qy-composer-rows)*var(--qy-fill-text-leading-narrow)+var(--qy-fill-height-narrow)-var(--qy-fill-text-leading-narrow)-2*var(--qy-line-width))] sm:min-h-[calc(var(--qy-composer-rows)*var(--qy-fill-text-leading)+var(--qy-fill-height)-var(--qy-fill-text-leading)-2*var(--qy-line-width))]",
        "pointer-coarse:min-h-[max(var(--qy-touch-target),calc(var(--qy-composer-rows)*var(--qy-fill-text-leading-narrow)+var(--qy-fill-height-narrow)-var(--qy-fill-text-leading-narrow)-2*var(--qy-line-width)))] sm:pointer-coarse:min-h-[max(var(--qy-touch-target),calc(var(--qy-composer-rows)*var(--qy-fill-text-leading)+var(--qy-fill-height)-var(--qy-fill-text-leading)-2*var(--qy-line-width)))]",
        // 增长上限：maxRows 行（预设 8，换算同上），且不超过视口一半（预设 50dvh）。超出后在内部滚动。
        "max-h-[min(calc(var(--qy-composer-max-rows)*var(--qy-fill-text-leading-narrow)+var(--qy-fill-height-narrow)-var(--qy-fill-text-leading-narrow)-2*var(--qy-line-width)),50dvh)] sm:max-h-[min(calc(var(--qy-composer-max-rows)*var(--qy-fill-text-leading)+var(--qy-fill-height)-var(--qy-fill-text-leading)-2*var(--qy-line-width)),50dvh)]",
        "data-empty:before:pointer-events-none data-empty:before:text-muted-foreground data-empty:before:content-[attr(data-placeholder)]",
        "data-readonly:cursor-default",
        className,
      )}
    />
    <span role="status" data-slot="composer-status" className="sr-only">{statusText}</span>
    <Popover open={open && fresh} onOpenChange={(next, details) => {
      if (next || !active || !trigger) return;
      // 点在编辑区里（移动光标）不算「点到外面」：触发文字还在，浮层该由光标位置决定。
      const target = (details as { event?: Event }).event?.target;
      if ((details as { reason?: string }).reason === "outside-press" && target instanceof Node && editorRef.current?.contains(target)) return;
      setDismissed({ start: active.start, char: trigger.char });
    }}>
      <PopoverPopup
        anchor={anchor}
        side="bottom"
        align="start"
        initialFocus={false}
        finalFocus={false}
        role="presentation"
        data-slot="composer-popup"
        // 最小宽 12rem：容得下一个常见姓名加一行说明。预设。
        className="min-w-48"
        viewportProps={{ className: "p-(--qy-overlay-inset)" }}
      >
        <div onMouseDown={(event) => event.preventDefault()}>
          {loading && <div data-slot="composer-status-text" aria-hidden="true" className={candidateEmptyClassName}>{messages.loading}</div>}
          {fresh && !loading && grouped.flat.length === 0 && <div data-slot="composer-empty" aria-hidden="true" className={candidateEmptyClassName}>{trigger?.emptyText ?? messages.selectEmpty}</div>}
          <div role="listbox" id={listId} aria-label={trigger?.label ?? label} aria-labelledby={trigger?.label ? undefined : labelledBy} aria-busy={loading || undefined} data-slot="composer-list">
            {grouped.groups.map(({ group, items }, groupIndex) => {
              const options = items.map((item) => {
                const index = optionIndex;
                optionIndex += 1;
                const isHighlighted = index === highlight;
                return <div
                  key={item.id}
                  id={optionId(index)}
                  role="option"
                  aria-selected={isHighlighted}
                  aria-disabled={item.disabled || undefined}
                  data-slot="composer-option"
                  data-highlighted={isHighlighted ? "" : undefined}
                  data-disabled={item.disabled ? "" : undefined}
                  onPointerMove={() => { if (!item.disabled && !isHighlighted) setHighlight(index); }}
                  onClick={() => selectItem({ item, group })}
                  className={cn(candidateItemClassName, overlayItemClassName, "flex items-center")}
                >
                  {item.icon}
                  <span className="min-w-0 flex-1">{item.label}</span>
                  {item.description && <span className="min-w-0 text-caption text-muted-foreground">{item.description}</span>}
                </div>;
              });
              if (group === undefined) return <React.Fragment key={`g${groupIndex}`}>{options}</React.Fragment>;
              const groupId = `${listId}-group-${groupIndex}`;
              return <div key={`g${groupIndex}`} role="group" aria-labelledby={groupId} data-slot="composer-group">
                <div id={groupId} className={overlayGroupLabelClassName}>{group}</div>
                {options}
              </div>;
            })}
          </div>
        </div>
      </PopoverPopup>
    </Popover>
  </>;
}

/* ───────────────────────── 工具条与提交 ───────────────────────── */

export type ComposerToolbarProps = useRender.ComponentProps<"div">;

/*
 * 工具条：放在输入区下方（或上方）的一行动作，放 size="xs" 的 Button。
 * 内缩读 chip 几何的 --qy-tag-inset：xs 控件（24px）在填值边界（32px）里的同心内缩，
 * 与标签、多选已选项是同一个关系；与输入区相邻的一侧不再留，由输入区自己的竖向留白承担。
 */
export function ComposerToolbar({ className, render, ref, ...props }: ComposerToolbarProps) {
  return useRender({
    defaultTagName: "div", render, ref,
    props: mergeProps({ "data-slot": "composer-toolbar", style: chipFrameStyle }, props, {
      className: cn("flex min-w-0 items-center gap-(--qy-field-gap) p-(--qy-tag-inset) not-first:pt-0 not-last:pb-0", className),
    }),
  });
}

export type ComposerSubmitProps = Omit<ButtonProps, "size" | "shape">;

/** 提交按钮：内容为空、禁用或只读时不可用；点击后焦点回到输入区，便于接着写。 */
export function ComposerSubmit({ className, children, onClick, "aria-label": ariaLabel, variant = "solid", ...props }: ComposerSubmitProps) {
  const { messages } = useUILocale();
  const context = useComposerContext("ComposerSubmit");
  return <Button
    data-slot="composer-submit"
    size="xs"
    shape="icon"
    variant={variant}
    aria-label={ariaLabel ?? messages.composerSubmit}
    {...props}
    disabled={props.disabled || !context.canSubmit}
    className={cn("rounded-(--qy-tag-radius) ms-auto", className)}
    onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented) return;
      context.submit(event);
      context.inputRef.current?.focus();
    }}
  >{children ?? <IconArrowUp aria-hidden="true" />}</Button>;
}
