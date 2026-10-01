import { r as reactExports, V as formatErrorMessage, dK as useFloatingParentNodeId, W as useControlled, ac as useTransitionStatus, a3 as useIsoLayoutEffect, X as useStableCallback, dL as linkPress, an as ownerDocument, bm as activeElement, ao as isHTMLElement, aN as contains, ad as useOpenChangeComplete, j as jsxRuntimeExports, cS as FloatingTree, cJ as triggerHover, ax as outsidePress, aw as focusOut, d7 as useFloatingNodeId, Y as useRenderElement, d8 as FloatingNode, dM as getEmptyRootContext, d9 as useHoverFloatingInteraction, aC as useDismiss, am as getTarget, aG as EMPTY_OBJECT, a1 as useBaseUiId, _ as transitionStatusMapping, ba as popupStateMapping, bN as reactDomExports, aX as inertValue, dN as getNodeChildren, dF as useFloatingTree, aZ as useDirection, ae as useTimeout, a$ as useAnimationFrame, au as useValueAsRef, ca as useAnimationsFinished, bn as getCssDimensions, b0 as getWindow, b4 as addEventListener, c9 as TransitionStatusDataAttributes, aA as useFloatingRootContext, dO as useHoverInteractionSharedState, dP as clearSafePolygonPointerEventsMutation, d0 as useHoverReferenceInteraction, d1 as safePolygon, aB as useClick, a9 as mergeProps, a2 as useButton, br as CompositeItem, ap as EMPTY_ARRAY, aM as pressableTriggerOpenStateMapping, d5 as FocusGuard, dQ as isOutsideEvent, dR as getPreviousTabbable, dS as ownerVisuallyHidden, dT as getNextTabbable, dU as getTabbableAfterElement, aJ as createChangeEventDetails, c8 as triggerPress, bF as listNavigation, bE as stopEvent, cL as PATIENT_CLICK_THRESHOLD, dV as applySafePolygonPointerEventsMutation, aR as FloatingPortal, dW as useAnchorPositioningWithHook, dX as useFloating, d6 as POPUP_COLLISION_AVOIDANCE, aS as DROPDOWN_COLLISION_AVOIDANCE, dY as mergeCleanups, aV as usePositioner, dZ as adaptiveOrigin, d_ as enableFocusInside, d$ as disableFocusInside, cn as useId, bb as getDisabledMountTransitionStyles, db as popupTransitionStateMapping, aQ as triggerOpenStateMapping, e as cn, a7 as cva } from "./index-DM02Iz28.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import { C as CompositeRoot } from "./CompositeRoot-xQsp56hN.js";
const NavigationMenuRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useNavigationMenuRootContext(optional) {
  const context = reactExports.useContext(NavigationMenuRootContext);
  if (context === void 0 && !optional) {
    throw new Error(formatErrorMessage(41));
  }
  return context;
}
const NavigationMenuTreeContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useNavigationMenuTreeContext() {
  return reactExports.useContext(NavigationMenuTreeContext);
}
let NavigationMenuPositionerCssVars = /* @__PURE__ */ (function(NavigationMenuPositionerCssVars2) {
  NavigationMenuPositionerCssVars2["availableWidth"] = "--available-width";
  NavigationMenuPositionerCssVars2["availableHeight"] = "--available-height";
  NavigationMenuPositionerCssVars2["anchorWidth"] = "--anchor-width";
  NavigationMenuPositionerCssVars2["anchorHeight"] = "--anchor-height";
  NavigationMenuPositionerCssVars2["transformOrigin"] = "--transform-origin";
  NavigationMenuPositionerCssVars2["positionerWidth"] = "--positioner-width";
  NavigationMenuPositionerCssVars2["positionerHeight"] = "--positioner-height";
  return NavigationMenuPositionerCssVars2;
})({});
let NavigationMenuPopupCssVars = /* @__PURE__ */ (function(NavigationMenuPopupCssVars2) {
  NavigationMenuPopupCssVars2["popupWidth"] = "--popup-width";
  NavigationMenuPopupCssVars2["popupHeight"] = "--popup-height";
  return NavigationMenuPopupCssVars2;
})({});
function setSharedFixedSize(popupElement, positionerElement, width, height) {
  popupElement.style.setProperty(NavigationMenuPopupCssVars.popupWidth, `${width}px`);
  popupElement.style.setProperty(NavigationMenuPopupCssVars.popupHeight, `${height}px`);
  positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerWidth, `${width}px`);
  positionerElement.style.setProperty(NavigationMenuPositionerCssVars.positionerHeight, `${height}px`);
}
const blockedReturnFocusReasons = /* @__PURE__ */ new Set([triggerHover, outsidePress, focusOut]);
function getPositionerFixedSize(positionerElement) {
  const width = parseFloat(positionerElement.style.getPropertyValue(NavigationMenuPositionerCssVars.positionerWidth)) || 0;
  const height = parseFloat(positionerElement.style.getPropertyValue(NavigationMenuPositionerCssVars.positionerHeight)) || 0;
  if (width <= 0 || height <= 0) {
    return null;
  }
  return {
    width,
    height
  };
}
const NavigationMenuRoot = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuRoot2(componentProps, forwardedRef) {
  const {
    defaultValue = null,
    value: valueParam,
    onValueChange,
    actionsRef,
    delay = 50,
    closeDelay = 50,
    orientation = "horizontal",
    onOpenChangeComplete
  } = componentProps;
  const nested = useFloatingParentNodeId() != null;
  const parentRootContext = useNavigationMenuRootContext(true);
  const [value, setValueUnwrapped] = useControlled({
    controlled: valueParam,
    default: defaultValue,
    name: "NavigationMenu",
    state: "value"
  });
  const open = value != null;
  const closeReasonRef = reactExports.useRef(void 0);
  const rootRef = reactExports.useRef(null);
  const [positionerElement, setPositionerElement] = reactExports.useState(null);
  const [popupElement, setPopupElement] = reactExports.useState(null);
  const [viewportElement, setViewportElement] = reactExports.useState(null);
  const [viewportTargetElement, setViewportTargetElement] = reactExports.useState(null);
  const [activationDirection, setActivationDirection] = reactExports.useState(null);
  const [floatingRootContext, setFloatingRootContext] = reactExports.useState(void 0);
  const [viewportInert, setViewportInert] = reactExports.useState(false);
  const prevTriggerElementRef = reactExports.useRef(null);
  const currentContentRef = reactExports.useRef(null);
  const beforeInsideRef = reactExports.useRef(null);
  const afterInsideRef = reactExports.useRef(null);
  const beforeOutsideRef = reactExports.useRef(null);
  const afterOutsideRef = reactExports.useRef(null);
  const popupAutoSizeResetRef = reactExports.useRef({
    abortController: null,
    owner: null
  });
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  useIsoLayoutEffect(() => {
    if (open) {
      return;
    }
    if (!positionerElement || !popupElement) {
      return;
    }
    const closeTransitionSize = getPositionerFixedSize(positionerElement);
    if (!closeTransitionSize) {
      return;
    }
    setSharedFixedSize(popupElement, positionerElement, closeTransitionSize.width, closeTransitionSize.height);
  }, [open, popupElement, positionerElement]);
  reactExports.useEffect(() => {
    setViewportInert(false);
  }, [value]);
  const setValue = useStableCallback((nextValue, eventDetails) => {
    if (nextValue == null) {
      closeReasonRef.current = eventDetails.reason;
    }
    if (nextValue !== value) {
      onValueChange?.(nextValue, eventDetails);
    }
    if (eventDetails.isCanceled) {
      return;
    }
    if (nextValue == null) {
      setActivationDirection(null);
      setFloatingRootContext(void 0);
    }
    setValueUnwrapped(nextValue);
    if (nested && nextValue == null && eventDetails.reason === linkPress && parentRootContext) {
      parentRootContext.setValue(null, eventDetails);
    }
  });
  const handleUnmount = useStableCallback(() => {
    const doc = ownerDocument(rootRef.current);
    const activeEl = activeElement(doc);
    const isReturnFocusBlocked = closeReasonRef.current ? blockedReturnFocusReasons.has(closeReasonRef.current) : false;
    if (!isReturnFocusBlocked && isHTMLElement(prevTriggerElementRef.current) && (activeEl === ownerDocument(popupElement).body || contains(popupElement, activeEl)) && popupElement) {
      prevTriggerElementRef.current.focus({
        preventScroll: true
      });
      prevTriggerElementRef.current = void 0;
    }
    setMounted(false);
    onOpenChangeComplete?.(false);
    setActivationDirection(null);
    setFloatingRootContext(void 0);
    currentContentRef.current = null;
    closeReasonRef.current = void 0;
  });
  reactExports.useImperativeHandle(actionsRef, () => ({
    unmount: handleUnmount
  }), [handleUnmount]);
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: {
      current: popupElement
    },
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  useOpenChangeComplete({
    enabled: !actionsRef,
    open,
    ref: {
      current: viewportTargetElement
    },
    onComplete() {
      if (!open) {
        handleUnmount();
      }
    }
  });
  const contextActivationDirection = open ? activationDirection : null;
  const contextValue = reactExports.useMemo(() => ({
    open,
    value,
    setValue,
    mounted,
    transitionStatus,
    positionerElement,
    setPositionerElement,
    popupElement,
    setPopupElement,
    viewportElement,
    setViewportElement,
    viewportTargetElement,
    setViewportTargetElement,
    activationDirection: contextActivationDirection,
    setActivationDirection,
    floatingRootContext,
    setFloatingRootContext,
    currentContentRef,
    nested,
    rootRef,
    beforeInsideRef,
    afterInsideRef,
    beforeOutsideRef,
    afterOutsideRef,
    prevTriggerElementRef,
    popupAutoSizeResetRef,
    delay,
    closeDelay,
    orientation,
    viewportInert,
    setViewportInert
  }), [open, value, setValue, mounted, transitionStatus, positionerElement, popupElement, viewportElement, viewportTargetElement, contextActivationDirection, floatingRootContext, nested, delay, closeDelay, orientation, viewportInert]);
  const jsx = /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(TreeContext, {
      componentProps,
      forwardedRef,
      children: componentProps.children
    })
  });
  if (!nested) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTree, {
      children: jsx
    });
  }
  return jsx;
});
function TreeContext(props) {
  const {
    className,
    render,
    defaultValue,
    value: valueParam,
    onValueChange,
    actionsRef,
    delay,
    closeDelay,
    orientation,
    onOpenChangeComplete,
    style,
    ...elementProps
  } = props.componentProps;
  const nodeId = useFloatingNodeId();
  const {
    rootRef,
    nested,
    open
  } = useNavigationMenuRootContext();
  const state = {
    open,
    nested
  };
  const element = useRenderElement(nested ? "div" : "nav", props.componentProps, {
    state,
    ref: [props.forwardedRef, rootRef],
    props: elementProps
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuTreeContext.Provider, {
    value: nodeId,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingNode, {
      id: nodeId,
      children: element
    })
  });
}
const NAVIGATION_MENU_TRIGGER_IDENTIFIER = "data-base-ui-navigation-menu-trigger";
const NavigationMenuDismissContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useNavigationMenuDismissContext() {
  return reactExports.useContext(NavigationMenuDismissContext);
}
const NavigationMenuList$1 = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuList2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const nodeId = useNavigationMenuTreeContext();
  const {
    orientation,
    open,
    floatingRootContext,
    positionerElement,
    value,
    closeDelay,
    viewportElement,
    nested
  } = useNavigationMenuRootContext();
  const fallbackContext = reactExports.useMemo(() => getEmptyRootContext(), []);
  const context = floatingRootContext || fallbackContext;
  const interactionsEnabled = positionerElement != null || value == null;
  const hoverInteractionsEnabled = positionerElement != null || viewportElement != null || value == null;
  useHoverFloatingInteraction(context, {
    enabled: Boolean(floatingRootContext) && hoverInteractionsEnabled,
    closeDelay,
    nodeId
  });
  const dismiss = useDismiss(context, {
    enabled: interactionsEnabled,
    outsidePressEvent: "intentional",
    outsidePress(event) {
      const target = getTarget(event);
      const closestNavigationMenuTrigger = target?.closest(`[${NAVIGATION_MENU_TRIGGER_IDENTIFIER}]`);
      return closestNavigationMenuTrigger === null;
    }
  });
  const dismissProps = floatingRootContext ? dismiss : void 0;
  const state = {
    open
  };
  const defaultProps = nested ? EMPTY_OBJECT : {
    onKeyDown(event) {
      const shouldStop = orientation === "horizontal" && (event.key === "ArrowLeft" || event.key === "ArrowRight") || orientation === "vertical" && (event.key === "ArrowUp" || event.key === "ArrowDown");
      if (shouldStop) {
        event.stopPropagation();
      }
    }
  };
  const props = [dismissProps?.floating || EMPTY_OBJECT, defaultProps, elementProps];
  const element = useRenderElement("ul", componentProps, {
    state,
    ref: forwardedRef,
    props,
    enabled: nested
  });
  if (nested) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuDismissContext.Provider, {
      value: dismissProps,
      children: element
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuDismissContext.Provider, {
    value: dismissProps,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef],
      props,
      loopFocus: false,
      orientation,
      tag: "ul"
    })
  });
});
const NavigationMenuItemContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useNavigationMenuItemContext() {
  const value = reactExports.useContext(NavigationMenuItemContext);
  if (!value) {
    throw new Error(formatErrorMessage(39));
  }
  return value;
}
const NavigationMenuItem$1 = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuItem2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    value: valueProp,
    ...elementProps
  } = componentProps;
  const fallbackValue = useBaseUiId();
  const value = valueProp ?? fallbackValue;
  const element = useRenderElement("li", componentProps, {
    ref: forwardedRef,
    props: elementProps
  });
  const contextValue = reactExports.useMemo(() => ({
    value
  }), [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuItemContext.Provider, {
    value: contextValue,
    children: element
  });
});
const stateAttributesMapping = {
  ...popupStateMapping,
  ...transitionStatusMapping,
  activationDirection(value) {
    if (!value) {
      return null;
    }
    return {
      "data-activation-direction": value
    };
  }
};
const NavigationMenuContent$1 = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuContent2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    keepMounted = false,
    ...elementProps
  } = componentProps;
  const {
    mounted: popupMounted,
    viewportElement,
    value,
    activationDirection,
    currentContentRef,
    viewportTargetElement
  } = useNavigationMenuRootContext();
  const {
    value: itemValue
  } = useNavigationMenuItemContext();
  const nodeId = useNavigationMenuTreeContext();
  const open = popupMounted && value === itemValue;
  const ref = reactExports.useRef(null);
  const [hasMountedInPortal, setHasMountedInPortal] = reactExports.useState(false);
  const [focusInside, setFocusInside] = reactExports.useState(false);
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open);
  if (mounted && !popupMounted) {
    setMounted(false);
  }
  useOpenChangeComplete({
    ref,
    open,
    onComplete() {
      if (!open) {
        setMounted(false);
      }
    }
  });
  useIsoLayoutEffect(() => {
    if (open && ref.current) {
      currentContentRef.current = ref.current;
    }
  }, [open, currentContentRef]);
  const state = {
    open,
    transitionStatus,
    activationDirection
  };
  const handleCurrentContentRef = useStableCallback((node) => {
    if (node && open) {
      currentContentRef.current = node;
    }
  });
  const commonProps = {
    onFocus(event) {
      const target = getTarget(event.nativeEvent);
      if (target?.hasAttribute("data-base-ui-focus-guard")) {
        return;
      }
      setFocusInside(true);
    },
    onBlur(event) {
      if (!contains(event.currentTarget, event.relatedTarget)) {
        setFocusInside(false);
      }
    }
  };
  const defaultProps = !open && mounted ? {
    style: {
      position: "absolute",
      top: 0,
      left: 0
    },
    inert: inertValue(!focusInside),
    ...commonProps
  } : commonProps;
  const portalContainer = viewportTargetElement || viewportElement;
  const hidden = keepMounted && !mounted;
  const shouldRenderInline = keepMounted && !portalContainer && !hasMountedInPortal;
  if (keepMounted && portalContainer && !hasMountedInPortal) {
    setHasMountedInPortal(true);
  }
  if (shouldRenderInline) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef],
      props: [defaultProps, {
        hidden: true
      }, elementProps],
      stateAttributesMapping
    });
  }
  if (!portalContainer || !mounted && !keepMounted) {
    return null;
  }
  return /* @__PURE__ */ reactDomExports.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(FloatingNode, {
    id: nodeId,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef, ref, handleCurrentContentRef],
      props: [defaultProps, hidden ? {
        hidden: true
      } : EMPTY_OBJECT, elementProps],
      stateAttributesMapping
    })
  }), portalContainer);
});
function isOutsideMenuEvent({
  currentTarget,
  relatedTarget
}, params) {
  const {
    popupElement,
    rootRef,
    tree,
    nodeId
  } = params;
  const nodeChildrenContains = tree ? getNodeChildren(tree.nodesRef.current, nodeId).some((node) => contains(node.context?.elements.floating, relatedTarget)) : false;
  if (!popupElement) {
    return !contains(rootRef.current, relatedTarget) && !nodeChildrenContains;
  }
  return !contains(popupElement, currentTarget) && !contains(popupElement, relatedTarget) && !contains(rootRef.current, relatedTarget) && !nodeChildrenContains;
}
const DEFAULT_SIZE = {
  width: 0,
  height: 0
};
const NavigationMenuTrigger$1 = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    nativeButton = true,
    disabled,
    ...elementProps
  } = componentProps;
  const {
    value,
    setValue,
    mounted,
    open,
    positionerElement,
    setActivationDirection,
    setFloatingRootContext,
    popupElement,
    viewportElement,
    transitionStatus,
    rootRef,
    beforeOutsideRef,
    afterOutsideRef,
    afterInsideRef,
    beforeInsideRef,
    prevTriggerElementRef,
    popupAutoSizeResetRef,
    currentContentRef,
    delay,
    closeDelay,
    orientation,
    setViewportInert,
    nested
  } = useNavigationMenuRootContext();
  const {
    value: itemValue
  } = useNavigationMenuItemContext();
  const nodeId = useNavigationMenuTreeContext();
  const tree = useFloatingTree();
  const dismissProps = useNavigationMenuDismissContext();
  const direction = useDirection();
  const stickIfOpenTimeout = useTimeout();
  const focusFrame = useAnimationFrame();
  const mutationFrame = useAnimationFrame();
  const resizeFrame = useAnimationFrame();
  const sizeFrame = useAnimationFrame();
  const [triggerElement, setTriggerElement] = reactExports.useState(null);
  const [stickIfOpen, setStickIfOpen] = reactExports.useState(true);
  const [pointerType, setPointerType] = reactExports.useState("");
  const triggerElementRef = reactExports.useRef(null);
  const allowFocusRef = reactExports.useRef(false);
  const prevSizeRef = reactExports.useRef(DEFAULT_SIZE);
  const skipAutoSizeSyncRef = reactExports.useRef(false);
  const isActiveItem = open && value === itemValue;
  const isActiveItemRef = useValueAsRef(isActiveItem);
  const interactionsEnabled = (positionerElement != null || value == null) && !disabled;
  const hoverFloatingElement = positionerElement || viewportElement;
  const hoverInteractionsEnabled = (hoverFloatingElement != null || value == null) && !disabled;
  const runOnceAnimationsFinish = useAnimationsFinished(popupElement);
  const handleTriggerElement = reactExports.useCallback((element) => {
    triggerElementRef.current = element;
    setTriggerElement(element);
  }, []);
  const cancelAutoSizeReset = useStableCallback((force = false) => {
    if (!force && popupAutoSizeResetRef.current.owner !== itemValue) {
      return;
    }
    popupAutoSizeResetRef.current.abortController?.abort();
    popupAutoSizeResetRef.current.abortController = null;
    popupAutoSizeResetRef.current.owner = null;
  });
  useIsoLayoutEffect(() => {
    if (isActiveItem) {
      return;
    }
    mutationFrame.cancel();
    sizeFrame.cancel();
    cancelAutoSizeReset();
  }, [isActiveItem, mutationFrame, sizeFrame, cancelAutoSizeReset]);
  function setAutoSizes(element) {
    element.style.setProperty(NavigationMenuPopupCssVars.popupWidth, "auto");
    element.style.setProperty(NavigationMenuPopupCssVars.popupHeight, "auto");
  }
  function clearFixedSizes(popup, positioner) {
    popup.style.removeProperty(NavigationMenuPopupCssVars.popupWidth);
    popup.style.removeProperty(NavigationMenuPopupCssVars.popupHeight);
    positioner.style.removeProperty(NavigationMenuPositionerCssVars.positionerWidth);
    positioner.style.removeProperty(NavigationMenuPositionerCssVars.positionerHeight);
  }
  function scheduleAutoSizeReset(popup) {
    cancelAutoSizeReset(true);
    const abortController = new AbortController();
    popupAutoSizeResetRef.current.abortController = abortController;
    popupAutoSizeResetRef.current.owner = itemValue;
    runOnceAnimationsFinish(() => {
      popupAutoSizeResetRef.current.abortController = null;
      popupAutoSizeResetRef.current.owner = null;
      setAutoSizes(popup);
    }, abortController.signal);
  }
  const handleValueChange = useStableCallback((popup, positioner, currentWidth, currentHeight) => {
    cancelAutoSizeReset(true);
    clearFixedSizes(popup, positioner);
    const {
      width,
      height
    } = getCssDimensions(popup);
    const measuredWidth = width || prevSizeRef.current.width;
    const measuredHeight = height || prevSizeRef.current.height;
    if (currentHeight === 0 || currentWidth === 0) {
      currentWidth = measuredWidth;
      currentHeight = measuredHeight;
    }
    popup.style.setProperty(NavigationMenuPopupCssVars.popupWidth, `${currentWidth}px`);
    popup.style.setProperty(NavigationMenuPopupCssVars.popupHeight, `${currentHeight}px`);
    positioner.style.setProperty(NavigationMenuPositionerCssVars.positionerWidth, `${measuredWidth}px`);
    positioner.style.setProperty(NavigationMenuPositionerCssVars.positionerHeight, `${measuredHeight}px`);
    sizeFrame.request(() => {
      if (!isActiveItemRef.current) {
        return;
      }
      popup.style.setProperty(NavigationMenuPopupCssVars.popupWidth, `${measuredWidth}px`);
      popup.style.setProperty(NavigationMenuPopupCssVars.popupHeight, `${measuredHeight}px`);
      scheduleAutoSizeReset(popup);
    });
  });
  const handleInterruptedMutationResize = useStableCallback((popup, positioner, currentWidth, currentHeight) => {
    sizeFrame.cancel();
    mutationFrame.cancel();
    cancelAutoSizeReset(true);
    if (currentWidth === 0 || currentHeight === 0) {
      return;
    }
    setSharedFixedSize(popup, positioner, currentWidth, currentHeight);
    mutationFrame.request(() => {
      mutationFrame.request(() => {
        clearFixedSizes(popup, positioner);
        const {
          width,
          height
        } = getCssDimensions(popup);
        const measuredWidth = width || currentWidth;
        const measuredHeight = height || currentHeight;
        setSharedFixedSize(popup, positioner, currentWidth, currentHeight);
        sizeFrame.request(() => {
          if (!isActiveItemRef.current) {
            return;
          }
          setSharedFixedSize(popup, positioner, measuredWidth, measuredHeight);
          scheduleAutoSizeReset(popup);
        });
      });
    });
  });
  const syncCurrentSize = useStableCallback((popup, positioner) => {
    sizeFrame.cancel();
    cancelAutoSizeReset(true);
    clearFixedSizes(popup, positioner);
    const {
      width,
      height
    } = getCssDimensions(popup);
    if (width === 0 || height === 0) {
      return;
    }
    prevSizeRef.current = {
      width,
      height
    };
    setAutoSizes(popup);
    positioner.style.setProperty(NavigationMenuPositionerCssVars.positionerWidth, `${width}px`);
    positioner.style.setProperty(NavigationMenuPositionerCssVars.positionerHeight, `${height}px`);
  });
  const getMutationBaseline = useStableCallback((popup) => {
    const popupWidth = popup.style.getPropertyValue(NavigationMenuPopupCssVars.popupWidth);
    const popupHeight = popup.style.getPropertyValue(NavigationMenuPopupCssVars.popupHeight);
    const isResizing = popupWidth !== "" && popupWidth !== "auto" && popupHeight !== "" && popupHeight !== "auto";
    if (!isResizing) {
      return {
        size: prevSizeRef.current,
        syncPositioner: false
      };
    }
    return {
      size: {
        width: popup.offsetWidth || prevSizeRef.current.width,
        height: popup.offsetHeight || prevSizeRef.current.height
      },
      syncPositioner: true
    };
  });
  reactExports.useEffect(() => {
    if (!open) {
      stickIfOpenTimeout.clear();
      mutationFrame.cancel();
      resizeFrame.cancel();
      sizeFrame.cancel();
      cancelAutoSizeReset(true);
      skipAutoSizeSyncRef.current = false;
      setPointerType("");
    }
  }, [stickIfOpenTimeout, open, mutationFrame, resizeFrame, sizeFrame, cancelAutoSizeReset]);
  reactExports.useEffect(() => {
    if (!mounted) {
      prevSizeRef.current = DEFAULT_SIZE;
    }
  }, [mounted]);
  useIsoLayoutEffect(() => {
    if (!popupElement || typeof ResizeObserver !== "function") {
      return void 0;
    }
    const resizeObserver = new ResizeObserver(() => {
      prevSizeRef.current = {
        width: popupElement.offsetWidth,
        height: popupElement.offsetHeight
      };
    });
    resizeObserver.observe(popupElement);
    return () => {
      resizeObserver.disconnect();
    };
  }, [popupElement]);
  reactExports.useEffect(() => {
    if (!open || !isActiveItem || !popupElement || !positionerElement) {
      return void 0;
    }
    const popup = popupElement;
    const positioner = positionerElement;
    const win = getWindow(positioner);
    function handleResize() {
      resizeFrame.cancel();
      resizeFrame.request(() => syncCurrentSize(popup, positioner));
    }
    const unsubscribe = addEventListener(win, "resize", handleResize);
    return () => {
      resizeFrame.cancel();
      unsubscribe();
    };
  }, [open, isActiveItem, popupElement, positionerElement, resizeFrame, syncCurrentSize]);
  reactExports.useEffect(() => {
    const observedElement = currentContentRef.current;
    if (!observedElement || !popupElement || !positionerElement || !isActiveItem || typeof MutationObserver !== "function") {
      return void 0;
    }
    const mutationObserver = new MutationObserver(() => {
      if (transitionStatus === "starting" || popupElement.hasAttribute(TransitionStatusDataAttributes.startingStyle)) {
        syncCurrentSize(popupElement, positionerElement);
        return;
      }
      const {
        size,
        syncPositioner
      } = getMutationBaseline(popupElement);
      if (syncPositioner) {
        handleInterruptedMutationResize(popupElement, positionerElement, size.width, size.height);
        return;
      }
      handleValueChange(popupElement, positionerElement, size.width, size.height);
    });
    mutationObserver.observe(observedElement, {
      childList: true,
      subtree: true,
      characterData: true,
      // `keepMounted` submenu switches update dimensions by toggling hidden
      // content rather than inserting or removing content nodes.
      attributes: true,
      attributeFilter: ["hidden"]
    });
    return () => {
      mutationObserver.disconnect();
    };
  }, [currentContentRef, popupElement, positionerElement, isActiveItem, transitionStatus, getMutationBaseline, handleInterruptedMutationResize, handleValueChange, syncCurrentSize]);
  reactExports.useEffect(() => {
    if (isActiveItem && open && popupElement && allowFocusRef.current) {
      allowFocusRef.current = false;
      focusFrame.request(() => {
        beforeOutsideRef.current?.focus();
      });
    }
    return () => {
      focusFrame.cancel();
    };
  }, [beforeOutsideRef, focusFrame, isActiveItem, open, popupElement]);
  useIsoLayoutEffect(() => {
    if (isActiveItemRef.current && open && popupElement && positionerElement) {
      if (skipAutoSizeSyncRef.current) {
        skipAutoSizeSyncRef.current = false;
        return void 0;
      }
      const {
        width,
        height
      } = getCssDimensions(popupElement);
      handleValueChange(popupElement, positionerElement, width, height);
    }
    return void 0;
  }, [currentContentRef, handleValueChange, isActiveItemRef, open, popupElement, positionerElement, transitionStatus]);
  function handleOpenChange(nextOpen, eventDetails) {
    const isHover = eventDetails.reason === triggerHover;
    if (!interactionsEnabled) {
      return;
    }
    if (pointerType === "touch" && isHover) {
      return;
    }
    if (!nextOpen && value !== itemValue) {
      return;
    }
    function changeState() {
      if (isHover) {
        setStickIfOpen(true);
        stickIfOpenTimeout.clear();
        stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
          setStickIfOpen(false);
        });
      }
      if (nextOpen) {
        setValue(itemValue, eventDetails);
      } else {
        setValue(null, eventDetails);
        setPointerType("");
      }
    }
    if (isHover) {
      reactDomExports.flushSync(changeState);
    } else {
      changeState();
    }
  }
  const context = useFloatingRootContext({
    open,
    onOpenChange: handleOpenChange,
    elements: {
      reference: triggerElement,
      floating: hoverFloatingElement
    }
  });
  const hoverInteractionState = useHoverInteractionSharedState(context);
  const shouldBlockSafePolygonPointerEvents = pointerType !== "touch";
  reactExports.useEffect(() => {
    if (!open) {
      context.context.dataRef.current.openEvent = void 0;
      hoverInteractionState.pointerType = void 0;
      hoverInteractionState.interactedInside = false;
      hoverInteractionState.restTimeoutPending = false;
      hoverInteractionState.openChangeTimeout.clear();
      hoverInteractionState.restTimeout.clear();
    }
    return () => {
      clearSafePolygonPointerEventsMutation(hoverInteractionState);
    };
  }, [context, hoverInteractionState, open]);
  const getInlineHandleCloseContext = useStableCallback(() => {
    if (!nested || positionerElement || !triggerElementRef.current || !hoverFloatingElement) {
      return null;
    }
    return getHandleCloseContext(triggerElementRef.current, hoverFloatingElement, nodeId);
  });
  function getScope() {
    if (nested && positionerElement) {
      return null;
    }
    return triggerElementRef.current?.closest("ul") ?? null;
  }
  const hoverProps = useHoverReferenceInteraction(context, {
    enabled: hoverInteractionsEnabled,
    move: false,
    handleClose: safePolygon({
      blockPointerEvents: shouldBlockSafePolygonPointerEvents,
      getScope
    }),
    restMs: mounted && positionerElement ? 0 : delay,
    delay: {
      close: closeDelay
    },
    triggerElementRef,
    getHandleCloseContext: getInlineHandleCloseContext
  });
  const hover = reactExports.useMemo(() => hoverProps ? {
    reference: hoverProps
  } : void 0, [hoverProps]);
  const click = useClick(context, {
    enabled: interactionsEnabled,
    stickIfOpen,
    toggle: isActiveItem
  });
  const referenceProps = reactExports.useMemo(() => mergeProps(click.reference, hover?.reference), [click.reference, hover]);
  useIsoLayoutEffect(() => {
    if (isActiveItem) {
      setFloatingRootContext(context);
      prevTriggerElementRef.current = triggerElement;
    }
  }, [isActiveItem, context, setFloatingRootContext, prevTriggerElementRef, triggerElement]);
  function handleActivation(event) {
    reactDomExports.flushSync(() => {
      const currentTarget = event.currentTarget;
      const prevTriggerRect = prevTriggerElementRef.current?.getBoundingClientRect();
      if (mounted && prevTriggerRect && triggerElement) {
        const nextTriggerRect = triggerElement.getBoundingClientRect();
        const isMovingRight = nextTriggerRect.left > prevTriggerRect.left;
        const isMovingDown = nextTriggerRect.top > prevTriggerRect.top;
        if (orientation === "horizontal" && nextTriggerRect.left !== prevTriggerRect.left) {
          setActivationDirection(isMovingRight ? "right" : "left");
        } else if (orientation === "vertical" && nextTriggerRect.top !== prevTriggerRect.top) {
          setActivationDirection(isMovingDown ? "down" : "up");
        }
      }
      if (event.type !== "click" && value != null) {
        context.context.dataRef.current.openEvent = void 0;
      }
      if (pointerType === "touch" && event.type !== "click") {
        return;
      }
      if (value != null && event.type !== "keydown") {
        setValue(itemValue, createChangeEventDetails(event.type === "mouseenter" ? triggerHover : triggerPress, event.nativeEvent));
      }
      if (event.type === "mouseenter" && shouldBlockSafePolygonPointerEvents && (!nested || !positionerElement) && hoverFloatingElement) {
        const applyPointerEventsMutation = () => {
          const scopeElement = getScope() ?? currentTarget.ownerDocument.body;
          applySafePolygonPointerEventsMutation(hoverInteractionState, {
            scopeElement,
            referenceElement: currentTarget,
            floatingElement: hoverFloatingElement
          });
        };
        if (value != null && value !== itemValue) {
          queueMicrotask(applyPointerEventsMutation);
        } else {
          applyPointerEventsMutation();
        }
      }
    });
  }
  const handleOpenEvent = useStableCallback((event) => {
    if (disabled) {
      return;
    }
    if (!popupElement || !positionerElement) {
      handleActivation(event);
      return;
    }
    const {
      width,
      height
    } = getCssDimensions(popupElement);
    const shouldSkipAutoSizeSync = value != null && value !== itemValue && (event.type === "click" || pointerType !== "touch");
    handleActivation(event);
    if (shouldSkipAutoSizeSync) {
      skipAutoSizeSyncRef.current = true;
    }
    handleValueChange(popupElement, positionerElement, width, height);
  });
  const state = {
    open: isActiveItem
  };
  function handleSetPointerType(event) {
    setPointerType(event.pointerType);
  }
  function handleTriggerPointerDown(event) {
    handleSetPointerType(event);
    clearSafePolygonPointerEventsMutation(hoverInteractionState);
  }
  const defaultProps = {
    tabIndex: 0,
    onMouseEnter: handleOpenEvent,
    onClick: handleOpenEvent,
    onPointerEnter: handleSetPointerType,
    onPointerDown: handleTriggerPointerDown,
    "aria-expanded": isActiveItem,
    "aria-controls": isActiveItem ? popupElement?.id : void 0,
    [NAVIGATION_MENU_TRIGGER_IDENTIFIER]: "",
    onFocus() {
      if (!isActiveItem) {
        return;
      }
      setViewportInert(false);
    },
    onMouseMove() {
      allowFocusRef.current = false;
    },
    onKeyDown(event) {
      allowFocusRef.current = true;
      if (nested) {
        return;
      }
      const verticalOpenKey = direction === "rtl" ? "ArrowLeft" : "ArrowRight";
      const openHorizontal = orientation === "horizontal" && event.key === "ArrowDown";
      const openVertical = orientation === "vertical" && event.key === verticalOpenKey;
      if (openHorizontal || openVertical) {
        setValue(itemValue, createChangeEventDetails(listNavigation, event.nativeEvent));
        handleOpenEvent(event);
        stopEvent(event);
      }
    },
    onBlur(event) {
      if (positionerElement && popupElement && isOutsideMenuEvent({
        currentTarget: event.currentTarget,
        relatedTarget: event.relatedTarget
      }, {
        popupElement,
        rootRef,
        tree,
        nodeId
      })) {
        setValue(null, createChangeEventDetails(focusOut, event.nativeEvent));
      }
    }
  };
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const referenceElement = hoverFloatingElement;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(CompositeItem, {
      tag: "button",
      render,
      className,
      style,
      state,
      stateAttributesMapping: pressableTriggerOpenStateMapping,
      refs: [forwardedRef, handleTriggerElement, buttonRef],
      props: [referenceProps, dismissProps?.reference || EMPTY_ARRAY, defaultProps, elementProps, getButtonProps]
    }), isActiveItem && /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
        ref: beforeOutsideRef,
        onFocus: (event) => {
          if (referenceElement && isOutsideEvent(event, referenceElement)) {
            beforeInsideRef.current?.focus();
          } else {
            const prevTabbable = getPreviousTabbable(triggerElement);
            prevTabbable?.focus();
          }
        }
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        "aria-owns": viewportElement?.id,
        style: ownerVisuallyHidden
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
        ref: afterOutsideRef,
        onFocus: (event) => {
          if (referenceElement && isOutsideEvent(event, referenceElement)) {
            reactDomExports.flushSync(() => {
              setViewportInert(false);
            });
            const elementToFocus = afterInsideRef.current || triggerElement;
            elementToFocus?.focus();
          } else {
            let nextTabbable = getNextTabbable(triggerElement);
            if (nested && !positionerElement && referenceElement && nextTabbable && contains(referenceElement, nextTabbable)) {
              nextTabbable = getTabbableAfterElement(afterInsideRef.current);
            }
            nextTabbable?.focus();
            if ((!nested || positionerElement) && !contains(rootRef.current, nextTabbable)) {
              setValue(null, createChangeEventDetails(focusOut, event.nativeEvent));
            }
          }
        }
      })]
    })]
  });
});
function getPlacementFromElements(domReferenceElement, floatingElement) {
  const referenceRect = domReferenceElement.getBoundingClientRect();
  const floatingRect = floatingElement.getBoundingClientRect();
  const referenceCenterX = referenceRect.left + referenceRect.width / 2;
  const referenceCenterY = referenceRect.top + referenceRect.height / 2;
  const floatingCenterX = floatingRect.left + floatingRect.width / 2;
  const floatingCenterY = floatingRect.top + floatingRect.height / 2;
  const deltaX = floatingCenterX - referenceCenterX;
  const deltaY = floatingCenterY - referenceCenterY;
  if (Math.abs(deltaX) >= Math.abs(deltaY)) {
    return deltaX >= 0 ? "right" : "left";
  }
  return deltaY >= 0 ? "bottom" : "top";
}
function getHandleCloseContext(domReferenceElement, floatingElement, nodeId) {
  return {
    placement: getPlacementFromElements(domReferenceElement, floatingElement),
    elements: {
      domReference: domReferenceElement,
      floating: floatingElement
    },
    nodeId
  };
}
const NavigationMenuPortalContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useNavigationMenuPortalContext() {
  const value = reactExports.useContext(NavigationMenuPortalContext);
  if (value === void 0) {
    throw new Error(formatErrorMessage(40));
  }
  return value;
}
const NavigationMenuPortal = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const {
    mounted
  } = useNavigationMenuRootContext();
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
function useNavigationMenuAnchorPositioning(params) {
  return useAnchorPositioningWithHook(params, useFloating);
}
const NavigationMenuPositionerContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useNavigationMenuPositionerContext(optional = false) {
  const context = reactExports.useContext(NavigationMenuPositionerContext);
  if (!context && !optional) {
    throw new Error(formatErrorMessage(42));
  }
  return context;
}
const EMPTY_ROOT_CONTEXT$1 = getEmptyRootContext();
const NavigationMenuPositioner = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuPositioner2(componentProps, forwardedRef) {
  const {
    open,
    mounted,
    positionerElement,
    setPositionerElement,
    floatingRootContext,
    nested,
    transitionStatus
  } = useNavigationMenuRootContext();
  const {
    className,
    render,
    anchor,
    positionMethod = "absolute",
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding = 5,
    collisionAvoidance = nested ? POPUP_COLLISION_AVOIDANCE : DROPDOWN_COLLISION_AVOIDANCE,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking = false,
    style,
    ...elementProps
  } = componentProps;
  const keepMounted = useNavigationMenuPortalContext();
  const nodeId = useNavigationMenuTreeContext();
  const initialInstantTimeout = useTimeout();
  const resizeTimeout = useTimeout();
  const [instant, setInstant] = reactExports.useState(open);
  const needsInitialInstantResetRef = reactExports.useRef(open);
  reactExports.useEffect(() => {
    if (!positionerElement) {
      return void 0;
    }
    function onFocus(event) {
      if (positionerElement && isOutsideEvent(event)) {
        const focusing = event.type === "focusin";
        const manageFocus = focusing ? enableFocusInside : disableFocusInside;
        manageFocus(positionerElement);
      }
    }
    return mergeCleanups(addEventListener(positionerElement, "focusin", onFocus, true), addEventListener(positionerElement, "focusout", onFocus, true));
  }, [positionerElement]);
  const domReference = (floatingRootContext || EMPTY_ROOT_CONTEXT$1).useState("domReferenceElement");
  const positioning = useNavigationMenuAnchorPositioning({
    anchor: anchor ?? domReference,
    positionMethod,
    mounted,
    side,
    sideOffset,
    align,
    alignOffset,
    arrowPadding,
    collisionBoundary,
    collisionPadding,
    sticky,
    disableAnchorTracking,
    keepMounted,
    floatingRootContext,
    collisionAvoidance,
    shift: {
      rootBoundary: "layoutViewport"
    },
    nodeId,
    // Allows the menu to remain anchored without wobbling while its size
    // and position transition simultaneously when side=top or side=left.
    adaptiveOrigin
  });
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    instant
  };
  reactExports.useEffect(() => {
    if (!open) {
      return void 0;
    }
    if (needsInitialInstantResetRef.current) {
      initialInstantTimeout.start(0, () => {
        needsInitialInstantResetRef.current = false;
        if (!resizeTimeout.isStarted()) {
          setInstant(false);
        }
      });
    }
    function handleResize() {
      reactDomExports.flushSync(() => {
        setInstant(true);
      });
      resizeTimeout.start(100, () => {
        setInstant(false);
      });
    }
    const win = getWindow(positionerElement);
    return addEventListener(win, "resize", handleResize);
  }, [open, initialInstantTimeout, resizeTimeout, positionerElement]);
  const element = usePositioner(componentProps, state, {
    styles: positioning.positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, setPositionerElement],
    hidden: !mounted,
    inert: !open
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuPositionerContext.Provider, {
    value: positioning,
    children: element
  });
});
const EMPTY_ROOT_CONTEXT = getEmptyRootContext();
function Guards({
  children
}) {
  const {
    beforeInsideRef,
    beforeOutsideRef,
    afterInsideRef,
    afterOutsideRef,
    positionerElement,
    viewportElement,
    floatingRootContext
  } = useNavigationMenuRootContext();
  const hasPositioner = Boolean(useNavigationMenuPositionerContext(true));
  const referenceElement = positionerElement || viewportElement;
  if (!floatingRootContext && !hasPositioner) {
    return children;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
      ref: beforeInsideRef,
      onFocus: (event) => {
        if (referenceElement && isOutsideEvent(event, referenceElement)) {
          getNextTabbable(referenceElement)?.focus();
        } else {
          beforeOutsideRef.current?.focus();
        }
      }
    }), children, /* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
      ref: afterInsideRef,
      onFocus: (event) => {
        if (referenceElement && isOutsideEvent(event, referenceElement)) {
          getPreviousTabbable(referenceElement)?.focus();
        } else {
          afterOutsideRef.current?.focus();
        }
      }
    })]
  });
}
const NavigationMenuViewport$1 = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
    id: idProp,
    ...elementProps
  } = componentProps;
  const id = useId(idProp);
  const {
    setViewportElement,
    setViewportTargetElement,
    floatingRootContext,
    prevTriggerElementRef,
    viewportInert,
    setViewportInert
  } = useNavigationMenuRootContext();
  const positioning = useNavigationMenuPositionerContext(true);
  const hasPositioner = Boolean(positioning);
  const domReference = (floatingRootContext || EMPTY_ROOT_CONTEXT).useState("domReferenceElement");
  useIsoLayoutEffect(() => {
    if (domReference) {
      prevTriggerElementRef.current = domReference;
    }
  }, [domReference, prevTriggerElementRef]);
  const element = useRenderElement("div", componentProps, {
    ref: [forwardedRef, setViewportElement],
    props: [{
      id,
      onBlur(event) {
        const relatedTarget = event.relatedTarget;
        const currentTarget = event.currentTarget;
        if (relatedTarget && !contains(currentTarget, relatedTarget) && relatedTarget !== domReference) {
          setViewportInert(true);
        }
      },
      ...!hasPositioner && viewportInert && {
        inert: inertValue(true)
      },
      children: hasPositioner ? children : /* @__PURE__ */ jsxRuntimeExports.jsx(Guards, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
          ref: setViewportTargetElement,
          children
        })
      })
    }, elementProps]
  });
  return hasPositioner ? /* @__PURE__ */ jsxRuntimeExports.jsx(Guards, {
    children: element
  }) : element;
});
const NavigationMenuPopup = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    open,
    transitionStatus,
    setPopupElement
  } = useNavigationMenuRootContext();
  const positioning = useNavigationMenuPositionerContext();
  const direction = useDirection();
  const id = useBaseUiId(idProp);
  const state = {
    open,
    transitionStatus,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden
  };
  let isPhysicalLeft = positioning.side === "left";
  if (direction === "rtl") {
    isPhysicalLeft = isPhysicalLeft || positioning.side === "inline-end";
  } else {
    isPhysicalLeft = isPhysicalLeft || positioning.side === "inline-start";
  }
  const isOriginSide = positioning.side === "top" || isPhysicalLeft;
  const element = useRenderElement("nav", componentProps, {
    state,
    ref: [forwardedRef, setPopupElement],
    props: [{
      id,
      tabIndex: -1,
      style: isOriginSide ? {
        position: "absolute",
        [positioning.side === "top" ? "bottom" : "top"]: "0",
        [isPhysicalLeft ? "right" : "left"]: "0"
      } : {}
    }, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping: popupTransitionStateMapping
  });
  return element;
});
const NavigationMenuLink$1 = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuLink2(componentProps, forwardedRef) {
  const {
    className,
    render,
    active = false,
    closeOnClick = false,
    style,
    ...elementProps
  } = componentProps;
  const {
    setValue,
    popupElement,
    positionerElement,
    rootRef
  } = useNavigationMenuRootContext();
  const nodeId = useNavigationMenuTreeContext();
  const tree = useFloatingTree();
  const state = {
    active
  };
  const defaultProps = {
    "aria-current": active ? "page" : void 0,
    tabIndex: void 0,
    onClick(event) {
      if (closeOnClick) {
        setValue(null, createChangeEventDetails(linkPress, event.nativeEvent));
      }
    },
    onBlur(event) {
      if (positionerElement && popupElement && isOutsideMenuEvent({
        currentTarget: event.currentTarget,
        relatedTarget: event.relatedTarget
      }, {
        popupElement,
        rootRef,
        tree,
        nodeId
      })) {
        setValue(null, createChangeEventDetails(focusOut, event.nativeEvent));
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeItem, {
    tag: "a",
    render,
    className,
    style,
    state,
    refs: [forwardedRef],
    props: [defaultProps, elementProps]
  });
});
const NavigationMenuIcon = /* @__PURE__ */ reactExports.forwardRef(function NavigationMenuIcon2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    value: itemValue
  } = useNavigationMenuItemContext();
  const {
    open,
    value
  } = useNavigationMenuRootContext();
  const isActiveItem = open && value === itemValue;
  const state = {
    open: isActiveItem
  };
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: "▼"
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    NavigationMenuRoot,
    {
      className: cn("relative flex max-w-max items-center", className),
      "data-slot": "navigation-menu",
      ...props,
      children: [
        children,
        viewport ? /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuViewport, {}) : null
      ]
    }
  );
}
function NavigationMenuList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NavigationMenuList$1,
    {
      className: cn("flex list-none items-center gap-0.5", className),
      "data-slot": "navigation-menu-list",
      ...props
    }
  );
}
function NavigationMenuItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NavigationMenuItem$1,
    {
      className: cn("relative", className),
      "data-slot": "navigation-menu-item",
      ...props
    }
  );
}
const navigationMenuTriggerStyle = cva(
  "relative inline-flex h-9 w-max shrink-0 cursor-default select-none items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-transparent px-[calc(--spacing(3)-1px)] py-0 font-medium text-base text-foreground no-underline outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:pointer-events-none data-active:bg-accent data-popup-open:bg-accent data-pressed:bg-accent data-disabled:opacity-64 sm:h-8 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0"
);
function NavigationMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    NavigationMenuTrigger$1,
    {
      className: cn(navigationMenuTriggerStyle(), className),
      "data-slot": "navigation-menu-trigger",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          NavigationMenuIcon,
          {
            className: "-me-1 inline-flex transition-transform duration-(--qy-duration-base) data-popup-open:rotate-180",
            "data-slot": "navigation-menu-icon",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { "aria-hidden": "true", className: "size-4 sm:size-3.5" })
          }
        )
      ]
    }
  );
}
function NavigationMenuContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NavigationMenuContent$1,
    {
      className: cn(
        "w-max max-w-[calc(100vw-2rem)] p-1 transition-[opacity,translate] duration-(--qy-duration-base) data-ending-style:opacity-0 data-starting-style:opacity-0 data-starting-style:data-[activation-direction=left]:-translate-x-6 data-starting-style:data-[activation-direction=right]:translate-x-6 data-ending-style:data-[activation-direction=left]:translate-x-6 data-ending-style:data-[activation-direction=right]:-translate-x-6",
        className
      ),
      "data-slot": "navigation-menu-content",
      ...props
    }
  );
}
function NavigationMenuViewport({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 8,
  alignOffset = 0,
  collisionPadding = 16,
  portalProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuPortal, { ...portalProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    NavigationMenuPositioner,
    {
      align,
      alignOffset,
      className: "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--qy-duration-base) before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:-top-2 data-[side=bottom]:before:h-2 data-[side=top]:before:inset-x-0 data-[side=top]:before:-bottom-2 data-[side=top]:before:h-2",
      collisionAvoidance: { side: "none" },
      collisionPadding,
      "data-slot": "navigation-menu-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NavigationMenuPopup,
        {
          className: cn(
            "relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[width,height,scale,opacity] duration-(--qy-duration-base) before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-(--qy-duration-fast) dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "navigation-menu-popup",
          ...props,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            NavigationMenuViewport$1,
            {
              className: "relative size-full overflow-hidden rounded-[calc(var(--radius-lg)-1px)]",
              "data-slot": "navigation-menu-viewport"
            }
          )
        }
      )
    }
  ) });
}
function NavigationMenuLink({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    NavigationMenuLink$1,
    {
      className: cn(
        "grid grid-cols-[minmax(0,1fr)] content-start items-center gap-x-3 gap-y-0.5 rounded-sm px-2.5 py-2 text-base text-foreground no-underline outline-none transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:ring-2 focus-visible:ring-ring data-active:bg-accent has-data-[slot=navigation-menu-link-icon]:grid-cols-[auto_minmax(0,1fr)] sm:text-sm",
        className
      ),
      "data-slot": "navigation-menu-link",
      ...props
    }
  );
}
function NavigationMenuLinkIcon({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-hidden": "true",
      className: cn(
        "row-span-2 flex size-9 shrink-0 items-center justify-center self-start rounded-md border bg-background not-dark:bg-clip-padding text-foreground shadow-xs/5 dark:bg-input/32 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "navigation-menu-link-icon",
      ...props
    }
  );
}
function NavigationMenuLinkTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn("truncate font-medium leading-5", className),
      "data-slot": "navigation-menu-link-title",
      ...props
    }
  );
}
function NavigationMenuLinkDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "line-clamp-2 text-pretty text-muted-foreground text-sm sm:text-xs",
        className
      ),
      "data-slot": "navigation-menu-link-description",
      ...props
    }
  );
}
export {
  NavigationMenu as N,
  NavigationMenuList as a,
  NavigationMenuItem as b,
  NavigationMenuTrigger as c,
  NavigationMenuContent as d,
  NavigationMenuLink as e,
  NavigationMenuLinkIcon as f,
  NavigationMenuLinkTitle as g,
  NavigationMenuLinkDescription as h,
  navigationMenuTriggerStyle as n
};
