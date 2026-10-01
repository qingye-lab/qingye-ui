import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { A as AlertDialog, a as AlertDialogTrigger, b as AlertDialogPopup, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogClose } from "./alert-dialog-K1KMqJC-.js";
const meta = {
  title: "异步执行",
  description: "确认后保持打开并显示加载，请求完成再关闭；执行期间禁止取消。"
};
function Demo() {
  const [open, setOpen] = reactExports.useState(false);
  const [pending, setPending] = reactExports.useState(false);
  const revoke = async () => {
    setPending(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPending(false);
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { onOpenChange: (next) => !pending && setOpen(next), open, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "撤销访问权限" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "撤销周以宁的访问权限？" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "对方会立即退出“华东仓储”项目，已分配给 TA 的 6 张工单将回到待分配列表。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogClose, { disabled: pending, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: pending, onClick: revoke, variant: "destructive", children: "撤销权限" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
