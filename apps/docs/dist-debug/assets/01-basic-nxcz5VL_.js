import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Avatar, b as AvatarImage, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { U as User } from "./user-BVmTvaLY.js";
const meta = {
  title: "图片与回退",
  description: "没有图片或图片加载失败时显示 AvatarFallback，通常放姓氏或图标。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Avatar, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        AvatarImage,
        {
          alt: "林晓雯",
          src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=faces"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "周" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { "aria-hidden": "true", className: "size-4 text-muted-foreground" }) }) })
  ] });
}
export {
  Demo as default,
  meta
};
