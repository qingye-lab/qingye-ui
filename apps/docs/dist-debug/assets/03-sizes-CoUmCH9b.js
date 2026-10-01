import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Stat, a as StatLabel, b as StatValue, c as StatUnit, d as StatDescription, e as StatDelta } from "./stat-CUlQy5Ys.js";
import "./arrow-up-right-CCvFLBck.js";
const meta = { title: "尺寸", description: "sm 用于侧栏等紧凑区域，lg 留给一个视图里最重要的数字。" };
const sizes = [
  { size: "sm", label: "小" },
  { size: "default", label: "默认" },
  { size: "lg", label: "大" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full flex-wrap items-end justify-around gap-x-10 gap-y-8", children: sizes.map(({ size, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { size, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatLabel, { children: [
      "本月营收 · ",
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatValue, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatUnit, { children: "¥" }),
      "128,460"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { trend: "up", children: "+6.8%" }),
      "环比"
    ] })
  ] }, size)) });
}
export {
  Demo as default,
  meta
};
