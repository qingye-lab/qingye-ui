import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { a as Toggle } from "./toggle-1hwCCJTO.js";
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
  ["path", { d: "M3 9h18", key: "1pudct" }],
  ["path", { d: "M3 15h18", key: "5xshup" }],
  ["path", { d: "M9 3v18", key: "fh3hqa" }],
  ["path", { d: "M15 3v18", key: "14nvp0" }]
];
const Grid3x3 = createLucideIcon("grid-3x3", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 17v5", key: "bb1du9" }],
  [
    "path",
    {
      d: "M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z",
      key: "1nkz8b"
    }
  ]
];
const Pin = createLucideIcon("pin", __iconNode);
const meta = { title: "描边", description: "放在工具栏或卡片上，需要与背景区分时使用。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Toggle, { defaultPressed: true, variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid3x3, {}),
      "显示网格"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Toggle, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Pin, {}),
      "固定到顶部"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
