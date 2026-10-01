import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Combobox, j as ComboboxChips, k as ComboboxValue, l as ComboboxChip, m as ComboboxChipsInput, b as ComboboxPopup, c as ComboboxEmpty, d as ComboboxList, e as ComboboxItem } from "./combobox-HQR3mXiu.js";
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
const meta = { title: "多选标签", description: "已选项显示为标签；输入框为空时按 Backspace 移除最后一个。" };
const tags = ["生产环境", "测试环境", "核心业务", "边缘节点", "待下线", "GPU", "高可用", "等保三级", "华东", "华北"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Combobox, { items: tags, multiple: true, defaultValue: ["生产环境", "核心业务"], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChips, { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxValue, { children: (value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      value.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChip, { "aria-label": tag, children: tag }, tag)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChipsInput, { "aria-label": "资源标签", placeholder: value.length ? void 0 : "添加标签" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxPopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxEmpty, { children: "没有匹配的标签" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxList, { children: (tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: tag, children: tag }, tag) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
