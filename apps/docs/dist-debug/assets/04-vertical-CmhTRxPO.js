import { c as createLucideIcon, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { G as Group, a as GroupSeparator } from "./group-BcPpzhme.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
import { M as Minus } from "./minus-CRNaljKP.js";
import { L as Layers } from "./layers-DinC0tSz.js";
import "./separator-CcYO5Zxi.js";
const __iconNode = [
  ["line", { x1: "2", x2: "5", y1: "12", y2: "12", key: "bvdh0s" }],
  ["line", { x1: "19", x2: "22", y1: "12", y2: "12", key: "1tbv5k" }],
  ["line", { x1: "12", x2: "12", y1: "2", y2: "5", key: "11lu5j" }],
  ["line", { x1: "12", x2: "12", y1: "19", y2: "22", key: "x3vr5v" }],
  ["circle", { cx: "12", cy: "12", r: "7", key: "fim9np" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const LocateFixed = createLucideIcon("locate-fixed", __iconNode);
const meta = { title: "纵向与嵌套", description: 'orientation="vertical" 纵向排列；嵌套的按钮组之间自动留出间距。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "地图缩放", orientation: "vertical", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "放大", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "缩小", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "地图工具", orientation: "vertical", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "回到当前位置", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LocateFixed, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, { orientation: "horizontal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "切换图层", size: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "编辑工具栏", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "撤销" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "重做" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "预览" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "分享" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
