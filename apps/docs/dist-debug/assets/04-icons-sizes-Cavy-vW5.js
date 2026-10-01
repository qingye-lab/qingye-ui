import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Steps } from "./steps-CDSSOOyT.js";
import { C as CreditCard } from "./credit-card-Civp1UKp.js";
const __iconNode$2 = [
  ["path", { d: "M12 22V12", key: "d0xqtd" }],
  ["path", { d: "m16 17 2 2 4-4", key: "uh5qu3" }],
  [
    "path",
    {
      d: "M21 11.127V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.32-.753",
      key: "kpkbpo"
    }
  ],
  ["path", { d: "M3.29 7 12 12l8.71-5", key: "19ckod" }],
  ["path", { d: "m7.5 4.27 8.997 5.148", key: "9yrvtv" }]
];
const PackageCheck = createLucideIcon("package-check", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
const ShoppingCart = createLucideIcon("shopping-cart", __iconNode$1);
const __iconNode = [
  ["path", { d: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", key: "wrbu53" }],
  ["path", { d: "M15 18H9", key: "1lyqi6" }],
  [
    "path",
    {
      d: "M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",
      key: "lysw3i"
    }
  ],
  ["circle", { cx: "17", cy: "18", r: "2", key: "332jqn" }],
  ["circle", { cx: "7", cy: "18", r: "2", key: "19iecd" }]
];
const Truck = createLucideIcon("truck", __iconNode);
const meta = { title: "图标与尺寸", description: 'icon 替换序号；size="sm" 适合卡片和侧栏。' };
const items = [
  { id: "order", title: "已下单", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, {}) },
  { id: "pay", title: "已付款", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, {}) },
  { id: "ship", title: "运输中", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, {}) },
  { id: "sign", title: "已签收", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PackageCheck, {}) }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xl flex-col gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Steps, { current: 2, items, label: "订单进度" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Steps, { current: 2, items, label: "订单进度（小）", size: "sm" })
  ] });
}
export {
  Demo as default,
  meta
};
