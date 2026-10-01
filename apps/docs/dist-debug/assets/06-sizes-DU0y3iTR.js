import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Autocomplete, a as AutocompleteInput, b as AutocompletePopup, d as AutocompleteList, e as AutocompleteItem } from "./autocomplete-DlyiU5Sk.js";
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
const domains = ["example.com", "example.cn", "corp.example.com", "mail.example.com"];
function DomainAutocomplete({ size = "default", disabled = false }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Autocomplete, { items: domains, disabled, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteInput, { size, "aria-label": "邮箱域名", placeholder: "邮箱域名" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompletePopup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteList, { children: (domain) => /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteItem, { value: domain, children: domain }, domain) }) })
  ] });
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-64 flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DomainAutocomplete, { size: "sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DomainAutocomplete, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DomainAutocomplete, { size: "lg" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DomainAutocomplete, { disabled: true })
  ] });
}
export {
  Demo as default,
  meta
};
