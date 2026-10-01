import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "包裹控件", description: "包裹复选框或开关时，文字也是点击区域。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true }),
      "记住此设备 30 天"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {}),
      "接收夜间告警"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
