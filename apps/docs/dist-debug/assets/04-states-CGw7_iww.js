import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { O as OTPField, a as OTPFieldInput } from "./otp-field-1pTGqpPn.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "状态", description: "错误、遮挡输入与禁用。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OTPField, { length: 6, defaultValue: "381904", "aria-label": "短信验证码", "aria-describedby": "otp-error", children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, { "aria-invalid": true }, index)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "otp-error", className: "text-destructive-foreground text-xs", children: "验证码错误，还可尝试 2 次" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OTPField, { length: 6, mask: true, defaultValue: "2580", "aria-label": "支付密码", children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OTPField, { length: 6, disabled: true, defaultValue: "1024", "aria-label": "验证码", children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}, index)) })
  ] });
}
export {
  Demo as default,
  meta
};
