import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { d as AvatarGroup, A as Avatar, b as AvatarImage, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { E as Empty, a as EmptyHeader, d as EmptyMedia, b as EmptyTitle, c as EmptyDescription, e as EmptyContent } from "./empty-UZzeYbXj.js";
import { S as Send } from "./send-C5jMddXt.js";
const meta = { title: "头像组", description: "默认变体不加修饰，可以放头像组或插画。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Empty, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMedia, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AvatarGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "", src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "周" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "陈" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTitle, { children: "#发布协调 还没有消息" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyDescription, { children: "林晓雯、周子航和陈思远都在这里，打个招呼吧。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { "aria-hidden": "true" }),
      "发送消息"
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
