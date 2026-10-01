import { j as jsxRuntimeExports, e as cn } from "./index-DM02Iz28.js";
const gapClasses = {
  0: "gap-0",
  1: "gap-(--qy-space-1)",
  2: "gap-(--qy-space-2)",
  3: "gap-(--qy-space-3)",
  4: "gap-(--qy-space-4)",
  5: "gap-(--qy-space-5)",
  6: "gap-(--qy-space-6)",
  8: "gap-(--qy-space-8)",
  10: "gap-(--qy-space-10)",
  12: "gap-(--qy-space-12)",
  16: "gap-(--qy-space-16)"
};
const alignClasses = {
  baseline: "items-baseline",
  center: "items-center",
  end: "items-end",
  start: "items-start",
  stretch: "items-stretch"
};
const justifyClasses = {
  between: "justify-between",
  center: "justify-center",
  end: "justify-end",
  start: "justify-start"
};
function Stack({
  as,
  gap = 4,
  align = "stretch",
  className,
  ...props
}) {
  const Component = as ?? "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Component,
    {
      className: cn("flex min-w-0 flex-col", gapClasses[gap], alignClasses[align], className),
      "data-slot": "stack",
      ...props
    }
  );
}
function Inline({
  as,
  gap = 2,
  align = "center",
  justify = "start",
  wrap = true,
  className,
  ...props
}) {
  const Component = as ?? "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Component,
    {
      className: cn(
        "flex min-w-0",
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className
      ),
      "data-slot": "inline",
      ...props
    }
  );
}
const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
};
function Grid({
  as,
  columns = 1,
  minItemWidth,
  gap = 4,
  className,
  style,
  ...props
}) {
  const Component = as ?? "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Component,
    {
      className: cn(
        "grid min-w-0",
        minItemWidth ? "grid-cols-[repeat(auto-fill,minmax(min(var(--grid-min-item),100%),1fr))]" : columnClasses[columns],
        gapClasses[gap],
        className
      ),
      "data-slot": "grid",
      style: minItemWidth ? { "--grid-min-item": minItemWidth, ...style } : style,
      ...props
    }
  );
}
const sizeClasses = {
  body: "text-body",
  caption: "text-caption",
  label: "text-label"
};
const toneClasses = {
  danger: "text-destructive-foreground",
  default: "text-foreground",
  muted: "text-muted-foreground",
  success: "text-success-foreground",
  warning: "text-warning-foreground"
};
function Text({
  as,
  size = "body",
  tone,
  className,
  ...props
}) {
  const Component = as ?? "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Component,
    {
      className: cn(sizeClasses[size], tone && toneClasses[tone], className),
      "data-slot": "text",
      ...props
    }
  );
}
export {
  Grid as G,
  Inline as I,
  Stack as S,
  Text as T
};
