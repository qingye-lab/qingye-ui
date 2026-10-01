import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as StatusDot } from "./status-dot-CJpp8V8E.js";
const meta = { title: "尺寸与仅圆点", description: "不写文字时组件输出读屏文本，例如「在线」。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { size: "sm", status: "online", children: "小" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: "online", children: "默认" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { size: "lg", status: "online", children: "大" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { size: "sm", status: "online" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: "warning" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { size: "lg", status: "error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { label: "打印机缺纸", status: "warning" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
