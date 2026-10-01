import { r as reactExports, df as useDialogRootContext, Y as useRenderElement, db as popupTransitionStateMapping, cf as DialogClose, ce as DialogDescription, dg as CommonPopupDataAttributes, V as formatErrorMessage, X as useStableCallback, an as ownerDocument, a3 as useIsoLayoutEffect, b2 as clamp, dh as useDialogPortalContext, ad as useOpenChangeComplete, aG as EMPTY_OBJECT, aF as FOCUSABLE_POPUP_PROPS, bc as COMPOSITE_KEYS, j as jsxRuntimeExports, b6 as FloatingFocusManager, ag as DialogPortal, W as useControlled, aJ as createChangeEventDetails, aK as none, cc as useRenderDialogRoot, bI as android, b0 as getWindow, b4 as addEventListener, di as closeWatcher, cd as DialogTitle, ak as DialogTrigger, a$ as useAnimationFrame, c9 as TransitionStatusDataAttributes, dj as useSwipeDismiss, aj as DialogViewport, a9 as mergeProps, bm as activeElement, aN as contains, bJ as isElement, dk as swipe, dl as getDisplacement, dm as getElementAtPoint, bN as reactDomExports, am as getTarget, dn as findScrollableTouchTarget, dp as BASE_UI_SWIPE_IGNORE_SELECTOR, q as useUILocale, bp as X, B as Button, e as cn, a8 as useRender, bq as ScrollArea, C as Check } from "./index-DM02Iz28.js";
import { R as RadioGroup, a as RadioRoot } from "./RadioGroup-BEp5uKmZ.js";
import { C as CheckboxRoot, a as CheckboxIndicator } from "./CheckboxIndicator-CqP__vRN.js";
import { R as RadioIndicator } from "./RadioIndicator-BxMi2w3T.js";
let DrawerPopupCssVars = /* @__PURE__ */ (function(DrawerPopupCssVars2) {
  DrawerPopupCssVars2["nestedDrawers"] = "--nested-drawers";
  DrawerPopupCssVars2["height"] = "--drawer-height";
  DrawerPopupCssVars2["frontmostHeight"] = "--drawer-frontmost-height";
  DrawerPopupCssVars2["swipeMovementX"] = "--drawer-swipe-movement-x";
  DrawerPopupCssVars2["swipeMovementY"] = "--drawer-swipe-movement-y";
  DrawerPopupCssVars2["snapPointOffset"] = "--drawer-snap-point-offset";
  DrawerPopupCssVars2["swipeStrength"] = "--drawer-swipe-strength";
  return DrawerPopupCssVars2;
})({});
let DrawerBackdropCssVars = /* @__PURE__ */ (function(DrawerBackdropCssVars2) {
  DrawerBackdropCssVars2["swipeProgress"] = "--drawer-swipe-progress";
  return DrawerBackdropCssVars2;
})({});
const DrawerBackdrop$1 = /* @__PURE__ */ reactExports.forwardRef(function DrawerBackdrop2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    forceRender = false,
    ...elementProps
  } = componentProps;
  const store = useDialogRootContext();
  const open = store.useState("open");
  const nested = store.useState("nested");
  const mounted = store.useState("mounted");
  const transitionStatus = store.useState("transitionStatus");
  const state = {
    open,
    transitionStatus
  };
  return useRenderElement("div", componentProps, {
    state,
    ref: [store.context.backdropRef, forwardedRef],
    stateAttributesMapping: popupTransitionStateMapping,
    props: [{
      role: "presentation",
      hidden: !mounted,
      style: {
        pointerEvents: !open ? "none" : void 0,
        userSelect: "none",
        WebkitUserSelect: "none",
        [DrawerBackdropCssVars.swipeProgress]: "0",
        [DrawerPopupCssVars.swipeStrength]: "1"
      }
    }, elementProps],
    enabled: forceRender || !nested
  });
});
const DrawerClose$1 = DialogClose;
const DRAWER_CONTENT_ATTRIBUTE = "data-drawer-content";
const DrawerContent$1 = /* @__PURE__ */ reactExports.forwardRef(function DrawerContent2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  useDialogRootContext();
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      [DRAWER_CONTENT_ATTRIBUTE]: ""
    }, elementProps]
  });
});
const DrawerDescription$1 = DialogDescription;
const DrawerProviderContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useDrawerProviderContext() {
  return reactExports.useContext(DrawerProviderContext);
}
let DrawerPopupDataAttributes = (function(DrawerPopupDataAttributes2) {
  DrawerPopupDataAttributes2[DrawerPopupDataAttributes2["open"] = CommonPopupDataAttributes.open] = "open";
  DrawerPopupDataAttributes2[DrawerPopupDataAttributes2["closed"] = CommonPopupDataAttributes.closed] = "closed";
  DrawerPopupDataAttributes2[DrawerPopupDataAttributes2["startingStyle"] = CommonPopupDataAttributes.startingStyle] = "startingStyle";
  DrawerPopupDataAttributes2[DrawerPopupDataAttributes2["endingStyle"] = CommonPopupDataAttributes.endingStyle] = "endingStyle";
  DrawerPopupDataAttributes2["expanded"] = "data-expanded";
  DrawerPopupDataAttributes2["nestedDrawerOpen"] = "data-nested-drawer-open";
  DrawerPopupDataAttributes2["nestedDrawerSwiping"] = "data-nested-drawer-swiping";
  DrawerPopupDataAttributes2["swipeDismiss"] = "data-swipe-dismiss";
  DrawerPopupDataAttributes2["swipeDirection"] = "data-swipe-direction";
  DrawerPopupDataAttributes2["swiping"] = "data-swiping";
  return DrawerPopupDataAttributes2;
})({});
const DrawerRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useDrawerRootContext(optional) {
  const drawerRootContext = reactExports.useContext(DrawerRootContext);
  if (optional !== true && drawerRootContext === void 0) {
    throw new Error(formatErrorMessage(90));
  }
  return drawerRootContext;
}
function getSnapPointSwipeMovement(baseOffset, movementValue) {
  const nextOffset = baseOffset + movementValue;
  if (nextOffset >= 0) {
    return movementValue;
  }
  return -Math.sqrt(-nextOffset) - baseOffset;
}
function resolveSnapPointValue(snapPoint, viewportHeight, rootFontSize) {
  if (!Number.isFinite(viewportHeight) || viewportHeight <= 0) {
    return null;
  }
  if (typeof snapPoint === "number") {
    if (!Number.isFinite(snapPoint)) {
      return null;
    }
    if (snapPoint <= 1) {
      return clamp(snapPoint, 0, 1) * viewportHeight;
    }
    return snapPoint;
  }
  const trimmed = snapPoint.trim();
  if (trimmed.endsWith("px")) {
    const value = Number.parseFloat(trimmed);
    return Number.isFinite(value) ? value : null;
  }
  if (trimmed.endsWith("rem")) {
    const value = Number.parseFloat(trimmed);
    return Number.isFinite(value) ? value * rootFontSize : null;
  }
  return null;
}
function closestSnapPointIndex(values, target) {
  let closestIndex = -1;
  let closestDistance = Infinity;
  for (let index = 0; index < values.length; index += 1) {
    const distance = Math.abs(values[index] - target);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  }
  return closestIndex;
}
function useDrawerSnapPoints() {
  const store = useDialogRootContext();
  const {
    snapPoints,
    activeSnapPoint,
    setActiveSnapPoint,
    popupHeight
  } = useDrawerRootContext();
  const viewportElement = store.useState("viewportElement");
  const [viewportHeight, setViewportHeight] = reactExports.useState(0);
  const [rootFontSize, setRootFontSize] = reactExports.useState(16);
  const measureViewportHeight = useStableCallback(() => {
    const doc = ownerDocument(viewportElement);
    const html = doc.documentElement;
    setViewportHeight(viewportElement ? viewportElement.offsetHeight : html.clientHeight);
    const fontSize = parseFloat(getComputedStyle(html).fontSize);
    if (Number.isFinite(fontSize)) {
      setRootFontSize(fontSize);
    }
  });
  useIsoLayoutEffect(() => {
    measureViewportHeight();
    if (!viewportElement || typeof ResizeObserver !== "function") {
      return void 0;
    }
    const resizeObserver = new ResizeObserver(measureViewportHeight);
    resizeObserver.observe(viewportElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [measureViewportHeight, viewportElement]);
  const resolvedSnapPoints = reactExports.useMemo(() => {
    if (!snapPoints || snapPoints.length === 0 || viewportHeight <= 0 || popupHeight <= 0) {
      return [];
    }
    const maxHeight = Math.min(popupHeight, viewportHeight);
    const resolved = snapPoints.map((value) => {
      const resolvedHeight = resolveSnapPointValue(value, viewportHeight, rootFontSize);
      if (resolvedHeight === null) {
        return null;
      }
      const clampedHeight = clamp(resolvedHeight, 0, maxHeight);
      return {
        value,
        height: clampedHeight,
        offset: Math.max(0, popupHeight - clampedHeight)
      };
    }).filter((point) => Boolean(point));
    if (resolved.length <= 1) {
      return resolved;
    }
    const deduped = [];
    const seenHeights = [];
    for (let index = resolved.length - 1; index >= 0; index -= 1) {
      const point = resolved[index];
      const isDuplicate = seenHeights.some((height) => Math.abs(height - point.height) <= 1);
      if (isDuplicate) {
        continue;
      }
      seenHeights.push(point.height);
      deduped.push(point);
    }
    deduped.reverse();
    return deduped;
  }, [popupHeight, rootFontSize, snapPoints, viewportHeight]);
  const resolvedActiveSnapPoint = reactExports.useMemo(() => {
    if (activeSnapPoint === null) {
      return void 0;
    }
    const exactMatch = resolvedSnapPoints.find((point) => Object.is(point.value, activeSnapPoint));
    if (exactMatch) {
      return exactMatch;
    }
    const maxHeight = Math.min(popupHeight, viewportHeight);
    const resolvedHeight = resolveSnapPointValue(activeSnapPoint, viewportHeight, rootFontSize);
    if (resolvedHeight === null) {
      return void 0;
    }
    const clampedHeight = clamp(resolvedHeight, 0, maxHeight);
    return resolvedSnapPoints[closestSnapPointIndex(resolvedSnapPoints.map((point) => point.height), clampedHeight)];
  }, [activeSnapPoint, popupHeight, resolvedSnapPoints, rootFontSize, viewportHeight]);
  return {
    snapPoints,
    activeSnapPoint,
    setActiveSnapPoint,
    popupHeight,
    viewportHeight,
    resolvedSnapPoints,
    activeSnapPointOffset: resolvedActiveSnapPoint?.offset ?? null
  };
}
const DrawerViewportContext = /* @__PURE__ */ reactExports.createContext(null);
function useDrawerViewportContext() {
  return reactExports.useContext(DrawerViewportContext);
}
let drawerSwipeVarsRegistered = false;
function removeCSSVariableInheritance() {
  if (drawerSwipeVarsRegistered) {
    return;
  }
  if (typeof CSS !== "undefined" && "registerProperty" in CSS) {
    [DrawerPopupCssVars.swipeMovementX, DrawerPopupCssVars.swipeMovementY, DrawerPopupCssVars.snapPointOffset].forEach((name) => {
      try {
        CSS.registerProperty({
          name,
          syntax: "<length>",
          inherits: false,
          initialValue: "0px"
        });
      } catch {
      }
    });
    [{
      name: DrawerBackdropCssVars.swipeProgress,
      initialValue: "0"
    }, {
      name: DrawerPopupCssVars.swipeStrength,
      initialValue: "1"
    }].forEach(({
      name,
      initialValue
    }) => {
      try {
        CSS.registerProperty({
          name,
          syntax: "<number>",
          inherits: false,
          initialValue
        });
      } catch {
      }
    });
  }
  drawerSwipeVarsRegistered = true;
}
const stateAttributesMapping = {
  ...popupTransitionStateMapping,
  expanded(value) {
    return value ? {
      [DrawerPopupDataAttributes.expanded]: ""
    } : null;
  },
  nestedDrawerOpen(value) {
    return value ? {
      [DrawerPopupDataAttributes.nestedDrawerOpen]: ""
    } : null;
  },
  nestedDrawerSwiping(value) {
    return value ? {
      [DrawerPopupDataAttributes.nestedDrawerSwiping]: ""
    } : null;
  },
  swipeDirection(value) {
    return {
      [DrawerPopupDataAttributes.swipeDirection]: value
    };
  },
  swiping(value) {
    return value ? {
      [DrawerPopupDataAttributes.swiping]: ""
    } : null;
  }
};
const DrawerPopup$1 = /* @__PURE__ */ reactExports.forwardRef(function DrawerPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    finalFocus,
    initialFocus,
    ...elementProps
  } = componentProps;
  const store = useDialogRootContext();
  const popupRef = store.context.popupRef;
  const {
    swipeDirection,
    frontmostHeight,
    hasNestedDrawer,
    nestedSwiping,
    nestedSwipeProgressStore,
    onPopupHeightChange,
    notifyParentFrontmostHeight,
    notifyParentHasNestedDrawer
  } = useDrawerRootContext();
  const descriptionElementId = store.useState("descriptionElementId");
  const disablePointerDismissal = store.useState("disablePointerDismissal");
  const floatingRootContext = store.useState("floatingRootContext");
  const rootPopupProps = store.useState("popupProps");
  const modal = store.useState("modal");
  const mounted = store.useState("mounted");
  const nested = store.useState("nested");
  const nestedOpenDrawerCount = store.useState("nestedOpenDrawerCount");
  const transitionStatus = store.useState("transitionStatus");
  const open = store.useState("open");
  const openMethod = store.useState("openMethod");
  const titleElementId = store.useState("titleElementId");
  const role = store.useState("role");
  const floatingId = floatingRootContext.useState("floatingId");
  const popupId = elementProps.id ?? floatingId;
  const swipe2 = useDrawerViewportContext();
  useDialogPortalContext();
  const {
    snapPoints,
    activeSnapPoint,
    activeSnapPointOffset
  } = useDrawerSnapPoints();
  const nestedDrawerOpen = nestedOpenDrawerCount > 0;
  const swiping = swipe2?.swiping ?? false;
  const swipeStrength = swipe2?.swipeStrength ?? null;
  const [popupHeight, setPopupHeight] = reactExports.useState(0);
  const popupHeightRef = reactExports.useRef(0);
  const measureHeight = useStableCallback(() => {
    const popupElement = popupRef.current;
    if (!popupElement) {
      return;
    }
    const offsetHeight = popupElement.offsetHeight;
    if (popupHeightRef.current > 0 && frontmostHeight > popupHeightRef.current && offsetHeight > popupHeightRef.current) {
      return;
    }
    const keepHeightWhileNested = popupHeightRef.current > 0 && hasNestedDrawer;
    if (keepHeightWhileNested) {
      const oldHeight = popupHeightRef.current;
      setPopupHeight(oldHeight);
      onPopupHeightChange(oldHeight);
      return;
    }
    const nextHeight = offsetHeight;
    if (nextHeight === popupHeightRef.current) {
      return;
    }
    popupHeightRef.current = nextHeight;
    setPopupHeight(nextHeight);
    onPopupHeightChange(nextHeight);
  });
  useIsoLayoutEffect(() => {
    if (!mounted) {
      popupHeightRef.current = 0;
      setPopupHeight(0);
      onPopupHeightChange(0);
      return void 0;
    }
    const popupElement = popupRef.current;
    if (!popupElement) {
      return void 0;
    }
    removeCSSVariableInheritance();
    measureHeight();
    if (typeof ResizeObserver !== "function") {
      return void 0;
    }
    const resizeObserver = new ResizeObserver(measureHeight);
    resizeObserver.observe(popupElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [measureHeight, mounted, nestedDrawerOpen, onPopupHeightChange, popupRef]);
  useIsoLayoutEffect(() => {
    const syncNestedSwipeProgress = () => {
      const popupElement2 = popupRef.current;
      if (!popupElement2) {
        return;
      }
      const progress = nestedSwipeProgressStore.getSnapshot();
      if (progress > 0) {
        popupElement2.style.setProperty(DrawerBackdropCssVars.swipeProgress, `${progress}`);
      } else {
        popupElement2.style.setProperty(DrawerBackdropCssVars.swipeProgress, "0");
      }
    };
    syncNestedSwipeProgress();
    const unsubscribe = nestedSwipeProgressStore.subscribe(syncNestedSwipeProgress);
    const popupElement = popupRef.current;
    return () => {
      unsubscribe();
      if (popupElement) {
        popupElement.style.setProperty(DrawerBackdropCssVars.swipeProgress, "0");
      }
    };
  }, [nestedSwipeProgressStore, popupRef]);
  useIsoLayoutEffect(() => {
    if (!open) {
      return void 0;
    }
    notifyParentFrontmostHeight?.(frontmostHeight);
    return () => {
      notifyParentFrontmostHeight?.(0);
    };
  }, [frontmostHeight, open, notifyParentFrontmostHeight]);
  useIsoLayoutEffect(() => {
    if (!notifyParentHasNestedDrawer) {
      return void 0;
    }
    const present = open || transitionStatus === "ending";
    notifyParentHasNestedDrawer(present);
    return () => {
      notifyParentHasNestedDrawer(false);
    };
  }, [notifyParentHasNestedDrawer, open, transitionStatus]);
  useOpenChangeComplete({
    open,
    ref: popupRef,
    onComplete() {
      if (open) {
        store.context.onOpenChangeComplete?.(true);
      }
    }
  });
  const resolvedInitialFocus = initialFocus === void 0 ? popupRef : initialFocus;
  const setPopupElement = store.useStateSetter("popupElement");
  const state = {
    open,
    nested,
    transitionStatus,
    expanded: activeSnapPoint === 1,
    nestedDrawerOpen,
    nestedDrawerSwiping: nestedSwiping,
    swipeDirection,
    swiping
  };
  let popupHeightCssVarValue;
  const shouldUseAutoHeight = !hasNestedDrawer && transitionStatus !== "ending";
  if (popupHeight && !shouldUseAutoHeight) {
    popupHeightCssVarValue = `${popupHeight}px`;
  }
  const shouldApplySnapPoints = snapPoints && snapPoints.length > 0 && (swipeDirection === "down" || swipeDirection === "up");
  let snapPointOffsetValue = null;
  if (shouldApplySnapPoints && activeSnapPointOffset !== null) {
    snapPointOffsetValue = swipeDirection === "up" ? -activeSnapPointOffset : activeSnapPointOffset;
  }
  let dragStyles = swipe2 ? swipe2.getDragStyles() : EMPTY_OBJECT;
  if (shouldApplySnapPoints && swipeDirection === "down") {
    const baseOffset = activeSnapPointOffset ?? 0;
    const movementValue = Number.parseFloat(String(dragStyles[DrawerPopupCssVars.swipeMovementY]));
    if (swiping && Number.isFinite(movementValue)) {
      dragStyles = {
        ...dragStyles,
        transform: void 0,
        [DrawerPopupCssVars.swipeMovementY]: `${getSnapPointSwipeMovement(baseOffset, movementValue)}px`
      };
    } else {
      dragStyles = {
        ...dragStyles,
        transform: void 0
      };
    }
  }
  const element = useRenderElement("div", componentProps, {
    state,
    props: [rootPopupProps, {
      id: popupId,
      "aria-labelledby": titleElementId,
      "aria-describedby": descriptionElementId,
      role,
      ...FOCUSABLE_POPUP_PROPS,
      hidden: !mounted,
      onKeyDown(event) {
        if (COMPOSITE_KEYS.has(event.key)) {
          event.stopPropagation();
        }
      },
      style: {
        ...dragStyles,
        [DrawerBackdropCssVars.swipeProgress]: "0",
        [DrawerPopupCssVars.nestedDrawers]: nestedOpenDrawerCount,
        [DrawerPopupCssVars.height]: popupHeightCssVarValue,
        [DrawerPopupCssVars.snapPointOffset]: typeof snapPointOffsetValue === "number" ? `${snapPointOffsetValue}px` : "0px",
        [DrawerPopupCssVars.frontmostHeight]: frontmostHeight ? `${frontmostHeight}px` : void 0,
        [DrawerPopupCssVars.swipeStrength]: typeof swipeStrength === "number" && Number.isFinite(swipeStrength) && swipeStrength > 0 ? `${swipeStrength}` : "1"
      }
    }, elementProps],
    ref: [forwardedRef, popupRef, setPopupElement],
    stateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingFocusManager, {
    context: floatingRootContext,
    openInteractionType: openMethod,
    disabled: !mounted,
    closeOnFocusOut: !disablePointerDismissal,
    initialFocus: resolvedInitialFocus,
    returnFocus: finalFocus,
    modal: modal !== false,
    restoreFocus: "popup",
    children: element
  });
});
const DrawerPortal$1 = DialogPortal;
var _DrawerProviderReport, _DrawerProviderReport2;
function DrawerRoot(props) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    disablePointerDismissal = false,
    modal = true,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    swipeDirection = "down",
    snapToSequentialPoints = false,
    snapPoints,
    snapPoint: snapPointProp,
    defaultSnapPoint,
    onSnapPointChange
  } = props;
  const parentDrawerRootContext = useDrawerRootContext(true);
  const notifyParentSwipeProgressChange = parentDrawerRootContext?.onNestedSwipeProgressChange;
  const notifyParentFrontmostHeight = parentDrawerRootContext?.onNestedFrontmostHeightChange;
  const notifyParentSwipingChange = parentDrawerRootContext?.onNestedSwipingChange;
  const notifyParentHasNestedDrawer = parentDrawerRootContext?.onNestedDrawerPresenceChange;
  const [popupHeight, setPopupHeight] = reactExports.useState(0);
  const [frontmostHeight, setFrontmostHeight] = reactExports.useState(0);
  const [hasNestedDrawer, setHasNestedDrawer] = reactExports.useState(false);
  const [nestedSwiping, setNestedSwiping] = reactExports.useState(false);
  const [nestedSwipeProgressStore] = reactExports.useState(createNestedSwipeProgressStore);
  const resolvedDefaultSnapPoint = defaultSnapPoint !== void 0 ? defaultSnapPoint : snapPoints?.[0] ?? null;
  const isSnapPointControlled = snapPointProp !== void 0;
  const [activeSnapPoint, setActiveSnapPointUnwrapped] = useControlled({
    controlled: snapPointProp,
    default: resolvedDefaultSnapPoint,
    name: "Drawer",
    state: "snapPoint"
  });
  const isNestedDrawerOpenRef = reactExports.useRef(false);
  const swipeAreaActiveRef = reactExports.useRef(false);
  const setActiveSnapPoint = useStableCallback((nextSnapPoint, eventDetails) => {
    const resolvedEventDetails = eventDetails ?? createChangeEventDetails(none);
    onSnapPointChange?.(nextSnapPoint, resolvedEventDetails);
    if (resolvedEventDetails.isCanceled) {
      return;
    }
    setActiveSnapPointUnwrapped(nextSnapPoint);
  });
  const resolvedActiveSnapPoint = reactExports.useMemo(() => {
    if (isSnapPointControlled) {
      return activeSnapPoint;
    }
    if (!snapPoints || snapPoints.length === 0) {
      return activeSnapPoint;
    }
    if (activeSnapPoint === null || !snapPoints.some((snapPoint) => Object.is(snapPoint, activeSnapPoint))) {
      return resolvedDefaultSnapPoint;
    }
    return activeSnapPoint;
  }, [activeSnapPoint, isSnapPointControlled, resolvedDefaultSnapPoint, snapPoints]);
  const onPopupHeightChange = useStableCallback((height) => {
    setPopupHeight(height);
    if (!isNestedDrawerOpenRef.current && height > 0) {
      setFrontmostHeight(height);
    }
  });
  const onNestedFrontmostHeightChange = useStableCallback((height) => {
    if (height > 0) {
      isNestedDrawerOpenRef.current = true;
      setFrontmostHeight(height);
      return;
    }
    isNestedDrawerOpenRef.current = false;
    if (popupHeight > 0) {
      setFrontmostHeight(popupHeight);
    }
  });
  const onNestedDrawerPresenceChange = useStableCallback((present) => {
    setHasNestedDrawer(present);
  });
  const onNestedSwipeProgressChange = useStableCallback((progress) => {
    nestedSwipeProgressStore.set(progress);
    notifyParentSwipeProgressChange?.(progress);
  });
  const onNestedSwipingChange = useStableCallback((swiping) => {
    setNestedSwiping(swiping);
    notifyParentSwipingChange?.(swiping);
  });
  const handleOpenChange = useStableCallback((nextOpen, eventDetails) => {
    onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    if (!nextOpen && snapPoints && snapPoints.length > 0) {
      setActiveSnapPoint(resolvedDefaultSnapPoint, createChangeEventDetails(eventDetails.reason, eventDetails.event, eventDetails.trigger));
    }
  });
  const contextValue = reactExports.useMemo(() => ({
    swipeDirection,
    swipeAreaActiveRef,
    snapToSequentialPoints,
    snapPoints,
    activeSnapPoint: resolvedActiveSnapPoint,
    setActiveSnapPoint,
    frontmostHeight,
    popupHeight,
    hasNestedDrawer,
    nestedSwiping,
    nestedSwipeProgressStore,
    onNestedDrawerPresenceChange,
    onPopupHeightChange,
    onNestedFrontmostHeightChange,
    onNestedSwipingChange,
    onNestedSwipeProgressChange,
    notifyParentFrontmostHeight,
    notifyParentSwipingChange,
    notifyParentSwipeProgressChange,
    notifyParentHasNestedDrawer
  }), [resolvedActiveSnapPoint, frontmostHeight, hasNestedDrawer, nestedSwiping, nestedSwipeProgressStore, notifyParentHasNestedDrawer, notifyParentSwipeProgressChange, notifyParentSwipingChange, notifyParentFrontmostHeight, onNestedDrawerPresenceChange, onNestedFrontmostHeightChange, onNestedSwipeProgressChange, onNestedSwipingChange, onPopupHeightChange, popupHeight, setActiveSnapPoint, snapPoints, snapToSequentialPoints, swipeAreaActiveRef, swipeDirection]);
  const resolvedChildren = typeof children === "function" ? (payload) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [_DrawerProviderReport || (_DrawerProviderReport = /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerProviderReporter, {})), children(payload)]
  }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [_DrawerProviderReport2 || (_DrawerProviderReport2 = /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerProviderReporter, {})), children]
  });
  const dialog = useRenderDialogRoot("drawer", {
    open: openProp,
    defaultOpen,
    onOpenChange: handleOpenChange,
    onOpenChangeComplete,
    disablePointerDismissal,
    modal,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp,
    children: resolvedChildren
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerRootContext.Provider, {
    value: contextValue,
    children: dialog
  });
}
function createNestedSwipeProgressStore() {
  let progress = 0;
  const listeners = /* @__PURE__ */ new Set();
  return {
    getSnapshot: () => progress,
    set(nextProgress) {
      const resolved = Number.isFinite(nextProgress) ? nextProgress : 0;
      if (resolved === progress) {
        return;
      }
      progress = resolved;
      listeners.forEach((listener) => {
        listener();
      });
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };
}
function DrawerProviderReporter() {
  const providerContext = useDrawerProviderContext();
  const store = useDialogRootContext(false);
  const setDrawerOpen = providerContext?.setDrawerOpen;
  const removeDrawer = providerContext?.removeDrawer;
  const open = store.useState("open");
  const nestedOpenDialogCount = store.useState("nestedOpenDialogCount");
  const popupElement = store.useState("popupElement");
  const isTopmost = nestedOpenDialogCount === 0;
  useIsoLayoutEffect(() => {
    if (!removeDrawer) {
      return void 0;
    }
    return () => {
      removeDrawer(store);
    };
  }, [removeDrawer, store]);
  useIsoLayoutEffect(() => {
    setDrawerOpen?.(store, open);
  }, [open, setDrawerOpen, store]);
  reactExports.useEffect(() => {
    if (!open || !isTopmost || !android) {
      return void 0;
    }
    const win = getWindow(popupElement);
    const CloseWatcherCtor = win.CloseWatcher;
    if (!CloseWatcherCtor) {
      return void 0;
    }
    function handleCloseWatcher(event) {
      if (!store.select("open")) {
        return;
      }
      store.setOpen(false, createChangeEventDetails(closeWatcher, event));
    }
    const closeWatcher$1 = new CloseWatcherCtor();
    const unsubscribe = addEventListener(closeWatcher$1, "close", handleCloseWatcher);
    return () => {
      unsubscribe();
      closeWatcher$1.destroy();
    };
  }, [store, isTopmost, open, popupElement]);
  return null;
}
const DrawerTitle$1 = DialogTitle;
const DrawerTrigger$1 = DialogTrigger;
const DrawerVirtualKeyboardContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useDrawerVirtualKeyboardContext() {
  return reactExports.useContext(DrawerVirtualKeyboardContext);
}
const MIN_SWIPE_THRESHOLD = 10;
const FAST_SWIPE_VELOCITY = 0.5;
const SNAP_VELOCITY_THRESHOLD = 0.5;
const SNAP_VELOCITY_MULTIPLIER = 300;
const MAX_SNAP_VELOCITY = 4;
const MIN_SWIPE_RELEASE_VELOCITY = 0.2;
const MAX_SWIPE_RELEASE_VELOCITY = 4;
const MIN_SWIPE_RELEASE_DURATION_MS = 80;
const MAX_SWIPE_RELEASE_DURATION_MS = 360;
const MIN_SWIPE_RELEASE_SCALAR = 0.1;
const MAX_SWIPE_RELEASE_SCALAR = 1;
const AXIS_LOCK_SLOP = 6;
const AXIS_LOCK_BIAS = 2;
const DRAWER_CONTENT_SELECTOR = `[${DRAWER_CONTENT_ATTRIBUTE}]`;
const DrawerViewport$1 = /* @__PURE__ */ reactExports.forwardRef(function DrawerViewport2(props, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
    ...elementProps
  } = props;
  const store = useDialogRootContext();
  const popupRef = store.context.popupRef;
  const backdropRef = store.context.backdropRef;
  const {
    swipeDirection,
    notifyParentSwipingChange,
    notifyParentSwipeProgressChange,
    frontmostHeight,
    snapToSequentialPoints,
    swipeAreaActiveRef
  } = useDrawerRootContext();
  const providerContext = useDrawerProviderContext();
  const {
    snapPoints,
    resolvedSnapPoints,
    activeSnapPoint,
    activeSnapPointOffset,
    setActiveSnapPoint,
    popupHeight
  } = useDrawerSnapPoints();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const nested = store.useState("nested");
  const nestedOpenDrawerCount = store.useState("nestedOpenDrawerCount");
  const viewportElement = store.useState("viewportElement");
  const popupElementState = store.useState("popupElement");
  const visualStateStore = providerContext?.visualStateStore;
  const nestedDrawerOpen = nestedOpenDrawerCount > 0;
  const scrollAxis = swipeDirection === "left" || swipeDirection === "right" ? "horizontal" : "vertical";
  const isVerticalScrollAxis = scrollAxis === "vertical";
  const crossScrollAxis = isVerticalScrollAxis ? "horizontal" : "vertical";
  const [swipeRelease, setSwipeRelease] = reactExports.useState(null);
  const pendingSwipeCloseSnapPointRef = reactExports.useRef(void 0);
  const resetSwipeRef = reactExports.useRef(null);
  const controlledDismissFrame = useAnimationFrame();
  const swipingRef = reactExports.useRef(false);
  const nestedSwipeActiveRef = reactExports.useRef(false);
  const lastPointerTypeRef = reactExports.useRef("");
  const ignoreNextTouchStartFromPenRef = reactExports.useRef(false);
  const ignoreTouchSwipeRef = reactExports.useRef(false);
  const touchScrollStateRef = reactExports.useRef(null);
  const virtualKeyboard = useDrawerVirtualKeyboardContext();
  const snapPointRange = reactExports.useMemo(() => {
    if (!snapPoints || snapPoints.length < 2 || resolvedSnapPoints.length < 2 || swipeDirection !== "down" && swipeDirection !== "up") {
      return null;
    }
    const offsets = resolvedSnapPoints.map((point) => point.offset).sort((a, b) => a - b);
    const minOffset = offsets[0];
    const nextOffset = offsets[1];
    const range = nextOffset - minOffset;
    return {
      minOffset,
      range
    };
  }, [resolvedSnapPoints, snapPoints, swipeDirection]);
  const snapPointProgress = reactExports.useMemo(() => {
    if (!snapPointRange || activeSnapPointOffset === null) {
      return null;
    }
    return clamp((activeSnapPointOffset - snapPointRange.minOffset) / snapPointRange.range, 0, 1);
  }, [activeSnapPointOffset, snapPointRange]);
  const swipeDirections = reactExports.useMemo(() => {
    if (snapPoints && snapPoints.length > 0 && (swipeDirection === "down" || swipeDirection === "up")) {
      return swipeDirection === "down" ? ["down", "up"] : ["up", "down"];
    }
    return [swipeDirection];
  }, [snapPoints, swipeDirection]);
  const setSwipeDismissed = useStableCallback((dismissed) => {
    popupRef.current?.toggleAttribute(DrawerPopupDataAttributes.swipeDismiss, dismissed);
    backdropRef.current?.toggleAttribute(DrawerPopupDataAttributes.swipeDismiss, dismissed);
  });
  const clearSwipeRelease = useStableCallback(() => {
    setSwipeDismissed(false);
    popupRef.current?.removeAttribute(TransitionStatusDataAttributes.endingStyle);
    setSwipeRelease(null);
  });
  const finishNestedSwipe = useStableCallback(() => {
    if (!nestedSwipeActiveRef.current) {
      return;
    }
    nestedSwipeActiveRef.current = false;
    notifyParentSwipingChange?.(false);
  });
  const applySwipeProgress = useStableCallback((resolvedProgress, shouldTrackProgress, notifyParent) => {
    const isActive = open && !nested && shouldTrackProgress;
    const swipeProgress = isActive ? resolvedProgress : 0;
    const nestedSwipeProgress = open && shouldTrackProgress ? resolvedProgress : 0;
    if (notifyParent && notifyParentSwipeProgressChange) {
      notifyParentSwipeProgressChange(nestedSwipeProgress);
      if (nestedSwipeProgress <= 0) {
        finishNestedSwipe();
      }
    }
    visualStateStore?.set({
      swipeProgress,
      frontmostHeight: swipeProgress > 0 ? frontmostHeight : 0
    });
    const backdropElement = backdropRef.current;
    if (!backdropElement) {
      return;
    }
    const showProgress = isActive && swipeProgress > 0;
    backdropElement.style.setProperty(DrawerBackdropCssVars.swipeProgress, showProgress ? `${swipeProgress}` : "0");
    if (showProgress && frontmostHeight > 0) {
      backdropElement.style.setProperty(DrawerPopupCssVars.height, `${frontmostHeight}px`);
    } else {
      backdropElement.style.removeProperty(DrawerPopupCssVars.height);
    }
  });
  function resolveSwipeRelease(popupElement, direction, deltaX, deltaY, velocityX, velocityY, releaseVelocityX, releaseVelocityY) {
    const size = getBaseSwipeSize(popupElement, direction);
    if (size <= 0) {
      return null;
    }
    const snapPointBaseOffset = (direction === "down" || direction === "up") && snapPoints && snapPoints.length > 0 ? activeSnapPointOffset ?? 0 : 0;
    const translationAlongDirection = snapPointBaseOffset + getDisplacement(direction, deltaX, deltaY);
    const remainingDistance = Math.max(0, size - translationAlongDirection);
    if (remainingDistance <= 0) {
      return null;
    }
    const releaseVelocity = getDisplacement(direction, releaseVelocityX, releaseVelocityY);
    const directionalVelocity = Math.abs(releaseVelocity) > 0 ? releaseVelocity : getDisplacement(direction, velocityX, velocityY);
    if (directionalVelocity <= MIN_SWIPE_RELEASE_VELOCITY) {
      return null;
    }
    const clampedVelocity = clamp(directionalVelocity, MIN_SWIPE_RELEASE_VELOCITY, MAX_SWIPE_RELEASE_VELOCITY);
    const durationMs = clamp(remainingDistance / clampedVelocity, MIN_SWIPE_RELEASE_DURATION_MS, MAX_SWIPE_RELEASE_DURATION_MS);
    const normalizedDuration = (durationMs - MIN_SWIPE_RELEASE_DURATION_MS) / (MAX_SWIPE_RELEASE_DURATION_MS - MIN_SWIPE_RELEASE_DURATION_MS);
    return MIN_SWIPE_RELEASE_SCALAR + normalizedDuration * (MAX_SWIPE_RELEASE_SCALAR - MIN_SWIPE_RELEASE_SCALAR);
  }
  function updateNestedSwipeActive(details) {
    if (nestedSwipeActiveRef.current || !details) {
      return;
    }
    const direction = details.direction ?? swipeDirection;
    const delta = getDisplacement(direction, details.deltaX, details.deltaY);
    if (Math.abs(delta) < MIN_SWIPE_THRESHOLD) {
      return;
    }
    nestedSwipeActiveRef.current = true;
    notifyParentSwipingChange?.(true);
  }
  const swipe$1 = useSwipeDismiss({
    enabled: mounted && !nestedDrawerOpen,
    directions: swipeDirections,
    elementRef: store.context.popupRef,
    ignoreSelectorWhenTouch: false,
    ignoreScrollableAncestors: true,
    movementCssVars: {
      x: DrawerPopupCssVars.swipeMovementX,
      y: DrawerPopupCssVars.swipeMovementY
    },
    onSwipeStart(event) {
      if ("touches" in event || event.pointerType === "touch") {
        return;
      }
      const popupElement = popupRef.current;
      const doc = ownerDocument(popupElement);
      const selection = doc.getSelection?.();
      if (!selection || selection.isCollapsed) {
        return;
      }
      const anchorElement = isElement(selection.anchorNode) ? selection.anchorNode : selection.anchorNode?.parentElement;
      const focusElement = isElement(selection.focusNode) ? selection.focusNode : selection.focusNode?.parentElement;
      if (!contains(popupElement, anchorElement) && !contains(popupElement, focusElement)) {
        return;
      }
      selection.removeAllRanges();
    },
    onSwipingChange(swiping) {
      swipingRef.current = swiping;
      setBackdropSwipingAttribute(store.context.backdropRef.current, swiping);
      if (!swiping && !notifyParentSwipeProgressChange) {
        finishNestedSwipe();
      }
    },
    swipeThreshold({
      element,
      direction
    }) {
      return getBaseSwipeThreshold(element, direction);
    },
    canStart(position, details) {
      const popupElement = store.context.popupRef.current;
      if (!popupElement) {
        return false;
      }
      const doc = popupElement.ownerDocument;
      const elementAtPoint = getElementAtPoint(popupElement.getRootNode(), position.x, position.y);
      if (!elementAtPoint || !contains(popupElement, elementAtPoint)) {
        return false;
      }
      const nativeEvent = details.nativeEvent;
      const touchLike = "touches" in nativeEvent || nativeEvent.pointerType === "touch";
      if (touchLike && shouldIgnoreSwipeForTextSelection(doc, popupElement)) {
        return false;
      }
      return true;
    },
    onProgress(progress, details) {
      updateNestedSwipeActive(details);
      const hasSnapPoints = Boolean(snapPoints && snapPoints.length > 0);
      if (swipingRef.current && swipeDirection === "down" && hasSnapPoints && details) {
        const popupElement = store.context.popupRef.current;
        if (popupElement) {
          popupElement.style.removeProperty("transform");
          popupElement.style.setProperty(DrawerPopupCssVars.swipeMovementY, `${getSnapPointSwipeMovement(activeSnapPointOffset ?? 0, details.deltaY)}px`);
        }
      }
      let resolvedProgress = progress;
      if (snapPointRange && popupHeight > 0) {
        const baseOffset = activeSnapPointOffset ?? snapPointRange.minOffset;
        const offsetToProgress = (nextOffset) => clamp((nextOffset - snapPointRange.minOffset) / snapPointRange.range, 0, 1);
        if (details && Number.isFinite(details.deltaY)) {
          resolvedProgress = offsetToProgress(clamp(baseOffset + details.deltaY, 0, popupHeight));
        } else if (snapPointProgress !== null) {
          resolvedProgress = snapPointProgress;
        }
      }
      applySwipeProgress(resolvedProgress, true, true);
    },
    onRelease({
      event,
      deltaX,
      deltaY,
      direction,
      velocityX,
      velocityY,
      releaseVelocityX,
      releaseVelocityY
    }) {
      const popupElement = store.context.popupRef.current;
      if (!popupElement) {
        clearSwipeRelease();
        return void 0;
      }
      const releasePopupElement = popupElement;
      function startSwipeRelease(resolvedDirection) {
        finishNestedSwipe();
        setSwipeDismissed(true);
        releasePopupElement.style.removeProperty("transition");
        releasePopupElement.setAttribute(TransitionStatusDataAttributes.endingStyle, "");
        reactDomExports.flushSync(() => {
          setSwipeRelease(resolveSwipeRelease(releasePopupElement, resolvedDirection, deltaX, deltaY, velocityX, velocityY, releaseVelocityX, releaseVelocityY));
        });
      }
      if (!snapPoints || snapPoints.length === 0) {
        if (!direction) {
          clearSwipeRelease();
          return void 0;
        }
        const directionalDelta = getDisplacement(direction, deltaX, deltaY);
        if (directionalDelta <= 0) {
          clearSwipeRelease();
          return false;
        }
        if (getDisplacement(direction, velocityX, velocityY) >= FAST_SWIPE_VELOCITY) {
          startSwipeRelease(direction);
          return true;
        }
        const shouldClose = directionalDelta > getBaseSwipeThreshold(releasePopupElement, direction);
        if (shouldClose) {
          startSwipeRelease(direction);
        } else {
          clearSwipeRelease();
        }
        return shouldClose;
      }
      if (swipeDirection !== "down" && swipeDirection !== "up") {
        clearSwipeRelease();
        return void 0;
      }
      if (!popupHeight) {
        clearSwipeRelease();
        return false;
      }
      if (resolvedSnapPoints.length === 0) {
        clearSwipeRelease();
        return void 0;
      }
      const dragDelta = swipeDirection === "down" ? deltaY : -deltaY;
      const dragDirection = Math.sign(dragDelta);
      const releaseDirectionalVelocity = swipeDirection === "down" ? releaseVelocityY : -releaseVelocityY;
      const fallbackDirectionalVelocity = swipeDirection === "down" ? velocityY : -velocityY;
      let resolvedDirectionalVelocity = releaseDirectionalVelocity;
      if (dragDirection !== 0 && Math.abs(dragDelta) >= MIN_SWIPE_THRESHOLD) {
        const velocityDirection = Math.sign(resolvedDirectionalVelocity);
        if (velocityDirection !== 0 && velocityDirection !== dragDirection) {
          resolvedDirectionalVelocity = fallbackDirectionalVelocity;
        }
      }
      const currentOffset = activeSnapPointOffset ?? 0;
      const dragTargetOffset = clamp(currentOffset + dragDelta, 0, popupHeight);
      const velocityOffset = Math.abs(resolvedDirectionalVelocity) >= SNAP_VELOCITY_THRESHOLD ? clamp(resolvedDirectionalVelocity, -MAX_SNAP_VELOCITY, MAX_SNAP_VELOCITY) * SNAP_VELOCITY_MULTIPLIER : 0;
      const targetOffset = snapToSequentialPoints ? dragTargetOffset : clamp(dragTargetOffset + velocityOffset, 0, popupHeight);
      const snapPointEventDetails = createChangeEventDetails(swipe, event);
      const closeFromSnapPoints = () => {
        pendingSwipeCloseSnapPointRef.current = activeSnapPoint;
        setActiveSnapPoint(null, snapPointEventDetails);
        startSwipeRelease(swipeDirection);
        return true;
      };
      if (snapToSequentialPoints) {
        const orderedSnapPoints = [...resolvedSnapPoints].sort((first, second) => first.offset - second.offset);
        const orderedOffsets = orderedSnapPoints.map((point) => point.offset);
        const currentIndex = closestSnapPointIndex(orderedOffsets, currentOffset);
        let targetSnapPoint = orderedSnapPoints[closestSnapPointIndex(orderedOffsets, targetOffset)];
        const velocityDirection = Math.sign(resolvedDirectionalVelocity);
        const shouldAdvance = dragDirection !== 0 && velocityDirection !== 0 && velocityDirection === dragDirection && Math.abs(resolvedDirectionalVelocity) >= SNAP_VELOCITY_THRESHOLD;
        let effectiveTargetOffset = targetOffset;
        if (shouldAdvance) {
          const adjacentIndex = clamp(currentIndex + dragDirection, 0, orderedSnapPoints.length - 1);
          if (adjacentIndex !== currentIndex) {
            const adjacentPoint = orderedSnapPoints[adjacentIndex];
            const shouldForceAdjacent = dragDirection > 0 ? targetOffset < adjacentPoint.offset : targetOffset > adjacentPoint.offset;
            if (shouldForceAdjacent) {
              targetSnapPoint = adjacentPoint;
              effectiveTargetOffset = adjacentPoint.offset;
            }
          } else if (dragDirection > 0) {
            return closeFromSnapPoints();
          }
        }
        const closeDistance2 = Math.abs(effectiveTargetOffset - popupHeight);
        const snapDistance = Math.abs(effectiveTargetOffset - targetSnapPoint.offset);
        if (closeDistance2 < snapDistance) {
          return closeFromSnapPoints();
        }
        setActiveSnapPoint(targetSnapPoint.value, snapPointEventDetails);
        clearSwipeRelease();
        return false;
      }
      if (resolvedDirectionalVelocity >= FAST_SWIPE_VELOCITY && dragDelta > 0) {
        return closeFromSnapPoints();
      }
      const closestSnapPoint = resolvedSnapPoints[closestSnapPointIndex(resolvedSnapPoints.map((point) => point.offset), targetOffset)];
      const closeDistance = Math.abs(targetOffset - popupHeight);
      if (closeDistance < Math.abs(targetOffset - closestSnapPoint.offset)) {
        return closeFromSnapPoints();
      }
      setActiveSnapPoint(closestSnapPoint.value, snapPointEventDetails);
      clearSwipeRelease();
      return false;
    },
    onDismiss(event) {
      visualStateStore?.set({
        swipeProgress: 0,
        frontmostHeight: 0
      });
      const backdropElement = store.context.backdropRef.current;
      if (backdropElement) {
        backdropElement.style.setProperty(DrawerBackdropCssVars.swipeProgress, "0");
        backdropElement.style.removeProperty(DrawerPopupCssVars.height);
      }
      const dismissEventDetails = createChangeEventDetails(swipe, event);
      store.setOpen(false, dismissEventDetails);
      if (dismissEventDetails.isCanceled) {
        const pendingSnapPoint = pendingSwipeCloseSnapPointRef.current;
        if (pendingSnapPoint !== void 0) {
          setActiveSnapPoint(pendingSnapPoint, createChangeEventDetails(swipe, event));
        }
        pendingSwipeCloseSnapPointRef.current = void 0;
        resetSwipeRef.current?.();
        clearSwipeRelease();
        return;
      }
      if (store.select("open")) {
        const savedEvent = event;
        controlledDismissFrame.request(() => {
          if (store.select("open")) {
            const pendingSnapPoint = pendingSwipeCloseSnapPointRef.current;
            if (pendingSnapPoint !== void 0) {
              setActiveSnapPoint(pendingSnapPoint, createChangeEventDetails(swipe, savedEvent));
            }
            pendingSwipeCloseSnapPointRef.current = void 0;
            clearSwipeRelease();
            resetSwipeRef.current?.();
          } else {
            pendingSwipeCloseSnapPointRef.current = void 0;
          }
        });
        return;
      }
      pendingSwipeCloseSnapPointRef.current = void 0;
      setSwipeDismissed(true);
    }
  });
  const swipePointerProps = swipe$1.getPointerProps();
  const swipeTouchProps = swipe$1.getTouchProps();
  const {
    moveNative: moveSwipeNative,
    reset: resetSwipe
  } = swipe$1;
  resetSwipeRef.current = resetSwipe;
  reactExports.useEffect(() => {
    const rootElement = viewportElement ?? popupElementState;
    if (!rootElement) {
      return void 0;
    }
    const resolvedRootElement = rootElement;
    const doc = ownerDocument(resolvedRootElement);
    function processTouchMove(event, touchState, touch) {
      const drawerAxisDelta = isVerticalScrollAxis ? touch.clientY - touchState.lastY : touch.clientX - touchState.lastX;
      if (event.touches.length === 2) {
        return;
      }
      const allowTouchMove = shouldIgnoreSwipeForTextSelection(doc, resolvedRootElement);
      if (allowTouchMove || !open || !mounted || nestedDrawerOpen) {
        return;
      }
      if (shouldYieldTouchMove(touchState, event, touch, isVerticalScrollAxis)) {
        return;
      }
      const scrollTarget = touchState.scrollTarget;
      if (!scrollTarget || scrollTarget === doc.documentElement || scrollTarget === doc.body) {
        if (event.cancelable) {
          event.preventDefault();
        }
        event.stopPropagation();
        moveSwipeNative(event, resolvedRootElement);
        return;
      }
      if (!hasScrollableContentOnAxis(scrollTarget, scrollAxis)) {
        if (event.cancelable) {
          event.preventDefault();
        }
        event.stopPropagation();
        return;
      }
      if (drawerAxisDelta !== 0) {
        const canSwipeFromScrollEdge = canSwipeFromScrollEdgeOnMove(scrollTarget, scrollAxis, swipeDirection, drawerAxisDelta);
        if (!touchState.allowSwipe) {
          if (event.cancelable && canSwipeFromScrollEdge) {
            touchState.allowSwipe = true;
            event.preventDefault();
          } else {
            touchState.allowSwipe = false;
          }
        } else if (event.cancelable) {
          event.preventDefault();
        }
      }
      if (touchState.allowSwipe === true) {
        event.stopPropagation();
        moveSwipeNative(event, resolvedRootElement);
      }
    }
    function handleNativeTouchMove(event) {
      virtualKeyboard?.onTouchMove(event);
      if (ignoreTouchSwipeRef.current) {
        return;
      }
      const touchState = touchScrollStateRef.current;
      const touch = event.touches[0];
      if (!touch || !touchState) {
        return;
      }
      processTouchMove(event, touchState, touch);
      updateTouchScrollPosition(touchState, touch);
    }
    return addEventListener(doc, "touchmove", handleNativeTouchMove, {
      passive: false,
      capture: true
    });
  }, [mounted, nestedDrawerOpen, open, popupElementState, isVerticalScrollAxis, scrollAxis, swipeDirection, moveSwipeNative, viewportElement, virtualKeyboard]);
  useIsoLayoutEffect(() => {
    if (!snapPointRange || swipe$1.swiping) {
      return;
    }
    applySwipeProgress(!open || nested ? 0 : snapPointProgress ?? 0, true, false);
  }, [applySwipeProgress, frontmostHeight, nested, notifyParentSwipeProgressChange, open, snapPointProgress, snapPointRange, swipe$1.swiping, store, visualStateStore]);
  useIsoLayoutEffect(() => {
    if (!notifyParentSwipeProgressChange) {
      return void 0;
    }
    if (!open) {
      notifyParentSwipeProgressChange(0);
    }
    return () => {
      notifyParentSwipeProgressChange(0);
    };
  }, [notifyParentSwipeProgressChange, open]);
  useIsoLayoutEffect(() => {
    if (open) {
      if (!swipeAreaActiveRef.current) {
        resetSwipe();
      }
      clearSwipeRelease();
    }
  }, [clearSwipeRelease, open, resetSwipe, swipeAreaActiveRef]);
  useIsoLayoutEffect(() => {
    const backdropElement = backdropRef.current;
    return () => {
      visualStateStore?.set({
        swipeProgress: 0,
        frontmostHeight: 0
      });
      setBackdropSwipingAttribute(backdropElement, false);
      const currentBackdrop = backdropRef.current;
      if (currentBackdrop !== backdropElement) {
        setBackdropSwipingAttribute(currentBackdrop, false);
      }
      finishNestedSwipe();
    };
  }, [backdropRef, finishNestedSwipe, visualStateStore]);
  const swipeProviderValue = reactExports.useMemo(() => ({
    swiping: swipe$1.swiping,
    getDragStyles: swipe$1.getDragStyles,
    swipeStrength: swipeRelease ?? null,
    setSwipeDismissed
  }), [setSwipeDismissed, swipe$1.getDragStyles, swipe$1.swiping, swipeRelease]);
  function resetTouchSwipeState(ignoreSwipe) {
    ignoreTouchSwipeRef.current = ignoreSwipe;
    touchScrollStateRef.current = null;
  }
  function resetTouchTrackingState() {
    resetTouchSwipeState(false);
    lastPointerTypeRef.current = "";
    ignoreNextTouchStartFromPenRef.current = false;
  }
  function handlePointerEnd(event) {
    lastPointerTypeRef.current = "";
    return event.pointerType !== "touch";
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DialogViewport, {
    ref: forwardedRef,
    className,
    style,
    render,
    ...mergeProps(elementProps, {
      onPointerDown(event) {
        lastPointerTypeRef.current = event.pointerType;
        ignoreNextTouchStartFromPenRef.current = event.pointerType === "pen";
        if (!open || !mounted || nestedDrawerOpen) {
          return;
        }
        const elementAtPoint = getElementAtPoint(event.currentTarget.getRootNode(), event.clientX, event.clientY);
        if (isSwipeIgnoredTarget(elementAtPoint) || isDrawerContentTarget(elementAtPoint)) {
          return;
        }
        if (event.pointerType === "touch") {
          return;
        }
        swipePointerProps.onPointerDown?.(event);
      },
      onPointerMove(event) {
        if (event.pointerType === "touch") {
          return;
        }
        swipePointerProps.onPointerMove?.(event);
      },
      onPointerUp(event) {
        if (handlePointerEnd(event)) {
          swipePointerProps.onPointerUp?.(event);
        }
      },
      onPointerCancel(event) {
        if (handlePointerEnd(event)) {
          swipePointerProps.onPointerCancel?.(event);
        }
      },
      onTouchStart(event) {
        const startedFromPenPointerDown = lastPointerTypeRef.current === "pen" && ignoreNextTouchStartFromPenRef.current;
        if (startedFromPenPointerDown) {
          ignoreNextTouchStartFromPenRef.current = false;
          resetTouchSwipeState(false);
          return;
        }
        if (!open || !mounted || nestedDrawerOpen) {
          resetTouchSwipeState(false);
          return;
        }
        const touch = event.touches[0];
        if (!touch) {
          return;
        }
        if (isReactTouchEventOnRangeInput(event)) {
          resetTouchSwipeState(false);
          return;
        }
        const rootElement = event.currentTarget;
        const elementAtPoint = getElementAtPoint(rootElement.getRootNode(), touch.clientX, touch.clientY);
        const eventTarget = getTarget(event.nativeEvent);
        const target = isElement(eventTarget) ? eventTarget : rootElement;
        if (!contains(rootElement, target)) {
          resetTouchSwipeState(true);
          return;
        }
        virtualKeyboard?.onTouchStart(event);
        if (isSwipeIgnoredTarget(elementAtPoint)) {
          resetTouchSwipeState(true);
          return;
        }
        ignoreTouchSwipeRef.current = false;
        const scrollTarget = findScrollableTouchTarget(target, rootElement, scrollAxis);
        const hasCrossAxisScrollableContent = findScrollableTouchTarget(target, rootElement, crossScrollAxis) != null;
        let allowSwipe = null;
        if (scrollTarget) {
          const canSwipeFromEdge = isAtSwipeStartEdge(scrollTarget, scrollAxis, swipeDirection);
          allowSwipe = canSwipeFromEdge ? null : false;
        }
        touchScrollStateRef.current = {
          startX: touch.clientX,
          startY: touch.clientY,
          lastX: touch.clientX,
          lastY: touch.clientY,
          scrollTarget,
          hasCrossAxisScrollableContent,
          allowSwipe,
          preserveNativeCrossAxisScroll: false,
          drawerAxisAttributed: false
        };
        swipeTouchProps.onTouchStart?.(event);
      },
      onTouchEnd(event) {
        virtualKeyboard?.onTouchEnd(event);
        resetTouchTrackingState();
        swipeTouchProps.onTouchEnd?.(event);
      },
      onTouchCancel(event) {
        virtualKeyboard?.onTouchCancel();
        resetTouchTrackingState();
        swipeTouchProps.onTouchCancel?.(event);
      },
      // Drawer popups use drawer-specific nested state attributes.
      // Suppress DialogViewport's generic nested dialog attribute.
      ["data-nested-dialog-open"]: void 0
    }),
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerViewportContext.Provider, {
      value: swipeProviderValue,
      children
    })
  });
});
function setBackdropSwipingAttribute(backdropElement, swiping) {
  backdropElement?.toggleAttribute(DrawerPopupDataAttributes.swiping, swiping);
}
function isSwipeIgnoredTarget(target) {
  return Boolean(target?.closest(BASE_UI_SWIPE_IGNORE_SELECTOR));
}
function isDrawerContentTarget(target) {
  return Boolean(target?.closest(DRAWER_CONTENT_SELECTOR));
}
function getBaseSwipeSize(element, direction) {
  return direction === "left" || direction === "right" ? element.offsetWidth : element.offsetHeight;
}
function getBaseSwipeThreshold(element, direction) {
  return Math.max(getBaseSwipeSize(element, direction) * 0.5, MIN_SWIPE_THRESHOLD);
}
function isRangeInput(target, win) {
  return target instanceof win.HTMLInputElement && target.type === "range";
}
function isTextSelectionControl(target) {
  return target.tagName === "INPUT" || target.tagName === "TEXTAREA";
}
function hasExpandedSelectionWithinTarget(selection, target) {
  const anchorElement = isElement(selection.anchorNode) ? selection.anchorNode : selection.anchorNode?.parentElement;
  const focusElement = isElement(selection.focusNode) ? selection.focusNode : selection.focusNode?.parentElement;
  return selection.containsNode(target, true) || contains(target, anchorElement) || contains(target, focusElement);
}
function shouldIgnoreSwipeForTextSelection(doc, rootElement) {
  const activeEl = activeElement(doc);
  if (activeEl && contains(rootElement, activeEl) && isTextSelectionControl(activeEl)) {
    const {
      selectionStart,
      selectionEnd
    } = activeEl;
    if (selectionStart != null && selectionEnd != null && selectionStart < selectionEnd) {
      return true;
    }
  }
  const selection = doc.getSelection?.();
  if (!selection || selection.isCollapsed) {
    return false;
  }
  return hasExpandedSelectionWithinTarget(selection, rootElement);
}
function isEventOnRangeInput(event, win) {
  return event.composedPath().some((pathTarget) => isRangeInput(pathTarget, win));
}
function isReactTouchEventOnRangeInput(event) {
  return isEventOnRangeInput(event.nativeEvent, getWindow(event.currentTarget));
}
function updateTouchScrollPosition(touchState, touch) {
  touchState.lastX = touch.clientX;
  touchState.lastY = touch.clientY;
}
function shouldYieldTouchMove(touchState, event, touch, isVerticalScrollAxis) {
  if (touchState.preserveNativeCrossAxisScroll) {
    return true;
  }
  if (touchState.drawerAxisAttributed || touchState.allowSwipe === true || !touchState.hasCrossAxisScrollableContent) {
    return false;
  }
  if (!event.cancelable) {
    touchState.preserveNativeCrossAxisScroll = true;
    return true;
  }
  const drawerAxisGestureDelta = isVerticalScrollAxis ? touch.clientY - touchState.startY : touch.clientX - touchState.startX;
  const crossAxisGestureDelta = isVerticalScrollAxis ? touch.clientX - touchState.startX : touch.clientY - touchState.startY;
  const absDrawerAxisGestureDelta = Math.abs(drawerAxisGestureDelta);
  const absCrossAxisGestureDelta = Math.abs(crossAxisGestureDelta);
  if (absCrossAxisGestureDelta >= AXIS_LOCK_SLOP && absCrossAxisGestureDelta > absDrawerAxisGestureDelta + AXIS_LOCK_BIAS) {
    touchState.preserveNativeCrossAxisScroll = true;
    return true;
  }
  if (absDrawerAxisGestureDelta >= AXIS_LOCK_SLOP) {
    touchState.drawerAxisAttributed = true;
    return false;
  }
  return true;
}
function hasScrollableContentOnAxis(scrollTarget, axis) {
  return getScrollMetrics(scrollTarget, axis).max > 0;
}
function getScrollMetrics(scrollTarget, axis) {
  if (axis === "vertical") {
    const max2 = Math.max(0, scrollTarget.scrollHeight - scrollTarget.clientHeight);
    return {
      offset: scrollTarget.scrollTop,
      max: max2
    };
  }
  const max = Math.max(0, scrollTarget.scrollWidth - scrollTarget.clientWidth);
  return {
    offset: scrollTarget.scrollLeft,
    max
  };
}
function isAtSwipeStartEdge(scrollTarget, axis, direction) {
  const dismissFromStartEdge = shouldDismissFromStartEdge(direction, axis);
  const {
    offset,
    max
  } = getScrollMetrics(scrollTarget, axis);
  return dismissFromStartEdge ? offset <= 0 : offset >= max;
}
function canSwipeFromScrollEdgeOnMove(scrollTarget, axis, direction, delta) {
  const dismissFromStartEdge = shouldDismissFromStartEdge(direction, axis);
  const movingTowardDismiss = dismissFromStartEdge ? delta > 0 : delta < 0;
  if (!movingTowardDismiss) {
    return false;
  }
  return isAtSwipeStartEdge(scrollTarget, axis, direction);
}
function shouldDismissFromStartEdge(direction, axis) {
  return axis === "vertical" ? direction === "down" : direction === "right";
}
const DrawerContext = reactExports.createContext({
  position: "bottom"
});
const directionMap = {
  bottom: "down",
  left: "left",
  right: "right",
  top: "up"
};
function Drawer({
  swipeDirection,
  position = "bottom",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContext.Provider, { value: { position }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    DrawerRoot,
    {
      swipeDirection: swipeDirection ?? directionMap[position],
      ...props
    }
  ) });
}
const DrawerPortal = DrawerPortal$1;
function DrawerTrigger(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger$1, { "data-slot": "drawer-trigger", ...props });
}
function DrawerClose(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose$1, { "data-slot": "drawer-close", ...props });
}
function DrawerBackdrop({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DrawerBackdrop$1,
    {
      className: cn(
        "fixed inset-0 z-50 bg-black/32 opacity-[calc(1-var(--drawer-swipe-progress))] backdrop-blur-sm transition-opacity duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-swiping:duration-0 supports-[-webkit-touch-callout:none]:absolute",
        className
      ),
      "data-slot": "drawer-backdrop",
      ...props
    }
  );
}
function DrawerViewport({
  className,
  position,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DrawerViewport$1,
    {
      className: cn(
        "fixed inset-0 z-50 [--bleed:--spacing(12)] [--inset:0px]",
        "touch-none",
        position === "bottom" && "grid grid-rows-[1fr_auto] pt-12",
        position === "top" && "grid grid-rows-[auto_1fr] pb-12",
        position === "left" && "flex justify-start",
        position === "right" && "flex justify-end",
        variant === "inset" && "px-(--inset) sm:[--inset:--spacing(4)]",
        variant === "inset" && position !== "bottom" && "pt-(--inset)",
        variant === "inset" && position !== "top" && "pb-(--inset)",
        className
      ),
      "data-slot": "drawer-viewport",
      ...props
    }
  );
}
function DrawerPopup({
  className,
  children,
  showCloseButton = false,
  position: positionProp,
  variant = "default",
  showBar = false,
  portalProps,
  closeProps,
  ...props
}) {
  const { messages } = useUILocale();
  const { position: contextPosition } = reactExports.useContext(DrawerContext);
  const position = positionProp ?? contextPosition;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPortal, { ...portalProps, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerBackdrop, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerViewport, { position, variant, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      DrawerPopup$1,
      {
        className: cn(
          "relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[transform,box-shadow,height,background-color] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform [--peek:calc(--spacing(6)-1px)] [--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--shrink:calc(1-var(--scale))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-step:0.05] before:pointer-events-none before:absolute before:inset-0 before:shadow-[0_1px_--theme(--color-black/4%)] after:pointer-events-none after:absolute after:bg-popover data-swiping:select-none data-nested-drawer-open:overflow-hidden data-nested-drawer-open:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(2%*(var(--nested-drawers)-var(--stack-progress))))] data-ending-style:shadow-transparent data-starting-style:shadow-transparent data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] dark:data-nested-drawer-open:bg-[color-mix(in_srgb,var(--popover),var(--color-black)_calc(6%*(var(--nested-drawers)-var(--stack-progress))))] dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
          "touch-none",
          position === "bottom" && "transform-[translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] data-ending-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))] data-starting-style:transform-[translateY(calc(100%+env(safe-area-inset-bottom,0px)+var(--inset)))] row-start-2 -mb-[max(0px,calc(var(--drawer-snap-point-offset,0px)+clamp(0,1,var(--drawer-snap-point-offset,0px)/1px)*var(--drawer-swipe-movement-y,0px)))] border-t pb-[max(0px,calc(env(safe-area-inset-bottom,0px)+var(--drawer-snap-point-offset,0px)+clamp(0,1,var(--drawer-snap-point-offset,0px)/1px)*var(--drawer-swipe-movement-y,0px)))] not-data-starting-style:not-data-ending-style:transition-[transform,box-shadow,height,background-color,margin,padding] after:inset-x-0 after:top-full after:h-(--bleed) has-data-[slot=drawer-bar]:pt-2 data-ending-style:mb-0 data-starting-style:mb-0 data-ending-style:pb-0 data-starting-style:pb-0",
          position === "top" && "data-starting-style:transform-[translateY(calc(-100%-var(--inset)))] data-ending-style:transform-[translateY(calc(-100%-var(--inset)))] transform-[translateY(var(--drawer-swipe-movement-y))] border-b after:inset-x-0 after:bottom-full after:h-(--bleed) has-data-[slot=drawer-bar]:pb-2",
          position === "left" && "data-starting-style:transform-[translateX(calc(-100%-var(--inset)))] data-ending-style:transform-[translateX(calc(-100%-var(--inset)))] transform-[translateX(var(--drawer-swipe-movement-x))] w-[calc(100%-(--spacing(12)))] max-w-md border-e after:inset-y-0 after:end-full after:w-(--bleed) has-data-[slot=drawer-bar]:pe-2",
          position === "right" && "transform-[translateX(var(--drawer-swipe-movement-x))] data-ending-style:transform-[translateX(calc(100%+var(--inset)))] data-starting-style:transform-[translateX(calc(100%+var(--inset)))] col-start-2 w-[calc(100%-(--spacing(12)))] max-w-md border-s after:inset-y-0 after:start-full after:w-(--bleed) has-data-[slot=drawer-bar]:ps-2",
          variant !== "straight" && cn(
            position === "bottom" && "rounded-t-2xl",
            position === "top" && "rounded-b-2xl **:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
            position === "left" && "rounded-e-2xl **:data-[slot=drawer-footer]:rounded-ee-[calc(var(--radius-2xl)-1px)]",
            position === "right" && "rounded-s-2xl **:data-[slot=drawer-footer]:rounded-es-[calc(var(--radius-2xl)-1px)]"
          ),
          variant === "default" && cn(
            position === "bottom" && "before:rounded-t-[calc(var(--radius-2xl)-1px)]",
            position === "top" && "before:rounded-b-[calc(var(--radius-2xl)-1px)]",
            position === "left" && "before:rounded-e-[calc(var(--radius-2xl)-1px)]",
            position === "right" && "before:rounded-s-[calc(var(--radius-2xl)-1px)]"
          ),
          variant === "inset" && "before:hidden sm:rounded-2xl sm:border sm:after:bg-transparent sm:before:rounded-[calc(var(--radius-2xl)-1px)] sm:**:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-2xl)-1px)]",
          variant === "straight" && "[--stack-step:0]",
          (position === "bottom" || position === "top") && "h-(--drawer-height,auto) [--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))))] data-nested-drawer-open:h-(--height)",
          position === "bottom" && "data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))] origin-[50%_calc(100%-var(--inset))]",
          position === "top" && "data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--shrink)*var(--height))))_scale(var(--scale))] origin-[50%_var(--inset)]",
          position === "left" && "data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)))_scale(var(--scale))] origin-right",
          position === "right" && "data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)))_scale(var(--scale))] origin-left",
          className
        ),
        "data-slot": "drawer-popup",
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(
            DrawerClose$1,
            {
              "aria-label": messages.close,
              className: "absolute end-2 top-2 z-1",
              render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost" }),
              ...closeProps,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {})
            }
          ),
          showBar && /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerBar, {})
        ]
      }
    ) })
  ] });
}
function DrawerHeader({
  className,
  allowSelection = false,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex flex-col gap-2 p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pb-3 max-sm:pb-4",
      !allowSelection && "cursor-default",
      className
    ),
    "data-slot": "drawer-header"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render: allowSelection ? /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { render }) : render
  });
}
function DrawerFooter({
  className,
  variant = "default",
  allowSelection = true,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex flex-col-reverse gap-2 px-6 pb-(--safe-area-inset-bottom,0px) sm:flex-row sm:justify-end",
      !allowSelection && "cursor-default",
      variant === "default" && "border-t bg-muted/72 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+--spacing(4))]",
      variant === "bare" && "in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pt-3 pt-4 pb-[calc(env(safe-area-inset-bottom,0px)+--spacing(6))]",
      className
    ),
    "data-slot": "drawer-footer"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render: allowSelection ? /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { render }) : render
  });
}
function DrawerTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DrawerTitle$1,
    {
      className: cn(
        "font-heading font-semibold text-xl leading-none",
        className
      ),
      "data-slot": "drawer-title",
      ...props
    }
  );
}
function DrawerDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DrawerDescription$1,
    {
      className: cn("text-muted-foreground text-sm", className),
      "data-slot": "drawer-description",
      ...props
    }
  );
}
function DrawerPanel({
  className,
  scrollFade = true,
  scrollable = true,
  allowSelection = true,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-header])]:pt-1 in-[[data-slot=drawer-popup]:has([data-slot=drawer-footer]:not(.border-t))]:pb-1",
      !allowSelection && "cursor-default",
      className
    ),
    "data-slot": "drawer-panel"
  };
  const content = useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render: allowSelection ? /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerContent, { render }) : render
  });
  if (scrollable) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollArea,
      {
        className: "touch-auto",
        overscrollContain: true,
        scrollFade,
        children: content
      }
    );
  }
  return content;
}
function DrawerBar({
  className,
  position: positionProp,
  render,
  ...props
}) {
  const { position: contextPosition } = reactExports.useContext(DrawerContext);
  const position = positionProp ?? contextPosition;
  const horizontal = position === "left" || position === "right";
  const defaultProps = {
    "aria-hidden": true,
    className: cn(
      "absolute flex touch-none items-center justify-center p-3 before:rounded-full before:bg-input",
      horizontal ? "inset-y-0 before:h-12 before:w-1" : "inset-x-0 before:h-1 before:w-12",
      position === "top" && "bottom-0",
      position === "bottom" && "top-0",
      position === "left" && "right-0",
      position === "right" && "left-0",
      className
    ),
    "data-slot": "drawer-bar"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
const DrawerContent = DrawerContent$1;
function DrawerMenu({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("-m-2 flex flex-col", className),
    "data-slot": "drawer-menu"
  };
  return useRender({
    defaultTagName: "nav",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DrawerMenuItem({
  className,
  variant = "default",
  render,
  disabled,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex min-h-9 pointer-coarse:min-h-11 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground disabled:pointer-events-none disabled:opacity-64 data-[variant=destructive]:text-destructive-foreground sm:min-h-8 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:-mx-0.5 [&>svg]:shrink-0",
      className
    ),
    "data-slot": "drawer-menu-item",
    "data-variant": variant,
    disabled,
    type: "button"
  };
  return useRender({
    defaultTagName: "button",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DrawerMenuSeparator({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("mx-2 my-1 h-px bg-border", className),
    "data-slot": "drawer-menu-separator"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DrawerMenuGroup({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn("flex flex-col", className),
    "data-slot": "drawer-menu-group"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DrawerMenuGroupLabel({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "px-2 py-1.5 font-medium text-muted-foreground text-xs",
      className
    ),
    "data-slot": "drawer-menu-group-label"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DrawerMenuCheckboxItem({
  className,
  children,
  checked,
  defaultChecked,
  onCheckedChange,
  variant = "default",
  disabled,
  render,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CheckboxRoot,
    {
      checked,
      className: cn(
        "grid min-h-9 pointer-coarse:min-h-11 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
        variant === "switch" ? "grid-cols-[minmax(0,1fr)_auto] gap-4 pe-1.5" : "grid-cols-[1rem_minmax(0,1fr)] pe-4",
        className
      ),
      "data-slot": "drawer-menu-checkbox-item",
      defaultChecked,
      disabled,
      onCheckedChange,
      render,
      ...props,
      children: variant === "switch" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wrap-anywhere col-start-1 min-w-0", children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CheckboxIndicator,
          {
            className: "inset-shadow-[0_1px_--theme(--color-black/4%)] col-start-2 inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-200 [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-64 sm:[--thumb-size:--spacing(3)]",
            keepMounted: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none block aspect-square h-full in-[[data-slot=drawer-menu-checkbox-item][data-checked]]:origin-[var(--thumb-size)_50%] origin-left in-[[data-slot=drawer-menu-checkbox-item][data-checked]]:translate-x-[calc(var(--thumb-size)-4px)] in-[[data-slot=drawer-menu-checkbox-item]:active]:not-data-disabled:scale-x-110 in-[[data-slot=drawer-menu-checkbox-item]:active]:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.10)] rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]" })
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: "col-start-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { "aria-hidden": "true", strokeWidth: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wrap-anywhere col-start-2 min-w-0", children })
      ] })
    }
  );
}
function DrawerMenuRadioGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RadioGroup,
    {
      className: cn("flex flex-col", className),
      "data-slot": "drawer-menu-radio-group",
      ...props
    }
  );
}
function DrawerMenuRadioItem({
  className,
  children,
  value,
  disabled,
  render,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    RadioRoot,
    {
      className: cn(
        "grid min-h-9 pointer-coarse:min-h-11 w-full cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-64 sm:min-h-8 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
        "grid-cols-[1rem_minmax(0,1fr)] items-center pe-4",
        className
      ),
      "data-slot": "drawer-menu-radio-item",
      disabled,
      render,
      value,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { className: "col-start-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { "aria-hidden": "true", strokeWidth: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "wrap-anywhere col-start-2 min-w-0", children })
      ]
    }
  );
}
export {
  Drawer as D,
  DrawerTrigger as a,
  DrawerPopup as b,
  DrawerHeader as c,
  DrawerTitle as d,
  DrawerDescription as e,
  DrawerFooter as f,
  DrawerClose as g,
  DrawerPanel as h,
  DrawerMenu as i,
  DrawerMenuGroup as j,
  DrawerMenuGroupLabel as k,
  DrawerMenuItem as l,
  DrawerMenuSeparator as m,
  DrawerMenuCheckboxItem as n,
  DrawerMenuRadioGroup as o,
  DrawerMenuRadioItem as p
};
