import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { C as CheckboxGroup } from "./checkbox-group-B5IO7j-P.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useFieldValidation-CDOPo50V.js";
import "./areArraysEqual-Bigu0Aq6.js";
const meta = { title: "全选与半选", description: "父复选框根据子项自动显示全选、半选或未选。" };
const permissions = [
  { value: "read", label: "查看设备" },
  { value: "control", label: "远程控制" },
  { value: "ota", label: "固件升级" },
  { value: "delete", label: "删除设备" }
];
function Demo() {
  const [value, setValue] = reactExports.useState(["read", "control"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    CheckboxGroup,
    {
      "aria-label": "运维角色权限",
      value,
      onValueChange: setValue,
      allValues: permissions.map((item) => item.value),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { parent: true }),
          "运维角色 · 全部权限"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 ps-6", children: permissions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: item.value }),
          item.label
        ] }, item.value)) })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
