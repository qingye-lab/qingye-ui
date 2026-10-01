"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "../utils";

export type TreeNode = { id: string; label: ReactNode; children?: readonly TreeNode[]; disabled?: boolean };
export type TreeProps = {
  nodes: readonly TreeNode[];
  label: string;
  selected?: string | null;
  defaultSelected?: string | null;
  onSelectedChange?: (id: string) => void;
  expanded?: readonly string[];
  defaultExpanded?: readonly string[];
  onExpandedChange?: (ids: string[]) => void;
  className?: string;
};
type VisibleNode = { node: TreeNode; level: number; parent: string | null; position: number; size: number };

export function Tree({ nodes, label, selected, defaultSelected = null, onSelectedChange, expanded, defaultExpanded = [], onExpandedChange, className }: TreeProps) {
  const [internalSelected, setSelected] = useState(defaultSelected);
  const [internalExpanded, setExpanded] = useState<readonly string[]>(defaultExpanded);
  const [active, setActive] = useState<string | null>(null);
  const refs = useRef(new Map<string, HTMLDivElement>());
  const open = expanded ?? internalExpanded;
  const value = selected === undefined ? internalSelected : selected;
  const visible = useMemo(() => {
    const rows: VisibleNode[] = [];
    const walk = (items: readonly TreeNode[], level: number, parent: string | null) => items.forEach((node, index) => {
      rows.push({ node, level, parent, position: index + 1, size: items.length });
      if (node.children && open.includes(node.id)) walk(node.children, level + 1, node.id);
    });
    walk(nodes, 1, null); return rows;
  }, [nodes, open]);
  const focusable = visible.filter(({ node }) => !node.disabled);
  const tabStop = focusable.some(({ node }) => node.id === active) ? active : focusable[0]?.node.id;
  useEffect(() => {
    if (active && !visible.some(({ node }) => node.id === active)) setActive(focusable[0]?.node.id ?? null);
  }, [active, visible, focusable]);
  const toggle = (id: string, shouldOpen: boolean) => {
    const next = shouldOpen ? [...new Set([...open, id])] : open.filter((item) => item !== id);
    if (expanded === undefined) setExpanded(next); onExpandedChange?.(next);
  };
  const focus = (id: string | undefined) => { if (id) { setActive(id); refs.current.get(id)?.focus(); } };
  const choose = (id: string) => { if (selected === undefined) setSelected(id); onSelectedChange?.(id); };
  return <div role="tree" aria-label={label} className={cn("flex min-w-0 flex-col gap-1", className)}>{visible.map(({ node, level, parent, position, size }) => <div key={node.id} role="treeitem" ref={(element) => { if (element) refs.current.set(node.id, element); else refs.current.delete(node.id); }}
    tabIndex={node.id === tabStop ? 0 : -1} aria-level={level} aria-posinset={position} aria-setsize={size} aria-selected={value === node.id} aria-expanded={node.children?.length ? open.includes(node.id) : undefined} aria-disabled={node.disabled || undefined}
    className={cn("flex min-w-0 cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring", value === node.id && "bg-accent font-medium", node.disabled && "cursor-default opacity-64")}
    onFocus={() => setActive(node.id)} onClick={() => { if (!node.disabled) { focus(node.id); choose(node.id); if (node.children?.length) toggle(node.id, !open.includes(node.id)); } }}
    onKeyDown={(event) => {
      if (node.disabled) return;
      const index = focusable.findIndex((item) => item.node.id === node.id);
      if (event.key === "ArrowDown") focus(focusable[Math.min(index + 1, focusable.length - 1)]?.node.id);
      else if (event.key === "ArrowUp") focus(focusable[Math.max(index - 1, 0)]?.node.id);
      else if (event.key === "Home") focus(focusable[0]?.node.id);
      else if (event.key === "End") focus(focusable.at(-1)?.node.id);
      else if (event.key === "ArrowRight") { if (node.children?.length) { if (!open.includes(node.id)) toggle(node.id, true); else focus(node.children.find((item) => !item.disabled)?.id); } }
      else if (event.key === "ArrowLeft") { if (node.children?.length && open.includes(node.id)) toggle(node.id, false); else if (parent) focus(parent); }
      else if (event.key === "Enter" || event.key === " ") choose(node.id);
      else return;
      event.preventDefault();
    }}>
    {Array.from({ length: level - 1 }, (_, index) => <span key={index} aria-hidden="true" className="w-3 shrink-0" />)}
    <span aria-hidden="true" className="size-4 shrink-0">{node.children?.length ? open.includes(node.id) ? <ChevronDownIcon className="size-4" /> : <ChevronRightIcon className="size-4" /> : null}</span><span className="min-w-0 truncate">{node.label}</span>
  </div>)}</div>;
}
