import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { L as Label } from "./label-DS1FPyP3.js";
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
const meta = { title: "基础用法", description: "列表默认与触发器同宽，展开在正下方。" };
const regions = [
  { label: "华东 1（杭州）", value: "cn-hangzhou" },
  { label: "华东 2（上海）", value: "cn-shanghai" },
  { label: "华北 2（北京）", value: "cn-beijing" },
  { label: "华南 1（深圳）", value: "cn-shenzhen" },
  { label: "西南 1（成都）", value: "cn-chengdu" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-64 flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "region", children: "部署地域" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { items: regions, defaultValue: "cn-hangzhou", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { id: "region", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: regions.map((region) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: region.value, children: region.label }, region.value)) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
