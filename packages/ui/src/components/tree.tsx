"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { Button } from "./button";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export interface TreeNode { id: string; label: string; disabled?: boolean; children?: readonly TreeNode[] }
export interface TreeChangeDetails { event: React.SyntheticEvent; reason: "keyboard" | "pointer"; cancel(): void }
export type TreeProps = Omit<useRender.ComponentProps<"div">, "children"> & {
  nodes: readonly TreeNode[];
  expandedIds?: readonly string[]; defaultExpandedIds?: readonly string[];
  onExpandedChange?: (ids: string[], details: TreeChangeDetails) => void;
  selectedId?: string | null; defaultSelectedId?: string | null;
  onSelectionChange?: (id: string | null, details: TreeChangeDetails) => void;
  selectable?: boolean; disabled?: boolean; emptyContent?: React.ReactNode;
};
type Entry = { node: TreeNode; parent: string | null; level: number };
export function Tree({ nodes, expandedIds, defaultExpandedIds = [], onExpandedChange, selectedId, defaultSelectedId = null, onSelectionChange, selectable = true, disabled = false, emptyContent, render, ref, className, onFocusCapture, onBlurCapture, ...props }: TreeProps) {
  const { messages } = useUILocale();
  const [localExpanded, setLocalExpanded] = React.useState<readonly string[]>(defaultExpandedIds);
  const [localSelected, setLocalSelected] = React.useState<string | null>(defaultSelectedId);
  const expanded = expandedIds ?? localExpanded; const selected = selectedId === undefined ? localSelected : selectedId;
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
    else if (event.key === "Enter" || event.key === " ") select(entry.node.id, event, "keyboard");
    else if (event.key.length === 1 && !event.altKey && !event.ctrlKey && !event.metaKey) { const candidates = [...enabled.slice(position + 1), ...enabled.slice(0, position + 1)]; target = candidates.find(item => item.node.label.toLocaleLowerCase().startsWith(event.key.toLocaleLowerCase()))?.node.id; }
    else return;
    event.preventDefault(); event.stopPropagation(); if (target) focus(target);
  }
  function renderNodes(list: readonly TreeNode[], level: number): React.ReactNode {
    return list.map(node => {
      const isDisabled = disabled || Boolean(node.disabled); const branch = Boolean(node.children?.length); const open = branch && expanded.includes(node.id);
      return <li key={node.id} data-slot="tree-item" role="treeitem" aria-label={node.label} aria-level={level} aria-expanded={branch ? open : undefined} aria-selected={selectable ? selected === node.id : undefined} aria-disabled={isDisabled || undefined} tabIndex={active === node.id ? 0 : -1} ref={element => { if (element) refs.current.set(node.id, element); else refs.current.delete(node.id); }} onFocus={event => { if (event.target === event.currentTarget) setFocused(node.id); }} onKeyDown={event => keyDown(all.get(node.id)!, event)} onClick={event => { if (event.target instanceof Element && event.target.closest('[role="treeitem"]') !== event.currentTarget) return; if (!isDisabled) { focus(node.id); select(node.id, event, "pointer"); } }} className="min-w-0 outline-none [&:focus-visible>[data-slot=tree-row]]:ring-(length:--qy-focus-quiet-width) [&:focus-visible>[data-slot=tree-row]]:ring-ring [&:focus-visible>[data-slot=tree-row]]:ring-inset">
        <div data-slot="tree-row" className={cn("flex min-h-(--qy-row-default) min-w-0 items-center gap-(--qy-action-gap) rounded-item", selected === node.id && selectable && "bg-accent", isDisabled && "opacity-64")}>
          {branch ? <Button data-slot="tree-toggle" variant="quiet" size="xs" shape="icon" disabled={isDisabled} tabIndex={-1} aria-label={`${open ? messages.collapse : messages.expand} ${node.label}`} onClick={event => { event.stopPropagation(); changeExpanded(node.id, event, "pointer"); if (!isDisabled) focus(node.id); }}><ChevronRightIcon aria-hidden="true" className={cn("rtl:rotate-180", open && "rotate-90 rtl:rotate-90")} /></Button> : <span aria-hidden="true" className="w-(--qy-control-xs) shrink-0" />}
          <span data-slot="tree-label" className="min-w-0 text-body wrap-anywhere">{node.label}</span>
        </div>
        {open && <ul data-slot="tree-group" role="group" className="m-0 min-w-0 list-none ps-(--qy-panel-gap)">{renderNodes(node.children!, level + 1)}</ul>}
      </li>;
    });
  }
  return useRender({ defaultTagName: "div", render, ref: [root, ref ?? null], props: mergeProps({ "data-slot": "tree", role: "tree", "aria-disabled": disabled || undefined, tabIndex: enabled.length === 0 ? 0 : undefined, className: cn("min-w-0 rounded-item text-body outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className), onFocusCapture(event: React.FocusEvent) { ownsFocus.current = true; onFocusCapture?.(event as React.FocusEvent<HTMLDivElement>); }, onBlurCapture(event: React.FocusEvent) { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) ownsFocus.current = false; onBlurCapture?.(event as React.FocusEvent<HTMLDivElement>); }, children: nodes.length === 0 ? <p data-slot="tree-empty" className="m-0 text-support text-muted-foreground">{emptyContent ?? messages.treeEmpty}</p> : <ul role="none" className="m-0 min-w-0 list-none p-0">{renderNodes(nodes, 1)}</ul> }, props) });
}
