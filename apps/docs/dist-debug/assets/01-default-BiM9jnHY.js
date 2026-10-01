import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as Input } from "./input-D9i-AULz.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "关联输入框", description: "htmlFor 指向控件 id，点击标签即可聚焦。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "label-project", children: "项目名称" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "label-project", placeholder: "例如：滨江仓储改造" })
  ] });
}
export {
  Demo as default,
  meta
};
