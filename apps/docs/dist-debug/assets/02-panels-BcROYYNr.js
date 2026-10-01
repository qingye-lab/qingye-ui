import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { F as Frame, a as FrameHeader, b as FrameTitle, c as FrameDescription, d as FramePanel } from "./frame-CYCij40I.js";
import { E as ExternalLink } from "./external-link-CKlK3qRq.js";
const meta = { title: "多个面板", description: "相邻面板之间自动留出 4px，露出外框的浅底作为分隔。" };
const environments = [
  { name: "生产环境", branch: "main", deployed: "2 分钟前", status: "运行中", tone: "bg-success" },
  { name: "预发环境", branch: "release/2.5", deployed: "今天 09:12", status: "运行中", tone: "bg-success" },
  { name: "开发环境", branch: "feat/coupon", deployed: "构建中", status: "部署中", tone: "bg-info" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Frame, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FrameHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FrameTitle, { children: "环境" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FrameDescription, { children: "每个环境对应一个分支，推送即部署。" })
    ] }),
    environments.map((env) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FramePanel, { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: env.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: `size-1.5 rounded-full ${env.tone}` }),
            env.status
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: env.branch }),
          " · ",
          env.deployed
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
        "访问",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { "aria-hidden": "true" })
      ] })
    ] }, env.name))
  ] });
}
export {
  Demo as default,
  meta
};
