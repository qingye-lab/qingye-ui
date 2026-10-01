import { c as createLucideIcon, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import { T as Toolbar, a as ToolbarGroup, b as ToolbarButton, c as ToolbarSeparator } from "./toolbar-DbH1xqZI.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./CompositeRoot-xQsp56hN.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const __iconNode$1 = [
  ["path", { d: "m15 14 5-5-5-5", key: "12vg1m" }],
  ["path", { d: "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13", key: "6uklza" }]
];
const Redo2 = createLucideIcon("redo-2", __iconNode$1);
const __iconNode = [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
];
const Undo2 = createLucideIcon("undo-2", __iconNode);
const meta = {
  title: "下拉与主操作",
  description: "SelectTrigger 与 Button 同样通过 render 接入键盘漫游；用 ms-auto 把主操作推到末端。"
};
const fonts = [
  { label: "思源黑体", value: "source-han-sans" },
  { label: "思源宋体", value: "source-han-serif" },
  { label: "霞鹜文楷", value: "lxgw-wenkai" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Toolbar, { "aria-label": "文档工具", className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ToolbarGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": "撤销", render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo2, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": "重做", disabled: true, render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Redo2, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "source-han-sans", items: fonts, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ToolbarButton,
        {
          render: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "字体", className: "w-auto min-w-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: fonts.map((font) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: font.value, children: font.label }, font.value)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { className: "ms-auto", render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "发布" })
  ] });
}
export {
  Demo as default,
  meta
};
