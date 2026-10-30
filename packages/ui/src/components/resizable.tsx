"use client";

import { useDirection } from "@base-ui/react/direction-provider";
import * as React from "react";
import { isName, received } from "../require-name";
import { cn } from "../utils";

/**
 * 可拖拽分栏：WAI-ARIA APG「Window Splitter」模式。
 * 面板之间放一条 ResizableHandle（role="separator"，可聚焦）；拖动或按键移动它，
 * 改变**它前后两个面板**的大小，其余面板不动，所以总和恒为 100。
 *
 * 取舍：
 * - 尺寸用百分比，是组内的相对关系；像素下限（`"240px"`）是后台列表的真实需要，
 *   由 ResizeObserver 量出组的可用长度后换算成百分比。可用长度 = 组的长度 − 各分隔条自身的占位，
 *   所以换算不会差出「分隔条那 1px」。量不到（长度为 0，例如尚未布局）时像素界限不生效。
 * - 面板用 `flex: 0 1 {size}%`：基准是百分比，和为 100，分隔条的占位由 flex-shrink 按比例摊掉，
 *   不需要在每个面板上手算「减去分隔条」。
 * - 受控 `layout` 时，拖动中的中间值由组暂存、只用于显示，松手时一次性交给 onLayout；
 *   所以 onLayout 的语义是「一次调整的结果」，不是逐帧。组的长度变化引起的界限修正不触发 onLayout。
 */

/** 方向键一次移动的百分点。**预设**：APG 没有给出步长；10 让「窄—中—宽」三五个位置可以只靠键盘到达，
 * 也与常见分栏组件的键盘步长同一量级，不由本库的任何关系推出。 */
export const RESIZABLE_KEYBOARD_STEP = 10;

/** 指针移动到哪里才算「想折叠」：折叠值与最小值之间的中点（折叠值 + 最小值）/ 2。
 * 关系：越过中点，离折叠比离最小值更近，就吸附到更近的那个。 */
const collapseThreshold = (collapsedSize: number, minSize: number) => (collapsedSize + minSize) / 2;
/** 浮点比较的容差（百分点）。数值来自像素换算，用等号比较会因舍入误差误判。 */
const EPSILON = 0.01;

/** 数字是百分比；`"240px"` 是像素。 */
export type ResizableBound = number | `${number}px`;
export type ResizableOrientation = "horizontal" | "vertical";
type Direction = "ltr" | "rtl";

type PanelConfig = {
  defaultSize?: number | undefined;
  minSize?: ResizableBound | undefined;
  maxSize?: ResizableBound | undefined;
  collapsible: boolean;
  collapsedSize: number;
};
type Item = { kind: "handle"; id: string; el: HTMLElement } | { kind: "panel"; id: string; el: HTMLElement; config: PanelConfig };
type PanelItem = Extract<Item, { kind: "panel" }>;
type ResolvedPanel = { id: string; min: number; max: number; collapsible: boolean; collapsedSize: number; defaultSize?: number | undefined };
type PanelCallbacks = { onCollapse?: (() => void) | undefined; onExpand?: (() => void) | undefined };

const PIXEL = /^\d+(?:\.\d+)?px$/;
function checkBound(name: string, value: ResizableBound | undefined) {
  if (value === undefined) return;
  if (typeof value === "number" ? !Number.isFinite(value) || value < 0 || value > 100 : !PIXEL.test(value)) {
    throw new Error(`ResizablePanel ${name} must be a percentage from 0 to 100 or a "<n>px" string; received ${JSON.stringify(value)}.`);
  }
}
function resolveBound(value: ResizableBound | undefined, fallback: number, groupSize: number) {
  if (value === undefined) return fallback;
  if (typeof value === "number") return value;
  return groupSize > 0 ? (Number.parseFloat(value) / groupSize) * 100 : fallback;
}

const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));
const isCollapsed = (panel: ResolvedPanel, size: number | undefined) => panel.collapsible && size !== undefined && size <= panel.collapsedSize + EPSILON;
const sameLayout = (a: readonly number[], b: readonly number[]) => a.length === b.length && a.every((value, index) => Math.abs(value - b[index]!) < 1e-9);

/**
 * 把一组（可能缺项、和不为 100、越界的）尺寸整理成合法布局：缺项均分剩余，按比例缩放到 100，
 * 再夹进各自的界限；夹住的面板固定在界限上，其余面板重新分摊，直到没有新的越界。已折叠的面板固定在折叠值。
 * 界限本身无解（最小值之和大于 100）时不强求，保持缩放后的比例。
 */
