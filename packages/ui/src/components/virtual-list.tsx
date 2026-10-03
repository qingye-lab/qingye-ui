"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { cn } from "../utils";

export type VirtualListProps<Item> = Omit<useRender.ComponentProps<"div">, "children"> & {
  items: readonly Item[];
  /** Must remain stable across scrolling, insertion and reordering. */
  getKey: (item: Item, index: number) => React.Key;
  renderItem: (item: Item, index: number) => React.ReactNode;
  /** Fixed outer row extent and viewport extent, in CSS px, supplied by the consumer. */
  itemSize: number;
  height: number;
  /** Render budget on either side of the visible window; not a visual dimension. */
  overscan?: number;
};

/** A fixed-row collection window with reachable rows and retained descendant focus. */
export function VirtualList<Item>({ items, getKey, renderItem, itemSize, height, overscan = 2, render, ref, className, style, ...props }: VirtualListProps<Item>) {
  if (!Number.isFinite(itemSize) || itemSize <= 0 || !Number.isFinite(height) || height <= 0) throw new RangeError("VirtualList itemSize and height must be finite positive numbers.");
  if (!Number.isInteger(overscan) || overscan < 0) throw new RangeError("VirtualList overscan must be a nonnegative integer.");
  const keys = items.map(getKey);
  if (new Set(keys.map(String)).size !== keys.length) throw new Error("VirtualList requires unique stable item keys.");
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const rowRefs = React.useRef(new Map<React.Key, HTMLDivElement>());
  const [scrollTop, setScrollTop] = React.useState(0);
  const [viewportHeight, setViewportHeight] = React.useState(height);
  const [focusedKey, setFocusedKey] = React.useState<React.Key | null>(null);
  const [pendingFocus, setPendingFocus] = React.useState<React.Key | null>(null);
  React.useLayoutEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure = () => setViewportHeight(viewport.clientHeight || height);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [height]);
  const first = Math.max(0, Math.min(items.length - 1, Math.floor(scrollTop / itemSize)) - overscan);
  const last = Math.min(items.length - 1, Math.ceil((scrollTop + viewportHeight) / itemSize) - 1 + overscan);
  const indexes = new Set<number>();
  for (let index = first; index <= last; index++) indexes.add(index);
  const focusedIndex = focusedKey === null ? -1 : keys.indexOf(focusedKey);
  if (focusedIndex >= 0) indexes.add(focusedIndex);
  React.useLayoutEffect(() => {
    if (focusedKey !== null && focusedIndex < 0) {
      viewportRef.current?.focus({ preventScroll: true });
      setFocusedKey(null);
    }
  }, [focusedKey, focusedIndex]);
  const pendingIndex = pendingFocus === null ? -1 : keys.indexOf(pendingFocus);
  if (pendingIndex >= 0) indexes.add(pendingIndex);
  React.useLayoutEffect(() => {
    if (pendingFocus === null) return;
    rowRefs.current.get(pendingFocus)?.focus({ preventScroll: true });
    setPendingFocus(null);
  }, [pendingFocus]);

  const navigate = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || items.length === 0) return;
    const viewport = viewportRef.current;
    const target = event.target as HTMLElement;
    const row = target.closest<HTMLElement>("[data-slot=virtual-list-item]");
    if (target !== viewport && target !== row) return; // Text editors and nested actions keep their keys.
    const current = row ? Number(row.dataset.virtualIndex) : -1;
    let next: number;
    switch (event.key) {
      case "ArrowDown": next = Math.min(items.length - 1, current + 1); break;
      case "ArrowUp": next = Math.max(0, current - 1); break;
      case "Home": next = 0; break;
      case "End": next = items.length - 1; break;
      default: return;
    }
    event.preventDefault();
    if (!viewport) return;
    const top = next * itemSize;
    const bottom = top + itemSize;
    const actualHeight = viewport.clientHeight || height;
    const nextTop = top < viewport.scrollTop ? top : bottom > viewport.scrollTop + actualHeight ? bottom - actualHeight : viewport.scrollTop;
    viewport.scrollTop = Math.max(0, nextTop);
    setScrollTop(viewport.scrollTop);
    setPendingFocus(keys[next] ?? null);
  };

  return useRender({ defaultTagName: "div", render, ref: ref ? [viewportRef, ref] : viewportRef, props: mergeProps({
    "data-slot": "virtual-list", role: "list", tabIndex: 0,
    onScroll: (event: React.UIEvent<HTMLDivElement>) => setScrollTop(event.currentTarget.scrollTop),
    onKeyDown: navigate,
  }, props, {
    className: cn("relative min-w-0 max-w-full overflow-auto outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring", className),
    style: { ...style, height },
    children: <div data-slot="virtual-list-space" style={{ position: "relative", height: items.length * itemSize }}>
      {Array.from(indexes).sort((a, b) => a - b).map(index => {
        const item = items[index]!;
        const key = keys[index]!;
        return <div key={key} ref={node => { if (node) rowRefs.current.set(key, node); else rowRefs.current.delete(key); }}
          data-slot="virtual-list-item" data-virtual-index={index} role="listitem" tabIndex={-1}
          aria-posinset={index + 1} aria-setsize={items.length}
          className="min-w-0 outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring"
          style={{ position: "absolute", top: index * itemSize, height: itemSize, width: "100%" }}
          onFocusCapture={() => setFocusedKey(key)}
          onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusedKey(null); }}
        >{renderItem(item, index)}</div>;
      })}
    </div>,
  }) });
}
