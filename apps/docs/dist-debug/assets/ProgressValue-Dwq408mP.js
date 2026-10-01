import { r as reactExports, V as formatErrorMessage, Y as useRenderElement, j as jsxRuntimeExports, b2 as clamp, aI as visuallyHidden } from "./index-DM02Iz28.js";
import { f as formatNumber } from "./formatNumber-_NNc_BMA.js";
import { v as valueToPercent } from "./valueToPercent-B3zKfIMz.js";
const ProgressRootContext = /* @__PURE__ */ reactExports.createContext(void 0);
function useProgressRootContext() {
  const context = reactExports.useContext(ProgressRootContext);
  if (context === void 0) {
    throw new Error(formatErrorMessage(51));
  }
  return context;
}
const progressStateAttributesMapping = {
  status(value) {
    return {
      [`data-${value}`]: ""
    };
  }
};
const ProgressRoot = /* @__PURE__ */ reactExports.forwardRef(function ProgressRoot2(componentProps, forwardedRef) {
  const {
    format,
    getAriaValueText,
    locale,
    max = 100,
    min = 0,
    value,
    render,
    className,
    children,
    style,
    ...elementProps
  } = componentProps;
  const [labelId, setLabelId] = reactExports.useState();
  let status = "indeterminate";
  let percentageValue = null;
  let clampedValue = null;
  let formattedValue = "";
  let defaultAriaValueText = "indeterminate progress";
  if (value != null && Number.isFinite(value)) {
    const rawPercentage = valueToPercent(value, min, max);
    percentageValue = clamp(Number.isNaN(rawPercentage) ? 0 : rawPercentage, 0, 100);
    clampedValue = clamp(value, min, max);
    status = clampedValue === max ? "complete" : "progressing";
    formattedValue = format ? formatNumber(clampedValue, locale, format) : formatNumber(percentageValue / 100, locale, {
      style: "percent"
    });
    defaultAriaValueText = formattedValue;
  }
  const state = reactExports.useMemo(() => ({
    status
  }), [status]);
  const defaultProps = {
    "aria-labelledby": labelId,
    "aria-valuemax": max,
    "aria-valuemin": min,
    "aria-valuenow": clampedValue ?? void 0,
    "aria-valuetext": getAriaValueText ? getAriaValueText(formattedValue, value) : defaultAriaValueText,
    role: "progressbar",
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
    state,
    value
  }), [formattedValue, percentageValue, setLabelId, state, value]);
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [defaultProps, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressRootContext.Provider, {
    value: contextValue,
    children: element
  });
});
const ProgressValue = /* @__PURE__ */ reactExports.forwardRef(function ProgressValue2(componentProps, forwardedRef) {
  const {
    className,
    render,
    children,
    style,
    ...elementProps
  } = componentProps;
  const {
    value,
    formattedValue,
    state
  } = useProgressRootContext();
  const indeterminate = state.status === "indeterminate";
  const formattedValueArg = indeterminate ? "indeterminate" : formattedValue;
  const formattedValueDisplay = indeterminate ? null : formattedValue;
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      "aria-hidden": true,
      children: typeof children === "function" ? children(formattedValueArg, value) : formattedValueDisplay
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
export {
  ProgressRoot as P,
  ProgressValue as a,
  progressStateAttributesMapping as p,
  useProgressRootContext as u
};
