import { c as createLucideIcon, j as jsxRuntimeExports, T as Tooltip, v as TooltipTrigger, D as Search, B as Button, w as TooltipPopup, P as KbdGroup, K as Kbd } from "./index-DM02Iz28.js";
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
const meta = { title: "附带快捷键", description: "在提示里用 Kbd 标出快捷键，帮助用户逐步记住。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "搜索", size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipPopup, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        "搜索",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "K" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Save, {}),
        "保存草稿"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipPopup, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        "保存到本机",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "S" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
