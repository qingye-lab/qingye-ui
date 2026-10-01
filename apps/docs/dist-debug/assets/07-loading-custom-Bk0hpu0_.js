import { j as jsxRuntimeExports, B as Button, aa as Spinner } from "./index-DM02Iz28.js";
const meta = {
  title: "自定义加载",
  description: "需要保留文字时，自行组合 Spinner 与 disabled，例如“正在上传 3 个文件”。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
      "正在上传 3 个文件"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { disabled: true, size: "sm", variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}),
      "生成中"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
