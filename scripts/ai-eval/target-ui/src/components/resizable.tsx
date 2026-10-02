"use client";

import { GripHorizontalIcon, GripVerticalIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type ResizableDirection = "horizontal" | "vertical";

interface PanelConstraints {
  minSize: number;
  maxSize: number;
  collapsible: boolean;
  collapsedSize: number;
}

interface PanelRecord extends PanelConstraints {
  element: HTMLElement | null;
  defaultSize: number | undefined;
}

interface Layout {
  ids: string[];
  sizes: number[];
}

/** Imperative control of one panel, through `ResizablePanel`'s `panelRef`. */
export interface ResizablePanelHandle {
  collapse: () => void;
  expand: () => void;
  /** Resize to a percentage of the group, within the panel's constraints. */
  resize: (size: number) => void;
  getSize: () => number;
  isCollapsed: () => boolean;
}

const EPSILON = 0.001;

function near(a: number, b: number): boolean {
  return Math.abs(a - b) < EPSILON;
}

function sameIds(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((id, i) => id === b[i]);
}

function sameSizes(a: readonly number[], b: readonly number[]): boolean {
  return a.length === b.length && a.every((size, i) => near(size, b[i] ?? 0));
}

function isCollapsedSize(size: number, c: PanelConstraints): boolean {
  return c.collapsible && size <= c.collapsedSize + EPSILON;
}

/**
 * Moves the separator after panel `index` by `delta` percent, starting from
 * `start`. Positive `delta` grows the panels before the separator. Panels on
 * the shrinking side give up space nearest-first down to their minimum; a
 * collapsible panel holds at its minimum until the drag passes halfway to its
 * collapsed size, then snaps closed. Returns `start` when nothing can move.
 */
function resizeLayout(
  start: readonly number[],
  constraints: readonly PanelConstraints[],
  index: number,
  delta: number,
): number[] {
  const count = start.length;
  if (!delta || index < 0 || index >= count - 1) return [...start];
  const next = [...start];
  const before: number[] = [];
  const after: number[] = [];
  for (let i = index; i >= 0; i--) before.push(i);
  for (let i = index + 1; i < count; i++) after.push(i);
  const grow = delta > 0 ? before : after;
  const shrink = delta > 0 ? after : before;
  const pivot = grow[0] as number;
  const pivotRule = constraints[pivot] as PanelConstraints;
  const pivotCollapsed = isCollapsedSize(next[pivot] as number, pivotRule);
  let amount = Math.abs(delta);

  // A collapsed panel opens once the drag passes halfway to its minimum.
  if (pivotCollapsed) {
    const gap = pivotRule.minSize - pivotRule.collapsedSize;
    if (amount < gap / 2) return [...start];
    amount = Math.max(amount, gap);
  }

  let capacity = 0;
  for (const i of grow) {
    const rule = constraints[i] as PanelConstraints;
    const size = next[i] as number;
    if (i !== pivot && isCollapsedSize(size, rule)) continue;
    capacity += Math.max(0, rule.maxSize - size);
  }
  amount = Math.min(amount, capacity);
  if (amount < EPSILON) return [...start];

  let shrunk = 0;
  for (const i of shrink) {
    const want = amount - shrunk;
    if (want < EPSILON) break;
    const rule = constraints[i] as PanelConstraints;
    const size = next[i] as number;
    if (size - want >= rule.minSize - EPSILON) {
      next[i] = size - want;
      shrunk += want;
      break;
    }
    if (rule.collapsible && !isCollapsedSize(size, rule)) {
      const threshold = (rule.collapsedSize + rule.minSize) / 2;
      const freed = size - rule.collapsedSize;
      if (size - want < threshold && shrunk + freed <= capacity + EPSILON) {
        next[i] = rule.collapsedSize;
        shrunk += freed;
        continue;
      }
      // Hold at the minimum; space comes from further panels only once closed.
      const available = Math.max(0, size - rule.minSize);
      next[i] = size - available;
      shrunk += available;
      break;
    }
    const floor = isCollapsedSize(size, rule) ? size : rule.minSize;
    const available = Math.max(0, size - floor);
    next[i] = size - available;
    shrunk += available;
  }
  if (shrunk < EPSILON) return [...start];

  let remaining = shrunk;
  for (const i of grow) {
    if (remaining < EPSILON) break;
    const rule = constraints[i] as PanelConstraints;
    const size = next[i] as number;
    if (i !== pivot && isCollapsedSize(size, rule)) continue;
    const give = Math.min(Math.max(0, rule.maxSize - size), remaining);
    next[i] = size + give;
    remaining -= give;
  }
  if (remaining > EPSILON) return [...start];
  if (pivotCollapsed && (next[pivot] as number) < pivotRule.minSize - EPSILON) {
    return [...start];
  }
  return next;
}

/** Fills unspecified sizes evenly, clamps to constraints and sums to 100. */
function normalizeLayout(
  sizes: readonly (number | undefined)[],
  constraints: readonly PanelConstraints[],
): number[] {
  const known = sizes.reduce<number>((sum, size) => sum + (size ?? 0), 0);
  const unknown = sizes.filter((size) => size === undefined).length;
  const fill = unknown ? Math.max(0, 100 - known) / unknown : 0;
  const next = sizes.map((size, i) => {
    const rule = constraints[i] as PanelConstraints;
    const value = size ?? fill;
    if (rule.collapsible && value <= rule.collapsedSize + EPSILON) {
      return rule.collapsedSize;
    }
    return Math.min(rule.maxSize, Math.max(rule.minSize, value));
  });
  let diff = 100 - next.reduce((sum, size) => sum + size, 0);
  for (let i = next.length - 1; i >= 0 && Math.abs(diff) > EPSILON; i--) {
    const rule = constraints[i] as PanelConstraints;
    const size = next[i] as number;
    if (isCollapsedSize(size, rule)) continue;
    const target = Math.min(rule.maxSize, Math.max(rule.minSize, size + diff));
    diff -= target - size;
    next[i] = target;
  }
  return next;
}

interface GroupContextValue {
  direction: ResizableDirection;
  layout: Layout;
  register: (id: string, record: React.RefObject<PanelRecord>) => () => void;
  constraints: () => PanelConstraints[];
  /** Index of the panel directly before `element`, in DOM order. */
  indexBefore: (element: Element) => number;
  measure: () => number;
  setSizes: (sizes: number[]) => void;
  resizePanel: (id: string, target: number | "collapse" | "expand") => void;
  keyboardStep: number;
}

const GroupContext = React.createContext<GroupContextValue | null>(null);

function useGroupContext(part: string): GroupContextValue {
  const context = React.useContext(GroupContext);
  if (!context) {
    throw new Error(`${part} must be placed inside ResizablePanelGroup.`);
  }
  return context;
}

export interface ResizablePanelGroupProps
  extends React.ComponentProps<"div"> {
  /** `horizontal` places panels side by side; `vertical` stacks them. */
  direction?: ResizableDirection;
  /** Called with every panel's size, in percent, whenever the layout changes. */
  onLayout?: (sizes: number[]) => void;
  /** Percent moved per arrow key press. */
  keyboardStep?: number;
}

export function ResizablePanelGroup({
  direction = "horizontal",
  onLayout,
  keyboardStep = 5,
  className,
  ...props
}: ResizablePanelGroupProps): React.ReactElement {
  const panels = React.useRef(new Map<string, React.RefObject<PanelRecord>>());
  const [registry, bump] = React.useReducer((n: number) => n + 1, 0);
  const [layout, setLayout] = React.useState<Layout>({ ids: [], sizes: [] });
  const layoutRef = React.useRef(layout);
  const expandedSizes = React.useRef(new Map<string, number>());
  const onLayoutRef = React.useRef(onLayout);
  onLayoutRef.current = onLayout;

  const ordered = React.useCallback(() => {
    return [...panels.current.entries()]
      .filter(([, record]) => record.current.element)
      .sort(([, a], [, b]) =>
        (a.current.element as HTMLElement).compareDocumentPosition(
          b.current.element as HTMLElement,
        ) & Node.DOCUMENT_POSITION_FOLLOWING
          ? -1
          : 1,
      );
  }, []);

  const constraintsFor = React.useCallback(
    (ids: readonly string[]): PanelConstraints[] =>
      ids.map((id) => {
        const record = panels.current.get(id)?.current;
        return {
          minSize: record?.minSize ?? 0,
          maxSize: record?.maxSize ?? 100,
          collapsible: record?.collapsible ?? false,
          collapsedSize: record?.collapsedSize ?? 0,
        };
      }),
    [],
  );

  const commit = React.useCallback(
    (next: Layout) => {
      const previous = layoutRef.current;
      if (sameIds(previous.ids, next.ids) && sameSizes(previous.sizes, next.sizes)) {
        return;
      }
      const rules = constraintsFor(next.ids);
      next.ids.forEach((id, i) => {
        const before = previous.sizes[previous.ids.indexOf(id)];
        const rule = rules[i] as PanelConstraints;
        if (
          before !== undefined &&
          !isCollapsedSize(before, rule) &&
          isCollapsedSize(next.sizes[i] as number, rule)
        ) {
          expandedSizes.current.set(id, before);
        }
      });
      layoutRef.current = next;
      setLayout(next);
    },
    [constraintsFor],
  );

  // Children register in their layout effects, which run before this one.
  React.useLayoutEffect(() => {
    const entries = ordered();
    const ids = entries.map(([id]) => id);
    const previous = layoutRef.current;
    if (sameIds(previous.ids, ids)) return;
    const sizes = entries.map(([id, record]) => {
      const kept = previous.sizes[previous.ids.indexOf(id)];
      return kept ?? record.current.defaultSize;
    });
    commit({ ids, sizes: normalizeLayout(sizes, constraintsFor(ids)) });
  }, [registry, ordered, commit, constraintsFor]);

  React.useEffect(() => {
    if (layout.sizes.length) onLayoutRef.current?.(layout.sizes);
  }, [layout]);

  const api = React.useMemo(() => {
    const register = (id: string, record: React.RefObject<PanelRecord>) => {
      panels.current.set(id, record);
      bump();
      return () => {
        panels.current.delete(id);
        bump();
      };
    };
    const indexBefore = (element: Element) => {
      let count = 0;
      for (const id of layoutRef.current.ids) {
        const panel = panels.current.get(id)?.current.element;
        if (
          panel &&
          panel.compareDocumentPosition(element) &
            Node.DOCUMENT_POSITION_FOLLOWING
        ) {
          count++;
        }
      }
      return count - 1;
    };
    const measure = () =>
      layoutRef.current.ids.reduce((total, id) => {
        const element = panels.current.get(id)?.current.element;
        if (!element) return total;
        const rect = element.getBoundingClientRect();
        return total + (direction === "horizontal" ? rect.width : rect.height);
      }, 0);
    const setSizes = (sizes: number[]) =>
      commit({ ids: layoutRef.current.ids, sizes });
    const resizePanel = (id: string, target: number | "collapse" | "expand") => {
      const { ids, sizes } = layoutRef.current;
      const index = ids.indexOf(id);
      if (index < 0 || ids.length < 2) return;
      const rules = constraintsFor(ids);
      const rule = rules[index] as PanelConstraints;
      const size = sizes[index] as number;
      let goal: number;
      if (target === "collapse") {
        if (!rule.collapsible) return;
        goal = rule.collapsedSize;
      } else if (target === "expand") {
        if (!isCollapsedSize(size, rule)) return;
        goal = expandedSizes.current.get(id) ?? rule.minSize;
      } else {
        goal = target;
      }
      const last = index === ids.length - 1;
      const delta = last ? size - goal : goal - size;
      commit({
        ids,
        sizes: resizeLayout(sizes, rules, last ? index - 1 : index, delta),
      });
    };
    const constraints = () => constraintsFor(layoutRef.current.ids);
    return { register, indexBefore, measure, setSizes, resizePanel, constraints };
  }, [direction, commit, constraintsFor]);

  const context = React.useMemo<GroupContextValue>(
    () => ({ ...api, direction, layout, keyboardStep }),
    [api, direction, layout, keyboardStep],
  );

  return (
    <GroupContext.Provider value={context}>
      <div
        className={cn(
          "flex size-full",
          direction === "vertical" && "flex-col",
          className,
        )}
        data-direction={direction}
        data-slot="resizable-panel-group"
        {...props}
      />
    </GroupContext.Provider>
  );
}

export interface ResizablePanelProps extends React.ComponentProps<"div"> {
  /** Initial size in percent. Panels without one share the remaining space. */
  defaultSize?: number;
  /** Minimum size in percent. */
  minSize?: number;
  /** Maximum size in percent. */
  maxSize?: number;
  /** Allows the panel to collapse to `collapsedSize` when dragged past its minimum. */
  collapsible?: boolean;
  collapsedSize?: number;
  onResize?: (size: number) => void;
  onCollapse?: () => void;
  onExpand?: () => void;
  panelRef?: React.Ref<ResizablePanelHandle>;
}

export function ResizablePanel({
  id: idProp,
  defaultSize,
  minSize = 0,
  maxSize = 100,
  collapsible = false,
  collapsedSize = 0,
  onResize,
  onCollapse,
  onExpand,
  panelRef,
  className,
  style,
  ref,
  ...props
}: ResizablePanelProps): React.ReactElement {
  const group = useGroupContext("ResizablePanel");
  const generatedId = React.useId();
  const id = idProp ?? generatedId;
  const record = React.useRef<PanelRecord>({
    element: null,
    defaultSize,
    minSize,
    maxSize,
    collapsible,
    collapsedSize,
  });
  Object.assign(record.current, {
    defaultSize,
    minSize,
    maxSize,
    collapsible,
    collapsedSize,
  });
  const { register, resizePanel } = group;

  React.useLayoutEffect(() => register(id, record), [id, register]);

  const index = group.layout.ids.indexOf(id);
  const size = index >= 0 ? group.layout.sizes[index] : undefined;
  const collapsed =
    size !== undefined && collapsible && size <= collapsedSize + EPSILON;

  React.useImperativeHandle(
    panelRef,
    () => ({
      collapse: () => resizePanel(id, "collapse"),
      expand: () => resizePanel(id, "expand"),
      resize: (next: number) => resizePanel(id, next),
      getSize: () => size ?? defaultSize ?? 0,
      isCollapsed: () => collapsed,
    }),
    [resizePanel, id, size, defaultSize, collapsed],
  );

  const callbacks = React.useRef({ onResize, onCollapse, onExpand });
  callbacks.current = { onResize, onCollapse, onExpand };
  const previous = React.useRef<{ size?: number; collapsed?: boolean }>({});
  React.useEffect(() => {
    if (size === undefined) return;
    const last = previous.current;
    if (last.size !== undefined && !near(last.size, size)) {
      callbacks.current.onResize?.(size);
    }
    if (last.collapsed !== undefined && last.collapsed !== collapsed) {
      if (collapsed) callbacks.current.onCollapse?.();
      else callbacks.current.onExpand?.();
    }
    previous.current = { size, collapsed };
  }, [size, collapsed]);

  return (
    <div
      className={cn("min-h-0 min-w-0 overflow-hidden", className)}
      data-collapsed={collapsed ? "" : undefined}
      data-slot="resizable-panel"
      id={id}
      ref={(node) => {
        record.current.element = node;
        if (typeof ref === "function") return ref(node);
        if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node;
      }}
      style={{ flex: `${size ?? defaultSize ?? 1} 1 0px`, ...style }}
      {...props}
    />
  );
}

const cursorStyleId = "qy-resizable-cursor";

function setGlobalCursor(cursor: string | null): void {
  if (typeof document === "undefined") return;
  let element = document.getElementById(cursorStyleId);
  if (!cursor) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement("style");
    element.id = cursorStyleId;
    document.head.appendChild(element);
  }
  element.textContent = `*{cursor:${cursor}!important;user-select:none!important;-webkit-user-select:none!important}`;
}

