import { j as jsxRuntimeExports, e0 as Sheet, e1 as SheetTrigger, B as Button, e3 as SheetPopup, e4 as SheetHeader, e5 as SheetTitle, ee as SheetDescription, e6 as SheetPanel, ef as SheetFooter, eg as SheetClose } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { F as Form } from "./form-CSAjKfKk.js";
import { I as Input } from "./input-D9i-AULz.js";
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
const meta = { title: "基础用法", description: "默认从右侧滑入，适合在列表旁新建或编辑一条记录。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "新建工单" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "新建工单" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "提交后会自动分派给当班的运维人员。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { className: "contents", onSubmit: (event) => event.preventDefault(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPanel, { className: "grid gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "标题" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "例如：3 号仓库温控器离线" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "设备编号" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "YQ-TC-0817" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "问题描述" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "发生时间、现象和已尝试的处理方式" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SheetClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "提交工单" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
