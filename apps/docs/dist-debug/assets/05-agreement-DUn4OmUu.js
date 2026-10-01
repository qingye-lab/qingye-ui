import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
const meta = { title: "组合：提交前确认", description: "未勾选时禁用提交按钮。" };
function Demo() {
  const [agreed, setAgreed] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "items-start font-normal leading-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: agreed, onCheckedChange: setAgreed, className: "mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "我已阅读并同意",
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "font-medium underline underline-offset-2", href: "#terms", children: "《数据处理协议》" }),
        "，并确认上传的设备数据不含个人敏感信息。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: !agreed, className: "self-start", children: "开始导入" })
  ] });
}
export {
  Demo as default,
  meta
};
