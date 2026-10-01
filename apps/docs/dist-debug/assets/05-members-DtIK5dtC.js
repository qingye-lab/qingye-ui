import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { A as Avatar, b as AvatarImage, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, f as CardAction, d as CardPanel } from "./card-BUhACMgh.js";
import { U as UserPlus } from "./user-plus-DS5sj-HE.js";
const meta = { title: "组合：成员列表", description: "头像旁已有姓名时，图片 alt 留空，避免读屏重复朗读。" };
const members = [
  {
    name: "林晓雯",
    email: "linxiaowen@yanqing.cn",
    role: "所有者",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces"
  },
  {
    name: "周子航",
    email: "zhouzihang@yanqing.cn",
    role: "管理员",
    src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces"
  },
  { name: "陈思远", email: "chensiyuan@yanqing.cn", role: "成员" },
  {
    name: "沈若溪",
    email: "shenruoxi@yanqing.cn",
    role: "成员",
    src: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces"
  }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "成员" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "4 人可以访问此项目" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardAction, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { "aria-hidden": "true" }),
        "邀请"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "-my-3 divide-y", children: members.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { children: [
        member.src ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "", src: member.src }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: member.name.slice(0, 1) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm leading-none", children: member.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground text-xs leading-none", children: member.email })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: member.role === "成员" ? "outline" : "secondary", children: member.role })
    ] }, member.email)) }) })
  ] });
}
export {
  Demo as default,
  meta
};
