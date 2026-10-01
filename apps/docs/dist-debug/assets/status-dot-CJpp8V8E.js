import { q as useUILocale, e as cn, j as jsxRuntimeExports, a8 as useRender, a9 as mergeProps, a7 as cva } from "./index-DM02Iz28.js";
const statusDotIndicatorVariants = cva(
  "relative inline-flex shrink-0 rounded-full bg-current",
  {
    defaultVariants: {
      size: "default",
      status: "neutral"
    },
    variants: {
      size: {
        default: "size-2",
        lg: "size-2.5",
        sm: "size-1.5"
      },
      status: {
        error: "text-destructive",
        info: "text-info",
        neutral: "text-muted-foreground/64",
        // Hollow, so offline stays distinct from neutral without relying on hue.
        offline: "bg-transparent text-muted-foreground/80 shadow-[inset_0_0_0_1.5px_currentColor]",
        online: "text-success",
        warning: "text-warning"
      }
    }
  }
);
function StatusDot({
  className,
  render,
  status = "neutral",
  size = "default",
  pulse = false,
  label,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  const hasVisibleLabel = children !== void 0 && children !== null && children !== false;
  const showPulse = pulse && status !== "offline";
  const defaultProps = {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          "aria-hidden": "true",
          className: statusDotIndicatorVariants({ size, status }),
          "data-slot": "status-dot-indicator",
          children: showPulse ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "absolute inset-0 animate-ping rounded-full bg-current opacity-48 [animation-duration:2s] motion-reduce:hidden",
              "data-slot": "status-dot-pulse"
            }
          ) : null
        }
      ),
      hasVisibleLabel ? children : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: label ?? messages.statusLabel(status) })
    ] }),
    className: cn(
      "inline-flex min-w-0 items-center text-foreground",
      size === "sm" ? "gap-1.5 text-xs" : "gap-2 text-sm",
      className
    ),
    "data-pulse": showPulse ? "" : void 0,
    "data-size": size,
    "data-slot": "status-dot",
    "data-status": status
  };
  return useRender({
    defaultTagName: "span",
    props: mergeProps(defaultProps, props),
    render
  });
}
export {
  StatusDot as S
};
