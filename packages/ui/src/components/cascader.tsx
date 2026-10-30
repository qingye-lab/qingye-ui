"use client";

import { IconCheck, IconChevronLeft, IconChevronRight, IconLoader2 } from "@tabler/icons-react";
import * as React from "react";
import { useCandidateStatus } from "../candidate-status";
import { useUILocale, useUIDirection } from "../locale";
import { candidateEmptyClassName, candidateItemClassName, overlayItemClassName } from "../overlay-item";
import { PickerFormValue, PickerTrigger, usePickerField } from "../picker-trigger";
import { cn } from "../utils";
import { Button } from "./button";
import { Input } from "./input";
import { Popover, PopoverPopup } from "./popover";

export type CascaderOption = {
  value: string;
  label: string;
  disabled?: boolean;
  children?: CascaderOption[];
  /** 声明没有子项：即使提供了 loadChildren，也不再尝试加载。 */
  isLeaf?: boolean;
};

export type CascaderProps = {
  /** 第一列的候选；子项在 children 里，或由 loadChildren 按需取来。 */
  options: readonly CascaderOption[];
  /** 从根到所选节点的路径；null 是未选择。省略初值不会选第一项。 */
  value?: string[] | null | undefined;
  defaultValue?: string[] | null | undefined;
  /** 提交了新的路径时调用；第二个参数是路径上各节点的候选对象（尚未取到的节点缺省）。 */
  onValueChange?: ((path: string[] | null, options: CascaderOption[]) => void) | undefined;
  /** 默认只有叶子可提交；true 时任意层级都可以提交。 */
  selectParent?: boolean | undefined;
  /** 展开一个没有 children 的非叶子节点时调用；失败（reject）显示可重试的错误。 */
  loadChildren?: ((option: CascaderOption) => Promise<CascaderOption[]>) | undefined;
  /** 弹层顶部出现搜索输入；输入后改为一列扁平的匹配路径（只搜已知的节点，未加载的分支不在其中）。 */
  searchable?: boolean | undefined;
  placeholder?: React.ReactNode;
  disabled?: boolean | undefined;
  readOnly?: boolean | undefined;
  required?: boolean | undefined;
  /** 隐藏 input 的名称；提交值是路径各段用 "/" 连接，未选择提交空字符串。 */
  name?: string | undefined;
  form?: string | undefined;
  id?: string | undefined;
  className?: string | undefined;
  "aria-label"?: string | undefined;
  "aria-labelledby"?: string | undefined;
  "aria-describedby"?: string | undefined;
  "aria-invalid"?: boolean | "true" | "false" | undefined;
};

type Source = { state: "loading" } | { state: "error" } | { state: "ready"; options: CascaderOption[] };
type Column = { parentPath: string[]; parent: CascaderOption | null; items: readonly CascaderOption[] | null; status: "loading" | "error" | null };
type Result = { path: string[]; chain: CascaderOption[]; label: string; disabled: boolean };

const keyOf = (path: readonly string[]) => JSON.stringify(path);
const samePath = (a: readonly string[], b: readonly string[]) => a.length === b.length && a.every((segment, index) => segment === b[index]);
// 类型搜索的缓冲时长：预设，与 Tree 的类型搜索同值（500ms，常见的连击间隔）。
const TYPEAHEAD_MS = 500;

/** 在 labels 里找下一个以 buffer 开头的项；同一字符连按则在同首字符的项间循环。找不到返回 -1。 */
function typeaheadIndex(labels: readonly string[], from: number, buffer: string): number {
  const repeated = buffer.length > 1 && [...buffer].every(character => character === buffer[0]);
  const prefix = repeated ? buffer[0]! : buffer;
  const start = buffer.length === 1 || repeated ? from + 1 : from;
  for (let step = 0; step < labels.length; step += 1) {
    const index = (start + step) % labels.length;
    if (labels[index]!.toLocaleLowerCase().startsWith(prefix)) return index;
  }
  return -1;
}

