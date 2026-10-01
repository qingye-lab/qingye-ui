import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Avatar, b as AvatarImage, a as AvatarFallback, c as AvatarBadge } from "./avatar-95P5m5ew.js";
const meta = {
  title: "状态标记",
  description: "AvatarBadge 默认为在线的绿色，用 className 换成其他状态色；旁边始终配上文字。"
};
const people = [
  {
    name: "林晓雯",
    status: "在线",
    tone: "bg-success",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces"
  },
  {
    name: "周子航",
    status: "离开 · 15 分钟",
    tone: "bg-warning",
    src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces"
  },
  { name: "陈思远", status: "会议中", tone: "bg-destructive" },
  { name: "许嘉怡", status: "离线", tone: "bg-muted-foreground" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2", children: people.map((person) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "lg", children: [
      person.src ? /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "", src: person.src }) : null,
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: person.name.slice(0, 1) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarBadge, { className: person.tone })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm leading-none", children: person.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs leading-none", children: person.status })
    ] })
  ] }, person.name)) });
}
export {
  Demo as default,
  meta
};
