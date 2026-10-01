import { r as reactExports, Y as useRenderElement, j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { u as useFieldsetRootContext, F as FieldsetRootContext } from "./FieldsetRootContext-Dg8z8pLL.js";
import { u as useRegisteredLabelId } from "./useRegisteredLabelId-CQd8UikR.js";
const FieldsetRoot = /* @__PURE__ */ reactExports.forwardRef(function FieldsetRoot2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    disabled: disabledProp = false,
    ...elementProps
  } = componentProps;
  const [legendId, setLegendId] = reactExports.useState(void 0);
  const parentDisabled = useFieldsetRootContext(true)?.disabled;
  const disabled = parentDisabled || disabledProp;
  const state = {
    disabled
  };
  const element = useRenderElement("fieldset", componentProps, {
    ref: forwardedRef,
    state,
    props: [{
      "aria-labelledby": legendId,
      disabled
    }, elementProps]
  });
  const contextValue = reactExports.useMemo(() => ({
    legendId,
    setLegendId,
    disabled
  }), [legendId, setLegendId, disabled]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
const FieldsetLegend$1 = /* @__PURE__ */ reactExports.forwardRef(function FieldsetLegend2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    disabled,
    setLegendId
  } = useFieldsetRootContext();
  const id = useRegisteredLabelId(idProp, setLegendId);
  const state = {
    disabled
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      id
    }, elementProps]
  });
  return element;
});
function Fieldset({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FieldsetRoot,
    {
      className: cn("flex w-full min-w-0 flex-col gap-4", className),
      "data-slot": "fieldset",
      ...props
    }
  );
}
function FieldsetLegend({
  className,
  variant = "legend",
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FieldsetLegend$1,
    {
      className: cn(
        "text-foreground",
        variant === "legend" ? "font-semibold text-lg/6 sm:text-base/6" : "font-medium text-base/4.5 sm:text-sm/4",
        className
      ),
      "data-variant": variant,
      "data-slot": "fieldset-legend",
      ...props
    }
  );
}
export {
  Fieldset as F,
  FieldsetLegend as a
};
