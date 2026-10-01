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
const meta = { title: "四个方向", description: "position 决定滑入的边和滑动关闭的方向。" };
const positions = [
  { position: "bottom", label: "底部" },
  { position: "top", label: "顶部" },
  { position: "left", label: "左侧" },
  { position: "right", label: "右侧" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: positions.map(({ position, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { position, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPopup, { showBar: true, showCloseButton: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: "快捷设置" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerDescription, { children: [
          "从",
          label,
          "滑出，向外滑动即可关闭。"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerPanel, { className: "text-muted-foreground text-sm", children: "夜间模式、告警声音和自动同步可以在这里快速切换。" })
    ] })
  ] }, position)) });
}
export {
  Demo as default,
  meta
};
