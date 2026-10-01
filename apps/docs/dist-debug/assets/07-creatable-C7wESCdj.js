import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Combobox, j as ComboboxChips, k as ComboboxValue, l as ComboboxChip, m as ComboboxChipsInput, b as ComboboxPopup, d as ComboboxList, e as ComboboxItem } from "./combobox-HQR3mXiu.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
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
const meta = { title: "可新建", description: "没有完全匹配时，列表末尾出现「新建」选项。" };
function Demo() {
  const [labels, setLabels] = reactExports.useState(
    ["网络故障", "硬件更换", "固件升级", "用户反馈"].map((label) => ({ value: label, label }))
  );
  const [selected, setSelected] = reactExports.useState([labels[0]]);
  const [query, setQuery] = reactExports.useState("");
  const text = query.trim();
  const exists = labels.some((item) => item.label === text);
  const items = text && !exists ? [...labels, { value: `create:${text}`, label: text, create: true }] : labels;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Combobox,
    {
      items,
      multiple: true,
      value: selected,
      onValueChange: (next) => {
        const created = next.find((item) => item.create);
        if (created) {
          const label = { value: created.label, label: created.label };
          setLabels((previous) => [...previous, label]);
          setSelected([...next.filter((item) => !item.create), label]);
        } else {
          setSelected(next);
        }
        setQuery("");
      },
      inputValue: query,
      onInputValueChange: setQuery,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChips, { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxValue, { children: (value) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          value.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChip, { "aria-label": item.label, children: item.label }, item.value)),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxChipsInput, { "aria-label": "工单标签", placeholder: value.length ? void 0 : "输入或新建标签" })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxPopup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxList, { children: (item) => item.create ? /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: item, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": "true", className: "-ms-6 opacity-80" }),
          "新建「",
          item.label,
          "」"
        ] }) }, item.value) : /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: item, children: item.label }, item.value) }) })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
