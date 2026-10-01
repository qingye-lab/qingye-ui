import { j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, i as MenuItem } from "./index-DM02Iz28.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
const meta = { title: "悬停打开", description: "openOnHover 适合顶部导航；触屏上仍然点击打开。" };
const products = ["设备管理", "工单中心", "数据看板", "开放平台"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { openOnHover: true, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: [
      "产品",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuPopup, { align: "start", className: "w-40", children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: product }, product)) })
  ] });
}
export {
  Demo as default,
  meta
};
