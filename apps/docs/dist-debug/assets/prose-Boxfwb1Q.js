import { c as createLucideIcon, r as reactExports, E as pageTitle, j as jsxRuntimeExports, e as cn, L as Link$1, F as TriangleAlert, I as Info, H as useHashLink } from "./index-DM02Iz28.js";
import { A as Alert, a as AlertTitle, b as AlertDescription } from "./alert-twlv_qhe.js";
const __iconNode = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode);
function useDocumentTitle(title) {
  reactExports.useEffect(() => {
    document.title = pageTitle(title);
  }, [title]);
}
function PageHeader({
  title,
  description,
  documentTitle,
  children,
  className
}) {
  useDocumentTitle(documentTitle ?? (typeof title === "string" ? title : void 0));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: cn("flex flex-col gap-3 pb-6", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-balance font-semibold text-[1.75rem] text-foreground-strong leading-tight sm:text-[2rem]", tabIndex: -1, children: title }),
    description ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-[40rem] text-pretty text-[1rem] text-muted-foreground leading-relaxed", children: description }) : null,
    children
  ] });
}
function Anchor({ id, children }) {
  const onHashClick = useHashLink();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "group/anchor focus-ring inline-flex items-center gap-2 rounded-sm", href: `#${id}`, onClick: (event) => onHashClick(event, id), children: [
    children,
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        "aria-hidden": "true",
        className: "size-3.5 text-muted-foreground opacity-0 transition-opacity group-hover/anchor:opacity-72 group-focus-visible/anchor:opacity-72"
      }
    )
  ] });
}
function H2({ id, children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h2",
    {
      className: cn(
        "mt-14 mb-4 font-semibold text-[1.3125rem] text-foreground-strong leading-snug first:mt-0 [header+&]:mt-6",
        className
      ),
      "data-toc": "2",
      id,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { id, children })
    }
  );
}
function H3({ id, children, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "h3",
    {
      className: cn("mt-10 mb-3 font-semibold text-[1.0625rem] text-foreground-strong leading-snug [h2+&]:mt-5", className),
      "data-toc": "3",
      id,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { id, children })
    }
  );
}
function P({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("my-4 max-w-[42rem] text-pretty text-[0.9375rem] text-foreground/90 leading-[1.8]", className), ...props });
}
function Ul({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      className: cn(
        "my-4 flex max-w-[42rem] flex-col gap-2 ps-5 text-[0.9375rem] text-foreground/90 leading-[1.75] marker:text-foreground-subtle [list-style:disc]",
        className
      ),
      ...props
    }
  );
}
function Code({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: cn("docs-inline-code", className), ...props });
}
const linkClass = "focus-ring rounded-sm font-medium text-foreground-strong underline decoration-foreground/24 underline-offset-[0.22em] transition-[text-decoration-color] hover:decoration-foreground/72";
function A({ href, className, children, ...props }) {
  if (/^https?:/.test(href)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: cn(linkClass, className), href, rel: "noreferrer", target: "_blank", ...props, children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Link$1, { className: cn(linkClass, className), to: href, ...props, children });
}
function Callout({
  tone = "info",
  title,
  children,
  className
}) {
  const Icon = tone === "warning" ? TriangleAlert : Info;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: cn("my-6 max-w-[42rem]", className), role: "note", variant: tone, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { "aria-hidden": "true" }),
    title ? /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: title }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-foreground/80 leading-relaxed", children })
  ] });
}
function Facts({ items, className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: cn("my-6 grid max-w-[42rem] grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-[minmax(7rem,auto)_1fr]", className), children: items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "contents", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "font-medium text-[0.875rem] text-foreground-strong sm:pt-px", children: item.term }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "-mt-2 text-[0.9375rem] text-foreground/85 leading-relaxed sm:mt-0", children: item.detail })
  ] }, index)) });
}
export {
  A,
  Code as C,
  Facts as F,
  H2 as H,
  PageHeader as P,
  Ul as U,
  P as a,
  Callout as b,
  H3 as c,
  useDocumentTitle as u
};
