import { c as createLucideIcon, j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, dD as MenuLinkItem, k as MenuSeparator } from "./index-DM02Iz28.js";
import { B as BookOpen } from "./book-open-BuL6MSKB.js";
import { E as ExternalLink } from "./external-link-CKlK3qRq.js";
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
      key: "q8bfy3"
    }
  ],
  ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", key: "1853fq" }],
  ["path", { d: "M8 6v8", key: "15ugcq" }]
];
const Megaphone = createLucideIcon("megaphone", __iconNode);
const meta = {
  title: "链接项",
  description: "MenuLinkItem 渲染为 <a>，保留新标签页打开、复制链接等原生行为；用 render 接入路由的 Link。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, {}),
      "帮助"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", className: "w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuLinkItem, { href: "#guide", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, {}),
        "使用指南"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuLinkItem, { href: "#changelog", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Megaphone, {}),
        "更新日志"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuLinkItem, { href: "https://base-ui.com", rel: "noreferrer", target: "_blank", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, {}),
        "开发者文档"
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
