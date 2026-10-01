import { _ as transitionStatusMapping, r as reactExports, X as useStableCallback, Y as useRenderElement, j as jsxRuntimeExports, a2 as useButton, a3 as useIsoLayoutEffect, a4 as resolveStyle } from "./index-DM02Iz28.js";
import { c as collapsibleOpenStateMapping, u as useCollapsibleRoot, C as CollapsibleRootContext, a as useCollapsibleRootContext, t as triggerOpenStateMapping, b as useCollapsiblePanel } from "./useCollapsiblePanel-Dpoq1n6_.js";
const collapsibleStateAttributesMapping = {
  ...collapsibleOpenStateMapping,
  ...transitionStatusMapping
};
const CollapsibleRoot = /* @__PURE__ */ reactExports.forwardRef(function CollapsibleRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    defaultOpen = false,
    disabled = false,
    onOpenChange: onOpenChangeProp,
    open,
    style,
    ...elementProps
  } = componentProps;
  const onOpenChange = useStableCallback(onOpenChangeProp);
  const collapsible = useCollapsibleRoot({
    open,
    defaultOpen,
    onOpenChange,
    disabled
  });
  const state = reactExports.useMemo(() => ({
    open: collapsible.open,
    disabled: collapsible.disabled,
    transitionStatus: collapsible.transitionStatus
  }), [collapsible.open, collapsible.disabled, collapsible.transitionStatus]);
  const contextValue = reactExports.useMemo(() => ({
    ...collapsible,
    onOpenChange,
    state
  }), [collapsible, onOpenChange, state]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: collapsibleStateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsibleRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
const stateAttributesMapping = {
  ...triggerOpenStateMapping,
  ...transitionStatusMapping
};
const CollapsibleTrigger = /* @__PURE__ */ reactExports.forwardRef(function CollapsibleTrigger2(componentProps, forwardedRef) {
  const {
    panelId,
    open,
    handleTrigger,
    state,
    disabled: contextDisabled
  } = useCollapsibleRootContext();
  const {
    className,
    disabled = contextDisabled,
    render,
    nativeButton = true,
    style,
    ...elementProps
  } = componentProps;
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled: true,
    native: nativeButton
  });
  const element = useRenderElement("button", componentProps, {
    state,
    ref: [forwardedRef, buttonRef],
    props: [{
      "aria-controls": open ? panelId : void 0,
      "aria-expanded": open,
      onClick: handleTrigger
    }, elementProps, getButtonProps],
    stateAttributesMapping
  });
  return element;
});
let CollapsiblePanelCssVars = /* @__PURE__ */ (function(CollapsiblePanelCssVars2) {
  CollapsiblePanelCssVars2["collapsiblePanelHeight"] = "--collapsible-panel-height";
  CollapsiblePanelCssVars2["collapsiblePanelWidth"] = "--collapsible-panel-width";
  return CollapsiblePanelCssVars2;
})({});
const CollapsiblePanel = /* @__PURE__ */ reactExports.forwardRef(function CollapsiblePanel2(componentProps, forwardedRef) {
  const {
    className,
    hiddenUntilFound: hiddenUntilFoundProp,
    keepMounted: keepMountedProp,
    render,
    id: idProp,
    style,
    ...elementProps
  } = componentProps;
  const {
    defaultPanelId,
    mounted,
    onOpenChange,
    open,
    setMounted,
    setPanelIdState,
    setOpen,
    state,
    transitionStatus
  } = useCollapsibleRootContext();
  const hiddenUntilFound = hiddenUntilFoundProp ?? false;
  const keepMounted = keepMountedProp ?? false;
  const registeredId = idProp || void 0;
  const id = registeredId ?? defaultPanelId;
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
        style: {
          [CollapsiblePanelCssVars.collapsiblePanelHeight]: height === void 0 ? "auto" : `${height}px`,
          [CollapsiblePanelCssVars.collapsiblePanelWidth]: width === void 0 ? "auto" : `${width}px`
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
    stateAttributesMapping: collapsibleStateAttributesMapping
  });
  if (!shouldRender) {
    return null;
  }
  return element;
});
export {
  CollapsibleRoot as C,
  CollapsibleTrigger as a,
  CollapsiblePanel as b
};
