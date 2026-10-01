import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Skeleton } from "./skeleton-Dv0NPbHI.js";
const meta = { title: "列表", description: "圆形头像加两行文字；每行宽度略有不同，更接近真实内容。" };
const rows = [
  { title: "w-28", subtitle: "w-44" },
  { title: "w-20", subtitle: "w-52" },
  { title: "w-24", subtitle: "w-36" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "aria-busy": "true", className: "flex w-full max-w-sm flex-col gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "正在加载成员列表" }),
    rows.map((row, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: `h-4 ${row.title}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: `h-3 ${row.subtitle}` })
      ] })
    ] }, index))
  ] });
}
export {
  Demo as default,
  meta
};
