import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { O as OTPField, a as OTPFieldInput, b as OTPFieldSeparator } from "./otp-field-1pTGqpPn.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "分组与大尺寸", description: "3-3 分组更易核对；lg 适合独立的验证页面。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(OTPField, { length: 6, "aria-label": "邮箱验证码", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OTPField, { length: 4, size: "lg", "aria-label": "设备配对码", defaultValue: "2048", children: Array.from({ length: 4 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}, index)) })
  ] });
}
export {
  Demo as default,
  meta
};
