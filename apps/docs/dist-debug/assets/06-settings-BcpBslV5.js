import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel } from "./card-BUhACMgh.js";
import { F as Field, c as FieldContent, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "设置卡片", description: "Field 横向排列标签与开关，点击标签也能切换。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "邮件通知" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "选择哪些事件需要发送到 linxiaowen@yanqing.cn。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "部署失败" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "构建或上线出错时立即通知。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "新成员加入" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "有人接受邀请加入团队时通知。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "每周用量报告" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "每周一汇总上周的带宽、构建分钟数与费用。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {})
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
