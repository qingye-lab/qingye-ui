import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { N as NativeSelect, b as NativeSelectOptGroup, a as NativeSelectOption } from "./native-select-3N5bSCwi.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "分组与长列表", description: "选项很多时用 optgroup 分组，系统选择器会自带滚动与快速定位。" };
const regions = [
  { label: "华北", provinces: ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区"] },
  { label: "华东", provinces: ["上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省"] },
  { label: "华南", provinces: ["广东省", "广西壮族自治区", "海南省"] },
  { label: "西南", provinces: ["重庆市", "四川省", "贵州省", "云南省", "西藏自治区"] }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "收货省份" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelect, { name: "province", placeholder: "选择省份", required: true, children: regions.map((region) => /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOptGroup, { label: region.label, children: region.provinces.map((province) => /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: province, children: province }, province)) }, region.label)) })
  ] });
}
export {
  Demo as default,
  meta
};
