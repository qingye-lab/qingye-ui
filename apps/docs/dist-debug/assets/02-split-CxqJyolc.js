import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, f as Menu, g as MenuTrigger, h as MenuPopup, i as MenuItem, k as MenuSeparator } from "./index-DM02Iz28.js";
import { G as Group, a as GroupSeparator } from "./group-BcPpzhme.js";
import { S as Send } from "./send-C5jMddXt.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
import "./separator-CcYO5Zxi.js";
const __iconNode = [
  [
    "path",
    {
      d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
      key: "1oefj6"
    }
  ],
  ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
  ["path", { d: "M12 18v-6", key: "17g6i2" }],
  ["path", { d: "m9 15 3 3 3-3", key: "1npd3o" }]
];
const FileDown = createLucideIcon("file-down", __iconNode);
const meta = { title: "拆分按钮", description: "主操作旁附一个展开更多选项的菜单。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "发布", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, {}),
        "发布"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "更多发布选项", size: "icon" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "定时发布…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "发布到测试环境" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "保存为草稿" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "导出", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FileDown, {}),
        "导出 Excel"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "更多导出格式", size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "导出 CSV" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "导出 PDF" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {}),
            "复制为表格"
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
