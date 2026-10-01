import { q as useUILocale, j as jsxRuntimeExports, e as cn, c6 as buttonVariants, a8 as useRender, a9 as mergeProps, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { C as ChevronLeft } from "./chevron-left-CtqcxRzh.js";
import { E as Ellipsis } from "./ellipsis-BiesIFo2.js";
function Pagination({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "nav",
    {
      "aria-label": messages.pagination,
      className: cn("mx-auto flex w-full justify-center", className),
      "data-slot": "pagination",
      ...props
    }
  );
}
function PaginationContent({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      className: cn("flex flex-row items-center gap-1", className),
      "data-slot": "pagination-content",
      ...props
    }
  );
}
function PaginationItem({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { "data-slot": "pagination-item", ...props });
}
function PaginationLink({
  className,
  isActive,
  disabled = false,
  size = "icon",
  render,
  ...props
}) {
  const defaultProps = {
    "aria-current": isActive ? "page" : void 0,
    className: render ? className : cn(
      buttonVariants({
        size,
        variant: isActive ? "outline" : "ghost"
      }),
      "numeric aria-disabled:pointer-events-none aria-disabled:opacity-64",
      className
    ),
    "data-active": isActive,
    "data-slot": "pagination-link"
  };
  const disabledProps = disabled ? {
    "aria-disabled": true,
    "data-disabled": "",
    href: void 0,
    onClick: void 0,
    role: "link",
    tabIndex: -1
  } : void 0;
  return useRender({
    defaultTagName: "a",
    props: mergeProps(defaultProps, { ...props, ...disabledProps }),
    render
  });
}
function PaginationPrevious({
  className,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PaginationLink,
    {
      "aria-label": messages.previousPage,
      className: cn("max-sm:aspect-square max-sm:p-0", className),
      size: "default",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "sm:-ms-1 rtl:-scale-x-100" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-sm:hidden", children: children ?? messages.previousPage })
      ]
    }
  );
}
function PaginationNext({
  className,
  children,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PaginationLink,
    {
      "aria-label": messages.nextPage,
      className: cn("max-sm:aspect-square max-sm:p-0", className),
      size: "default",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-sm:hidden", children: children ?? messages.nextPage }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "sm:-me-1 rtl:-scale-x-100" })
      ]
    }
  );
}
function PaginationEllipsis({
  className,
  ...props
}) {
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      "aria-hidden": true,
      className: cn("flex min-w-7 justify-center", className),
      "data-slot": "pagination-ellipsis",
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { className: "size-5 sm:size-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: messages.morePages })
      ]
    }
  );
}
export {
  Pagination as P,
  PaginationContent as a,
  PaginationItem as b,
  PaginationPrevious as c,
  PaginationLink as d,
  PaginationEllipsis as e,
  PaginationNext as f
};
