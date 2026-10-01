import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon } from "./input-group-2ApKrTnA.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "组合：内嵌标签", description: "block-start 附加区域放标签，适合紧凑的卡片表单。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { id: "ig-company", placeholder: "例如：杭州言青科技有限公司" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "block-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ig-company", children: "公司名称" }) })
  ] });
}
export {
  Demo as default,
  meta
};
