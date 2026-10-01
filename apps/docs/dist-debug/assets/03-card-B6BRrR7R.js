import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { R as RadioGroup, a as Radio } from "./radio-group-CdHI6cJj.js";
import "./RadioGroup-BEp5uKmZ.js";
import "./LabelableContext-DO-1KYYg.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
import "./serializeValue-BLvnTy3o.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useFieldValidation-CDOPo50V.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./RadioIndicator-BxMi2w3T.js";
const meta = { title: "卡片选项", description: "适合套餐、方案这类需要对比的选择。" };
const plans = [
  { value: "basic", name: "基础版", detail: "10 台设备 · 7 天数据", price: "¥0" },
  { value: "pro", name: "专业版", detail: "200 台设备 · 90 天数据", price: "¥299/月" },
  { value: "enterprise", name: "企业版", detail: "不限设备 · 私有部署", price: "联系销售" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { "aria-label": "订阅套餐", defaultValue: "pro", className: "grid w-full max-w-2xl gap-2 sm:grid-cols-3", children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Label,
    {
      className: "flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: plan.value, className: "mt-px" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: plan.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground text-xs", children: plan.detail }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 font-semibold text-sm numeric", children: plan.price })
        ] })
      ]
    },
    plan.value
  )) });
}
export {
  Demo as default,
  meta
};
