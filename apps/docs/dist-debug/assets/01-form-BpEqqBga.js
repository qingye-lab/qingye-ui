import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as Dialog, a as DialogTrigger, b as DialogPopup, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogPanel, g as DialogFooter, h as DialogClose } from "./dialog-DYK4nuM6.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { F as Form } from "./form-CSAjKfKk.js";
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
  title: "基础用法",
  description: "头部、正文、底部三段结构；表单用 Form 包住正文与底部，回车即可提交。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "编辑资料" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPopup, { className: "sm:max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "编辑资料" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "修改后会同步到团队通讯录。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { className: "contents", onSubmit: (event) => event.preventDefault(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPanel, { className: "grid gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "姓名" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "林嘉禾" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "职位" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "产品设计师" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "保存" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
