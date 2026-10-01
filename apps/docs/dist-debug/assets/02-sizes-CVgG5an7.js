import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
const meta = {
  title: "尺寸",
  description: "xs 用于表格行内，sm 用于工具栏，lg / xl 用于登录与落地页。移动端统一加高 4px。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", variant: "outline", children: "行内" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "工具栏" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "默认" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", children: "登录" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xl", variant: "outline", children: "免费试用" })
  ] });
}
export {
  Demo as default,
  meta
};
