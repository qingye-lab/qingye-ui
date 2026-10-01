import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as StatusDot } from "./status-dot-CJpp8V8E.js";
const meta = { title: "状态", description: "离线为空心圆，与中性灰在形状上也能区分。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-x-6 gap-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: "online", children: "在线" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: "offline", children: "离线" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: "warning", children: "电量低" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: "error", children: "连接异常" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: "info", children: "升级中" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: "neutral", children: "未激活" })
  ] });
}
export {
  Demo as default,
  meta
};
