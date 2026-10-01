import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as Drawer, a as DrawerTrigger, b as DrawerPopup, c as DrawerHeader, d as DrawerTitle, e as DrawerDescription, f as DrawerFooter, g as DrawerClose, h as DrawerPanel } from "./drawer-BwQ1Zyel.js";
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
  title: "嵌套抽屉",
  description: "下一级抽屉打开时，上一级缩小并露出边缘，形成层叠；关闭后自然回位。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "付款方式" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPopup, { showBar: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: "付款方式" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: "订单 YQ20260930-0418 · 应付 ¥ 14,280.00" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerFooter, { variant: "bare", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "添加对公账户" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPopup, { showBar: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: "添加对公账户" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerDescription, { children: "账户需与开票信息中的公司名称一致。" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerPanel, { className: "grid gap-4", scrollable: false, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "开户银行" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "招商银行杭州分行" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "银行账号" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { inputMode: "numeric", placeholder: "请输入对公账号" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerFooter, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "返回" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "保存" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
