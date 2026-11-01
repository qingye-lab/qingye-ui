"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconChevronRight, IconLoader2 } from "@tabler/icons-react";
import * as React from "react";
import { CheckMarker, type CheckMarkState } from "../check-marker";
import { highlightMatch } from "../highlight";
import { Button } from "./button";
import { useUILocale } from "../locale";
import { isName, received } from "../require-name";
import { cn } from "../utils";

export interface TreeNode {
  id: string; label: string; disabled?: boolean; children?: readonly TreeNode[];
  /** 声明没有子项：即使提供了 loadChildren，也不再尝试加载。 */
  isLeaf?: boolean;
}
/** 一次移动：把 nodeId 放到 targetId 的前面、后面，或放进它里面（作为最后一个子项）。 */
export interface TreeMove { nodeId: string; targetId: string; position: "before" | "after" | "inside" }
export interface TreeMoveDetails { event: React.SyntheticEvent; reason: "keyboard" | "pointer" }
export interface TreeChangeDetails { event: React.SyntheticEvent; reason: "keyboard" | "pointer"; cancel(): void }
/** 一个节点的勾选事实：true/false 是确定态，"mixed" 只用于分支——它由启用的叶子后代派生，从不写入值本身。 */
export type TreeCheckedState = CheckMarkState;
export type TreeProps = Omit<useRender.ComponentProps<"div">, "children" | "draggable"> & {
  nodes: readonly TreeNode[];
  expandedIds?: readonly string[]; defaultExpandedIds?: readonly string[];
  onExpandedChange?: (ids: string[], details: TreeChangeDetails) => void;
  selectedId?: string | null; defaultSelectedId?: string | null;
  onSelectionChange?: (id: string | null, details: TreeChangeDetails) => void;
  selectable?: boolean;
  /** 级联多选模式：与 selectable 的单选高亮不组合（见组件源码顶部注释与文档 decisions）。 */
  checkable?: boolean;
  /** 只含叶子节点 id：分支的勾选只是显示派生，不是业务事实，不写回值，避免「选中一个分支」被多计成 N+1 项。 */
  checkedIds?: readonly string[]; defaultCheckedIds?: readonly string[];
  onCheckedChange?: (ids: string[], details: TreeChangeDetails) => void;
  disabled?: boolean; emptyContent?: React.ReactNode;
  /** 首次渲染时 roving 入口（tabIndex=0）所在的节点；默认是第一个可用节点。只是初值：之后焦点怎么走由用户决定。
   * 节点不可见（祖先未展开）或不可用时退回到它最近的可见可用祖先，再退回第一个可用节点（与焦点节点被移除时同一条规则）。
   * 弹层里的树（TreeSelect）靠它让进入时的焦点落在已选节点上；展开其祖先由调用方通过 expandedIds 负责。 */
  defaultFocusedId?: string | null;
  /** 展开一个没有 children 的非叶子节点时调用，返回它的子项；首次展开才取，失败（reject）显示可重试的错误。
   * 取回的子项由 Tree 保管（按节点 id），调用方不必合并回 nodes；id 仍须全树唯一。取回为空数组即成为叶子。 */
  loadChildren?: (node: TreeNode) => Promise<readonly TreeNode[]>;
  /** 按名称筛选：只显示名称含它的节点（不分大小写）及这些节点的祖先，命中的文字被标出。筛选期间有命中后代的分支一律展开（展开钮此时不起作用，
   * 也不触发 onExpandedChange），清空后回到 expandedIds 决定的展开状态。不改变勾选的派生：分支的勾选仍由它的全部叶子后代决定，
   * 筛选只是看不见一部分。空串等于不筛选。 */
  query?: string;
  /** 允许拖动节点改变位置，同时开启键盘等价操作（Ctrl/⌘+X 取起，Alt+↑ / Alt+↓ / Alt+Enter 放到当前节点之前 / 之后 / 之中，Esc 取消）。
   * Tree 不持有数据：只通过 onMove 报告一次移动，调用方改 nodes。禁用的节点既不能拖动也不能作为目标。 */
  draggable?: boolean;
  onMove?: (move: TreeMove, details: TreeMoveDetails) => void;
  /** 在内置规则（不能放进自己或自己的后代、位置不变的移动无效）之外再收紧：返回 false 的移动不可放置。 */
  canDrop?: (move: TreeMove) => boolean;
};
type Source = { state: "loading" } | { state: "error" } | { state: "ready"; nodes: readonly TreeNode[] };
type Entry = { node: TreeNode; parent: string | null; level: number };
/** 键入搜索的累积窗口：两次按键相隔超过它就从头开始。**预设**——APG 的 Tree View 只要求「快速连续键入多个字符」，
 * 没有给出时长；500ms 是常见组件库（MUI、React Aria 同一量级）的惯例，不由本库的任何关系推出。 */
