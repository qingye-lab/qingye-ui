import { j as jsxRuntimeExports, as as useStore, r as reactExports, ac as useTransitionStatus, Y as useRenderElement, ad as useOpenChangeComplete, _ as transitionStatusMapping, Z as CompositeList, aG as EMPTY_OBJECT, V as formatErrorMessage, aZ as useDirection, $ as useCompositeListItem, bN as reactDomExports, bE as stopEvent, bD as keyboard, aJ as createChangeEventDetails, aK as none, bF as listNavigation, a2 as useButton, cm as chipRemovePress, bo as pointer, e as cn, bp as X, bq as ScrollArea, C as Check, q as useUILocale } from "./index-DM02Iz28.js";
import { I as Input } from "./input-D9i-AULz.js";
import { C as ChevronsUpDown } from "./chevrons-up-down-BLzcfRd-.js";
import { A as AriaCombobox, o as useComboboxRootContext, s as selectors, p as useComboboxItemContext, q as ComboboxChipsContext, r as handleInputPress, t as useComboboxChipsContext, v as getIndexAfterChipRemoval, w as getChipNavigationKeys, c as ComboboxCollection$1, a as ComboboxInputGroup, d as ComboboxInput$1, e as ComboboxIcon, k as ComboboxPortal, l as ComboboxPositioner, m as ComboboxPopup$1, f as ComboboxEmpty$1, g as ComboboxList$1, b as ComboboxItem$1, n as ComboboxStatus$1, h as ComboboxGroup$1, i as ComboboxGroupLabel$1, C as ComboboxTrigger$1, j as ComboboxClear$1 } from "./ComboboxEmpty-BQp7q2Mg.js";
import { r as resolveMultipleLabels, b as resolveSelectedLabel, f as findItemIndex, L as ListboxSeparator } from "./ListboxSeparator-DfAtCXVV.js";
function ComboboxRoot(props) {
  const {
    multiple = false,
    defaultValue,
    value,
    onValueChange,
    autoComplete,
    ...other
  } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AriaCombobox, {
    ...other,
    selectionMode: multiple ? "multiple" : "single",
    selectedValue: value,
    defaultSelectedValue: defaultValue,
    onSelectedValueChange: onValueChange,
    formAutoComplete: autoComplete
  });
}
function ComboboxValue$1(props) {
  const {
    children: childrenProp,
    placeholder
  } = props;
  const store = useComboboxRootContext();
  const itemToStringLabel = useStore(store, selectors.itemToStringLabel);
  const selectedValue = useStore(store, selectors.selectedValue);
  const items = useStore(store, selectors.items);
  const multiple = useStore(store, selectors.selectionMode) === "multiple";
  const hasSelectedValue = useStore(store, selectors.hasSelectedValue);
  const shouldCheckNullItemLabel = !hasSelectedValue && placeholder != null && childrenProp == null;
  const hasNullLabel = useStore(store, selectors.hasNullItemLabel, shouldCheckNullItemLabel);
  let children = null;
  if (typeof childrenProp === "function") {
    children = childrenProp(selectedValue);
  } else if (childrenProp != null) {
    children = childrenProp;
  } else if (!hasSelectedValue && placeholder != null && !hasNullLabel) {
    children = placeholder;
  } else if (multiple && Array.isArray(selectedValue)) {
    children = resolveMultipleLabels(selectedValue, items, itemToStringLabel);
  } else {
    children = resolveSelectedLabel(selectedValue, items, itemToStringLabel);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, {
    children
  });
}
const ComboboxItemIndicator = /* @__PURE__ */ reactExports.forwardRef(function ComboboxItemIndicator2(componentProps, forwardedRef) {
  const {
    selected
  } = useComboboxItemContext();
  const shouldRender = componentProps.keepMounted || selected;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Inner, {
    ...componentProps,
    ref: forwardedRef
  });
});
const Inner = /* @__PURE__ */ reactExports.memo(/* @__PURE__ */ reactExports.forwardRef((componentProps, forwardedRef) => {
  const {
    render,
    className,
    style,
    keepMounted,
    ...elementProps
  } = componentProps;
  const {
    selected
  } = useComboboxItemContext();
  const indicatorRef = reactExports.useRef(null);
  const {
    transitionStatus,
    setMounted
  } = useTransitionStatus(selected);
  const state = {
    selected,
    transitionStatus
  };
  const element = useRenderElement("span", componentProps, {
    ref: [forwardedRef, indicatorRef],
    state,
    props: [{
      "aria-hidden": true,
      children: "✔️"
    }, elementProps],
    stateAttributesMapping: transitionStatusMapping
  });
  useOpenChangeComplete({
    open: selected,
    ref: indicatorRef,
    onComplete() {
      if (!selected) {
        setMounted(false);
      }
    }
  });
  return element;
}));
const ComboboxChips$1 = /* @__PURE__ */ reactExports.forwardRef(function ComboboxChips2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const store = useComboboxRootContext();
  const open = useStore(store, selectors.open);
  const hasSelectionChips = useStore(store, selectors.hasSelectionChips);
  const [highlightedChipIndex, setHighlightedChipIndex] = reactExports.useState(void 0);
  if (open && highlightedChipIndex !== void 0) {
    setHighlightedChipIndex(void 0);
  }
  const chipsRef = reactExports.useRef([]);
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, store.state.chipsContainerRef],
    // NVDA enters browse mode instead of staying in focus mode when navigating with
    // arrow keys inside a container unless it has a toolbar role.
    props: [hasSelectionChips ? {
      role: "toolbar"
    } : EMPTY_OBJECT, {
      onMouseDown(event) {
        handleInputPress(event, store, store.state.disabled, store.state.readOnly);
      }
    }, elementProps]
  });
  const contextValue = reactExports.useMemo(() => ({
    highlightedChipIndex,
    setHighlightedChipIndex,
    chipsRef
  }), [highlightedChipIndex, setHighlightedChipIndex, chipsRef]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChipsContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeList, {
      elementsRef: chipsRef,
      children: element
    })
  });
});
const ComboboxChipContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useComboboxChipContext() {
  const context = reactExports.useContext(ComboboxChipContext);
  if (!context) {
    throw new Error(formatErrorMessage(17));
  }
  return context;
}
const ComboboxChip$1 = /* @__PURE__ */ reactExports.forwardRef(function ComboboxChip2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const store = useComboboxRootContext();
  const {
    setHighlightedChipIndex,
    chipsRef
  } = useComboboxChipsContext();
  const direction = useDirection();
  const disabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const selectedValue = useStore(store, selectors.selectedValue);
  const {
    ref,
    index
  } = useCompositeListItem();
  function handleKeyDown(event) {
    let nextIndex = index;
    const [previousChipKey, nextChipKey] = getChipNavigationKeys(direction);
    if (event.key === previousChipKey) {
      event.preventDefault();
      if (index > 0) {
        nextIndex = index - 1;
      } else {
        nextIndex = void 0;
      }
    } else if (event.key === nextChipKey) {
      event.preventDefault();
      if (index < chipsRef.current.length - 1) {
        nextIndex = index + 1;
      } else {
        nextIndex = void 0;
      }
    } else if (event.key === "Backspace" || event.key === "Delete") {
      nextIndex = getIndexAfterChipRemoval(index, selectedValue.length);
      stopEvent(event);
      store.state.setIndices({
        activeIndex: null,
        selectedIndex: null,
        type: keyboard
      });
      store.state.setSelectedValue(selectedValue.filter((_, i) => i !== index), createChangeEventDetails(none, event.nativeEvent));
    } else if (event.key === "Enter" || event.key === " ") {
      stopEvent(event);
      nextIndex = void 0;
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      stopEvent(event);
      store.state.setOpen(true, createChangeEventDetails(listNavigation, event.nativeEvent));
      nextIndex = void 0;
    } else if (
      // Check for printable characters (letters, numbers, symbols)
      event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey
    ) {
      nextIndex = void 0;
    }
    return nextIndex;
  }
  const state = {
    disabled
  };
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, ref],
    state,
    props: [{
      tabIndex: -1,
      "aria-disabled": disabled || void 0,
      "aria-readonly": readOnly || void 0,
      onKeyDown(event) {
        if (disabled || readOnly) {
          return;
        }
        const nextIndex = handleKeyDown(event);
        reactDomExports.flushSync(() => {
          setHighlightedChipIndex(nextIndex);
        });
        if (nextIndex === void 0) {
          store.state.inputRef.current?.focus();
        } else {
          chipsRef.current[nextIndex]?.focus();
        }
      }
    }, elementProps]
  });
  const contextValue = reactExports.useMemo(() => ({
    index
  }), [index]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChipContext.Provider, {
    value: contextValue,
    children: element
  });
});
const ComboboxChipRemove$1 = /* @__PURE__ */ reactExports.forwardRef(function ComboboxChipRemove2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled: disabledProp = false,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const store = useComboboxRootContext();
  const {
    index
  } = useComboboxChipContext();
  const comboboxDisabled = useStore(store, selectors.disabled);
  const readOnly = useStore(store, selectors.readOnly);
  const selectedValue = useStore(store, selectors.selectedValue);
  const isItemEqualToValue = useStore(store, selectors.isItemEqualToValue);
  const disabled = comboboxDisabled || disabledProp;
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    native: nativeButton,
    disabled: disabled || readOnly,
    focusableWhenDisabled: true
  });
  const state = {
    disabled
  };
  function clearActiveIndexForRemovedItem(removedItem) {
    const activeIndex = store.state.activeIndex;
    if (activeIndex == null) {
      return;
    }
    const removedIndex = findItemIndex(store.state.valuesRef.current, removedItem, isItemEqualToValue);
    if (removedIndex !== -1 && activeIndex === removedIndex) {
      store.state.setIndices({
        activeIndex: null,
        type: store.state.keyboardActiveRef.current ? keyboard : pointer
      });
    }
  }
  function removeChip(event) {
    const eventDetails = createChangeEventDetails(chipRemovePress, event.nativeEvent);
    const removedItem = selectedValue[index];
    clearActiveIndexForRemovedItem(removedItem);
    store.state.setSelectedValue(selectedValue.filter((_, i) => i !== index), eventDetails);
    store.state.inputRef.current?.focus();
    return eventDetails;
  }
  const element = useRenderElement("button", componentProps, {
    ref: [forwardedRef, buttonRef],
    state,
    props: [{
      tabIndex: -1,
      onMouseDown(event) {
        event.preventDefault();
      },
      onClick(event) {
        const eventDetails = removeChip(event);
        if (!eventDetails.isPropagationAllowed) {
          event.stopPropagation();
        }
      },
      onKeyDown(event) {
        if (event.key === "Enter" || event.key === " ") {
          const eventDetails = removeChip(event);
          if (!eventDetails.isPropagationAllowed) {
            stopEvent(event);
          }
        }
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
const ComboboxSeparator$1 = ListboxSeparator;
const ComboboxContext = reactExports.createContext({
  chipsRef: null,
  multiple: false
});
function Combobox(props) {
  const chipsRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxContext.Provider, { value: { chipsRef, multiple: !!props.multiple }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxRoot, { ...props }) });
}
function ComboboxChipsInput({
  className,
  size,
  ...props
}) {
  const sizeValue = size ?? "default";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxInput$1,
    {
      className: cn(
        "min-w-12 flex-1 text-base text-foreground outline-none sm:text-sm [[data-slot=combobox-chip]+&]:ps-0.5",
        sizeValue === "sm" ? "ps-1.5" : "ps-2",
        className
      ),
      "data-size": typeof sizeValue === "string" ? sizeValue : void 0,
      "data-slot": "combobox-chips-input",
      size: typeof sizeValue === "number" ? sizeValue : void 0,
      ...props
    }
  );
}
function ComboboxInput({
  className,
  showTrigger = true,
  showClear = false,
  startAddon,
  size,
  triggerProps,
  clearProps,
  ...props
}) {
  const sizeValue = size ?? "default";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ComboboxInputGroup,
    {
      className: "relative not-has-[>*.w-full]:w-fit w-full text-foreground has-disabled:opacity-64",
      "data-slot": "combobox-input-group",
      children: [
        startAddon && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "pointer-events-none absolute inset-y-0 start-px z-10 flex items-center ps-[calc(--spacing(3)-1px)] opacity-80 has-[+[data-size=sm]]:ps-[calc(--spacing(2.5)-1px)] [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:-mx-0.5",
            "data-slot": "combobox-start-addon",
            children: startAddon
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ComboboxInput$1,
          {
            className: cn(
              startAddon && "data-[size=sm]:*:data-[slot=combobox-input]:ps-[calc(--spacing(7.5)-1px)] *:data-[slot=combobox-input]:ps-[calc(--spacing(8.5)-1px)] sm:data-[size=sm]:*:data-[slot=combobox-input]:ps-[calc(--spacing(7)-1px)] sm:*:data-[slot=combobox-input]:ps-[calc(--spacing(8)-1px)]",
              sizeValue === "sm" ? "has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=combobox-input]:pe-6.5" : "has-[+[data-slot=combobox-trigger],+[data-slot=combobox-clear]]:*:data-[slot=combobox-input]:pe-7",
              className
            ),
            "data-slot": "combobox-input",
            render: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                className: "has-disabled:opacity-100",
                nativeInput: true,
                size: sizeValue
              }
            ),
            ...props
          }
        ),
        showTrigger && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ComboboxTrigger,
          {
            className: cn(
              "absolute top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-opacity pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=combobox-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
              sizeValue === "sm" ? "end-0" : "end-0.5"
            ),
            ...triggerProps,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxIcon, { "data-slot": "combobox-icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, {}) })
          }
        ),
        showClear && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ComboboxClear,
          {
            className: cn(
              "absolute top-1/2 inline-flex size-8 shrink-0 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md border border-transparent opacity-80 outline-none transition-opacity pointer-coarse:after:absolute pointer-coarse:after:min-h-11 pointer-coarse:after:min-w-11 hover:opacity-100 has-[+[data-slot=combobox-clear]]:hidden sm:size-7 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
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
function ComboboxTrigger({
  className,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxTrigger$1,
    {
      "aria-label": messages.showOptions,
      className,
      "data-slot": "combobox-trigger",
      ...props,
      children
    }
  );
}
function ComboboxPopup({
  className,
  children,
  side = "bottom",
  sideOffset = 4,
  alignOffset,
  align = "start",
  anchor: anchorProp,
  portalProps,
  ...props
}) {
  const { chipsRef } = reactExports.useContext(ComboboxContext);
  const anchor = anchorProp ?? chipsRef;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxPortal, { ...portalProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxPositioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50 select-none",
      "data-slot": "combobox-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ComboboxPopup$1,
        {
          className: cn(
            "relative flex max-h-[min(var(--available-height),23rem)] min-w-(--anchor-width) max-w-(--available-width) flex-col origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-foreground shadow-lg/5 transition-[scale,opacity] data-ending-style:duration-(--qy-duration-press) data-starting-style:scale-98 data-starting-style:opacity-0 data-ending-style:scale-98 data-ending-style:opacity-0 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "combobox-popup",
          ...props,
          children
        }
      )
    }
  ) });
}
function ComboboxItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ComboboxItem$1,
    {
      className: cn(
        "grid min-h-8 pointer-coarse:min-h-11 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[1rem_minmax(0,1fr)] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "combobox-item",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItemIndicator, { className: "col-start-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { "aria-hidden": "true", strokeWidth: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "wrap-anywhere col-start-2 min-w-0", children })
      ]
    }
  );
}
function ComboboxSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxSeparator$1,
    {
      className: cn("mx-2 my-1 h-px bg-border last:hidden", className),
      "data-slot": "combobox-separator",
      ...props
    }
  );
}
function ComboboxGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxGroup$1,
    {
      className: cn("[[role=group]+&]:mt-1.5", className),
      "data-slot": "combobox-group",
      ...props
    }
  );
}
function ComboboxGroupLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxGroupLabel$1,
    {
      className: cn(
        "px-2 py-1.5 font-medium text-muted-foreground text-xs",
        className
      ),
      "data-slot": "combobox-group-label",
      ...props
    }
  );
}
function ComboboxEmpty({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxEmpty$1,
    {
      className: cn(
        "not-empty:p-2 text-center text-base text-muted-foreground sm:text-sm",
        className
      ),
      "data-slot": "combobox-empty",
      ...props
    }
  );
}
const ComboboxValue = ComboboxValue$1;
function ComboboxList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { overscrollContain: true, scrollbarGutter: true, scrollFade: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxList$1,
    {
      className: cn(
        "not-empty:scroll-py-1 not-empty:px-1 not-empty:py-1 in-data-has-overflow-y:pe-3",
        className
      ),
      "data-slot": "combobox-list",
      ...props
    }
  ) });
}
function ComboboxClear({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxClear$1,
    {
      "aria-label": messages.clearSelection,
      className,
      "data-slot": "combobox-clear",
      ...props
    }
  );
}
function ComboboxStatus({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxStatus$1,
    {
      className: cn(
        "px-3 py-2 font-medium text-muted-foreground text-xs empty:m-0 empty:p-0",
        className
      ),
      "data-slot": "combobox-status",
      ...props
    }
  );
}
const ComboboxCollection = ComboboxCollection$1;
function ComboboxChips({
  className,
  children,
  startAddon,
  ...props
}) {
  const { chipsRef } = reactExports.useContext(ComboboxContext);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ComboboxChips$1,
    {
      className: cn(
        "relative inline-flex min-h-9 w-full flex-wrap gap-1 rounded-lg border border-input bg-background not-dark:bg-clip-padding p-[calc(--spacing(1)-1px)] text-base shadow-xs/5 outline-none ring-ring/24 transition-shadow *:min-h-7 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] not-has-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_1px_--theme(--color-black/4%)] focus-within:border-ring focus-within:ring-[3px] has-disabled:pointer-events-none has-data-[size=lg]:min-h-10 has-data-[size=sm]:min-h-8 has-aria-invalid:border-destructive/36 has-disabled:opacity-64 has-[:disabled,:focus-within,[aria-invalid]]:shadow-none focus-within:has-aria-invalid:border-destructive/64 focus-within:has-aria-invalid:ring-destructive/16 has-data-[size=lg]:*:min-h-8 has-data-[size=sm]:*:min-h-6 sm:min-h-8 sm:text-sm sm:has-data-[size=lg]:min-h-9 sm:has-data-[size=sm]:min-h-7 sm:*:min-h-6 sm:has-data-[size=lg]:*:min-h-7 sm:has-data-[size=sm]:*:min-h-5 dark:not-has-disabled:bg-input/32 dark:has-aria-invalid:ring-destructive/24 dark:not-has-disabled:not-focus-within:not-aria-invalid:before:shadow-[0_-1px_--theme(--color-white/6%)]",
        className
      ),
      "data-slot": "combobox-chips",
      ref: chipsRef,
      ...props,
      children: [
        startAddon && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            className: "flex shrink-0 items-center ps-2 opacity-80 has-[~[data-size=sm]]:has-[+[data-slot=combobox-chip]]:pe-1.5 has-[~[data-size=sm]]:ps-1.5 has-[+[data-slot=combobox-chip]]:pe-2 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-ms-0.5 [&_svg]:-me-1.5",
            "data-slot": "combobox-start-addon",
            children: startAddon
          }
        ),
        children
      ]
    }
  );
}
function ComboboxChip({
  children,
  removeProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ComboboxChip$1,
    {
      className: "flex items-center rounded-[calc(var(--radius-md)-1px)] bg-accent ps-2 font-medium text-accent-foreground text-sm outline-none sm:text-xs/(--text-xs--line-height) [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      "data-slot": "combobox-chip",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChipRemove, { ...removeProps })
      ]
    }
  );
}
function ComboboxChipRemove(props) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxChipRemove$1,
    {
      "aria-label": messages.remove,
      className: "h-full shrink-0 cursor-pointer px-1.5 opacity-80 hover:opacity-100 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5",
      "data-slot": "combobox-chip-remove",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {})
    }
  );
}
export {
  Combobox as C,
  ComboboxInput as a,
  ComboboxPopup as b,
  ComboboxEmpty as c,
  ComboboxList as d,
  ComboboxItem as e,
  ComboboxGroup as f,
  ComboboxGroupLabel as g,
  ComboboxCollection as h,
  ComboboxSeparator as i,
  ComboboxChips as j,
  ComboboxValue as k,
  ComboboxChip as l,
  ComboboxChipsInput as m,
  ComboboxStatus as n
};
