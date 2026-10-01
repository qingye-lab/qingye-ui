import { r as reactExports, j as jsxRuntimeExports, C as Check } from "./index-DM02Iz28.js";
import { C as Command, a as CommandInput, b as CommandPanel, c as CommandEmpty, d as CommandList, h as CommandItem } from "./command-BRcGQYa0.js";
import "./autocomplete-DlyiU5Sk.js";
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
const meta = {
  title: "内嵌列表",
  description: "不放在对话框里，作为可搜索的选择列表；关闭 autoFocus 以免抢走页面焦点。"
};
const projects = [
  { value: "east", label: "华东仓储" },
  { value: "south", label: "华南门店" },
  { value: "southwest", label: "西南物流" },
  { value: "north", label: "华北工厂" },
  { value: "hq", label: "总部行政" }
];
function Demo() {
  const [selected, setSelected] = reactExports.useState("east");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xs rounded-2xl border bg-muted/72", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Command, { items: projects, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CommandInput, { "aria-label": "搜索项目", autoFocus: false, placeholder: "切换项目…" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandPanel, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandEmpty, { children: "没有找到这个项目" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CommandList, { children: (project) => /* @__PURE__ */ jsxRuntimeExports.jsxs(CommandItem, { onClick: () => setSelected(project.value), value: project, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1", children: project.label }),
        selected === project.value ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, {}) : null
      ] }, project.value) })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
