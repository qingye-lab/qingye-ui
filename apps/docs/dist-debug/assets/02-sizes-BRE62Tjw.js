import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
const meta = { title: "尺寸", description: "移动端自动加高，≥640px 回到桌面尺寸。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "outline", children: "小" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "默认" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "lg", variant: "outline", children: "大" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", children: "测试版" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { children: "测试版" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "lg", children: "测试版" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
