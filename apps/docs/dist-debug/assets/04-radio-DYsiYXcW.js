import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, dw as MenuGroup, dx as MenuGroupLabel, dy as MenuRadioGroup, dz as MenuRadioItem } from "./index-DM02Iz28.js";
const __iconNode = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "m21 8-4-4-4 4", key: "1c9v7m" }],
  ["path", { d: "M17 4v16", key: "7dpous" }]
];
const ArrowDownUp = createLucideIcon("arrow-down-up", __iconNode);
const meta = { title: "单选项", description: "MenuRadioGroup 中只能选中一项，适合排序、视图切换。" };
const options = [
  { value: "updated", label: "最近更新" },
  { value: "created", label: "创建时间" },
  { value: "priority", label: "优先级" },
  { value: "assignee", label: "负责人" }
];
function Demo() {
  const [sort, setSort] = reactExports.useState("updated");
  const current = options.find((option) => option.value === sort)?.label;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownUp, {}),
      current
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuPopup, { align: "start", className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroupLabel, { children: "排序方式" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRadioGroup, { onValueChange: setSort, value: sort, children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRadioItem, { value: option.value, children: option.label }, option.value)) })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
