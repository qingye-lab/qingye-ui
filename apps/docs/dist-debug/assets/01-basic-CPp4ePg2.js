import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { T as TagInput } from "./tag-input-qOJAIGC3.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "基础用法", description: "回车或逗号确认；粘贴“设计, 运营, 增长”会拆成三个标签。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "文章关键词" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { defaultValue: ["产品设计", "用户研究"], name: "keywords", placeholder: "输入关键词后按回车" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "用于站内搜索与推荐，最多选取最相关的几个。" })
  ] });
}
export {
  Demo as default,
  meta
};
