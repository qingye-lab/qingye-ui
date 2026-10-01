import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, c as FieldContent, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "组合：设置列表", description: "标签与说明在左，开关靠右对齐。" };
const settings = [
  { id: "offline", label: "设备离线提醒", description: "设备连续 5 分钟无心跳时推送通知。", checked: true },
  { id: "digest", label: "每日运行摘要", description: "每天 08:30 发送前一天的告警与能耗汇总。", checked: true },
  { id: "beta", label: "参与新功能内测", description: "提前体验新版控制台，可能存在不稳定的情况。" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full max-w-md flex-col divide-y rounded-xl border", children: settings.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", className: "gap-4 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: item.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: item.description })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: item.checked })
  ] }, item.id)) });
}
export {
  Demo as default,
  meta
};
