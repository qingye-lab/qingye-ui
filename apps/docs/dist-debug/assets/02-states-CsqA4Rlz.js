import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "状态" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-8 gap-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {}),
      "关闭"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true }),
      "开启"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { disabled: true }),
      "禁用"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { disabled: true, defaultChecked: true }),
      "禁用开启"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
