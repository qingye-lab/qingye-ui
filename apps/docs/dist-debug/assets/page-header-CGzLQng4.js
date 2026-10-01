import { e as cn, a8 as useRender, a9 as mergeProps, q as useUILocale, j as jsxRuntimeExports, B as Button, y as ArrowLeft } from "./index-DM02Iz28.js";
function PageHeader({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex min-w-0 flex-wrap items-start gap-x-3 gap-y-4",
      "*:data-[slot=breadcrumb]:-mb-1 *:data-[slot=breadcrumb]:basis-full *:data-[slot=page-header-nav]:-mb-1 *:data-[slot=page-header-nav]:basis-full",
      className
    ),
    "data-slot": "page-header"
  };
  return useRender({
    defaultTagName: "header",
    props: mergeProps(defaultProps, props),
    render
  });
}
function PageHeaderBack({
  className,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      "aria-label": messages.back,
      className: cn("shrink-0 max-sm:-my-0.5 sm:my-0.5", className),
      "data-slot": "page-header-back",
      size: "icon-sm",
      variant: "outline",
      ...props,
      children: children ?? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { "aria-hidden": "true", className: "rtl:-scale-x-100" })
    }
  );
}
function PageHeaderContent({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "me-3 flex min-w-0 flex-[1_1_15rem] flex-col gap-1",
      className
    ),
    "data-slot": "page-header-content"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function PageHeaderTitle({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "wrap-break-word text-balance font-heading font-semibold text-foreground text-xl/7 sm:text-2xl/8",
      className
    ),
    "data-slot": "page-header-title"
  };
  return useRender({
    defaultTagName: "h1",
    props: mergeProps(defaultProps, props),
    render
  });
}
function PageHeaderDescription({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "max-w-[72ch] text-pretty text-muted-foreground text-sm",
      className
    ),
    "data-slot": "page-header-description"
  };
  return useRender({
    defaultTagName: "p",
    props: mergeProps(defaultProps, props),
    render
  });
}
function PageHeaderMeta({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "mt-2 flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:shrink-0",
      className
    ),
    "data-slot": "page-header-meta"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function PageHeaderActions({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "flex max-w-full shrink-0 flex-wrap items-center gap-2",
      className
    ),
    "data-slot": "page-header-actions"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
export {
  PageHeader as P,
  PageHeaderContent as a,
  PageHeaderTitle as b,
  PageHeaderDescription as c,
  PageHeaderActions as d,
  PageHeaderMeta as e,
  PageHeaderBack as f
};
