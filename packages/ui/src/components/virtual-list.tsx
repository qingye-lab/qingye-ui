"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { defaultRangeExtractor, observeElementRect, useVirtualizer } from "@tanstack/react-virtual";
import * as React from "react";
import { cn } from "../utils";

export type VirtualListScrollOptions = { align?: "auto" | "start" | "center" | "end" };
export type VirtualListActions = {
  /** Invalid, noninteger and out-of-bounds indices throw. Does not move focus. */
  scrollToIndex: (index: number, options?: VirtualListScrollOptions) => void;
  /** Empty collections are a no-op. Does not move focus. */
  scrollToEnd: () => void;
};

export type VirtualListProps<Item> = Omit<useRender.ComponentProps<"div">, "children"> & {
  items: readonly Item[];
  /** Must remain stable across scrolling, insertion and reordering. */
  getKey: (item: Item, index: number) => React.Key;
  renderItem: (item: Item, index: number) => React.ReactNode;
  /** Fixed outer row extent, or the estimated outer extent in dynamic mode, in CSS px. */
  itemSize: number;
  height: number;
  /** Dynamic mode observes each mounted row's actual border-box height. */
  measurement?: "fixed" | "dynamic";
  /** Separate from the native scrolling-element ref. Scrolling is instant and keeps focus. */
  actionsRef?: React.Ref<VirtualListActions>;
  /** Follow appended items only when previously at the end; never initially jump to the end. */
  followEnd?: boolean;
  /** Render budget on either side of the visible window; not a visual dimension. */
  overscan?: number;
};

type ReadingAnchor = { key: React.Key; within: number; atEnd: boolean };
const useLayoutEffect = typeof document === "undefined" ? React.useEffect : React.useLayoutEffect;

