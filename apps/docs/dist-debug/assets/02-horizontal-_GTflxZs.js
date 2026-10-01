import { j as jsxRuntimeExports, bq as ScrollArea } from "./index-DM02Iz28.js";
const meta = { title: "横向", description: "内容用 w-max 保持自身宽度。" };
const works = [
  { title: "山行", author: "林晓", tone: "from-sky-200 to-indigo-300" },
  { title: "雾港", author: "周舟", tone: "from-emerald-200 to-teal-300" },
  { title: "晚灯", author: "陈默", tone: "from-amber-200 to-orange-300" },
  { title: "长街", author: "许诺", tone: "from-rose-200 to-fuchsia-300" },
  { title: "初雪", author: "王一然", tone: "from-slate-200 to-slate-300" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "w-full max-w-md rounded-lg border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-max gap-3 p-4", children: works.map((work) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "w-36 shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `aspect-[3/4] rounded-md bg-gradient-to-br ${work.tone} dark:opacity-80` }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("figcaption", { className: "mt-2 text-muted-foreground text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: work.title }),
      " · ",
      work.author
    ] })
  ] }, work.title)) }) });
}
export {
  Demo as default,
  meta
};
