import { bJ as isElement, r as reactExports, V as formatErrorMessage, ar as ReactStore, cI as popupStoreSelectors, dq as applyPopupOpenChange, cJ as triggerHover, cN as createInitialPopupStoreState, cO as createPopupFloatingRootContext, cR as PopupTriggerMap, dr as fastComponent, j as jsxRuntimeExports, cS as FloatingTree, cY as usePopupRootStore, cU as useImplicitActiveTrigger, cV as useOpenStateTransitions, a3 as useIsoLayoutEffect, aJ as createChangeEventDetails, cW as imperativeAction, cX as PopupHandleAttachment, aC as useDismiss, cZ as usePopupInteractionProps, ds as FloatingPortalLite, dt as fastComponentRef, c_ as usePopupHandleStore, a1 as useBaseUiId, c$ as useTriggerDataForwarding, d0 as useHoverReferenceInteraction, d1 as safePolygon, du as useFocus, Y as useRenderElement, aQ as triggerOpenStateMapping, d6 as POPUP_COLLISION_AVOIDANCE, d7 as useFloatingNodeId, aU as useAnchorPositioning, aV as usePositioner, d8 as FloatingNode, ad as useOpenChangeComplete, d9 as useHoverFloatingInteraction, aF as FOCUSABLE_POPUP_PROPS, db as popupTransitionStateMapping, bb as getDisabledMountTransitionStyles, e as cn } from "./index-DM02Iz28.js";
function createRect(left, top, right, bottom) {
  return {
    left,
    top,
    right,
    bottom,
    x: left,
    y: top,
    width: right - left,
    height: bottom - top
  };
}
function copyRect(rect) {
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: rect.width,
    height: rect.height
  };
}
function getLineRects(rects) {
  const lines = [];
  let previousRect;
  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;
  for (const rect of Array.from(rects).sort((a, b) => a.top - b.top)) {
    left = Math.min(left, rect.left);
    top = Math.min(top, rect.top);
    right = Math.max(right, rect.right);
    bottom = Math.max(bottom, rect.bottom);
    if (!previousRect || rect.top - previousRect.top > previousRect.height / 2) {
      lines.push(copyRect(rect));
    } else {
      const line = lines[lines.length - 1];
      line.left = Math.min(line.left, rect.left);
      line.right = Math.max(line.right, rect.right);
      line.bottom = Math.max(line.bottom, rect.bottom);
      line.width = line.right - line.left;
      line.height = line.bottom - line.top;
    }
    previousRect = rect;
  }
  return {
    lines,
    fallback: createRect(left, top, right, bottom)
  };
}
function findLineIndex(lines, x, y) {
  return lines.findIndex((lineRect) => x > lineRect.left - 2 && x < lineRect.right + 2 && y > lineRect.top - 2 && y < lineRect.bottom + 2);
}
function createClientRect(rect) {
  return createRect(rect.left, rect.top, rect.right, rect.bottom);
}
function getInlineRectCoords(element, clientX, clientY) {
  const {
    lines
  } = getLineRects(element.getClientRects());
  if (lines.length < 2) {
    return void 0;
  }
  const lineIndex = findLineIndex(lines, clientX, clientY);
  return {
    x: clientX,
    y: clientY,
    lineIndex: lineIndex === -1 ? void 0 : lineIndex,
    element
  };
}
function getInlineReferenceRect(reference, placement, coords) {
  const {
    lines,
    fallback
  } = getLineRects(reference.getClientRects());
  if (lines.length < 2) {
    return null;
  }
  const x = coords?.x;
  const y = coords?.y;
  const side = placement[0];
  if (coords?.lineIndex != null && lines[coords.lineIndex]) {
    return createClientRect(lines[coords.lineIndex]);
  }
  if (x != null && y != null) {
    const lineIndex = findLineIndex(lines, x, y);
    if (lineIndex !== -1) {
      return createClientRect(lines[lineIndex]);
    }
  }
  if (lines.length === 2 && lines[0].left > lines[1].right && x != null && y != null) {
    return fallback;
  }
  if (side === "t" || side === "b") {
    const firstRect = lines[0];
    const lastRect = lines[lines.length - 1];
    const targetRect = side === "t" ? firstRect : lastRect;
    return createRect(targetRect.left, firstRect.top, targetRect.right, lastRect.bottom);
  }
  const isLeft = side === "l";
  let left = lines[0].left;
  let right = lines[0].right;
  let edge = isLeft ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
  let targetFirstRect = lines[0];
  let targetLastRect = lines[0];
  for (const rect of lines) {
    left = Math.min(left, rect.left);
    right = Math.max(right, rect.right);
    const nextEdge = isLeft ? rect.left : rect.right;
    if (isLeft && nextEdge < edge || !isLeft && nextEdge > edge) {
      edge = nextEdge;
      targetFirstRect = rect;
      targetLastRect = rect;
    } else if (nextEdge === edge) {
      targetLastRect = rect;
    }
  }
  return createRect(left, targetFirstRect.top, right, targetLastRect.bottom);
}
function getContextElement(reference) {
  if ("contextElement" in reference && reference.contextElement) {
    return reference.contextElement;
  }
  return isElement(reference) ? reference : void 0;
}
function getInlineRectTriggerProps(coordsRef, isOpen) {
  function updateCoords(event) {
    updateInlineRectCoords(coordsRef, event.currentTarget, event.clientX, event.clientY);
  }
  function updateCoordsIfClosed(event) {
    if (!isOpen) {
      updateCoords(event);
    }
  }
  return {
    onFocus() {
      coordsRef.current = void 0;
    },
    onMouseEnter: updateCoordsIfClosed,
    onMouseMove: updateCoordsIfClosed
  };
}
function updateInlineRectCoords(coordsRef, element, clientX, clientY) {
  const nextCoords = getInlineRectCoords(element, clientX, clientY);
  coordsRef.current = nextCoords;
  return nextCoords;
}
function createInlineMiddleware(coordsRef) {
  return {
    name: "inline",
    async fn(state) {
      const reference = state.elements.reference;
      if (typeof reference?.getClientRects !== "function") {
        return {};
      }
      const contextElement = getContextElement(reference);
      const coords = coordsRef.current;
      const currentCoords = coords?.element === reference || coords?.element === contextElement ? coords : void 0;
      const rect = getInlineReferenceRect(reference, state.placement, currentCoords);
      if (!rect || typeof state.platform.getElementRects !== "function") {
        return {};
      }
      const resetRects = await state.platform.getElementRects({
        reference: {
          contextElement,
          getBoundingClientRect() {
            return rect;
          }
        },
        floating: state.elements.floating,
        strategy: state.strategy
      });
      if (state.rects.reference.x === resetRects.reference.x && state.rects.reference.y === resetRects.reference.y && state.rects.reference.width === resetRects.reference.width && state.rects.reference.height === resetRects.reference.height) {
        return {};
      }
      return {
        reset: {
          rects: resetRects
        }
      };
    }
  };
}
const PreviewCardRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function usePreviewCardRootContext(optional) {
  const context = reactExports.useContext(PreviewCardRootContext);
  if (context === void 0 && !optional) {
    throw new Error(formatErrorMessage(50));
  }
  return context;
}
const OPEN_DELAY = 600;
const CLOSE_DELAY = 300;
const selectors = {
  ...popupStoreSelectors,
  instantType: (state) => state.instantType,
  adaptiveOrigin: (state) => state.adaptiveOrigin,
  closeDelay: (state) => state.closeDelay
};
class PreviewCardStore extends ReactStore {
  constructor(initialState, floatingId, nested) {
    const triggerElements = new PopupTriggerMap();
    super(createInitialState(initialState, triggerElements, floatingId, nested), createInitialContext(triggerElements), selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    const {
      inlineRectCoordsRef
    } = this.context;
    applyPopupOpenChange(this, nextOpen, eventDetails, {
      onBeforeDispatch() {
        const event = eventDetails.event;
        if (nextOpen && eventDetails.reason === triggerHover && eventDetails.trigger && "clientX" in event && "clientY" in event && inlineRectCoordsRef.current?.element !== eventDetails.trigger) {
          updateInlineRectCoords(inlineRectCoordsRef, eventDetails.trigger, event.clientX, event.clientY);
        }
      }
    });
  };
}
function createInitialState(initialState, triggerElements, floatingId, nested = false) {
  const state = {
    ...createInitialPopupStoreState(),
    instantType: void 0,
    adaptiveOrigin: void 0,
    closeDelay: CLOSE_DELAY,
    ...initialState
  };
  state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested);
  return state;
}
function createInitialContext(triggerElements) {
  return {
    popupRef: /* @__PURE__ */ reactExports.createRef(),
    onOpenChange: void 0,
    onOpenChangeComplete: void 0,
    triggerElements,
    inlineRectCoordsRef: {
      current: void 0
    }
  };
}
function PreviewCardRootComponent(props) {
  const {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    actionsRef,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null,
    children
  } = props;
  const store = usePopupRootStore((floatingId, nested) => new PreviewCardStore({
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp
  }, floatingId, nested));
  store.useControlledProp("openProp", openProp);
  store.useControlledProp("triggerIdProp", triggerIdProp);
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  const open = store.useState("open");
  const activeTriggerId = store.useState("activeTriggerId");
  const mounted = store.useState("mounted");
  const payload = store.useState("payload");
  useImplicitActiveTrigger(store, {
    closeOnActiveTriggerUnmount: true
  });
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store, () => {
    store.context.inlineRectCoordsRef.current = void 0;
  });
  useIsoLayoutEffect(() => {
    if (open) {
      if (activeTriggerId == null) {
        store.set("payload", void 0);
      }
    }
  }, [store, activeTriggerId, open]);
  reactExports.useImperativeHandle(actionsRef, () => ({
    unmount: forceUnmount,
    close: () => store.setOpen(false, createChangeEventDetails(imperativeAction))
  }), [forceUnmount, store]);
  const shouldRenderInteractions = open || mounted;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PreviewCardRootContext.Provider, {
    value: store,
    children: [handle && /* @__PURE__ */ jsxRuntimeExports.jsx(PopupHandleAttachment, {
      handle,
      store
    }), shouldRenderInteractions && /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardInteractions, {
      store
    }), typeof children === "function" ? children({
      payload
    }) : children]
  });
}
function PreviewCardInteractions({
  store
}) {
  const floatingRootContext = store.useState("floatingRootContext");
  const dismiss = useDismiss(floatingRootContext);
  usePopupInteractionProps(store, {
    activeTriggerProps: dismiss.reference,
    inactiveTriggerProps: dismiss.trigger,
    popupProps: dismiss.floating
  });
  return null;
}
const PreviewCardRoot = fastComponent(function PreviewCardRoot2(props) {
  if (usePreviewCardRootContext(true)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardRootComponent, {
      ...props
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTree, {
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardRootComponent, {
      ...props
    })
  });
});
const PreviewCardPortalContext = /* @__PURE__ */ reactExports.createContext(void 0);
function usePreviewCardPortalContext() {
  const value = reactExports.useContext(PreviewCardPortalContext);
  if (value === void 0) {
    throw new Error(formatErrorMessage(48));
  }
  return value;
}
const PreviewCardPortal = /* @__PURE__ */ reactExports.forwardRef(function PreviewCardPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const store = usePreviewCardRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPortalLite, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
const PreviewCardTrigger$1 = fastComponentRef(function PreviewCardTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    delay,
    closeDelay,
    id: idProp,
    payload,
    handle,
    style,
    ...elementProps
  } = componentProps;
  const rootContext = usePreviewCardRootContext(true);
  const handleStore = usePopupHandleStore(handle);
  const store = handleStore ?? rootContext;
  if (!store) {
    throw new Error(formatErrorMessage(89));
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const floatingRootContext = store.useState("floatingRootContext");
  const inlineRectCoordsRef = store.context.inlineRectCoordsRef;
  const triggerElementRef = reactExports.useRef(null);
  const delayWithDefault = delay ?? OPEN_DELAY;
  const closeDelayWithDefault = closeDelay ?? CLOSE_DELAY;
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload,
    closeDelay: closeDelayWithDefault
  });
  const hoverProps = useHoverReferenceInteraction(floatingRootContext, {
    mouseOnly: true,
    move: false,
    handleClose: safePolygon(),
    delay: () => ({
      open: delayWithDefault,
      close: closeDelayWithDefault
    }),
    triggerElementRef,
    isActiveTrigger: isTriggerActive,
    isClosing: () => store.select("transitionStatus") === "ending"
  });
  const focusProps = useFocus(floatingRootContext, {
    delay: delayWithDefault
  });
  const state = {
    open: isOpenedByThisTrigger
  };
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const inlineRectTriggerProps = getInlineRectTriggerProps(inlineRectCoordsRef, isOpenedByThisTrigger);
  const element = useRenderElement("a", componentProps, {
    state,
    ref: [forwardedRef, registerTrigger, triggerElementRef],
    props: [hoverProps, focusProps.reference, rootTriggerProps, inlineRectTriggerProps, {
      id: thisTriggerId
    }, elementProps],
    stateAttributesMapping: triggerOpenStateMapping
  });
  return element;
});
const PreviewCardPositionerContext = /* @__PURE__ */ reactExports.createContext(void 0);
function usePreviewCardPositionerContext() {
  const context = reactExports.useContext(PreviewCardPositionerContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(49));
  }
  return context;
}
const PreviewCardPositioner = /* @__PURE__ */ reactExports.forwardRef(function PreviewCardPositioner2(componentProps, forwardedRef) {
  const {
    render,
    className,
    anchor,
    positionMethod = "absolute",
    side = "bottom",
    align = "center",
    sideOffset = 0,
    alignOffset = 0,
    collisionBoundary = "clipping-ancestors",
    collisionPadding = 5,
    arrowPadding = 5,
    sticky = false,
    disableAnchorTracking = false,
    collisionAvoidance = POPUP_COLLISION_AVOIDANCE,
    style,
    ...elementProps
  } = componentProps;
  const store = usePreviewCardRootContext();
  const keepMounted = usePreviewCardPortalContext();
  const nodeId = useFloatingNodeId();
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const floatingRootContext = store.useState("floatingRootContext");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const adaptiveOrigin = store.useState("adaptiveOrigin");
  const inlineRectCoordsRef = store.context.inlineRectCoordsRef;
  const positioning = useAnchorPositioning({
    anchor,
    floatingRootContext,
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
    nodeId,
    collisionAvoidance,
    adaptiveOrigin,
    inline: createInlineMiddleware(inlineRectCoordsRef)
  });
  const updatePosition = positioning.update;
  useIsoLayoutEffect(() => {
    if (open && mounted) {
      updatePosition();
    }
  }, [open, mounted, updatePosition]);
  const state = {
    open,
    side: positioning.side,
    align: positioning.align,
    anchorHidden: positioning.anchorHidden,
    instant: instantType
  };
  const element = usePositioner(componentProps, state, {
    styles: positioning.positionerStyles,
    transitionStatus,
    props: elementProps,
    refs: [forwardedRef, store.useStateSetter("positionerElement")],
    hidden: !mounted,
    inert: !open
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardPositionerContext.Provider, {
    value: positioning,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingNode, {
      id: nodeId,
      children: element
    })
  });
});
const PreviewCardPopup$1 = /* @__PURE__ */ reactExports.forwardRef(function PreviewCardPopup2(componentProps, forwardedRef) {
  const {
    className,
    render,
    style,
    ...elementProps
  } = componentProps;
  const store = usePreviewCardRootContext();
  const {
    side,
    align
  } = usePreviewCardPositionerContext();
  const open = store.useState("open");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const floatingContext = store.useState("floatingRootContext");
  const closeDelay = store.useState("closeDelay");
  useOpenChangeComplete({
    open,
    ref: store.context.popupRef,
    onComplete() {
      if (open) {
        store.context.onOpenChangeComplete?.(true);
      }
    }
  });
  useHoverFloatingInteraction(floatingContext, {
    closeDelay
  });
  const state = {
    open,
    side,
    align,
    instant: instantType,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, store.useStateSetter("popupElement")],
    props: [FOCUSABLE_POPUP_PROPS, popupProps, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping: popupTransitionStateMapping
  });
  return element;
});
const PreviewCard = PreviewCardRoot;
function PreviewCardTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardTrigger$1, { "data-slot": "preview-card-trigger", ...props });
}
function PreviewCardPopup({
  className,
  children,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  anchor,
  portalProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardPortal, { ...portalProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PreviewCardPositioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50",
      "data-slot": "preview-card-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PreviewCardPopup$1,
        {
          className: cn(
            "relative flex w-64 origin-(--transform-origin) text-balance rounded-lg border bg-popover not-dark:bg-clip-padding p-4 text-popover-foreground text-sm shadow-lg/5 transition-[scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "preview-card-content",
          ...props,
          children
        }
      )
    }
  ) });
}
export {
  PreviewCard as P,
  PreviewCardTrigger as a,
  PreviewCardPopup as b
};
