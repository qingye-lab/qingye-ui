import { r as reactExports, j as jsxRuntimeExports, aa as Spinner, a5 as CircleCheck, B as Button } from "./index-DM02Iz28.js";
import { O as OTPField, a as OTPFieldInput } from "./otp-field-1pTGqpPn.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "组合：登录验证", description: "填满后自动校验；示例验证码为 246810。" };
function Demo() {
  const [value, setValue] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("idle");
  const verify = (code) => {
    setStatus("checking");
    setTimeout(() => setStatus(code === "246810" ? "ok" : "error"), 600);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col items-center gap-4 rounded-2xl border bg-card p-6 text-center shadow-xs/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-base", children: "输入验证码" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "我们向 zhang.wei@example.com 发送了 6 位验证码" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      OTPField,
      {
        length: 6,
        value,
        onValueChange: (next) => {
          setValue(next);
          setStatus("idle");
        },
        onValueComplete: verify,
        disabled: status === "checking" || status === "ok",
        "aria-label": "邮箱验证码",
        children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, { "aria-invalid": status === "error" || void 0 }, index))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { "aria-live": "polite", className: "flex h-5 items-center gap-1.5 text-sm", children: [
      status === "checking" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, { className: "size-4" }),
        "正在校验…"
      ] }) : null,
      status === "ok" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { "aria-hidden": "true", className: "size-4 text-success-foreground" }),
        "验证通过"
      ] }) : null,
      status === "error" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive-foreground", children: "验证码不正确，请重新输入" }) : null
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", disabled: true, className: "numeric", children: "重新发送（60 秒）" })
  ] });
}
export {
  Demo as default,
  meta
};
