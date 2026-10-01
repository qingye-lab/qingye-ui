import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as ChevronLeft } from "./chevron-left-CtqcxRzh.js";
import { E as ExternalLink } from "./external-link-CKlK3qRq.js";
const meta = {
  title: "作为链接",
  description: "导航用 render 渲染为 <a>，并设 nativeButton={false}，保留按钮外观与链接语义。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { nativeButton: false, render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#orders" }), variant: "link", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { "aria-hidden": "true" }),
      "返回订单列表"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        nativeButton: false,
        render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://example.com/help", rel: "noreferrer", target: "_blank" }),
        variant: "outline",
        children: [
          "帮助中心",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { "aria-hidden": "true" })
        ]
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