export const TREE_TYPEAHEAD_MS = 500;
/** 键入搜索的目标：缓冲区只由同一个字符组成（「aaa」）时循环：每次跳到下一个以该字符开头的节点，从当前之后起算；
 * 单个字符也是这种情形（跳到下一个，不停在自己身上）；否则按整个前缀匹配，从当前节点（含）起算，因此继续键入时焦点停在仍然匹配的当前节点上。 */
function typeaheadTarget(labels: readonly string[], current: number, buffer: string): number {
  if (labels.length === 0) return -1;
  const cycle = [...buffer].every(char => char === buffer[0]);
  const needle = cycle ? buffer[0]! : buffer; const from = cycle ? current + 1 : current;
  for (let step = 0; step < labels.length; step++) {
    const index = (from + step) % labels.length;
    if (labels[index]!.startsWith(needle)) return index;
  }
  return -1;
}
/** 拖放位置的分区：行的上 1/4 是「之前」，下 1/4 是「之后」，中间是「之中」。预设——只是让三个位置都有够大的命中区，不由本库的任何关系推出。 */
const DROP_EDGE = 0.25;
export function Tree({ nodes, expandedIds, defaultExpandedIds = [], onExpandedChange, selectedId, defaultSelectedId = null, onSelectionChange, selectable = true, checkable = false, checkedIds, defaultCheckedIds = [], onCheckedChange, disabled = false, emptyContent, defaultFocusedId = null, loadChildren, query, draggable = false, onMove, canDrop, render, ref, className, onFocusCapture, onBlurCapture, "aria-describedby": describedByProp, ...props }: TreeProps) {
  // 名称在 role="tree" 的根上；treeitem 的名称另由各行自己的标签提供。
  if (!isName(props["aria-label"]) && !isName(props["aria-labelledby"])) throw new Error(`Tree requires a nonempty aria-label or aria-labelledby naming the tree; received aria-label ${received(props["aria-label"])} and aria-labelledby ${received(props["aria-labelledby"])}.`);
  const { messages } = useUILocale();
  const [localExpanded, setLocalExpanded] = React.useState<readonly string[]>(defaultExpandedIds);
  const [localSelected, setLocalSelected] = React.useState<string | null>(defaultSelectedId);
  const [localChecked, setLocalChecked] = React.useState<readonly string[]>(defaultCheckedIds);
  const [sources, setSources] = React.useState<Record<string, Source>>({});
  const inflight = React.useRef(new Set<string>()); const mounted = React.useRef(true);
  React.useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const expanded = expandedIds ?? localExpanded; const selected = selectedId === undefined ? localSelected : selectedId;
  const checked = checkedIds ?? localChecked; const checkedSet = new Set(checked);
  // ── 子项的读法：children 优先，其次是 loadChildren 取回的结果 ──
  function kidsOf(node: TreeNode): readonly TreeNode[] | undefined {
    if (node.children) return node.children;
    const source = sources[node.id]; return source?.state === "ready" ? source.nodes : undefined;
  }
  /** 还没有取到子项、但可以取：有 loadChildren，节点没有声明自己是叶子。取回之后（含取回为空）按取回的结果算，不再是 lazy。 */
  const lazy = (node: TreeNode) => kidsOf(node) === undefined && loadChildren !== undefined && node.isLeaf !== true;
  /** 叶子后代：分支递归到底，叶子返回自身一项。空 children 数组等同叶子；未取到子项的 lazy 节点还没有可勾选的叶子。 */
  function collectLeaves(node: TreeNode): TreeNode[] {
    const kids = kidsOf(node); if (kids?.length) return kids.flatMap(collectLeaves);
    return lazy(node) ? [] : [node];
  }
  // ── 筛选：命中的节点及其祖先；勾选的派生与级联仍看完整的树 ──
  const needle = query?.trim().toLocaleLowerCase() ?? "";
  const keep = new Set<string>();
  if (needle) {
    const mark = (list: readonly TreeNode[]): boolean => {
      let any = false;
      for (const node of list) { const kids = kidsOf(node); const hit = kids ? mark(kids) : false; if (hit || node.label.toLocaleLowerCase().includes(needle)) { keep.add(node.id); any = true; } }
      return any;
    };
    mark(nodes);
  }
  const shown = (node: TreeNode) => !needle || keep.has(node.id);
  /** 显示出来的子项（筛选时只剩命中的）。 */
  function shownKids(node: TreeNode): readonly TreeNode[] | undefined { const kids = kidsOf(node); return kids && needle ? kids.filter(shown) : kids; }
  function branchOf(node: TreeNode): boolean { const kids = shownKids(node); return kids ? kids.length > 0 : lazy(node); }
  /** 筛选时有命中后代的分支一律展开（只影响显示，不改 expanded 的值）；尚未取到子项的分支仍按 expanded 走，以便展开时触发加载。 */
  const forcedOpen = (node: TreeNode) => needle !== "" && Boolean(kidsOf(node)?.some(shown));
  const isOpen = (node: TreeNode) => forcedOpen(node) || expanded.includes(node.id);
  const all = new Map<string, Entry>(); const visible: Entry[] = []; const wanted: TreeNode[] = [];
  // 名称指向行内自己的标签，而不是 aria-label：treeitem 含下一级，aria-label 会与可见文字（含子项）不符（WCAG 2.5.3）。
  const idBase = React.useId(); const order = new Map<string, number>();
  function index(list: readonly TreeNode[], parent: string | null, level: number, open: boolean) {
    for (const node of list) {
      if (!node.id.trim() || !node.label.trim() || all.has(node.id)) throw new Error("Tree requires unique, nonempty ids and labels.");
      const entry = { node, parent, level }; order.set(node.id, all.size); all.set(node.id, entry);
      const here = open && shown(node); if (here) visible.push(entry);
      const kids = kidsOf(node);
      if (kids) index(kids, node.id, level + 1, here && isOpen(node));
      else if (here && expanded.includes(node.id) && lazy(node) && !sources[node.id]) wanted.push(node);
    }
  }
  index(nodes, null, 1, true);
  const enabled = visible.filter(entry => !disabled && !entry.node.disabled);
  /** 分支的勾选态：只看启用的叶子后代。全禁用的子树里没有可操作的事实，退回看全部叶子，只为如实显示，不代表可以点它改变什么。 */
  function deriveChecked(node: TreeNode): TreeCheckedState {
    if (lazy(node)) return false;
    if (!kidsOf(node)?.length) return checkedSet.has(node.id);
    const leaves = collectLeaves(node); const enabledLeaves = leaves.filter(leaf => !leaf.disabled);
    const pool = enabledLeaves.length ? enabledLeaves : leaves; if (pool.length === 0) return false;
    const count = pool.filter(leaf => checkedSet.has(leaf.id)).length;
    return count === 0 ? false : count === pool.length ? true : "mixed";
  }
  const [focused, setFocused] = React.useState<string | null>(defaultFocusedId);
  const typed = React.useRef({ text: "", time: 0 });
  const root = React.useRef<HTMLDivElement | null>(null); const refs = React.useRef(new Map<string, HTMLLIElement>()); const ownsFocus = React.useRef(false);
  let active = enabled.find(entry => entry.node.id === focused)?.node.id ?? null;
  if (active === null && focused !== null) {
    let ancestor = all.get(focused)?.parent;
    while (ancestor) { if (enabled.some(entry => entry.node.id === ancestor)) { active = ancestor; break; } ancestor = all.get(ancestor)?.parent ?? null; }
  }
  active ??= enabled[0]?.node.id ?? null;
  React.useLayoutEffect(() => {
    if (focused !== active) { setFocused(active); if (ownsFocus.current) { if (active !== null) refs.current.get(active)?.focus(); else root.current?.focus(); } }
  }, [focused, active]);
  function focus(id: string) { setFocused(id); refs.current.get(id)?.focus(); }
  // ── 按需加载 ──
  function load(node: TreeNode) {
    if (!loadChildren || inflight.current.has(node.id)) return;
    inflight.current.add(node.id); setSources(previous => ({ ...previous, [node.id]: { state: "loading" } }));
    // 同一节点同时只有一个请求；失败后重试才会发下一个。卸载后的结果丢弃。
    const settle = (next: Source) => { inflight.current.delete(node.id); if (mounted.current) setSources(previous => ({ ...previous, [node.id]: next })); };
    new Promise<readonly TreeNode[]>(resolve => resolve(loadChildren(node))).then(kids => settle({ state: "ready", nodes: Array.isArray(kids) ? kids : [] }), () => settle({ state: "error" }));
  }
  // 展开（含初值与受控展开）一个还没取过子项的节点时取；失败后停在错误态，等重试，不自动再取。
  const wantedKey = wanted.map(node => node.id).join("\u0000");
  React.useEffect(() => {
    for (const node of wanted) load(node);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wantedKey]);
  function changeExpanded(id: string, event: React.SyntheticEvent, reason: TreeChangeDetails["reason"]) {
    const entry = all.get(id); if (disabled || !entry || entry.node.disabled || !branchOf(entry.node) || forcedOpen(entry.node)) return;
    const next = expanded.includes(id) ? expanded.filter(key => key !== id) : [...expanded, id]; let canceled = false;
    onExpandedChange?.([...next], { event, reason, cancel() { canceled = true; } });
    if (!canceled && expandedIds === undefined) setLocalExpanded(next);
  }
  function select(id: string, event: React.SyntheticEvent, reason: TreeChangeDetails["reason"]) {
    if (!selectable || disabled || all.get(id)?.node.disabled) return;
    let canceled = false; onSelectionChange?.(id, { event, reason, cancel() { canceled = true; } });
    if (!canceled && selectedId === undefined) setLocalSelected(id);
  }
  /** 级联只改启用的叶子：disabled 叶子保留当前事实，不被父级的勾选/取消改变。
   * mixed 与 false 点击都归为「变为勾选」，和原生 indeterminate 复选框点击后的事实一致。
   * 还没取到子项的分支没有叶子可勾：点它只是展开（触发加载）；加载失败时再点即重试。 */
  function changeChecked(node: TreeNode, event: React.SyntheticEvent, reason: TreeChangeDetails["reason"]) {
    if (!checkable || disabled || node.disabled) return;
    if (lazy(node)) { if (!expanded.includes(node.id)) changeExpanded(node.id, event, reason); else if (sources[node.id]?.state === "error") load(node); return; }
    const enabledLeaves = collectLeaves(node).filter(leaf => !leaf.disabled); if (enabledLeaves.length === 0) return;
    const target = deriveChecked(node) !== true; const next = new Set(checked);
    for (const leaf of enabledLeaves) { if (target) next.add(leaf.id); else next.delete(leaf.id); }
    const result = [...next]; let canceled = false;
    onCheckedChange?.(result, { event, reason, cancel() { canceled = true; } });
    if (!canceled && checkedIds === undefined) setLocalChecked(result);
  }
  // ── 移动：指针拖放与键盘取起/放下共用同一套规则与同一个出口 onMove ──
  const [dragging, setDragging] = React.useState<string | null>(null);
  const [drop, setDrop] = React.useState<{ targetId: string; position: TreeMove["position"] } | null>(null);
  const [grabbedState, setGrabbed] = React.useState<string | null>(null);
  const grabbed = grabbedState !== null && all.has(grabbedState) ? grabbedState : null;
  const [announcement, setAnnouncement] = React.useState({ text: "", count: 0 });
  /** 读屏播报：同一句话连续出现时交替补一个零宽字符，让 live region 看到变化。 */
  function announce(text: string) { setAnnouncement(previous => ({ text, count: previous.count + 1 })); }
  const labelOf = (id: string) => all.get(id)?.node.label ?? id;
  function canMove(move: TreeMove): boolean {
    if (!draggable || disabled) return false;
    const source = all.get(move.nodeId); const target = all.get(move.targetId);
    if (!source || !target || source.node.disabled || target.node.disabled || move.nodeId === move.targetId) return false;
    // 不能放进自己的后代。
    for (let ancestor = target.parent; ancestor; ancestor = all.get(ancestor)?.parent ?? null) if (ancestor === move.nodeId) return false;
    // 位置不变的移动不算移动：已经紧挨着目标的前/后，或已经是目标的最后一个子项。
    if (move.position === "inside") { const kids = kidsOf(target.node); if (source.parent === move.targetId && kids?.[kids.length - 1]?.id === move.nodeId) return false; }
    else if (source.parent === target.parent) {
      const siblings = target.parent === null ? nodes : kidsOf(all.get(target.parent)!.node) ?? []; const from = siblings.findIndex(item => item.id === move.nodeId); const to = siblings.findIndex(item => item.id === move.targetId);
      if (move.position === "before" ? from + 1 === to : from - 1 === to) return false;
    }
    return canDrop?.(move) !== false;
  }
  function moveNode(move: TreeMove, event: React.SyntheticEvent, reason: TreeMoveDetails["reason"]): boolean {
    if (!canMove(move)) return false;
    onMove?.(move, { event, reason }); announce(messages.treeMoved(labelOf(move.nodeId), labelOf(move.targetId), move.position)); return true;
  }
  function dropPosition(event: React.DragEvent<HTMLElement>): TreeMove["position"] {
    const rect = event.currentTarget.getBoundingClientRect(); const ratio = rect.height > 0 ? (event.clientY - rect.top) / rect.height : 0.5;
    return ratio < DROP_EDGE ? "before" : ratio > 1 - DROP_EDGE ? "after" : "inside";
  }
  function keyDown(entry: Entry, event: React.KeyboardEvent<HTMLLIElement>) {
    if (event.defaultPrevented) return;
    if (event.target instanceof Element && event.target.closest('[role="treeitem"]') !== event.currentTarget) return;
    if (disabled || entry.node.disabled) return;
    if (draggable) {
      if ((event.ctrlKey || event.metaKey) && !event.altKey && event.key.toLocaleLowerCase() === "x") {
        event.preventDefault(); event.stopPropagation();
        if (grabbed === entry.node.id) { setGrabbed(null); announce(messages.treeMoveCancelled); } else { setGrabbed(entry.node.id); announce(messages.treeMovePicked(entry.node.label)); }
        return;
      }
      if (grabbed !== null) {
        if (event.key === "Escape") { event.preventDefault(); event.stopPropagation(); setGrabbed(null); announce(messages.treeMoveCancelled); return; }
        const position = event.altKey && !event.ctrlKey && !event.metaKey ? ({ ArrowUp: "before", ArrowDown: "after", Enter: "inside" } as const)[event.key as "ArrowUp" | "ArrowDown" | "Enter"] : undefined;
        if (position) {
          event.preventDefault(); event.stopPropagation();
          if (moveNode({ nodeId: grabbed, targetId: entry.node.id, position }, event, "keyboard")) setGrabbed(null); else announce(messages.treeMoveInvalid);
          return;
        }
      }
    }
    const position = enabled.findIndex(item => item.node.id === entry.node.id); const last = enabled.length - 1;
    const rtl = window.getComputedStyle(event.currentTarget).direction === "rtl";
    const openKey = rtl ? "ArrowLeft" : "ArrowRight"; const closeKey = rtl ? "ArrowRight" : "ArrowLeft";
    let target: string | undefined;
    if (event.key === "ArrowDown") target = enabled[Math.min(position + 1, last)]?.node.id;
    else if (event.key === "ArrowUp") target = enabled[Math.max(position - 1, 0)]?.node.id;
    else if (event.key === "Home") target = enabled[0]?.node.id;
    else if (event.key === "End") target = enabled[last]?.node.id;
    // 展开着的分支：有下一级就进入它；加载失败的停在错误态，→ 即重试。
    else if (event.key === openKey) { if (!branchOf(entry.node)) return; if (!isOpen(entry.node)) changeExpanded(entry.node.id, event, "keyboard"); else if (sources[entry.node.id]?.state === "error" && lazy(entry.node)) load(entry.node); else target = enabled.find(item => item.parent === entry.node.id)?.node.id; }
    else if (event.key === closeKey) { if (branchOf(entry.node) && isOpen(entry.node) && !forcedOpen(entry.node)) changeExpanded(entry.node.id, event, "keyboard"); else if (entry.parent && enabled.some(item => item.node.id === entry.parent)) target = entry.parent; }
    else if (event.key === "Enter" || event.key === " ") { if (checkable) { if (event.key === " ") changeChecked(entry.node, event, "keyboard"); } else select(entry.node.id, event, "keyboard"); }
    else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey && !event.nativeEvent.isComposing) {
      const now = Date.now(); const buffer = (now - typed.current.time > TREE_TYPEAHEAD_MS ? "" : typed.current.text) + event.key.toLocaleLowerCase(); typed.current = { text: buffer, time: now };
      const found = typeaheadTarget(enabled.map(item => item.node.label.toLocaleLowerCase()), position, buffer); target = enabled[found]?.node.id;
    }
    else return;
    event.preventDefault(); event.stopPropagation(); if (target) focus(target);
  }
  const statusRow = "m-0 flex min-h-(--qy-row-default) min-w-0 items-center gap-(--qy-action-gap) ps-[calc(var(--qy-control-xs)+var(--qy-action-gap))] text-body text-muted-foreground wrap-anywhere";
  function renderNodes(list: readonly TreeNode[], level: number): React.ReactNode {
    return list.filter(shown).map(node => {
      const isDisabled = disabled || Boolean(node.disabled); const branch = branchOf(node); const open = branch && isOpen(node);
      const kids = shownKids(node); const pendingLoad = open && kids === undefined && lazy(node); const failed = pendingLoad && sources[node.id]?.state === "error"; const busy = pendingLoad && !failed;
      const checkState = checkable ? deriveChecked(node) : false;
      const checkDim = checkable && (isDisabled || (branch && !lazy(node) && collectLeaves(node).every(leaf => leaf.disabled)));
      const canDrag = draggable && !isDisabled; const dropHere = drop?.targetId === node.id ? drop.position : null;
      return <li key={node.id} data-slot="tree-item" role="treeitem" aria-labelledby={`${idBase}-${order.get(node.id)}`} aria-level={level} aria-expanded={branch ? open : undefined} aria-busy={busy || undefined} aria-selected={checkable ? undefined : (selectable ? selected === node.id : undefined)} aria-checked={checkable ? checkState : undefined} aria-disabled={isDisabled || undefined} tabIndex={active === node.id ? 0 : -1} ref={element => { if (element) refs.current.set(node.id, element); else refs.current.delete(node.id); }} onFocus={event => { if (event.target === event.currentTarget) setFocused(node.id); }} onKeyDown={event => keyDown(all.get(node.id)!, event)} onClick={event => { if (event.target instanceof Element && event.target.closest('[role="treeitem"]') !== event.currentTarget) return; if (!isDisabled) { focus(node.id); if (checkable) changeChecked(node, event, "pointer"); else select(node.id, event, "pointer"); } }} className="min-w-0 outline-none [&:focus-visible>[data-slot=tree-row]]:ring-(length:--qy-focus-quiet-width) [&:focus-visible>[data-slot=tree-row]]:ring-ring [&:focus-visible>[data-slot=tree-row]]:ring-inset">
        <div data-slot="tree-row" data-grabbed={grabbed === node.id ? "" : undefined} data-dragging={dragging === node.id ? "" : undefined} draggable={canDrag || undefined}
          onDragStart={canDrag ? event => { event.stopPropagation(); setDragging(node.id); event.dataTransfer.effectAllowed = "move"; event.dataTransfer.setData("text/plain", node.label); } : undefined}
          onDragEnd={canDrag ? () => { setDragging(null); setDrop(null); } : undefined}
          onDragOver={draggable ? event => {
            if (dragging === null) return;
            const move = { nodeId: dragging, targetId: node.id, position: dropPosition(event) };
            if (!canMove(move)) { if (drop !== null) setDrop(null); return; }
            event.preventDefault(); event.dataTransfer.dropEffect = "move"; if (drop?.targetId !== node.id || drop.position !== move.position) setDrop({ targetId: node.id, position: move.position });
          } : undefined}
          onDragLeave={draggable ? event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDrop(previous => previous?.targetId === node.id ? null : previous); } : undefined}
          onDrop={draggable ? event => {
            if (dragging === null) return; event.preventDefault(); event.stopPropagation();
            const move = { nodeId: dragging, targetId: node.id, position: dropPosition(event) }; setDragging(null); setDrop(null); moveNode(move, event, "pointer");
          } : undefined}
          className={cn("relative flex min-h-(--qy-row-default) min-w-0 items-center gap-(--qy-action-gap) rounded-item", !checkable && selectable && (selected === node.id ? "bg-surface-selected" : !isDisabled && "hover:bg-accent"), grabbed === node.id && "bg-accent", dragging === node.id && "opacity-disabled", isDisabled && "opacity-disabled")}>
          {branch ? <Button data-slot="tree-toggle" variant="quiet" size="xs" shape="icon" disabled={isDisabled} tabIndex={-1} aria-hidden="true" onMouseDown={event => event.preventDefault()} onClick={event => { event.stopPropagation(); changeExpanded(node.id, event, "pointer"); if (!isDisabled) focus(node.id); }}><IconChevronRight aria-hidden="true" className={cn("rtl:rotate-180", open && "rotate-90 rtl:rotate-90")} /></Button> : <span aria-hidden="true" className="w-(--qy-control-xs) shrink-0" />}
          {checkable && <CheckMarker state={checkState} dim={Boolean(checkDim)} />}
          {/* 选中行除选中面外再加字重：不靠颜色的第二信号（WCAG 1.4.1，semantic.css 反馈梯）。 */}
          <span id={`${idBase}-${order.get(node.id)}`} data-slot="tree-label" className={cn("min-w-0 text-body wrap-anywhere", !checkable && selectable && selected === node.id && "font-medium")}>{highlightMatch(node.label, needle)}</span>
          {/* 放置位置：「之前 / 之后」是一条贴在行边上的线，「之中」是围住整行的环。线粗取 2 倍线宽——预设：加粗以便在拖动中一眼看清，没有更深的关系决定它。 */}
          {dropHere === "inside" && <span aria-hidden="true" data-slot="tree-drop" data-position="inside" className="pointer-events-none absolute inset-0 rounded-item ring-(length:--qy-focus-quiet-width) ring-primary ring-inset" />}
          {(dropHere === "before" || dropHere === "after") && <span aria-hidden="true" data-slot="tree-drop" data-position={dropHere} className={cn("pointer-events-none absolute inset-x-0 h-[calc(var(--qy-line-width)*2)] bg-primary", dropHere === "before" ? "top-0" : "bottom-0")} />}
        </div>
        {/* 下一级从上一级内容列的起点开始：缩进 = 展开列 + 动作间隔。每一级的展开钮、勾选标记各成一列（§19）。 */}
        {open && kids && <ul data-slot="tree-group" role="group" className="m-0 min-w-0 list-none ps-[calc(var(--qy-control-xs)+var(--qy-action-gap))]">{renderNodes(kids, level + 1)}</ul>}
        {busy && <div role="status" data-slot="tree-loading" onClick={event => event.stopPropagation()} className={statusRow}><IconLoader2 aria-hidden="true" className="qy-spin size-(--qy-fill-icon-narrow) shrink-0 sm:size-(--qy-fill-icon)" />{messages.loading}</div>}
        {failed && <div role="alert" data-slot="tree-error" onClick={event => event.stopPropagation()} className={cn(statusRow, "flex-wrap text-foreground")}><span>{messages.treeLoadFailed}</span><Button size="xs" variant="quiet" tabIndex={-1} onMouseDown={event => event.preventDefault()} onClick={event => { event.stopPropagation(); load(node); focus(node.id); }}>{messages.treeRetry}</Button></div>}
      </li>;
    });
  }
  const hintId = `${idBase}-hint`; const describedBy = [describedByProp, draggable ? hintId : undefined].filter(Boolean).join(" ") || undefined;
  const element = useRender({ defaultTagName: "div", render, ref: [root, ref ?? null], props: mergeProps({ "data-slot": "tree", role: "tree", "aria-multiselectable": checkable || undefined, "aria-disabled": disabled || undefined, "aria-describedby": describedBy, tabIndex: enabled.length === 0 ? 0 : undefined, className: cn("min-w-0 rounded-item text-body outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className), onFocusCapture(event: React.FocusEvent) { ownsFocus.current = true; onFocusCapture?.(event as React.FocusEvent<HTMLDivElement>); }, onBlurCapture(event: React.FocusEvent) { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) { ownsFocus.current = false; setGrabbed(null); } onBlurCapture?.(event as React.FocusEvent<HTMLDivElement>); }, children: visible.length === 0 ? <p data-slot="tree-empty" className="m-0 flex min-h-(--qy-row-default) items-center text-body text-muted-foreground wrap-anywhere">{emptyContent ?? messages.treeEmpty}</p> : <ul role="none" className="m-0 min-w-0 list-none p-0">{renderNodes(nodes, 1)}</ul> }, props) });
  // 提示与播报放在树的外面（role="tree" 里只该有节点）；只在可移动时存在。
  return draggable ? <>{element}<span id={hintId} hidden>{messages.treeMoveHint}</span><div data-slot="tree-announcer" role="status" className="sr-only">{announcement.text}{announcement.count % 2 === 0 ? "​" : ""}</div></> : element;
}
