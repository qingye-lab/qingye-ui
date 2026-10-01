import { r as reactExports, e as cn, a8 as useRender, a9 as mergeProps, j as jsxRuntimeExports, q as useUILocale } from "./index-DM02Iz28.js";
import { C as CopyButton } from "./copy-button-B3gSj0u1.js";
const DescriptionListContext = reactExports.createContext(
  {
    divided: false,
    layout: "horizontal"
  }
);
function DescriptionList({
  className,
  render,
  layout = "horizontal",
  divided = false,
  ...props
}) {
  const context = reactExports.useMemo(() => ({ divided, layout }), [divided, layout]);
  const defaultProps = {
    className: cn(
      "m-0 min-w-0 text-sm [--description-list-column:10rem] [--description-list-term:--spacing(24)] sm:[--description-list-term:--spacing(36)]",
      layout === "grid" ? cn(
        "grid grid-cols-[repeat(auto-fill,minmax(min(100%,var(--description-list-column)),1fr))]",
        // Divided grids run their hairlines edge to edge across a row.
        divided ? "gap-x-0" : "gap-x-6"
      ) : "flex flex-col",
      divided ? "gap-y-0" : layout === "grid" ? "gap-y-5" : "gap-y-3",
      className
    ),
    "data-divided": divided ? "" : void 0,
    "data-layout": layout,
    "data-slot": "description-list"
  };
  const element = useRender({
    defaultTagName: "dl",
    props: mergeProps(defaultProps, props),
    render
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionListContext.Provider, { value: context, children: element });
}
function DescriptionListItem({
  className,
  render,
  ...props
}) {
  const { layout, divided } = reactExports.useContext(DescriptionListContext);
  const defaultProps = {
    className: cn(
      "min-w-0",
      layout === "horizontal" ? "grid grid-cols-[minmax(0,var(--description-list-term))_minmax(0,1fr)] gap-x-4" : "flex flex-col gap-1",
      divided && (layout === "grid" ? "border-t pt-3 pe-6 pb-4" : "py-3 not-last:border-b first:pt-0 last:pb-0"),
      className
    ),
    "data-slot": "description-list-item"
  };
  return useRender({
    defaultTagName: "div",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DescriptionTerm({
  className,
  render,
  ...props
}) {
  const defaultProps = {
    className: cn(
      "wrap-break-word flex min-w-0 items-center gap-1.5 self-start text-muted-foreground leading-6 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4 sm:[&_svg:not([class*='size-'])]:size-3.5 [&_svg]:pointer-events-none [&_svg]:shrink-0",
      className
    ),
    "data-slot": "description-term"
  };
  return useRender({
    defaultTagName: "dt",
    props: mergeProps(defaultProps, props),
    render
  });
}
function DescriptionDetails({
  className,
  render,
  copyValue,
  copyLabel,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  const copyable = copyValue !== void 0;
  const defaultProps = {
    children: copyable ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "min-w-0", "data-slot": "description-details-value", children }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CopyButton,
        {
          className: "shrink-0 text-muted-foreground hover:text-foreground max-sm:-my-0.5",
          copyLabel: copyLabel ?? messages.copy,
          size: "icon-xs",
          value: copyValue,
          variant: "ghost"
        }
      )
    ] }) : children,
    className: cn(
      "wrap-break-word m-0 min-w-0 text-foreground leading-6",
      copyable && "flex items-start gap-1",
      className
    ),
    "data-slot": "description-details"
  };
  return useRender({
    defaultTagName: "dd",
    props: mergeProps(defaultProps, props),
    render
  });
}
export {
  DescriptionList as D,
  DescriptionListItem as a,
  DescriptionTerm as b,
  DescriptionDetails as c
};
