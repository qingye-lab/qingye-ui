import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { u as useAutocompleteFilter, A as Autocomplete, a as AutocompleteInput, b as AutocompletePopup, c as AutocompleteEmpty, d as AutocompleteList, e as AutocompleteItem, j as AutocompleteStatus } from "./autocomplete-DlyiU5Sk.js";
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
const meta = { title: "限制条数", description: "limit 截断列表，状态行提示还有多少条可以继续输入缩小范围。" };
const stations = Array.from({ length: 40 }, (_, index) => `基站 HZ-${String(index + 101).padStart(4, "0")}`);
const limit = 6;
function Demo() {
  const [value, setValue] = reactExports.useState("");
  const { contains } = useAutocompleteFilter();
  const total = stations.filter((station) => contains(station, value.trim())).length;
  const hidden = Math.max(0, total - limit);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Autocomplete, { items: stations, value, onValueChange: setValue, limit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteInput, { "aria-label": "基站编号", placeholder: "输入基站编号", showTrigger: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AutocompletePopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteEmpty, { children: "没有该编号的基站" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteList, { children: (station) => /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteItem, { value: station, className: "numeric", children: station }, station) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteStatus, { children: hidden ? `还有 ${hidden} 条结果，继续输入以缩小范围` : null })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