function fit(raw: readonly (number | undefined)[], panels: readonly ResolvedPanel[]): number[] {
  const count = panels.length;
  if (!count) return [];
  const known = raw.reduce<number>((sum, value) => sum + (value ?? 0), 0);
  const unknown = raw.filter(value => value === undefined).length;
  const filled = raw.map(value => value ?? (unknown ? Math.max(0, 100 - known) / unknown : 0));
  const total = filled.reduce((sum, value) => sum + value, 0);
  const sizes = total > 0 ? filled.map(value => (value / total) * 100) : filled.map(() => 100 / count);
  const fixed: (number | undefined)[] = panels.map((panel, index) => isCollapsed(panel, raw[index]) ? panel.collapsedSize : undefined);
  for (let pass = 0; pass <= count; pass++) {
    const free = panels.map((_, index) => index).filter(index => fixed[index] === undefined);
    if (!free.length) break;
    const target = 100 - fixed.reduce<number>((sum, value) => sum + (value ?? 0), 0);
    const freeSum = free.reduce((sum, index) => sum + sizes[index]!, 0);
    let violated = false;
    for (const index of free) {
      const scaled = freeSum > 0 ? (sizes[index]! * target) / freeSum : target / free.length;
      const bounded = clamp(scaled, panels[index]!.min, panels[index]!.max);
      sizes[index] = bounded;
      if (Math.abs(bounded - scaled) > 1e-9) { fixed[index] = bounded; violated = true; }
    }
    if (!violated) break;
  }
  return sizes.map((value, index) => fixed[index] ?? value);
}

/** 分隔条 index 两侧面板的取值范围。lo/hi 是都不折叠时前一个面板的范围；min/max 是 ARIA 报告的范围，计入折叠。 */
function rangeAt(panels: readonly ResolvedPanel[], sizes: readonly number[], index: number) {
  const a = panels[index]!; const b = panels[index + 1]!;
  const total = sizes[index]! + sizes[index + 1]!;
  const lo = Math.max(a.min, total - b.max); const hi = Math.min(a.max, total - b.min);
  const canCollapseA = a.collapsible && total - a.collapsedSize >= b.min - EPSILON && total - a.collapsedSize <= b.max + EPSILON;
  const canCollapseB = b.collapsible && total - b.collapsedSize >= a.min - EPSILON && total - b.collapsedSize <= a.max + EPSILON;
  return { a, b, total, lo, hi, canCollapseA, canCollapseB, min: canCollapseA ? a.collapsedSize : lo, max: canCollapseB ? total - b.collapsedSize : hi };
}

/**
 * 求前一个面板的新尺寸，使两侧都满足界限；后一个面板吸收差额（总和不变）。无解时返回 undefined。
 * pointer 模式额外允许吸附折叠：越过「折叠与最小值的中点」就折叠；键盘（clamp）从不因方向键折叠，折叠只用 Enter。
 */
function solvePrev(panels: readonly ResolvedPanel[], sizes: readonly number[], index: number, requested: number, mode: "clamp" | "pointer"): number | undefined {
  const { a, b, total, lo, hi, canCollapseA, canCollapseB } = rangeAt(panels, sizes, index);
  if (mode === "pointer") {
    if (canCollapseA && requested < collapseThreshold(a.collapsedSize, a.min)) return a.collapsedSize;
    if (canCollapseB && total - requested < collapseThreshold(b.collapsedSize, b.min)) return total - b.collapsedSize;
  }
  return lo > hi ? undefined : clamp(requested, lo, hi);
}

function withPrev(sizes: readonly number[], index: number, prev: number) {
  const next = sizes.slice(); const total = sizes[index]! + sizes[index + 1]!;
  next[index] = prev; next[index + 1] = total - prev;
  return next;
}

function directionOf(el: Element, provided: Direction): Direction {
  const attribute = el.closest("[dir]")?.getAttribute("dir")?.toLowerCase();
  return attribute === "rtl" || attribute === "ltr" ? attribute : provided;
}

