import { r as reactExports, aY as useToolbarRootContext, j as jsxRuntimeExports, bf as Separator, en as ToolbarRootContext, Y as useRenderElement, a2 as useButton, br as CompositeItem, aG as EMPTY_OBJECT, e as cn } from "./index-DM02Iz28.js";
import { C as CompositeRoot } from "./CompositeRoot-xQsp56hN.js";
import { T as ToolbarGroupContext, u as useToolbarGroupContext } from "./ToolbarGroupContext-B0PX1mgM.js";
const ToolbarSeparator$1 = /* @__PURE__ */ reactExports.forwardRef(function ToolbarSeparator2(props, forwardedRef) {
  const context = useToolbarRootContext();
  const orientation = context.orientation === "vertical" ? "horizontal" : "vertical";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {
    orientation,
    ...props,
    ref: forwardedRef
  });
});
const ToolbarRoot = /* @__PURE__ */ reactExports.forwardRef(function ToolbarRoot2(componentProps, forwardedRef) {
  const {
    disabled = false,
    loopFocus,
    orientation = "horizontal",
    className,
    render,
    style,
    ...elementProps
  } = componentProps;
  const [itemMap, setItemMap] = reactExports.useState(() => /* @__PURE__ */ new Map());
  const disabledIndices = reactExports.useMemo(() => {
    const output = [];
    for (const itemMetadata of itemMap.values()) {
      if (itemMetadata.disabled && !itemMetadata.focusableWhenDisabled) {
        output.push(itemMetadata.index);
      }
    }
    return output;
  }, [itemMap]);
  const toolbarRootContext = reactExports.useMemo(() => ({
    disabled,
    orientation
  }), [disabled, orientation]);
  const state = {
    disabled,
    orientation
  };
  const defaultProps = {
    "aria-orientation": orientation,
    role: "toolbar"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarRootContext.Provider, {
    value: toolbarRootContext,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef],
      props: [defaultProps, elementProps],
      disabledIndices,
      loopFocus,
      onMapChange: setItemMap,
      orientation
    })
  });
});
const ToolbarGroup$1 = /* @__PURE__ */ reactExports.forwardRef(function ToolbarGroup2(componentProps, forwardedRef) {
  const {
    className,
    disabled: disabledProp = false,
    render,
    style,
    ...elementProps
  } = componentProps;
  const {
    orientation,
    disabled: toolbarDisabled
  } = useToolbarRootContext();
  const disabled = toolbarDisabled || disabledProp;
  const contextValue = reactExports.useMemo(() => ({
    disabled
  }), [disabled]);
  const state = {
    disabled,
    orientation
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      role: "group"
    }, elementProps]
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarGroupContext.Provider, {
    value: contextValue,
    children: element
  });
});
const ToolbarButton$1 = /* @__PURE__ */ reactExports.forwardRef(function ToolbarButton2(componentProps, forwardedRef) {
  const {
    className,
    disabled: disabledProp = false,
    focusableWhenDisabled = true,
    render,
    nativeButton,
    style,
    ...elementProps
  } = componentProps;
  const {
    disabled: toolbarDisabled,
    orientation
  } = useToolbarRootContext();
  const groupContext = useToolbarGroupContext();
  const disabled = toolbarDisabled || (groupContext?.disabled ?? false) || disabledProp;
  const itemMetadata = reactExports.useMemo(() => ({
    disabled,
    focusableWhenDisabled
  }), [disabled, focusableWhenDisabled]);
  const {
    getButtonProps,
    buttonRef
  } = useButton({
    disabled,
    focusableWhenDisabled,
    native: nativeButton
  });
  const state = {
    disabled,
    orientation,
    focusable: focusableWhenDisabled
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeItem, {
    tag: "button",
    render,
    className,
    style,
    metadata: itemMetadata,
    state,
    refs: [forwardedRef, buttonRef],
    props: [
      elementProps,
      // When a render prop is provided (typically another Base UI component
      // like Menu.Trigger), forward `disabled` so the rendered component can
      // derive its own disabled state. For the default toolbar button, avoid
      // forwarding a React `disabled` prop so focusable disabled buttons remain
      // hoverable for interactions like tooltips.
      // TODO: follow up after https://github.com/mui/base-ui/issues/1976#issuecomment-2916905663
      render ? {
        disabled
      } : EMPTY_OBJECT,
      getButtonProps
    ]
  });
});
function Toolbar({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolbarRoot,
    {
      className: cn(
        "relative flex gap-2 rounded-xl border bg-card not-dark:bg-clip-padding p-1 text-card-foreground data-[orientation=vertical]:w-fit data-[orientation=vertical]:flex-col",
        className
      ),
      "data-slot": "toolbar",
      ...props
    }
  );
}
function ToolbarButton({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolbarButton$1,
    {
      className: cn(className),
      "data-slot": "toolbar-button",
      ...props
    }
  );
}
function ToolbarGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolbarGroup$1,
    {
      className: cn("flex items-center gap-1 data-[orientation=vertical]:flex-col", className),
      "data-slot": "toolbar-group",
      ...props
    }
  );
}
function ToolbarSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToolbarSeparator$1,
    {
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:my-0.5 data-[orientation=vertical]:my-1.5 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
        className
      ),
      "data-slot": "toolbar-separator",
      ...props
    }
  );
}
export {
  Toolbar as T,
  ToolbarGroup as a,
  ToolbarButton as b,
  ToolbarSeparator as c
};
