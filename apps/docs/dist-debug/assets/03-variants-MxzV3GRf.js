import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as Drawer, a as DrawerTrigger, b as DrawerPopup, c as DrawerHeader, d as DrawerTitle, e as DrawerDescription, h as DrawerPanel } from "./drawer-BwQ1Zyel.js";
import "./RadioGroup-BEp5uKmZ.js";
import "./LabelableContext-DO-1KYYg.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
import "./serializeValue-BLvnTy3o.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useFieldValidation-CDOPo50V.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./RadioIndicator-BxMi2w3T.js";
const meta = {
  title: "样式变体",
  description: "inset 在宽屏下与屏幕边缘留出间距；straight 去掉圆角，适合贴边的导航。"
};
const items = [
  { variant: "inset", position: "right", label: "内嵌 · 右侧" },
  { variant: "inset", position: "bottom", label: "内嵌 · 底部" },
  { variant: "straight", position: "left", label: "直角 · 左侧" },
  { variant: "straight", position: "bottom", label: "直角 · 底部" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: items.map(({ variant, position, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { position, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPopup, { showBar: true, variant, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: "同步状态" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: "最近一次同步：今天 10:18，共 2,306 条记录。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerPanel, { className: "text-muted-foreground text-sm", children: "离线期间产生的扫码记录会在网络恢复后自动上传。" })
    ] })
  ] }, label)) });
}
export {
  Demo as default,
  meta
};
