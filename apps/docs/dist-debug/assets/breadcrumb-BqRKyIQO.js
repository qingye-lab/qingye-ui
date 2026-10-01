import { q as useUILocale, j as jsxRuntimeExports, e as cn, a8 as useRender, a9 as mergeProps, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { E as Ellipsis } from "./ellipsis-BiesIFo2.js";
function Breadcrumb({
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": messages.breadcrumb, "data-slot": "breadcrumb", ...props });
}
function BreadcrumbList({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ol",
    {
      className: cn(
        "wrap-break-word flex flex-wrap items-center gap-1.5 text-muted-foreground text-sm sm:gap-2.5",
        className
      ),
      "data-slot": "breadcrumb-list",
      ...props
    }
  );
}
function BreadcrumbItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      className: cn("inline-flex items-center gap-1.5", className),
      "data-slot": "breadcrumb-item",
      ...props
    }
  );
}
function BreadcrumbLink({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
      className
    ),
    "data-slot": "breadcrumb-link"
  };
  return useRender({
    defaultTagName: "a",
    props: mergeProps(defaultProps, props),
    render
  });
}
function BreadcrumbPage({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      "aria-current": "page",
      className: cn("font-normal text-foreground", className),
      "data-slot": "breadcrumb-page",
      ...props
    }
  );
}
function BreadcrumbSeparator({
  children,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      "aria-hidden": "true",
      className: cn("opacity-80 [&>svg]:size-4 rtl:[&>svg]:-scale-x-100", className),
      "data-slot": "breadcrumb-separator",
      role: "presentation",
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, {})
    }
  );
}
function BreadcrumbEllipsis({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      "aria-hidden": "true",
      className,
      "data-slot": "breadcrumb-ellipsis",
      role: "presentation",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "size-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: messages.more })
      ]
    }
  );
}
export {
  Breadcrumb as B,
  BreadcrumbList as a,
  BreadcrumbItem as b,
  BreadcrumbLink as c,
  BreadcrumbSeparator as d,
  BreadcrumbPage as e,
  BreadcrumbEllipsis as f
};
