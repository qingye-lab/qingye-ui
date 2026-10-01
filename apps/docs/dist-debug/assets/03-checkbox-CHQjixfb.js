import { r as reactExports, j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, dw as MenuGroup, dx as MenuGroupLabel, cH as MenuCheckboxItem, k as MenuSeparator } from "./index-DM02Iz28.js";
import { C as Columns3 } from "./columns-3-DOsRGz8Y.js";
const meta = {
  title: "勾选项",
  description: 'MenuCheckboxItem 切换选项且不关闭菜单；variant="switch" 显示为开关。'
};
const columns = ["设备编号", "所属仓库", "负责人", "最近上报", "固件版本"];
function Demo() {
  const [visible, setVisible] = reactExports.useState(["设备编号", "所属仓库", "最近上报"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Columns3, {}),
      "显示列"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", className: "w-52", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroupLabel, { children: "表格列" }),
        columns.map((column) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          MenuCheckboxItem,
          {
            checked: visible.includes(column),
            disabled: column === "设备编号",
            onCheckedChange: (checked) => setVisible((current) => checked ? [...current, column] : current.filter((item) => item !== column)),
            children: column
          },
          column
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCheckboxItem, { defaultChecked: true, variant: "switch", children: "紧凑行高" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuCheckboxItem, { variant: "switch", children: "固定首列" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
