import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { F as Form } from "./form-CSAjKfKk.js";
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
const meta = { title: "组合：评论框", description: "多行输入下方放操作按钮，主按钮靠末端。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { className: "flex w-full max-w-sm flex-col gap-3", onSubmit: (event) => event.preventDefault(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "comment", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "添加评论" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "@张伟 这台设备上周也报过同样的错误", required: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "reset", variant: "ghost", children: "清空" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "发表" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
