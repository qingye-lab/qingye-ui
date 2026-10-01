import { r as reactExports, j as jsxRuntimeExports, e as cn, c7 as ChevronRight } from "./index-DM02Iz28.js";
const hasChildren = (node) => Boolean(node.children?.length);
const textOf = (node) => (node.textValue ?? (typeof node.label === "string" ? node.label : "")).toLocaleLowerCase();
function Tree({
  nodes,
  label,
  value: valueProp,
  defaultValue = null,
  onValueChange,
  expanded: expandedProp,
  defaultExpanded = [],
  onExpandedChange,
  expandOnClick = true,
  guides = true,
  className,
  onKeyDown,
  onFocus,
  ...props
}) {
  const [internalValue, setInternalValue] = reactExports.useState(defaultValue);
  const [internalExpanded, setInternalExpanded] = reactExports.useState(defaultExpanded);
  const [active, setActive] = reactExports.useState(null);
  const items = reactExports.useRef(/* @__PURE__ */ new Map());
  const typeahead = reactExports.useRef({ text: "", timer: void 0 });
  const value = valueProp === void 0 ? internalValue : valueProp;
  const expanded = expandedProp ?? internalExpanded;
  const open = reactExports.useMemo(() => new Set(expanded), [expanded]);
  const visible = reactExports.useMemo(() => {
    const rows = [];
    const walk = (list, level, parentId) => {
      for (const node of list) {
        rows.push({ level, node, parentId, siblings: list });
        if (node.children && open.has(node.id)) walk(node.children, level + 1, node.id);
      }
    };
    walk(nodes, 1, null);
    return rows;
  }, [nodes, open]);
  const focusable = visible.filter(({ node }) => !node.disabled);
  const isFocusable = (id) => id !== null && focusable.some(({ node }) => node.id === id);
  const tabStop = isFocusable(active) ? active : isFocusable(value) ? value : focusable[0]?.node.id ?? null;
  reactExports.useEffect(() => () => clearTimeout(typeahead.current.timer), []);
  const setExpanded = (next) => {
    if (expandedProp === void 0) setInternalExpanded(next);
    onExpandedChange?.(next);
  };
  const toggle = (node, force) => {
    if (node.disabled || !hasChildren(node)) return;
    const shouldOpen = force ?? !open.has(node.id);
    if (shouldOpen === open.has(node.id)) return;
    setExpanded(shouldOpen ? [...expanded, node.id] : expanded.filter((id) => id !== node.id));
  };
  const select = (node) => {
    if (node.disabled) return;
    if (valueProp === void 0) setInternalValue(node.id);
    onValueChange?.(node.id, node);
  };
  const focus = (id) => {
    if (!id) return;
    setActive(id);
    items.current.get(id)?.focus();
  };
  const handleFocus = (event) => {
    onFocus?.(event);
    const id = event.target.closest("[data-slot=tree-item]")?.dataset.id;
    if (id) setActive(id);
  };
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.target !== items.current.get(event.target.dataset.id ?? "")) return;
    const id = event.target.dataset.id;
    const index = focusable.findIndex(({ node: node2 }) => node2.id === id);
    const entry = focusable[index];
    if (!entry) return;
    const { node } = entry;
    const rtl = getComputedStyle(event.currentTarget).direction === "rtl";
    const key = rtl && event.key === "ArrowLeft" ? "ArrowRight" : rtl && event.key === "ArrowRight" ? "ArrowLeft" : event.key;
    switch (key) {
      case "ArrowDown":
        focus(focusable[index + 1]?.node.id);
        break;
      case "ArrowUp":
        focus(focusable[index - 1]?.node.id);
        break;
      case "Home":
        focus(focusable[0]?.node.id);
        break;
      case "End":
        focus(focusable.at(-1)?.node.id);
        break;
      case "ArrowRight":
        if (!hasChildren(node)) break;
        if (!open.has(node.id)) toggle(node, true);
        else focus(node.children?.find((child) => !child.disabled)?.id);
        break;
      case "ArrowLeft":
        if (hasChildren(node) && open.has(node.id)) toggle(node, false);
        else if (entry.parentId && isFocusable(entry.parentId)) focus(entry.parentId);
        break;
      case "Enter":
        select(node);
        toggle(node);
        break;
      case " ":
        select(node);
        break;
      case "*": {
        const siblings = entry.siblings.filter((sibling) => hasChildren(sibling) && !sibling.disabled && !open.has(sibling.id));
        if (siblings.length) setExpanded([...expanded, ...siblings.map((sibling) => sibling.id)]);
        break;
      }
      default: {
        if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
        const state = typeahead.current;
        clearTimeout(state.timer);
        state.text += event.key.toLocaleLowerCase();
        state.timer = setTimeout(() => {
          state.text = "";
        }, 500);
        const repeated = state.text.split("").every((char) => char === state.text[0]);
        const query = repeated ? state.text[0] : state.text;
        const start = repeated || state.text.length === 1 ? index + 1 : index;
        const ordered = [...focusable.slice(start), ...focusable.slice(0, start)];
        focus(ordered.find((candidate) => textOf(candidate.node).startsWith(query))?.node.id);
      }
    }
    event.preventDefault();
  };
  const renderLevel = (list, level) => list.map((node, index) => {
    const parent = hasChildren(node);
    const isOpen = parent && open.has(node.id);
    const selected = value === node.id;
    const icon = isOpen && node.expandedIcon ? node.expandedIcon : node.icon;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "li",
      {
        "aria-disabled": node.disabled || void 0,
        "aria-expanded": parent ? isOpen : void 0,
        "aria-level": level,
        "aria-posinset": index + 1,
        "aria-selected": selected,
        "aria-setsize": list.length,
        className: "outline-none [&:focus-visible>[data-slot=tree-row]]:ring-2 [&:focus-visible>[data-slot=tree-row]]:ring-ring [&:focus-visible>[data-slot=tree-row]]:ring-inset",
        "data-id": node.id,
        "data-slot": "tree-item",
        ref: (element) => {
          if (element) items.current.set(node.id, element);
          else items.current.delete(node.id);
        },
        role: "treeitem",
        tabIndex: node.id === tabStop ? 0 : -1,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "relative flex min-h-8 cursor-pointer select-none items-center gap-1.5 rounded-md px-2 text-base text-foreground transition-colors pointer-coarse:min-h-11 hover:bg-accent sm:min-h-7 sm:text-sm",
                "data-selected:bg-(--qy-surface-active) data-disabled:cursor-not-allowed data-disabled:opacity-64 data-disabled:hover:bg-transparent"
              ),
              "data-disabled": node.disabled ? "" : void 0,
              "data-expanded": isOpen ? "" : void 0,
              "data-selected": selected ? "" : void 0,
              "data-slot": "tree-row",
              onClick: () => {
                if (node.disabled) return;
                focus(node.id);
                select(node);
                if (expandOnClick) toggle(node);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "-ms-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground",
                    "data-slot": "tree-chevron",
                    onClick: (event) => {
                      if (!parent || node.disabled) return;
                      event.stopPropagation();
                      focus(node.id);
                      toggle(node);
                    },
                    children: parent ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ChevronRight,
                      {
                        className: cn(
                          "size-3.5 transition-[rotate] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
                          isOpen ? "rotate-90" : "rtl:rotate-180"
                        )
                      }
                    ) : null
                  }
                ),
                icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    "aria-hidden": "true",
                    className: "flex shrink-0 text-muted-foreground [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
                    "data-slot": "tree-icon",
                    children: icon
                  }
                ) : null,
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0 flex-1 truncate", "data-slot": "tree-label", children: node.label }),
                node.suffix != null ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-muted-foreground text-xs numeric", "data-slot": "tree-suffix", children: node.suffix }) : null
              ]
            }
          ),
          isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ul",
            {
              className: cn(
                "m-0 mt-px flex list-none flex-col gap-px p-0 ps-1",
                // The guide sits under the parent's chevron: row padding + half the chevron.
                "ms-[calc(--spacing(3.5)-0.5px)]",
                guides && "border-border border-s"
              ),
              "data-motion": "fade-in",
              "data-slot": "tree-group",
              role: "group",
              children: renderLevel(node.children ?? [], level + 1)
            }
          ) : null
        ]
      },
      node.id
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      "aria-label": label,
      className: cn("m-0 flex min-w-0 list-none flex-col gap-px p-0", className),
      "data-slot": "tree",
      onFocus: handleFocus,
      onKeyDown: handleKeyDown,
      role: "tree",
      ...props,
      children: renderLevel(nodes, 1)
    }
  );
}
export {
  Tree as T
};
