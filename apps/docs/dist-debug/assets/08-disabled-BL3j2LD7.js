import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
const meta = { title: "禁用", description: "不可用时降低不透明度并屏蔽指针事件。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, children: "提交审核" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, variant: "outline", children: "导出" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, variant: "secondary", children: "存为草稿" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, variant: "destructive", children: "删除" })
  ] });
}
export {
  Demo as default,
  meta
};
