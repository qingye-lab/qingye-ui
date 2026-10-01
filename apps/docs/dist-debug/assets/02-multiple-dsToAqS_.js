import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionPanel } from "./accordion-5lJTL7g5.js";
import "./chevron-down-DlWyuvnt.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
const meta = { title: "同时展开多个与禁用", description: "multiple 允许多个分节同时展开；单个分节可以禁用。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { className: "w-full max-w-md", defaultValue: ["build", "env"], multiple: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "build", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "构建命令" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionPanel, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "rounded bg-muted px-1.5 py-0.5 font-mono text-foreground text-xs", children: "pnpm build" }),
        "，输出目录为 dist。"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: "env", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "环境变量" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionPanel, { children: "已配置 6 个变量，其中 2 个仅在生产环境生效。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { disabled: true, value: "domain", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: "自定义域名（团队版可用）" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionPanel, { children: "绑定你自己的域名，并自动签发 HTTPS 证书。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
