import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as Dialog, a as DialogTrigger, b as DialogPopup, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogPanel, g as DialogFooter, h as DialogClose } from "./dialog-DYK4nuM6.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { I as Input } from "./input-D9i-AULz.js";
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
  title: "嵌套对话框",
  description: "子对话框打开时，父级自动缩小后退；Esc 只关闭最上层。"
};
const details = [
  ["设备名称", "仓库 3 号扫码枪"],
  ["序列号", "YQ-SC-20391"],
  ["负责人", "周以宁"]
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "设备详情" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPopup, { className: "sm:max-w-sm", showCloseButton: false, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "设备详情" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "最近一次上报：今天 09:42" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogPanel, { className: "grid gap-3 text-sm", children: details.map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: value })
      ] }, label)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "关闭" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "重命名" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPopup, { className: "sm:max-w-sm", showCloseButton: false, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "重命名设备" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "名称会显示在设备列表和告警通知中。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "新名称" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "仓库 3 号扫码枪" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "保存" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
