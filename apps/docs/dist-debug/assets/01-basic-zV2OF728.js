import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Combobox, a as ComboboxInput, b as ComboboxPopup, c as ComboboxEmpty, d as ComboboxList, e as ComboboxItem } from "./combobox-HQR3mXiu.js";
import { L as Label } from "./label-DS1FPyP3.js";
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
const meta = { title: "基础用法", description: "输入即筛选，方向键选择，回车确认。" };
const cities = ["北京", "上海", "广州", "深圳", "杭州", "南京", "苏州", "成都", "重庆", "武汉", "西安", "长沙", "青岛", "厦门"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-64 flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "warehouse-city", children: "发货城市" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Combobox, { items: cities, defaultValue: "杭州", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxInput, { id: "warehouse-city", placeholder: "输入城市名" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxPopup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxEmpty, { children: "没有匹配的城市" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxList, { children: (city) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: city, children: city }, city) })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
