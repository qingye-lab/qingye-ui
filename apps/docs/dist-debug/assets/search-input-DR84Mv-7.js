import { q as useUILocale, r as reactExports, j as jsxRuntimeExports, aa as Spinner, D as Search, bp as X } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon, d as InputGroupButton } from "./input-group-2ApKrTnA.js";
function SearchInput({
  className,
  size = "default",
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onClear,
  clearLabel,
  shortcut,
  loading = false,
  placeholder,
  disabled,
  readOnly,
  onChange,
  onKeyDown,
  ref,
  ...props
}) {
  const { messages } = useUILocale();
  const [uncontrolled, setUncontrolled] = reactExports.useState(defaultValue);
  const value = valueProp ?? uncontrolled;
  const inputRef = reactExports.useRef(null);
  const [inheritedDisabled, setInheritedDisabled] = reactExports.useState(false);
  reactExports.useLayoutEffect(() => {
    const next = Boolean(inputRef.current?.disabled);
    if (next !== inheritedDisabled) setInheritedDisabled(next);
  });
  const setRefs = reactExports.useCallback(
    (node) => {
      inputRef.current = node;
      if (typeof ref === "function") return ref(node);
      if (ref) ref.current = node;
    },
    [ref]
  );
  const update = (next) => {
    if (valueProp === void 0) setUncontrolled(next);
    onValueChange?.(next);
  };
  const clear = () => {
    update("");
    onClear?.();
  };
  const isDisabled = Boolean(disabled) || inheritedDisabled;
  const canClear = value !== "" && !isDisabled && !readOnly;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputGroupInput,
      {
        disabled,
        enterKeyHint: "search",
        onChange: (event) => {
          onChange?.(event);
          update(event.currentTarget.value);
        },
        onKeyDown: (event) => {
          onKeyDown?.(event);
          if (event.defaultPrevented || event.key !== "Escape" || !canClear) return;
          event.preventDefault();
          event.stopPropagation();
          clear();
        },
        placeholder: placeholder ?? messages.searchPlaceholder,
        readOnly,
        ref: setRefs,
        size,
        ...props,
        type: "search",
        value
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { "aria-hidden": "true", "data-slot": "search-input-icon" }) }),
    canClear ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      InputGroupButton,
      {
        "aria-label": clearLabel ?? messages.clearSearch,
        className: "text-muted-foreground hover:text-foreground",
        "data-slot": "search-input-clear",
        onClick: () => {
          clear();
          inputRef.current?.focus();
        },
        size: size === "lg" ? "icon-sm" : "icon-xs",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": "true" })
      }
    ) }) : shortcut && !isDisabled ? /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", "aria-hidden": "true", children: shortcut }) : null
  ] });
}
export {
  SearchInput as S
};
