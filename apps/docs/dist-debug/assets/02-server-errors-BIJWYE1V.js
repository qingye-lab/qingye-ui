import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, d as FieldError } from "./field-BVswHr8Y.js";
import { F as Form } from "./form-CSAjKfKk.js";
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
const meta = {
  title: "服务端错误",
  description: "把接口返回的字段错误交给 errors，空的 <FieldError /> 会显示对应字段的错误；修改字段后自动清除。"
};
async function createDevice(values) {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const errors = {};
  if (!/^[A-Z]{2}-\d{3}$/.test(String(values.code))) errors.code = "编号格式为两位大写字母 + 三位数字，例如 HZ-031。";
  if (String(values.code) === "HZ-031") errors.code = "编号 HZ-031 已被“温湿度传感器”占用。";
  if (!String(values.name).trim()) errors.name = "请填写设备名称。";
  return errors;
}
function Demo() {
  const [errors, setErrors] = reactExports.useState({});
  const [loading, setLoading] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Form,
    {
      className: "flex w-full max-w-xs flex-col gap-4",
      errors,
      onFormSubmit: async (values) => {
        setLoading(true);
        setErrors(await createDevice(values));
        setLoading(false);
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "code", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "设备编号" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "HZ-031" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "name", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "设备名称" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "例如：2 号库温湿度传感器" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading, type: "submit", children: "添加设备" })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
