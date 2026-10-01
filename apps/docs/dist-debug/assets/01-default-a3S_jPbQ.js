import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogPopup, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogClose } from "./alert-dialog-K1KMqJC-.js";
const meta = { title: "删除确认", description: "不可逆的操作用 destructive 确认按钮，取消放在前面。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive-outline" }), children: "删除设备" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "删除“仓库 3 号扫码枪”？" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "设备的 1,024 条扫码记录会一并删除，且无法恢复。设备需要重新绑定才能再次使用。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive" }), children: "删除设备" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
