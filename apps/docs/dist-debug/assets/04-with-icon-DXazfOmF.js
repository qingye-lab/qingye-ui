import { j as jsxRuntimeExports, B as Button, A as ArrowRight } from "./index-DM02Iz28.js";
import { D as Download } from "./download-8gLaOvAL.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import { T as Trash2 } from "./trash-2-CSLTv-pi.js";
const meta = {
  title: "带图标",
  description: "图标放在文字前表示动作类型，放在文字后表示去向或展开。图标会自动调整尺寸与透明度。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { "aria-hidden": "true" }),
      "导出报表"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
      "下一步",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", children: [
      "全部状态",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "destructive-outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { "aria-hidden": "true" }),
      "移入回收站"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
