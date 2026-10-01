import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel, e as CardFooter } from "./card-BUhACMgh.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { I as Input } from "./input-D9i-AULz.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "基础", description: "标题、内容与底部操作。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "创建项目" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "新项目默认部署到华东 1 区，可随时在设置中更改。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "项目名称" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "例如：会员中心" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", children: "取消" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "创建" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
