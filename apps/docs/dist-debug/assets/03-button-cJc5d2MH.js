import { c as createLucideIcon, j as jsxRuntimeExports, B as Button, A as ArrowRight, I as Info } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon, d as InputGroupButton } from "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const __iconNode = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode);
const meta = { title: "按钮", description: "InputGroupButton 默认是 ghost + icon-xs，与输入框内边距对齐。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "邀请码", defaultValue: "YQ8K-2M4P", readOnly: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupButton, { "aria-label": "重新生成", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { "aria-hidden": "true" }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "订阅邮箱", placeholder: "输入邮箱订阅周报", type: "email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "xs", variant: "secondary", children: [
        "订阅",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { "aria-hidden": "true" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "用户名", placeholder: "用户名" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupButton, { "aria-label": "用户名规则", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { "aria-hidden": "true" }) }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
