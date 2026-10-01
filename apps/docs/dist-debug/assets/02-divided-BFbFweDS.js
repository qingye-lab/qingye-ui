import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel } from "./card-BUhACMgh.js";
import { D as DescriptionList, a as DescriptionListItem, b as DescriptionTerm, c as DescriptionDetails } from "./description-list-DbCz6cCA.js";
import { S as StatusDot } from "./status-dot-CJpp8V8E.js";
import { M as MapPin } from "./map-pin-ZOHj_P5X.js";
import "./copy-button-B3gSj0u1.js";
import "./copy-CMgYpHr5.js";
const __iconNode$2 = [
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M17 20v2", key: "1rnc9c" }],
  ["path", { d: "M17 2v2", key: "11trls" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M2 17h2", key: "7oei6x" }],
  ["path", { d: "M2 7h2", key: "asdhe0" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "M20 17h2", key: "1fpfkl" }],
  ["path", { d: "M20 7h2", key: "1o8tra" }],
  ["path", { d: "M7 20v2", key: "4gnj0m" }],
  ["path", { d: "M7 2v2", key: "1i4yhu" }],
  ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
  ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
];
const Cpu = createLucideIcon("cpu", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M4.9 16.1C1 12.2 1 5.8 4.9 1.9", key: "s0qx1y" }],
  ["path", { d: "M7.8 4.7a6.14 6.14 0 0 0-.8 7.5", key: "1idnkw" }],
  ["circle", { cx: "12", cy: "9", r: "2", key: "1092wv" }],
  ["path", { d: "M16.2 4.8c2 2 2.26 5.11.8 7.47", key: "ojru2q" }],
  ["path", { d: "M19.1 1.9a9.96 9.96 0 0 1 0 14.1", key: "rhi7fg" }],
  ["path", { d: "M9.5 18h5", key: "mfy3pd" }],
  ["path", { d: "m8 22 4-11 4 11", key: "25yftu" }]
];
const RadioTower = createLucideIcon("radio-tower", __iconNode$1);
const __iconNode = [
  ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
  ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
  ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
];
const Timer = createLucideIcon("timer", __iconNode);
const meta = { title: "分隔线与图标", description: "divided 在条目间加发丝线；名称可带图标。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "设备信息" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "前台收银机 · 徐汇店" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionList, { divided: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionTerm, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioTower, { "aria-hidden": "true" }),
          "连接状态"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { pulse: true, status: "online", children: "在线" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionTerm, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { "aria-hidden": "true" }),
          "设备序列号"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: "font-mono", copyLabel: "复制设备序列号", copyValue: "T2S-8F3A-21C7-0049", children: "T2S-8F3A-21C7-0049" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionTerm, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { "aria-hidden": "true" }),
          "安装位置"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { children: "一楼前台 2 号收银台" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionTerm, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Timer, { "aria-hidden": "true" }),
          "持续在线"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: "numeric", children: "18 天 6 小时" })
      ] })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
