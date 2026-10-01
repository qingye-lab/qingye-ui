import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogPopup, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogClose } from "./alert-dialog-K1KMqJC-.js";
const meta = { title: "无底色底部", description: "非危险的确认，例如退出登录，用更轻的 bare 底部。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "退出登录" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPopup, { className: "sm:max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "退出当前账号？" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "未同步的离线草稿会保留在本机，下次登录后继续同步。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { variant: "bare", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "退出" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
