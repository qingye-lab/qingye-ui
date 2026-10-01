import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as Drawer, a as DrawerTrigger, b as DrawerPopup, c as DrawerHeader, d as DrawerTitle, e as DrawerDescription, f as DrawerFooter, g as DrawerClose } from "./drawer-BwQ1Zyel.js";
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
const meta = { title: "基础用法", description: "默认从底部滑出，showBar 显示拖动手柄，向下拖动即可关闭。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "扫码结果" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPopup, { showBar: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { className: "text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: "已识别设备 YQ-SC-20391" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: "仓库 3 号扫码枪 · 华东仓储 · 在线" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerFooter, { variant: "bare", className: "sm:justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "继续扫码" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "查看设备" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
