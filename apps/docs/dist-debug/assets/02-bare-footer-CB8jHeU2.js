import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as Dialog, a as DialogTrigger, b as DialogPopup, c as DialogHeader, d as DialogTitle, e as DialogDescription, g as DialogFooter, h as DialogClose } from "./dialog-DYK4nuM6.js";
const meta = {
  title: "无底色底部",
  description: '内容很短时用 variant="bare"，去掉分隔线和底色，让窗口更轻。'
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "导出账单" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPopup, { className: "sm:max-w-sm", showCloseButton: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "导出 9 月账单" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "共 1,286 笔交易，生成完成后会发送到 finance@yanqing.cn。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { variant: "bare", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "开始导出" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
