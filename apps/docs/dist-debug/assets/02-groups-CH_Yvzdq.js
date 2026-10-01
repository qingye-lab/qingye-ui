import { c as createLucideIcon, j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, dw as MenuGroup, dx as MenuGroupLabel, i as MenuItem, dv as MenuShortcut, k as MenuSeparator } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { U as User } from "./user-BVmTvaLY.js";
import { C as CreditCard } from "./credit-card-Civp1UKp.js";
import { S as Settings } from "./settings-D0--ss7R.js";
import { U as Users } from "./users-9eux0I7r.js";
import { U as UserPlus } from "./user-plus-DS5sj-HE.js";
const __iconNode = [
  ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
  ["path", { d: "M21 12H9", key: "dn1m92" }],
  ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
];
const LogOut = createLucideIcon("log-out", __iconNode);
const meta = { title: "分组与标题", description: "用 MenuGroup 与 MenuGroupLabel 组织较长的菜单。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" }) }),
      "林嘉禾"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", className: "w-56", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroupLabel, { children: "我的账号" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(User, {}),
          "个人资料",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⇧⌘P" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, {}),
          "账单与发票"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}),
          "偏好设置",
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuShortcut, { children: "⌘," })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuGroupLabel, { children: "团队 · 燕青科技" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, {}),
          "成员管理"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, {}),
          "邀请成员"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, {}),
        "退出登录"
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
