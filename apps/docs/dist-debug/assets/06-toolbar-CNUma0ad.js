import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import { D as Download } from "./download-8gLaOvAL.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = { title: "组合：列表筛选栏", description: "小尺寸选择器与按钮排成一行，窄屏自动换行。" };
const status = { all: "全部状态", online: "在线", offline: "离线", alarm: "告警中" };
const range = { "24h": "最近 24 小时", "7d": "最近 7 天", "30d": "最近 30 天" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { items: status, defaultValue: "all", "aria-label": "设备状态", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { size: "sm", className: "w-auto min-w-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: Object.entries(status).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: label }, value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { items: range, defaultValue: "7d", "aria-label": "时间范围", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { size: "sm", className: "w-auto min-w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: Object.entries(range).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: label }, value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", className: "ms-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Download, {}),
      "导出 CSV"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
