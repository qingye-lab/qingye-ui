import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as CopyButton } from "./copy-button-B3gSj0u1.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon } from "./input-group-2ApKrTnA.js";
import "./copy-CMgYpHr5.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "组合：密钥输入框", description: "放进 InputGroupAddon，复制只读字段的内容。" };
const key = "yq_live_4f9a2c7e81b0d3";
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { className: "max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "API 密钥", className: "font-mono", defaultValue: key, readOnly: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { copyLabel: "复制 API 密钥", size: "icon-xs", value: key, variant: "ghost" }) })
  ] });
}
export {
  Demo as default,
  meta
};
