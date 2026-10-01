import { j as jsxRuntimeExports, B as Button, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { G as Group } from "./group-BcPpzhme.js";
import { C as ChevronLeft } from "./chevron-left-CtqcxRzh.js";
import { T as TextAlignStart, a as TextAlignCenter, b as TextAlignEnd } from "./text-align-start-BwugBTv_.js";
import "./separator-CcYO5Zxi.js";
const meta = { title: "基础用法", description: "相邻按钮合并边框与圆角。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "翻页", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, {}),
        "上一篇"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        "下一篇",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "对齐方式", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "左对齐", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignStart, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "居中", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignCenter, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "右对齐", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignEnd, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "时间范围", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "今天" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "本周" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "本月" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
