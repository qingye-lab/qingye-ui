import { j as jsxRuntimeExports, B as Button, bp as X } from "./index-DM02Iz28.js";
import { P as Popover, a as PopoverTrigger, b as PopoverPopup, e as PopoverClose, c as PopoverTitle, d as PopoverDescription } from "./popover-BKcHrCxN.js";
import { B as Bell } from "./bell-DFpxbhe9.js";
const meta = { title: "带关闭按钮", description: "PopoverClose 可放在任意位置，图标按钮需要 aria-label。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "通知", size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverPopup, { className: "w-72", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverClose, { "aria-label": "关闭", className: "absolute end-2 top-2", render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon-sm", variant: "ghost" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 grid gap-1.5 pe-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTitle, { className: "text-base", children: "没有新通知" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverDescription, { children: "今天的 12 条告警都已处理完毕。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline" }), children: "查看历史" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
