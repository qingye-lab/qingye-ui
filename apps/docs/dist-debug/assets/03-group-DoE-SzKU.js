import { j as jsxRuntimeExports, r as reactExports, B as Button, bp as X } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription } from "./card-BUhACMgh.js";
import { f as ItemGroup, g as ItemSeparator, I as Item, a as ItemMedia, b as ItemContent, c as ItemTitle, d as ItemDescription, e as ItemActions } from "./item-CPHg7cF5.js";
import "./separator-CcYO5Zxi.js";
const meta = { title: "成员列表", description: "ItemGroup + ItemSeparator 组成列表；操作按钮的 aria-label 写明对象。" };
const members = [
  { name: "林嘉怡", initials: "林", email: "linjiayi@yanqing.cn", role: "店长" },
  { name: "周子航", initials: "周", email: "zhouzihang@yanqing.cn", role: "收银" },
  { name: "陈思远", initials: "陈", email: "chensiyuan@yanqing.cn", role: "后厨" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "门店成员" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "徐汇漕溪北路店 · 3 人" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ItemGroup, { className: "px-2 pb-2", children: members.map((member, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      index > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(ItemSeparator, { className: "mx-2 w-auto" }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemMedia, { variant: "avatar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: member.initials }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemTitle, { children: [
            member.name,
            index === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: member.role }) : null
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDescription, { className: "truncate", children: member.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemActions, { children: index === 0 ? null : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": `移除 ${member.name}`, size: "icon-sm", variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, {}) }) })
      ] })
    ] }, member.email)) })
  ] });
}
export {
  Demo as default,
  meta
};
