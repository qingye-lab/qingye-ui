import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { F as Field } from "./field-BVswHr8Y.js";
import { F as Form } from "./form-CSAjKfKk.js";
import { P as Popover, a as PopoverTrigger, b as PopoverPopup, c as PopoverTitle, d as PopoverDescription } from "./popover-BKcHrCxN.js";
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
const meta = { title: "基础用法", description: "点击打开，承载一个简短的表单。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "意见反馈" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverPopup, { className: "w-80", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 grid gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTitle, { className: "text-base", children: "意见反馈" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverDescription, { children: "告诉我们哪里用得不顺手，产品团队每周都会阅读。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { className: "grid gap-3", onSubmit: (event) => event.preventDefault(), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { "aria-label": "反馈内容", placeholder: "例如：批量导出时希望能选择字段" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "提交反馈" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
