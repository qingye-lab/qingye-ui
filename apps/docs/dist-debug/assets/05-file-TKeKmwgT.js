import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
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
const meta = { title: "文件", description: "需要拖拽、预览或多文件管理时用 FileUpload。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "营业执照" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { accept: "image/*,.pdf", type: "file" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "支持 JPG、PNG、PDF，不超过 10 MB。" })
  ] });
}
export {
  Demo as default,
  meta
};
