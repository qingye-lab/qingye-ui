import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon, b as InputGroupText } from "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "前后缀文字", description: "协议、域名、货币、单位等固定部分。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "工作区地址", className: "*:[input]:px-0!", placeholder: "your-team" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: "https://" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: ".yanqing.app" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "单价", className: "numeric", defaultValue: "1,280.00", inputMode: "decimal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: "¥" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: "元 / 台" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { "aria-label": "包裹重量", className: "numeric", defaultValue: "2.5", inputMode: "decimal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: "kg" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
