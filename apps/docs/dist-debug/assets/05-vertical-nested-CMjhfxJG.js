import { j as jsxRuntimeExports, B as Button, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { G as Group, a as GroupSeparator } from "./group-BcPpzhme.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
import { M as Minus } from "./minus-CRNaljKP.js";
import { C as ChevronLeft } from "./chevron-left-CtqcxRzh.js";
import "./separator-CcYO5Zxi.js";
const meta = { title: "纵向与嵌套", description: "纵向组里分隔线用 horizontal；嵌套的子组之间保留间距。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "地图缩放", orientation: "vertical", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "放大", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, { orientation: "horizontal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "缩小", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "翻页", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "页码", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "numeric", variant: "outline", children: "1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "numeric", variant: "outline", children: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "numeric", variant: "outline", children: "3" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "前后翻页", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "上一页", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "rtl:-scale-x-100" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "下一页", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "rtl:-scale-x-100" }) })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
