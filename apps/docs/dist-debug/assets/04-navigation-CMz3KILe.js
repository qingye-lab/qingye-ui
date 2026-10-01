import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { b as segmentedControlRootClassName, c as segmentedControlItemVariants } from "./segmented-control-BQMJ2MA6.js";
const meta = {
  title: "导航链接",
  description: '跳转到不同地址时用真正的链接，当前页标 aria-current="page"。'
};
const item = segmentedControlItemVariants({ state: "current" });
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "项目分区", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: segmentedControlRootClassName, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { "aria-current": "page", className: item, href: "#overview", children: "概览" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: item, href: "#activity", children: "动态" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: item, href: "#settings", children: "设置" })
  ] }) });
}
export {
  Demo as default,
  meta
};
