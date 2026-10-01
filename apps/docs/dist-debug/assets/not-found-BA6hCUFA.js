import { j as jsxRuntimeExports, x as useSearch, B as Button, y as ArrowLeft, L as Link, D as Search } from "./index-DM02Iz28.js";
import { u as useDocumentTitle } from "./prose-Boxfwb1Q.js";
import "./alert-twlv_qhe.js";
function NotFoundContent({ detail }) {
  useDocumentTitle("页面不存在");
  const { openSearch } = useSearch();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "flex flex-col items-start gap-5 py-6 sm:py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-muted-foreground text-sm numeric", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-semibold text-[1.75rem] text-foreground-strong leading-tight sm:text-[2rem]", tabIndex: -1, children: "没有找到这个页面" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-[34rem] text-pretty text-[0.9375rem] text-muted-foreground leading-relaxed", children: [
      detail ?? "链接可能已经调整，或者地址里有拼写错误。",
      "可以回到文档首页，或者直接搜索想找的组件。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { nativeButton: false, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/docs" }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { "aria-hidden": "true" }),
        "回到文档"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: openSearch, variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { "aria-hidden": "true" }),
        "搜索"
      ] })
    ] })
  ] });
}
function NotFoundPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "mx-auto w-full max-w-[90rem] px-4 pt-10 pb-24 outline-none sm:px-6 lg:px-8", id: "main", tabIndex: -1, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-[48rem]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NotFoundContent, {}) }) });
}
export {
  NotFoundContent,
  NotFoundPage as default
};