const trailingSlot = "flex size-(--qy-fill-icon-narrow) items-center justify-center text-muted-foreground sm:size-(--qy-fill-icon)";
// 一列的宽度由内容决定，下限与 Select 触发器（见 picker-trigger.tsx）同一关系：左右留白 + 尾部标记 + 字段间隔 + 文字区下限（--qy-field-min-text，预设）。
// 选项的左右留白 = 填值留白 − 列内缩，列自己再留一个列内缩，合起来正是两个填值留白。
const columnMinWidth = "min-w-[calc(var(--qy-fill-padding)*2+var(--qy-fill-icon)+var(--qy-field-gap)+var(--qy-field-min-text))]";

/**
 * 级联选择：沿「根 → 叶」的路径选一个值，每一级的候选在自己的一列里。
 *
 * 焦点用 roving tabindex 而不是 aria-activedescendant：候选分在多个 listbox 里，
 * activedescendant 只能指向「当前 listbox 内」的后代，跨列移动会让读屏丢失上下文；
 * 真实焦点跟着选项走，读屏自然读出该列的名称（父项的 label）与选项本身。
 * 搜索模式例外：焦点留在输入里（输入是 combobox，匹配路径是它控制的 listbox），用 aria-activedescendant。
 */
export function Cascader({
  options, value: valueProp, defaultValue = null, onValueChange, selectParent = false, loadChildren, searchable = false,
  placeholder, disabled: disabledProp = false, readOnly = false, required = false, name: nameProp, form, id, className,
  "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid,
}: CascaderProps) {
  const { messages } = useUILocale();
  const dir = useUIDirection();
  const uid = React.useId();

  // Field 接入、名称必填与禁用/名称跟随 Field，与 TreeSelect 共用（picker-trigger.tsx）。
  const { fieldRoot, disabled, name, invalid, describedBy, labelledBy } = usePickerField({
    owner: "Cascader", ariaLabel, ariaLabelledBy, ariaDescribedBy, ariaInvalid, disabled: disabledProp, name: nameProp,
  });
  const controlled = valueProp !== undefined;
  const [innerValue, setInnerValue] = React.useState<string[] | null>(defaultValue ?? null);
  const value = controlled ? (valueProp ?? null) : innerValue;
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const [current, setCurrent] = React.useState<{ col: number; value: string } | null>(null);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const [sources, setSources] = React.useState<Record<string, Source>>({});
  const tokens = React.useRef(new Map<string, number>());
  const mounted = React.useRef(true);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const searchRef = React.useRef<HTMLInputElement | null>(null);
  const pending = React.useRef<{ col: number; key: string | null } | null>(null);
  const typed = React.useRef({ text: "", time: 0 });
  React.useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);

  const separator = messages.cascaderSeparator;

  // ── 树的读法：children 优先，其次是 loadChildren 取回的结果 ──
  function childrenOf(option: CascaderOption, path: readonly string[]): readonly CascaderOption[] | undefined {
    if (option.children) return option.children;
    const source = sources[keyOf(path)];
    return source?.state === "ready" ? source.options : undefined;
  }
  /** 有子项：已知非空，或尚未取到但可以取。已知为空（含取回为空）就是叶子。 */
  function hasChildren(option: CascaderOption, path: readonly string[]): boolean {
    const kids = childrenOf(option, path);
    if (kids) return kids.length > 0;
    return loadChildren !== undefined && option.isLeaf !== true;
  }
  const submittable = (option: CascaderOption, path: readonly string[]) => !option.disabled && (selectParent || !hasChildren(option, path));
  function walk(path: readonly string[]): { chain: CascaderOption[]; complete: boolean } {
    const chain: CascaderOption[] = [];
    const seen: string[] = [];
    let list: readonly CascaderOption[] | undefined = options;
    for (const segment of path) {
      seen.push(segment);
      const option = list?.find(item => item.value === segment);
      if (!option) return { chain, complete: false };
      chain.push(option);
      list = childrenOf(option, seen);
    }
    return { chain, complete: true };
  }

  function load(path: string[], option: CascaderOption) {
    if (!loadChildren) return;
    const key = keyOf(path);
    const token = (tokens.current.get(key) ?? 0) + 1;
    tokens.current.set(key, token);
    setSources(previous => ({ ...previous, [key]: { state: "loading" } }));
    // 同一路径重试时，只认最后一次请求的结果；卸载后的结果丢弃。
    const settle = (next: Source) => { if (mounted.current && tokens.current.get(key) === token) setSources(previous => ({ ...previous, [key]: next })); };
    new Promise<CascaderOption[]>(resolve => resolve(loadChildren(option))).then(kids => settle({ state: "ready", options: Array.isArray(kids) ? kids : [] }), () => settle({ state: "error" }));
  }

  // ── 展示：触发器里的路径 ──
  const shown = value ? (() => { const { chain } = walk(value); return value.map((segment, index) => chain[index]?.label ?? segment).join(separator); })() : "";
  const ownedSubmitValue = value ? value.join("/") : "";

  // ── 弹层状态 ──
  function prepare() {
    const path = value ?? [];
    const next: string[] = [];
    const seen: string[] = [];
    let list: readonly CascaderOption[] | undefined = options;
    for (const segment of path) {
      seen.push(segment);
      const option = list?.find(item => item.value === segment);
      if (!option || !hasChildren(option, seen)) break;
      next.push(segment);
      list = childrenOf(option, seen);
      if (!list && !(sources[keyOf(seen)]?.state === "loading")) load([...seen], option);
    }
    setExpanded(next);
    setQuery("");
    setActive(0);
    const first = options[0];
    setCurrent(path.length > 0 && walk(path).complete ? { col: path.length - 1, value: path[path.length - 1]! } : first ? { col: 0, value: first.value } : null);
  }
  function changeOpen(next: boolean) {
    if (next && (disabled || readOnly)) return;
    pending.current = null;
    if (next) prepare(); else fieldRoot.setTouched(true);
    setOpen(next);
  }
  function commit(path: string[], close: boolean) {
    if (!value || !samePath(value, path)) {
      if (!controlled) setInnerValue(path);
      fieldRoot.setFilled(true);
      onValueChange?.(path, walk(path).chain);
    }
    if (close) changeOpen(false);
  }

  // ── 列 ──
  const columns: Column[] = [{ parentPath: [], parent: null, items: options, status: null }];
  {
    let list: readonly CascaderOption[] = options;
    for (let index = 0; index < expanded.length; index += 1) {
      const parentPath = expanded.slice(0, index + 1);
      const parent = list.find(item => item.value === expanded[index]);
      if (!parent) break;
      const kids = childrenOf(parent, parentPath);
      if (kids && kids.length > 0) { columns.push({ parentPath, parent, items: kids, status: null }); list = kids; continue; }
      if (!kids && hasChildren(parent, parentPath)) columns.push({ parentPath, parent, items: null, status: sources[keyOf(parentPath)]?.state === "error" ? "error" : "loading" });
      break;
    }
  }
  const currentExists = current !== null && columns[current.col]?.items?.some(item => item.value === current.value);
  const tabStop = currentExists ? current : options[0] ? { col: 0, value: options[0].value } : null;

  function optionElement(col: number, key: string | null): HTMLElement | null {
    const nodes = Array.from(rowRef.current?.querySelectorAll<HTMLElement>('[role="option"]') ?? []).filter(node => node.dataset.col === String(col));
    return key === null ? nodes[0] ?? null : nodes.find(node => node.dataset.key === key) ?? null;
  }
  // 焦点请求：目标已在 DOM 里就直接聚焦，否则等它渲染出来（新展开的列、异步加载完成）再聚焦。
  function focusOption(col: number, key: string | null) {
    const element = optionElement(col, key);
    if (element) { pending.current = null; element.focus(); } else pending.current = { col, key };
    if (key !== null) {
      setCurrent({ col, value: key });
      // 光标移到本列另一项时，更深的列不再属于「当前路径」，收起。
      setExpanded(previous => previous.length > col && previous[col] !== key ? previous.slice(0, col) : previous);
    }
  }
  React.useLayoutEffect(() => {
    const request = pending.current;
    if (!request) return;
    const element = optionElement(request.col, request.key);
    if (element) { pending.current = null; element.focus(); }
  });

  // 列数变化后把最深一列滚进视野：可用宽度放不下全部列时，鼠标点开的新列不会因聚焦而自动滚到。
  const columnCount = columns.length;
  React.useLayoutEffect(() => {
    rowRef.current?.lastElementChild?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
  }, [columnCount]);

  function expandAt(col: number, option: CascaderOption) {
    const path = [...expanded.slice(0, col), option.value];
    setExpanded(path);
    if (!childrenOf(option, path) && sources[keyOf(path)]?.state !== "loading") load(path, option);
  }
  function enterNext(col: number, option: CascaderOption) {
    const path = [...expanded.slice(0, col), option.value];
    if (option.disabled || !hasChildren(option, path)) return;
    expandAt(col, option);
    const first = childrenOf(option, path)?.[0];
    focusOption(col + 1, first ? first.value : null);
  }
  // 鼠标点选项：叶子提交并关闭；父项只展开，selectParent 时父项同时成为值，弹层保持打开以便继续往下选。
  // 键盘上相同的两件事分在两个键上：Enter / Space 提交，右方向键展开。
  function click(col: number, option: CascaderOption) {
    const path = [...expanded.slice(0, col), option.value];
    if (option.disabled) return;
    if (!hasChildren(option, path)) { commit(path, true); return; }
    expandAt(col, option);
    if (selectParent) commit(path, false);
  }

  function onOptionKeyDown(event: React.KeyboardEvent<HTMLElement>, col: number, items: readonly CascaderOption[], index: number) {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) return;
    const option = items[index]!;
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backward = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    let handled = true;
    if (event.key === "ArrowDown") focusOption(col, items[Math.min(index + 1, items.length - 1)]!.value);
    else if (event.key === "ArrowUp") focusOption(col, items[Math.max(index - 1, 0)]!.value);
    else if (event.key === "Home") focusOption(col, items[0]!.value);
    else if (event.key === "End") focusOption(col, items[items.length - 1]!.value);
    else if (event.key === forward) enterNext(col, option);
    else if (event.key === backward) {
      if (col > 0) { const parentKey = expanded[col - 1]!; setExpanded(expanded.slice(0, col - 1)); focusOption(col - 1, parentKey); }
    } else if (event.key === "Enter" || event.key === " ") {
      const path = [...expanded.slice(0, col), option.value];
      if (!option.disabled) { if (submittable(option, path)) commit(path, true); else enterNext(col, option); }
    } else if (event.key.length === 1 && !event.nativeEvent.isComposing) {
      const now = Date.now();
      const buffer = (now - typed.current.time > TYPEAHEAD_MS ? "" : typed.current.text) + event.key.toLocaleLowerCase();
      typed.current = { text: buffer, time: now };
      const found = typeaheadIndex(items.map(item => item.label), index, buffer);
      if (found >= 0) focusOption(col, items[found]!.value);
    } else handled = false;
    if (handled) { event.preventDefault(); event.stopPropagation(); }
  }

  // ── 搜索：已知节点的扁平路径 ──
  const searching = searchable && query.trim() !== "";
  const results: Result[] = [];
  if (searching) {
    const needle = query.trim().toLocaleLowerCase();
    const collect = (list: readonly CascaderOption[], prefix: CascaderOption[]) => {
      for (const option of list) {
        const chain = [...prefix, option];
        const path = chain.map(item => item.value);
        const kids = childrenOf(option, path);
        const label = chain.map(item => item.label).join(separator);
        if ((selectParent || !hasChildren(option, path)) && label.toLocaleLowerCase().includes(needle)) results.push({ path, chain, label, disabled: chain.some(item => item.disabled) });
        if (kids) collect(kids, chain);
      }
    };
    collect(options, []);
  }
  const activeResult = Math.min(active, Math.max(results.length - 1, 0));
  const status = useCandidateStatus({ count: searching ? results.length : undefined });
  React.useEffect(() => {
    if (!searching) return;
    document.getElementById(`${uid}-r${activeResult}`)?.scrollIntoView?.({ block: "nearest" });
  }, [searching, activeResult, uid]);

  function onSearchKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.defaultPrevented || event.nativeEvent.isComposing) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (searching) setActive(Math.min(activeResult + 1, results.length - 1));
      else if (tabStop) focusOption(tabStop.col, tabStop.value);
    } else if (event.key === "ArrowUp" && searching) { event.preventDefault(); setActive(Math.max(activeResult - 1, 0)); }
    else if (event.key === "Enter" && searching) {
      event.preventDefault();
      const result = results[activeResult];
      if (result && !result.disabled) commit(result.path, true);
    }
  }

  // ── 触发器 ──
  const columnName = (column: Column, index: number) => index === 0 ? { "aria-label": ariaLabel, "aria-labelledby": labelledBy } : { "aria-label": column.parent?.label };
  const Forward = dir === "rtl" ? IconChevronLeft : IconChevronRight;

  return <>
    <Popover open={open} onOpenChange={changeOpen}>
      <PickerTrigger
        ref={triggerRef} slot="cascader" id={id} className={className} popup="listbox" open={open} onRequestOpen={() => changeOpen(true)}
        disabled={disabled} readOnly={readOnly} required={required} invalid={invalid}
        ariaLabel={ariaLabel} labelledBy={labelledBy} describedBy={describedBy}
        text={value ? shown : null} placeholder={placeholder ?? messages.selectPlaceholder}
      />
      {/* 弹层沿用 Popover 的面板、边界与入退场；内边距由列自己留，所以视口去掉面板内边距，横向可滚动。 */}
      <PopoverPopup
        data-slot="cascader-popup" role="group" align="start"
        // 宽度按内容取（上限仍是可用宽度）：Positioner 的宽度来自打开时量到的弹层宽度，块级弹层又跟随 Positioner，
        // 两者互锁，展开新列只会在列行里溢出、外框不变、不再触发重测——下一列就被裁在视野外。按内容取宽打破这个环。
        className="min-w-(--anchor-width) w-max"
        viewportProps={{ className: "flex flex-col overflow-hidden p-0" }}
      >
        {searchable && <div data-slot="cascader-search" className="shrink-0 p-(--qy-overlay-inset)">
          <Input
            nativeInput ref={searchRef} value={query} aria-label={messages.search}
            role="combobox" aria-expanded={searching} aria-autocomplete="list" aria-controls={searching ? `${uid}-results` : undefined}
            aria-activedescendant={searching && results.length > 0 ? `${uid}-r${activeResult}` : undefined}
            onValueChange={next => { setQuery(next); setActive(0); }} onKeyDown={onSearchKeyDown}
          />
        </div>}
        {searching ? <div className="min-h-0 overflow-y-auto overscroll-contain p-(--qy-overlay-inset)">
          <div role="status" className={status.className}>{status.content}</div>
          <div id={`${uid}-results`} role="listbox" aria-label={ariaLabel} aria-labelledby={labelledBy} data-slot="cascader-results" className="flex flex-col">
            {results.map((result, index) => <div
              key={keyOf(result.path)} id={`${uid}-r${index}`} role="option" data-slot="cascader-result"
              aria-selected={value !== null && samePath(value, result.path)} aria-disabled={result.disabled || undefined}
              data-highlighted={index === activeResult ? "" : undefined} data-disabled={result.disabled ? "" : undefined}
              onClick={() => { if (!result.disabled) commit(result.path, true); }}
              onMouseMove={() => setActive(index)}
              // 点选项不要把焦点从输入上抢走：提交后弹层关闭，焦点由 Popover 还给触发器。
              onMouseDown={event => event.preventDefault()}
              className={cn(overlayItemClassName, candidateItemClassName, "aria-selected:bg-surface-selected aria-selected:font-medium")}
            >{result.label}</div>)}
            {results.length === 0 && <div data-slot="cascader-empty" className={candidateEmptyClassName}>{messages.selectEmpty}</div>}
          </div>
        </div> : <div ref={rowRef} data-slot="cascader-columns" className="flex min-h-0 overflow-x-auto overscroll-contain">
          <span id={`${uid}-branch`} hidden>{messages.cascaderBranch}</span>
          {columns.map((column, col) => <div key={keyOf(column.parentPath)} data-slot="cascader-column" className={cn("flex shrink-0 flex-col overflow-y-auto overscroll-contain max-w-(--available-width) not-first:border-s not-first:border-border", columnMinWidth)}>
            {column.items ? <div role="listbox" {...columnName(column, col)} className="flex flex-col p-(--qy-overlay-inset)">
              {column.items.map((item, index) => {
                const path = [...expanded.slice(0, col), item.value];
                const parent = hasChildren(item, path);
                const isOpen = parent && expanded[col] === item.value && expanded.length > col;
                const isSelected = value !== null && value.length > col && samePath(value.slice(0, col + 1), path);
                return <div
                  key={item.value} role="option" data-slot="cascader-option" data-col={col} data-key={item.value}
                  tabIndex={tabStop && tabStop.col === col && tabStop.value === item.value ? 0 : -1}
                  aria-selected={isSelected} aria-disabled={item.disabled || undefined} data-disabled={item.disabled ? "" : undefined}
                  // option 不支持 aria-expanded / aria-haspopup（ARIA 1.2）；展开只是视觉上的「走到哪条分支」，用 data 属性画。
                  // 有下级由描述告诉读屏（名称仍只是选项文字）；视觉上由尾部的方向记号表达。
                  data-expanded={isOpen ? "" : undefined} aria-describedby={parent ? `${uid}-branch` : undefined}
                  onFocus={() => setCurrent({ col, value: item.value })}
                  onClick={() => click(col, item)}
                  onKeyDown={event => onOptionKeyDown(event, col, column.items!, index)}
                  // 高亮（键盘位置）与悬停同一种面；展开中的父项保留这个面，让人看出当前走到哪条分支。
                  className={cn("grid grid-cols-[minmax(0,1fr)_auto] items-center", overlayItemClassName, candidateItemClassName, "hover:bg-accent focus-visible:bg-accent data-expanded:bg-accent aria-selected:bg-surface-selected aria-selected:font-medium")}
                >
                  <span className="min-w-0 whitespace-normal wrap-break-word">{item.label}</span>
                  <span aria-hidden="true" className={trailingSlot}>{parent ? <Forward className="size-full" /> : isSelected ? <IconCheck className="size-full" /> : null}</span>
                </div>;
              })}
            </div> : column.status === "error"
              ? <div role="alert" data-slot="cascader-error" className={cn(candidateEmptyClassName, "flex flex-wrap items-center gap-(--qy-field-gap) text-foreground")}>
                <span>{messages.cascaderLoadFailed}</span>
                <Button size="sm" variant="quiet" onClick={() => load(column.parentPath, column.parent!)}>{messages.cascaderRetry}</Button>
              </div>
              : <div role="status" data-slot="cascader-loading" className={cn(candidateEmptyClassName, "flex items-center gap-(--qy-field-gap)")}>
                <IconLoader2 aria-hidden="true" className="qy-spin size-(--qy-fill-icon-narrow) shrink-0 sm:size-(--qy-fill-icon)" />{messages.loading}
              </div>}
          </div>)}
        </div>}
      </PopoverPopup>
    </Popover>
    {/* 表单值：路径各段用 "/" 连接。 */}
    <PickerFormValue slot="cascader" name={name} form={form} value={ownedSubmitValue} required={required} disabled={disabled} triggerRef={triggerRef} />
  </>;
}
