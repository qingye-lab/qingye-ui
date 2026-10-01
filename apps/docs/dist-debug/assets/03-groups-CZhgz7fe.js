import { j as jsxRuntimeExports, r as reactExports } from "./index-DM02Iz28.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, f as SelectSeparator, g as SelectGroup, h as SelectGroupLabel, d as SelectItem } from "./select-D8_OW39t.js";
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
const meta = { title: "分组与禁用项", description: "售罄的规格保留在列表中但不可选。" };
const groups = [
  {
    label: "通用型",
    items: [
      { label: "g7.large · 2 核 8 GB", value: "g7.large" },
      { label: "g7.xlarge · 4 核 16 GB", value: "g7.xlarge" },
      { label: "g7.2xlarge · 8 核 32 GB", value: "g7.2xlarge", disabled: true }
    ]
  },
  {
    label: "计算型",
    items: [
      { label: "c7.large · 2 核 4 GB", value: "c7.large" },
      { label: "c7.xlarge · 4 核 8 GB", value: "c7.xlarge" }
    ]
  },
  {
    label: "内存型",
    items: [
      { label: "r7.large · 2 核 16 GB", value: "r7.large", disabled: true },
      { label: "r7.xlarge · 4 核 32 GB", value: "r7.xlarge" }
    ]
  }
];
const items = groups.flatMap((group) => group.items);
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { items, defaultValue: "g7.xlarge", "aria-label": "实例规格", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full max-w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: groups.map((group, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      index > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SelectSeparator, {}) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SelectGroupLabel, { children: group.label }),
        group.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: item.value, disabled: item.disabled, children: item.label }, item.value))
      ] })
    ] }, group.label)) })
  ] });
}
export {
  Demo as default,
  meta
};
