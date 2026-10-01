import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { G as Group, b as GroupText, a as GroupSeparator } from "./group-BcPpzhme.js";
import { I as Input } from "./input-D9i-AULz.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
import "./separator-CcYO5Zxi.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "前后缀与输入", description: "GroupText 作前缀，并渲染为 Label 关联输入框。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "站点地址", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupText, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "site-domain" }), children: "https://" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "qingyan.tech", id: "site-domain" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "邀请链接", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "aria-label": "邀请链接", defaultValue: "qingyan.tech/join/8KQ2", readOnly: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "复制链接", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "预算", className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "aria-label": "月度预算", defaultValue: "2000", inputMode: "decimal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupText, { children: "元 / 月" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
