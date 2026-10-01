import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { u as useMediaQuery } from "./use-media-query-CGVr0VA1.js";
import { D as Dialog, a as DialogTrigger, b as DialogPopup, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogPanel, g as DialogFooter, h as DialogClose } from "./dialog-DYK4nuM6.js";
import { D as Drawer, a as DrawerTrigger, b as DrawerPopup, c as DrawerHeader, d as DrawerTitle, e as DrawerDescription, h as DrawerPanel, f as DrawerFooter, g as DrawerClose } from "./drawer-BwQ1Zyel.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { I as Input } from "./input-D9i-AULz.js";
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
import "./separator-CcYO5Zxi.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldControl-CFc5_9rC.js";
const meta = {
  title: "响应式：桌面对话框，移动端抽屉",
  description: "同一份表单，宽屏用 Dialog，窄屏用可拖拽的 Drawer。"
};
const title = "修改收货地址";
const description = "仅影响尚未发货的订单。";
function Fields() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "收货人" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "许清和" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "详细地址" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "杭州市西湖区文三路 478 号 6 楼" })
    ] })
  ] });
}
function Demo() {
  const isMobile = useMediaQuery("max-md");
  const trigger = /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" });
  if (isMobile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { render: trigger, children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPopup, { showBar: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerPanel, { className: "grid gap-4", scrollable: false, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Fields, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "保存" })
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { render: trigger, children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPopup, { className: "sm:max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogPanel, { className: "grid gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Fields, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "保存" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
