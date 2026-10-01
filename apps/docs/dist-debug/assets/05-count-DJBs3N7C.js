import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
const meta = { title: "计数", description: "加 numeric 使用等宽数字；超过上限显示 99+。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "numeric", children: "3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "numeric", children: "24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", className: "numeric", children: "99+" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
      "待审批",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "secondary", className: "numeric", children: "12" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
      "未读消息",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "destructive", className: "numeric", children: "5" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
