import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { R as ResizablePanelGroup, a as ResizablePanel, b as ResizableHandle } from "./resizable-Bh5SYnUB.js";
const __iconNode$2 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
];
const PanelLeftClose = createLucideIcon("panel-left-close", __iconNode$1);
const __iconNode = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
];
const PanelLeftOpen = createLucideIcon("panel-left-open", __iconNode);
const meta = {
  title: "可折叠与命令式控制",
  description: "拖过最小宽度的一半即收起为图标栏，也可以聚焦分隔条按 Enter，或通过 panelRef 用按钮切换。"
};
const channels = ["产品讨论", "设计评审", "发布计划", "客户反馈"];
function Demo() {
  const sidebar = reactExports.useRef(null);
  const [collapsed, setCollapsed] = reactExports.useState(false);
  const [sizes, setSizes] = reactExports.useState([]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-2xl flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { onLayout: setSizes, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResizablePanel,
        {
          collapsedSize: 9,
          collapsible: true,
          defaultSize: 30,
          maxSize: 45,
          minSize: 20,
          onCollapse: () => setCollapsed(true),
          onExpand: () => setCollapsed(false),
          panelRef: sidebar,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { "aria-label": "频道", className: "flex h-full flex-col gap-0.5 bg-muted/40 p-2", children: channels.map((channel, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `flex items-center gap-2 rounded-md px-2 py-1.5 text-sm ${collapsed ? "justify-center" : ""} ${index === 1 ? "bg-accent font-medium text-foreground" : "text-muted-foreground"}`,
              title: collapsed ? channel : void 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { "aria-hidden": "true", className: "size-3.5 shrink-0 opacity-72" }),
                collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: channel }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: channel })
              ]
            },
            channel
          )) })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { "aria-label": "调整频道列表宽度", withHandle: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { minSize: 40, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col gap-3 p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              "aria-label": collapsed ? "展开频道列表" : "收起频道列表",
              onClick: () => collapsed ? sidebar.current?.expand() : sidebar.current?.collapse(),
              size: "icon-sm",
              variant: "ghost",
              children: collapsed ? /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftOpen, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeftClose, {})
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "# 设计评审" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-pretty", children: "周四下午三点评审新版结算页，请提前在原型中留下批注。" })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs numeric", children: [
      "当前布局：",
      sizes.map((size) => `${Math.round(size)}%`).join(" / ")
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
