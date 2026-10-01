import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { A as AlertDialog, b as AlertDialogPopup, c as AlertDialogHeader, d as AlertDialogTitle, e as AlertDialogDescription, f as AlertDialogFooter, g as AlertDialogClose } from "./alert-dialog-K1KMqJC-.js";
import { D as Dialog, a as DialogTrigger, b as DialogPopup, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogPanel, g as DialogFooter, h as DialogClose } from "./dialog-DYK4nuM6.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { T as Textarea } from "./textarea-DkoqBXET.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = {
  title: "关闭前确认",
  description: "有未保存内容时拦截关闭（Esc、遮罩、关闭按钮），再用 AlertDialog 确认是否放弃。"
};
function Demo() {
  const [open, setOpen] = reactExports.useState(false);
  const [confirmOpen, setConfirmOpen] = reactExports.useState(false);
  const [text, setText] = reactExports.useState("");
  const closeAndReset = () => {
    setConfirmOpen(false);
    setText("");
    setOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Dialog,
    {
      open,
      onOpenChange: (next) => !next && text ? setConfirmOpen(true) : setOpen(next),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "发布公告" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPopup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "发布团队公告" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "输入内容后尝试关闭窗口。" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "公告内容" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Textarea,
              {
                onChange: (event) => setText(event.target.value),
                placeholder: "例如：本周五 18:00 起进行机房例行维护，预计 2 小时。",
                value: text
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !text, onClick: closeAndReset, children: "发布" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialog, { onOpenChange: setConfirmOpen, open: confirmOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPopup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "放弃这条公告？" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: "已输入的内容不会保存。" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "继续编辑" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: closeAndReset, variant: "destructive", children: "放弃" })
          ] })
        ] }) })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
