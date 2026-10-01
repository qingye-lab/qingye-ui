import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Calendar } from "./calendar-D2f3pu0H.js";
import "./chevron-left-CtqcxRzh.js";
import "./chevrons-up-down-BLzcfRd-.js";
const meta = { title: "组合：会议室预订", description: "日历放进卡片，下方汇总所选天数。" };
const format = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "short" });
function Demo() {
  const today = /* @__PURE__ */ new Date();
  const [range, setRange] = reactExports.useState({
    from: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1),
    to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3)
  });
  const nights = range?.from && range.to ? Math.round((range.to.getTime() - range.from.getTime()) / 864e5) + 1 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-fit flex-col rounded-2xl border bg-card shadow-xs/5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { mode: "range", selected: range, onSelect: setRange, disabled: { before: today } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3 border-t px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "3 号会议室 · 12 人" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "truncate text-muted-foreground text-xs", children: [
          range?.from ? format.format(range.from) : "未选择",
          range?.to ? ` – ${format.format(range.to)}` : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", disabled: !nights, className: "numeric", children: `预订 ${nights} 天` })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
