import { j as jsxRuntimeExports, D as Search } from "./index-DM02Iz28.js";
import { C as Combobox, a as ComboboxInput, b as ComboboxPopup, c as ComboboxEmpty, d as ComboboxList, e as ComboboxItem } from "./combobox-HQR3mXiu.js";
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
const meta = { title: "前置图标、清除与自动高亮", description: "autoHighlight 让回车直接选中第一个匹配项。" };
const people = [
  { label: "张伟", value: "zhangwei", team: "运维组" },
  { label: "王芳", value: "wangfang", team: "网络组" },
  { label: "李娜", value: "lina", team: "安全组" },
  { label: "刘洋", value: "liuyang", team: "运维组" },
  { label: "陈静", value: "chenjing", team: "数据库组" },
  { label: "杨帆", value: "yangfan", team: "网络组" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Combobox, { items: people, autoHighlight: true, defaultValue: people[2], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ComboboxInput,
      {
        "aria-label": "值班负责人",
        placeholder: "搜索成员",
        startAddon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}),
        showClear: true
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ComboboxPopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxEmpty, { children: "没有找到该成员" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxList, { children: (person) => /* @__PURE__ */ jsxRuntimeExports.jsx(ComboboxItem, { value: person, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-between gap-4", children: [
        person.label,
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: person.team })
      ] }) }, person.value) })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
