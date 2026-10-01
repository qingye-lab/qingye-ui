import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as InputGroup, e as InputGroupTextarea, a as InputGroupAddon, d as InputGroupButton, b as InputGroupText } from "./input-group-2ApKrTnA.js";
import { P as Paperclip } from "./paperclip-BAloTUU3.js";
import { A as ArrowUp } from "./arrow-up-BkVdZzdH.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8", key: "7n84p3" }]
];
const AtSign = createLucideIcon("at-sign", __iconNode);
const meta = { title: "组合：消息输入框", description: "block-end 附加区域作为底部工具栏。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupTextarea, { "aria-label": "回复工单", placeholder: "回复客户，Shift + Enter 换行" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroupAddon, { align: "block-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupButton, { "aria-label": "添加附件", size: "icon-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupButton, { "aria-label": "提及同事", size: "icon-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AtSign, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { className: "ms-auto text-xs", children: "内部可见" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupButton, { "aria-label": "发送", size: "icon-sm", variant: "default", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUp, { "aria-hidden": "true" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
