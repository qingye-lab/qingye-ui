import { c as createLucideIcon, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { I as Item, a as ItemMedia, b as ItemContent, c as ItemTitle, d as ItemDescription, e as ItemActions } from "./item-CPHg7cF5.js";
import { S as ShieldCheck } from "./shield-check-CQJ_3MSV.js";
import "./separator-CcYO5Zxi.js";
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M22 8c0-2.3-.8-4.3-2-6", key: "5bb3ad" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ],
  ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8", key: "tap9e0" }]
];
const BellRing = createLucideIcon("bell-ring", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
const meta = { title: "样式", description: "default 透明、outline 卡片面、muted 浅底。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-lg flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTitle, { children: "告警通知" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDescription, { children: "设备离线超过 10 分钟时，通过短信与企业微信通知店长。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "设置" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTitle, { children: "两步验证" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDescription, { children: "登录后台时需要输入手机验证码。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "管理" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { variant: "muted", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Wallet, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTitle, { children: "结算账户" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDescription, { children: "招商银行 · 尾号 0937，每周一自动结算。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "ghost", children: "更换" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
