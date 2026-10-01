import { r as reactExports, V as formatErrorMessage, W as useControlled, X as useStableCallback, Y as useRenderElement, j as jsxRuntimeExports, Z as CompositeList, _ as transitionStatusMapping, $ as useCompositeListItem, a0 as useMergedRefs, a1 as useBaseUiId, a2 as useButton, a3 as useIsoLayoutEffect, a4 as resolveStyle, e as cn } from "./index-DM02Iz28.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import { c as collapsibleOpenStateMapping, u as useCollapsibleRoot, C as CollapsibleRootContext, a as useCollapsibleRootContext, t as triggerOpenStateMapping, b as useCollapsiblePanel } from "./useCollapsiblePanel-Dpoq1n6_.js";
const AccordionRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useAccordionRootContext() {
  const context = reactExports.useContext(AccordionRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(10));
  }
  return context;
}
const rootStateAttributesMapping = {
  value: () => null
};
const AccordionRoot = /* @__PURE__ */ reactExports.forwardRef(function AccordionRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    disabled = false,
    hiddenUntilFound: hiddenUntilFoundProp,
    keepMounted: keepMountedProp,
    loopFocus,
    onValueChange,
    multiple = false,
    orientation = "vertical",
    value: valueProp,
    defaultValue: defaultValueProp,
    style,
    ...elementProps
  } = componentProps;
  const defaultValue = reactExports.useMemo(() => {
    if (valueProp === void 0) {
      return defaultValueProp ?? [];
    }
    return void 0;
  }, [valueProp, defaultValueProp]);
  const accordionItemRefs = reactExports.useRef([]);
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Accordion",
    state: "value"
  });
  const handleValueChange = useStableCallback((newValue, nextOpen, details) => {
    if (!multiple) {
      const nextValue = value[0] === newValue ? [] : [newValue];
      onValueChange?.(nextValue, details);
      if (details.isCanceled) {
        return;
      }
      setValue(nextValue);
    } else if (nextOpen) {
      const nextOpenValues = value.slice();
      nextOpenValues.push(newValue);
      onValueChange?.(nextOpenValues, details);
      if (details.isCanceled) {
        return;
      }
      setValue(nextOpenValues);
    } else {
      const nextOpenValues = value.filter((v) => v !== newValue);
      onValueChange?.(nextOpenValues, details);
      if (details.isCanceled) {
        return;
      }
      setValue(nextOpenValues);
    }
  });
  const state = reactExports.useMemo(() => ({
    value,
    disabled,
    orientation
  }), [value, disabled, orientation]);
  const contextValue = reactExports.useMemo(() => ({
    disabled,
    handleValueChange,
    hiddenUntilFound: hiddenUntilFoundProp ?? false,
    keepMounted: keepMountedProp ?? false,
    state,
    value
  }), [disabled, handleValueChange, hiddenUntilFoundProp, keepMountedProp, state, value]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: rootStateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeList, {
      elementsRef: accordionItemRefs,
      children: element
    })
  });
});
const AccordionItemContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useAccordionItemContext() {
  const context = reactExports.useContext(AccordionItemContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(9));
  }
  return context;
}
let AccordionItemDataAttributes = /* @__PURE__ */ (function(AccordionItemDataAttributes2) {
  AccordionItemDataAttributes2["index"] = "data-index";
  AccordionItemDataAttributes2["disabled"] = "data-disabled";
  AccordionItemDataAttributes2["open"] = "data-open";
  return AccordionItemDataAttributes2;
})({});
const accordionStateAttributesMapping = {
  ...collapsibleOpenStateMapping,
  index: (value) => ({
    [AccordionItemDataAttributes.index]: String(value)
  }),
  ...transitionStatusMapping,
  value: () => null
};
const AccordionItem$1 = /* @__PURE__ */ reactExports.forwardRef(function AccordionItem2(componentProps, forwardedRef) {
  const {
    className,
    disabled: disabledProp = false,
    onOpenChange: onOpenChangeProp,
    render,
    value: valueProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    ref: listItemRef,
    index
  } = useCompositeListItem();
  const mergedRef = useMergedRefs(forwardedRef, listItemRef);
  const {
    disabled: contextDisabled,
    handleValueChange,
    state: rootState,
    value: openValues
  } = useAccordionRootContext();
  const fallbackValue = useBaseUiId();
  const value = valueProp ?? fallbackValue;
  const disabled = disabledProp || contextDisabled;
  const isOpen = openValues.indexOf(value) !== -1;
  const onOpenChange = useStableCallback((nextOpen, eventDetails) => {
    onOpenChangeProp?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    handleValueChange(value, nextOpen, eventDetails);
  });
  const collapsible = useCollapsibleRoot({
    open: isOpen,
    onOpenChange,
    disabled
  });
  const collapsibleState = reactExports.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible.open, collapsible.disabled, collapsible.transitionStatus]);
  const collapsibleContext = reactExports.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state: collapsibleState
  }), [collapsible, collapsibleState, onOpenChange]);
  const state = reactExports.useMemo(() => ({
    ...rootState,
    hidden: !isOpen && !collapsible.mounted,
    index,
    disabled,
    open: isOpen
  }), [collapsible.mounted, disabled, index, isOpen, rootState]);
  const defaultTriggerId = useBaseUiId();
  const [registeredTriggerId, setTriggerId] = reactExports.useState();
  const triggerId = registeredTriggerId === null ? void 0 : registeredTriggerId ?? defaultTriggerId;
  const accordionItemContext = reactExports.useMemo(() => ({
    defaultTriggerId,
    open: isOpen,
    state,
    setTriggerId,
    triggerId
  }), [defaultTriggerId, isOpen, state, setTriggerId, triggerId]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: mergedRef,
    props: elementProps,
    stateAttributesMapping: accordionStateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleRootContext.Provider, {
    value: collapsibleContext,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionItemContext.Provider, {
      value: accordionItemContext,
      children: element
    })
  });
});
const AccordionHeader = /* @__PURE__ */ reactExports.forwardRef(function AccordionHeader2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useAccordionItemContext();
  const element = useRenderElement("h3", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: accordionStateAttributesMapping
  });
  return element;
});
const AccordionTrigger$1 = /* @__PURE__ */ reactExports.forwardRef(function AccordionTrigger2(componentProps, forwardedRef) {
  const {
    disabled: disabledProp,
    className,
    id: idProp,
    render,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    panelId,
    open,
    handleTrigger,
    disabled: contextDisabled
  } = useCollapsibleRootContext();
  const disabled = disabledProp || contextDisabled;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const {
    defaultTriggerId,
    state,
    setTriggerId
  } = useAccordionItemContext();
  const registeredId = idProp || void 0;
  const id = registeredId ?? defaultTriggerId;
  useIsoLayoutEffect(() => {
    setTriggerId((currentId) => registeredId ?? (currentId === null ? void 0 : currentId));
    return () => {
      setTriggerId((currentId) => currentId === registeredId ? null : currentId);
    };
  }, [registeredId, setTriggerId]);
  const props = {
    "aria-controls": open ? panelId : void 0,
    "aria-expanded": open,
    id,
    onClick: handleTrigger
  };
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [props, elementProps, getButtonProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
let AccordionPanelCssVars = /* @__PURE__ */ (function(AccordionPanelCssVars2) {
  AccordionPanelCssVars2["accordionPanelHeight"] = "--accordion-panel-height";
  AccordionPanelCssVars2["accordionPanelWidth"] = "--accordion-panel-width";
  return AccordionPanelCssVars2;
})({});
const AccordionPanel$1 = /* @__PURE__ */ reactExports.forwardRef(function AccordionPanel2(componentProps, forwardedRef) {
  const {
    className,
    hiddenUntilFound: hiddenUntilFoundProp,
    keepMounted: keepMountedProp,
    id: idProp,
    render,
    style,
    ...elementProps
  } = componentProps;
  const {
    hiddenUntilFound: contextHiddenUntilFound,
    keepMounted: contextKeepMounted
  } = useAccordionRootContext();
  const {
    defaultPanelId,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    setPanelIdState,
    transitionStatus
  } = useCollapsibleRootContext();
  const hiddenUntilFound = hiddenUntilFoundProp ?? contextHiddenUntilFound;
  const keepMounted = keepMountedProp ?? contextKeepMounted;
  const registeredId = idProp || void 0;
  const id = idProp ?? defaultPanelId;
  useIsoLayoutEffect(() => {
    setPanelIdState((currentId) => registeredId ?? (currentId === null ? void 0 : currentId));
    return () => {
      setPanelIdState((currentId) => currentId === registeredId ? null : currentId);
    };
  }, [registeredId, setPanelIdState]);
  const {
    height,
    props,
    ref,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width
  } = useCollapsiblePanel({
    externalRef: forwardedRef,
    hiddenUntilFound,
    id,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  });
  const {
    state,
    triggerId
  } = useAccordionItemContext();
  const panelState = {
    ...state,
    transitionStatus: panelTransitionStatus
  };
  const resolvedStyle = resolveStyle(style, panelState);
  const element = useRenderElement("div", {
    ...componentProps,
    style: void 0
  }, {
    state: panelState,
    ref,
    props: [
      props,
      {
        "aria-labelledby": triggerId,
        role: "region",
        style: {
          [AccordionPanelCssVars.accordionPanelHeight]: height === void 0 ? "auto" : `${height}px`,
          [AccordionPanelCssVars.accordionPanelWidth]: width === void 0 ? "auto" : `${width}px`
        }
      },
      elementProps,
      resolvedStyle ? {
        style: resolvedStyle
      } : void 0,
      // Resolve the public `style` prop so temporary `animationName: 'none'`
      // can still win after user's inline styles have been merged.
      shouldPreventOpenAnimation ? {
        style: {
          animationName: "none"
        }
      } : void 0
    ],
    stateAttributesMapping: accordionStateAttributesMapping
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
function Accordion(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionRoot, { "data-slot": "accordion", ...props });
}
function AccordionItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionItem$1,
    {
      className: cn("border-b last:border-b-0", className),
      "data-slot": "accordion-item",
      ...props
    }
  );
}
function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionHeader, { className: "flex", "data-slot": "accordion-header", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AccordionTrigger$1,
    {
      className: cn(
        "flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-start font-medium text-sm outline-none transition-all focus-visible:ring-[3px] focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-64 data-disabled:pointer-events-none data-disabled:opacity-64 data-panel-open:*:data-[slot=accordion-indicator]:rotate-180",
        className
      ),
      "data-slot": "accordion-trigger",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronDown,
          {
            className: "pointer-events-none size-4 shrink-0 translate-y-0.5 opacity-80 transition-transform duration-200 ease-in-out",
            "data-slot": "accordion-indicator"
          }
        )
      ]
    }
  ) });
}
function AccordionPanel({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AccordionPanel$1,
    {
      className: "h-(--accordion-panel-height) overflow-hidden text-muted-foreground text-sm transition-[height] duration-200 ease-in-out data-ending-style:h-0 data-starting-style:h-0",
      "data-slot": "accordion-panel",
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pt-0 pb-4", className), children })
    }
  );
}
export {
  Accordion as A,
  AccordionItem as a,
  AccordionTrigger as b,
  AccordionPanel as c
};
