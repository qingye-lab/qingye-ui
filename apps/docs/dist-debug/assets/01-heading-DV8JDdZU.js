import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { H as Heading } from "./typography-Co1wZ35x.js";
import "./arrow-up-right-CCvFLBck.js";
const meta = { title: "标题", description: "level 决定语义层级，size 决定字号，二者可以独立设置。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 1, children: "门店运营概览" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 2, children: "本周订单与营收" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 3, children: "徐汇漕溪北路店" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 4, size: "label", children: "设备与人员" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Heading, { level: 2, size: "heading", className: "text-muted-foreground", children: "level 2 · size heading" })
  ] });
}
export {
  Demo as default,
  meta
};
