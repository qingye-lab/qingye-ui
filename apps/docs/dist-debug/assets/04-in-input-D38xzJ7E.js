import { j as jsxRuntimeExports, D as Search, K as Kbd } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon } from "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "在输入框中", description: "放进 InputGroupAddon，提示唤起搜索的快捷键。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-keyshortcuts": "Meta+K", "aria-label": "搜索文档", placeholder: "搜索文档…", type: "search" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { "aria-hidden": "true", children: "⌘K" }) })
  ] });
}
export {
  Demo as default,
  meta
};
