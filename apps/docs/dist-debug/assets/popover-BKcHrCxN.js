import { r as reactExports, V as formatErrorMessage, ar as ReactStore, cI as popupStoreSelectors, cJ as triggerHover, c8 as triggerPress, bC as escapeKey, cK as attachPreventUnmountOnClose, bG as closePress, cL as PATIENT_CLICK_THRESHOLD, bN as reactDomExports, aw as focusOut, cM as setPopupOpenState, cN as createInitialPopupStoreState, cO as createPopupFloatingRootContext, cP as Timeout, cQ as NullStore, cR as PopupTriggerMap, ab as NOOP, j as jsxRuntimeExports, cS as FloatingTree, cT as usePopupRootSync, cU as useImplicitActiveTrigger, cV as useOpenStateTransitions, aJ as createChangeEventDetails, cW as imperativeAction, cX as PopupHandleAttachment, cY as usePopupRootStore, aC as useDismiss, cZ as usePopupInteractionProps, c_ as usePopupHandleStore, a1 as useBaseUiId, c$ as useTriggerDataForwarding, d0 as useHoverReferenceInteraction, d1 as safePolygon, aB as useClick, d2 as useOpenMethodTriggerProps, a2 as useButton, d3 as useTriggerFocusGuards, Y as useRenderElement, d4 as CLICK_TRIGGER_IDENTIFIER, d5 as FocusGuard, aM as pressableTriggerOpenStateMapping, aQ as triggerOpenStateMapping, aR as FloatingPortal, d6 as POPUP_COLLISION_AVOIDANCE, d7 as useFloatingNodeId, ca as useAnimationsFinished, aU as useAnchorPositioning, a3 as useIsoLayoutEffect, aT as useAnchoredPopupScrollLock, aV as usePositioner, aW as InternalBackdrop, aX as inertValue, d8 as FloatingNode, X as useStableCallback, aY as useToolbarRootContext, ad as useOpenChangeComplete, d9 as useHoverFloatingInteraction, da as createDefaultInitialFocus, aF as FOCUSABLE_POPUP_PROPS, bc as COMPOSITE_KEYS, bb as getDisabledMountTransitionStyles, b6 as FloatingFocusManager, ao as isHTMLElement, db as popupTransitionStateMapping, dc as usePopupViewport, dd as popupViewportStateMapping, de as BasePopupHandle, e as cn } from "./index-DM02Iz28.js";
const PopoverRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function usePopoverRootContext(optional) {
  const context = reactExports.useContext(PopoverRootContext);
  if (context === void 0 && !optional) {
    throw new Error(formatErrorMessage(47));
  }
  return context;
}
const selectors = {
  ...popupStoreSelectors,
  disabled: (state) => state.disabled,
  instantType: (state) => state.instantType,
  openMethod: (state) => state.openMethod,
  openChangeReason: (state) => state.openChangeReason,
  modal: (state) => state.modal,
  focusManagerModal: (state) => state.focusManagerModal,
  stickIfOpen: (state) => state.stickIfOpen,
  titleElementId: (state) => state.titleElementId,
  descriptionElementId: (state) => state.descriptionElementId,
  openOnHover: (state) => state.openOnHover,
  closeDelay: (state) => state.closeDelay,
  adaptiveOrigin: (state) => state.adaptiveOrigin
};
class PopoverStore extends ReactStore {
  constructor(initialState, floatingId, nested) {
    const triggerElements = new PopupTriggerMap();
    super(createInitialState(initialState, triggerElements, floatingId, nested), createInitialContext(triggerElements), selectors);
  }
  setOpen = (nextOpen, eventDetails) => {
    const isHover = eventDetails.reason === triggerHover;
    const isKeyboardClick = eventDetails.reason === triggerPress && eventDetails.event.detail === 0;
    const isDismissClose = !nextOpen && (eventDetails.reason === escapeKey || eventDetails.reason == null);
    const shouldPreventUnmountOnClose = attachPreventUnmountOnClose(eventDetails);
    const activeTriggerId = this.select("activeTriggerId");
    if (!nextOpen && eventDetails.reason === closePress && eventDetails.trigger == null && activeTriggerId != null) {
      eventDetails.trigger = this.context.triggerElements.getById(activeTriggerId) ?? this.select("activeTriggerElement") ?? void 0;
    }
    this.context.onOpenChange?.(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    this.state.floatingRootContext.dispatchOpenChange(nextOpen, eventDetails);
    const changeState = () => {
      const updatedState = {
        open: nextOpen,
        openChangeReason: eventDetails.reason
      };
      setPopupOpenState(updatedState, nextOpen, eventDetails.trigger, shouldPreventUnmountOnClose());
      this.update(updatedState);
    };
    if (isHover) {
      this.set("stickIfOpen", true);
      this.context.stickIfOpenTimeout.start(PATIENT_CLICK_THRESHOLD, () => {
        this.set("stickIfOpen", false);
      });
      reactDomExports.flushSync(changeState);
    } else {
      changeState();
    }
    let instantType;
    if (isKeyboardClick) {
      instantType = "click";
    } else if (isDismissClose) {
      instantType = "dismiss";
    } else if (eventDetails.reason === focusOut) {
      instantType = "focus";
    }
    this.set("instantType", instantType);
  };
}
function createNullPopoverStore() {
  const triggerElements = new PopupTriggerMap();
  const store = new NullStore(Object.freeze(createInitialState(void 0, triggerElements)), Object.freeze(createInitialContext(triggerElements)), selectors);
  return Object.assign(store, {
    setOpen: NOOP
  });
}
function createInitialState(initialState, triggerElements, floatingId, nested = false) {
  const state = {
    ...createInitialPopupStoreState(),
    disabled: false,
    modal: false,
    focusManagerModal: false,
    instantType: void 0,
    openMethod: null,
    openChangeReason: null,
    titleElementId: void 0,
    descriptionElementId: void 0,
    stickIfOpen: true,
    openOnHover: false,
    closeDelay: 0,
    adaptiveOrigin: void 0,
    ...initialState
  };
  if (state.open && initialState?.mounted === void 0) {
    state.mounted = true;
  }
  state.floatingRootContext = createPopupFloatingRootContext(triggerElements, floatingId, nested);
  return state;
}
function createInitialContext(triggerElements) {
  return {
    popupRef: /* @__PURE__ */ reactExports.createRef(),
    onOpenChange: void 0,
    onOpenChangeComplete: void 0,
    triggerFocusTargetRef: /* @__PURE__ */ reactExports.createRef(),
    beforeContentFocusGuardRef: /* @__PURE__ */ reactExports.createRef(),
    stickIfOpenTimeout: new Timeout(),
    triggerElements
  };
}
function PopoverRootComponent({
  props
}) {
  const {
    children,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    onOpenChangeComplete,
    modal = false,
    handle,
    triggerId: triggerIdProp,
    defaultTriggerId: defaultTriggerIdProp = null
  } = props;
  const store = usePopoverRootStore(handle, {
    modal,
    open: defaultOpen,
    openProp,
    activeTriggerId: defaultTriggerIdProp,
    triggerIdProp
  });
  store.useControlledProp("openProp", openProp);
  store.useControlledProp("triggerIdProp", triggerIdProp);
  const open = store.useState("open");
  const mounted = store.useState("mounted");
  const payload = store.useState("payload");
  store.useContextCallback("onOpenChange", onOpenChange);
  store.useContextCallback("onOpenChangeComplete", onOpenChangeComplete);
  usePopupRootSync(store, open);
  useImplicitActiveTrigger(store);
  const {
    forceUnmount
  } = useOpenStateTransitions(open, store, () => {
    store.update({
      stickIfOpen: true,
      openChangeReason: null
    });
  });
  store.useSyncedValues({
    modal
  });
  reactExports.useEffect(() => {
    if (!open) {
      store.context.stickIfOpenTimeout.clear();
    }
  }, [store, open]);
  reactExports.useImperativeHandle(props.actionsRef, () => ({
    unmount: forceUnmount,
    close: () => store.setOpen(false, createChangeEventDetails(imperativeAction))
  }), [forceUnmount, store]);
  const shouldRenderInteractions = open || mounted;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverRootContext.Provider, {
    value: store,
    children: [handle && /* @__PURE__ */ jsxRuntimeExports.jsx(PopupHandleAttachment, {
      handle,
      store
    }), shouldRenderInteractions && /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverInteractions, {
      store,
      modal
    }), typeof children === "function" ? children({
      payload
    }) : children]
  });
}
function PopoverRoot(props) {
  if (usePopoverRootContext(true)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverRootComponent, {
      props
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTree, {
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverRootComponent, {
      props
    })
  });
}
function usePopoverRootStore(handle, initialState) {
  const store = usePopupRootStore((floatingId, nested) => new PopoverStore(initialState, floatingId, nested));
  reactExports.useEffect(() => store.context.stickIfOpenTimeout.disposeEffect(), [store]);
  return store;
}
function PopoverInteractions({
  store,
  modal
}) {
  const floatingRootContext = store.useState("floatingRootContext");
  const dismiss = useDismiss(floatingRootContext, {
    outsidePressEvent: {
      // Ensure `aria-hidden` on outside elements is removed immediately
      // on outside press when trapping focus.
      mouse: modal === "trap-focus" ? "sloppy" : "intentional",
      touch: "sloppy"
    }
  });
  const triggerProps = dismiss.reference;
  const popupProps = dismiss.floating;
  usePopupInteractionProps(store, {
    activeTriggerProps: triggerProps,
    inactiveTriggerProps: triggerProps,
    popupProps
  });
  return null;
}
const OPEN_DELAY = 300;
const PopoverTrigger$1 = /* @__PURE__ */ reactExports.forwardRef(function PopoverTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled = false,
    nativeButton = true,
    handle,
    payload,
    openOnHover = false,
    delay = OPEN_DELAY,
    closeDelay = 0,
    id: idProp,
    ...elementProps
  } = componentProps;
  const rootStore = usePopoverRootContext(true);
  const handleStore = usePopupHandleStore(handle);
  const store = handleStore ?? rootStore;
  if (!store) {
    throw new Error(formatErrorMessage(74));
  }
  const thisTriggerId = useBaseUiId(idProp);
  const isTriggerActive = store.useState("isTriggerActive", thisTriggerId);
  const floatingContext = store.useState("floatingRootContext");
  const isOpenedByThisTrigger = store.useState("isOpenedByTrigger", thisTriggerId);
  const popupId = store.useState("triggerPopupId", thisTriggerId);
  const triggerElementRef = reactExports.useRef(null);
  const {
    registerTrigger,
    isMountedByThisTrigger
  } = useTriggerDataForwarding(thisTriggerId, triggerElementRef, store, {
    payload,
    disabled,
    openOnHover,
    closeDelay
  });
  const openReason = store.useState("openChangeReason");
  const stickIfOpen = store.useState("stickIfOpen");
  const openMethod = store.useState("openMethod");
  const focusManagerModal = store.useState("focusManagerModal");
  const hoverProps = useHoverReferenceInteraction(floatingContext, {
    enabled: !disabled && openOnHover && (openMethod !== "touch" || openReason !== triggerPress),
    mouseOnly: true,
    move: false,
    handleClose: safePolygon(),
    restMs: delay,
    delay: {
      close: closeDelay
    },
    triggerElementRef,
    isActiveTrigger: isTriggerActive,
    isClosing: () => store.select("transitionStatus") === "ending"
  });
  const click = useClick(floatingContext, {
    stickIfOpen
  });
  const interactionTypeProps = useOpenMethodTriggerProps(() => store.select("open"), (interactionType) => {
    store.set("openMethod", interactionType);
  });
  const rootTriggerProps = store.useState("triggerProps", isMountedByThisTrigger);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    native: nativeButton
  });
  const stateAttributesMapping = {
    open(value) {
      if (value && openReason === triggerPress) {
        return pressableTriggerOpenStateMapping.open(value);
      }
      return triggerOpenStateMapping.open(value);
    }
  };
  const {
    preFocusGuardRef,
    handlePreFocusGuardFocus,
    handleFocusTargetFocus
  } = useTriggerFocusGuards(store, triggerElementRef);
  const state = {
    disabled,
    open: isOpenedByThisTrigger
  };
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [buttonRef, forwardedRef, registerTrigger, triggerElementRef],
    props: [click.reference, hoverProps, rootTriggerProps, interactionTypeProps, {
      [CLICK_TRIGGER_IDENTIFIER]: "",
      id: thisTriggerId,
      "aria-haspopup": "dialog",
      "aria-expanded": isOpenedByThisTrigger,
      "aria-controls": popupId
    }, elementProps, getButtonProps],
    stateAttributesMapping
  });
  const keyedElement = /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, {
    children: element
  }, thisTriggerId);
  if (isMountedByThisTrigger && !focusManagerModal) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
        ref: preFocusGuardRef,
        onFocus: handlePreFocusGuardFocus
      }), keyedElement, /* @__PURE__ */ jsxRuntimeExports.jsx(FocusGuard, {
        ref: store.context.triggerFocusTargetRef,
        onFocus: handleFocusTargetFocus
      })]
    });
  }
  return keyedElement;
});
const PopoverPortalContext = /* @__PURE__ */ reactExports.createContext(void 0);
function usePopoverPortalContext() {
  const value = reactExports.useContext(PopoverPortalContext);
  if (value === void 0) {
    throw new Error(formatErrorMessage(45));
  }
  return value;
}
const PopoverPortal = /* @__PURE__ */ reactExports.forwardRef(function PopoverPortal2(props, forwardedRef) {
  const {
    keepMounted = false,
    ...portalProps
  } = props;
  const store = usePopoverRootContext();
  const mounted = store.useState("mounted");
  const shouldRender = mounted || keepMounted;
  if (!shouldRender) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverPortalContext.Provider, {
    value: keepMounted,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingPortal, {
      ref: forwardedRef,
      ...portalProps
    })
  });
});
const PopoverPositionerContext = /* @__PURE__ */ reactExports.createContext(void 0);
function usePopoverPositionerContext() {
  const context = reactExports.useContext(PopoverPositionerContext);
  if (!context) {
    throw new Error(formatErrorMessage(46));
  }
  return context;
}
const PopoverPositioner = /* @__PURE__ */ reactExports.forwardRef(function PopoverPositioner2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    anchor,
    // `useAnchorPositioning` applies the same defaults to the undefined values; the names
    // remain destructured to exclude the props from `elementProps`.
    positionMethod,
    side,
    align,
    sideOffset,
    alignOffset,
    collisionBoundary = "clipping-ancestors",
    collisionPadding,
    arrowPadding,
    sticky,
    disableAnchorTracking = false,
    collisionAvoidance = POPUP_COLLISION_AVOIDANCE,
    ...elementProps
  } = componentProps;
  const store = usePopoverRootContext();
  const keepMounted = usePopoverPortalContext();
  const nodeId = useFloatingNodeId();
  const floatingRootContext = store.useState("floatingRootContext");
  const mounted = store.useState("mounted");
  const open = store.useState("open");
  const openReason = store.useState("openChangeReason");
  const triggerElement = store.useState("activeTriggerElement");
  const modal = store.useState("modal");
  const openMethod = store.useState("openMethod");
  const positionerElement = store.useState("positionerElement");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const adaptiveOrigin = store.useState("adaptiveOrigin");
  const prevTriggerElementRef = reactExports.useRef(null);
  const runOnceAnimationsFinish = useAnimationsFinished(positionerElement);
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
    adaptiveOrigin
  });
  const domReference = floatingRootContext.useState("domReferenceElement");
  useIsoLayoutEffect(() => {
    const currentTriggerElement = domReference;
    const prevTriggerElement = prevTriggerElementRef.current;
    if (currentTriggerElement) {
      prevTriggerElementRef.current = currentTriggerElement;
    }
    if (prevTriggerElement && currentTriggerElement && currentTriggerElement !== prevTriggerElement) {
      store.set("instantType", void 0);
      const ac = new AbortController();
      runOnceAnimationsFinish(() => {
        store.set("instantType", "trigger-change");
      }, ac.signal);
      return () => {
        ac.abort();
      };
    }
    return void 0;
  }, [domReference, runOnceAnimationsFinish, store]);
  const trueModalNonHover = modal === true && openReason !== triggerHover;
  useAnchoredPopupScrollLock(open && trueModalNonHover, openMethod === "touch", positionerElement, triggerElement);
  const setPositionerElement = store.useStateSetter("positionerElement");
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
    refs: [forwardedRef, setPositionerElement],
    hidden: !mounted,
    inert: !open
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverPositionerContext.Provider, {
    value: positioning,
    children: [mounted && trueModalNonHover && /* @__PURE__ */ jsxRuntimeExports.jsx(InternalBackdrop, {
      inert: inertValue(!open),
      cutout: triggerElement
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingNode, {
      id: nodeId,
      children: element
    })]
  });
});
const ClosePartContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useClosePartCount() {
  const [closePartCount, setClosePartCount] = reactExports.useState(0);
  const register = useStableCallback(() => {
    setClosePartCount((count) => count + 1);
    return () => {
      setClosePartCount((count) => Math.max(0, count - 1));
    };
  });
  const context = reactExports.useMemo(() => ({
    register
  }), [register]);
  return {
    context,
    hasClosePart: closePartCount > 0
  };
}
function useClosePartRegistration() {
  const context = reactExports.useContext(ClosePartContext);
  useIsoLayoutEffect(() => {
    return context?.register();
  }, [context]);
}
const PopoverPopup$1 = /* @__PURE__ */ reactExports.forwardRef(function PopoverPopup2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    initialFocus,
    finalFocus,
    ...elementProps
  } = componentProps;
  const store = usePopoverRootContext();
  const positioner = usePopoverPositionerContext();
  const insideToolbar = useToolbarRootContext(true) != null;
  const {
    context: closePartContext,
    hasClosePart
  } = useClosePartCount();
  const open = store.useState("open");
  const openMethod = store.useState("openMethod");
  const instantType = store.useState("instantType");
  const transitionStatus = store.useState("transitionStatus");
  const popupProps = store.useState("popupProps");
  const titleId = store.useState("titleElementId");
  const descriptionId = store.useState("descriptionElementId");
  const modal = store.useState("modal");
  const mounted = store.useState("mounted");
  const openReason = store.useState("openChangeReason");
  const activeTriggerElement = store.useState("activeTriggerElement");
  const floatingContext = store.useState("floatingRootContext");
  const floatingId = floatingContext.useState("floatingId");
  const disabled = store.useState("disabled");
  const openOnHover = store.useState("openOnHover");
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
    enabled: openOnHover && !disabled,
    closeDelay
  });
  const resolvedInitialFocus = initialFocus === void 0 ? createDefaultInitialFocus(store.context.popupRef) : initialFocus;
  const focusManagerModal = modal !== false && hasClosePart;
  store.useSyncedValue("focusManagerModal", focusManagerModal);
  const setPopupElement = store.useStateSetter("popupElement");
  const state = {
    open,
    side: positioner.side,
    align: positioner.align,
    instant: instantType,
    transitionStatus
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [forwardedRef, store.context.popupRef, setPopupElement],
    props: [popupProps, {
      id: floatingId,
      role: "dialog",
      ...FOCUSABLE_POPUP_PROPS,
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
      onKeyDown(event) {
        if (insideToolbar && COMPOSITE_KEYS.has(event.key)) {
          event.stopPropagation();
        }
      }
    }, getDisabledMountTransitionStyles(transitionStatus), elementProps],
    stateAttributesMapping: popupTransitionStateMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingFocusManager, {
    context: floatingContext,
    openInteractionType: openMethod,
    modal: focusManagerModal,
    disabled: !mounted || openReason === triggerHover,
    initialFocus: resolvedInitialFocus,
    returnFocus: finalFocus,
    restoreFocus: "popup",
    previousFocusableElement: isHTMLElement(activeTriggerElement) ? activeTriggerElement : void 0,
    nextFocusableElement: store.context.triggerFocusTargetRef,
    beforeContentFocusGuardRef: store.context.beforeContentFocusGuardRef,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ClosePartContext.Provider, {
      value: closePartContext,
      children: element
    })
  });
});
const PopoverTitle$1 = /* @__PURE__ */ reactExports.forwardRef(function PopoverTitle2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const store = usePopoverRootContext();
  const id = useBaseUiId(elementProps.id);
  store.useSyncedValueWithCleanup("titleElementId", id);
  const element = useRenderElement("h2", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
const PopoverDescription$1 = /* @__PURE__ */ reactExports.forwardRef(function PopoverDescription2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const store = usePopoverRootContext();
  const id = useBaseUiId(elementProps.id);
  store.useSyncedValueWithCleanup("descriptionElementId", id);
  const element = useRenderElement("p", componentProps, {
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
const PopoverClose$1 = /* @__PURE__ */ reactExports.forwardRef(function PopoverClose2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled = false,
    nativeButton = true,
    ...elementProps
  } = componentProps;
  const {
    buttonRef,
    getButtonProps
  } = useButton({
    disabled,
    focusableWhenDisabled: false,
    native: nativeButton
  });
  const store = usePopoverRootContext();
  useClosePartRegistration();
  const element = useRenderElement("button", componentProps, {
    ref: [forwardedRef, buttonRef],
    props: [{
      onClick(event) {
        store.setOpen(false, createChangeEventDetails(closePress, event.nativeEvent));
      }
    }, elementProps, getButtonProps]
  });
  return element;
});
const PopoverViewport = /* @__PURE__ */ reactExports.forwardRef(function PopoverViewport2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    children,
    ...elementProps
  } = componentProps;
  const store = usePopoverRootContext();
  const {
    side
  } = usePopoverPositionerContext();
  const instantType = store.useState("instantType");
  const {
    children: childrenToRender,
    state: viewportState
  } = usePopupViewport({
    store,
    side,
    children
  });
  const state = {
    activationDirection: viewportState.activationDirection,
    transitioning: viewportState.transitioning,
    instant: instantType
  };
  return useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [elementProps, {
      children: childrenToRender
    }],
    stateAttributesMapping: popupViewportStateMapping
  });
});
class PopoverHandle extends BasePopupHandle {
  constructor() {
    super(createNullPopoverStore(), "Popover");
  }
  /**
   * Opens the popover and associates it with the trigger with the given id.
   *
   * This method should only be called in an event handler or an effect (not during rendering).
   *
   * @param triggerId ID of the trigger to associate with the popover. The trigger must be a matching
   * `Popover.Trigger` with this handle passed as a prop.
   */
  open(triggerId) {
    this.openByTrigger(triggerId);
  }
  /**
   * Closes the popover.
   *
   * This method should only be called in an event handler or an effect (not during rendering).
   */
  close() {
    this.closePopup();
  }
  /**
   * Whether the popover is currently open. Returns `false` while no root is attached to the handle.
   */
  get isOpen() {
    return this.attachedStore?.select("open") ?? false;
  }
}
function createPopoverHandle() {
  return new PopoverHandle();
}
const PopoverCreateHandle = createPopoverHandle;
const Popover = PopoverRoot;
function PopoverTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverTrigger$1,
    {
      className,
      "data-slot": "popover-trigger",
      ...props,
      children
    }
  );
}
function PopoverPopup({
  children,
  className,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  alignOffset = 0,
  tooltipStyle = false,
  anchor,
  portalProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverPortal, { ...portalProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverPositioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] data-instant:transition-none",
      "data-slot": "popover-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        PopoverPopup$1,
        {
          className: cn(
            "relative flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[width,height,scale,opacity] before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] has-data-[slot=calendar]:rounded-xl has-data-[slot=calendar]:before:rounded-[calc(var(--radius-xl)-1px)] data-starting-style:scale-98 data-starting-style:opacity-0 dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            tooltipStyle && "w-fit text-balance rounded-md text-xs shadow-md/5 before:rounded-[calc(var(--radius-md)-1px)]",
            className
          ),
          "data-slot": "popover-popup",
          ...props,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PopoverViewport,
            {
              className: cn(
                "relative size-full max-h-(--available-height) overflow-clip px-(--viewport-inline-padding) py-4 [--viewport-inline-padding:--spacing(4)] has-data-[slot=calendar]:p-2 data-instant:transition-none **:data-current:data-ending-style:opacity-0 **:data-current:data-starting-style:opacity-0 **:data-previous:data-ending-style:opacity-0 **:data-previous:data-starting-style:opacity-0 **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding)-2px)] **:data-current:opacity-100 **:data-previous:opacity-100 **:data-current:transition-opacity **:data-previous:transition-opacity",
                tooltipStyle ? "py-1 [--viewport-inline-padding:--spacing(2)]" : "not-data-transitioning:overflow-y-auto"
              ),
              "data-slot": "popover-viewport",
              children
            }
          )
        }
      )
    }
  ) });
}
function PopoverClose({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverClose$1, { "data-slot": "popover-close", ...props });
}
function PopoverTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverTitle$1,
    {
      className: cn("font-semibold text-lg leading-none", className),
      "data-slot": "popover-title",
      ...props
    }
  );
}
function PopoverDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PopoverDescription$1,
    {
      className: cn("text-muted-foreground text-sm", className),
      "data-slot": "popover-description",
      ...props
    }
  );
}
export {
  Popover as P,
  PopoverTrigger as a,
  PopoverPopup as b,
  PopoverTitle as c,
  PopoverDescription as d,
  PopoverClose as e,
  PopoverCreateHandle as f
};
