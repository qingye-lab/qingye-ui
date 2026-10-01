import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { O as OTPField, a as OTPFieldInput } from "./otp-field-1pTGqpPn.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "字母数字与占位", description: 'validationType="alphanumeric" 接受字母和数字，并统一转为大写。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    OTPField,
    {
      length: 5,
      validationType: "alphanumeric",
      normalizeValue: (value) => value.toUpperCase(),
      "aria-label": "兑换码",
      children: Array.from({ length: 5 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, { placeholder: "·" }, index))
    }
  );
}
export {
  Demo as default,
  meta
};
