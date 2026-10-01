import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as SearchInput } from "./search-input-DR84Mv-7.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "加载与禁用", description: "loading 用 Spinner 替换搜索图标；禁用时不显示清除按钮。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchInput, { "aria-label": "搜索客户", defaultValue: "王", loading: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SearchInput, { "aria-label": "搜索客户", disabled: true, placeholder: "同步完成前不可搜索" })
  ] });
}
export {
  Demo as default,
  meta
};
