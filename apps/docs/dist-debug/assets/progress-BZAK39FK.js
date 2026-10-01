import { r as reactExports, Y as useRenderElement, j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { u as useProgressRootContext, p as progressStateAttributesMapping, P as ProgressRoot, a as ProgressValue$1 } from "./ProgressValue-Dwq408mP.js";
import { u as useRegisteredLabelId } from "./useRegisteredLabelId-CQd8UikR.js";
const ProgressTrack$1 = /* @__PURE__ */ reactExports.forwardRef(function ProgressTrack2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    state
  } = useProgressRootContext();
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: elementProps,
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
const ProgressIndicator$1 = /* @__PURE__ */ reactExports.forwardRef(function ProgressIndicator2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    ...elementProps
  } = componentProps;
  const {
    percentageValue,
    state
  } = useProgressRootContext();
  const indicatorStyle = percentageValue == null ? {} : {
    insetInlineStart: 0,
    height: "inherit",
    width: `${percentageValue}%`
  };
  const element = useRenderElement("div", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      style: indicatorStyle
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
const ProgressLabel$1 = /* @__PURE__ */ reactExports.forwardRef(function ProgressLabel2(componentProps, forwardedRef) {
  const {
    render,
    className,
    style,
    id: idProp,
    ...elementProps
  } = componentProps;
  const {
    setLabelId,
    state
  } = useProgressRootContext();
  const id = useRegisteredLabelId(idProp, setLabelId);
  const element = useRenderElement("span", componentProps, {
    state,
    ref: forwardedRef,
    props: [{
      id,
      role: "presentation"
    }, elementProps],
    stateAttributesMapping: progressStateAttributesMapping
  });
  return element;
});
function Progress({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProgressRoot,
    {
      className: cn("flex w-full flex-col gap-2", className),
      "data-slot": "progress",
      ...props,
      children: children ? children : /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, {}) })
    }
  );
}
function ProgressLabel({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProgressLabel$1,
    {
      className: cn("font-medium text-sm", className),
      "data-slot": "progress-label",
      ...props
    }
  );
}
function ProgressTrack({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProgressTrack$1,
    {
      className: cn(
        "block h-1.5 w-full overflow-hidden rounded-full bg-input",
        className
      ),
      "data-slot": "progress-track",
      ...props
    }
  );
}
function ProgressIndicator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProgressIndicator$1,
    {
      className: cn(
        "bg-primary transition-all duration-500",
        // Indeterminate (value={null}): a soft band sweeps the track, reusing the
        // skeleton keyframes; with reduced motion it only breathes in opacity.
        "data-indeterminate:h-full data-indeterminate:w-full data-indeterminate:animate-skeleton data-indeterminate:bg-transparent data-indeterminate:bg-[linear-gradient(90deg,transparent_28%,var(--color-primary)_42%,var(--color-primary)_58%,transparent_72%)] data-indeterminate:bg-size-[200%_100%] motion-reduce:data-indeterminate:animate-pulse motion-reduce:data-indeterminate:bg-primary/40 motion-reduce:data-indeterminate:bg-none",
        className
      ),
      "data-slot": "progress-indicator",
      ...props
    }
  );
}
function ProgressValue({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProgressValue$1,
    {
      className: cn("text-sm tabular-nums", className),
      "data-slot": "progress-value",
      ...props
    }
  );
}
export {
  Progress as P,
  ProgressLabel as a,
  ProgressValue as b,
  ProgressTrack as c,
  ProgressIndicator as d
};
