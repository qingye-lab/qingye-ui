import { j as jsxRuntimeExports, K as Kbd } from "./index-DM02Iz28.js";
import { S as SearchInput } from "./search-input-DR84Mv-7.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "快捷键提示", description: "为空时在末端提示唤起快捷键。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SearchInput,
    {
      "aria-keyshortcuts": "Meta+K",
      "aria-label": "搜索文档",
      className: "max-w-xs",
      placeholder: "搜索文档…",
      shortcut: /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘K" })
    }
  );
}
export {
  Demo as default,
  meta
};
