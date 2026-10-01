import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as Drawer, a as DrawerTrigger, b as DrawerPopup, h as DrawerPanel, i as DrawerMenu, j as DrawerMenuGroup, k as DrawerMenuGroupLabel, g as DrawerClose, l as DrawerMenuItem, m as DrawerMenuSeparator, n as DrawerMenuCheckboxItem, o as DrawerMenuRadioGroup, p as DrawerMenuRadioItem } from "./drawer-BwQ1Zyel.js";
import { E as Ellipsis } from "./ellipsis-BiesIFo2.js";
import { P as Pencil } from "./pencil-DgXZTkvr.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
import { S as Share2 } from "./share-2-BhyTdvdY.js";
import { T as Trash2 } from "./trash-2-CSLTv-pi.js";
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
  title: "动作菜单",
  description: "移动端用 DrawerMenu 代替下拉菜单：普通项、勾选、单选、开关和危险操作。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Drawer, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "更多操作", size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerPopup, { showBar: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerMenu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerMenuGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuGroupLabel, { children: "工单 #2318" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuItem, {}), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, {}),
          "编辑"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuItem, {}), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {}),
          "复制链接"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuItem, {}), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, {}),
          "转交他人"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuCheckboxItem, { defaultChecked: true, children: "关注此工单" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuCheckboxItem, { variant: "switch", children: "处理完成后通知我" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerMenuGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuGroupLabel, { children: "优先级" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerMenuRadioGroup, { defaultValue: "high", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuRadioItem, { value: "urgent", children: "紧急" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuRadioItem, { value: "high", children: "高" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuRadioItem, { value: "normal", children: "普通" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerMenuItem, { variant: "destructive" }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {}),
        "删除工单"
      ] })
    ] }) }) })
  ] });
}
export {
  Demo as default,
  meta
};
