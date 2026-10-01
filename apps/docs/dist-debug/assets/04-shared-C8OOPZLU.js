import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { a as PopoverTrigger, P as Popover, b as PopoverPopup, c as PopoverTitle, d as PopoverDescription, f as PopoverCreateHandle } from "./popover-BKcHrCxN.js";
import { B as Bell } from "./bell-DFpxbhe9.js";
import { U as User } from "./user-BVmTvaLY.js";
const meta = {
  title: "多个触发器共用浮层",
  description: "通过 handle 共用一个浮层，在触发器之间切换时，浮层平滑移动并变换尺寸。"
};
const handle = PopoverCreateHandle();
function Notifications() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTitle, { className: "text-base", children: "通知" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverDescription, { children: "暂时没有新的通知。" })
  ] });
}
function Profile() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-52 gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTitle, { className: "truncate font-medium text-sm", children: "林嘉禾" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverDescription, { className: "text-xs", children: "产品设计师" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "退出登录" })
  ] });
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { handle, payload: Notifications, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "通知", size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { handle, payload: Profile, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "个人资料", size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Popover, { handle, children: ({ payload: Content }) => /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverPopup, { children: Content ? /* @__PURE__ */ jsxRuntimeExports.jsx(Content, {}) : null }) })
  ] });
}
export {
  Demo as default,
  meta
};
