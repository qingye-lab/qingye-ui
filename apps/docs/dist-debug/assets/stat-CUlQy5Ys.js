import { c as createLucideIcon, e as cn, a8 as useRender, a9 as mergeProps, q as useUILocale, r as reactExports, j as jsxRuntimeExports, A as ArrowRight } from "./index-DM02Iz28.js";
import { A as ArrowUpRight } from "./arrow-up-right-CCvFLBck.js";
const __iconNode = [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
];
const ArrowDownRight = createLucideIcon("arrow-down-right", __iconNode);
function Stat({
  className,
  render,
  size = "default",
  ...props
}) {
  const defaultProps = {
    className: cn(
      "group/stat flex min-w-0 flex-col gap-2 data-[size=sm]:gap-1.5",
      className
    ),
    "data-size": size,
    "data-slot": "stat"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function StatLabel({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex min-w-0 items-center gap-1.5 font-medium text-muted-foreground text-sm group-data-[size=sm]/stat:text-xs [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    ),
    "data-slot": "stat-label"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function StatValue({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex min-w-0 flex-wrap items-baseline gap-x-1 font-heading font-semibold text-2xl text-foreground leading-none numeric group-data-[size=lg]/stat:text-[2rem] group-data-[size=sm]/stat:text-xl",
      className
    ),
    "data-slot": "stat-value"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function StatUnit({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "font-medium text-muted-foreground text-sm group-data-[size=lg]/stat:text-base group-data-[size=sm]/stat:text-xs",
      className
    ),
    "data-slot": "stat-unit"
  };
  return useRender({
    defaultTagName: "span",
    props: mergeProps(defaultProps, props),
    render
  });
}
const trendIcons = {
  down: ArrowDownRight,
  flat: ArrowRight,
  up: ArrowUpRight
};
function StatDelta({
  className,
  render,
  trend = "flat",
  inverse = false,
  variant = "default",
  trendLabel,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  const sentiment = trend === "flat" ? "neutral" : trend === "up" !== inverse ? "positive" : "negative";
  const Icon = trendIcons[trend];
  const spoken = trendLabel ?? (trend === "up" ? messages.trendUp : trend === "down" ? messages.trendDown : messages.trendFlat);
  const defaultProps = {
    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { "aria-hidden": "true" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sr-only", children: [
        spoken,
        " "
      ] }),
      children
    ] }),
    className: cn(
      "inline-flex w-fit shrink-0 items-center gap-0.5 whitespace-nowrap font-medium text-sm leading-none numeric sm:text-xs [&_svg]:pointer-events-none [&_svg]:-mx-px [&_svg]:size-3.5 [&_svg]:shrink-0 sm:[&_svg]:size-3",
      "data-[sentiment=negative]:text-destructive-foreground data-[sentiment=neutral]:text-muted-foreground data-[sentiment=positive]:text-success-foreground",
      variant === "badge" && "h-5.5 rounded-sm px-1 data-[sentiment=negative]:bg-destructive/8 data-[sentiment=neutral]:bg-muted data-[sentiment=positive]:bg-success/8 sm:h-4.5 dark:data-[sentiment=negative]:bg-destructive/16 dark:data-[sentiment=positive]:bg-success/16",
      className
    ),
    "data-sentiment": sentiment,
    "data-slot": "stat-delta",
    "data-trend": trend,
    "data-variant": variant
  };
  return useRender({
    defaultTagName: "span",
    props: mergeProps(defaultProps, props),
    render
  });
}
function StatDescription({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 text-muted-foreground text-sm sm:text-xs",
      className
    ),
    "data-slot": "stat-description"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
const SPARK_WIDTH = 100;
const SPARK_HEIGHT = 40;
const SPARK_INSET = 3;
function StatSparkline({
  className,
  data,
  fill = true,
  showEnd = true,
  label,
  ...props
}) {
  const gradientId = `stat-spark-${reactExports.useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const points = data.filter((value) => Number.isFinite(value));
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min;
  const coordinates = points.map((value, index) => {
    const x = points.length > 1 ? index / (points.length - 1) * SPARK_WIDTH : SPARK_WIDTH;
    const y = range === 0 ? SPARK_HEIGHT / 2 : SPARK_INSET + (1 - (value - min) / range) * (SPARK_HEIGHT - SPARK_INSET * 2);
    return [x, y];
  });
  const line = coordinates.map(
    ([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`
  ).join(" ");
  const area = `${line} L${SPARK_WIDTH} ${SPARK_HEIGHT} L0 ${SPARK_HEIGHT} Z`;
  const end = coordinates.at(-1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "aria-hidden": label ? void 0 : true,
      "aria-label": label,
      className: cn("relative h-10 w-full text-chart-1", className),
      "data-slot": "stat-sparkline",
      role: label ? "img" : void 0,
      ...props,
      children: [
        coordinates.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            "aria-hidden": "true",
            className: "absolute inset-0 size-full overflow-visible",
            preserveAspectRatio: "none",
            viewBox: `0 0 ${SPARK_WIDTH} ${SPARK_HEIGHT}`,
            children: [
              fill ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: gradientId, x1: "0", x2: "0", y1: "0", y2: "1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "stop",
                    {
                      offset: "0%",
                      stopColor: "currentColor",
                      stopOpacity: 0.16
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "stop",
                    {
                      offset: "100%",
                      stopColor: "currentColor",
                      stopOpacity: 0
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: area, fill: `url(#${gradientId})` })
              ] }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "path",
                {
                  d: line,
                  fill: "none",
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 1.5,
                  vectorEffect: "non-scaling-stroke"
                }
              )
            ]
          }
        ) : null,
        showEnd && end && coordinates.length > 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current ring-2 ring-card",
            "data-slot": "stat-sparkline-end",
            style: {
              left: `${end[0] / SPARK_WIDTH * 100}%`,
              top: `${end[1] / SPARK_HEIGHT * 100}%`
            }
          }
        ) : null
      ]
    }
  );
}
export {
  Stat as S,
  StatLabel as a,
  StatValue as b,
  StatUnit as c,
  StatDescription as d,
  StatDelta as e,
  StatSparkline as f
};