type GroupContext = {
  orientation: ResizableOrientation;
  panels: readonly ResolvedPanel[];
  sizes: readonly number[];
  items: readonly Item[];
  draggingId: string | null;
  register(item: Item): () => void;
  callbacks: React.RefObject<Map<string, PanelCallbacks>>;
  direction(el: Element): Direction;
  usableSize(): number;
  solve(sizes: readonly number[], index: number, requested: number, mode: "clamp" | "pointer"): number[] | undefined;
  preview(id: string | null, sizes: readonly number[] | null): void;
  commit(next: readonly number[], previous: readonly number[]): void;
  lastExpanded: React.RefObject<Map<string, number>>;
};
const GroupContext = React.createContext<GroupContext | null>(null);
function useGroup(part: string) {
  const context = React.useContext(GroupContext);
  if (!context) throw new Error(`${part} must be rendered inside ResizablePanelGroup.`);
  return context;
}

function assignRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
  if (typeof ref === "function") ref(value);
  else if (ref) (ref as React.RefObject<T | null>).current = value;
}

export type ResizablePanelGroupProps = React.ComponentProps<"div"> & {
  /** 面板的排列方向。`horizontal` 左右并排（分隔条是竖线）。 */
  orientation?: ResizableOrientation;
  /** 一次拖动或一次按键调整结束时调用，参数是各面板的百分比（和为 100）。 */
  onLayout?: (sizes: number[]) => void;
  /** 受控布局，按面板出现的顺序。长度与面板数不符时忽略，退回内部状态。 */
  layout?: number[];
};

