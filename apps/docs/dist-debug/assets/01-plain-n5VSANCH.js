import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as Disclosure, a as DisclosureTrigger, b as DisclosurePanel } from "./disclosure-seuRJb5m.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { I as Input } from "./input-D9i-AULz.js";
import "./chevron-down-DlWyuvnt.js";
import "./CollapsiblePanel-B5cYZztf.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = {
  title: "表单中的高级设置",
  description: "plain：行内触发器，收起时字段仍保留取值。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex w-full max-w-sm flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "Webhook 地址" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "https://hooks.qingyan.tech/deploy" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Disclosure, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosureTrigger, { children: "高级设置" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DisclosurePanel, { className: "flex flex-col gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "超时时间（秒）" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "30", inputMode: "numeric" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "签名密钥" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "留空则不签名" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "用于校验请求确实来自青烟云。" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
