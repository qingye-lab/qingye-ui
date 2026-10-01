import { r as reactExports, j as jsxRuntimeExports, bo as pointer, e as cn, bp as X, bq as ScrollArea, q as useUILocale } from "./index-DM02Iz28.js";
import { I as Input } from "./input-D9i-AULz.js";
import { C as ChevronsUpDown } from "./chevrons-up-down-BLzcfRd-.js";
import { u as useCoreFilter, A as AriaCombobox, C as ComboboxTrigger, a as ComboboxInputGroup, b as ComboboxItem, c as ComboboxCollection, d as ComboboxInput, e as ComboboxIcon, f as ComboboxEmpty, g as ComboboxList, h as ComboboxGroup, i as ComboboxGroupLabel, j as ComboboxClear, k as ComboboxPortal, l as ComboboxPositioner, m as ComboboxPopup, n as ComboboxStatus } from "./ComboboxEmpty-BQp7q2Mg.js";
import { a as stringifyAsLabel, L as ListboxSeparator } from "./ListboxSeparator-DfAtCXVV.js";
function AutocompleteRoot(props) {
  const {
    openOnInputClick = false,
    value,
    defaultValue,
    onValueChange,
    mode = "list",
    itemToStringValue,
    ...other
  } = props;
  const enableInline = mode === "inline" || mode === "both";
  const staticItems = mode === "inline" || mode === "none";
  const isControlled = value !== void 0;
  const [internalValue, setInternalValue] = reactExports.useState(defaultValue ?? "");
  const [inlineInputValue, setInlineInputValue] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (isControlled) {
      setInlineInputValue("");
    }
  }, [value, isControlled]);
  let resolvedInputValue;
  if (enableInline && inlineInputValue !== "") {
    resolvedInputValue = inlineInputValue;
  } else if (isControlled) {
    resolvedInputValue = value ?? "";
  } else {
    resolvedInputValue = internalValue;
  }
  const collator = useCoreFilter({
    locale: other.locale
  });
  const baseFilter = reactExports.useMemo(() => {
    if (other.filter !== void 0) {
      return other.filter;
    }
    return collator.contains;
  }, [other.filter, collator]);
  const resolvedQuery = String(isControlled ? value : internalValue).trim();
  const resolvedFilter = reactExports.useMemo(() => {
    if (mode !== "both") {
      return staticItems ? null : baseFilter;
    }
    if (baseFilter === null) {
      return null;
    }
    return (item, _query, toString) => {
      return baseFilter(item, resolvedQuery, toString);
    };
  }, [baseFilter, mode, resolvedQuery, staticItems]);
  function handleValueChange(nextValue, eventDetails) {
    setInlineInputValue("");
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue, eventDetails);
  }
  function handleItemHighlighted(highlightedValue, eventDetails) {
    props.onItemHighlighted?.(highlightedValue, eventDetails);
    if (eventDetails.reason === pointer) {
      return;
    }
    setInlineInputValue(enableInline && highlightedValue != null ? stringifyAsLabel(highlightedValue, itemToStringValue) : "");
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AriaCombobox, {
    ...other,
    itemToStringLabel: itemToStringValue,
    openOnInputClick,
    selectionMode: "none",
    fillInputOnItemPress: true,
    filter: resolvedFilter,
    autoComplete: mode,
    inputValue: resolvedInputValue,
    defaultInputValue: defaultValue,
    onInputValueChange: handleValueChange,
    onItemHighlighted: handleItemHighlighted
  });
}
const AutocompleteTrigger$1 = ComboboxTrigger;
const AutocompleteInputGroup = ComboboxInputGroup;
const AutocompleteItem$1 = ComboboxItem;
const AutocompleteSeparator$1 = ListboxSeparator;
const Autocomplete = AutocompleteRoot;
function AutocompleteInput({
  className,
  showTrigger = false,
  showClear = false,
  startAddon,
  size,
  triggerProps,
  clearProps,
  ...props
}) {
  const sizeValue = size ?? "default";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AutocompleteInputGroup,
    {
      className: "relative not-has-[>*.w-full]:w-fit w-full text-foreground has-disabled:opacity-64",
      "data-slot": "autocomplete-input-group",
      children: [
        startAddon && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:-mx-0.5",
            "data-slot": "autocomplete-start-addon",
            children: startAddon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ComboboxInput,
          {
            className: cn(
              startAddon && "data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7.5)-1px)] *:data-[slot=autocomplete-input]:ps-[calc(--spacing(8.5)-1px)] sm:data-[size=sm]:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(7)-1px)] sm:*:data-[slot=autocomplete-input]:ps-[calc(--spacing(8)-1px)]",
              sizeValue === "sm" ? "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-6.5" : "has-[+[data-slot=autocomplete-trigger],+[data-slot=autocomplete-clear]]:*:data-[slot=autocomplete-input]:pe-7",
              className
            ),
            "data-slot": "autocomplete-input",
            render: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { nativeInput: true, size: sizeValue }),
            ...props
          }
        ),
        showTrigger && /* @__PURE__ */ jsxRuntimeExports.jsx(
          AutocompleteTrigger,
          {
            className: cn(
              "absolute top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=autocomplete-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
              sizeValue === "sm" ? "end-0" : "end-0.5"
            ),
            ...triggerProps,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxIcon, { "data-slot": "autocomplete-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, {}) })
          }
        ),
        showClear && /* @__PURE__ */ jsxRuntimeExports.jsx(
          AutocompleteClear,
          {
            className: cn(
              "absolute top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=autocomplete-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
              sizeValue === "sm" ? "end-0" : "end-0.5"
            ),
            ...clearProps,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {})
          }
        )
      ]
    }
  );
}
function AutocompletePopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  alignOffset,
  align = "start",
  anchor,
  portalProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxPortal, { ...portalProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxPositioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50 select-none",
      "data-slot": "autocomplete-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ComboboxPopup,
        {
          className: cn(
            "relative flex max-h-[min(var(--available-height),23rem)] min-w-(--anchor-width) max-w-(--available-width) flex-col origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-foreground shadow-lg/5 transition-[scale,opacity] data-ending-style:duration-(--qy-duration-press) data-starting-style:scale-98 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "autocomplete-popup",
          ...props,
          children
        }
      )
    }
  ) });
}
function AutocompleteItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteItem$1,
    {
      className: cn(
        "flex min-h-8 pointer-coarse:min-h-11 cursor-default select-none items-center rounded-sm px-2 py-1 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm",
        className
      ),
      "data-slot": "autocomplete-item",
      ...props,
      children
    }
  );
}
function AutocompleteSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteSeparator$1,
    {
      className: cn("mx-2 my-1 h-px bg-border last:hidden", className),
      "data-slot": "autocomplete-separator",
      ...props
    }
  );
}
function AutocompleteGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxGroup,
    {
      className: cn("[[role=group]+&]:mt-1.5", className),
      "data-slot": "autocomplete-group",
      ...props
    }
  );
}
function AutocompleteGroupLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxGroupLabel,
    {
      className: cn(
        "px-2 py-1.5 font-medium text-muted-foreground text-xs",
        className
      ),
      "data-slot": "autocomplete-group-label",
      ...props
    }
  );
}
function AutocompleteEmpty({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxEmpty,
    {
      className: cn(
        "not-empty:p-2 text-center text-base text-muted-foreground sm:text-sm",
        className
      ),
      "data-slot": "autocomplete-empty",
      ...props
    }
  );
}
function AutocompleteList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { overscrollContain: true, scrollbarGutter: true, scrollFade: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxList,
    {
      className: cn(
        "not-empty:scroll-py-1 not-empty:p-1 in-data-has-overflow-y:pe-3",
        className
      ),
      "data-slot": "autocomplete-list",
      ...props
    }
  ) });
}
function AutocompleteClear({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxClear,
    {
      "aria-label": messages.clearSelection,
      className: cn(
        "absolute end-0.5 top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-[color,background-color,box-shadow,opacity] pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "autocomplete-clear",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {})
    }
  );
}
function AutocompleteStatus({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxStatus,
    {
      className: cn(
        "px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0",
        className
      ),
      "data-slot": "autocomplete-status",
      ...props
    }
  );
}
const AutocompleteCollection = ComboboxCollection;
function AutocompleteTrigger({
  className,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AutocompleteTrigger$1,
    {
      "aria-label": messages.showOptions,
      className,
      "data-slot": "autocomplete-trigger",
      ...props,
      children
    }
  );
}
const useAutocompleteFilter = useCoreFilter;
export {
  Autocomplete as A,
  AutocompleteInput as a,
  AutocompletePopup as b,
  AutocompleteEmpty as c,
  AutocompleteList as d,
  AutocompleteItem as e,
  AutocompleteGroup as f,
  AutocompleteGroupLabel as g,
  AutocompleteCollection as h,
  AutocompleteSeparator as i,
  AutocompleteStatus as j,
  useAutocompleteFilter as u
};
