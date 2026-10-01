import { W as useControlled, ac as useTransitionStatus, a1 as useBaseUiId, r as reactExports, X as useStableCallback, aJ as createChangeEventDetails, c8 as triggerPress, V as formatErrorMessage, c9 as TransitionStatusDataAttributes, a0 as useMergedRefs, au as useValueAsRef, ca as useAnimationsFinished, a3 as useIsoLayoutEffect, ad as useOpenChangeComplete, cb as AnimationFrame, b4 as addEventListener, b0 as getWindow, aK as none } from "./index-DM02Iz28.js";
function useCollapsibleRoot(parameters) {
  const {
    open: openParam,
    defaultOpen,
    onOpenChange,
    disabled
  } = parameters;
  const [open, setOpen] = useControlled({
    controlled: openParam,
    default: defaultOpen,
    name: "Collapsible",
    state: "open"
  });
  const {
    mounted,
    setMounted,
    transitionStatus
  } = useTransitionStatus(open, true, true);
  const defaultPanelId = useBaseUiId();
  const [registeredPanelId, setPanelIdState] = reactExports.useState();
  const panelId = registeredPanelId === null ? void 0 : registeredPanelId ?? defaultPanelId;
  const handleTrigger = useStableCallback((event) => {
    const nextOpen = !open;
    const eventDetails = createChangeEventDetails(triggerPress, event.nativeEvent);
    onOpenChange(nextOpen, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setOpen(nextOpen);
  });
  return reactExports.useMemo(() => ({
    defaultPanelId,
    disabled,
    handleTrigger,
    mounted,
    open,
    panelId,
    setMounted,
    setOpen,
    setPanelIdState,
    transitionStatus
  }), [defaultPanelId, disabled, handleTrigger, mounted, open, panelId, setMounted, setOpen, setPanelIdState, transitionStatus]);
}
const CollapsibleRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useCollapsibleRootContext() {
  const context = reactExports.useContext(CollapsibleRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(15));
  }
  return context;
}
let CollapsiblePanelDataAttributes = (function(CollapsiblePanelDataAttributes2) {
  CollapsiblePanelDataAttributes2["open"] = "data-open";
  CollapsiblePanelDataAttributes2["closed"] = "data-closed";
  CollapsiblePanelDataAttributes2[CollapsiblePanelDataAttributes2["startingStyle"] = TransitionStatusDataAttributes.startingStyle] = "startingStyle";
  CollapsiblePanelDataAttributes2[CollapsiblePanelDataAttributes2["endingStyle"] = TransitionStatusDataAttributes.endingStyle] = "endingStyle";
  return CollapsiblePanelDataAttributes2;
})({});
let CollapsibleTriggerDataAttributes = /* @__PURE__ */ (function(CollapsibleTriggerDataAttributes2) {
  CollapsibleTriggerDataAttributes2["panelOpen"] = "data-panel-open";
  return CollapsibleTriggerDataAttributes2;
})({});
const PANEL_OPEN_HOOK = {
  [CollapsiblePanelDataAttributes.open]: ""
};
const PANEL_CLOSED_HOOK = {
  [CollapsiblePanelDataAttributes.closed]: ""
};
const triggerOpenStateMapping = {
  open(value) {
    if (value) {
      return {
        [CollapsibleTriggerDataAttributes.panelOpen]: ""
      };
    }
    return null;
  }
};
const collapsibleOpenStateMapping = {
  open(value) {
    if (value) {
      return PANEL_OPEN_HOOK;
    }
    return PANEL_CLOSED_HOOK;
  }
};
const EMPTY_DIMENSIONS = {
  height: void 0,
  width: void 0
};
function useCollapsiblePanel(parameters) {
  const {
    externalRef,
    hiddenUntilFound,
    id: idParam,
    keepMounted,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setOpen,
    transitionStatus
  } = parameters;
  const panelRef = reactExports.useRef(null);
  const animationTypeRef = reactExports.useRef(null);
  const [dimensions, setDimensionsUnwrapped] = reactExports.useState(EMPTY_DIMENSIONS);
  const lastMeasuredDimensionsRef = reactExports.useRef(EMPTY_DIMENSIONS);
  const shouldSkipNextOpenRef = reactExports.useRef(false);
  const shouldPreventMountAnimationRef = reactExports.useRef(open);
  const shouldPreventActivityResumeAnimationRef = reactExports.useRef(false);
  const [forcePanelIdle, setForcePanelIdle] = reactExports.useState(false);
  const pendingTemporaryStyleRestoreRef = reactExports.useRef(null);
  const mergedPanelRef = useMergedRefs(externalRef, panelRef);
  const latestOpenRef = useValueAsRef(open);
  const runOnceCloseAnimationsFinish = useAnimationsFinished(panelRef);
  const hidden = !open && !mounted;
  const panelTransitionStatus = forcePanelIdle ? "idle" : transitionStatus;
  const shouldPreventOpenAnimation = open && // These 2 refs are safe to read in render, they are only written from committed
  // layout/effect paths and gate one-shot motion suppression for the next open
  // lifecycle. They intentionally expose the last committed motion snapshot.
  (shouldPreventMountAnimationRef.current || shouldPreventActivityResumeAnimationRef.current);
  const renderedDimensions = !open && mounted && // These 2 refs are also safe to read in render, both hold the last committed
  // animation mode and measurement. This fallback only restores a previously
  // measured pixel size after the live dimensions state has been reset back to `auto`.
  animationTypeRef.current === "css-animation" && dimensions.height === void 0 && dimensions.width === void 0 ? lastMeasuredDimensionsRef.current : dimensions;
  const shouldPersistHiddenTransitionStyles = hiddenUntilFound && hidden && animationTypeRef.current !== "css-animation";
  const setDimensions = useStableCallback((nextDimensions, shouldCacheMeasurement = true) => {
    if (shouldCacheMeasurement) {
      lastMeasuredDimensionsRef.current = nextDimensions;
    }
    setDimensionsUnwrapped(nextDimensions);
  });
  const restorePendingTemporaryStyle = useStableCallback(() => {
    pendingTemporaryStyleRestoreRef.current?.();
    pendingTemporaryStyleRestoreRef.current = null;
  });
  const setPendingTemporaryStyleRestore = useStableCallback((restore) => {
    restorePendingTemporaryStyle();
    pendingTemporaryStyleRestoreRef.current = () => {
      pendingTemporaryStyleRestoreRef.current = null;
      restore();
    };
  });
  const markActivityResumeAnimationSuppressed = useStableCallback(() => {
    if (open && mounted && animationTypeRef.current === "css-animation") {
      shouldPreventActivityResumeAnimationRef.current = true;
    }
  });
  useIsoLayoutEffect(() => {
    if (!forcePanelIdle || transitionStatus === "starting") {
      return;
    }
    setForcePanelIdle(false);
  }, [forcePanelIdle, transitionStatus]);
  reactExports.useEffect(() => {
    return () => {
      markActivityResumeAnimationSuppressed();
      restorePendingTemporaryStyle();
    };
  }, [markActivityResumeAnimationSuppressed, restorePendingTemporaryStyle]);
  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel) {
      return void 0;
    }
    if (!open && pendingTemporaryStyleRestoreRef.current) {
      restorePendingTemporaryStyle();
    }
    const animationType = getAnimationType(panel, shouldPreventOpenAnimation);
    animationTypeRef.current = animationType;
    if (open && transitionStatus === "idle" && shouldPreventMountAnimationRef.current && animationType === "css-animation") {
      lastMeasuredDimensionsRef.current = getDimensions(panel);
      return void 0;
    }
    if (open && transitionStatus === "starting") {
      const skipNextOpen = shouldSkipNextOpenRef.current;
      shouldSkipNextOpenRef.current = false;
      if (animationType === "none") {
        setDimensions(getDimensions(panel));
        setForcePanelIdle(true);
        return void 0;
      }
      if (animationType === "css-transition") {
        const restoreLayoutStyles = resetLayoutStyles(panel);
        setDimensions(getDimensions(panel));
        if (!skipNextOpen) {
          return restoreLayoutStyles;
        }
        const restoreTransitionDuration = setTemporaryStyle(panel, "transition-duration", "0s");
        setPendingTemporaryStyleRestore(restoreTransitionDuration);
        setForcePanelIdle(true);
        return restoreLayoutStyles;
      }
      setDimensions(getDimensions(panel));
      const restoreAnimationName = setTemporaryStyle(panel, "animation-name", "none");
      if (!skipNextOpen) {
        restoreAnimationName();
        return void 0;
      }
      const restoreAnimationDuration = setTemporaryStyle(panel, "animation-duration", "0s");
      restoreAnimationName();
      setPendingTemporaryStyleRestore(restoreAnimationDuration);
      setForcePanelIdle(true);
      return void 0;
    }
    if (!open && mounted && (transitionStatus === "idle" || transitionStatus === "starting")) {
      shouldPreventMountAnimationRef.current = false;
      shouldPreventActivityResumeAnimationRef.current = false;
      if (animationType === "none") {
        setDimensions(EMPTY_DIMENSIONS, false);
        setMounted(false);
        return void 0;
      }
      setDimensions(getDimensions(panel));
      return void 0;
    }
    if (transitionStatus !== "ending") {
      return void 0;
    }
    if (animationType === "none") {
      setMounted(false);
      return void 0;
    }
    const nextDimensions = getDimensions(panel);
    const hasMeasuredSize = nextDimensions.height > 0 || nextDimensions.width > 0;
    if (!hasMeasuredSize) {
      setMounted(false);
      return void 0;
    }
    setDimensions(nextDimensions);
    if (animationType === "css-animation") {
      const restoreAnimationName = setTemporaryStyle(panel, "animation-name", "none");
      restoreAnimationName();
    }
    return void 0;
  }, [mounted, open, restorePendingTemporaryStyle, setDimensions, setMounted, setPendingTemporaryStyleRestore, shouldPreventOpenAnimation, transitionStatus]);
  useOpenChangeComplete({
    enabled: open && mounted && panelTransitionStatus === "idle",
    open: true,
    ref: panelRef,
    onComplete() {
      if (!open) {
        return;
      }
      setDimensions(EMPTY_DIMENSIONS, false);
    }
  });
  reactExports.useEffect(() => {
    if (open || !mounted || panelTransitionStatus !== "ending") {
      return void 0;
    }
    const panel = panelRef.current;
    if (!panel) {
      return void 0;
    }
    const abortController = new AbortController();
    let endingStyleFrame = -1;
    function handleComplete() {
      if (latestOpenRef.current) {
        return;
      }
      setMounted(false);
      setDimensions(EMPTY_DIMENSIONS, false);
    }
    endingStyleFrame = AnimationFrame.request(() => {
      runOnceCloseAnimationsFinish(handleComplete, abortController.signal);
    });
    return () => {
      AnimationFrame.cancel(endingStyleFrame);
      abortController.abort();
    };
  }, [latestOpenRef, mounted, open, panelTransitionStatus, runOnceCloseAnimationsFinish, setDimensions, setMounted]);
  useIsoLayoutEffect(() => {
    const panel = panelRef.current;
    if (!panel || !hiddenUntilFound || !hidden) {
      return;
    }
    panel.setAttribute("hidden", "until-found");
  }, [hidden, hiddenUntilFound]);
  reactExports.useEffect(function registerBeforeMatchListener() {
    const panel = panelRef.current;
    if (!panel) {
      return void 0;
    }
    function handleBeforeMatch(event) {
      const eventDetails = createChangeEventDetails(none, event);
      onOpenChange(true, eventDetails);
      if (eventDetails.isCanceled) {
        return;
      }
      shouldSkipNextOpenRef.current = true;
      setOpen(true);
    }
    return addEventListener(panel, "beforematch", handleBeforeMatch);
  }, [onOpenChange, setOpen]);
  const shouldRender = keepMounted || hiddenUntilFound || mounted || open;
  return {
    height: renderedDimensions.height,
    props: {
      ...shouldPersistHiddenTransitionStyles ? {
        [CollapsiblePanelDataAttributes.startingStyle]: ""
      } : void 0,
      hidden,
      id: idParam
    },
    ref: mergedPanelRef,
    shouldPreventOpenAnimation,
    shouldRender,
    transitionStatus: panelTransitionStatus,
    width: renderedDimensions.width
  };
}
function getDimensions(element) {
  return {
    height: element.scrollHeight,
    width: element.scrollWidth
  };
}
function getAnimationType(element, hasSuppressedMountAnimation) {
  const panelStyles = getWindow(element).getComputedStyle(element);
  const hasAnimation = (panelStyles.animationName.split(",").map((name) => name.trim()).some((name) => name !== "" && name !== "none") || hasSuppressedMountAnimation) && hasNonZeroDuration(panelStyles.animationDuration);
  const hasTransition = hasNonZeroDuration(panelStyles.transitionDuration);
  if (hasAnimation && hasTransition) {
    return "css-transition";
  }
  if (hasTransition) {
    return "css-transition";
  }
  if (hasAnimation) {
    return "css-animation";
  }
  return "none";
}
function hasNonZeroDuration(value) {
  return value.split(",").map((part) => part.trim()).some((part) => part !== "" && Number.parseFloat(part) > 0);
}
function setTemporaryStyle(element, property, value) {
  const previousValue = element.style.getPropertyValue(property);
  const previousPriority = element.style.getPropertyPriority(property);
  element.style.setProperty(property, value);
  return () => {
    if (previousValue === "") {
      element.style.removeProperty(property);
      return;
    }
    element.style.setProperty(property, previousValue, previousPriority);
  };
}
function resetLayoutStyles(element) {
  const originalLayoutStyles = {
    "justify-content": element.style.justifyContent,
    "align-items": element.style.alignItems,
    "align-content": element.style.alignContent,
    "justify-items": element.style.justifyItems
  };
  Object.keys(originalLayoutStyles).forEach((key) => {
    element.style.setProperty(key, "initial", "important");
  });
  function restoreLayoutStyles() {
    Object.entries(originalLayoutStyles).forEach(([key, value]) => {
      if (value === "") {
        element.style.removeProperty(key);
        return;
      }
      element.style.setProperty(key, value);
    });
  }
  const frame = AnimationFrame.request(restoreLayoutStyles);
  return () => {
    AnimationFrame.cancel(frame);
    restoreLayoutStyles();
  };
}
export {
  CollapsibleRootContext as C,
  useCollapsibleRootContext as a,
  useCollapsiblePanel as b,
  collapsibleOpenStateMapping as c,
  triggerOpenStateMapping as t,
  useCollapsibleRoot as u
};
