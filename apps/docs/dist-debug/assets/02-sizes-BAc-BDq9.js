import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { G as Group, a as GroupSeparator } from "./group-BcPpzhme.js";
import "./separator-CcYO5Zxi.js";
const meta = { title: "尺寸与禁用", description: "组内控件统一尺寸；单个按钮可禁用。" };
const sizes = ["sm", "default", "lg"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-4", children: sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "缩放", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size, variant: "outline", children: "缩小" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "numeric", disabled: true, size, variant: "outline", children: "100%" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size, variant: "outline", children: "放大" })
  ] }, size)) });
}
export {
  Demo as default,
  meta
};
