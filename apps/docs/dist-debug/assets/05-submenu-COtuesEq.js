import { c as createLucideIcon, j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, i as MenuItem, k as MenuSeparator, dA as MenuSub, dB as MenuSubTrigger, dC as MenuSubPopup } from "./index-DM02Iz28.js";
import { S as Share2 } from "./share-2-BhyTdvdY.js";
import { M as Mail } from "./mail-BvuOZJjS.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M2 9V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1",
      key: "fm4g5t"
    }
  ],
  ["path", { d: "M2 13h10", key: "pgb2dq" }],
  ["path", { d: "m9 16 3-3-3-3", key: "6m91ic" }]
];
const FolderInput = createLucideIcon("folder-input", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
const MessageSquare = createLucideIcon("message-square", __iconNode);
const meta = { title: "子菜单", description: "悬停或按 → 打开子菜单，按 ← 返回上一级。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "工单 #2318" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", className: "w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "标记为已解决" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "复制工单链接" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSub, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSubTrigger, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FolderInput, {}),
          "移动到项目"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSubPopup, { className: "w-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "华东仓储" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "华南门店" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSub, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSubTrigger, { children: "更多项目" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSubPopup, { className: "w-40", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "西南物流" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "华北工厂" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { disabled: true, children: "已归档项目" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSub, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSubTrigger, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, {}),
          "分享"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuSubPopup, { className: "w-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, {}),
            "发送邮件"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, {}),
            "发到群聊"
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
