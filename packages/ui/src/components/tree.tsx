"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconCheck, IconChevronRight, IconMinus } from "@tabler/icons-react";
import * as React from "react";
import { Button } from "./button";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export interface TreeNode { id: string; label: string; disabled?: boolean; children?: readonly TreeNode[] }
export interface TreeChangeDetails { event: React.SyntheticEvent; reason: "keyboard" | "pointer"; cancel(): void }
/** 一个节点的勾选事实：true/false 是确定态，"mixed" 只用于分支——它由启用的叶子后代派生，从不写入值本身。 */
export type TreeCheckedState = boolean | "mixed";
export type TreeProps = Omit<useRender.ComponentProps<"div">, "children"> & {
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
};
type Entry = { node: TreeNode; parent: string | null; level: number };
/** 叶子后代：分支递归到底，叶子返回自身一项。空 children 数组已经等同叶子（与 renderNodes 的 branch 判断一致）。 */
function collectLeaves(node: TreeNode): TreeNode[] {
  return node.children?.length ? node.children.flatMap(collectLeaves) : [node];
}
/** 装饰性标记：不是 Base UI Checkbox，不单独可聚焦——treeitem 自己承担交互，Space 与行点击触发 changeChecked。
 * 几何与墨色读与 Checkbox 相同的角色 token（--qy-marker-size[-narrow]、--qy-marker-inset、--qy-radius-marker），
 * 但状态来自 state 参数而不是 Base UI 的 state 回调，因此不复用 Checkbox 的 (state)=>cn(...) 写法，直接照搬取值。
 * 定义在组件外部：它不依赖 Tree 的闭包，放在内部会让每次 Tree 渲染都产生新的函数身份，白白重挂载全部标记。 */
