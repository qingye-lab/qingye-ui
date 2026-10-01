import { j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, i as MenuItem, k as MenuSeparator } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, f as CardAction, d as CardPanel } from "./card-BUhACMgh.js";
import { E as Ellipsis } from "./ellipsis-BiesIFo2.js";
const meta = { title: "头部操作", description: "CardAction 跨标题与说明两行，固定在右上角。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "生产环境" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "main 分支 · 2 分钟前部署" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardAction, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon-sm", variant: "ghost", "aria-label": "更多操作" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "重新部署" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "查看构建日志" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { variant: "destructive", children: "回滚到上一版本" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "域名" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "truncate", children: "shop.yanqing.cn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "区域" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { children: "华东 1（杭州）" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "构建耗时" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "numeric", children: "48 秒" })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
