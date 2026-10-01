import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Combobox, a as ComboboxInput, b as ComboboxPopup, c as ComboboxEmpty, d as ComboboxList, e as ComboboxItem } from "./combobox-HQR3mXiu.js";
import { F as Field, a as FieldLabel, b as FieldDescription, d as FieldError } from "./field-BVswHr8Y.js";
import { F as Form } from "./form-CSAjKfKk.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./ComboboxEmpty-BQp7q2Mg.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./stringifyLocale-DOx30wH1.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./separator-CcYO5Zxi.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
const meta = { title: "表单校验", description: "required 未选时由 Field 显示错误；提交值为选项的 value。" };
const banks = [
  { label: "中国工商银行", value: "ICBC" },
  { label: "中国建设银行", value: "CCB" },
  { label: "中国农业银行", value: "ABC" },
  { label: "中国银行", value: "BOC" },
  { label: "招商银行", value: "CMB" },
  { label: "交通银行", value: "BOCOM" }
];
function Demo() {
  const [result, setResult] = reactExports.useState(null);
  const onSubmit = (event) => {
    event.preventDefault();
    setResult(String(new FormData(event.currentTarget).get("bank")));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Form, { className: "flex w-full max-w-64 flex-col gap-4", onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { name: "bank", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "开户银行" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Combobox, { items: banks, required: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxInput, { placeholder: "搜索银行" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxPopup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxEmpty, { children: "没有匹配的银行" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxList, { children: (bank) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: bank, children: bank.label }, bank.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "用于结算打款，需与营业执照一致。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { match: "valueMissing", children: "请选择开户银行" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "保存结算信息" }),
    result !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
      "bank = ",
      result
    ] }) : null
  ] });
}
export {
  Demo as default,
  meta
};
