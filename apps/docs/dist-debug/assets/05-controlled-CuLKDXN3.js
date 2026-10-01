import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { T as TagInput } from "./tag-input-qOJAIGC3.js";
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
  title: "受控与表单提交",
  description: "value 与 onValueChange 受控；每个标签提交一个同名隐藏字段。"
};
const suggestions = ["退款", "物流延迟", "发票", "账号安全"];
function Demo() {
  const [tags, setTags] = reactExports.useState(["物流延迟"]);
  const [submitted, setSubmitted] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      className: "flex w-full max-w-md flex-col gap-4",
      onSubmit: (event) => {
        event.preventDefault();
        setSubmitted(new FormData(event.currentTarget).getAll("labels").map(String));
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "工单标签" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { name: "labels", onValueChange: setTags, placeholder: "添加标签", value: tags }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "me-0.5 text-muted-foreground text-xs", children: "常用" }),
            suggestions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                disabled: tags.includes(item),
                onClick: () => setTags([...tags, item]),
                size: "xs",
                type: "button",
                variant: "outline",
                children: item
              },
              item
            ))
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "保存工单" }),
          submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "truncate text-muted-foreground text-sm", children: [
            "已提交 ",
            submitted.length,
            " 个：",
            submitted.join("、") || "无"
          ] }) : null
        ] })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
