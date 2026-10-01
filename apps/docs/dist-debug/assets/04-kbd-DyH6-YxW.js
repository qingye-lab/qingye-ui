import { j as jsxRuntimeExports, D as Search, K as Kbd, aa as Spinner } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon } from "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "按键提示与加载", description: "末端放快捷键提示，或在查询时显示 Spinner。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-keyshortcuts": "Meta+K", "aria-label": "搜索", placeholder: "搜索设备、工单…", type: "search" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { "aria-hidden": "true", children: "⌘K" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "快递单号", defaultValue: "SF1402 8876 3310" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Spinner, {}) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
