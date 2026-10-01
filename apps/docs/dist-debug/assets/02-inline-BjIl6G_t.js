import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Autocomplete, a as AutocompleteInput, b as AutocompletePopup, d as AutocompleteList, e as AutocompleteItem } from "./autocomplete-DlyiU5Sk.js";
import { L as Label } from "./label-DS1FPyP3.js";
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
const meta = { title: "行内补全", description: 'mode="both"：高亮的建议直接补全到输入框里，方向键切换。' };
const commands = ["restart nginx", "restart redis", "reload nginx", "status nginx", "status mysql", "stop worker", "start worker"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ops-command", children: "运维指令" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Autocomplete, { items: commands, mode: "both", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteInput, { id: "ops-command", placeholder: "例如 restart nginx", className: "font-mono" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompletePopup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteList, { children: (command) => /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteItem, { value: command, className: "font-mono", children: command }, command) }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
