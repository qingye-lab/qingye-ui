import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Fieldset, a as FieldsetLegend } from "./fieldset-BmPegBmZ.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { R as RadioGroup, a as Radio } from "./radio-group-CdHI6cJj.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useRegisteredLabelId-CQd8UikR.js";
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
import "./RadioIndicator-BxMi2w3T.js";
const meta = { title: "横向、禁用与错误" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-lg flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetLegend, { children: "巡检频率" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { defaultValue: "week", className: "flex-row flex-wrap gap-x-5 gap-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "day" }),
          "每天"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "week" }),
          "每周"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "month" }),
          "每月"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetLegend, { children: "机房（已锁定）" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { defaultValue: "hz", disabled: true, className: "flex-row flex-wrap gap-x-5 gap-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "hz" }),
          "杭州 IDC"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "sh" }),
          "上海 IDC"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetLegend, { children: "故障等级" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { "aria-describedby": "level-error", className: "flex-row flex-wrap gap-x-5 gap-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "p1", "aria-invalid": true }),
          "P1 紧急"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "p2", "aria-invalid": true }),
          "P2 严重"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "p3", "aria-invalid": true }),
          "P3 一般"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { id: "level-error", className: "text-destructive-foreground text-xs", children: "请选择故障等级" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
