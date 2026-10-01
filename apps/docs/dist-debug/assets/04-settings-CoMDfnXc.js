import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { f as FieldGroup, F as Field, a as FieldLabel, c as FieldContent, b as FieldDescription } from "./field-BVswHr8Y.js";
import { F as Frame, a as FrameHeader, b as FrameTitle, c as FrameDescription, d as FramePanel, e as FrameFooter } from "./frame-CYCij40I.js";
import { I as Input } from "./input-D9i-AULz.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
const meta = { title: "组合：构建设置", description: "表单放在面板里，保存操作放在外框底部。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Frame, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FrameHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FrameTitle, { children: "构建与部署" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FrameDescription, { children: "修改后从下一次推送开始生效。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FramePanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "构建命令" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "font-mono", defaultValue: "pnpm build" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "输出目录" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "font-mono", defaultValue: "dist" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "自动部署" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "推送到 main 后自动发布上线。" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FrameFooter, { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", children: "取消" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "保存" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
