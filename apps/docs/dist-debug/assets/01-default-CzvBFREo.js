import { j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, i as MenuItem, dv as MenuShortcut, k as MenuSeparator } from "./index-DM02Iz28.js";
import { E as Ellipsis } from "./ellipsis-BiesIFo2.js";
import { P as Pencil } from "./pencil-DgXZTkvr.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
import { S as Share2 } from "./share-2-BhyTdvdY.js";
import { A as Archive } from "./archive-VLGRAM9u.js";
import { T as Trash2 } from "./trash-2-CSLTv-pi.js";
const meta = {
  title: "基础用法",
  description: "图标、快捷键、禁用项和危险操作。危险操作放在最后并用分隔线隔开。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "工单操作", size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", className: "w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, {}),
        "编辑",
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘E" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {}),
        "创建副本",
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘D" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { disabled: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, {}),
        "转交他人"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, {}),
        "归档"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {}),
        "删除",
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌫" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