function CheckMarker({ state, dim }: { state: TreeCheckedState; dim: boolean }) {
  const isChecked = state === true || state === "mixed";
  return <span aria-hidden="true" style={{ "--qy-tree-check-edge": "var(--qy-marker-size)", "--qy-tree-check-edge-narrow": "var(--qy-marker-size-narrow)" } as React.CSSProperties}
    className={cn(
      "inline-flex shrink-0 items-center justify-center size-(--qy-tree-check-edge-narrow) sm:size-(--qy-tree-check-edge) rounded-[min(var(--qy-radius-marker),calc(var(--qy-tree-check-edge-narrow)/4))] sm:rounded-[min(var(--qy-radius-marker),calc(var(--qy-tree-check-edge)/4))] border transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
      isChecked ? "border-transparent bg-primary text-primary-foreground" : "border-input bg-card dark:bg-surface-inset",
      dim && "opacity-64",
    )}
  >{state === "mixed" ? <IconMinus aria-hidden="true" className="size-3/4" /> : state === true ? <IconCheck aria-hidden="true" className="size-3/4" /> : null}</span>;
}
export function Tree({ nodes, expandedIds, defaultExpandedIds = [], onExpandedChange, selectedId, defaultSelectedId = null, onSelectionChange, selectable = true, checkable = false, checkedIds, defaultCheckedIds = [], onCheckedChange, disabled = false, emptyContent, render, ref, className, onFocusCapture, onBlurCapture, ...props }: TreeProps) {
  const { messages } = useUILocale();
  const [localExpanded, setLocalExpanded] = React.useState<readonly string[]>(defaultExpandedIds);
  const [localSelected, setLocalSelected] = React.useState<string | null>(defaultSelectedId);
  const [localChecked, setLocalChecked] = React.useState<readonly string[]>(defaultCheckedIds);
  const expanded = expandedIds ?? localExpanded; const selected = selectedId === undefined ? localSelected : selectedId;
  const checked = checkedIds ?? localChecked; const checkedSet = new Set(checked);
  const all = new Map<string, Entry>(); const visible: Entry[] = [];
  function index(list: readonly TreeNode[], parent: string | null, level: number, shown: boolean) {
    for (const node of list) {
      if (!node.id.trim() || !node.label.trim() || all.has(node.id)) throw new Error("Tree requires unique, nonempty ids and labels.");
      const entry = { node, parent, level }; all.set(node.id, entry); if (shown) visible.push(entry);
      if (node.children) index(node.children, node.id, level + 1, shown && expanded.includes(node.id));
    }
  }
  index(nodes, null, 1, true);
  const enabled = visible.filter(entry => !disabled && !entry.node.disabled);
  /** 分支的勾选态：只看启用的叶子后代（「remaining enabled descendants」）。全禁用的子树里没有可操作的事实，
   * 退回看全部叶子，只为如实显示，不代表可以点它改变什么。 */
  function deriveChecked(node: TreeNode): TreeCheckedState {
    if (!node.children?.length) return checkedSet.has(node.id);
    const leaves = collectLeaves(node); const enabledLeaves = leaves.filter(leaf => !leaf.disabled);
    const pool = enabledLeaves.length ? enabledLeaves : leaves; if (pool.length === 0) return false;
    const count = pool.filter(leaf => checkedSet.has(leaf.id)).length;
    return count === 0 ? false : count === pool.length ? true : "mixed";
  }
  const [focused, setFocused] = React.useState<string | null>(null);
  const root = React.useRef<HTMLDivElement | null>(null); const refs = React.useRef(new Map<string, HTMLLIElement>()); const ownsFocus = React.useRef(false);
  let active = enabled.find(entry => entry.node.id === focused)?.node.id ?? null;
  if (active === null && focused !== null) {
    let ancestor = all.get(focused)?.parent;
    while (ancestor) { if (enabled.some(entry => entry.node.id === ancestor)) { active = ancestor; break; } ancestor = all.get(ancestor)?.parent; }
  }
  active ??= enabled[0]?.node.id ?? null;
  React.useLayoutEffect(() => {
    if (focused !== active) { setFocused(active); if (ownsFocus.current) { if (active !== null) refs.current.get(active)?.focus(); else root.current?.focus(); } }
  }, [focused, active]);
  function focus(id: string) { setFocused(id); refs.current.get(id)?.focus(); }
  function changeExpanded(id: string, event: React.SyntheticEvent, reason: TreeChangeDetails["reason"]) {
    const entry = all.get(id); if (disabled || entry?.node.disabled || !entry?.node.children?.length) return;
    const next = expanded.includes(id) ? expanded.filter(key => key !== id) : [...expanded, id]; let canceled = false;
    onExpandedChange?.([...next], { event, reason, cancel() { canceled = true; } });
    if (!canceled && expandedIds === undefined) setLocalExpanded(next);
  }
  function select(id: string, event: React.SyntheticEvent, reason: TreeChangeDetails["reason"]) {
    if (!selectable || disabled || all.get(id)?.node.disabled) return;
    let canceled = false; onSelectionChange?.(id, { event, reason, cancel() { canceled = true; } });
    if (!canceled && selectedId === undefined) setLocalSelected(id);
  }
  /** 级联只touch启用的叶子：disabled 叶子保留当前事实，不被父级的勾选/取消改变（NG 之外的名实要求）。
   * mixed 与 false 点击都归为「变为勾选」，和原生 indeterminate 复选框点击后的事实一致。 */
  function changeChecked(node: TreeNode, event: React.SyntheticEvent, reason: TreeChangeDetails["reason"]) {
    if (!checkable || disabled || node.disabled) return;
    const enabledLeaves = collectLeaves(node).filter(leaf => !leaf.disabled); if (enabledLeaves.length === 0) return;
    const target = deriveChecked(node) !== true; const next = new Set(checked);
    for (const leaf of enabledLeaves) { if (target) next.add(leaf.id); else next.delete(leaf.id); }
    const result = [...next]; let canceled = false;
    onCheckedChange?.(result, { event, reason, cancel() { canceled = true; } });
    if (!canceled && checkedIds === undefined) setLocalChecked(result);
  }
  function keyDown(entry: Entry, event: React.KeyboardEvent<HTMLLIElement>) {
    if (event.defaultPrevented) return;
    if (event.target instanceof Element && event.target.closest('[role="treeitem"]') !== event.currentTarget) return;
    if (disabled || entry.node.disabled) return;
    const position = enabled.findIndex(item => item.node.id === entry.node.id); const last = enabled.length - 1;
    const rtl = window.getComputedStyle(event.currentTarget).direction === "rtl";
    const openKey = rtl ? "ArrowLeft" : "ArrowRight"; const closeKey = rtl ? "ArrowRight" : "ArrowLeft";
    let target: string | undefined;
    if (event.key === "ArrowDown") target = enabled[Math.min(position + 1, last)]?.node.id;
    else if (event.key === "ArrowUp") target = enabled[Math.max(position - 1, 0)]?.node.id;
    else if (event.key === "Home") target = enabled[0]?.node.id;
    else if (event.key === "End") target = enabled[last]?.node.id;
    else if (event.key === openKey) { if (!expanded.includes(entry.node.id)) changeExpanded(entry.node.id, event, "keyboard"); else target = enabled.find(item => item.parent === entry.node.id)?.node.id; }
    else if (event.key === closeKey) { if (expanded.includes(entry.node.id)) changeExpanded(entry.node.id, event, "keyboard"); else if (entry.parent && enabled.some(item => item.node.id === entry.parent)) target = entry.parent; }
    else if (event.key === "Enter" || event.key === " ") { if (checkable) { if (event.key === " ") changeChecked(entry.node, event, "keyboard"); } else select(entry.node.id, event, "keyboard"); }
    else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) { const candidates = [...enabled.slice(position + 1), ...enabled.slice(0, position + 1)]; target = candidates.find(item => item.node.label.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()))?.node.id; }
    else return;
    event.preventDefault(); event.stopPropagation(); if (target) focus(target);
  }
  function renderNodes(list: readonly TreeNode[], level: number): React.ReactNode {
    return list.map(node => {
      const isDisabled = disabled || Boolean(node.disabled); const branch = Boolean(node.children?.length); const open = branch && expanded.includes(node.id);
      const checkState = checkable ? deriveChecked(node) : false;
      const checkDim = checkable && (isDisabled || (branch && collectLeaves(node).every(leaf => leaf.disabled)));
      return <li key={node.id} data-slot="tree-item" role="treeitem" aria-label={node.label} aria-level={level} aria-expanded={branch ? open : undefined} aria-selected={checkable ? undefined : (selectable ? selected === node.id : undefined)} aria-checked={checkable ? checkState : undefined} aria-disabled={isDisabled || undefined} tabIndex={active === node.id ? 0 : -1} ref={element => { if (element) refs.current.set(node.id, element); else refs.current.delete(node.id); }} onFocus={event => { if (event.target === event.currentTarget) setFocused(node.id); }} onKeyDown={event => keyDown(all.get(node.id)!, event)} onClick={event => { if (event.target instanceof Element && event.target.closest('[role="treeitem"]') !== event.currentTarget) return; if (!isDisabled) { focus(node.id); if (checkable) changeChecked(node, event, "pointer"); else select(node.id, event, "pointer"); } }} className="min-w-0 outline-none [&:focus-visible>[data-slot=tree-row]]:ring-(length:--qy-focus-quiet-width) [&:focus-visible>[data-slot=tree-row]]:ring-ring [&:focus-visible>[data-slot=tree-row]]:ring-inset">
        <div data-slot="tree-row" className={cn("flex min-h-(--qy-row-default) min-w-0 items-center gap-(--qy-action-gap) rounded-item", !checkable && selected === node.id && selectable && "bg-(--qy-surface-active)", isDisabled && "opacity-64")}>
          {branch ? <Button data-slot="tree-toggle" variant="quiet" size="xs" shape="icon" disabled={isDisabled} tabIndex={-1} aria-label={`${open ? messages.collapse : messages.expand} ${node.label}`} onClick={event => { event.stopPropagation(); changeExpanded(node.id, event, "pointer"); if (!isDisabled) focus(node.id); }}><IconChevronRight aria-hidden="true" className={cn("rtl:rotate-180", open && "rotate-90 rtl:rotate-90")} /></Button> : <span aria-hidden="true" className="w-(--qy-control-xs) shrink-0" />}
          {checkable && <CheckMarker state={checkState} dim={Boolean(checkDim)} />}
          <span data-slot="tree-label" className="min-w-0 text-body wrap-anywhere">{node.label}</span>
        </div>
        {/* 下一级从上一级内容列的起点开始：缩进 = 展开列 + 动作间隔。每一级的展开钮、勾选标记各成一列（§19）。 */}
        {open && <ul data-slot="tree-group" role="group" className="m-0 min-w-0 list-none ps-[calc(var(--qy-control-xs)+var(--qy-action-gap))]">{renderNodes(node.children!, level + 1)}</ul>}
      </li>;
    });
  }
  return useRender({ defaultTagName: "div", render, ref: [root, ref ?? null], props: mergeProps({ "data-slot": "tree", role: "tree", "aria-disabled": disabled || undefined, tabIndex: enabled.length === 0 ? 0 : undefined, className: cn("min-w-0 rounded-item text-body outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className), onFocusCapture(event: React.FocusEvent) { ownsFocus.current = true; onFocusCapture?.(event as React.FocusEvent<HTMLDivElement>); }, onBlurCapture(event: React.FocusEvent) { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) ownsFocus.current = false; onBlurCapture?.(event as React.FocusEvent<HTMLDivElement>); }, children: nodes.length === 0 ? <p data-slot="tree-empty" className="m-0 flex min-h-(--qy-row-default) items-center text-body text-muted-foreground wrap-anywhere">{emptyContent ?? messages.treeEmpty}</p> : <ul role="none" className="m-0 min-w-0 list-none p-0">{renderNodes(nodes, 1)}</ul> }, props) });
}
