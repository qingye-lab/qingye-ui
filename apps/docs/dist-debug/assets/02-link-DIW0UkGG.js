import { c as createLucideIcon, j as jsxRuntimeExports, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { I as Item, a as ItemMedia, b as ItemContent, c as ItemTitle, d as ItemDescription, e as ItemActions } from "./item-CPHg7cF5.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
import "./separator-CcYO5Zxi.js";
const __iconNode = [
  ["path", { d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5", key: "slp6dd" }],
  [
    "path",
    {
      d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244",
      key: "o0xfot"
    }
  ],
  ["path", { d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05", key: "wn3emo" }]
];
const Store = createLucideIcon("store", __iconNode);
const meta = {
  title: "可点击与尺寸",
  description: "render 渲染为链接后获得悬停底色与键盘焦点环；sm 用于紧凑列表。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-lg flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#store" }), variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Store, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemTitle, { children: [
          "徐汇漕溪北路店",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "营业中" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDescription, { children: "今日订单 286 单 · 3 台设备在线" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { "aria-hidden": "true", className: "size-4 text-muted-foreground" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#report" }), size: "sm", variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemMedia, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTitle, { children: "9 月经营月报.pdf" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemActions, { className: "text-muted-foreground text-xs numeric", children: "2.4 MB" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#invoice" }), size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemMedia, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTitle, { children: "2026 年第三季度发票汇总.xlsx" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemActions, { className: "text-muted-foreground text-xs numeric", children: "186 KB" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
