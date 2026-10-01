import { r as reactExports, j as jsxRuntimeExports, bp as X, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
const meta = {
  title: "作为链接或按钮",
  description: "通过 render 渲染为 <a> 或 <button>，获得悬停、焦点环与 44px 触屏点击区。"
};
const initialFilters = ["华东区", "已付款", "本月"];
function Demo() {
  const [filters, setFilters] = reactExports.useState(initialFilters);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "话题" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#design-system" }), variant: "outline", children: "#设计系统" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#a11y" }), variant: "outline", children: "#无障碍" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#dark-mode" }), variant: "outline", children: "#深色模式" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "筛选" }),
      filters.map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Badge,
        {
          render: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "aria-label": `移除筛选条件：${filter}`,
              onClick: () => setFilters(filters.filter((item) => item !== filter))
            }
          ),
          variant: "secondary",
          children: [
            filter,
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { "aria-hidden": "true" })
          ]
        },
        filter
      )),
      filters.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", variant: "ghost", onClick: () => setFilters(initialFilters), children: "恢复默认筛选" }) : null
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
