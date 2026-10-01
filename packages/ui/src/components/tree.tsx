"use client";

import { ChevronRightIcon } from "lucide-react";
import {
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "../utils";

export type TreeNode = {
  id: string;
  label: ReactNode;
  /** Text used for type-ahead when `label` is not a plain string. */
  textValue?: string;
  icon?: ReactNode;
  /** Icon while the node is expanded, such as an open folder. */
  expandedIcon?: ReactNode;
  /** Trailing content, such as a count or a badge. */
  suffix?: ReactNode;
  children?: readonly TreeNode[];
  /** Cannot be focused, selected or toggled. */
  disabled?: boolean;
};

export type TreeProps = Omit<ComponentProps<"ul">, "children" | "defaultValue" | "onChange"> & {
  nodes: readonly TreeNode[];
  /** Accessible name; or pass `aria-labelledby`. */
  label?: string;
  /** Selected node id (single selection). */
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (id: string, node: TreeNode) => void;
  expanded?: readonly string[];
  defaultExpanded?: readonly string[];
  onExpandedChange?: (ids: string[]) => void;
  /** Clicking a parent row also opens or closes it. */
  expandOnClick?: boolean;
  /** Vertical guide lines along open branches. */
  guides?: boolean;
};

type FlatNode = { node: TreeNode; level: number; parentId: string | null; siblings: readonly TreeNode[] };

const hasChildren = (node: TreeNode) => Boolean(node.children?.length);
const textOf = (node: TreeNode) => (node.textValue ?? (typeof node.label === "string" ? node.label : "")).toLocaleLowerCase();

export function Tree({
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
}: TreeProps): ReactElement {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [internalExpanded, setInternalExpanded] = useState<readonly string[]>(defaultExpanded);
  const [active, setActive] = useState<string | null>(null);
  const items = useRef(new Map<string, HTMLLIElement>());
  const typeahead = useRef({ text: "", timer: undefined as ReturnType<typeof setTimeout> | undefined });

  const value = valueProp === undefined ? internalValue : valueProp;
  const expanded = expandedProp ?? internalExpanded;
  const open = useMemo(() => new Set(expanded), [expanded]);

  // Visible nodes in document order, which is the order arrow keys follow.
  const visible = useMemo(() => {
    const rows: FlatNode[] = [];
    const walk = (list: readonly TreeNode[], level: number, parentId: string | null) => {
      for (const node of list) {
        rows.push({ level, node, parentId, siblings: list });
        if (node.children && open.has(node.id)) walk(node.children, level + 1, node.id);
      }
    };
    walk(nodes, 1, null);
    return rows;
  }, [nodes, open]);
  const focusable = visible.filter(({ node }) => !node.disabled);
  const isFocusable = (id: string | null) => id !== null && focusable.some(({ node }) => node.id === id);
  const tabStop = isFocusable(active) ? active : isFocusable(value) ? value : (focusable[0]?.node.id ?? null);

  useEffect(() => () => clearTimeout(typeahead.current.timer), []);

  const setExpanded = (next: string[]) => {
    if (expandedProp === undefined) setInternalExpanded(next);
    onExpandedChange?.(next);
  };
  const toggle = (node: TreeNode, force?: boolean) => {
    if (node.disabled || !hasChildren(node)) return;
    const shouldOpen = force ?? !open.has(node.id);
    if (shouldOpen === open.has(node.id)) return;
    setExpanded(shouldOpen ? [...expanded, node.id] : expanded.filter((id) => id !== node.id));
  };
  const select = (node: TreeNode) => {
    if (node.disabled) return;
    if (valueProp === undefined) setInternalValue(node.id);
    onValueChange?.(node.id, node);
  };
  const focus = (id: string | undefined) => {
    if (!id) return;
    setActive(id);
    items.current.get(id)?.focus();
  };

  const handleFocus = (event: FocusEvent<HTMLUListElement>) => {
    onFocus?.(event);
    const id = (event.target as HTMLElement).closest<HTMLElement>("[data-slot=tree-item]")?.dataset.id;
    if (id) setActive(id);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || event.target !== items.current.get((event.target as HTMLElement).dataset.id ?? "")) return;
    const id = (event.target as HTMLElement).dataset.id;
    const index = focusable.findIndex(({ node }) => node.id === id);
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
        // Type-ahead: jump to the next visible node whose text starts with what was typed.
        if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return;
        const state = typeahead.current;
        clearTimeout(state.timer);
        state.text += event.key.toLocaleLowerCase();
        state.timer = setTimeout(() => {
          state.text = "";
        }, 500);
        const repeated = state.text.split("").every((char) => char === state.text[0]);
        const query = repeated ? state.text[0]! : state.text;
        const start = repeated || state.text.length === 1 ? index + 1 : index;
        const ordered = [...focusable.slice(start), ...focusable.slice(0, start)];
        focus(ordered.find((candidate) => textOf(candidate.node).startsWith(query))?.node.id);
      }
    }
    event.preventDefault();
  };

  const renderLevel = (list: readonly TreeNode[], level: number): ReactNode =>
    list.map((node, index) => {
      const parent = hasChildren(node);
      const isOpen = parent && open.has(node.id);
      const selected = value === node.id;
      const icon = isOpen && node.expandedIcon ? node.expandedIcon : node.icon;
      return (
        <li
          aria-disabled={node.disabled || undefined}
          aria-expanded={parent ? isOpen : undefined}
          aria-level={level}
          aria-posinset={index + 1}
          aria-selected={selected}
          aria-setsize={list.length}
          className="outline-none [&:focus-visible>[data-slot=tree-row]]:ring-2 [&:focus-visible>[data-slot=tree-row]]:ring-ring [&:focus-visible>[data-slot=tree-row]]:ring-inset"
          data-id={node.id}
          data-slot="tree-item"
          key={node.id}
          ref={(element) => {
            if (element) items.current.set(node.id, element);
            else items.current.delete(node.id);
          }}
          role="treeitem"
          tabIndex={node.id === tabStop ? 0 : -1}
        >
          <div
            className={cn(
              "relative flex min-h-8 cursor-pointer select-none items-center gap-[calc(var(--qy-space-1)*1.5)] rounded-md px-(--qy-space-2) text-base text-foreground transition-colors pointer-coarse:min-h-11 hover:bg-accent sm:min-h-7 sm:text-sm",
              "data-selected:bg-(--qy-surface-active) data-disabled:cursor-not-allowed data-disabled:opacity-64 data-disabled:hover:bg-transparent",
            )}
            data-disabled={node.disabled ? "" : undefined}
            data-expanded={isOpen ? "" : undefined}
            data-selected={selected ? "" : undefined}
            data-slot="tree-row"
            onClick={() => {
              if (node.disabled) return;
              focus(node.id);
              select(node);
              if (expandOnClick) toggle(node);
            }}
          >
            <span
              aria-hidden="true"
              className="-ms-0.5 flex size-4 shrink-0 items-center justify-center text-muted-foreground"
              data-slot="tree-chevron"
              onClick={(event) => {
                if (!parent || node.disabled) return;
                event.stopPropagation();
                focus(node.id);
                toggle(node);
              }}
            >
              {parent ? (
                <ChevronRightIcon
                  className={cn(
                    "size-3.5 transition-[rotate] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
                    isOpen ? "rotate-90" : "rtl:rotate-180",
                  )}
                />
              ) : null}
            </span>
            {icon ? (
              <span
                aria-hidden="true"
                className="flex shrink-0 text-muted-foreground [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0"
                data-slot="tree-icon"
              >
                {icon}
              </span>
            ) : null}
            <span className="min-w-0 flex-1 truncate" data-slot="tree-label">
              {node.label}
            </span>
            {node.suffix != null ? (
              <span className="shrink-0 text-muted-foreground text-xs numeric" data-slot="tree-suffix">
                {node.suffix}
              </span>
            ) : null}
          </div>
          {isOpen ? (
            <ul
              className={cn(
                "m-0 mt-px flex list-none flex-col gap-px p-0 ps-(--qy-space-1)",
                // The guide sits under the parent's chevron: row padding + half the chevron.
                "ms-[calc(var(--qy-space-2)+1rem/2-2px-0.5px)]",
                guides && "border-border border-s",
              )}
              data-motion="fade-in"
              data-slot="tree-group"
              role="group"
            >
              {renderLevel(node.children ?? [], level + 1)}
            </ul>
          ) : null}
        </li>
      );
    });

  return (
    <ul
      aria-label={label}
      className={cn("m-0 flex min-w-0 list-none flex-col gap-px p-0", className)}
      data-slot="tree"
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      role="tree"
      {...props}
    >
      {renderLevel(nodes, 1)}
    </ul>
  );
}