/** A measured or fixed collection window with reachable rows and retained descendant focus. */
export function VirtualList<Item>({ items, getKey, renderItem, itemSize, height, measurement = "fixed", actionsRef, followEnd = false, overscan = 2, render, ref, className, style, ...props }: VirtualListProps<Item>) {
  if (!Number.isFinite(itemSize) || itemSize <= 0 || !Number.isFinite(height) || height <= 0) throw new RangeError("VirtualList itemSize and height must be finite positive numbers.");
  if (!Number.isInteger(overscan) || overscan < 0) throw new RangeError("VirtualList overscan must be a nonnegative integer.");
  if (measurement !== "fixed" && measurement !== "dynamic") throw new RangeError("VirtualList measurement must be fixed or dynamic.");
  // Identity is derived only when the collection/key function changes, never per scroll.
  const { keys, indexByKey } = React.useMemo(() => {
    const keys = items.map(getKey);
    if (new Set(keys.map(String)).size !== keys.length) throw new Error("VirtualList requires unique stable item keys.");
    return { keys, indexByKey: new Map(keys.map((key, index) => [key, index] as const)) };
  }, [items, getKey]);
  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const rowRefs = React.useRef(new Map<React.Key, HTMLDivElement>());
  const committedKeys = React.useRef(keys);
  const anchorRef = React.useRef<ReadingAnchor | null>(null);
  const hasCommitted = React.useRef(false);
  const [focusedKey, setFocusedKey] = React.useState<React.Key | null>(null);
  const [pendingFocus, setPendingFocus] = React.useState<React.Key | null>(null);
  const focusedIndex = focusedKey === null ? -1 : indexByKey.get(focusedKey) ?? -1;
  const pendingIndex = pendingFocus === null ? -1 : indexByKey.get(pendingFocus) ?? -1;
  const rangeExtractor = React.useCallback((range: Parameters<typeof defaultRangeExtractor>[0]) => {
    const indexes = new Set(defaultRangeExtractor(range));
    if (focusedIndex >= 0) indexes.add(focusedIndex);
    if (pendingIndex >= 0) indexes.add(pendingIndex);
    return Array.from(indexes).sort((a, b) => a - b);
  }, [focusedIndex, pendingIndex]);
  const getItemKey = React.useCallback((index: number) => keys[index]!, [keys]);
  const estimateSize = React.useCallback(() => itemSize, [itemSize]);
  // The explicit height also supplies the SSR window, before an element can be observed.
  const observeRect = React.useCallback<NonNullable<Parameters<typeof useVirtualizer<HTMLDivElement, HTMLDivElement>>[0]["observeElementRect"]>>((instance, callback) =>
    observeElementRect(instance, rect => callback({ ...rect, height: rect.height || height })), [height]);
  const virtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
    count: items.length, getScrollElement: () => viewportRef.current, getItemKey, estimateSize,
    initialRect: { width: 0, height }, observeElementRect: observeRect, overscan, rangeExtractor,
    anchorTo: followEnd && hasCommitted.current ? "end" : "start", followOnAppend: false,
  });
  // Keep an entirely above-viewport row's resize from moving the reading point, even
  // when scrolling upward. A row spanning the viewport grows below that point instead.
  virtualizer.shouldAdjustScrollPositionOnItemSizeChange = (item, _delta, instance) => item.end <= (instance.scrollOffset ?? 0);

  const rememberAnchor = () => {
    const viewport = viewportRef.current;
    if (!viewport || committedKeys.current !== keys) return;
    const item = virtualizer.getVirtualItemForOffset(viewport.scrollTop);
    anchorRef.current = item ? { key: item.key, within: viewport.scrollTop - item.start, atEnd: virtualizer.isAtEnd() } : null;
  };
  useLayoutEffect(() => {
    const previousKeys = committedKeys.current;
    const anchor = anchorRef.current;
    if (previousKeys !== keys) {
      // A command refers to the collection at call time. Data changes must not leave
      // its old numeric target correcting toward a replacement item on later frames.
      virtualizer.cancelScroll();
      const previousLast = previousKeys.at(-1);
      const retainedLast = previousLast === undefined ? -1 : indexByKey.get(previousLast) ?? -1;
      let previousPosition = -1;
      // Existing identities must retain their order. New history can arrive at the
      // front in the same update as output at the end; trimming old history is safe.
      const appended = previousKeys.length === 0 ? keys.length > 0 : retainedLast >= 0 && retainedLast < keys.length - 1 && previousKeys.every(key => {
        const position = indexByKey.get(key);
        if (position === undefined) return true;
        if (position <= previousPosition) return false;
        previousPosition = position;
        return true;
      });
      if (followEnd && (anchor?.atEnd ?? previousKeys.length === 0) && appended) {
        virtualizer.scrollToEnd({ behavior: "instant" });
      } else if (anchor) {
        const index = indexByKey.get(anchor.key);
        const item = index === undefined ? undefined : virtualizer.measurementsCache[index];
        if (item) {
          // Core can handle changed edges in end mode; this also covers a reorder
          // whose first/last keys are unchanged. It never adds the same delta twice.
          const target = Math.max(0, item.start + anchor.within);
          const maximum = Math.max(0, virtualizer.getTotalSize() - (viewportRef.current?.clientHeight || height));
          if (Math.abs((viewportRef.current?.scrollTop ?? 0) - Math.min(target, maximum)) > 0.5) virtualizer.scrollToOffset(target, { behavior: "instant" });
        }
      }
      committedKeys.current = keys;
    }
    rememberAnchor();
    hasCommitted.current = true;
  });
  const previousExtent = React.useRef({ itemSize, measurement });
  useLayoutEffect(() => {
    const previous = previousExtent.current;
    previousExtent.current = { itemSize, measurement };
    if (previous.itemSize !== itemSize || previous.measurement !== measurement) {
      virtualizer.measure();
      if (measurement === "dynamic") rowRefs.current.forEach(node => virtualizer.measureElement(node));
    }
  }, [itemSize, measurement, virtualizer]);
  useLayoutEffect(() => {
    if (focusedKey !== null && focusedIndex < 0) {
      viewportRef.current?.focus({ preventScroll: true });
      setFocusedKey(null);
    }
    if (pendingFocus !== null) {
      rowRefs.current.get(pendingFocus)?.focus({ preventScroll: true });
      setPendingFocus(null);
    }
  }, [focusedKey, focusedIndex, pendingFocus]);

  React.useImperativeHandle(actionsRef, () => ({
    scrollToIndex(index, { align = "auto" } = {}) {
      if (!Number.isInteger(index) || index < 0 || index >= items.length) throw new RangeError("VirtualList scrollToIndex index must be an integer within the collection.");
      if (!["auto", "start", "center", "end"].includes(align)) throw new RangeError("VirtualList scroll alignment must be auto, start, center or end.");
      virtualizer.scrollToIndex(index, { align, behavior: "instant" });
      rememberAnchor();
    },
    scrollToEnd() {
      if (items.length === 0) return;
      virtualizer.scrollToEnd({ behavior: "instant" });
      rememberAnchor();
    },
  }));

  const navigate = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || items.length === 0) return;
    const viewport = viewportRef.current;
    const target = event.target as HTMLElement;
    const row = target.closest<HTMLElement>("[data-slot=virtual-list-item]");
    if (target !== viewport && target !== row) return; // Text editors and nested actions keep their keys.
    virtualizer.cancelScroll();
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
    virtualizer.scrollToIndex(next, { align: "auto", behavior: "instant" });
    setPendingFocus(keys[next] ?? null);
  };

  return useRender({ defaultTagName: "div", render, ref: ref ? [viewportRef, ref] : viewportRef, props: mergeProps({
    "data-slot": "virtual-list", role: "list", tabIndex: 0,
    onScroll: rememberAnchor, onKeyDown: navigate,
    onWheel: () => virtualizer.cancelScroll(), onTouchStart: () => virtualizer.cancelScroll(),
  }, props, {
    className: cn("relative min-w-0 max-w-full overflow-auto outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring", className),
    // TanStack owns anchoring; disable the browser's independent anchor correction.
    style: { ...style, height, overflowAnchor: "none" },
    children: <div data-slot="virtual-list-space" style={{ position: "relative", height: virtualizer.getTotalSize() }}>
      {virtualizer.getVirtualItems().map(row => {
        const item = items[row.index]!;
        const key = keys[row.index]!;
        return <div key={key} ref={node => {
          if (node) rowRefs.current.set(key, node); else rowRefs.current.delete(key);
          if (measurement === "dynamic") virtualizer.measureElement(node);
        }} data-slot="virtual-list-item" data-index={row.index} data-virtual-index={row.index} role="listitem" tabIndex={-1}
          aria-posinset={row.index + 1} aria-setsize={items.length}
          className="min-w-0 outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring"
          style={{ position: "absolute", top: row.start, height: measurement === "fixed" ? itemSize : undefined, width: "100%" }}
          onFocusCapture={() => setFocusedKey(key)}
          onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocusedKey(null); }}
        >{renderItem(item, row.index)}</div>;
      })}
    </div>,
  }) });
}
