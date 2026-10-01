import { j as jsxRuntimeExports, I as Info, B as Button } from "./index-DM02Iz28.js";
import { P as Popover, a as PopoverTrigger, b as PopoverPopup } from "./popover-BKcHrCxN.js";
const meta = {
  title: "点击说明",
  description: "tooltipStyle 使用提示的紧凑样式。触屏没有悬停，需要让用户点开的说明用它代替 Tooltip。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "numeric font-medium", children: "设备在线率 96.4%" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "指标说明", size: "icon-xs", variant: "ghost" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverPopup, { className: "max-w-60", side: "top", tooltipStyle: true, children: "过去 24 小时内至少上报过一次心跳的设备占比。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
