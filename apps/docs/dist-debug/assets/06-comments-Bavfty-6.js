import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Avatar, b as AvatarImage, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
const meta = { title: "组合：评论", description: "头像与姓名、时间组成评论头部，正文与姓名左对齐。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-md flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          AvatarImage,
          {
            alt: "",
            src: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "沈" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "沈若溪" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("time", { className: "text-muted-foreground text-xs numeric", children: "今天 10:24" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-pretty text-sm", children: "首页骨架屏和真实内容的高度不一致，加载完成时列表会往下跳一下，能统一成 72px 吗？" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "陈" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "陈思远" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "secondary", children: "作者" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("time", { className: "text-muted-foreground text-xs numeric", children: "今天 10:41" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-pretty text-sm", children: "已改，骨架行高现在和列表项一致，预发环境可以看效果。" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
