import { r as reactExports, cn as useId, j as jsxRuntimeExports, co as ContextMenuRootContext, cp as MenuRootContext, cq as MenuRoot, cr as useContextMenuRootContext, cs as useMenuRootContext, ae as useTimeout, an as ownerDocument, b4 as addEventListener, Y as useRenderElement, am as getTarget, aN as contains, aM as pressableTriggerOpenStateMapping, bE as stopEvent, ct as findRootOwnerId, aJ as createChangeEventDetails, aP as cancelOpen, c8 as triggerPress, cu as MenuPortal, cv as MenuPositioner, cw as MenuPopup, e as cn, cx as MenuItem, bf as Separator, cy as MenuSubmenuRoot, cz as MenuSubmenuTrigger, c7 as ChevronRight, cA as MenuGroup, cB as MenuGroupLabel, cC as MenuRadioGroup, cD as MenuRadioItem, cE as MenuRadioItemIndicator, C as Check, cF as MenuCheckboxItem, cG as MenuCheckboxItemIndicator } from "./index-DM02Iz28.js";
function ContextMenuRoot(props) {
  const [anchor, setAnchor] = reactExports.useState({
    getBoundingClientRect() {
      return DOMRect.fromRect({
        width: 0,
        height: 0,
        x: 0,
        y: 0
      });
    }
  });
  const backdropRef = reactExports.useRef(null);
  const internalBackdropRef = reactExports.useRef(null);
  const actionsRef = reactExports.useRef(null);
  const positionerRef = reactExports.useRef(null);
  const allowMouseUpTriggerRef = reactExports.useRef(true);
  const initialCursorPointRef = reactExports.useRef(null);
  const id = useId();
  const contextValue = reactExports.useMemo(() => ({
    anchor,
    setAnchor,
    actionsRef,
    backdropRef,
    internalBackdropRef,
    positionerRef,
    allowMouseUpTriggerRef,
    initialCursorPointRef,
    rootId: id
  }), [anchor, id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuRootContext.Provider, {
    value: contextValue,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRootContext.Provider, {
      value: void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRoot, {
        ...props
      })
    })
  });
}
const LONG_PRESS_DELAY = 500;
const ContextMenuTrigger$1 = /* @__PURE__ */ reactExports.forwardRef(function ContextMenuTrigger2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    setAnchor,
    actionsRef,
    internalBackdropRef,
    backdropRef,
    positionerRef,
    allowMouseUpTriggerRef,
    initialCursorPointRef,
    rootId
  } = useContextMenuRootContext(false);
  const {
    store
  } = useMenuRootContext(false);
  const open = store.useState("open");
  const disabled = store.useState("disabled");
  const triggerRef = reactExports.useRef(null);
  const touchPositionRef = reactExports.useRef(null);
  const longPressTimeout = useTimeout();
  const allowMouseUpTimeout = useTimeout();
  const allowMouseUpRef = reactExports.useRef(false);
  const mouseUpAbortControllerRef = reactExports.useRef(null);
  function handleLongPress(x, y, event) {
    const isTouchEvent = event.type.startsWith("touch");
    initialCursorPointRef.current = {
      x,
      y
    };
    setAnchor({
      getBoundingClientRect() {
        return DOMRect.fromRect({
          width: isTouchEvent ? 10 : 0,
          height: isTouchEvent ? 10 : 0,
          x,
          y
        });
      }
    });
    allowMouseUpRef.current = false;
    actionsRef.current?.setOpen(true, createChangeEventDetails(triggerPress, event));
    allowMouseUpTimeout.start(LONG_PRESS_DELAY, () => {
      allowMouseUpRef.current = true;
    });
  }
  function handleContextMenu(event) {
    if (disabled) {
      return;
    }
    allowMouseUpTriggerRef.current = true;
    stopEvent(event);
    handleLongPress(event.clientX, event.clientY, event.nativeEvent);
    const doc = ownerDocument(triggerRef.current);
    mouseUpAbortControllerRef.current?.abort();
    const mouseUpAbortController = new AbortController();
    mouseUpAbortControllerRef.current = mouseUpAbortController;
    doc.addEventListener("mouseup", (mouseEvent) => {
      allowMouseUpTriggerRef.current = false;
      if (!allowMouseUpRef.current) {
        return;
      }
      allowMouseUpTimeout.clear();
      allowMouseUpRef.current = false;
      const mouseUpTarget = getTarget(mouseEvent);
      if (contains(positionerRef.current, mouseUpTarget)) {
        return;
      }
      if (rootId && mouseUpTarget && findRootOwnerId(mouseUpTarget) === rootId) {
        return;
      }
      actionsRef.current?.setOpen(false, createChangeEventDetails(cancelOpen, mouseEvent));
    }, {
      once: true,
      signal: mouseUpAbortController.signal
    });
  }
  function cancelLongPress() {
    longPressTimeout.clear();
    touchPositionRef.current = null;
  }
  function handleTouchStart(event) {
    if (disabled) {
      cancelLongPress();
      return;
    }
    allowMouseUpTriggerRef.current = false;
    if (event.touches.length !== 1) {
      cancelLongPress();
      return;
    }
    event.stopPropagation();
    const touch = event.touches[0];
    const touchPosition = {
      x: touch.clientX,
      y: touch.clientY
    };
    touchPositionRef.current = touchPosition;
    longPressTimeout.start(LONG_PRESS_DELAY, () => {
      handleLongPress(touchPosition.x, touchPosition.y, event.nativeEvent);
    });
  }
  function handleTouchMove(event) {
    if (event.touches.length !== 1) {
      cancelLongPress();
      return;
    }
    if (longPressTimeout.isStarted() && touchPositionRef.current) {
      const touch = event.touches[0];
      const moveThreshold = 10;
      const deltaX = Math.abs(touch.clientX - touchPositionRef.current.x);
      const deltaY = Math.abs(touch.clientY - touchPositionRef.current.y);
      if (deltaX > moveThreshold || deltaY > moveThreshold) {
        cancelLongPress();
      }
    }
  }
  reactExports.useEffect(() => () => {
    mouseUpAbortControllerRef.current?.abort();
  }, []);
  reactExports.useEffect(() => {
    function handleDocumentContextMenu(event) {
      if (disabled) {
        return;
      }
      const target = getTarget(event);
      const targetElement = target;
      if (contains(triggerRef.current, targetElement) || contains(internalBackdropRef.current, targetElement) || contains(backdropRef.current, targetElement)) {
        event.preventDefault();
      }
    }
    const doc = ownerDocument(triggerRef.current);
    return addEventListener(doc, "contextmenu", handleDocumentContextMenu);
  }, [backdropRef, disabled, internalBackdropRef]);
  const state = {
    open
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: [triggerRef, forwardedRef],
    props: [{
      onContextMenu: handleContextMenu,
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: cancelLongPress,
      onTouchCancel: cancelLongPress,
      style: {
        WebkitTouchCallout: "none"
      }
    }, elementProps],
    stateAttributesMapping: pressableTriggerOpenStateMapping
  });
  return element;
});
const ContextMenu = ContextMenuRoot;
const ContextMenuPortal = MenuPortal;
function ContextMenuTrigger({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ContextMenuTrigger$1,
    {
      className,
      "data-slot": "context-menu-trigger",
      ...props,
      children
    }
  );
}
function ContextMenuPopup({
  children,
  className,
  sideOffset = 4,
  align = "center",
  alignOffset,
  side = "bottom",
  anchor,
  portalProps,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuPortal, { ...portalProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuPositioner,
    {
      align,
      alignOffset,
      anchor,
      className: "z-50",
      "data-slot": "context-menu-positioner",
      side,
      sideOffset,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuPopup,
        {
          className: cn(
            "relative flex not-[class*='w-']:min-w-32 origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding shadow-lg/5 outline-none before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] focus:outline-none dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className
          ),
          "data-slot": "context-menu-popup",
          ...props,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-(--available-height) w-full overflow-y-auto p-1", children })
        }
      )
    }
  ) });
}
function ContextMenuGroup(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroup, { "data-slot": "context-menu-group", ...props });
}
function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuItem,
    {
      className: cn(
        "flex min-h-8 pointer-coarse:min-h-11 cursor-default select-none items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-inset:ps-8 data-[variant=destructive]:text-destructive-foreground data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not([class*='opacity-'])]:opacity-80 [&>svg:not([class*='size-'])]:size-4.5 sm:[&>svg:not([class*='size-'])]:size-4 [&>svg]:pointer-events-none [&>svg]:-mx-0.5 [&>svg]:shrink-0",
        className
      ),
      "data-inset": inset,
      "data-slot": "context-menu-item",
      "data-variant": variant,
      ...props
    }
  );
}
function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuCheckboxItem,
    {
      checked,
      className: cn(
        "grid min-h-8 pointer-coarse:min-h-11 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default items-center gap-2 rounded-sm py-1 ps-2 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        variant === "switch" ? "grid-cols-[1fr_auto] gap-4 pe-1.5" : "grid-cols-[.75rem_1fr] pe-4",
        className
      ),
      "data-slot": "context-menu-checkbox-item",
      ...props,
      children: variant === "switch" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-start-1", children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          MenuCheckboxItemIndicator,
          {
            className: "inset-shadow-[0_1px_--theme(--color-black/4%)] inline-flex h-[calc(var(--thumb-size)+2px)] w-[calc(var(--thumb-size)*2-2px)] shrink-0 items-center rounded-full p-px outline-none transition-[background-color,box-shadow] duration-200 [--thumb-size:--spacing(4)] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-checked:bg-primary data-unchecked:bg-input data-disabled:opacity-64 sm:[--thumb-size:--spacing(3)]",
            keepMounted: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none block aspect-square h-full in-[[data-slot=context-menu-checkbox-item][data-checked]]:origin-[var(--thumb-size)_50%] origin-left in-[[data-slot=context-menu-checkbox-item][data-checked]]:translate-x-[calc(var(--thumb-size)-4px)] in-[[data-slot=context-menu-checkbox-item]:active]:not-data-disabled:scale-x-110 in-[[data-slot=context-menu-checkbox-item]:active]:rounded-[var(--thumb-size)/calc(var(--thumb-size)*1.10)] rounded-(--thumb-size) bg-background shadow-sm/5 will-change-transform [transition:translate_.15s,border-radius_.15s,scale_.1s_.1s,transform-origin_.15s]" })
          }
        )
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCheckboxItemIndicator, { className: "col-start-1 -ms-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { "aria-hidden": "true", strokeWidth: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-start-2", children })
      ] })
    }
  );
}
function ContextMenuRadioGroup(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuRadioGroup,
    {
      "data-slot": "context-menu-radio-group",
      ...props
    }
  );
}
function ContextMenuRadioItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MenuRadioItem,
    {
      className: cn(
        "grid min-h-8 pointer-coarse:min-h-11 in-data-[side=none]:min-w-[calc(var(--anchor-width)+1.25rem)] cursor-default grid-cols-[.75rem_1fr] items-center gap-2 rounded-sm py-1 ps-2 pe-4 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className
      ),
      "data-slot": "context-menu-radio-item",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRadioItemIndicator, { className: "col-start-1 -ms-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { "aria-hidden": "true", strokeWidth: 3 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "col-start-2", children })
      ]
    }
  );
}
function ContextMenuGroupLabel({
  className,
  inset,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuGroupLabel,
    {
      className: cn(
        "px-2 py-1.5 font-medium text-muted-foreground text-xs data-inset:ps-9 sm:data-inset:ps-8",
        className
      ),
      "data-inset": inset,
      "data-slot": "context-menu-label",
      ...props
    }
  );
}
function ContextMenuSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      className: cn("mx-2 my-1 h-px bg-border", className),
      "data-slot": "context-menu-separator",
      ...props
    }
  );
}
function ContextMenuShortcut({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "kbd",
    {
      className: cn(
        "ms-auto font-medium font-sans text-muted-foreground/72 text-xs tracking-widest",
        className
      ),
      "data-slot": "context-menu-shortcut",
      ...props
    }
  );
}
function ContextMenuSub(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSubmenuRoot, { "data-slot": "context-menu-sub", ...props });
}
function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    MenuSubmenuTrigger,
    {
      className: cn(
        "flex min-h-8 pointer-coarse:min-h-11 items-center gap-2 rounded-sm px-2 py-1 text-base text-foreground outline-none data-disabled:pointer-events-none data-highlighted:bg-accent data-popup-open:bg-accent data-inset:ps-8 data-highlighted:text-accent-foreground data-popup-open:text-accent-foreground data-disabled:opacity-64 sm:min-h-7 sm:text-sm [&>svg:not(:last-child)]:-mx-0.5 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none",
        className
      ),
      "data-inset": inset,
      "data-slot": "context-menu-sub-trigger",
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ms-auto -me-0.5 opacity-80" })
      ]
    }
  );
}
function ContextMenuSubPopup({
  className,
  sideOffset = 0,
  alignOffset,
  align = "start",
  ...props
}) {
  const defaultAlignOffset = align !== "center" ? -5 : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ContextMenuPopup,
    {
      align,
      alignOffset: alignOffset ?? defaultAlignOffset,
      className,
      "data-slot": "context-menu-sub-content",
      side: "inline-end",
      sideOffset,
      ...props
    }
  );
}
export {
  ContextMenu as C,
  ContextMenuTrigger as a,
  ContextMenuPopup as b,
  ContextMenuItem as c,
  ContextMenuShortcut as d,
  ContextMenuSeparator as e,
  ContextMenuGroup as f,
  ContextMenuGroupLabel as g,
  ContextMenuRadioGroup as h,
  ContextMenuRadioItem as i,
  ContextMenuCheckboxItem as j,
  ContextMenuSub as k,
  ContextMenuSubTrigger as l,
  ContextMenuSubPopup as m
};
