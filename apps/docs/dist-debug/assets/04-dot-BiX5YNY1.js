import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
const meta = {
  title: "状态圆点",
  description: "outline 加一个彩色圆点，比整块底色更克制，适合表格和设备列表。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "size-1.5 rounded-full bg-success" }),
      "运行中"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "size-1.5 rounded-full bg-warning" }),
      "维护中"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "size-1.5 rounded-full bg-destructive" }),
      "故障"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "size-1.5 rounded-full bg-muted-foreground/64" }),
      "已停止"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