export interface ResizableHandleProps extends React.ComponentProps<"div"> {
  /** Shows a grip in the middle of the separator line. */
  withHandle?: boolean;
  disabled?: boolean;
}

export function ResizableHandle({
  withHandle = false,
  disabled = false,
  className,
  style,
  ref,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerCancel,
  onLostPointerCapture,
  onKeyDown,
  "aria-label": ariaLabel,
  ...props
}: ResizableHandleProps): React.ReactElement {
  const { messages } = useUILocale();
  const group = useGroupContext("ResizableHandle");
  const { direction, layout } = group;
  const elementRef = React.useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const drag = React.useRef<{
    pointerId: number;
    origin: number;
    sizes: number[];
    available: number;
    sign: 1 | -1;
  } | null>(null);
  const horizontal = direction === "horizontal";

  const { indexBefore } = group;
  React.useLayoutEffect(() => {
    if (elementRef.current) setIndex(indexBefore(elementRef.current));
  }, [indexBefore, layout.ids]);

  const active = index >= 0 && index < layout.sizes.length - 1 && !disabled;
  const rules = active ? group.constraints() : [];
  const rule = rules[index];
  const size = layout.sizes[index];
  const panelId = layout.ids[index];

  const isRtl = () =>
    horizontal &&
    elementRef.current !== null &&
    getComputedStyle(elementRef.current).direction === "rtl";

  // The cursor tells which way the separator can still move.
  let cursor = horizontal ? "col-resize" : "row-resize";
  if (active) {
    const canGrow = !sameSizes(resizeLayout(layout.sizes, rules, index, 100), layout.sizes);
    const canShrink = !sameSizes(resizeLayout(layout.sizes, rules, index, -100), layout.sizes);
    const rtl = dragging ? (drag.current?.sign ?? 1) === -1 : false;
    if (!canGrow && !canShrink) cursor = "not-allowed";
    else if (!canGrow) cursor = horizontal ? (rtl ? "e-resize" : "w-resize") : "n-resize";
    else if (!canShrink) cursor = horizontal ? (rtl ? "w-resize" : "e-resize") : "s-resize";
  } else {
    cursor = "default";
  }

  React.useEffect(() => {
    if (dragging) setGlobalCursor(cursor);
  }, [dragging, cursor]);
  React.useEffect(() => () => setGlobalCursor(null), []);

  const move = (delta: number) => {
    if (!active) return;
    group.setSizes(resizeLayout(layout.sizes, rules, index, delta));
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    setGlobalCursor(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !active || !rule || size === undefined) {
      return;
    }
    const step = group.keyboardStep;
    const sign = isRtl() ? -1 : 1;
    let delta: number | null = null;
    switch (event.key) {
      case "ArrowLeft":
        if (horizontal) delta = -step * sign;
        break;
      case "ArrowRight":
        if (horizontal) delta = step * sign;
        break;
      case "ArrowUp":
        if (!horizontal) delta = -step;
        break;
      case "ArrowDown":
        if (!horizontal) delta = step;
        break;
      case "Home":
        delta = rule.minSize - size;
        break;
      case "End":
        delta = rule.maxSize - size;
        break;
      case "Enter": {
        // Collapses the nearest collapsible panel, or restores it.
        const after = rules[index + 1];
        const targetIndex = rule.collapsible
          ? index
          : after?.collapsible
            ? index + 1
            : -1;
        const targetId = layout.ids[targetIndex];
        const targetRule = rules[targetIndex];
        const targetSize = layout.sizes[targetIndex];
        if (!targetId || !targetRule || targetSize === undefined) return;
        event.preventDefault();
        group.resizePanel(
          targetId,
          isCollapsedSize(targetSize, targetRule) ? "expand" : "collapse",
        );
        return;
      }
      default:
        return;
    }
    if (delta === null) return;
    event.preventDefault();
    move(delta);
  };

  return (
    <div
      aria-controls={panelId}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel ?? messages.resize}
      aria-orientation={horizontal ? "vertical" : "horizontal"}
      aria-valuemax={rule ? Math.round(rule.maxSize) : undefined}
      aria-valuemin={rule ? Math.round(rule.collapsible ? rule.collapsedSize : rule.minSize) : undefined}
      aria-valuenow={size !== undefined ? Math.round(size) : undefined}
      className={cn(
        "relative z-10 flex shrink-0 select-none items-center justify-center bg-border outline-none transition-[background-color,box-shadow] duration-(--qy-duration-fast) after:absolute focus-visible:bg-ring focus-visible:ring-[3px] focus-visible:ring-ring/24 data-disabled:pointer-events-none",
        active && "hover:bg-ring data-dragging:bg-ring",
        horizontal
          ? "w-px self-stretch after:inset-y-0 after:-inset-x-1 pointer-coarse:after:-inset-x-2.5"
          : "h-px w-full after:inset-x-0 after:-inset-y-1 pointer-coarse:after:-inset-y-2.5",
        className,
      )}
      data-direction={direction}
      data-disabled={disabled ? "" : undefined}
      data-dragging={dragging ? "" : undefined}
      data-slot="resizable-handle"
      onKeyDown={handleKeyDown}
      onLostPointerCapture={(event) => {
        onLostPointerCapture?.(event);
        endDrag(event);
      }}
      onPointerCancel={(event) => {
        onPointerCancel?.(event);
        endDrag(event);
      }}
      onPointerDown={(event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || !active || event.button !== 0) return;
        // No preventDefault: the native mousedown focuses the separator
        // without a keyboard focus ring, so arrow keys work right after a drag.
        event.currentTarget.setPointerCapture?.(event.pointerId);
        drag.current = {
          pointerId: event.pointerId,
          origin: horizontal ? event.clientX : event.clientY,
          sizes: [...layout.sizes],
          available: group.measure(),
          sign: isRtl() ? -1 : 1,
        };
        setDragging(true);
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event);
        const state = drag.current;
        if (!state || state.pointerId !== event.pointerId || !state.available) {
          return;
        }
        const position = horizontal ? event.clientX : event.clientY;
        const delta =
          (((position - state.origin) * state.sign) / state.available) * 100;
        group.setSizes(
          resizeLayout(state.sizes, group.constraints(), index, delta),
        );
      }}
      onPointerUp={(event) => {
        onPointerUp?.(event);
        endDrag(event);
      }}
      ref={(node) => {
        elementRef.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) (ref as React.RefObject<HTMLDivElement | null>).current = node;
      }}
      role="separator"
      style={{ cursor, touchAction: "none", ...style }}
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      {withHandle ? (
        <div
          className={cn(
            "pointer-events-none relative flex shrink-0 items-center justify-center rounded-[.25rem] border border-input bg-popover not-dark:bg-clip-padding text-muted-foreground shadow-xs/5 transition-colors duration-(--qy-duration-fast) in-data-dragging:border-ring/64 in-data-dragging:text-foreground dark:bg-[color-mix(in_srgb,var(--color-popover),var(--color-white)_4%)]",
            horizontal ? "h-6 w-3.5" : "h-3.5 w-6",
          )}
          data-slot="resizable-handle-grip"
        >
          {horizontal ? (
            <GripVerticalIcon aria-hidden="true" className="size-3" />
          ) : (
            <GripHorizontalIcon aria-hidden="true" className="size-3" />
          )}
        </div>
      ) : null}
    </div>
  );
}
