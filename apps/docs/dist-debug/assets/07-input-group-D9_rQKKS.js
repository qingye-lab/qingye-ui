import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as InputGroup, a as InputGroupAddon, b as InputGroupText } from "./input-group-2ApKrTnA.js";
import { N as NumberField, c as NumberFieldInput } from "./number-field-C_V_JhD-.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
import "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./plus-BiUnSJ5I.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
const meta = { title: "组合：带单位", description: "放进 InputGroup，前后加货币符号与币种。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NumberField, { "aria-label": "预算金额", defaultValue: 5e4, step: 1e3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldInput, { className: "text-start" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: "¥" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: "CNY" }) })
  ] });
}
export {
  Demo as default,
  meta
};
