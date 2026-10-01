import { j as jsxRuntimeExports, r as reactExports } from "./index-DM02Iz28.js";
import { A as Autocomplete, a as AutocompleteInput, b as AutocompletePopup, c as AutocompleteEmpty, d as AutocompleteList, f as AutocompleteGroup, g as AutocompleteGroupLabel, h as AutocompleteCollection, e as AutocompleteItem, i as AutocompleteSeparator } from "./autocomplete-DlyiU5Sk.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./ComboboxEmpty-BQp7q2Mg.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./stringifyLocale-DOx30wH1.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = { title: "分组与清除" };
const groups = [
  { value: "最近搜索", items: ["杭州 A 栋机房", "UPS 电池更换"] },
  { value: "热门", items: ["温度告警阈值", "VPN 无法连接", "打印机脱机", "会议室投屏"] }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Autocomplete, { items: groups, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteInput, { "aria-label": "搜索工单", placeholder: "搜索工单或知识库", showClear: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AutocompletePopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteEmpty, { children: "没有匹配的结果" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteList, { children: (group) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AutocompleteGroup, { items: group.items, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteGroupLabel, { children: group.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteCollection, { children: (item) => /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteItem, { value: item, children: item }, item) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteSeparator, {})
      ] }, group.value) })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
