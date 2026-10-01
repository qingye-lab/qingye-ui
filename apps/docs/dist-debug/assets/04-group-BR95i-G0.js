import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { d as AvatarGroup, A as Avatar, b as AvatarImage, a as AvatarFallback, e as AvatarGroupCount } from "./avatar-95P5m5ew.js";
const meta = {
  title: "头像组",
  description: "AvatarGroup 按头像尺寸调整重叠量；AvatarGroupCount 自动与组内头像同尺寸。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AvatarGroup, { "aria-label": "共 9 位成员", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "林晓雯", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "周子航", src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "周" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "陈" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "沈若溪", src: "https://images.unsplash.com/photo-1569913486515-b74bf7751574?w=96&h=96&fit=crop&crop=faces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "沈" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarGroupCount, { children: "+5" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AvatarGroup, { "aria-label": "共 16 位成员", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "许嘉怡", src: "https://images.unsplash.com/photo-1614644147724-2d4785d69962?w=96&h=96&fit=crop&crop=faces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "许" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "王" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "林晓雯", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { size: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarImage, { alt: "周子航", src: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=96&h=96&fit=crop&crop=faces" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "周" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarGroupCount, { children: "+12" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
