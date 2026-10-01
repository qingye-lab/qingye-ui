import { r as reactExports, j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, i as MenuItem, k as MenuSeparator } from "./index-DM02Iz28.js";
import { D as Dialog, b as DialogPopup, c as DialogHeader, d as DialogTitle, e as DialogDescription, f as DialogPanel, g as DialogFooter, h as DialogClose } from "./dialog-DYK4nuM6.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { I as Input } from "./input-D9i-AULz.js";
import { E as Ellipsis } from "./ellipsis-BiesIFo2.js";
import { U as UserPlus } from "./user-plus-DS5sj-HE.js";
import { P as Pencil } from "./pencil-DgXZTkvr.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = {
  title: "从菜单打开",
  description: "菜单项只负责切换状态，对话框放在菜单之外，菜单关闭后对话框仍然存在。"
};
function Demo() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "项目操作", size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { onClick: () => setOpen(true), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, {}),
          "邀请成员…"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, {}),
          "重命名"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { onOpenChange: setOpen, open, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogPopup, { className: "sm:max-w-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "邀请成员" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogDescription, { children: "对方接受邀请后即可查看“华东仓储”项目。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "邮箱地址" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "name@company.com", type: "email" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "取消" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {}), children: "发送邀请" })
      ] })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
