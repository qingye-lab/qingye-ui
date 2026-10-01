import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { R as ResizablePanelGroup, a as ResizablePanel, b as ResizableHandle } from "./resizable-Bh5SYnUB.js";
const meta = { title: "纵向", description: 'direction="vertical" 上下排列，外层需要确定的高度。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-72 w-full max-w-2xl overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { direction: "vertical", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { defaultSize: 64, minSize: 30, children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "h-full overflow-auto p-4 font-mono text-xs leading-relaxed", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: `export async function loadReport(id: string) {
  const response = await fetch(\`/api/reports/\${id}\`);
  if (!response.ok) throw new Error("报表加载失败");
  return response.json();
}` }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { "aria-label": "调整终端高度" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { minSize: 18, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col gap-1 overflow-auto bg-muted/48 p-4 font-mono text-muted-foreground text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "$ pnpm test" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success-foreground", children: "✓ 42 项测试通过（1.8 秒）" })
    ] }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
