import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Combobox, a as ComboboxInput, b as ComboboxPopup, c as ComboboxEmpty, d as ComboboxList, e as ComboboxItem } from "./combobox-HQR3mXiu.js";
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
const meta = { title: "尺寸与禁用" };
const models = ["iPhone 17 Pro", "iPhone 17", "iPad Air M3", "MacBook Air 13", "MacBook Pro 14", "Apple Watch S11"];
function ModelCombobox({ size = "default", disabled = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Combobox, { items: models, disabled, defaultValue: disabled ? "MacBook Pro 14" : null, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxInput, { size, "aria-label": "设备型号", placeholder: "搜索设备型号" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxPopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxEmpty, { children: "没有匹配的型号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxList, { children: (model) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: model, children: model }, model) })
    ] })
  ] });
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-64 flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCombobox, { size: "sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCombobox, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCombobox, { size: "lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ModelCombobox, { disabled: true })
  ] });
}
export {
  Demo as default,
  meta
};
