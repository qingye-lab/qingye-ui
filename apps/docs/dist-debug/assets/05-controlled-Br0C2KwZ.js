import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { a as Toggle } from "./toggle-1hwCCJTO.js";
import { B as Bell } from "./bell-DFpxbhe9.js";
const __iconNode = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  [
    "path",
    {
      d: "M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742",
      key: "178tsu"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }],
  ["path", { d: "M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05", key: "1hqiys" }]
];
const BellOff = createLucideIcon("bell-off", __iconNode);
const meta = {
  title: "受控",
  description: "用 pressed 与 onPressedChange 接管状态，例如订阅一台设备的告警。"
};
function Demo() {
  const [watching, setWatching] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Toggle, { onPressedChange: setWatching, pressed: watching, variant: "outline", children: [
      watching ? /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, {}),
      "关注告警"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: watching ? "SH-204 出现异常时会通知你" : "不会收到 SH-204 的通知" })
  ] });
}
export {
  Demo as default,
  meta
};
