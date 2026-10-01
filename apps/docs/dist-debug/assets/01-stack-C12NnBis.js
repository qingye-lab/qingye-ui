import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { I as Input } from "./input-D9i-AULz.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { S as Stack, T as Text } from "./layout-I2EQ_Vmi.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "Stack", description: "表单字段纵向排列：外层 gap 5 分隔字段，内层 gap 2 连接标签与输入。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { as: "form", className: "w-full max-w-sm", gap: 5, onSubmit: (event) => event.preventDefault(), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: 2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "team-name", children: "团队名称" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "青烟科技", id: "team-name" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: 2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "team-slug", children: "团队地址" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "qingyan", id: "team-slug" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "caption", tone: "muted", children: "成员通过 qingyan.tech/qingyan 访问团队主页。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "self-start", type: "submit", children: "保存" })
  ] });
}
export {
  Demo as default,
  meta
};
