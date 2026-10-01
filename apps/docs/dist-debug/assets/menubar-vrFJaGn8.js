import { r as reactExports, a1 as useBaseUiId, j as jsxRuntimeExports, dE as MenubarContext, cS as FloatingTree, d7 as useFloatingNodeId, dF as useFloatingTree, dG as useMenubarContext, d8 as FloatingNode, dH as siblingOpen, bF as listNavigation, e as cn, dI as MenuTrigger, h as MenuPopup } from "./index-DM02Iz28.js";
import { C as CompositeRoot } from "./CompositeRoot-xQsp56hN.js";
let MenubarDataAttributes = /* @__PURE__ */ (function(MenubarDataAttributes2) {
  MenubarDataAttributes2["modal"] = "data-modal";
  MenubarDataAttributes2["orientation"] = "data-orientation";
  MenubarDataAttributes2["hasSubmenuOpen"] = "data-has-submenu-open";
  return MenubarDataAttributes2;
})({});
const menubarStateAttributesMapping = {
  hasSubmenuOpen(value) {
    return value ? {
      [MenubarDataAttributes.hasSubmenuOpen]: ""
    } : null;
  }
};
const Menubar$1 = /* @__PURE__ */ reactExports.forwardRef(function Menubar2(props, forwardedRef) {
  const {
    orientation = "horizontal",
    loopFocus = true,
    render,
    className,
    modal = true,
    disabled = false,
    id: idProp,
    style,
    ...elementProps
  } = props;
  const [contentElement, setContentElement] = reactExports.useState(null);
  const [hasSubmenuOpen, setHasSubmenuOpen] = reactExports.useState(false);
  const id = useBaseUiId(idProp);
  const state = {
    orientation,
    modal,
    hasSubmenuOpen
  };
  const contentRef = reactExports.useRef(null);
  const allowMouseUpTriggerRef = reactExports.useRef(false);
  const context = reactExports.useMemo(() => ({
    contentElement,
    setContentElement,
    setHasSubmenuOpen,
    hasSubmenuOpen,
    modal,
    disabled,
    orientation,
    allowMouseUpTriggerRef,
    rootId: id
  }), [contentElement, hasSubmenuOpen, modal, disabled, orientation, id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarContext.Provider, {
    value: context,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingTree, {
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenubarContent, {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRoot, {
          render,
          className,
          style,
          state,
          stateAttributesMapping: menubarStateAttributesMapping,
          refs: [forwardedRef, setContentElement, contentRef],
          props: [{
            role: "menubar",
            id,
            "aria-orientation": orientation
          }, elementProps],
          orientation,
          loopFocus,
          enableHomeAndEndKeys: true,
          highlightItemOnHover: hasSubmenuOpen
        })
      })
    })
  });
});
function MenubarContent(props) {
  const nodeId = useFloatingNodeId();
  const {
    events: menuEvents
  } = useFloatingTree();
  const rootContext = useMenubarContext();
  reactExports.useEffect(() => {
    function onSubmenuOpenChange(details) {
      if (!details.nodeId || details.parentNodeId !== nodeId) {
        return;
      }
      if (details.open) {
        if (!rootContext.hasSubmenuOpen) {
          rootContext.setHasSubmenuOpen(true);
        }
      } else if (details.reason !== siblingOpen && details.reason !== listNavigation) {
        rootContext.setHasSubmenuOpen(false);
      }
    }
    menuEvents.on("menuopenchange", onSubmenuOpenChange);
    return () => {
      menuEvents.off("menuopenchange", onSubmenuOpenChange);
    };
  }, [menuEvents, nodeId, rootContext]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingNode, {
    id: nodeId,
    children: props.children
  });
}
function Menubar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Menubar$1,
    {
      className: cn(
        "relative flex w-fit items-center gap-0.5 rounded-xl border bg-card not-dark:bg-clip-padding p-1 text-card-foreground data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className
      ),
      "data-slot": "menubar",
      ...props
    }
  );
}
function MenubarTrigger({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuTrigger,
    {
      className: cn(
        "relative inline-flex h-8 shrink-0 cursor-default select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-transparent px-[calc(--spacing(2.5)-1px)] font-medium text-base text-foreground outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-disabled:pointer-events-none data-popup-open:bg-accent data-pressed:bg-accent data-disabled:opacity-64 sm:h-7 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:-mx-0.5 [&_svg]:shrink-0",
        className
      ),
      "data-slot": "menubar-trigger",
      ...props
    }
  );
}
function MenubarPopup({
  align = "start",
  alignOffset = -3,
  sideOffset = 8,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuPopup,
    {
      align,
      alignOffset,
      sideOffset,
      ...props
    }
  );
}
export {
  Menubar as M,
  MenubarTrigger as a,
  MenubarPopup as b
};
