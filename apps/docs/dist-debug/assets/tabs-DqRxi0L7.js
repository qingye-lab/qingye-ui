import { r as reactExports, V as formatErrorMessage, W as useControlled, a3 as useIsoLayoutEffect, X as useStableCallback, aJ as createChangeEventDetails, bh as initial, bi as missing, Y as useRenderElement, j as jsxRuntimeExports, Z as CompositeList, bj as disabled, bk as useCompositeRootContext, a1 as useBaseUiId, bl as useCompositeItem, bm as activeElement, an as ownerDocument, aN as contains, a2 as useButton, aK as none, bn as getCssDimensions, $ as useCompositeListItem, ac as useTransitionStatus, ad as useOpenChangeComplete, _ as transitionStatusMapping, aX as inertValue, ap as EMPTY_ARRAY, e as cn } from "./index-DM02Iz28.js";
import { s as segmentedControlItemSizeClassNames, a as segmentedControlItemLayoutClassName } from "./segmented-control-BQMJ2MA6.js";
import { A as ACTIVE_COMPOSITE_ITEM, C as CompositeRoot } from "./CompositeRoot-xQsp56hN.js";
import { u as useForcedRerendering } from "./useForcedRerendering-B3yRwVad.js";
import { P as PrehydrationScript, s as script } from "./PrehydrationScript-DonLZqUI.js";
const TabsRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useTabsRootContext() {
  const context = reactExports.useContext(TabsRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(64));
  }
  return context;
}
const tabsStateAttributesMapping = {
  tabActivationDirection: (dir) => ({
    "data-activation-direction": dir
  })
};
const TabsRoot = /* @__PURE__ */ reactExports.forwardRef(function TabsRoot2(componentProps, forwardedRef) {
  const {
    className,
    defaultValue: defaultValueProp = 0,
    onValueChange: onValueChangeProp,
    orientation = "horizontal",
    render,
    value: valueProp,
    style,
    ...elementProps
  } = componentProps;
  const hasExplicitDefaultValueProp = componentProps.defaultValue !== void 0;
  const tabPanelRefs = reactExports.useRef([]);
  const [mountedTabPanels, setMountedTabPanels] = reactExports.useState(() => /* @__PURE__ */ new Map());
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValueProp,
    name: "Tabs",
    state: "value"
  });
  const isControlled = valueProp !== void 0;
  const [tabMap, setTabMap] = reactExports.useState(() => /* @__PURE__ */ new Map());
  const lastKnownTabElementRef = reactExports.useRef(void 0);
  const getTabElementBySelectedValue = reactExports.useCallback((selectedValue) => findTabElement(tabMap, selectedValue), [tabMap]);
  const [activationDirectionState, setActivationDirectionState] = reactExports.useState(() => ({
    previousValue: value,
    tabActivationDirection: "none"
  }));
  const {
    previousValue,
    tabActivationDirection: committedTabActivationDirection
  } = activationDirectionState;
  let tabActivationDirection = committedTabActivationDirection;
  let directionComputationIncomplete = false;
  if (previousValue !== value) {
    tabActivationDirection = computeActivationDirection(previousValue, value, orientation, tabMap);
    directionComputationIncomplete = previousValue != null && value != null && getTabElementBySelectedValue(value) == null;
  }
  const nextPreviousValue = directionComputationIncomplete ? previousValue : value;
  const shouldSyncActivationDirectionState = previousValue !== nextPreviousValue || committedTabActivationDirection !== tabActivationDirection;
  useIsoLayoutEffect(() => {
    if (!shouldSyncActivationDirectionState) {
      return;
    }
    setActivationDirectionState({
      previousValue: nextPreviousValue,
      tabActivationDirection
    });
  }, [nextPreviousValue, shouldSyncActivationDirectionState, tabActivationDirection]);
  const onValueChange = useStableCallback((newValue, eventDetails) => {
    const activationDirection = computeActivationDirection(value, newValue, orientation, tabMap);
    eventDetails.activationDirection = activationDirection;
    onValueChangeProp?.(newValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValue(newValue);
  });
  const notifyAutomaticValueChange = useStableCallback((nextValue, reason) => {
    onValueChangeProp?.(nextValue, createChangeEventDetails(reason, void 0, void 0, {
      activationDirection: "none"
    }));
  });
  const registerMountedTabPanel = useStableCallback((panelValue, panelId) => {
    setMountedTabPanels((prev) => {
      const next = new Map(prev);
      next.set(panelValue, panelId);
      return next;
    });
    return () => {
      setMountedTabPanels((prev) => {
        if (prev.get(panelValue) !== panelId) {
          return prev;
        }
        const next = new Map(prev);
        next.delete(panelValue);
        return next;
      });
    };
  });
  const getTabPanelIdByValue = reactExports.useCallback((tabValue) => {
    return mountedTabPanels.get(tabValue);
  }, [mountedTabPanels]);
  const getTabIdByPanelValue = reactExports.useCallback((tabPanelValue) => {
    for (const tabMetadata of tabMap.values()) {
      if (tabPanelValue === tabMetadata.value) {
        return tabMetadata.id;
      }
    }
    return void 0;
  }, [tabMap]);
  const tabsContextValue = reactExports.useMemo(() => ({
    getTabElementBySelectedValue,
    getTabIdByPanelValue,
    getTabPanelIdByValue,
    onValueChange,
    orientation,
    registerMountedTabPanel,
    setTabMap,
    tabActivationDirection,
    value
  }), [getTabElementBySelectedValue, getTabIdByPanelValue, getTabPanelIdByValue, onValueChange, orientation, registerMountedTabPanel, setTabMap, tabActivationDirection, value]);
  const selectedTabMetadata = reactExports.useMemo(() => {
    for (const tabMetadata of tabMap.values()) {
      if (tabMetadata.value === value) {
        return tabMetadata;
      }
    }
    return void 0;
  }, [tabMap, value]);
  const firstEnabledTabValue = reactExports.useMemo(() => {
    for (const tabMetadata of tabMap.values()) {
      if (!tabMetadata.disabled) {
        return tabMetadata.value;
      }
    }
    return void 0;
  }, [tabMap]);
  const shouldNotifyInitialValueChangeRef = reactExports.useRef(!hasExplicitDefaultValueProp);
  const initialDefaultValueRef = reactExports.useRef(defaultValueProp);
  const shouldHonorDisabledDefaultValueRef = reactExports.useRef(hasExplicitDefaultValueProp);
  const didRegisterTabsRef = reactExports.useRef(false);
  useIsoLayoutEffect(() => {
    if (isControlled) {
      return;
    }
    function commitAutomaticValueChange(fallbackValue, fallbackReason) {
      setValue(fallbackValue);
      setActivationDirectionState({
        previousValue: fallbackValue,
        tabActivationDirection: "none"
      });
      notifyAutomaticValueChange(fallbackValue, fallbackReason);
      shouldNotifyInitialValueChangeRef.current = false;
    }
    if (tabMap.size === 0) {
      if (didRegisterTabsRef.current && value !== null && !lastKnownTabElementRef.current?.isConnected) {
        commitAutomaticValueChange(null, missing);
      }
      return;
    }
    didRegisterTabsRef.current = true;
    lastKnownTabElementRef.current = tabMap.keys().next().value;
    const selectionIsDisabled = selectedTabMetadata?.disabled;
    const selectionIsMissing = selectedTabMetadata == null && value !== null;
    if (!selectionIsDisabled && value === initialDefaultValueRef.current) {
      shouldHonorDisabledDefaultValueRef.current = false;
    }
    if (shouldHonorDisabledDefaultValueRef.current && selectionIsDisabled && value === initialDefaultValueRef.current) {
      return;
    }
    const shouldNotifyInitialValueChange = shouldNotifyInitialValueChangeRef.current;
    if (selectionIsDisabled || selectionIsMissing) {
      const fallbackValue = firstEnabledTabValue ?? null;
      if (value === fallbackValue) {
        shouldNotifyInitialValueChangeRef.current = false;
        return;
      }
      let fallbackReason = missing;
      if (shouldNotifyInitialValueChange) {
        fallbackReason = initial;
      } else if (selectionIsDisabled) {
        fallbackReason = disabled;
      }
      commitAutomaticValueChange(fallbackValue, fallbackReason);
      return;
    }
    if (shouldNotifyInitialValueChange && selectedTabMetadata != null) {
      notifyAutomaticValueChange(value, initial);
      shouldNotifyInitialValueChangeRef.current = false;
    }
  }, [firstEnabledTabValue, isControlled, notifyAutomaticValueChange, selectedTabMetadata, setValue, tabMap, value]);
  const state = {
    orientation,
    tabActivationDirection
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: tabsStateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TabsRootContext.Provider, {
    value: tabsContextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeList, {
      elementsRef: tabPanelRefs,
      children: element
    })
  });
});
function findTabElement(tabMap, value) {
  for (const [tabElement, tabMetadata] of tabMap.entries()) {
    if (value === tabMetadata.value) {
      return tabElement;
    }
  }
  return null;
}
function computeActivationDirection(oldValue, newValue, orientation, tabMap) {
  if (oldValue == null || newValue == null) {
    return "none";
  }
  const [positionProp, backward, forward] = orientation === "horizontal" ? ["left", "left", "right"] : ["top", "up", "down"];
  const oldTab = findTabElement(tabMap, oldValue);
  const newTab = findTabElement(tabMap, newValue);
  if (oldTab == null || newTab == null) {
    if (oldTab !== newTab && (typeof oldValue === "number" || typeof oldValue === "string") && typeof oldValue === typeof newValue) {
      return newValue > oldValue ? forward : backward;
    }
    return "none";
  }
  const oldPosition = oldTab.getBoundingClientRect()[positionProp];
  const newPosition = newTab.getBoundingClientRect()[positionProp];
  if (newPosition < oldPosition) {
    return backward;
  }
  if (newPosition > oldPosition) {
    return forward;
  }
  return "none";
}
const TabsListContext$1 = /* @__PURE__ */ reactExports.createContext(void 0);
function useTabsListContext() {
  const context = reactExports.useContext(TabsListContext$1);
  if (context === void 0) {
    throw new Error(formatErrorMessage(65));
  }
  return context;
}
const TabsTab$1 = /* @__PURE__ */ reactExports.forwardRef(function TabsTab2(componentProps, forwardedRef) {
  const {
    className,
    disabled: disabled2 = false,
    render,
    value,
    id: idProp,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    value: activeTabValue,
    getTabPanelIdByValue,
    onValueChange,
    orientation,
    tabActivationDirection
  } = useTabsRootContext();
  const {
    activateOnFocus,
    registerTabResizeObserverElement,
    tabsListElement
  } = useTabsListContext();
  const {
    highlightedIndex,
    onHighlightedIndexChange
  } = useCompositeRootContext();
  const id = useBaseUiId(idProp);
  const tabMetadata = reactExports.useMemo(() => ({
    disabled: disabled2,
    id,
    value
  }), [disabled2, id, value]);
  const {
    compositeProps,
    compositeRef,
    index
    // hook is used instead of the CompositeItem component
    // because the index is needed for Tab internals
  } = useCompositeItem({
    metadata: tabMetadata
  });
  const active = value === activeTabValue;
  const isNavigatingRef = reactExports.useRef(false);
  const unobserveTabElementRef = reactExports.useRef(null);
  const observeTabElement = useStableCallback((element2) => {
    unobserveTabElementRef.current?.();
    unobserveTabElementRef.current = element2 ? registerTabResizeObserverElement(element2) : null;
  });
  useIsoLayoutEffect(() => {
    if (isNavigatingRef.current) {
      isNavigatingRef.current = false;
      return;
    }
    if (!(active && index > -1 && highlightedIndex !== index)) {
      return;
    }
    const listElement = tabsListElement;
    if (listElement != null) {
      const activeEl = activeElement(ownerDocument(listElement));
      if (activeEl && contains(listElement, activeEl)) {
        return;
      }
    }
    if (!disabled2) {
      onHighlightedIndexChange(index);
    }
  }, [active, index, highlightedIndex, onHighlightedIndexChange, disabled2, tabsListElement]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled: disabled2,
    native: nativeButton,
    focusableWhenDisabled: true
  });
  const tabPanelId = getTabPanelIdByValue(value);
  const isPressingRef = reactExports.useRef(false);
  const isMainButtonRef = reactExports.useRef(false);
  function activate(event) {
    onValueChange(value, createChangeEventDetails(none, event.nativeEvent, void 0, {
      activationDirection: "none"
    }));
  }
  function onClick(event) {
    if (active || disabled2) {
      return;
    }
    activate(event);
  }
  function onFocus(event) {
    if (active || disabled2) {
      return;
    }
    if (activateOnFocus && (!isPressingRef.current || // keyboard or touch focus
    isMainButtonRef.current)) {
      activate(event);
    }
  }
  function onPointerDown(event) {
    if (active || disabled2) {
      return;
    }
    isPressingRef.current = true;
    isMainButtonRef.current = event.button === 0;
    const doc = ownerDocument(event.currentTarget);
    function handlePointerEnd() {
      isPressingRef.current = false;
      isMainButtonRef.current = false;
      doc.removeEventListener("pointerup", handlePointerEnd);
      doc.removeEventListener("pointercancel", handlePointerEnd);
    }
    doc.addEventListener("pointerup", handlePointerEnd);
    doc.addEventListener("pointercancel", handlePointerEnd);
  }
  const state = {
    disabled: disabled2,
    active,
    orientation,
    tabActivationDirection
  };
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef, compositeRef, observeTabElement],
    props: [compositeProps, {
      role: "tab",
      "aria-controls": tabPanelId,
      "aria-selected": active,
      id,
      onClick,
      onFocus,
      onPointerDown,
      [ACTIVE_COMPOSITE_ITEM]: active ? "" : void 0,
      onKeyDownCapture() {
        isNavigatingRef.current = true;
      }
    }, elementProps, getButtonProps],
    stateAttributesMapping: tabsStateAttributesMapping
  });
  return element;
});
var _PrehydrationScript;
const stateAttributesMapping$1 = {
  ...tabsStateAttributesMapping,
  activeTabPosition: () => null,
  activeTabSize: () => null
};
const TabsIndicator = /* @__PURE__ */ reactExports.forwardRef(function TabsIndicator2(componentProps, forwardedRef) {
  const {
    className,
    render,
    renderBeforeHydration = false,
    style: styleProp,
    ...elementProps
  } = componentProps;
  const {
    getTabElementBySelectedValue,
    orientation,
    tabActivationDirection,
    value
  } = useTabsRootContext();
  const {
    tabsListElement,
    registerIndicatorUpdateListener
  } = useTabsListContext();
  const rerender = useForcedRerendering();
  reactExports.useEffect(() => {
    return registerIndicatorUpdateListener(rerender);
  }, [registerIndicatorUpdateListener, rerender]);
  let left = 0;
  let right = 0;
  let top = 0;
  let bottom = 0;
  let width = 0;
  let height = 0;
  let isTabSelected = false;
  if (value != null && tabsListElement != null) {
    const activeTab = getTabElementBySelectedValue(value);
    if (activeTab != null) {
      isTabSelected = true;
      const {
        width: computedWidth,
        height: computedHeight
      } = getCssDimensions(activeTab);
      const {
        width: tabListWidth,
        height: tabListHeight
      } = getCssDimensions(tabsListElement);
      const tabRect = activeTab.getBoundingClientRect();
      const tabsListRect = tabsListElement.getBoundingClientRect();
      const scaleX = tabListWidth > 0 ? tabsListRect.width / tabListWidth : 1;
      const scaleY = tabListHeight > 0 ? tabsListRect.height / tabListHeight : 1;
      const hasNonZeroScale = scaleX > Number.EPSILON && scaleY > Number.EPSILON;
      if (hasNonZeroScale) {
        const tabLeftDelta = tabRect.left - tabsListRect.left;
        const tabTopDelta = tabRect.top - tabsListRect.top;
        left = tabLeftDelta / scaleX + tabsListElement.scrollLeft - tabsListElement.clientLeft;
        top = tabTopDelta / scaleY + tabsListElement.scrollTop - tabsListElement.clientTop;
      } else {
        left = activeTab.offsetLeft;
        top = activeTab.offsetTop;
      }
      width = computedWidth;
      height = computedHeight;
      right = tabsListElement.scrollWidth - left - width;
      bottom = tabsListElement.scrollHeight - top - height;
    }
  }
  const activeTabPosition = isTabSelected ? {
    left,
    right,
    top,
    bottom
  } : null;
  const activeTabSize = isTabSelected ? {
    width,
    height
  } : null;
  const style = isTabSelected ? {
    "--active-tab-left": `${left}px`,
    "--active-tab-right": `${right}px`,
    "--active-tab-top": `${top}px`,
    "--active-tab-bottom": `${bottom}px`,
    "--active-tab-width": `${width}px`,
    "--active-tab-height": `${height}px`
  } : void 0;
  const displayIndicator = isTabSelected && width > 0 && height > 0;
  const state = {
    orientation,
    activeTabPosition,
    activeTabSize,
    tabActivationDirection
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "presentation",
      style,
      hidden: !displayIndicator
      // do not display the indicator before the layout is settled
    }, elementProps, {
      suppressHydrationWarning: true
    }],
    stateAttributesMapping: stateAttributesMapping$1
  });
  if (value == null) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [element, renderBeforeHydration && (_PrehydrationScript || (_PrehydrationScript = /* @__PURE__ */ jsxRuntimeExports.jsx(PrehydrationScript, {
      script
    })))]
  });
});
const stateAttributesMapping = {
  ...tabsStateAttributesMapping,
  ...transitionStatusMapping
};
const TabsPanel$1 = /* @__PURE__ */ reactExports.forwardRef(function TabsPanel2(componentProps, forwardedRef) {
  const {
    className,
    value,
    render,
    keepMounted = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    value: selectedValue,
    getTabIdByPanelValue,
    orientation,
    tabActivationDirection,
    registerMountedTabPanel
  } = useTabsRootContext();
  const id = useBaseUiId();
  const {
    ref: listItemRef,
    index
  } = useCompositeListItem();
  const open = value === selectedValue;
  const {
    mounted,
    transitionStatus,
    setMounted
  } = useTransitionStatus(open);
  const hidden = !mounted;
  const correspondingTabId = getTabIdByPanelValue(value);
  const state = {
    hidden,
    orientation,
    tabActivationDirection,
    transitionStatus
  };
  const panelRef = reactExports.useRef(null);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, listItemRef, panelRef],
    props: [{
      "aria-labelledby": correspondingTabId,
      hidden,
      id,
      role: "tabpanel",
      tabIndex: open ? 0 : -1,
      inert: inertValue(!open),
      // Computed key: a plain literal key fails the DOM-props excess property check.
      ["data-index"]: index
    }, elementProps],
    stateAttributesMapping
  });
  useOpenChangeComplete({
    open,
    ref: panelRef,
    onComplete() {
      if (!open) {
        setMounted(false);
      }
    }
  });
  useIsoLayoutEffect(() => {
    if (id == null || hidden && !keepMounted) {
      return void 0;
    }
    return registerMountedTabPanel(value, id);
  }, [hidden, keepMounted, value, id, registerMountedTabPanel]);
  const shouldRender = keepMounted || mounted;
  if (!shouldRender) {
    return null;
  }
  return element;
});
const TabsList$1 = /* @__PURE__ */ reactExports.forwardRef(function TabsList2(componentProps, forwardedRef) {
  const {
    activateOnFocus = false,
    className,
    loopFocus = true,
    render,
    style,
    ...elementProps
  } = componentProps;
  const {
    orientation,
    setTabMap,
    tabActivationDirection
  } = useTabsRootContext();
  const [highlightedTabIndex, setHighlightedTabIndex] = reactExports.useState(0);
  const [tabsListElement, setTabsListElement] = reactExports.useState(null);
  const indicatorUpdateListenersRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const tabResizeObserverElementsRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const resizeObserverRef = reactExports.useRef(null);
  useIsoLayoutEffect(() => {
    if (typeof ResizeObserver === "undefined") {
      return void 0;
    }
    const resizeObserver = new ResizeObserver(() => {
      indicatorUpdateListenersRef.current.forEach((listener) => {
        listener();
      });
    });
    resizeObserverRef.current = resizeObserver;
    if (tabsListElement) {
      resizeObserver.observe(tabsListElement);
    }
    tabResizeObserverElementsRef.current.forEach((element) => {
      resizeObserver.observe(element);
    });
    return () => {
      resizeObserver.disconnect();
      resizeObserverRef.current = null;
    };
  }, [tabsListElement]);
  const registerIndicatorUpdateListener = useStableCallback((listener) => {
    indicatorUpdateListenersRef.current.add(listener);
    return () => {
      indicatorUpdateListenersRef.current.delete(listener);
    };
  });
  const registerTabResizeObserverElement = useStableCallback((element) => {
    tabResizeObserverElementsRef.current.add(element);
    resizeObserverRef.current?.observe(element);
    return () => {
      tabResizeObserverElementsRef.current.delete(element);
      resizeObserverRef.current?.unobserve(element);
    };
  });
  const state = {
    orientation,
    tabActivationDirection
  };
  const defaultProps = {
    "aria-orientation": orientation === "vertical" ? "vertical" : void 0,
    role: "tablist"
  };
  const tabsListContextValue = reactExports.useMemo(() => ({
    activateOnFocus,
    registerIndicatorUpdateListener,
    registerTabResizeObserverElement,
    tabsListElement
  }), [activateOnFocus, registerIndicatorUpdateListener, registerTabResizeObserverElement, tabsListElement]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TabsListContext$1.Provider, {
    value: tabsListContextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef, setTabsListElement],
      props: [defaultProps, elementProps],
      stateAttributesMapping: tabsStateAttributesMapping,
      highlightedIndex: highlightedTabIndex,
      enableHomeAndEndKeys: true,
      loopFocus,
      orientation,
      onHighlightedIndexChange: setHighlightedTabIndex,
      onMapChange: setTabMap,
      disabledIndices: EMPTY_ARRAY
    })
  });
});
const TabsListContext = reactExports.createContext("default");
function Tabs({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TabsRoot,
    {
      className: cn(
        "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
        className
      ),
      "data-slot": "tabs",
      ...props
    }
  );
}
function TabsList({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    TabsList$1,
    {
      className: cn(
        "relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-muted-foreground",
        "data-[orientation=vertical]:flex-col",
        variant === "default" ? "rounded-lg bg-muted p-0.5 text-muted-foreground/72" : "data-[orientation=vertical]:px-1 data-[orientation=horizontal]:py-1 *:data-[slot=tabs-tab]:hover:bg-accent",
        className
      ),
      "data-size": size,
      "data-slot": "tabs-list",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsListContext.Provider, { value: size, children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          TabsIndicator,
          {
            className: cn(
              // Positioned from the top: Base UI derives --active-tab-bottom from the
              // list's scrollHeight, which the coarse-pointer hit area inflates.
              "absolute top-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) translate-y-(--active-tab-top) transition-[width,translate] duration-200 ease-in-out",
              variant === "underline" ? "z-10 bg-primary data-[orientation=horizontal]:top-auto data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-px data-[orientation=horizontal]:translate-y-px" : "-z-1 rounded-md bg-background shadow-sm/5 dark:bg-input"
            ),
            "data-slot": "tab-indicator"
          }
        )
      ]
    }
  );
}
function TabsTab({
  className,
  size,
  ...props
}) {
  const contextSize = reactExports.useContext(TabsListContext);
  const resolvedSize = size ?? contextSize;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TabsTab$1,
    {
      className: cn(
        "touch-target relative flex shrink-0 grow cursor-pointer items-center justify-center whitespace-nowrap rounded-md border border-transparent font-medium text-base outline-none transition-[color,background-color,box-shadow] hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start data-active:text-foreground data-disabled:opacity-64 sm:text-sm",
        segmentedControlItemLayoutClassName,
        segmentedControlItemSizeClassNames[resolvedSize],
        className
      ),
      "data-size": resolvedSize,
      "data-slot": "tabs-tab",
      ...props
    }
  );
}
function TabsPanel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TabsPanel$1,
    {
      className: cn("flex-1 outline-none", className),
      "data-slot": "tabs-content",
      ...props
    }
  );
}
export {
  Tabs as T,
  TabsList as a,
  TabsTab as b,
  TabsPanel as c
};
