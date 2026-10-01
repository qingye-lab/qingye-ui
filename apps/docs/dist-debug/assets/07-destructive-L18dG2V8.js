import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
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
  title: "输入名称确认删除",
  description: "影响面很大的删除，要求输入名称后才能确认，避免误操作。"
};
const project = "华东仓储";
function Demo() {
  const [value, setValue] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { onOpenChange: (open) => !open && setValue(""), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive-outline" }), children: "删除项目" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPopup, { className: "sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { children: [
          "删除“",
          project,
          "”项目"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "项目下的 42 台设备、318 张工单和全部报表将被永久删除，且无法恢复。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "输入项目名称以确认" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Input,
          {
            autoComplete: "off",
            onChange: (event) => setValue(event.target.value),
            placeholder: project,
            value
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { disabled: value !== project, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive" }), children: "永久删除" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
