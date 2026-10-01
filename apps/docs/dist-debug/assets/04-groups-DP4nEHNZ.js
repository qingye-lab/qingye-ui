import { j as jsxRuntimeExports, r as reactExports } from "./index-DM02Iz28.js";
import { C as Combobox, a as ComboboxInput, b as ComboboxPopup, c as ComboboxEmpty, d as ComboboxList, f as ComboboxGroup, g as ComboboxGroupLabel, h as ComboboxCollection, e as ComboboxItem, i as ComboboxSeparator } from "./combobox-HQR3mXiu.js";
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
const meta = { title: "分组", description: "筛选后空的分组会自动隐藏。" };
const groups = [
  { value: "华东", items: [{ label: "杭州 · 可用区 H", value: "hz-h" }, { label: "杭州 · 可用区 I", value: "hz-i" }, { label: "上海 · 可用区 L", value: "sh-l" }] },
  { value: "华北", items: [{ label: "北京 · 可用区 K", value: "bj-k" }, { label: "张家口 · 可用区 A", value: "zjk-a" }] },
  { value: "华南", items: [{ label: "深圳 · 可用区 E", value: "sz-e" }, { label: "广州 · 可用区 B", value: "gz-b" }] }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Combobox, { items: groups, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxInput, { "aria-label": "可用区", placeholder: "选择可用区" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxPopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxEmpty, { children: "没有匹配的可用区" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxList, { children: (group) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxGroup, { items: group.items, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxGroupLabel, { children: group.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxCollection, { children: (zone) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: zone, children: zone.label }, zone.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxSeparator, {})
      ] }, group.value) })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
