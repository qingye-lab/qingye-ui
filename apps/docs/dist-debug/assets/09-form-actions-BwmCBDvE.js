import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
const meta = {
  title: "组合：表单操作栏",
  description: "主操作靠末端；危险操作与其他操作分开放置。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-lg flex-col-reverse gap-2 sm:flex-row sm:items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "sm:me-auto", variant: "destructive-outline", children: "停用账号" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", children: "取消" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "保存设置" })
  ] });
}
export {
  Demo as default,
  meta
};