export function ResizablePanelGroup({ orientation = "horizontal", onLayout, layout, className, ref, ...props }: ResizablePanelGroupProps) {
  const providerDirection = useDirection();
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const [items, setItems] = React.useState<readonly Item[]>([]);
  const [groupSize, setGroupSize] = React.useState(0);
  const [local, setLocal] = React.useState<Record<string, number>>({});
  const [drag, setDrag] = React.useState<{ id: string; sizes: readonly number[] } | null>(null);
  const callbacks = React.useRef(new Map<string, PanelCallbacks>());
  const lastExpanded = React.useRef(new Map<string, number>());
  const onLayoutRef = React.useRef(onLayout);
  React.useEffect(() => { onLayoutRef.current = onLayout; });

  const register = React.useCallback((item: Item) => {
    setItems(previous => [...previous.filter(existing => existing.id !== item.id), item].sort((a, b) => a.el.compareDocumentPosition(b.el) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    return () => setItems(previous => previous.filter(existing => existing !== item));
  }, []);

  // 可用长度：组的长度减去分隔条的占位（offsetWidth/Height 是整数像素，1px 的线足够准）。
  const measure = React.useCallback(() => {
    const root = rootRef.current; if (!root) return 0;
    const rect = root.getBoundingClientRect();
    const handles = items.filter(item => item.kind === "handle").reduce((sum, item) => sum + (orientation === "horizontal" ? item.el.offsetWidth : item.el.offsetHeight), 0);
    return Math.max(0, (orientation === "horizontal" ? rect.width : rect.height) - handles);
  }, [items, orientation]);
  React.useLayoutEffect(() => {
    const root = rootRef.current; if (!root) return;
    const read = () => setGroupSize(measure());
    read();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(read);
    observer.observe(root);
    return () => observer.disconnect();
  }, [measure]);

  const panels = React.useMemo<ResolvedPanel[]>(() => items.filter((item): item is PanelItem => item.kind === "panel").map(({ id, config }) => {
    const min = clamp(resolveBound(config.minSize, 0, groupSize), 0, 100);
    return { id, min, max: Math.max(min, clamp(resolveBound(config.maxSize, 100, groupSize), 0, 100)), collapsible: config.collapsible, collapsedSize: config.collapsedSize, defaultSize: config.defaultSize };
  }), [items, groupSize]);

  // 面板集合或界限变化后，把已有尺寸（缺项用 defaultSize / 均分）整理成合法布局。
  React.useLayoutEffect(() => {
    setLocal(previous => {
      const next = fit(panels.map(panel => previous[panel.id] ?? panel.defaultSize), panels);
      if (sameLayout(next, panels.map(panel => previous[panel.id] ?? Number.NaN))) return previous;
      return Object.fromEntries(panels.map((panel, index) => [panel.id, next[index]!]));
    });
  }, [panels]);

  const stored = panels.map(panel => local[panel.id] ?? panel.defaultSize ?? 0);
  const controlled = layout && layout.length === panels.length ? layout : undefined;
  const sizes = drag?.sizes ?? controlled ?? stored;

  const solve = React.useCallback<GroupContext["solve"]>((base, index, requested, mode) => {
    const prev = solvePrev(panels, base, index, requested, mode);
    return prev === undefined ? undefined : withPrev(base, index, prev);
  }, [panels]);
  const commit = React.useCallback<GroupContext["commit"]>((next, previous) => {
    if (sameLayout(next, previous)) return;
    setLocal(Object.fromEntries(panels.map((panel, index) => [panel.id, next[index]!])));
    panels.forEach((panel, index) => {
      const was = isCollapsed(panel, previous[index]); const now = isCollapsed(panel, next[index]);
      // 折叠时记下折叠前的尺寸，Enter 还原用；无论是指针吸附还是键盘折叠都记。
      if (now && !was) lastExpanded.current.set(panel.id, previous[index]!);
      if (was !== now) { const handlers = callbacks.current.get(panel.id); (now ? handlers?.onCollapse : handlers?.onExpand)?.(); }
    });
    onLayoutRef.current?.(next.slice());
  }, [panels]);
  const preview = React.useCallback<GroupContext["preview"]>((id, next) => setDrag(id && next ? { id, sizes: next } : null), []);
  const directionOfEl = React.useCallback((el: Element) => directionOf(el, providerDirection === "rtl" ? "rtl" : "ltr"), [providerDirection]);

  const context = React.useMemo<GroupContext>(() => ({
    orientation, panels, sizes, items, draggingId: drag?.id ?? null, register, callbacks, direction: directionOfEl, usableSize: measure, solve, preview, commit, lastExpanded,
  }), [orientation, panels, sizes, items, drag?.id, register, directionOfEl, measure, solve, preview, commit]);

  return <GroupContext.Provider value={context}>
    <div data-slot="resizable-panel-group" data-orientation={orientation} {...props}
      ref={node => { rootRef.current = node; assignRef(ref, node); }}
      className={cn("flex h-full min-h-0 w-full min-w-0", orientation === "vertical" && "flex-col", className)} />
  </GroupContext.Provider>;
}

export type ResizablePanelProps = Omit<React.ComponentProps<"div">, "defaultValue"> & {
  /** 初始百分比。省略的面板均分其余部分。 */
  defaultSize?: number;
  /** 下限：数字是百分比，`"240px"` 是像素。省略为 0。 */
  minSize?: ResizableBound;
  /** 上限，写法同 minSize。省略为 100。 */
  maxSize?: ResizableBound;
  /** 允许折叠：指针拖过「折叠值与最小值的中点」吸附折叠，分隔条上 Enter 折叠 / 还原。 */
  collapsible?: boolean;
  /** 折叠后的百分比。默认 0。 */
  collapsedSize?: number;
  onCollapse?: () => void;
  onExpand?: () => void;
};

export function ResizablePanel({ id, defaultSize, minSize, maxSize, collapsible = false, collapsedSize = 0, onCollapse, onExpand, className, style, ref, ...props }: ResizablePanelProps) {
  const group = useGroup("ResizablePanel");
  const generated = React.useId();
  const panelId = id ?? generated;
  checkBound("minSize", minSize); checkBound("maxSize", maxSize);
  if (defaultSize !== undefined && (!Number.isFinite(defaultSize) || defaultSize < 0 || defaultSize > 100)) throw new Error("ResizablePanel defaultSize must be a percentage from 0 to 100.");
  if (!Number.isFinite(collapsedSize) || collapsedSize < 0 || collapsedSize > 100) throw new Error("ResizablePanel collapsedSize must be a percentage from 0 to 100.");
  const elRef = React.useRef<HTMLDivElement | null>(null);
  const { register, callbacks } = group;
  React.useLayoutEffect(() => {
    const el = elRef.current; if (!el) return;
    return register({ kind: "panel", id: panelId, el, config: { defaultSize, minSize, maxSize, collapsible, collapsedSize } });
  }, [register, panelId, defaultSize, minSize, maxSize, collapsible, collapsedSize]);
  React.useLayoutEffect(() => {
    callbacks.current.set(panelId, { onCollapse, onExpand });
    return () => { callbacks.current.delete(panelId); };
  });
  const index = group.panels.findIndex(panel => panel.id === panelId);
  const size = index >= 0 ? group.sizes[index] : defaultSize;
  const collapsed = index >= 0 && isCollapsed(group.panels[index]!, size);
  return <div id={panelId} data-slot="resizable-panel" data-collapsed={collapsed ? "" : undefined} {...props}
    ref={node => { elRef.current = node; assignRef(ref, node); }}
    // 面板的大小由组决定，内容不能反过来撑开它（min-size 归零）；折叠到 0 时内容也不该漏出来，所以裁切。
    style={{ flex: size === undefined ? "1 1 0%" : `0 1 ${size}%`, ...style }}
    className={cn("min-h-0 min-w-0 overflow-hidden", className)} />;
}

export type ResizableHandleProps = React.ComponentProps<"div">;

export function ResizableHandle({ className, onKeyDown, onPointerDown, onPointerMove, onPointerUp, onPointerCancel, onLostPointerCapture, ref, ...props }: ResizableHandleProps) {
  const group = useGroup("ResizableHandle");
  // 名称来自调用方：APG 要求分隔条的名称与它调整的主面板一致，库无法替调用方知道那是什么。
  if (!isName(props["aria-label"]) && !isName(props["aria-labelledby"])) {
    throw new Error(`ResizableHandle requires a nonempty aria-label or aria-labelledby naming the pane it resizes (WAI-ARIA APG Window Splitter); received aria-label ${received(props["aria-label"])}.`);
  }
  const generated = React.useId();
  const id = props.id ?? generated;
  const elRef = React.useRef<HTMLDivElement | null>(null);
  const { register, orientation, panels, sizes, items } = group;
  React.useLayoutEffect(() => {
    const el = elRef.current; if (!el) return;
    return register({ kind: "handle", id, el });
  }, [register, id]);

  const position = items.findIndex(item => item.id === id && item.kind === "handle");
  const index = position < 0 ? -1 : items.slice(0, position).filter(item => item.kind === "panel").length - 1;
  const valid = index >= 0 && index < panels.length - 1;
  const range = valid ? rangeAt(panels, sizes, index) : undefined;
  const horizontal = orientation === "horizontal";
  const dragging = group.draggingId === id;

  const dragRef = React.useRef<{ pointerId: number; origin: number; base: readonly number[]; last: readonly number[]; length: number; flip: boolean; index: number; cursor: string; select: string } | null>(null);
  const finish = (event: React.PointerEvent<HTMLDivElement> | null) => {
    const drag = dragRef.current; if (!drag) return;
    dragRef.current = null;
    try { event?.currentTarget.releasePointerCapture?.(drag.pointerId); } catch { /* 已释放 */ }
    document.body.style.cursor = drag.cursor; document.body.style.userSelect = drag.select;
    group.preview(null, null);
    group.commit(drag.last, drag.base);
  };
  React.useEffect(() => () => {
    const drag = dragRef.current; if (!drag) return;
    dragRef.current = null; document.body.style.cursor = drag.cursor; document.body.style.userSelect = drag.select;
  }, []);

  const move = (next: readonly number[] | undefined) => { if (next) group.commit(next, sizes); };
  const keyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !range || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    const rtl = horizontal && group.direction(event.currentTarget) === "rtl";
    const along = horizontal ? { ArrowRight: rtl ? -1 : 1, ArrowLeft: rtl ? 1 : -1 } : { ArrowDown: 1, ArrowUp: -1 };
    const sign = (along as Record<string, number | undefined>)[event.key];
    const current = sizes[index]!;
    if (sign !== undefined) {
      event.preventDefault();
      const prev = solvePrev(panels, sizes, index, current + sign * RESIZABLE_KEYBOARD_STEP, "clamp");
      // 方向键只能朝按下的方向走：已折叠的面板再按「更小」不该被夹回最小值而展开。
      if (prev !== undefined && (sign > 0 ? prev > current + EPSILON : prev < current - EPSILON)) move(withPrev(sizes, index, prev));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      move(withPrev(sizes, index, event.key === "Home" ? range.min : range.max));
    } else if (event.key === "Enter" && (range.a.collapsible || range.b.collapsible)) {
      event.preventDefault();
      // 折叠主面板（前一个）；它不能折叠时折叠后一个。展开回到折叠前的尺寸，没有记录就回到最小值。
      const target = range.a.collapsible ? range.a : range.b;
      const targetIndex = target === range.a ? index : index + 1;
      const restore = clamp(group.lastExpanded.current.get(target.id) ?? (target.min > target.collapsedSize ? target.min : target.defaultSize ?? RESIZABLE_KEYBOARD_STEP), target.min, target.max);
      if (isCollapsed(target, sizes[targetIndex])) {
        const prev = target === range.a ? restore : range.total - restore;
        const solved = solvePrev(panels, sizes, index, prev, "clamp");
        if (solved !== undefined) move(withPrev(sizes, index, solved));
      } else if (target === range.a ? range.canCollapseA : range.canCollapseB) {
        move(withPrev(sizes, index, target === range.a ? target.collapsedSize : range.total - target.collapsedSize));
      }
    }
  };

  return <div role="separator" tabIndex={0} id={id} data-slot="resizable-handle" data-orientation={orientation} data-dragging={dragging ? "" : undefined} {...props}
    ref={node => { elRef.current = node; assignRef(ref, node); }}
    aria-orientation={horizontal ? "vertical" : "horizontal"}
    aria-valuenow={range ? Math.round(sizes[index]!) : undefined} aria-valuemin={range ? Math.round(range.min) : undefined} aria-valuemax={range ? Math.round(range.max) : undefined}
    aria-controls={valid ? panels[index]!.id : undefined}
    onKeyDown={keyboard}
    onPointerDown={event => {
      onPointerDown?.(event);
      if (event.defaultPrevented || event.button !== 0 || !valid) return;
      try { event.currentTarget.setPointerCapture?.(event.pointerId); } catch { /* 合成事件没有可捕获的指针 */ }
      dragRef.current = {
        pointerId: event.pointerId, origin: horizontal ? event.clientX : event.clientY, base: sizes, last: sizes, length: group.usableSize(),
        flip: horizontal && group.direction(event.currentTarget) === "rtl", index, cursor: document.body.style.cursor, select: document.body.style.userSelect,
      };
      document.body.style.cursor = horizontal ? "col-resize" : "row-resize"; document.body.style.userSelect = "none";
      group.preview(id, sizes);
    }}
    onPointerMove={event => {
      onPointerMove?.(event);
      const drag = dragRef.current; if (!drag || drag.pointerId !== event.pointerId || drag.length <= 0) return;
      const moved = (horizontal ? event.clientX : event.clientY) - drag.origin;
      const next = group.solve(drag.base, drag.index, drag.base[drag.index]! + ((drag.flip ? -moved : moved) / drag.length) * 100, "pointer");
      if (next) { drag.last = next; group.preview(id, next); }
    }}
    onPointerUp={event => { onPointerUp?.(event); finish(event); }}
    onPointerCancel={event => { onPointerCancel?.(event); finish(event); }}
    onLostPointerCapture={event => { onLostPointerCapture?.(event); finish(event); }}
    className={cn(
      // 可见部分是一条线（宽度读系统线宽，和 Separator 同一道清墨）；它不占命中面积，命中区由 ::after 向两侧外扩。
      "relative z-1 shrink-0 touch-none outline-none transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) border-border after:absolute after:content-['']",
      horizontal ? "w-0 self-stretch border-s cursor-col-resize" : "h-0 w-full border-t cursor-row-resize",
      // 命中区：细指针取 2 分（8px，**预设**：比 1px 的线容易对准，又不吃掉相邻面板的内容）；
      // 粗指针取 --qy-touch-target（库内触摸命中区，STANDARDS §2）。按线宽居中对称外扩。
      horizontal
        ? "after:inset-y-0 after:-inset-x-[calc((2*var(--qy-fen)-var(--qy-line-width))/2)] pointer-coarse:after:-inset-x-[calc((var(--qy-touch-target)-var(--qy-line-width))/2)]"
        : "after:inset-x-0 after:-inset-y-[calc((2*var(--qy-fen)-var(--qy-line-width))/2)] pointer-coarse:after:-inset-y-[calc((var(--qy-touch-target)-var(--qy-line-width))/2)]",
      // 状态沿墨阶往深走：静止「清」，悬停预告「重」，拖动中「浓」（与可编辑控件的 border → border-input → border-strong 同向）。
      // 键盘焦点画焦点色，并向两侧各外扩半个焦点线宽，使它一瞥可见又不改变布局；它压过悬停与拖动色。
      "not-focus-visible:not-data-[dragging]:hover:border-input not-focus-visible:data-[dragging]:border-border-strong",
      "focus-visible:border-(--qy-focus-ring-color) focus-visible:ring-[length:calc(var(--qy-focus-ring-width)/2)] focus-visible:ring-(--qy-focus-ring-color)",
      className,
    )} />;
}
