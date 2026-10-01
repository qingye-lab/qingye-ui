import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as TagInput } from "./tag-input-qOJAIGC3.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "尺寸", description: "高度与 Combobox 多选框一致，标签随尺寸缩放。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-md flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { "aria-label": "小尺寸", defaultValue: ["前端", "React"], size: "sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { "aria-label": "默认尺寸", defaultValue: ["前端", "React"] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { "aria-label": "大尺寸", defaultValue: ["前端", "React"], size: "lg" })
  ] });
}
export {
  Demo as default,
  meta
};
