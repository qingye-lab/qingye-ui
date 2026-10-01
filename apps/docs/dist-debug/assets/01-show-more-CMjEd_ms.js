import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Collapsible, a as CollapsiblePanel, b as CollapsibleTrigger } from "./collapsible-DcdXgGKL.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import { G as GitBranch } from "./git-branch-Ara3B4X8.js";
import "./CollapsiblePanel-B5cYZztf.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
const meta = { title: "显示更多", description: "先展示最常用的几项，其余收起。" };
const repos = ["yanqing-ui", "yanqing-docs", "qingyan-site", "deploy-scripts", "design-tokens"];
function Repo({ name }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 rounded-md px-2 py-1.5 font-mono text-[0.8125rem]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GitBranch, { "aria-hidden": "true", className: "size-4 text-muted-foreground" }),
    name
  ] });
}
function Demo() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { className: "w-full max-w-xs", onOpenChange: setOpen, open, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { children: repos.slice(0, 2).map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(Repo, { name }, name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsiblePanel, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", {}), children: repos.slice(2).map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(Repo, { name }, name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-1", size: "sm", variant: "ghost" }), children: [
      open ? "收起" : `显示其余 ${repos.length - 2} 个仓库`,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "transition-transform duration-200 in-data-panel-open:rotate-180" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
