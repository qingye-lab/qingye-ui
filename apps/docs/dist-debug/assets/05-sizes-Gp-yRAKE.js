import { j as jsxRuntimeExports, D as Search } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon } from "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "尺寸", description: "size 写在 InputGroupInput 上，附加区域随之调整内边距。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full max-w-xs flex-col gap-3", children: ["sm", "default", "lg"].map((size) => /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "搜索", placeholder: `搜索（${size}）`, size, type: "search" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { "aria-hidden": "true" }) })
  ] }, size)) });
}
export {
  Demo as default,
  meta
};
