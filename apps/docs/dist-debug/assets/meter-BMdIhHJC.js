import { r as reactExports, V as formatErrorMessage, Y as useRenderElement, j as jsxRuntimeExports, b2 as clamp, aI as visuallyHidden, e as cn } from "./index-DM02Iz28.js";
import { f as formatNumber } from "./formatNumber-_NNc_BMA.js";
import { v as valueToPercent } from "./valueToPercent-B3zKfIMz.js";
import { u as useRegisteredLabelId } from "./useRegisteredLabelId-CQd8UikR.js";
const MeterRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useMeterRootContext() {
  const context = reactExports.useContext(MeterRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(38));
  }
  return context;
}
const MeterRoot = /* @__PURE__ */ reactExports.forwardRef(function MeterRoot2(componentProps, forwardedRef) {
  const {
    format,
    getAriaValueText,
    locale,
    max = 100,
    min = 0,
    value: valueProp,
    render,
    className,
    children,
    style,
    ...elementProps
  } = componentProps;
  const [labelId, setLabelId] = reactExports.useState();
  const rawPercentage = valueToPercent(valueProp, min, max);
  const percentageValue = clamp(Number.isNaN(rawPercentage) ? 0 : rawPercentage, 0, 100);
  const clampedValue = clamp(Number.isNaN(valueProp) ? min : valueProp, min, max);
  const formattedValue = format ? formatNumber(clampedValue, locale, format) : formatNumber(percentageValue / 100, locale, {
    style: "percent"
  });
  let ariaValuetext = formattedValue;
  if (getAriaValueText) {
    ariaValuetext = getAriaValueText(formattedValue, valueProp);
  }
  const defaultProps = {
    "aria-labelledby": labelId,
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": clampedValue,
    "aria-valuetext": ariaValuetext,
    role: "meter",
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, {
      children: [children, /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        role: "presentation",
        style: visuallyHidden,
        children: "x"
      })]
    })
  };
  const contextValue = reactExports.useMemo(() => ({
    formattedValue,
    percentageValue,
    setLabelId,
    value: valueProp
  }), [formattedValue, percentageValue, setLabelId, valueProp]);
  const element = useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [defaultProps, elementProps]
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MeterRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
const MeterTrack$1 = /* @__PURE__ */ reactExports.forwardRef(function MeterTrack2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: elementProps
  });
});
const MeterIndicator$1 = /* @__PURE__ */ reactExports.forwardRef(function MeterIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    percentageValue
  } = useMeterRootContext();
  return useRenderElement("div", componentProps, {
    ref: forwardedRef,
    props: [{
      style: {
        insetInlineStart: 0,
        height: "inherit",
        width: `${percentageValue}%`
      }
    }, elementProps]
  });
});
const MeterValue$1 = /* @__PURE__ */ reactExports.forwardRef(function MeterValue2(componentProps, forwardedRef) {
  const {
    className,
    render,
    children,
    style,
    ...elementProps
  } = componentProps;
  const {
    value,
    formattedValue
  } = useMeterRootContext();
  return useRenderElement("span", componentProps, {
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: typeof children === "function" ? children(formattedValue, value) : formattedValue
    }, elementProps]
  });
});
const MeterLabel$1 = /* @__PURE__ */ reactExports.forwardRef(function MeterLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    setLabelId
  } = useMeterRootContext();
  const id = useRegisteredLabelId(idProp, setLabelId);
  return useRenderElement("span", componentProps, {
    ref: forwardedRef,
    props: [{
      id,
      role: "presentation"
    }, elementProps]
  });
});
function Meter({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MeterRoot,
    {
      className: cn("flex w-full flex-col gap-2", className),
      "data-slot": "meter",
      ...props,
      children: children ? children : /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, {}) })
    }
  );
}
function MeterLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MeterLabel$1,
    {
      className: cn("font-medium text-foreground text-sm", className),
      "data-slot": "meter-label",
      ...props
    }
  );
}
function MeterTrack({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MeterTrack$1,
    {
      className: cn("block h-2 w-full overflow-hidden bg-input", className),
      "data-slot": "meter-track",
      ...props
    }
  );
}
function MeterIndicator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MeterIndicator$1,
    {
      className: cn("bg-primary transition-all duration-500", className),
      "data-slot": "meter-indicator",
      ...props
    }
  );
}
function MeterValue({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MeterValue$1,
    {
      className: cn("text-foreground text-sm tabular-nums", className),
      "data-slot": "meter-value",
      ...props
    }
  );
}
export {
  Meter as M,
  MeterLabel as a,
  MeterValue as b,
  MeterTrack as c,
  MeterIndicator as d
};
