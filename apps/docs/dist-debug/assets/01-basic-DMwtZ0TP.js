import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { F as Frame, a as FrameHeader, b as FrameTitle, c as FrameDescription, d as FramePanel, e as FrameFooter } from "./frame-CYCij40I.js";
const meta = { title: "基础", description: "标题与提示落在浅底上，主要内容放进白色面板。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Frame, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FrameHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FrameTitle, { children: "自定义域名" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FrameDescription, { children: "绑定后可以用自己的域名访问项目。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FramePanel, { className: "flex flex-col gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium text-sm", children: "shop.yanqing.cn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "已生效" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "SSL 证书将于 2027年1月12日自动续期" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FrameFooter, { className: "text-muted-foreground text-sm", children: "DNS 记录变更最长需要 48 小时生效。" })
  ] });
}
export {
  Demo as default,
  meta
};
