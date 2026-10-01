import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
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
  title: "吸附高度",
  description: "snapPoints 让抽屉先停在半屏预览，向上拖动展开到全高。"
};
const devices = Array.from({ length: 24 }, (_, index) => ({
  id: `YQ-SC-${20391 + index}`,
  online: index % 5 !== 3
}));
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { snapPoints: ["320px", 1], snapToSequentialPoints: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "附近设备" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPopup, { showBar: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: "附近设备" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: "向上拖动查看全部 24 台设备。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2", children: devices.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "numeric font-medium", children: device.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: device.online ? "success" : "outline", children: device.online ? "在线" : "离线" })
      ] }, device.id)) }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
