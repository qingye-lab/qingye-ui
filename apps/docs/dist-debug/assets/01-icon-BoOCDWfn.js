import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon } from "./input-group-2ApKrTnA.js";
import { M as Mail } from "./mail-BvuOZJjS.js";
import { M as MapPin } from "./map-pin-ZOHj_P5X.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "图标", description: "图标放在首端说明内容类型，放在末端作为状态提示。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "邮箱", placeholder: "name@company.com", type: "email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { "aria-hidden": "true" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "收货地址", defaultValue: "杭州市西湖区文三路 90 号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { "aria-hidden": "true" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
