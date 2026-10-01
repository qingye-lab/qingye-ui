import { q as useUILocale, j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
import { P as ProgressRoot, a as ProgressValue } from "./ProgressValue-Dwq408mP.js";
const sizes = {
  default: { box: "size-10", px: 40, stroke: 3.5, text: "text-[0.6875rem]" },
  lg: { box: "size-16", px: 64, stroke: 4, text: "text-sm" },
  sm: { box: "size-6", px: 24, stroke: 2.5, text: "hidden" },
  xl: { box: "size-24", px: 96, stroke: 5, text: "text-xl" },
  xs: { box: "size-4", px: 16, stroke: 2, text: "hidden" }
};
const statusClasses = {
  default: "text-primary",
  error: "text-destructive",
  info: "text-info",
  success: "text-success",
  warning: "text-warning"
};
const VIEWBOX = 100;
function ProgressCircle({
  className,
  value,
  min = 0,
  max = 100,
  size = "default",
  strokeWidth,
  status = "default",
  showValue = false,
  getAriaValueText,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  const config = sizes[size];
  const indeterminate = value === null || !Number.isFinite(value);
  const range = max - min;
  const percent = indeterminate ? 25 : Math.min(100, Math.max(0, range > 0 ? (value - min) / range * 100 : 0));
  const stroke = (strokeWidth ?? config.stroke) / config.px * VIEWBOX;
  const radius = (VIEWBOX - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - percent / 100);
  const centre = children ?? (showValue && !indeterminate ? /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressValue, {}) : null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ProgressRoot,
    {
      className: cn(
        "relative inline-flex shrink-0 items-center justify-center",
        config.box,
        className
      ),
      "data-size": size,
      "data-slot": "progress-circle",
      "data-status": status,
      getAriaValueText: getAriaValueText ?? ((formatted, current) => current === null ? messages.loading : formatted),
      max,
      min,
      value: indeterminate ? null : value,
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "aria-hidden": "true",
            className: cn(
              "absolute inset-0 size-full -rotate-90",
              indeterminate && "animate-spin [animation-duration:1.1s] motion-reduce:[animation-duration:2.4s]"
            ),
            "data-slot": "progress-circle-svg",
            fill: "none",
            viewBox: `0 0 ${VIEWBOX} ${VIEWBOX}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  className: "stroke-input",
                  cx: VIEWBOX / 2,
                  cy: VIEWBOX / 2,
                  "data-slot": "progress-circle-track",
                  r: radius,
                  strokeWidth: stroke
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  className: cn(
                    "stroke-current transition-[stroke-dashoffset,opacity] duration-(--qy-duration-slow) ease-(--qy-ease-out)",
                    statusClasses[status],
                    percent === 0 && "opacity-0"
                  ),
                  cx: VIEWBOX / 2,
                  cy: VIEWBOX / 2,
                  "data-slot": "progress-circle-indicator",
                  r: radius,
                  strokeDasharray: circumference,
                  strokeDashoffset: offset,
                  strokeLinecap: "round",
                  strokeWidth: stroke
                }
              )
            ]
          }
        ),
        centre !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "relative font-medium text-foreground leading-none numeric",
              size === "lg" || size === "xl" ? "font-semibold" : void 0,
              config.text
            ),
            "data-slot": "progress-circle-value",
            children: centre
          }
        ) : null
      ]
    }
  );
}
export {
  ProgressCircle as P
};
