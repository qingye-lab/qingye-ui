import { r as reactExports, aY as useToolbarRootContext, W as useControlled, ap as EMPTY_ARRAY, X as useStableCallback, Y as useRenderElement, j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { S as Separator } from "./separator-CcYO5Zxi.js";
import { T as ToggleGroupContext$1, a as Toggle } from "./toggle-1hwCCJTO.js";
import { C as CompositeRoot } from "./CompositeRoot-xQsp56hN.js";
import { u as useToolbarGroupContext } from "./ToolbarGroupContext-B0PX1mgM.js";
const ToggleGroup$1 = /* @__PURE__ */ reactExports.forwardRef(function ToggleGroup2(componentProps, forwardedRef) {
  const {
    defaultValue: defaultValueProp,
    disabled: disabledProp = false,
    loopFocus = true,
    onValueChange,
    orientation = "horizontal",
    multiple = false,
    value: valueProp,
    className,
    render,
    style,
    ...elementProps
  } = componentProps;
  const toolbarContext = useToolbarRootContext(true);
  const toolbarGroupContext = useToolbarGroupContext();
  const isValueInitialized = valueProp !== void 0 || defaultValueProp !== void 0;
  const disabled = (toolbarContext?.disabled ?? false) || (toolbarGroupContext?.disabled ?? false) || disabledProp;
  const [groupValue, setValueState] = useControlled({
    controlled: valueProp,
    default: valueProp === void 0 ? defaultValueProp ?? EMPTY_ARRAY : void 0,
    name: "ToggleGroup",
    state: "value"
  });
  const setGroupValue = useStableCallback((newValue, nextPressed, eventDetails) => {
    let newGroupValue;
    if (multiple) {
      newGroupValue = groupValue.slice();
      if (nextPressed) {
        newGroupValue.push(newValue);
      } else {
        newGroupValue.splice(groupValue.indexOf(newValue), 1);
      }
    } else {
      newGroupValue = nextPressed ? [newValue] : [];
    }
    onValueChange?.(newGroupValue, eventDetails);
    if (eventDetails.isCanceled) {
      return;
    }
    setValueState(newGroupValue);
  });
  const state = {
    disabled,
    multiple,
    orientation
  };
  const contextValue = reactExports.useMemo(() => ({
    disabled,
    setGroupValue,
    value: groupValue,
    isValueInitialized
  }), [disabled, setGroupValue, groupValue, isValueInitialized]);
  const defaultProps = {
    role: "group"
  };
  const element = useRenderElement("div", componentProps, {
    enabled: Boolean(toolbarContext),
    state,
    ref: forwardedRef,
    props: [defaultProps, elementProps]
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupContext$1.Provider, {
    value: contextValue,
    children: toolbarContext ? element : /* @__PURE__ */ jsxRuntimeExports.jsx(CompositeRoot, {
      render,
      className,
      style,
      state,
      refs: [forwardedRef],
      props: [defaultProps, elementProps],
      loopFocus,
      enableHomeAndEndKeys: true,
      orientation
    })
  });
});
const ToggleGroupContext = reactExports.createContext({
  size: "default",
  variant: "default"
});
function ToggleGroup({
  className,
  variant = "default",
  size = "default",
  orientation = "horizontal",
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ToggleGroup$1,
    {
      className: cn(
        "flex w-fit *:focus-visible:z-10 dark:*:[[data-slot=separator]:has(+[data-slot=toggle]:hover)]:before:bg-input/64 dark:*:[[data-slot=separator]:has(+[data-slot=toggle][data-pressed])]:before:bg-input dark:*:[[data-slot=toggle]:hover+[data-slot=separator]]:before:bg-input/64 dark:*:[[data-slot=toggle][data-pressed]+[data-slot=separator]]:before:bg-input",
        orientation === "horizontal" ? "*:pointer-coarse:after:min-w-auto" : "*:pointer-coarse:after:min-h-auto",
        variant === "default" ? "gap-0.5" : orientation === "horizontal" ? "*:not-first:rounded-s-none *:not-last:rounded-e-none *:not-first:border-s-0 *:not-last:border-e-0 *:not-first:not-data-[slot=separator]:before:-start-[0.5px] *:not-last:not-data-[slot=separator]:before:-end-[0.5px] *:not-first:before:rounded-s-none *:not-last:before:rounded-e-none" : "flex-col *:not-first:rounded-t-none *:not-last:rounded-b-none *:not-first:border-t-0 *:not-last:border-b-0 *:not-first:not-data-[slot=separator]:before:-top-[0.5px] *:not-last:not-data-[slot=separator]:before:-bottom-[0.5px] *:not-first:before:rounded-t-none *:not-last:before:rounded-b-none *:data-[slot=toggle]:not-last:before:hidden dark:*:last:before:hidden dark:*:first:before:block",
        className
      ),
      "data-size": size,
      "data-slot": "toggle-group",
      "data-variant": variant,
      orientation,
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupContext.Provider, { value: { size, variant }, children })
    }
  );
}
function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}) {
  const context = reactExports.useContext(ToggleGroupContext);
  const resolvedVariant = context.variant || variant;
  const resolvedSize = context.size || size;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toggle,
    {
      className,
      "data-size": resolvedSize,
      "data-variant": resolvedVariant,
      size: resolvedSize,
      variant: resolvedVariant,
      ...props,
      children
    }
  );
}
function ToggleGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      className: cn(
        "pointer-events-none relative bg-input before:absolute before:inset-0 dark:before:bg-input/32",
        className
      ),
      orientation,
      ...props
    }
  );
}
export {
  ToggleGroup as T,
  ToggleGroupItem as a,
  ToggleGroupSeparator as b,
  ToggleGroup$1 as c
};
