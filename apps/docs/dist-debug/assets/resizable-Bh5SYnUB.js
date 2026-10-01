import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, e as cn, q as useUILocale } from "./index-DM02Iz28.js";
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "9", r: "1", key: "124mty" }],
  ["circle", { cx: "19", cy: "9", r: "1", key: "1ruzo2" }],
  ["circle", { cx: "5", cy: "9", r: "1", key: "1a8b28" }],
  ["circle", { cx: "12", cy: "15", r: "1", key: "1e56xg" }],
  ["circle", { cx: "19", cy: "15", r: "1", key: "1a92ep" }],
  ["circle", { cx: "5", cy: "15", r: "1", key: "5r1jwy" }]
];
const GripHorizontal = createLucideIcon("grip-horizontal", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "9", cy: "12", r: "1", key: "1vctgf" }],
  ["circle", { cx: "9", cy: "5", r: "1", key: "hp0tcf" }],
  ["circle", { cx: "9", cy: "19", r: "1", key: "fkjjf6" }],
  ["circle", { cx: "15", cy: "12", r: "1", key: "1tmaij" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["circle", { cx: "15", cy: "19", r: "1", key: "f4zoj3" }]
];
const GripVertical = createLucideIcon("grip-vertical", __iconNode);
const EPSILON = 1e-3;
function near(a, b) {
  return Math.abs(a - b) < EPSILON;
}
function sameIds(a, b) {
  return a.length === b.length && a.every((id, i) => id === b[i]);
}
function sameSizes(a, b) {
  return a.length === b.length && a.every((size, i) => near(size, b[i] ?? 0));
}
function isCollapsedSize(size, c) {
  return c.collapsible && size <= c.collapsedSize + EPSILON;
}
function resizeLayout(start, constraints, index, delta) {
  const count = start.length;
  if (!delta || index < 0 || index >= count - 1) return [...start];
  const next = [...start];
  const before = [];
  const after = [];
  for (let i = index; i >= 0; i--) before.push(i);
  for (let i = index + 1; i < count; i++) after.push(i);
  const grow = delta > 0 ? before : after;
  const shrink = delta > 0 ? after : before;
  const pivot = grow[0];
  const pivotRule = constraints[pivot];
  const pivotCollapsed = isCollapsedSize(next[pivot], pivotRule);
  let amount = Math.abs(delta);
  if (pivotCollapsed) {
    const gap = pivotRule.minSize - pivotRule.collapsedSize;
    if (amount < gap / 2) return [...start];
    amount = Math.max(amount, gap);
  }
  let capacity = 0;
  for (const i of grow) {
    const rule = constraints[i];
    const size = next[i];
    if (i !== pivot && isCollapsedSize(size, rule)) continue;
    capacity += Math.max(0, rule.maxSize - size);
  }
  amount = Math.min(amount, capacity);
  if (amount < EPSILON) return [...start];
  let shrunk = 0;
  for (const i of shrink) {
    const want = amount - shrunk;
    if (want < EPSILON) break;
    const rule = constraints[i];
    const size = next[i];
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
      const available2 = Math.max(0, size - rule.minSize);
      next[i] = size - available2;
      shrunk += available2;
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
    const rule = constraints[i];
    const size = next[i];
    if (i !== pivot && isCollapsedSize(size, rule)) continue;
    const give = Math.min(Math.max(0, rule.maxSize - size), remaining);
    next[i] = size + give;
    remaining -= give;
  }
  if (remaining > EPSILON) return [...start];
  if (pivotCollapsed && next[pivot] < pivotRule.minSize - EPSILON) {
    return [...start];
  }
  return next;
}
function normalizeLayout(sizes, constraints) {
  const known = sizes.reduce((sum, size) => sum + (size ?? 0), 0);
  const unknown = sizes.filter((size) => size === void 0).length;
  const fill = unknown ? Math.max(0, 100 - known) / unknown : 0;
  const next = sizes.map((size, i) => {
    const rule = constraints[i];
    const value = size ?? fill;
    if (rule.collapsible && value <= rule.collapsedSize + EPSILON) {
      return rule.collapsedSize;
    }
    return Math.min(rule.maxSize, Math.max(rule.minSize, value));
  });
  let diff = 100 - next.reduce((sum, size) => sum + size, 0);
  for (let i = next.length - 1; i >= 0 && Math.abs(diff) > EPSILON; i--) {
    const rule = constraints[i];
    const size = next[i];
    if (isCollapsedSize(size, rule)) continue;
    const target = Math.min(rule.maxSize, Math.max(rule.minSize, size + diff));
    diff -= target - size;
    next[i] = target;
  }
  return next;
}
const GroupContext = reactExports.createContext(null);
function useGroupContext(part) {
  const context = reactExports.useContext(GroupContext);
  if (!context) {
    throw new Error(`${part} must be placed inside ResizablePanelGroup.`);
  }
  return context;
}
function ResizablePanelGroup({
  direction = "horizontal",
  onLayout,
  keyboardStep = 5,
  className,
  ...props
}) {
  const panels = reactExports.useRef(/* @__PURE__ */ new Map());
  const [registry, bump] = reactExports.useReducer((n) => n + 1, 0);
  const [layout, setLayout] = reactExports.useState({ ids: [], sizes: [] });
  const layoutRef = reactExports.useRef(layout);
  const expandedSizes = reactExports.useRef(/* @__PURE__ */ new Map());
  const onLayoutRef = reactExports.useRef(onLayout);
  onLayoutRef.current = onLayout;
  const ordered = reactExports.useCallback(() => {
    return [...panels.current.entries()].filter(([, record]) => record.current.element).sort(
      ([, a], [, b]) => a.current.element.compareDocumentPosition(
        b.current.element
      ) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
    );
  }, []);
  const constraintsFor = reactExports.useCallback(
    (ids) => ids.map((id) => {
      const record = panels.current.get(id)?.current;
      return {
        minSize: record?.minSize ?? 0,
        maxSize: record?.maxSize ?? 100,
        collapsible: record?.collapsible ?? false,
        collapsedSize: record?.collapsedSize ?? 0
      };
    }),
    []
  );
  const commit = reactExports.useCallback(
    (next) => {
      const previous = layoutRef.current;
      if (sameIds(previous.ids, next.ids) && sameSizes(previous.sizes, next.sizes)) {
        return;
      }
      const rules = constraintsFor(next.ids);
      next.ids.forEach((id, i) => {
        const before = previous.sizes[previous.ids.indexOf(id)];
        const rule = rules[i];
        if (before !== void 0 && !isCollapsedSize(before, rule) && isCollapsedSize(next.sizes[i], rule)) {
          expandedSizes.current.set(id, before);
        }
      });
      layoutRef.current = next;
      setLayout(next);
    },
    [constraintsFor]
  );
  reactExports.useLayoutEffect(() => {
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
  reactExports.useEffect(() => {
    if (layout.sizes.length) onLayoutRef.current?.(layout.sizes);
  }, [layout]);
  const api = reactExports.useMemo(() => {
    const register = (id, record) => {
      panels.current.set(id, record);
      bump();
      return () => {
        panels.current.delete(id);
        bump();
      };
    };
    const indexBefore = (element) => {
      let count = 0;
      for (const id of layoutRef.current.ids) {
        const panel = panels.current.get(id)?.current.element;
        if (panel && panel.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING) {
          count++;
        }
      }
      return count - 1;
    };
    const measure = () => layoutRef.current.ids.reduce((total, id) => {
      const element = panels.current.get(id)?.current.element;
      if (!element) return total;
      const rect = element.getBoundingClientRect();
      return total + (direction === "horizontal" ? rect.width : rect.height);
    }, 0);
    const setSizes = (sizes) => commit({ ids: layoutRef.current.ids, sizes });
    const resizePanel = (id, target) => {
      const { ids, sizes } = layoutRef.current;
      const index = ids.indexOf(id);
      if (index < 0 || ids.length < 2) return;
      const rules = constraintsFor(ids);
      const rule = rules[index];
      const size = sizes[index];
      let goal;
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
        sizes: resizeLayout(sizes, rules, last ? index - 1 : index, delta)
      });
    };
    const constraints = () => constraintsFor(layoutRef.current.ids);
    return { register, indexBefore, measure, setSizes, resizePanel, constraints };
  }, [direction, commit, constraintsFor]);
  const context = reactExports.useMemo(
    () => ({ ...api, direction, layout, keyboardStep }),
    [api, direction, layout, keyboardStep]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GroupContext.Provider, { value: context, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "flex size-full",
        direction === "vertical" && "flex-col",
        className
      ),
      "data-direction": direction,
      "data-slot": "resizable-panel-group",
      ...props
    }
  ) });
}
function ResizablePanel({
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
}) {
  const group = useGroupContext("ResizablePanel");
  const generatedId = reactExports.useId();
  const id = idProp ?? generatedId;
  const record = reactExports.useRef({
    element: null,
    defaultSize,
    minSize,
    maxSize,
    collapsible,
    collapsedSize
  });
  Object.assign(record.current, {
    defaultSize,
    minSize,
    maxSize,
    collapsible,
    collapsedSize
  });
  const { register, resizePanel } = group;
  reactExports.useLayoutEffect(() => register(id, record), [id, register]);
  const index = group.layout.ids.indexOf(id);
  const size = index >= 0 ? group.layout.sizes[index] : void 0;
  const collapsed = size !== void 0 && collapsible && size <= collapsedSize + EPSILON;
  reactExports.useImperativeHandle(
    panelRef,
    () => ({
      collapse: () => resizePanel(id, "collapse"),
      expand: () => resizePanel(id, "expand"),
      resize: (next) => resizePanel(id, next),
      getSize: () => size ?? defaultSize ?? 0,
      isCollapsed: () => collapsed
    }),
    [resizePanel, id, size, defaultSize, collapsed]
  );
  const callbacks = reactExports.useRef({ onResize, onCollapse, onExpand });
  callbacks.current = { onResize, onCollapse, onExpand };
  const previous = reactExports.useRef({});
  reactExports.useEffect(() => {
    if (size === void 0) return;
    const last = previous.current;
    if (last.size !== void 0 && !near(last.size, size)) {
      callbacks.current.onResize?.(size);
    }
    if (last.collapsed !== void 0 && last.collapsed !== collapsed) {
      if (collapsed) callbacks.current.onCollapse?.();
      else callbacks.current.onExpand?.();
    }
    previous.current = { size, collapsed };
  }, [size, collapsed]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("min-h-0 min-w-0 overflow-hidden", className),
      "data-collapsed": collapsed ? "" : void 0,
      "data-slot": "resizable-panel",
      id,
      ref: (node) => {
        record.current.element = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      },
      style: { flex: `${size ?? defaultSize ?? 1} 1 0px`, ...style },
      ...props
    }
  );
}
const cursorStyleId = "qy-resizable-cursor";
function setGlobalCursor(cursor) {
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
function ResizableHandle({
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
}) {
  const { messages } = useUILocale();
  const group = useGroupContext("ResizableHandle");
  const { direction, layout } = group;
  const elementRef = reactExports.useRef(null);
  const [index, setIndex] = reactExports.useState(-1);
  const [dragging, setDragging] = reactExports.useState(false);
  const drag = reactExports.useRef(null);
  const horizontal = direction === "horizontal";
  const { indexBefore } = group;
  reactExports.useLayoutEffect(() => {
    if (elementRef.current) setIndex(indexBefore(elementRef.current));
  }, [indexBefore, layout.ids]);
  const active = index >= 0 && index < layout.sizes.length - 1 && !disabled;
  const rules = active ? group.constraints() : [];
  const rule = rules[index];
  const size = layout.sizes[index];
  const panelId = layout.ids[index];
  const isRtl = () => horizontal && elementRef.current !== null && getComputedStyle(elementRef.current).direction === "rtl";
  let cursor = horizontal ? "col-resize" : "row-resize";
  if (active) {
    const canGrow = !sameSizes(resizeLayout(layout.sizes, rules, index, 100), layout.sizes);
    const canShrink = !sameSizes(resizeLayout(layout.sizes, rules, index, -100), layout.sizes);
    const rtl = dragging ? (drag.current?.sign ?? 1) === -1 : false;
    if (!canGrow && !canShrink) cursor = "not-allowed";
    else if (!canGrow) cursor = horizontal ? rtl ? "e-resize" : "w-resize" : "n-resize";
    else if (!canShrink) cursor = horizontal ? rtl ? "w-resize" : "e-resize" : "s-resize";
  } else {
    cursor = "default";
  }
  reactExports.useEffect(() => {
    if (dragging) setGlobalCursor(cursor);
  }, [dragging, cursor]);
  reactExports.useEffect(() => () => setGlobalCursor(null), []);
  const move = (delta) => {
    if (!active) return;
    group.setSizes(resizeLayout(layout.sizes, rules, index, delta));
  };
  const endDrag = (event) => {
    if (!drag.current || drag.current.pointerId !== event.pointerId) return;
    drag.current = null;
    setDragging(false);
    setGlobalCursor(null);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || !active || !rule || size === void 0) {
      return;
    }
    const step = group.keyboardStep;
    const sign = isRtl() ? -1 : 1;
    let delta = null;
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
        const after = rules[index + 1];
        const targetIndex = rule.collapsible ? index : after?.collapsible ? index + 1 : -1;
        const targetId = layout.ids[targetIndex];
        const targetRule = rules[targetIndex];
        const targetSize = layout.sizes[targetIndex];
        if (!targetId || !targetRule || targetSize === void 0) return;
        event.preventDefault();
        group.resizePanel(
          targetId,
          isCollapsedSize(targetSize, targetRule) ? "expand" : "collapse"
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "aria-controls": panelId,
      "aria-disabled": disabled || void 0,
      "aria-label": ariaLabel ?? messages.resize,
      "aria-orientation": horizontal ? "vertical" : "horizontal",
      "aria-valuemax": rule ? Math.round(rule.maxSize) : void 0,
      "aria-valuemin": rule ? Math.round(rule.collapsible ? rule.collapsedSize : rule.minSize) : void 0,
      "aria-valuenow": size !== void 0 ? Math.round(size) : void 0,
      className: cn(
        "relative z-10 flex shrink-0 select-none items-center justify-center bg-border outline-none transition-[background-color,box-shadow] duration-(--qy-duration-fast) after:absolute focus-visible:bg-ring focus-visible:ring-[3px] focus-visible:ring-ring/24 data-disabled:pointer-events-none",
        active && "hover:bg-ring data-dragging:bg-ring",
        horizontal ? "w-px self-stretch after:inset-y-0 after:-inset-x-1 pointer-coarse:after:-inset-x-2.5" : "h-px w-full after:inset-x-0 after:-inset-y-1 pointer-coarse:after:-inset-y-2.5",
        className
      ),
      "data-direction": direction,
      "data-disabled": disabled ? "" : void 0,
      "data-dragging": dragging ? "" : void 0,
      "data-slot": "resizable-handle",
      onKeyDown: handleKeyDown,
      onLostPointerCapture: (event) => {
        onLostPointerCapture?.(event);
        endDrag(event);
      },
      onPointerCancel: (event) => {
        onPointerCancel?.(event);
        endDrag(event);
      },
      onPointerDown: (event) => {
        onPointerDown?.(event);
        if (event.defaultPrevented || !active || event.button !== 0) return;
        event.currentTarget.setPointerCapture?.(event.pointerId);
        drag.current = {
          pointerId: event.pointerId,
          origin: horizontal ? event.clientX : event.clientY,
          sizes: [...layout.sizes],
          available: group.measure(),
          sign: isRtl() ? -1 : 1
        };
        setDragging(true);
      },
      onPointerMove: (event) => {
        onPointerMove?.(event);
        const state = drag.current;
        if (!state || state.pointerId !== event.pointerId || !state.available) {
          return;
        }
        const position = horizontal ? event.clientX : event.clientY;
        const delta = (position - state.origin) * state.sign / state.available * 100;
        group.setSizes(
          resizeLayout(state.sizes, group.constraints(), index, delta)
        );
      },
      onPointerUp: (event) => {
        onPointerUp?.(event);
        endDrag(event);
      },
      ref: (node) => {
        elementRef.current = node;
        if (typeof ref === "function") return ref(node);
        if (ref) ref.current = node;
      },
      role: "separator",
      style: { cursor, touchAction: "none", ...style },
      tabIndex: disabled ? -1 : 0,
      ...props,
      children: withHandle ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "pointer-events-none relative flex shrink-0 items-center justify-center rounded-[.25rem] border border-input bg-popover not-dark:bg-clip-padding text-muted-foreground shadow-xs/5 transition-colors duration-(--qy-duration-fast) in-data-dragging:border-ring/64 in-data-dragging:text-foreground dark:bg-[color-mix(in_srgb,var(--color-popover),var(--color-white)_4%)]",
            horizontal ? "h-6 w-3.5" : "h-3.5 w-6"
          ),
          "data-slot": "resizable-handle-grip",
          children: horizontal ? /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { "aria-hidden": "true", className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(GripHorizontal, { "aria-hidden": "true", className: "size-3" })
        }
      ) : null
    }
  );
}
export {
  ResizablePanelGroup as R,
  ResizablePanel as a,
  ResizableHandle as b
};
