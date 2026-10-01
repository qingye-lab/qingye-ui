import { j as jsxRuntimeExports, F as TriangleAlert, B as Button } from "./index-DM02Iz28.js";
import { A as Alert, a as AlertTitle, b as AlertDescription, c as AlertAction } from "./alert-twlv_qhe.js";
const meta = {
  title: "带操作",
  description: "AlertAction 在宽屏时位于右侧，窄屏时自动换到文字下方，与正文左对齐。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xl gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "warning", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "发票信息不完整" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "补充纳税人识别号后，才能开具 9 月账单的专用发票。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertAction, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", variant: "ghost", children: "稍后" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", children: "去补充" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "有新的固件版本 v2.8.0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "修复了低温环境下扫码枪偶发断连的问题。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertAction, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", variant: "outline", children: "查看更新" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
