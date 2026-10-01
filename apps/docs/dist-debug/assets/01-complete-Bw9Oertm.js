import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { f as FieldGroup, F as Field, a as FieldLabel, d as FieldError, b as FieldDescription, c as FieldContent } from "./field-BVswHr8Y.js";
import { F as Fieldset, a as FieldsetLegend } from "./fieldset-BmPegBmZ.js";
import { F as Form } from "./form-CSAjKfKk.js";
import { I as Input } from "./input-D9i-AULz.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import { T as Textarea } from "./textarea-DkoqBXET.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./separator-CcYO5Zxi.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldControl-CFc5_9rC.js";
import "./useLabelableId-aT49TJD-.js";
const meta = {
  title: "完整表单",
  description: "直接点“提交申请”查看校验，焦点会移到第一个错误字段。企业名称填“言青科技”可模拟服务端返回的重名错误，修改后错误自动消失。"
};
function Demo() {
  const [loading, setLoading] = reactExports.useState(false);
  const [errors, setErrors] = reactExports.useState({});
  const [done, setDone] = reactExports.useState(false);
  async function submit(values) {
    setLoading(true);
    setDone(false);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    if (String(values.company).includes("言青科技")) {
      setErrors({ company: "该企业已开通账户，请联系管理员邀请你加入。" });
      return;
    }
    setErrors({});
    setDone(true);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { className: "flex w-full max-w-md flex-col gap-6", errors, onFormSubmit: submit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "company", validate: (value) => value ? null : "请填写企业名称。", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "企业名称" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "aria-required": true, placeholder: "与营业执照一致" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "email", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "管理员邮箱" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoComplete: "email", placeholder: "name@company.com", required: true, type: "email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "开通结果和登录链接会发送到这个邮箱。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { match: "valueMissing", children: "请填写管理员邮箱。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { match: "typeMismatch", children: "邮箱格式不正确。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "note", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldLabel, { children: [
          "使用场景 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground", children: "选填" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "例如：管理 3 个仓库的 200 台传感器" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetLegend, { children: "通知" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "weeklyReport", orientation: "horizontal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "每周运维报告" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "每周一 9:00 发送设备在线率与告警汇总。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "productNews", orientation: "horizontal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "产品更新" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "新功能上线时通知，每月不超过 2 封。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {})
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "terms", orientation: "horizontal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "我已阅读并同意《企业服务协议》" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { match: "valueMissing", children: "请先同意服务协议。" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end", children: [
      done ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-success-foreground text-sm sm:me-auto", "data-motion": "fade-in", role: "status", children: "申请已提交，我们会在 1 个工作日内审核。" }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "reset", variant: "ghost", children: "重置" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading, type: "submit", children: "提交申请" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
