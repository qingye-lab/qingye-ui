import { c as createLucideIcon, j as jsxRuntimeExports, a5 as CircleCheck, F as TriangleAlert } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { G as GitBranch } from "./git-branch-Ara3B4X8.js";
import { C as Clock } from "./clock-CKIGwLdk.js";
const __iconNode$1 = [
  [
    "path",
    {
      d: "M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z",
      key: "3c2336"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const BadgeCheck = createLucideIcon("badge-check", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode);
const meta = { title: "带图标", description: "图标放在文字前，尺寸随徽章自动调整。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { "aria-hidden": "true" }),
      "已认证"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { "aria-hidden": "true" }),
      "main"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { "aria-hidden": "true" }),
      "排队中"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "success", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { "aria-hidden": "true" }),
      "已部署"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "warning", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { "aria-hidden": "true" }),
      "证书 7 天后过期"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { "aria-hidden": "true" }),
      "构建失败"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
