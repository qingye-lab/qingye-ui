import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as StatusDot } from "./status-dot-CJpp8V8E.js";
const meta = {
  title: "实时光环",
  description: "pulse 用于正在发生的状态；减少动态效果时只保留圆点。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { pulse: true, status: "online", children: "直播中" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { pulse: true, status: "info", children: "正在同步" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { pulse: true, status: "error", children: "告警未处理" })
  ] });
}
export {
  Demo as default,
  meta
};
