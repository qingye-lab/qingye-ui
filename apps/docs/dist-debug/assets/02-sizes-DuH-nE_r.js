import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = { title: "尺寸与占位", description: "sm / default / lg；未选择时显示 placeholder。" };
const sizes = ["sm", "default", "lg"];
const items = { "1": "每 1 分钟", "5": "每 5 分钟", "15": "每 15 分钟", "60": "每小时" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full max-w-64 flex-col gap-3", children: sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { items, "aria-label": "采集频率", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { size, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "选择采集频率" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: Object.entries(items).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: label }, value)) })
  ] }, size)) });
}
export {
  Demo as default,
  meta
};
