import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { F as Field, b as FieldDescription } from "./field-BVswHr8Y.js";
import { F as FileUpload } from "./file-upload-CTuBjOUn.js";
import { I as Input } from "./input-D9i-AULz.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./file-image-B9HNmRf2.js";
import "./file-code-hnUPkPAB.js";
import "./file-text-BKTUvRr9.js";
import "./file-tUYWJKRx.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "组合：提交工单", description: "通过 name 参与原生表单提交，FormData 中直接拿到 File。" };
function Demo() {
  const [summary, setSummary] = reactExports.useState(null);
  const onSubmit = (event) => {
    event.preventDefault();
    const files = new FormData(event.currentTarget).getAll("attachments");
    setSummary(files.filter((file) => file.size > 0).map((file) => file.name).join("、") || "无附件");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex w-full max-w-md flex-col gap-4", onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ticket-title", children: "问题描述" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "ticket-title", defaultValue: "3 楼会议室投影仪无法识别 HDMI 信号" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ticket-files", children: "附件" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileUpload, { id: "ticket-files", name: "attachments", variant: "button", maxFiles: 5, chooseLabel: "添加附件" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "截图或日志，最多 5 个。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "self-start", children: "提交工单" }),
    summary !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
      "已提交：",
      summary
    ] }) : null
  ] });
}
export {
  Demo as default,
  meta
};
