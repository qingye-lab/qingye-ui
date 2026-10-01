import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { P as PasswordInput } from "./password-input-b3Ih0lnd.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = {
  title: "受控",
  description: "用 visible 与 onVisibleChange 让外部控件同步显示状态，例如同时控制两个密码框。"
};
function Demo() {
  const [visible, setVisible] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { "aria-label": "新密码", onVisibleChange: setVisible, placeholder: "新密码", visible }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { "aria-label": "确认新密码", onVisibleChange: setVisible, placeholder: "确认新密码", visible }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked: visible, onCheckedChange: setVisible }),
      "显示密码"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
